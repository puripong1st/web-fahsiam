import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import About from "./components/About";
import ErrorBoundary from "./components/ErrorBoundary";
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

const Calendar = dynamic(() => import("./components/UnifiedCalendar"), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});
const FAQSection = dynamic(() => import("./components/FAQSection"), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />,
});

const Testimonials = dynamic(() => import("./components/Testimonials"), {
  loading: () => <div className="h-64 bg-sky-50 animate-pulse" />,
});

const AdTracker = dynamic(() => import("./components/Cookie/AdTracker"));
const CookieBanner = dynamic(() => import("./components/Cookie/CookieBanner"));

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";

export const metadata: Metadata = {
  // ── Title ──────────────────────────────────────────────
  title: "ฟ้าสยาม | ปุ๋ยอินทรีย์-อินทรีย์เคมี เพื่อผลผลิตยั่งยืน",

  // ── Description ────────────────────────────────────────
  description:
    "ปุ๋ยอินทรีย์และอินทรีย์เคมีคุณภาพสูง ผ่านการรับรองจากกรมวิชาการเกษตร เหมาะสำหรับทุเรียน ยางพารา ข้าว มันสำปะหลัง และพืชไร่ทุกชนิด ลดต้นทุน เพิ่มผลผลิต",

  // ── Keywords ───────────────────────────────────────────
  keywords: [
    "ปุ๋ยอินทรีย์",
    "ปุ๋ยอินทรีย์เคมี",
    "ฟ้าสยาม",
    "ปุ๋ยทุเรียน",
    "ปุ๋ยข้าว",
    "ปุ๋ยยางพารา",
    "ปุ๋ยมันสำปะหลัง",
    "ปุ๋ยอ้อย",
    "ปุ๋ยปาล์มน้ำมัน",
    "ปุ๋ยข้าวโพด",
    "SiamAgriTech",
    "เกษตรอินทรีย์",
  ],

  // ── Canonical ──────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
    languages: {
      "th-TH": BASE_URL,
    },
  },

  // ── Open Graph (Facebook / Line / etc.) ────────────────
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: BASE_URL,
    siteName: "ฟ้าสยาม SiamAgriTech",
    title: "ฟ้าสยาม | ปุ๋ยอินทรีย์-อินทรีย์เคมี เพื่อผลผลิตยั่งยืน",
    description:
      "ปุ๋ยอินทรีย์และอินทรีย์เคมีคุณภาพสูง ผ่านการรับรองจากกรมวิชาการเกษตร ลดต้นทุน เพิ่มผลผลิตยั่งยืน",
    images: [
      {
        url: "/image/hero/Cover1.webp",
        width: 1200,
        height: 630,
        alt: "ปุ๋ยตราฟ้าสยาม | อินทรีย์–อินทรีย์เคมี เพื่อผลผลิตยั่งยืน",
      },
    ],
  },

  // ── Twitter / X Card ───────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "ฟ้าสยาม | ปุ๋ยอินทรีย์-อินทรีย์เคมี เพื่อผลผลิตยั่งยืน",
    description:
      "ปุ๋ยอินทรีย์และอินทรีย์เคมีคุณภาพสูง ผ่านการรับรองจากกรมวิชาการเกษตร ลดต้นทุน เพิ่มผลผลิตยั่งยืน",
    images: ["/image/hero/Cover1.webp"],
  },

  // ── Icons ──────────────────────────────────────────────
  icons: {
    icon: "/favicon-32x32.png",
    apple: "/favicon-32x32.png",
  },

  // ── Robots ─────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
export default function LandingPage() {
  return (
    <ErrorBoundary>
      <main>
        {/* ✅ โหลดทันที — user เห็นตอนเปิดหน้า */}
        <Hero />
        <About />

        {/* ✅ Lazy load — โหลดหลัง above-the-fold เสร็จ */}
        <Products />
        <WhyChoose />
        <Calendar />

        {/* <FAQSection /> */}
        <Testimonials />
        <AdTracker />
        <CookieBanner />
        <SpeedInsights />
        <Analytics/>
      </main>
    </ErrorBoundary>
  );
}
