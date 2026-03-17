"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { plants } from "../data/datafame";
import Image from "next/image";
import AnimateIn from "../components/AnimateIn";

type Sort = "nameAsc" | "nameDesc" | "steps" | "fert";

export default function PlantsPage() {
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState<Sort>("nameAsc");

  const list = useMemo(() => {
    let data = [...plants];
    if (q.trim()) {
      const k = q.toLowerCase();
      data = data.filter(
        (p) => p.name.toLowerCase().includes(k) || p.desc.toLowerCase().includes(k)
      );
    }
    if (sortBy === "nameAsc") data.sort((a, b) => a.name.localeCompare(b.name, "th"));
    if (sortBy === "nameDesc") data.sort((a, b) => b.name.localeCompare(a.name, "th"));
    if (sortBy === "steps") data.sort((a, b) => (b.howToGrow?.length || 0) - (a.howToGrow?.length || 0));
    if (sortBy === "fert") data.sort((a, b) => (b.fertilizer?.length || 0) - (a.fertilizer?.length || 0));
    return data;
  }, [q, sortBy]);

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* ✅ HERO SECTION - แบบเดียวกับหน้า Products */}
      <section className="relative">
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/background/background1.webp" 
            alt="พืชทั้งหมด" 
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-x-0 bottom-6 md:bottom-10">
          <div className="max-w-7xl mx-auto px-4 animate-fade-in-up">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-md">
              🌱 พืชทั้งหมด
            </h1>
            <p className="text-white/90 text-sm md:text-base mt-1">
              แหล่งรวบรวมข้อมูลการปลูกและสูตรปุ๋ยเพื่อเกษตรกรยุคใหม่
            </p>
          </div>
        </div>
      </section>

      {/* ✅ MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* ✅ CONTROLS SECTION - ธีมสีฟ้าสดใส น่าดึงดูด */}
        <AnimateIn className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 border-b border-gray-100 pb-8">
          
          {/* จำนวนผลลัพธ์ */}
          <div className="flex items-center gap-3">
            <div className="bg-sky-100 p-2.5 rounded-2xl text-sky-600 shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Results</p>
              <p className="text-gray-700 font-medium">
                พบพืชทั้งหมด <span className="text-sky-600 text-xl font-black">{list.length}</span> ชนิด
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
            {/* Search Input */}
            <div className="relative group w-full sm:w-80">
              <svg 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400 group-focus-within:text-sky-600 transition-colors" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ค้นหาชื่อพืช หรือรายละเอียด..."
                className="w-full pl-11 pr-4 py-3 bg-sky-50/50 border border-sky-100 rounded-2xl text-sm focus:ring-4 focus:ring-sky-500/10 focus:border-sky-300 focus:bg-white transition-all outline-none shadow-sm placeholder:text-gray-400"
              />
            </div>

            {/* Sort Selector */}
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as Sort)}
                className="w-full sm:w-auto appearance-none rounded-2xl border border-sky-100 bg-sky-50/50 px-6 py-3 pr-12 text-sm font-bold text-gray-700 focus:ring-4 focus:ring-sky-500/10 focus:border-sky-300 outline-none cursor-pointer shadow-sm hover:bg-sky-100/50 transition-all"
              >
                <option value="nameAsc">เรียง: ก - ฮ</option>
                <option value="nameDesc">เรียง: ฮ - ก</option>
                <option value="steps">เรียง: ขั้นตอนมากที่สุด</option>
                <option value="fert">เรียง: สูตรปุ๋ยมากที่สุด</option>
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </AnimateIn>

        {/* ✅ PLANT GRID */}
        <AnimateIn className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" animation="fade-in" delay="0.1s">
          {list.map((p) => (
            <Link
              href={`/plants/${p.id}`} 
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-sky-900/10 transition-all duration-500"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[16/11] overflow-hidden">
               <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <span className="rounded-xl bg-sky-600/90 px-3 py-1.5 text-[10px] font-black text-white backdrop-blur-md shadow-lg flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    {p.howToGrow?.length || 0} ขั้นตอน
                  </span>
                  <span className="rounded-xl bg-indigo-600/90 px-3 py-1.5 text-[10px] font-black text-white backdrop-blur-md shadow-lg">
                    🧪 ปุ๋ย {p.fertilizer?.length || 0} รายการ
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-3">
                  <h2 className="text-xl font-extrabold text-gray-800 group-hover:text-sky-600 transition-colors">
                    {p.name}
                  </h2>
                  <div className="h-1 w-6 bg-sky-500 rounded-full mt-1.5 transition-all duration-300 group-hover:w-12" />
                </div>
                
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                  {p.desc}
                </p>

                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Manual Guide
                  </span>
                  <span className="flex items-center gap-1 text-sky-600 font-extrabold text-sm group-hover:gap-2 transition-all">
                    ดูคำแนะนำ
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </AnimateIn>

        {/* ✅ EMPTY STATE */}
        {list.length === 0 && (
          <div className="mt-12 rounded-[3rem] border-2 border-dashed border-sky-100 py-20 text-center bg-sky-50/20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-gray-800">ไม่พบข้อมูลพืชที่คุณค้นหา</h3>
            <p className="text-gray-500 text-sm">ลองเปลี่ยนคำค้นหา หรือล้างตัวกรองออก</p>
          </div>
        )}
      </main>
    </div>
  );
}