import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // ป้องกันการโจมตีแบบ MIME Sniffing
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY', // ป้องกัน Clickjacking
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // ดีต่อ Privacy และ SEO
          },
        ],
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,        // ✅ เพิ่มตรงนี้
    contentDispositionType: 'attachment',  // ✅ เพิ่มเพื่อความปลอดภัย
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,

}

export default nextConfig;