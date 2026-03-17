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

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const heroHeights = "h-[300px] sm:h-[360px] md:h-[450px] lg:h-[520px] xl:h-[580px]";

  return (
    <section className={`relative w-full overflow-hidden ${heroHeights}`}>
      <div
        className={`flex h-full transition-transform duration-700 ease-in-out`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`min-w-full h-full flex items-end justify-start relative bg-black`}
          >
            {/* Blurred background layer */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${slide.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(40px)',
                transform: 'scale(1.2)',
                opacity: 0.7,
              }}
            />
            {/* Main image layer */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                className="object-contain"
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                sizes="100vw"
                quality={i === 0 ? 85 : 75}
              />
            </div>
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            <div className="relative z-30 w-full h-full flex items-end">
              <div className="w-full max-w-2xl px-4 sm:px-6 md:px-10 pb-8 sm:pb-10 md:pb-12">
                <div
                  className="transform transition-all duration-700 ease-out"
                  style={{
                    opacity: current === i ? 1 : 0,
                    transform: current === i ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <div
                    className="backdrop-blur-md bg-gradient-to-r from-black/60 via-black/40 to-transparent px-5 py-4 sm:px-6 sm:py-5 rounded-xl border-l-4 border-sky-500"
                  >
                    {slide.isPrimary ? (
                      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-white drop-shadow-lg">
                        {slide.title}
                      </h1>
                    ) : (
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight text-white drop-shadow-lg">
                        {slide.title}
                      </h2>
                    )}
                    <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed max-w-lg">
                      {slide.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}