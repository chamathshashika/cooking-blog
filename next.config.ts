import type { NextConfig } from "next";

function getBlobRemotePattern(): { protocol: "http" | "https"; hostname: string } | null {
  const blobStoreUrl = process.env.BLOB_STORE_URL;
  if (!blobStoreUrl) {
    return null;
  }

  try {
    const parsed = new URL(blobStoreUrl);
    return {
      protocol: (parsed.protocol.replace(":", "") as "http" | "https") || "https",
      hostname: parsed.hostname,
    };
  } catch {
    const cleaned = blobStoreUrl.replace(/^https?:\/\//, "").split("/")[0];
    return {
      protocol: "https",
      hostname: cleaned,
    };
  }
}

const customBlobPattern = getBlobRemotePattern();

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/api/blob/**",
      },
      {
        pathname: "/api/blob",
      },
      {
        pathname: "/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      ...(customBlobPattern ? [customBlobPattern] : []),
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.private.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
