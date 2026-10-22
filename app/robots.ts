import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/admin/", "/login", "/signup", "/signin"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
