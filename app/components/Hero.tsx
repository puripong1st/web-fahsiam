"use client";

import { useState, useEffect } from "react";

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

  const heroHeights = "h-[260px] sm:h-[320px] md:h-[480px] lg:h-[600px] xl:h-[720px]";

  return (
    <section className={`relative w-full overflow-hidden ${heroHeights}`}>
      <div
        className={`flex h-full transition-transform duration-700 ease-in-out`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`min-w-full h-full bg-center bg-cover flex items-end justify-start relative`}
            style={{ backgroundImage: `url(${slide.img})` }}
          >
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

      <div className="absolute bottom-4 sm:bottom-6 w-full flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              current === i ? "bg-blue-400" : "bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}