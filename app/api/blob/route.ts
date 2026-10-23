import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { extractVercelBlobUrl } from "@/lib/blob-util";
import { hasSqlInjection, sanitizeSqlInput } from "@/lib/security";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get("url");

  if (!rawUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  const sanitized = sanitizeSqlInput(rawUrl);
  if (hasSqlInjection(sanitized)) {
    return new NextResponse("Invalid request: Malicious input detected", { status: 400 });
  }

  // Ensure url strictly belongs to authorized Vercel Blob storage to prevent SSRF
  const verifiedBlobUrl = extractVercelBlobUrl(sanitized);
  if (!verifiedBlobUrl) {
    return new NextResponse("Forbidden: Target URL is not a recognized Vercel Blob storage asset", {
      status: 403,
    });
  }

  try {
    let result = await get(verifiedBlobUrl, { access: "private" }).catch(() => null);
    if (!result || !result.stream) {
      result = await get(verifiedBlobUrl, { access: "public" }).catch(() => null);
    }
    if (!result || !result.stream) {
      return new NextResponse("Blob not found", { status: 404 });
    }

    return new NextResponse(result.stream as unknown as ReadableStream, {
      headers: {
        "Content-Type": result.blob.contentType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err: unknown) {
    console.error("Error fetching private blob:", err);
    return new NextResponse("Failed to load blob image", { status: 500 });
  }
}

// Disallow all other HTTP methods on /api/blob
export async function POST() {
  return new NextResponse("Method Not Allowed", {
    status: 405,
    headers: { Allow: "GET, HEAD" },
  });
}

export async function PUT() {
  return new NextResponse("Method Not Allowed", {
    status: 405,
    headers: { Allow: "GET, HEAD" },
  });
}

export async function DELETE() {
  return new NextResponse("Method Not Allowed", {
    status: 405,
    headers: { Allow: "GET, HEAD" },
  });
}
