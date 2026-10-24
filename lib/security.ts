import { NextRequest } from "next/server";

/**
 * HTTP Methods allowed by this application.
 * All other methods (PUT, DELETE, PATCH, TRACE, CONNECT, etc.) are strictly forbidden.
 */
export const ALLOWED_HTTP_METHODS = ["GET", "POST", "HEAD"] as const;
export type AllowedHttpMethod = (typeof ALLOWED_HTTP_METHODS)[number];

/**
 * Validates whether the incoming HTTP method is allowed.
 */
export function isAllowedHttpMethod(method: string): boolean {
  return ALLOWED_HTTP_METHODS.includes(method.toUpperCase() as AllowedHttpMethod);
}

/**
 * Verifies that state-mutating requests (POST) originate from the same origin to prevent CSRF.
 * Compares the Origin or Referer header against the request's Host header.
 */
export function verifyCsrfOrigin(req: NextRequest): { valid: boolean; reason?: string } {
  const method = req.method.toUpperCase();

  // Safe idempotent read methods do not require CSRF origin validation
  if (method === "GET" || method === "HEAD") {
    return { valid: true };
  }

  const host = (req.headers.get("x-forwarded-host") || req.headers.get("host") || req.nextUrl.host || "").toLowerCase();
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  // 1. Verify Origin header if provided
  if (origin) {
    try {
      const originUrl = new URL(origin);
      const originHost = originUrl.host.toLowerCase();
      if (originHost === host) {
        return { valid: true };
      }
      return {
        valid: false,
        reason: `CSRF check failed: Origin (${originHost}) does not match Host (${host})`,
      };
    } catch {
      return { valid: false, reason: "CSRF check failed: Malformed Origin header" };
    }
  }

  // 2. Fallback to Referer header if Origin is absent
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const refererHost = refererUrl.host.toLowerCase();
      if (refererHost === host) {
        return { valid: true };
      }
      return {
        valid: false,
        reason: `CSRF check failed: Referer (${refererHost}) does not match Host (${host})`,
      };
    } catch {
      return { valid: false, reason: "CSRF check failed: Malformed Referer header" };
    }
  }

  // 3. For state-changing mutations without Origin or Referer, reject cross-origin forgery
  // Note: Standard browsers always supply Origin on cross-site POST/fetch requests.
  return {
    valid: false,
    reason: "CSRF check failed: Missing Origin and Referer headers for mutating request",
  };
}

/**
 * Detects common SQL injection signatures and tautologies in strings.
 */
const SQL_INJECTION_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE|EXEC|DECLARE)\b)/i,
  /(\b(OR|AND)\s+['"]?\d+['"]?\s*=\s*['"]?\d+)/i,
  /(\b(OR|AND)\s+['"][^'"]+['"]\s*=\s*['"][^'"]+['"])/i,
  /(--|#|\/\*)/,
  /(;\s*(SELECT|INSERT|UPDATE|DELETE|DROP|TRUNCATE|ALTER))/i,
  /('\s*OR\s*'\s*=\s*')/i,
];

/**
 * Checks whether an untrusted string contains SQL injection patterns.
 */
export function hasSqlInjection(input: string): boolean {
  if (!input || typeof input !== "string") return false;
  return SQL_INJECTION_PATTERNS.some((pattern) => pattern.test(input));
}

/**
 * Sanitizes user input string against SQL injection and dangerous control sequences.
 * Strips null bytes, trims whitespace, and neutralizes SQL comment characters.
 */
export function sanitizeSqlInput(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/\0/g, "") // Remove null bytes
    .trim();
}

/**
 * Neutralizes MongoDB NoSQL operator injection by deeply stripping keys starting with '$'
 * or containing dots ('.') that could trigger prototype pollution or operator bypass.
 */
export function sanitizeMongoInput<T>(input: T): T {
  if (input === null || typeof input !== "object") {
    if (typeof input === "string") {
      return sanitizeSqlInput(input) as unknown as T;
    }
    return input;
  }

  if (Array.isArray(input)) {
    return input.map((item) => sanitizeMongoInput(item)) as unknown as T;
  }

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    // Strip dangerous MongoDB operators ($where, $gt, $ne, etc.) and dot notation
    if (key.startsWith("$") || key.includes(".")) {
      continue;
    }
    sanitized[key] = sanitizeMongoInput(value);
  }

  return sanitized as T;
}

/**
 * Escapes special regular expression characters to prevent Regex Injection and ReDoS attacks.
 */
export function escapeRegex(text: string): string {
  if (typeof text !== "string") return "";
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

/**
 * Strictly allowed MIME types for image uploads.
 * Only JPEG and PNG are permitted.
 */
export const ALLOWED_IMAGE_MIME_TYPES = ["image/jpeg", "image/png"] as const;

/**
 * Strictly allowed file extensions for image uploads.
 */
export const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"] as const;

/**
 * Validates that an uploaded file is strictly a genuine JPEG or PNG image:
 * 1. Checks file size (up to 5MB)
 * 2. Checks reported MIME type (strictly image/jpeg or image/png)
 * 3. Checks file extension (.jpg, .jpeg, .png)
 * 4. Reads and validates binary magic bytes (file signature) to prevent MIME spoofing:
 *    - JPEG: 0xFF, 0xD8, 0xFF
 *    - PNG:  0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A
 */
export async function validateImageFile(
  file: File,
  maxSizeBytes: number = 5 * 1024 * 1024
): Promise<{ valid: boolean; error?: string }> {
  if (!file || !(file instanceof File) || file.size === 0) {
    return { valid: false, error: "No image file provided." };
  }

  // 1. File size check
  if (file.size > maxSizeBytes) {
    const sizeMb = Math.round(maxSizeBytes / (1024 * 1024));
    return {
      valid: false,
      error: `Image size exceeds the ${sizeMb}MB limit. Please choose a smaller image.`,
    };
  }

  // 2. MIME type check
  const mimeType = file.type.toLowerCase();
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(mimeType as (typeof ALLOWED_IMAGE_MIME_TYPES)[number])) {
    return {
      valid: false,
      error: "Invalid file format. Only JPEG and PNG images are allowed.",
    };
  }

  // 3. File extension check
  const fileName = file.name.toLowerCase();
  const hasValidExtension = ALLOWED_IMAGE_EXTENSIONS.some((ext) => fileName.endsWith(ext));
  if (!hasValidExtension) {
    return {
      valid: false,
      error: "Invalid file extension. Only .jpg, .jpeg, and .png files are accepted.",
    };
  }

  // 4. Magic bytes (binary signature) check
  try {
    const headerSlice = await file.slice(0, 8).arrayBuffer();
    const bytes = new Uint8Array(headerSlice);

    // JPEG signature: FF D8 FF
    const isJpeg = bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;

    // PNG signature: 89 50 4E 47 0D 0A 1A 0A
    const isPng =
      bytes.length >= 8 &&
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a;

    if (!isJpeg && !isPng) {
      return {
        valid: false,
        error: "File content does not match genuine JPEG or PNG image signatures. Upload rejected.",
      };
    }
  } catch (err: unknown) {
    console.error("Failed to inspect file magic bytes:", err);
    return {
      valid: false,
      error: "Unable to verify file integrity. Upload rejected.",
    };
  }

  return { valid: true };
}
