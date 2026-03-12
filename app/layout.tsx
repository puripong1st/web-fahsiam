import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import type { Metadata, Viewport } from "next"; // เพิ่มบรรทัดนี้

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";

// เพิ่ม Global Metadata
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ฟ้าสยาม | ปุ๋ยอินทรีย์-อินทรีย์เคมี เพื่อผลผลิตยั่งยืน",
    template: "%s ", // ทำให้หน้าย่อยต่อท้ายด้วย  อัตโนมัติ
  },
  description: "ปุ๋ยอินทรีย์และอินทรีย์เคมีคุณภาพสูง ผ่านการรับรองจากกรมวิชาการเกษตร",
  verification: {
    google: "O3pc6KHLALRFMBuOyRKW-XdUb04EdGycLs4Iy--7d70",
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "ฟ้าสยาม SiamAgriTech",
  },
};
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ฟ้าสยาม SiamAgriTech",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app"}/favicon-32x32.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "082-529-8388",
    contactType: "customer service",
    availableLanguage: "Thai",
  },
  sameAs: [
    "https://www.facebook.com/share/p/1ArBAZtMvr/",
  ],
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // อนุญาตให้ซูมได้ (ดีต่อ Accessibility/SEO)
  themeColor: "#00687aff", // สีเขียวของแบรนด์ฟ้าสยาม (จะแสดงบนแถบเบราว์เซอร์มือถือ)
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>

        <Navbar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Footer />

      </body>
    </html>
  );
}