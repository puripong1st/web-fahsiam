// ดึง Component Contact ที่คุณสร้างไว้มาใช้งาน (ใช้ ../ เพื่อถอยออกจากโฟลเดอร์ contact 1 ขั้น)
import News from "./News";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";
const currentUrl = `${BASE_URL}/news`;

export const metadata: Metadata = {
  title: "ข่าวสารและสาระน่ารู้การเกษตร ",
  description: "อัปเดตข่าวสารการเกษตร สาระน่ารู้ เทคนิคการดูแลพืช และกิจกรรมต่างๆ จากฟ้าสยาม เพื่อเกษตรกรไทยก้าวไกลอย่างยั่งยืน",
  keywords: [
    "ข่าวสารการเกษตร",
    "สาระน่ารู้การเกษตร",
    "เทคนิคการดูแลพืช",
    "ฟ้าสยาม",
    "เกษตรอินทรีย์",
    "SiamAgriTech"
  ],
  alternates: {
    canonical: currentUrl,
  },
  openGraph: {
    title: "ข่าวสารและสาระน่ารู้การเกษตร ",
    description: "อัปเดตข่าวสารการเกษตร สาระน่ารู้ เทคนิคการดูแลพืช และกิจกรรมต่างๆ จากฟ้าสยาม",
    url: currentUrl,
    siteName: "ฟ้าสยาม",
    images: [{ url: "/background/background1.webp", width: 1200, height: 630, alt: "ฟ้าสยาม" }],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ข่าวสารและสาระน่ารู้การเกษตร ",
    description: "อัปเดตข่าวสารและเทคนิคการเกษตรจากฟ้าสยาม",
    images: ["/background/background1.webp"],
  },
};
export default function ContactPage() {
  // ── Structured Data สำหรับ Breadcrumb ─────────────────────
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "หน้าแรก", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "ข่าวสาร", "item": currentUrl }
    ]
  };

  return (
    <main>
      {/* ฝัง Schema SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      
      <News />
    </main>
  );
}