import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import About from "./components/About";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    </main>
  );
}
