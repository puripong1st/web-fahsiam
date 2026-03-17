// app/conproduct/page.tsx
import ConProduct from "./ConProduct";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";
const currentUrl = `${BASE_URL}/conproduct`;

export const metadata: Metadata = {
  title: "ผลิตภัณฑ์ปุ๋ยฟ้าสยาม | อินทรีย์เคมี เพิ่มผลผลิต ลดต้นทุน",
  description: "แคตตาล็อกผลิตภัณฑ์ปุ๋ยฟ้าสยาม อินทรีย์เคมีคุณภาพสูง ได้รับการรับรองจากกรมวิชาการเกษตร เหมาะสำหรับทุเรียน ผัก ไม้ผลทุกชนิด",
  keywords: [
    "ปุ๋ยฟ้าสยาม",
    "แคตตาล็อกปุ๋ย",
    "ปุ๋ยอินทรีย์เคมี",
    "ปุ๋ยทุเรียน",
    "ปุ๋ยผัก",
    "ปุ๋ยอินทรีย์",
    "ลดต้นทุนเพิ่มผลผลิต",
    "ผลิตภัณฑ์ฟ้าสยาม",
    "SiamAgriTech"
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: currentUrl,
  },
  openGraph: {
    type: "website",
    title: "ผลิตภัณฑ์ปุ๋ยฟ้าสยาม | ปุ๋ยอินทรีย์เคมี",
    description: "ปุ๋ยฟ้าสยาม อินทรีย์เคมีคุณภาพสูง เหมาะสำหรับทุเรียน ผัก ไม้ผลทุกชนิด เพิ่มผลผลิต ลดต้นทุน",
    url: currentUrl,
    siteName: "ฟ้าสยาม SiamAgriTech",
    images: [{ url: "/image/Fertilizer/1.webp", width: 1200, height: 630, alt: "ปุ๋ยอินทรีย์เคมีฟ้าสยาม" }],
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: "ผลิตภัณฑ์ปุ๋ยฟ้าสยาม",
    description: "ปุ๋ยฟ้าสยาม ปุ๋ยอินทรีย์เคมี เพิ่มผลผลิต ลดต้นทุน",
    images: ["/image/Fertilizer/1.webp"],
  },
};

export default function ConProductPage() {
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