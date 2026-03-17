"use client";

import Link from "next/link";
import Image from "next/image";
import AnimateIn from "./AnimateIn";

import { MOCK_PRODUCTS } from "../data/productsdetail";

import { Swiper, SwiperSlide } from "swiper/react";
// ลบ Pagination ออกตามต้องการ
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function Products() {
  return (
    <section className="py-12 px-4 md:px-10 bg-sky-50">

      <AnimateIn>
        <h2 className="text-2xl font-black text-sky-900 mb-6 flex items-center gap-2">
          🛒 สินค้าแนะนำ
        </h2>
      </AnimateIn>

      <AnimateIn animation="fade-in" delay="0.1s">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop
          spaceBetween={20}
          navigation
          breakpoints={{
            // ตั้งค่าสำหรับมือถือ
            0: { 
              slidesPerView: 1.5,     // เปลี่ยนจาก 1.2 เป็น 1.5 เพื่อให้เห็นขอบซ้ายขวา
              centeredSlides: true    // บังคับให้การ์ดที่ Active อยู่ตรงกลางเสมอ
            },
            // ตั้งค่าสำหรับ Tablet
            640: { 
              slidesPerView: 2,
              centeredSlides: false   // จอใหญ่ไม่ต้องอยู่ตรงกลาง
            },
            // ตั้งค่าสำหรับ PC
            1024: { 
              slidesPerView: 4,
              centeredSlides: false 
            },
          }}
        >
          {MOCK_PRODUCTS.map((p) => (
            <SwiperSlide key={p.id}>
              <Link href={`/products/${p.id}`}>

                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 border border-sky-100 cursor-pointer hover:-translate-y-1">

                  <div className="relative w-full h-[180px] mb-3">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      loading="lazy"
                      quality={80}
                    />
                  </div>

                  <h3 className="text-sm font-bold text-sky-900 line-clamp-2">
                    {p.name}
                  </h3>

                  <p className="text-sky-600 font-black mt-1 text-lg">
                     ฿{p.price.toLocaleString()}
                  </p>

                  {p.oldPrice && (
                    <p className="text-gray-400 font-black mt-1 text-lg line-through">
                      จากปกติ ฿{p.oldPrice.toLocaleString()}
                    </p>
                  )}
                </div>

              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </AnimateIn>

    </section>
  );
}