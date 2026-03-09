// src/sections/Products.tsx (หรือ src/pages/Products.tsx ก็ได้)
"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  badge?: "ใหม่" | "ฮิต" | "ลดราคา";
  image: string;
  category: string; // เช่น "ปุ๋ย", "เมล็ดพันธุ์", "อุปกรณ์"
};

const MOCK_PRODUCTS: Product[] = [
  { id: "p1", name: "ปุ๋ยอินทรีย์ สูตรเพิ่มดินดี", price: 250, image: "/image/Product/1.jpg", category: "ปุ๋ย", badge: "ฮิต" },
  { id: "p2", name: "เมล็ดพันธุ์ข้าวโพด HY-99", price: 120, oldPrice: 150, image: "/image/Product/2.png", category: "เมล็ดพันธุ์", badge: "ลดราคา" },
  { id: "p3", name: "เครื่องพ่นยา 18L PRO", price: 3500, image: "/image/Product/3.png", category: "อุปกรณ์" },
  { id: "p4", name: "ถังพ่นปุ๋ย 5L", price: 890, image: "/image/Product/4.png", category: "อุปกรณ์", badge: "ใหม่" },
  { id: "p5", name: "ปุ๋ยเคมี 15-15-15", price: 420, image: "/image/Product/1.jpg", category: "ปุ๋ย" },
  { id: "p6", name: "เมล็ดพันธุ์ข้าวหอมมะลิ", price: 200, image: "/image/Product/2.png", category: "เมล็ดพันธุ์" },
];

const CATEGORIES = ["ทั้งหมด", "ปุ๋ย", "เมล็ดพันธุ์", "อุปกรณ์"] as const;
type Cat = typeof CATEGORIES[number];

export default function Products() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Cat>("ทั้งหมด");
  const [sortBy, setSortBy] = useState<"new"|"priceAsc"|"priceDesc">("new");

  const filtered = useMemo(() => {
    let arr = [...MOCK_PRODUCTS];

    // filter by category
    if (cat !== "ทั้งหมด") {
      arr = arr.filter(p => p.category === cat);
    }
    // search
    if (q.trim()) {
      const k = q.toLowerCase();
      arr = arr.filter(p => p.name.toLowerCase().includes(k));
    }
    // sort
    if (sortBy === "priceAsc") arr.sort((a,b)=>a.price-b.price);
    if (sortBy === "priceDesc") arr.sort((a,b)=>b.price-a.price);
    // "new": let original order (or you can add date field)

    return arr;
  }, [q, cat, sortBy]);

  return (
    <section className="bg-gradient-to-b from-white via-sky-50/30 to-white py-12" id="products">
      <div className="mx-auto max-w-7xl px-4 mt-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sky-700 font-medium">สินค้าแนะนำ</p>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
              ผลิตภัณฑ์ยอดนิยมของเรา
            </h2>
            <p className="mt-1 text-gray-600 text-sm">
              คุณภาพคัดสรร เหมาะกับการเกษตรทุกรูปแบบ พร้อมโปรโมชันพิเศษ
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <div className="flex rounded-lg border border-gray-300 bg-white px-3 py-2">
              <input
                value={q}
                onChange={(e)=>setQ(e.target.value)}
                placeholder="ค้นหาสินค้า…"
                className="w-56 md:w-64 outline-none text-sm"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e)=>setSortBy(e.target.value as any)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              <option value="new">เรียง: มาใหม่</option>
              <option value="priceAsc">ราคาต่ำ → สูง</option>
              <option value="priceDesc">ราคาสูง → ต่ำ</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={()=>setCat(c)}
              className={`rounded-full px-4 py-2 text-sm border transition
                ${cat===c ? "bg-sky-600 text-white border-sky-600" : "bg-white hover:bg-sky-50 border-gray-300 text-gray-700"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Promo banner (optional) */}
        <div className="mt-6 overflow-hidden bg-white">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-6">
              <h3 className="text-xl font-bold text-gray-900">โปรโมชันเกษตรกรต้นฤดูกาล</h3>
              <p className="mt-1 text-gray-600 text-sm">ซื้อครบ 1,500 บาท ส่งฟรีทั่วประเทศ</p>
              <Link
                href={`/promo`}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white font-semibold hover:bg-emerald-700"
              >
                ดูโปรโมชัน
              </Link>
            </div>
            <div className="md:w-80 h-40 md:h-auto">
              <img src="/image/Test/11.jpg" className="h-full w-full object-cover" alt="banner" />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map(p => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href={`/products`}
            className="inline-flex items-center rounded-xl border px-5 py-3 font-semibold text-sky-700 hover:bg-sky-50"
          >
            ดูสินค้าทั้งหมด →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ===== Card component ===== */
function ProductCard({ p }: { p: Product }) {
  const hasDiscount = p.oldPrice && p.oldPrice > p.price;

  return (
    <Link
    
      href={`/product/${p.id}`}
      className="group relative overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm hover:shadow-lg transition"
    >
      {/* image with ratio */}
      <div className="relative">
        <div className="aspect-[4/3] w-full bg-white">
          <img src={p.image} alt={p.name} className="h-full w-full object-contain p-4 transition group-hover:scale-[1.03]" />
        </div>

        {/* badges */}
        {p.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-sky-600/90 px-3 py-1 text-xs font-semibold text-white">
            {p.badge}
          </span>
        )}
        {hasDiscount && (
          <span className="absolute right-3 top-3 rounded-full bg-rose-600/90 px-3 py-1 text-xs font-semibold text-white">
            ลดราคา
          </span>
        )}
      </div>

      {/* body */}
      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">{p.name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sky-700 font-bold">฿{p.price.toLocaleString()}</span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">฿{p.oldPrice!.toLocaleString()}</span>
          )}
        </div>
        <div className="mt-3">
          <button
            onClick={(e)=>{ e.preventDefault(); /* TODO: เพิ่มลงตะกร้า */ }}
            className="w-full rounded-lg bg-sky-600 py-2 text-white text-sm font-semibold hover:bg-sky-700"
          >
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    </Link>
  );
}
