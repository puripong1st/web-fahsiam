"use client";

import { Star, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { TESTIMONIALS } from "../data/testimonialsData";
import AnimateIn from "./AnimateIn";

export default function Testimonials() {
  const autoplayOptions = {
    delay: 3000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  };

  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      containScroll: "trimSnaps" 
    }, 
    [Autoplay(autoplayOptions)]
  );

  return (
    <section className="py-20 bg-gradient-to-b from-white to-sky-50" id="testimonials">
      <div className="max-w-7xl mx-auto px-4">
        {/* ส่วนหัวข้อ */}
        <AnimateIn className="text-center mb-12">
          <p className="text-sky-700 font-semibold tracking-wide uppercase text-sm">ลูกค้าพูดถึงเรา</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">เสียงจากผู้ใช้งานจริง</h2>
          <div className="h-1.5 w-20 bg-sky-500 mx-auto mt-4 rounded-full" />
        </AnimateIn>

        {/* ตัว Carousel */}
        <AnimateIn animation="fade-in" delay="0.1s">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6">
            {TESTIMONIALS.map((t, i) => (
              <div 
                key={i} 
                className="pl-6 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
              >
                <div className="h-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between">
                  <div>
                    <Quote className="absolute top-6 right-8 w-12 h-12 text-sky-100 opacity-50" />
                    
                    {/* ดาว */}
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star 
                          key={idx} 
                          className={`w-4 h-4 ${idx < t.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} 
                        />
                      ))}
                    </div>

                    {/* ข้อความรีวิว */}
                    <p className="text-gray-600 italic leading-relaxed mb-6 relative z-10">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>

                  {/* ข้อมูลลูกค้า */}
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="relative">
                      <Image 
                        src={t.img} 
                        alt={t.name} 
                        width={48}
                        height={48}
                        loading="lazy"
                        className="w-12 h-12 rounded-full object-cover border-2 border-sky-100"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white" title="Verified Buyer" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 leading-none">{t.name}</div>
                      <div className="text-xs text-sky-600 font-medium mt-1">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </AnimateIn>

        {/* คำแนะนำเพิ่มเติมด้านล่าง */}
        <p className="text-center text-gray-400 text-sm mt-8">
          * ผลลัพธ์ขึ้นอยู่กับสภาพหน้างานและการใช้งานของแต่ละบุคคล
        </p>
      </div>
    </section>
  );
}
