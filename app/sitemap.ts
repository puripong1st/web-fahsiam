// app/sitemap.ts
import type { MetadataRoute } from "next";
import { plants } from "./data/datafame";
import { MOCK_PRODUCTS } from "./data/productsdetail";

const BASE_URL = "https://web-fahsiam.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static pages ──────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/conproduct`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/plants`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // ── Dynamic: หน้าพืชแต่ละชนิด ─────────────────────────
  const plantPages: MetadataRoute.Sitemap = plants.map((plant) => ({
    url: `${BASE_URL}/plants/${plant.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // ── Dynamic: หน้าสินค้าแต่ละชิ้น ─────────────────────
  const productPages: MetadataRoute.Sitemap = MOCK_PRODUCTS.map((product) => ({
    url: `${BASE_URL}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...plantPages, ...productPages];
}