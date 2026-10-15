import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/lib/session";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

import { type UserRole, DEFAULT_USER_ROLE } from "@/lib/definitions";

/**
 * Data Access Layer (DAL) function that verifies the user session.
 * Uses React cache() to memoize the return value during a React render pass.
 * Follows official Next.js authentication documentation pattern.
 */
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return {
    isAuth: true,
    userId: session.userId,
    role: (session.role as UserRole) || DEFAULT_USER_ROLE,
    name: session.name || "Chef",
    email: session.email || "",
  };
});

/**
 * Data Access Layer (DAL) function to safely fetch the authenticated user record.
 * Follows official Next.js authentication documentation pattern.
 */
export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session.userId) return null;

  try {
    await connectToDatabase();
    const user = await User.findById(session.userId).select("-password").lean();
    return user;
  } catch (error) {
    console.error("Failed to fetch user in DAL:", error);
    return null;
  }
});
