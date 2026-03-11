import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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