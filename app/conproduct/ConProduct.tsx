"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

// --- MOCK_PRODUCTS และ Type เหมือนเดิม ---
type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  badge?: "ใหม่" | "ฮิต" | "ลดราคา";
  image: string;
  category: string;
};

const MOCK_PRODUCTS: Product[] = [
  { id: "p1", name: "ปุ๋ยอินทรีย์เคมี 12 - 3 - 5", price: 1290, oldPrice: 1590, image: "/image/Product/1.jpg", category: "ปุ๋ย" },
  { id: "p2", name: "ปุ๋ยอินทรีย์เคมี 12 - 6 - 15", price: 1390, oldPrice: 1590, image: "/image/Product/2.png", category: "ปุ๋ย"},
  { id: "p3", name: "ปุ๋ยเคมี 0 - 0 - 30", price: 1390, oldPrice: 1590, image: "/image/Product/3.png", category: "ปุ๋ย" },
  { id: "p4", name: "ปุ๋ยอินทรีย์ผง MO 25 %", price: 690, oldPrice: 790, image: "/image/Product/4.png", category: "ปุ๋ย",},
  { id: "p5", name: "ปุ๋ยอินทรีย์เม็ด MO 20 %", price: 790, oldPrice: 890, image: "/image/Product/1.jpg", category: "ปุ๋ย" },
  { id: "p6", name: "ปุ๋ยอินทรีเคมี 6 - 3 - 3", price: 1090, oldPrice: 1390, image: "/image/Product/2.png", category: "ปุ๋ย" },
];

export default function Products() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    let arr = [...MOCK_PRODUCTS];
    if (q.trim()) {
      const k = q.toLowerCase();
      arr = arr.filter(p => p.name.toLowerCase().includes(k));
    }
    return arr;
  }, [q]);

  return (
    <section className="bg-white pb-20" id="products">
      {/* Header with Background */}
      <div className="relative bg-slate-100 bg-cover bg-center min-h-[400px] md:min-h-[700px] flex flex-col justify-end pb-12 md:pb-16" 
  style={{ backgroundImage: "url('/image/bg-header.jpg')" }} 
>

  <div className="relative mx-auto max-w-7xl px-4 text-center w-full mt-28 md:mt-44">
    <p className="text-cyan-400 font-bold uppercase tracking-widest text-base drop-shadow-sm">
      สินค้าแนะนำ
    </p>
    
    <h2 className="mt-2 text-3xl md:text-5xl font-bold text-gray-900 drop-shadow-sm">
      ผลิตภัณฑ์ยอดนิยมของเรา
    </h2>
    
    <p className="mx-auto mt-3 max-w-2xl text-base md:text-lg text-gray-800 drop-shadow-sm">
      คุณภาพคัดสรร เหมาะกับการเกษตรทุกรูปแบบ พร้อมโปรโมชันพิเศษ
    </p>
  </div>
</div>

      <div className="mx-auto max-w-7xl px-4 -mt-8 relative z-10">
        <div className="flex justify-center mb-12">
          <div className="flex items-center w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
            <div className="pl-4">
               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ค้นหาสินค้าที่ท่านต้องการ..."
              className="w-full p-3 outline-none text-gray-700 bg-transparent"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8">
          {filtered.map(p => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p }: { p: Product }) {
  const hasDiscount = p.oldPrice && p.oldPrice > p.price;

  return (
    <Link
      href={`/product/${p.id}`}
      className="group flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      <div className="relative w-full aspect-square bg-[#f9f9f9] p-6 overflow-hidden">
        <img 
          src={p.image} 
          alt={p.name} 
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" 
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 md:gap-3">
            {/* ป้ายสถานะพิเศษ (ใหม่/ฮิต) */}
            {p.badge && (
              <span className="bg-emerald-500 text-white text-xs md:text-sm font-extrabold px-4 py-1.5 rounded-full shadow-md tracking-wider uppercase text-center">
                {p.badge}
              </span>
            )}
            
            {/* ป้ายลดราคา (SALE) */}
            {hasDiscount && (
              <span className="bg-rose-500 text-white text-xs md:text-sm font-extrabold px-4 py-1.5 rounded-full shadow-md tracking-wider uppercase text-center">
                SALE
              </span>
            )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-gray-800 font-bold text-xl md:text-3xl line-clamp-2 min-h-[3rem] group-hover:text-emerald-600 transition-colors">
          {p.name}
        </h3>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-4xl md:text-5xl font-black text-emerald-700">฿{p.price.toLocaleString()}</span>
            {hasDiscount && (
              <span className="text-2xl md:text-3xl text-gray-400 line-through">฿{p.oldPrice?.toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}