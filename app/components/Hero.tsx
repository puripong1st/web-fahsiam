"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroSlider() {
  const introTitle = "ปุ๋ยตราฟ้าสยาม | อินทรีย์–อินทรีย์เคมี เพื่อผลผลิตยั่งยืน";
  const introDesc =
    "ฟ้าสยามพัฒนาปุ๋ยอินทรีย์และอินทรีย์เคมี ช่วยเพิ่มผลผลิต ลดต้นทุน เหมาะกับทุเรียน ผัก และไม้ผล พร้อมผู้เชี่ยวชาญให้คำแนะนำใกล้ชิด";

  const slides = [
    {
      title: introTitle,
      desc: introDesc,
      img: "/image/hero/Cover1.png",
      isPrimary: true,
    },
    {
      title: "ผลิตภัณฑ์คุณภาพเพื่อเกษตรกรไทย",
      desc: "มั่นใจได้ในคุณภาพและการสนับสนุนอย่างมืออาชีพ",
      img: "/image/hero/2Cover.png",
    },
    {
      title: "สิ่งแวดล้อมยั่งยืน คือเป้าหมายของเรา",
      desc: "ร่วมสร้างอนาคตที่มั่นคงกับเรา",
      img: "/image/hero/3Cover.png",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // ฟังก์ชันเลื่อนภาพไปทางซ้าย
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // ฟังก์ชันเลื่อนภาพไปทางขวา
  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const heroHeights = "h-[260px] sm:h-[320px] md:h-[480px] lg:h-[600px] xl:h-[720px]";

  return (
    <section className={`relative w-full overflow-hidden ${heroHeights}`}>
      {/* Container สำหรับภาพ */}
      <div
        className={`flex h-full transition-transform duration-700 ease-in-out`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`min-w-full h-full flex items-end justify-start relative`}
          >
            {/* ✅ ใช้ <Image> แทน backgroundImage — Next.js optimize + preload รูปแรกได้ */}
            <Image
              src={slide.img}
              alt={slide.title}
              fill
              className="object-cover object-center"
              priority={i === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/20 md:bg-black/15" />

            <div className="relative z-10 max-w-3xl text-start text-white px-4 sm:px-6 md:px-10 py-6">
              {slide.isPrimary ? (
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-md">
                  {slide.title}
                </h1>
              ) : (
                <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-md">
                  {slide.title}
                </h2>
              )}
              <p className="mt-2 sm:mt-4 text-xs sm:text-sm md:text-base lg:text-lg drop-shadow">
                {slide.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ปุ่มเลื่อนซ้าย */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-black/50"
        aria-label="Previous slide"
      >
        &#10094;
      </button>

      {/* ปุ่มเลื่อนขวา */}
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-black/50"
        aria-label="Next slide"
      >
        &#10095;
      </button>

      {/* จุดสไลด์ด้านล่าง */}
      <div className="absolute bottom-4 sm:bottom-6 w-full flex justify-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              current === i ? "bg-blue-400" : "bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
