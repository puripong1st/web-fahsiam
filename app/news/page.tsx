// ดึง Component Contact ที่คุณสร้างไว้มาใช้งาน (ใช้ ../ เพื่อถอยออกจากโฟลเดอร์ contact 1 ขั้น)
import News from "./News";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ข่าวสารและสาระน่ารู้การเกษตร ",
  description: "อัปเดตข่าวสารการเกษตร สาระน่ารู้ เทคนิคการดูแลพืช และกิจกรรมต่างๆ จากฟ้าสยาม เพื่อเกษตรกรไทยก้าวไกลอย่างยั่งยืน",
  openGraph: {
    title: "ข่าวสารและสาระน่ารู้การเกษตร ",
    description: "อัปเดตข่าวสารการเกษตร สาระน่ารู้ เทคนิคการดูแลพืช และกิจกรรมต่างๆ จากฟ้าสยาม",
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app"}/news`,
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
  return (
    <main>
      <News />
    </main>
  );
}