"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { plants } from "../../data/datafame";
import Image from "next/image";

export default function PlantDetail() {
  const params = useParams();
  const id = params?.id as string;

  const plant = useMemo(() => {
    return plants.find((p) => p.id === id);
  }, [id]);

  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    if (plant) {
      setChecked(new Array(plant.howToGrow.length).fill(false));
    }
  }, [plant]);

  if (!plant) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-gray-400 text-xl font-bold">ไม่พบข้อมูลพืชที่เลือก (ID: {id})</p>
        <Link href="/plants" className="text-sky-600 hover:text-sky-700 font-bold mt-6 inline-block transition-colors">
          ← กลับไปหน้าเลือกพืช
        </Link>
      </div>
    );
  }

  const toggleStep = (i: number) =>
  setChecked((prev) => {
    const next = [...prev];

    // อนุญาตให้กดได้เฉพาะ step ถัดไปเท่านั้น
    const firstUnchecked = prev.findIndex((v) => !v);

    if (i === firstUnchecked) {
      next[i] = true;
    }

    return next;
  });

  const progress = checked.length 
    ? Math.round((checked.filter(Boolean).length / checked.length) * 100) 
    : 0;

  const nextStepIndex = checked.findIndex((v) => !v);
  const stepKeys = ["prepare", "plant", "water", "feed", "harvest"];

  const currentGuide = useMemo(() => {
    if (nextStepIndex === -1) return null;
    const key = stepKeys[nextStepIndex];
    return plant.phaseGuides.find((g) => g.key === key) || null;
  }, [nextStepIndex, plant]);

  return (
    <div className="min-h-screen bg-[#f8faff] font-sans pb-20">
      {/* Top Header Navigation */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <Link href="/plants" className="text-sky-600 hover:text-sky-700 font-bold flex items-center gap-2 text-sm transition-all group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> กลับไปหน้าเลือกพืช
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Image & Basic Info (4 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-[2.5rem] shadow-2xl shadow-sky-900/10 border-8 border-white">
              <Image
                src={plant.image}
                alt={plant.name}
                className="w-full h-full object-cover transition duration-700 hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-white/50">
                <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest text-center">ความสำเร็จ</p>
                <p className="text-xl font-black text-gray-800 text-center">{progress}%</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
              <div className="inline-flex px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-[11px] font-black uppercase tracking-wider mb-4 border border-sky-100">
                Plant Information
              </div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">{plant.name}</h1>
              <p className="mt-4 text-gray-500 leading-relaxed">
                {plant.desc}
              </p>
              {plant.fertilizer?.length && (
              <div className="mt-6">
                <h3 className="font-black text-gray-800 mb-3 flex items-center gap-2">
                   🌱 ปุ๋ยที่ใช้กับพืชนี้
                     </h3>

                <div className="flex flex-wrap gap-2">
                 {plant.fertilizer.map((f, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-bold bg-green-50 text-green-700 rounded-lg border border-green-100"
                     >
                    {f}
                 </span>
                   ))}
                 </div>
               </div>
              )}
            </div>
            
          </div>

          {/* Right Column: Checklist & Progress (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
              </div>
              
              <h2 className="text-xl font-black text-gray-800 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white text-sm">✓</span>
                ขั้นตอนการทำงานของคุณ
              </h2>

              <div className="mt-8 space-y-4">
                {plant.howToGrow.map((s, i) => (
                  <label 
                    key={i} 
                    className={`group flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      checked[i] 
                      ? "bg-sky-50/50 border-sky-200" 
                      : "bg-white border-gray-100 hover:border-sky-200 hover:bg-sky-50/20"
                    }`}
                  >
                    <div className="relative flex items-center">
                        <input
                            type="checkbox"
                            checked={checked[i] || false}
                            disabled={i !== nextStepIndex}
                            onChange={() => toggleStep(i)}
                            className="peer h-6 w-6 appearance-none rounded-lg border-2 border-sky-200 checked:bg-sky-600 checked:border-sky-600 transition-all cursor-pointer"
                        />
                        <svg className="absolute w-4 h-4 text-white left-1 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className={`text-sm md:text-base transition-all ${
                        checked[i] ? "text-gray-400 line-through" : "text-gray-700 font-bold"
                    }`}>
                      {s}
                    </span>
                  </label>
                ))}
              </div>

              {/* Enhanced Progress Bar */}
              <div className="mt-8 pt-6 border-t border-gray-50">
                <div className="flex justify-between items-end mb-3">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Current Progress</span>
                    <span className="text-2xl font-black text-sky-600">{progress}%</span>
                </div>
                <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden p-1">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-blue-600 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Guide Section */}
        <div className="mt-12">
          {nextStepIndex === -1 ? (
            <div className="rounded-[3rem] border-2 border-dashed border-sky-200 bg-sky-50/30 p-12 text-center shadow-inner">
              <div className="text-6xl mb-6 animate-bounce">🏆</div>
              <h3 className="text-3xl font-black text-sky-900">ดูแลและเตรียมเก็บเกี่ยว</h3>
              <p className="mt-4 text-sky-700 max-w-2xl mx-auto font-medium">
                ยอดเยี่ยมมาก! คุณดำเนินการครบทุกขั้นตอนหลักแล้ว <br/>
                อย่าลืมหมั่นตรวจสอบความชื้นและศัตรูพืช เพื่อผลผลิตที่สมบูรณ์ที่สุด
              </p>
            </div>
          ) : currentGuide ? (
            <div className="rounded-[3rem] bg-white p-8 md:p-12 border border-gray-100 shadow-2xl shadow-sky-900/5 relative overflow-hidden group">
              {/* Decoration Line */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-gray-50">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-ping"></span>
                    <p className="text-xs font-black text-sky-500 uppercase tracking-[0.2em]">Next Objective</p>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                    {currentGuide.title}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-50 text-gray-700 font-black text-sm border border-gray-100">
                  <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {currentGuide.when}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Actions */}
                <div className="space-y-6">
                  <h4 className="text-lg font-black text-gray-800 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-sky-500 rounded-full"></span>
                    สิ่งที่ต้องปฏิบัติ
                  </h4>
                  <ul className="grid gap-3">
                    {currentGuide.actions.map((a, i) => (
                      <li key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50/50 text-gray-600 text-sm md:text-base border border-transparent hover:border-sky-100 hover:bg-white transition-all">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600 text-[10px] font-bold">{i+1}</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="space-y-8">
                  {currentGuide.fertilizers?.length ? (
                    <div className="bg-sky-50/50 p-6 rounded-[2rem] border border-sky-100">
                      <h4 className="font-black text-sky-900 flex items-center gap-3 mb-4">
                        🧪 ปุ๋ยที่แนะนำ
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {plant.fertilizer.map((f, i) => (
                          <span key={i} className="bg-white text-sky-700 px-4 py-2 rounded-xl text-xs font-black shadow-sm border border-sky-100 group-hover:scale-105 transition-transform">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {currentGuide.care?.length ? (
                    <div>
                      <h4 className="font-black text-gray-800 flex items-center gap-3 mb-4">
                        🛡️ การดูแลเพิ่มเติม
                      </h4>
                      <ul className="space-y-3">
                        {currentGuide.care.map((c, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-500 text-sm">
                                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full"></span>
                                {c}
                            </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>

              {currentGuide.note && (
                <div className="mt-12 p-6 bg-indigo-50/50 rounded-[2rem] border border-indigo-100 flex gap-4 items-start">
                  <span className="text-2xl text-indigo-500">💡</span>
                  <div>
                    <p className="text-indigo-900 font-black text-sm uppercase tracking-wider mb-1">Expert Advice</p>
                    <p className="text-indigo-800/80 text-sm leading-relaxed">{currentGuide.note}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}