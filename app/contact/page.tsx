// app/contact/page.tsx
import Contact from "./Contact";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";
const currentUrl = `${BASE_URL}/contact`;

export const metadata: Metadata = {
  title: "ติดต่อเรา SiamAgriTech",
  description: "ช่องทางการติดต่อฟ้าสยาม สอบถามข้อมูลผลิตภัณฑ์ปุ๋ย สั่งซื้อสินค้า หรือขอรับคำปรึกษาด้านการเกษตร",
  keywords: [
    "ติดต่อฟ้าสยาม",
    "เบอร์โทรฟ้าสยาม",
    "สั่งซื้อปุ๋ยฟ้าสยาม",
    "ตัวแทนจำหน่ายปุ๋ยฟ้าสยาม",
    "ปรึกษาการเกษตร",
    "SiamAgriTech"
  ],
  alternates: {
    canonical: currentUrl, // ✅ เพิ่ม Canonical URL ที่ขาดไป
  },
  openGraph: {
    title: "ติดต่อเรา SiamAgriTech",
    description: "ช่องทางการติดต่อฟ้าสยาม สอบถามข้อมูลผลิตภัณฑ์ปุ๋ย สั่งซื้อสินค้า หรือขอรับคำปรึกษาด้านการเกษตร",
    url: currentUrl, // ✅ แก้ให้ชี้มาที่หน้า /contact แทนหน้าแรก
    siteName: "ฟ้าสยาม SiamAgriTech",
    images: [{ url: "/background/background1.webp", width: 1200, height: 630, alt: "ติดต่อฟ้าสยาม" }],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ติดต่อเรา SiamAgriTech",
    description: "สอบถามข้อมูลผลิตภัณฑ์ปุ๋ย สั่งซื้อสินค้า หรือปรึกษาปัญหาพืช",
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
      { "@type": "ListItem", "position": 2, "name": "ติดต่อเรา", "item": currentUrl }
    ]
  };

  // ── 2. Structured Data สำหรับหน้า Contact (ดีต่อ SEO Local) ────────
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "ติดต่อเรา SiamAgriTech",
    "description": "ช่องทางการติดต่อฟ้าสยาม สอบถามข้อมูลผลิตภัณฑ์ปุ๋ย สั่งซื้อสินค้า",
    "url": currentUrl,
    "mainEntity": {
      "@type": "Organization",
      "name": "ฟ้าสยาม SiamAgriTech",
      "url": BASE_URL,
      "logo": `${BASE_URL}/favicon-32x32.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "082-529-8388",
        "contactType": "customer service",
        "areaServed": "TH", // ระบุว่าให้บริการในไทย
        "availableLanguage": "Thai"
      },
      "sameAs": [
        "https://www.facebook.com/share/p/1ArBAZtMvr/"
      ]
    }
  };

  return (
    <main>
      {/* ฝัง Schema SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }} />
      
      <Contact />
    </main>
  );
}