import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { env } from "@/lib/env";
import type { SessionPayload, UserRole } from "@/lib/definitions";
import { DEFAULT_USER_ROLE } from "@/lib/definitions";

const secretKey = env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const COOKIE_NAME = "session";

/**
 * Encrypt session payload into signed JWT token using Jose.
 * Follows official Next.js documentation pattern.
 */
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

/**
 * Decrypt session token using Jose.
 * Follows official Next.js documentation pattern.
 */
export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Create a new session and set HTTP-only cookie.
 * Follows official Next.js documentation pattern.
 */
export async function createSession(
  userId: string,
  role: UserRole = DEFAULT_USER_ROLE,
  name = "Chef",
  email = "",
  avatar = ""
) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, role, name, email, avatar, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * Update (or refresh) active session cookie expiration.
 * Follows official Next.js documentation pattern.
 */
export async function updateSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookieStore.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    expires,
    sameSite: "lax",
    path: "/",
  });

  return payload;
}

/**
 * Delete session cookie on logout.
 * Follows official Next.js documentation pattern.
 */
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Retrieve current session payload from cookies.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!session) return null;
  return await decrypt(session);
}
