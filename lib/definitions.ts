export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined;

export type UserRole = "admin" | "reader" | "editor";

export const USER_ROLES: readonly UserRole[] = ["admin", "reader", "editor"] as const;
export const DEFAULT_USER_ROLE: UserRole = "reader";

/**
 * Within USER_ROLES, only "admin" and "editor" have access to the admin panel.
 */
export function hasAdminAccess(role?: string | null): boolean {
  return role === "admin" || role === "editor";
}

export type SessionPayload = {
  userId: string;
  name?: string;
  email?: string;
  role?: UserRole;
  expiresAt: Date;
};
