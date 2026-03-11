"use client";

import Link from "next/link";
import Image from "next/image";

import { MOCK_PRODUCTS } from "../data/productsdetail";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Products() {
  return (
    <section className="py-12 px-4 md:px-10 bg-sky-50">

      <h2 className="text-2xl font-black text-sky-900 mb-6 flex items-center gap-2">
        🛒 สินค้าแนะนำ
      </h2>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        spaceBetween={20}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
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

    </section>
  );
}