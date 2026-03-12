// app/robots.ts
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",         // ทุก bot
        allow: "/",             // เข้าได้ทุกหน้า
        disallow: [
          "/api/",              // ซ่อน API routes
          "/_next/",            // ซ่อน Next.js internals
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}