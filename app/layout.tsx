import "./globals.css";
import { Sarabun } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Metadata, Viewport } from "next";

const sarabun = Sarabun({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
  variable: "--font-sarabun",
  preload: true,
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";

// เพิ่ม Global Metadata ตามมาตรฐาน Elite SEO
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ฟ้าสยาม | ปุ๋ยอินทรีย์-อินทรีย์เคมี เพื่อผลผลิตยั่งยืน",
    template: "%s | ฟ้าสยาม",
  },
  description: "ปุ๋ยอินทรีย์และอินทรีย์เคมีคุณภาพสูง ผ่านการรับรองจากกรมวิชาการเกษตร เหมาะสำหรับทุเรียน ยางพารา ข้าว เพิ่มผลผลิตยั่งยืน",
  keywords: ["ปุ๋ยอินทรีย์", "ปุ๋ยอินทรีย์เคมี", "ฟ้าสยาม", "เกษตรอินทรีย์", "SiamAgriTech"],
  verification: {
    google: "O3pc6KHLALRFMBuOyRKW-XdUb04EdGycLs4Iy--7d70",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: BASE_URL,
    siteName: "ฟ้าสยาม SiamAgriTech",
    title: "ฟ้าสยาม | ปุ๋ยอินทรีย์-อินทรีย์เคมี เพื่อผลผลิตยั่งยืน",
    description: "ปุ๋ยอินทรีย์และอินทรีย์เคมีคุณภาพสูง ผ่านการรับรองจากกรมวิชาการเกษตร",
    images: [{
      url: "/image/hero/Cover1.webp",
      width: 1200,
      height: 630,
      alt: "ปุ๋ยตราฟ้าสยาม | อินทรีย์–อินทรีย์เคมี เพื่อผลผลิตยั่งยืน",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ฟ้าสยาม | ปุ๋ยอินทรีย์-อินทรีย์เคมี เพื่อผลผลิตยั่งยืน',
    description: 'ปุ๋ยอินทรีย์และอินทรีย์เคมีคุณภาพสูง ผ่านการรับรองจากกรมวิชาการเกษตร',
    images: ['/image/hero/Cover1.webp'],
  },
};
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ฟ้าสยาม SiamAgriTech",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon-32x32.png`,
  description: "บริษัทผลิตและจำหน่ายปุ๋ยอินทรีย์และอินทรีย์เคมีคุณภาพสูง ได้รับการรับรองจากกรมวิชาการเกษตร",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "082-529-8388",
    contactType: "customer service",
    availableLanguage: "Thai",
    areaServed: "TH",
  },
  areaServed: "Thailand",
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
    <html lang="th" className={sarabun.variable}>
      <body className={sarabun.className}>
        

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