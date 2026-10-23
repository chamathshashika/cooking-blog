"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { User, type IUser } from "@/lib/models/User";
import { verifySession } from "@/lib/dal";
import { createSession } from "@/lib/session";
import { hashPassword, verifyPassword } from "@/lib/password";
import { deleteBlobByUrl } from "@/lib/actions/upload";

export type UserProfileData = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  bio: string;
};

export type ProfileResponse = {
  success: boolean;
  message?: string;
  error?: string;
  user?: UserProfileData;
};

export type PasswordResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

/**
 * Fetch the authenticated user's current profile from MongoDB.
 */
export async function getUserProfile(): Promise<ProfileResponse> {
  try {
    const session = await verifySession();
    if (!session.isAuth || !session.userId) {
      return { success: false, error: "Unauthorized session." };
    }

    await connectToDatabase();
    const user = await User.findById(session.userId).select("-password").lean<IUser>();

    if (!user) {
      return { success: false, error: "User account not found." };
    }

    return {
      success: true,
      user: {
        id: user._id ? user._id.toString() : session.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
        bio: user.bio || "",
      },
    };
  } catch (error: unknown) {
    console.error("getUserProfile error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to load user profile.",
    };
  }
}

/**
 * Server action to update user profile information (name, avatar, bio).
 * Automatically cleans up obsolete Vercel Blob avatars and refreshes the session cookie.
 */
export async function updateUserProfile(data: {
  name: string;
  avatar?: string;
  bio?: string;
}): Promise<ProfileResponse> {
  try {
    const session = await verifySession();
    if (!session.isAuth || !session.userId) {
      return { success: false, error: "Unauthorized: Please log in." };
    }

    const trimmedName = data.name?.trim();
    if (!trimmedName || trimmedName.length < 2) {
      return { success: false, error: "Name must be at least 2 characters long." };
    }

    if (trimmedName.length > 100) {
      return { success: false, error: "Name cannot exceed 100 characters." };
    }

    await connectToDatabase();
    const user = await User.findById(session.userId);

    if (!user) {
      return { success: false, error: "User account not found in database." };
    }

    const newAvatar = data.avatar !== undefined ? data.avatar.trim() : user.avatar;
    const oldAvatar = user.avatar;

    // Clean up previous blob if replaced
    if (oldAvatar && newAvatar !== oldAvatar && oldAvatar.includes("blob.vercel-storage.com")) {
      try {
        await deleteBlobByUrl(oldAvatar);
      } catch (blobErr) {
        console.warn("Failed to delete old avatar blob:", blobErr);
      }
    }

    user.name = trimmedName;
    user.avatar = newAvatar;
    if (data.bio !== undefined) {
      user.bio = data.bio.trim();
    }

    await user.save();

    // Re-issue active session so AdminHeader and cookies reflect updated name & avatar immediately
    await createSession(
      user._id.toString(),
      user.role,
      user.name,
      user.email,
      user.avatar || ""
    );

    // Revalidate relevant cached views
    revalidatePath("/admin", "layout");
    revalidatePath("/admin/profile");
    revalidatePath("/recipes", "layout");
    revalidatePath("/");

    return {
      success: true,
      message: "Profile updated successfully!",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
        bio: user.bio || "",
      },
    };
  } catch (error: unknown) {
    console.error("updateUserProfile error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update profile.",
    };
  }
}

/**
 * Server action to change user password.
 * Verifies current password using timing-safe crypto comparison and saves new hashed password.
 */
export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<PasswordResponse> {
  try {
    const session = await verifySession();
    if (!session.isAuth || !session.userId) {
      return { success: false, error: "Unauthorized: Please log in." };
    }

    const { currentPassword, newPassword, confirmPassword } = data;

    if (!currentPassword) {
      return { success: false, error: "Please enter your current password." };
    }

    if (!newPassword || newPassword.length < 6) {
      return {
        success: false,
        error: "New password must be at least 6 characters long.",
      };
    }

    if (newPassword !== confirmPassword) {
      return { success: false, error: "New password and confirmation do not match." };
    }

    if (currentPassword === newPassword) {
      return {
        success: false,
        error: "New password must be different from your current password.",
      };
    }

    await connectToDatabase();
    const user = await User.findById(session.userId);

    if (!user) {
      return { success: false, error: "User account not found." };
    }

    // Verify current password
    const isCurrentValid = verifyPassword(currentPassword, user.password);
    if (!isCurrentValid) {
      return {
        success: false,
        error: "The current password you entered is incorrect.",
      };
    }

    // Hash and save new password
    user.password = hashPassword(newPassword);
    await user.save();

    return {
      success: true,
      message: "Your password has been changed successfully!",
    };
  } catch (error: unknown) {
    console.error("changePassword error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to change password.",
    };
  }
}
