import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const blobUrl = searchParams.get("url");

  if (!blobUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    let result = await get(blobUrl, { access: "private" }).catch(() => null);
    if (!result || !result.stream) {
      result = await get(blobUrl, { access: "public" }).catch(() => null);
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
