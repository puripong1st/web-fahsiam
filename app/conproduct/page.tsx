// ดึง Component Contact ที่คุณสร้างไว้มาใช้งาน (ใช้ ../ เพื่อถอยออกจากโฟลเดอร์ contact 1 ขั้น)
import ConProduct from "./ConProduct";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ผลิตภัณฑ์ปุ๋ยฟ้าสยาม | ฟ้าสยาม ",
  description: "ปุ๋ยฟ้าสยาม อินทรีย์เคมี เพิ่มผลผลิต ลดต้นทุน เหมาะกับทุเรียน ผัก และไม้ผลทุกชนิด",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app"}/conproduct`,
  },
  openGraph: {
    title: "ผลิตภัณฑ์ปุ๋ยฟ้าสยาม | ฟ้าสยาม",
    description: "ปุ๋ยฟ้าสยาม อินทรีย์เคมี เพิ่มผลผลิต ลดต้นทุน เหมาะกับทุเรียน ผัก และไม้ผลทุกชนิด",
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app"}/conproduct`,
    siteName: "ฟ้าสยาม",
    images: [{ url: "/image/Fertilizer/1.jpg", width: 1200, height: 630, alt: "ปุ๋ยอินทรีย์เคมีฟ้าสยาม" }],
    locale: "th_TH",
    type: "website",
    
  },
  twitter: {
    card: "summary_large_image",
    title: "ผลิตภัณฑ์ปุ๋ยฟ้าสยาม | ฟ้าสยาม",
    description: "ปุ๋ยฟ้าสยาม เพิ่มผลผลิต ลดต้นทุน",
    images: ["/background/background1.webp"],
  },
};

export default function ContactPage() {
  return (
    <main>
      <ConProduct />
    </main>
  );
}