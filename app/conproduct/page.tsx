// ดึง Component Contact ที่คุณสร้างไว้มาใช้งาน (ใช้ ../ เพื่อถอยออกจากโฟลเดอร์ contact 1 ขั้น)
import ConProduct from "./ConProduct";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ฟ้าสยาม | ปุ๋ยอินทรีย์-อินทรีย์เคมี เพื่อผลผลิตยั่งยืน",
  description: "ปุ๋ยฟ้าสยาม อินทรีย์เคมี เพิ่มผลผลิต ลดต้นทุน เหมาะกับทุเรียน ผัก และไม้ผลทุกชนิด",
  alternates: {
    canonical: "https://web-fahsiam.vercel.app/conproduct",
  },
  openGraph: {
    title: "ฟ้าสยาม | ปุ๋ยอินทรีย์-อินทรีย์เคมี เพื่อผลผลิตยั่งยืน",
    description: "ปุ๋ยฟ้าสยาม อินทรีย์เคมี เพิ่มผลผลิต ลดต้นทุน เหมาะกับทุเรียน ผัก และไม้ผลทุกชนิด",
    url: "https://web-fahsiam.vercel.app",
    siteName: "ฟ้าสยาม",
    images: [{ url: "/image/Fertilizer/1.jpg", width: 1200, height: 630, alt: "ปุ๋ยอินทรีย์เคมีฟ้าสยาม" }],
    locale: "th_TH",
    type: "website",
    
  },
  twitter: {
    card: "summary_large_image",
    title: "ฟ้าสยาม | ปุ๋ยอินทรีย์-อินทรีย์เคมี",
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