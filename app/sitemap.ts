import type { MetadataRoute } from "next";
import { plants } from "./data/datafame";
import { MOCK_PRODUCTS } from "./data/productsdetail";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";

function toLastModified(dateString: string | undefined): Date {
  if (!dateString) return new Date();
  const d = new Date(dateString);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      changeFrequency: "weekly",
      priority: 1,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/conproduct`,
      changeFrequency: "weekly",
      priority: 0.9,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/plants`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/news`,
      changeFrequency: "weekly",
      priority: 0.6,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: "yearly",
      priority: 0.5,
      lastModified: new Date(),
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = MOCK_PRODUCTS.map((p) => ({
    url: `${BASE_URL}/products/${p.id}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: toLastModified(p.updatedAt),
  }));

  const plantRoutes: MetadataRoute.Sitemap = plants.map((p) => ({
    url: `${BASE_URL}/plants/${p.id}`,
    changeFrequency: "monthly",
    priority: 0.65,
    lastModified: toLastModified(p.updatedAt),
  }));

  return [...staticRoutes, ...productRoutes, ...plantRoutes];
}
