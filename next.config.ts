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
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://connect.facebook.net https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' https://placehold.co https://i.pravatar.cc https://*.google.com https://*.googleapis.com data: blob:; font-src 'self'; connect-src 'self' https://*.google-analytics.com https://*.firebasedatabase.app https://firestore.googleapis.com; frame-src 'self' https://maps.google.com https://www.google.com https://*.google.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
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

  async redirects() {
    return [
      {
        source: '/products/p1',
        destination: '/products/organic-chemical-12-3-5-growth',
        permanent: true, // true = 301 Redirect (ดีต่อ SEO บอทจะรู้ว่าย้ายถาวร)
      },
      {
        source: '/products/p2',
        destination: '/products/organic-chemical-3-6-15-bloom',
        permanent: true,
      },
      {
        source: '/products/p3',
        destination: '/products/chemical-fertilizer-0-0-30-sweetness',
        permanent: true,
      },
      {
        source: '/products/p4',
        destination: '/products/organic-powder-om-25-soil-booster',
        permanent: true,
      },
      {
        source: '/products/p5',
        destination: '/products/organic-pellet-om-20-slow-release',
        permanent: true,
      },
      {
        source: '/products/p6',
        destination: '/products/organic-chemical-6-3-3-all-purpose',
        permanent: true,
      },
    ]
  },

}

export default nextConfig;