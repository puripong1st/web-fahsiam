import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import About from "./components/About";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";

// ✅ Lazy load ทุก component ที่อยู่ใต้ fold — ไม่โหลดจนกว่า JS จะ idle
const Products = dynamic(() => import("./components/Products"), {
  loading: () => <div className="h-64 bg-sky-50 animate-pulse" />,
});

const WhyChoose = dynamic(() => import("./components/WhyChoose"), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />,
});

const Calendar = dynamic(() => import("./components/Calendar"), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});

const Testimonials = dynamic(() => import("./components/Testimonials"), {
  loading: () => <div className="h-64 bg-sky-50 animate-pulse" />,
});

const AdTracker = dynamic(() => import("./components/Cookie/AdTracker"));
const CookieBanner = dynamic(() => import("./components/Cookie/CookieBanner"));

export const metadata: Metadata = {
  title: "ฟ้าสยาม | ปุ๋ยอินทรีย์-อินทรีย์เคมี เพื่อผลผลิตยั่งยืน",
  description: "ปุ๋ยฟ้าสยาม อินทรีย์เคมี เพิ่มผลผลิต ลดต้นทุน เหมาะกับทุเรียน ผัก และไม้ผลทุกชนิด",
  openGraph: {
    title: "ฟ้าสยาม | ปุ๋ยอินทรีย์-อินทรีย์เคมี เพื่อผลผลิตยั่งยืน",
    description: "ปุ๋ยฟ้าสยาม อินทรีย์เคมี เพิ่มผลผลิต ลดต้นทุน เหมาะกับทุเรียน ผัก และไม้ผลทุกชนิด",
    url: "https://web-fahsiam.vercel.app",
    siteName: "ฟ้าสยาม",
    images: [{ url: "/background/background1.webp", width: 1200, height: 630, alt: "ฟ้าสยาม" }],
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
export default function LandingPage() {
  return (
    <main>
      {/* ✅ โหลดทันที — user เห็นตอนเปิดหน้า */}
      <Hero />
      <About />

      {/* ✅ Lazy load — โหลดหลัง above-the-fold เสร็จ */}
      <Products />
      <WhyChoose />
      <Calendar />
      <Testimonials />
      <AdTracker />
      <CookieBanner />
      <SpeedInsights />
      <Analytics/>
    </main>
  );
}
