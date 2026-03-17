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
      img: "/image/hero/Cover1.webp",
      isPrimary: true,
    },
    {
      title: "ผลิตภัณฑ์คุณภาพเพื่อเกษตรกรไทย",
      desc: "มั่นใจได้ในคุณภาพและการสนับสนุนอย่างมืออาชีพ",
      img: "/image/hero/2Cover.webp",
    },
    {
      title: "สิ่งแวดล้อมยั่งยืน คือเป้าหมายของเรา",
      desc: "ร่วมสร้างอนาคตที่มั่นคงกับเรา",
      img: "/image/hero/3Cover.webp",
    },
  ];

  const [current, setCurrent] = useState(0);

  const totalSlides = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  // ฟังก์ชันเลื่อนภาพไปทางซ้าย
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // ฟังก์ชันเลื่อนภาพไปทางขวา
  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const heroHeights = "h-[300px] sm:h-[360px] md:h-[450px] lg:h-[520px] xl:h-[580px]";

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
            className={`min-w-full h-full flex items-end justify-start relative bg-black`}
          >
            {/* ✅ ใช้ <Image> แทน backgroundImage — Next.js optimize + preload รูปแรกได้ */}
            <Image
              src={slide.img}
              alt={slide.title}
              fill
              className="object-cover object-center"
              priority={i === 0}
              sizes="100vw"
              quality={75}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            <div className="relative z-10 max-w-3xl text-start text-white px-4 sm:px-6 md:px-10 pb-6 sm:pb-8 animate-fade-in-up">
              <div className="backdrop-blur-sm bg-black/35 px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 rounded-xl">
                {slide.isPrimary ? (
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.7)' }}>
                    {slide.title}
                  </h1>
                ) : (
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.7)' }}>
                    {slide.title}
                  </h2>
                )}
                <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg leading-relaxed" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9), 0 2px 12px rgba(0,0,0,0.7)' }}>
                  {slide.desc}
                </p>
              </div>
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
              current === i ? "bg-sky-500 scale-125" : "bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
