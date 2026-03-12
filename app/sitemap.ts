// app/sitemap.ts
import type { MetadataRoute } from "next";
import { plants } from "./data/datafame";
import { MOCK_PRODUCTS } from "./data/productsdetail";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";

// วันที่อัปเดต static pages ล่าสุด — แก้ตรงนี้เมื่อแก้เนื้อหาจริง
const STATIC_UPDATED = "2026-03-12";

export default function sitemap(): MetadataRoute.Sitemap {

  // ── 1. Static Pages ────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(STATIC_UPDATED),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/conproduct`,
      lastModified: new Date(STATIC_UPDATED),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/plants`,
      lastModified: new Date(STATIC_UPDATED),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(STATIC_UPDATED),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(STATIC_UPDATED),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // ── 2. Dynamic: หน้าพืชแต่ละชนิด ──────────────────────
  const plantPages: MetadataRoute.Sitemap = plants.map((plant) => ({
    url: `${BASE_URL}/plants/${plant.id}`,
    lastModified: new Date(plant.updatedAt), // ✅ ใช้วันที่จริงจาก datafame.ts
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // ── 3. Dynamic: หน้าสินค้าแต่ละชิ้น ───────────────────
  const productPages: MetadataRoute.Sitemap = MOCK_PRODUCTS.map((product) => ({
    url: `${BASE_URL}/products/${product.id}`,
    lastModified: new Date(product.updatedAt), // ✅ ใช้วันที่จริงจาก productsdetail.ts
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...plantPages, ...productPages];
}
