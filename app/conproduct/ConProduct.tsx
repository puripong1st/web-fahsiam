"use client";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { MOCK_PRODUCTS } from "../data/productsdetail";
import Image from "next/image";
import useDebounce from "../hooks/useDebounce"; // Add this line

type Product = {
  id: string
  name: string
  price: number
  oldPrice?: number
  image: string
  badge?: string
}

export default function Products() {
  const [q, setQ] = useState("");
  const debouncedQ = useDebounce(q, 300);

  const filtered = useMemo(() => {
    let arr = [...MOCK_PRODUCTS];
    if (debouncedQ.trim()) {
      const k = debouncedQ.toLowerCase();
      arr = arr.filter(p => p.name.toLowerCase().includes(k));
    }
    return arr;
  }, [debouncedQ]);

  return (
    <section className="bg-white pb-20" id="products">
      {/* Header with Background */}
      <div
        className="relative bg-slate-100 bg-cover bg-center min-h-[320px] md:min-h-[520px] flex flex-col justify-end pb-12 md:pb-16"
        style={{ backgroundImage: "url('/background/background1.webp')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

        <div className="relative mx-auto max-w-6xl px-4 text-center w-full animate-fade-in-up">
          <p className="font-bold uppercase tracking-[0.15em] text-sm md:text-base text-sky-200">
            สินค้าแนะนำ
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
            ผลิตภัณฑ์ยอดนิยมของเรา
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-sky-100 leading-relaxed">
            คุณภาพคัดสรร เหมาะกับการเกษตรทุกรูปแบบ
            <br className="hidden md:block" />
            พร้อมโปรโมชันพิเศษสำหรับคุณ
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 -mt-8 relative z-10">
        <div className="flex justify-center mb-12 animate-fade-in-up stagger-2">
          <div className="flex items-center w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
            <div className="pl-4">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ค้นหาสินค้าที่ท่านต้องการ..."
              aria-label="ค้นหาสินค้า"
              className="w-full p-3 outline-none text-gray-700 bg-transparent"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, index }: { p: Product; index: number }) {
  const hasDiscount = p.oldPrice && p.oldPrice > p.price;
  const stagger = `stagger-${Math.min(index % 6 + 1, 6)}`;

  return (
    <Link
      href={`/products/${p.id}`}
      aria-label={`ดูรายละเอียด ${p.name}`}
      className={`animate-scale-in ${stagger} group flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden`}
    >
      <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
        <Image
          src={p.image}
          alt={p.name}
          width={400}
          height={400}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {p.badge && (
            <span className="bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md tracking-wide">
              {p.badge}
            </span>
          )}
          {hasDiscount && (
            <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md tracking-wide">
              SALE
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-gray-800 font-bold text-lg md:text-xl line-clamp-2 min-h-[3rem] group-hover:text-sky-700 transition-colors">
          {p.name}
        </h3>

        <div className="mt-3 flex items-baseline gap-3">
          <span className="text-2xl md:text-3xl font-extrabold text-sky-800">
            ฿{p.price.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-base text-gray-400 line-through decoration-rose-400">
              ฿{p.oldPrice?.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}