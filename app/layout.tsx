import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import type { Metadata } from "next"; // เพิ่มบรรทัดนี้

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";

// เพิ่ม Global Metadata
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ฟ้าสยาม | ปุ๋ยอินทรีย์-อินทรีย์เคมี เพื่อผลผลิตยั่งยืน",
    template: "%s | ฟ้าสยาม", // ทำให้หน้าย่อยต่อท้ายด้วย | ฟ้าสยาม อัตโนมัติ
  },
  description: "ปุ๋ยอินทรีย์และอินทรีย์เคมีคุณภาพสูง ผ่านการรับรองจากกรมวิชาการเกษตร",
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
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>

        <Navbar />
        <meta name="google-site-verification" content="O3pc6KHLALRFMBuOyRKW-XdUb04EdGycLs4Iy--7d70" />
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