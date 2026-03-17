// ดึง Component Contact ที่คุณสร้างไว้มาใช้งาน (ใช้ ../ เพื่อถอยออกจากโฟลเดอร์ contact 1 ขั้น)
import Plants from "./Plants";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";
const currentUrl = `${BASE_URL}/plants`;

export const metadata: Metadata = {
  title: "การดูแลพืชและแนะนำปุ๋ย ",
  description: "คู่มือการดูแลพืชครบถ้วน ข้าว อ้อย มันสำปะหลัง ข้าวโพด ยางพารา ปาล์มน้ำมัน พร้อมแนะนำสูตรปุ๋ยที่เหมาะสมในแต่ละขั้นตอน",
  keywords: [
    "การดูแลพืช",
    "คู่มือการปลูกพืช",
    "ปุ๋ยข้าว",
    "ปุ๋ยอ้อย",
    "ปุ๋ยมันสำปะหลัง",
    "ปุ๋ยยางพารา",
    "ปุ๋ยปาล์มน้ำมัน",
    "ฟ้าสยาม",
    "SiamAgriTech"
  ],
  alternates: {
    canonical: currentUrl,
  },
  openGraph: {
    title: "การดูแลพืชและแนะนำปุ๋ย ",
    description: "คู่มือดูแลพืชครบถ้วน พร้อมแนะนำปุ๋ยที่เหมาะสมในแต่ละขั้นตอนการเจริญเติบโต",
    url: currentUrl,
    siteName: "ฟ้าสยาม",
    images: [{ url: "/background/background1.webp", width: 1200, height: 630, alt: "ฟ้าสยาม" }],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "การดูแลพืชและแนะนำปุ๋ย ",
    description: "ปุ๋ยฟ้าสยาม เพิ่มผลผลิต ลดต้นทุน",
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
      { "@type": "ListItem", "position": 2, "name": "พืชเศรษฐกิจ", "item": currentUrl }
    ]
  };

  // ── Structured Data สำหรับหน้า CollectionPage ───────────────
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "คู่มือการดูแลพืชและแนะนำปุ๋ย",
    "description": "คู่มือการดูแลพืชครบถ้วน พร้อมแนะนำสูตรปุ๋ยที่เหมาะสมในแต่ละขั้นตอนการเจริญเติบโต",
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
      
      <Plants />
    </main>
  );
}