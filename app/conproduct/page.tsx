// app/conproduct/page.tsx
import ConProduct from "./ConProduct";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";
const currentUrl = `${BASE_URL}/conproduct`;

export const metadata: Metadata = {
  title: "ผลิตภัณฑ์ปุ๋ย ", // ลบช่องว่างส่วนเกิน
  description: "ปุ๋ยฟ้าสยาม อินทรีย์เคมี เพิ่มผลผลิต ลดต้นทุน เหมาะกับทุเรียน ผัก และไม้ผลทุกชนิด",
  keywords: [
    "ปุ๋ยฟ้าสยาม",
    "แคตตาล็อกปุ๋ย",
    "ปุ๋ยอินทรีย์เคมี",
    "ปุ๋ยทุเรียน",
    "ปุ๋ยผัก",
    "ลดต้นทุนเพิ่มผลผลิต",
    "ผลิตภัณฑ์ฟ้าสยาม"
  ],
  alternates: {
    canonical: currentUrl,
  },
  openGraph: {
    title: "ผลิตภัณฑ์ปุ๋ย",
    description: "ปุ๋ยฟ้าสยาม อินทรีย์เคมี เพิ่มผลผลิต ลดต้นทุน เหมาะกับทุเรียน ผัก และไม้ผลทุกชนิด",
    url: currentUrl,
    siteName: "ฟ้าสยาม SiamAgriTech",
    images: [{ url: "/image/Fertilizer/1.webp", width: 1200, height: 630, alt: "ปุ๋ยอินทรีย์เคมีฟ้าสยาม" }],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ผลิตภัณฑ์ปุ๋ย",
    description: "ปุ๋ยฟ้าสยาม เพิ่มผลผลิต ลดต้นทุน",
    images: ["/background/background1.webp"],
  },
};

export default function ContactPage() {
  // ── 1. Structured Data สำหรับ Breadcrumb ─────────────────────
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "หน้าแรก", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "ผลิตภัณฑ์", "item": currentUrl }
    ]
  };

  // ── 2. Structured Data สำหรับหน้ารวมสินค้า (CollectionPage) ──────
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "ผลิตภัณฑ์ปุ๋ยฟ้าสยาม",
    "description": "แคตตาล็อกผลิตภัณฑ์ปุ๋ยฟ้าสยาม อินทรีย์เคมี เพิ่มผลผลิต ลดต้นทุน",
    "url": currentUrl,
    "publisher": {
      "@type": "Organization",
      "name": "ฟ้าสยาม SiamAgriTech"
    }
  };

  return (
    <main>
      {/* ฝัง Schema SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      
      <ConProduct />
    </main>
  );
}