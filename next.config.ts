import type { NextConfig } from "next";

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // compress รูปอัตโนมัติ
  },
  compress: true,
  poweredByHeader: false,
}

export default nextConfig;
