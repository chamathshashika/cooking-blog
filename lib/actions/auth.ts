"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { createSession, deleteSession } from "@/lib/session";
import type { FormState } from "@/lib/definitions";
import { DEFAULT_USER_ROLE } from "@/lib/definitions";

/**
 * Hash password with random salt using Node.js crypto scrypt.
 */
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derivedKey}`;
}

/**
 * Timing-safe password verification.
 */
function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(":");
    if (!salt || !key) return false;

    const keyBuffer = Buffer.from(key, "hex");
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

/**
 * Server action to sign up a new user, following official Next.js documentation.
 */
export async function signup(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validation
  const errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  } = {};

  if (!name || name.length < 2) {
    errors.name = ["Name must be at least 2 characters long."];
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = ["Please enter a valid email address."];
  }

  if (!password || password.length < 6) {
    errors.password = ["Password must be at least 6 characters long."];
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = ["Passwords do not match."];
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      message: "Please correct the highlighted errors.",
    };
  }

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        errors: {
          email: ["An account with this email already exists."],
        },
        message: "An account with this email address already exists. Please sign in.",
      };
    }

    const hashedPassword = hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: DEFAULT_USER_ROLE,
    });

    // Create session cookie via Next.js session management
    await createSession(
      newUser._id.toString(),
      newUser.role,
      newUser.name,
      newUser.email
    );
  } catch (error) {
    console.error("Signup error in server action:", error);
    return {
      message: "An unexpected error occurred while creating your account. Please try again.",
    };
  }

  // Redirect after successful registration
  redirect("/admin");
}

/**
 * Server action to log in an existing user, following official Next.js documentation.
 */
export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  const errors: {
    email?: string[];
    password?: string[];
  } = {};

  if (!email) {
    errors.email = ["Email is required."];
  }
  if (!password) {
    errors.password = ["Password is required."];
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      message: "Please fill in all required fields.",
    };
  }

  try {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return {
        message: "Invalid email or password.",
      };
    }

    const isPasswordValid = verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return {
        message: "Invalid email or password.",
      };
    }

    // Create session cookie via Next.js session management
    await createSession(
      user._id.toString(),
      user.role,
      user.name,
      user.email
    );
  } catch (error) {
    console.error("Login error in server action:", error);
    return {
      message: "An unexpected error occurred while connecting to the database. Please try again.",
    };
  }

  // Redirect after successful login
  redirect("/admin");
}

/**
 * Server action to log out user, following official Next.js documentation.
 */
export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
