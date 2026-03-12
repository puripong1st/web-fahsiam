// ดึง Component Contact ที่คุณสร้างไว้มาใช้งาน (ใช้ ../ เพื่อถอยออกจากโฟลเดอร์ contact 1 ขั้น)
import Contact from "./Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ติดต่อเรา | ฟ้าสยาม SiamAgriTech",
  description: "ช่องทางการติดต่อฟ้าสยาม สอบถามข้อมูลผลิตภัณฑ์ปุ๋ย สั่งซื้อสินค้า หรือขอรับคำปรึกษาด้านการเกษตร",
  openGraph: {
    title: "ติดต่อเรา | ฟ้าสยาม SiamAgriTech",
    description: "ช่องทางการติดต่อฟ้าสยาม สอบถามข้อมูลผลิตภัณฑ์ปุ๋ย สั่งซื้อสินค้า หรือขอรับคำปรึกษาด้านการเกษตร",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app",
    siteName: "ฟ้าสยาม",
    images: [{ url: "/background/background1.webp", width: 1200, height: 630, alt: "ฟ้าสยาม" }],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ติดต่อเรา | ฟ้าสยาม SiamAgriTech",
    description: "สอบถามข้อมูลผลิตภัณฑ์ปุ๋ย สั่งซื้อสินค้า หรือปรึกษาปัญหาพืช",
    images: ["/background/background1.webp"],
  },
};
export default function ContactPage() {
  return (
    <main>
      <Contact />
    </main>
  );
}