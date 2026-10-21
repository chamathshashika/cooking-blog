"use server";

import { put, del } from "@vercel/blob";
import { verifySession } from "@/lib/dal";
import { hasAdminAccess } from "@/lib/definitions";
import { extractVercelBlobUrl } from "@/lib/blob-util";

export type UploadResult = {
  success: boolean;
  url?: string;
  error?: string;
};

/**
 * Server action to securely upload an image to Vercel Blob.
 * Validates session, user authorization (admin role required),
 * file type (images only), and max file size (up to 5MB).
 */
export async function uploadCategoryImage(
  formData: FormData,
): Promise<UploadResult> {
  try {
    // 1. Authorization check
    const session = await verifySession();
    if (!session.isAuth || !hasAdminAccess(session.role)) {
      return {
        success: false,
        error:
          "Unauthorized: Only administrators are permitted to upload category images.",
      };
    }

    // 2. Extract file from FormData
    const file = formData.get("file");
    if (!file || !(file instanceof File) || file.size === 0) {
      return {
        success: false,
        error: "No image file provided.",
      };
    }

    // 3. Validate image MIME type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/gif",
    ];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      return {
        success: false,
        error: "Invalid file type. Allowed formats: JPEG, PNG.",
      };
    }

    // 4. Validate file size (max 5MB)
    const MAX_SIZE_BYTES = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      return {
        success: false,
        error: "Image size exceeds 5MB limit. Please choose a smaller image.",
      };
    }

    // 5. Ensure storage credentials are available
    if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
      return {
        success: false,
        error:
          "BLOB_READ_WRITE_TOKEN is missing. Please create a Vercel Blob store and configure your token in your deployment environment or .env file.",
      };
    }

    // 6. Generate sanitized unique path
    const timestamp = Date.now();
    const sanitizedFileName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "-")
      .replace(/-+/g, "-");
    const blobPath = `categories/${timestamp}-${sanitizedFileName}`;

    // 7. Upload to Vercel Blob (attempts public first, falls back to private if store requires it)
    let blob;
    try {
      blob = await put(blobPath, file, {
        access: "private",
        contentType: file.type,
      });
    } catch {
      blob = await put(blobPath, file, {
        access: "private",
        contentType: file.type,
      });
    }

    // If the blob is private, route it through /api/blob so browsers can view it without 403 Forbidden
    let finalUrl = blob.url;
    if (blob.url.includes(".private.blob.vercel-storage.com")) {
      finalUrl = `/api/blob?url=${encodeURIComponent(blob.url)}`;
    } else if (process.env.BLOB_STORE_URL) {
      try {
        const base = process.env.BLOB_STORE_URL.replace(/\/+$/, "");
        const path = blob.pathname.startsWith("/")
          ? blob.pathname
          : `/${blob.pathname}`;
        finalUrl = `${base}${path}`;
      } catch {
        finalUrl = blob.url;
      }
    }

    return {
      success: true,
      url: finalUrl,
    };
  } catch (error: unknown) {
    console.error("Vercel Blob upload failed:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while uploading the image to Vercel Blob.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Internal server helper to delete a blob from Vercel storage.
 * Extracts the underlying Vercel Blob URL and calls `del`.
 * Returns { success: true } if URL is not a blob or if successfully deleted.
 */
export async function deleteBlobByUrl(
  url?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!url) {
      return { success: true };
    }

    const blobUrl = extractVercelBlobUrl(url);
    if (!blobUrl) {
      // Not a Vercel Blob asset (e.g. static local image or Unsplash), skip
      return { success: true };
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
      console.warn("BLOB_READ_WRITE_TOKEN is missing, skipping blob deletion.");
      return { success: false, error: "BLOB_READ_WRITE_TOKEN is missing." };
    }

    await del(blobUrl, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("Vercel Blob delete failed:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete image from Vercel Blob.",
    };
  }
}

/**
 * Server action to delete an image from Vercel Blob.
 * Validates session and administrator role.
 */
export async function deleteBlobImage(
  url?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await verifySession();
    if (!session.isAuth || !hasAdminAccess(session.role)) {
      return {
        success: false,
        error:
          "Unauthorized: Only administrators are permitted to delete images.",
      };
    }

    return await deleteBlobByUrl(url);
  } catch (error: unknown) {
    console.error("deleteBlobImage authorization or execution error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred during blob deletion.",
    };
  }
}

/**
 * Server action to securely upload a recipe hero/step image to Vercel Blob.
 * Validates session, user authorization (admin or editor role required),
 * file type (images only), and max file size (up to 5MB).
 */
export async function uploadRecipeImage(
  formData: FormData
): Promise<UploadResult> {
  try {
    // 1. Authorization check
    const session = await verifySession();
    if (!session.isAuth || !hasAdminAccess(session.role)) {
      return {
        success: false,
        error:
          "Unauthorized: Only administrators and editors are permitted to upload recipe images.",
      };
    }

    // 2. Extract file from FormData
    const file = formData.get("file");
    if (!file || !(file instanceof File) || file.size === 0) {
      return {
        success: false,
        error: "No image file provided.",
      };
    }

    // 3. Validate image MIME type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/gif",
    ];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      return {
        success: false,
        error: "Invalid file type. Allowed formats: JPEG, PNG, WebP, AVIF, GIF.",
      };
    }

    // 4. Validate file size (max 5MB)
    const MAX_SIZE_BYTES = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      return {
        success: false,
        error: "Image exceeds maximum allowed size of 5MB.",
      };
    }

    // 5. Generate clean filename
    const originalName = file.name || "recipe-image";
    const extension = originalName.split(".").pop()?.toLowerCase() || "jpg";
    const baseName = originalName
      .substring(0, originalName.lastIndexOf(".") || originalName.length)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 50);

    const blobPath = `recipes/${baseName}-${Date.now()}.${extension}`;

    // 6. Upload to Vercel Blob
    const blob = await put(blobPath, file, {
      access: "public",
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // 7. Route through proxy if local blob server or configured
    let finalUrl = blob.url;
    if (
      blob.url.includes("localhost") ||
      blob.url.includes("127.0.0.1") ||
      !blob.url.startsWith("http")
    ) {
      finalUrl = `/api/blob?url=${encodeURIComponent(blob.url)}`;
    } else if (process.env.BLOB_STORE_URL) {
      try {
        const base = process.env.BLOB_STORE_URL.replace(/\/+$/, "");
        const path = blob.pathname.startsWith("/")
          ? blob.pathname
          : `/${blob.pathname}`;
        finalUrl = `${base}${path}`;
      } catch {
        finalUrl = blob.url;
      }
    }

    return {
      success: true,
      url: finalUrl,
    };
  } catch (error: unknown) {
    console.error("Vercel Blob recipe image upload failed:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while uploading the recipe image to Vercel Blob.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

