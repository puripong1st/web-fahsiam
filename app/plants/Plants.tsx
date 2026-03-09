"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { plants } from "../data/datafame";

type Sort = "nameAsc" | "nameDesc" | "steps" | "fert";

export default function PlantsPage() {
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState<Sort>("nameAsc");

  const list = useMemo(() => {
    let data = [...plants];

    // search ชื่อ/คำอธิบาย
    if (q.trim()) {
      const k = q.toLowerCase();
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(k) ||
          p.desc.toLowerCase().includes(k)
      );
    }

    // sort
    if (sortBy === "nameAsc") data.sort((a, b) => a.name.localeCompare(b.name, "th"));
    if (sortBy === "nameDesc") data.sort((a, b) => b.name.localeCompare(a.name, "th"));
    if (sortBy === "steps") data.sort((a, b) => (b.howToGrow?.length || 0) - (a.howToGrow?.length || 0));
    if (sortBy === "fert") data.sort((a, b) => (b.fertilizer?.length || 0) - (a.fertilizer?.length || 0));

    return data;
  }, [q, sortBy]);

  return (
    <div className="bg-gradient-to-b from-white via-emerald-50/40 to-white min-h-screen">

      {/* HERO */}
      <section className="relative">
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img src="/background/background1.png" alt="ข่าวสาร" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-x-0 bottom-6 md:bottom-10">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow">
              🌱 พืชทั้งหมด
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              เลือกเรียนรู้พืชที่สนใจ และเริ่มปลูกอย่างเป็นขั้นตอน 
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-gray-700">
            พบทั้งหมด{" "}
            <span className="font-bold text-emerald-700">{list.length}</span>{" "}
            ชนิด
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" className="text-gray-400"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zM4 9.5C4 6.46 6.46 4 9.5 4S15 6.46 15 9.5S12.54 15 9.5 15S4 12.54 4 9.5"/></svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ค้นหาชื่อพืช / คำอธิบาย…"
                className="w-64 md:w-80 outline-none text-sm"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as Sort)}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
            >
              <option value="nameAsc">เรียง: ก-ฮ</option>
              <option value="nameDesc">เรียง: ฮ-ก</option>
              <option value="steps">ขั้นตอนมาก → น้อย</option>
              <option value="fert">ปุ๋ยหลากหลาย → น้อย</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p) => (
            <Link
              href={`/plants/${p.id}`} 
              key={p.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm hover:shadow-lg transition"
            >
              {/* top accent line */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400" />

              {/* image */}
              <div className="relative">
                <div className="aspect-[4/3] w-full bg-white">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                  />
                </div>

                {/* badges */}
                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-emerald-600/90 px-3 py-1 text-[11px] font-semibold text-white shadow">
                    {p.howToGrow?.length || 0} ขั้นตอน
                  </span>
                  <span className="rounded-full bg-sky-600/90 px-3 py-1 text-[11px] font-semibold text-white shadow">
                    ปุ๋ย {p.fertilizer?.length || 0} รายการ
                  </span>
                </div>
              </div>

              {/* body */}
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900">{p.name}</h2>
                <p className="mt-1 text-gray-600 text-sm line-clamp-2">{p.desc}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    คู่มือแบบทีละขั้น
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                    ดูคำแนะนำ →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {list.length === 0 && (
          <div className="mt-10 rounded-2xl border border-gray-300 bg-white p-8 text-center text-gray-600 shadow-sm">
            ไม่พบพืชที่ตรงกับคำค้น
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 rounded-2xl overflow-hidden border border-gray-300 bg-gradient-to-br from-sky-600 to-emerald-500 text-white">
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-extrabold">เริ่มปลูกอย่างมั่นใจ</h3>
              <p className="mt-1 text-white/90 text-sm">
                เลือกพืชที่ใช่ แล้วทำตามขั้นตอน—ระบบจะช่วยแนะนำตามลำดับให้เสร็จครบ
              </p>
              <Link
                href="/plants/rice" 
                className="mt-4 inline-flex items-center rounded-xl bg-white px-5 py-3 font-semibold text-emerald-700 hover:bg-white/90"
              >
                เริ่มที่ “ข้าว” →
              </Link>
            </div>
            <div className="h-40 md:h-full">
              <img
                src="/image/Tree/rice.jpg"
                alt="เริ่มปลูก"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}