/**
 * Resolves a blob URL for client-side rendering.
 * If the URL points to a private Vercel Blob store (*.private.blob.vercel-storage.com),
 * routes it through the authenticated /api/blob stream proxy to avoid 403 Forbidden errors.
 */
export function getBlobDisplayUrl(url?: string): string {
  if (!url) return "";
  if (
    url.includes(".private.blob.vercel-storage.com") &&
    !url.startsWith("/api/blob")
  ) {
    return `/api/blob?url=${encodeURIComponent(url)}`;
  }
  return url;
}

/**
 * Checks whether an image URL is routed through the internal /api/blob proxy.
 * Useful for setting `unoptimized` on <Image /> components to stream directly.
 */
export function isBlobProxyUrl(url?: string): boolean {
  if (!url) return false;
  return url.startsWith("/api/blob") || url.includes(".private.blob.vercel-storage.com");
}

/**
 * Extracts the underlying Vercel Blob URL from an image URL.
 * Handles:
 * - Direct blob URLs: https://<store>.private.blob.vercel-storage.com/... or https://<store>.public.blob.vercel-storage.com/...
 * - Proxied blob URLs: /api/blob?url=https%3A%2F%2F...
 * - Custom domain blob URLs matching process.env.BLOB_STORE_URL
 *
 * Returns null if the URL is not a Vercel Blob URL (e.g. Unsplash, local static file).
 */
export function extractVercelBlobUrl(url?: string): string | null {
  if (!url) return null;

  let targetUrl = url.trim();

  // If URL routes through internal proxy /api/blob?url=...
  if (targetUrl.startsWith("/api/blob")) {
    try {
      const parsed = new URL(targetUrl, "http://localhost");
      const urlParam = parsed.searchParams.get("url");
      if (urlParam) {
        targetUrl = urlParam;
      }
    } catch {
      const match = targetUrl.match(/[?&]url=([^&]+)/);
      if (match && match[1]) {
        targetUrl = decodeURIComponent(match[1]);
      }
    }
  }

  // Check if target URL belongs to Vercel Blob storage
  if (targetUrl.includes(".blob.vercel-storage.com")) {
    return targetUrl;
  }

  // Check if target URL matches custom BLOB_STORE_URL
  if (
    typeof process !== "undefined" &&
    process.env?.BLOB_STORE_URL &&
    targetUrl.startsWith(process.env.BLOB_STORE_URL.replace(/\/+$/, ""))
  ) {
    return targetUrl;
  }

  return null;
}

