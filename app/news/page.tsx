// ดึง Component Contact ที่คุณสร้างไว้มาใช้งาน (ใช้ ../ เพื่อถอยออกจากโฟลเดอร์ contact 1 ขั้น)
import News from "./News";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";
const currentUrl = `${BASE_URL}/news`;

export const metadata: Metadata = {
  title: "ข่าวสารและสาระน่ารู้การเกษตร | ฟ้าสยาม SiamAgriTech",
  description: "อัปเดตข่าวสารและสาระน่ารู้การเกษตร เทคนิคการดูแลพืช และกิจกรรมจากฟ้าสยาม เพื่อให้เกษตรกรไทยก้าวหน้าอย่างยั่งยืน",
  keywords: [
    "ข่าวสารการเกษตร",
    "สาระน่ารู้การเกษตร",
    "เทคนิคการดูแลพืช",
    "ฟ้าสยาม",
    "เกษตรอินทรีย์",
    "ปุ๋ยฟ้าสยาม",
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
    title: "ข่าวสารและสาระน่ารู้การเกษตร | ฟ้าสยาม",
    description: "อัปเดตข่าวสารการเกษตร สาระน่ารู้ เทคนิคการดูแลพืช และกิจกรรมต่างๆ จากฟ้าสยาม",
    url: currentUrl,
    siteName: "ฟ้าสยาม SiamAgriTech",
    images: [{ url: "/background/background1.webp", width: 1200, height: 630, alt: "ข่าวสารฟ้าสยาม - ปลูกพืชยั่งยืน" }],
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: "ข่าวสารและสาระน่ารู้การเกษตร | ฟ้าสยาม",
    description: "อัปเดตข่าวสารและเทคนิคการเกษตรจากฟ้าสยาม",
    images: ["/background/background1.webp"],
  },
};
export default function NewsPage() {
  // ── Structured Data สำหรับ Breadcrumb ─────────────────────
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "หน้าแรก", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "ข่าวสาร", "item": currentUrl }
    ]
  };

  // ── Structured Data สำหรับ CollectionPage (รวมบทความ/ข่าวสาร) ──────
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "ข่าวสารและสาระน่ารู้การเกษตร",
    "description": "อัปเดตข่าวสารการเกษตร เทคนิคการดูแลพืช และกิจกรรมจากฟ้าสยาม",
    "url": currentUrl,
    "publisher": {
      "@type": "Organization",
      "name": "ฟ้าสยาม SiamAgriTech",
      "logo": `${BASE_URL}/favicon-32x32.png`
    }
  };

  return (
    <main>
      {/* ฝัง Schema SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      
      <News />
    </main>
  );
}