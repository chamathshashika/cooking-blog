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

export type SessionPayload = {
  userId: string;
  name?: string;
  email?: string;
  role?: UserRole;
  expiresAt: Date;
};
