// app/plants/[id]/page.tsx
import { plants } from "../../data/datafame";
import type { Metadata } from "next";
import PlantDetailClient from "./PlantDetailClient";
import { notFound } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";

export function generateStaticParams() {
  return plants.map((plant) => ({
    id: plant.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const plant = plants.find((p) => p.id === id);

  if (!plant) {
    return { title: "ไม่พบข้อมูลพืช" };
  }

  const currentUrl = `${BASE_URL}/plants/${id}`;
  const seoTitle = `วิธีปลูก${plant.name}ให้ได้ผลผลิตสูง | ปุ๋ยฟ้าสยาม`;

  return {
    title: seoTitle,
    description: plant.desc,
    keywords: [
      `วิธีปลูก${plant.name}`,
      `การดูแล${plant.name}`,
      `ปุ๋ย${plant.name}`,
      "ฟ้าสยาม",
      "เกษตรอินทรีย์",
      "เพิ่มผลผลิต",
      "SiamAgriTech",
      "ปลูกพืชยั่งยืน"
    ],
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: currentUrl,
    },
    openGraph: {
      type: "article",
      url: currentUrl,
      title: seoTitle,
      description: plant.desc,
      images: [
        {
          url: `${BASE_URL}${plant.image}`,
          width: 1200,
          height: 630,
          alt: `คู่มือการปลูก ${plant.name} ตราฟ้าสยาม`,
        },
      ],
      publishedTime: new Date().toISOString(),
      authors: ["ฟ้าสยาม SiamAgriTech"],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: plant.desc,
      images: [`${BASE_URL}${plant.image}`],
    },
  };
}

export default async function PlantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plant = plants.find((p) => p.id === id);

  // ✅ ถ้าหาพืชไม่เจอ ให้ return UI แจ้งเตือนออกไปเลย
  if (!plant) {
    notFound();
  }

  // ── 1. Structured Data (JSON-LD) สำหรับ Article ────────────────────────
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `วิธีปลูก${plant.name} ให้ได้ผลผลิตสูง`,
    description: plant.desc,
    image: `${BASE_URL}${plant.image}`,
    author: {
      "@type": "Organization",
      name: "ฟ้าสยาม SiamAgriTech",
      url: BASE_URL
    },
    publisher: {
      "@type": "Organization",
      name: "ฟ้าสยาม SiamAgriTech",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/favicon-32x32.png`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/plants/${id}`
    }
  };

  // ── 2. Structured Data (JSON-LD) สำหรับ Breadcrumb ─────────────────────
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "หน้าแรก",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "พืชเศรษฐกิจ",
        "item": `${BASE_URL}/plants`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": plant.name,
        "item": `${BASE_URL}/plants/${id}`
      }
    ]
  };

  return (
    <>
      {/* ฝัง Schema สำหรับ SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <PlantDetailClient plant={plant} />
    </>
  );
}