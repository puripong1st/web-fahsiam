"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  type FertSlide,
  MONTHLY_PLANTS,
  CROP_OPTIONS,
  CROP_FERT_SLIDES,
  CROP_USAGE_DETAILS,
  DAYS_OF_WEEK,
} from "../data/calendarData";

// ═══════════════════════════════════════════════
// COMPONENT — UI only
// ═══════════════════════════════════════════════
export default function CalendarWidget() {
  // ✅ currentTime เริ่มเป็น null → ป้องกัน hydration mismatch
  const [currentTime, setCurrentTime]   = useState<Date | null>(null);
  const [viewDate, setViewDate]         = useState(new Date());
  const [selectedCrop, setSelectedCrop] = useState("");

  // State สำหรับ Modal ปุ๋ย
  const [thumbIdx, setThumbIdx]         = useState(0);
  const [modalOpen, setModalOpen]       = useState(false);
  const [modalIdx, setModalIdx]         = useState(0);

  // State สำหรับ Modal พืชในฤดูกาล
  const [widgetPlantIdx, setWidgetPlantIdx] = useState(0);
  const [plantModalOpen, setPlantModalOpen] = useState(false);
  const [modalPlantIdx, setModalPlantIdx]   = useState(0);

  const timerRef      = useRef<ReturnType<typeof setInterval> | null>(null);
  const plantTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ✅ ไม่เรียก setState ตรงๆ ใน body ของ effect
  // ใช้ setTimeout delay 0 สำหรับ set เวลาครั้งแรก (อยู่ใน callback ไม่ใช่ body)
  // จากนั้น setInterval 1000ms อัปเดตต่อเนื่อง
  useEffect(() => {
    const init = setTimeout(() => setCurrentTime(new Date()), 0);
    const t    = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      clearTimeout(init);
      clearInterval(t);
    };
  }, []);

  // handler เปลี่ยนพืช
  const handleSelectCrop = (crop: string) => {
    setSelectedCrop(crop);
    setThumbIdx(0);
    setModalIdx(0);
  };

  // handler เปลี่ยนเดือน
  const handleSetViewDate = (date: Date) => {
    setViewDate(date);
    setWidgetPlantIdx(0);
  };

  const slides: FertSlide[] = selectedCrop ? (CROP_FERT_SLIDES[selectedCrop] ?? []) : [];
  const totalFert = slides.length;

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (totalFert <= 1) return;
    timerRef.current = setInterval(() => {
      setThumbIdx((p) => (p + 1) % totalFert);
    }, 3000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [totalFert, selectedCrop]);

  const viewYear    = viewDate.getFullYear();
  const viewMonth   = viewDate.getMonth();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const emptyAfter  = 42 - (firstDay + daysInMonth);

  const plantInfo   = MONTHLY_PLANTS[viewMonth];
  const totalPlants = plantInfo?.plants?.length || 0;

  useEffect(() => {
    if (plantTimerRef.current) clearInterval(plantTimerRef.current);
    if (totalPlants <= 1 || totalPlants === 0) return;
    plantTimerRef.current = setInterval(() => {
      setWidgetPlantIdx((prev) => (prev + 1) % totalPlants);
    }, 3500);
    return () => { if (plantTimerRef.current) clearInterval(plantTimerRef.current); };
  }, [totalPlants, viewMonth]);

  const usageData  = selectedCrop ? CROP_USAGE_DETAILS[selectedCrop] : null;
  const thumbSlide = slides[thumbIdx] ?? null;
  const modalSlide = slides[modalIdx] ?? null;

  const moveFertModal = (dir: 1 | -1) => {
    if (totalFert === 0) return;
    setModalIdx((p) => (p + dir + totalFert) % totalFert);
  };

  const moveModalPlant = (dir: 1 | -1) => {
    if (totalPlants === 0) return;
    setModalPlantIdx((p) => (p + dir + totalPlants) % totalPlants);
  };

  const currentWidgetPlant = plantInfo?.plants[widgetPlantIdx];
  const activeModalPlant   = plantInfo?.plants[modalPlantIdx];

  return (
    <>
    
    <section className="py-16 bg-gradient-to-br from-emerald-50 via-white to-sky-50" id="calendar">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            ปฏิทินการเกษตร
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            วางแผนการ<span className="text-emerald-600">เพาะปลูก</span>ของคุณ
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            เลือกพืชที่ต้องการปลูกเพื่อดูข้อมูลปุ๋ยและอัตราการใช้ที่เหมาะสมสำหรับแต่ละระยะ
          </p>
        </div>
        
        <div className="flex flex-col xl:flex-row items-start gap-6 w-full">

          {/* ══════ ซ้าย: การ์ดปฏิทิน ══════ */}
          <div className="w-full xl:w-[38%] bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col h-fit hover:shadow-2xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-6 gap-4">
              <div className="flex flex-col items-center md:items-start w-full md:w-auto">
                <div className="flex items-center justify-center gap-3 mb-2 w-full">
                  <button
                    onClick={() => handleSetViewDate(new Date(viewYear, viewMonth - 1, 1))}
                    className="p-2 rounded-full hover:bg-gradient-to-r hover:from-sky-100 hover:to-blue-100 text-gray-600 hover:text-sky-700 transition-all duration-200 hover:scale-110"
                  >◀</button>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent w-40 text-center">
                    {viewDate.toLocaleDateString("th-TH", { month: "long" })}
                  </h2>
                  <button
                    onClick={() => handleSetViewDate(new Date(viewYear, viewMonth + 1, 1))}
                    className="p-2 rounded-full hover:bg-gradient-to-r hover:from-sky-100 hover:to-blue-100 text-gray-600 hover:text-sky-700 transition-all duration-200 hover:scale-110"
                  >▶</button>
                </div>
                <button
                  onClick={() => handleSetViewDate(new Date())}
                  className="text-sm font-medium text-sky-600 hover:text-sky-800 hover:underline px-2 text-center md:text-left w-full md:w-auto transition-all duration-200 hover:scale-105"
                >
                  🔄 กลับไปเดือนปัจจุบัน
                </button>
              </div>
              <div className="flex flex-col items-center md:items-end w-full md:w-auto">
                <div className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-2 md:mr-2">
                  {viewDate.toLocaleDateString("th-TH", { year: "numeric" })}
                </div>
                {/* ✅ currentTime เป็น null ตอน SSR → แสดง "--:--:--" ป้องกัน hydration error */}
                <div className="text-xl font-mono font-bold text-sky-700 bg-gradient-to-r from-sky-50 to-blue-50 px-4 py-2 rounded-xl shadow-sm border border-sky-100">
                  ⏰ {currentTime
                    ? currentTime.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
                    : "--:--:--"}
                </div>
              </div>
            </div>

            <div className="bg-gray-200 grid grid-cols-7 gap-px border border-gray-200 rounded-xl overflow-hidden h-fit shadow-inner">
              {DAYS_OF_WEEK.map((d, i) => (
                <div key={d} className={`bg-gradient-to-b from-gray-50 to-gray-100 py-2 text-center text-sm font-semibold ${i === 0 ? "text-red-600" : "text-gray-700"}`}>
                  {d}
                </div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`eb${i}`} className="bg-gray-50/40 p-2 min-h-[4rem] md:min-h-[5rem]" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                // ✅ currentTime เป็น null ตอน SSR → isToday false เสมอ ป้องกัน hydration error
                const isToday = currentTime
                  ? day === currentTime.getDate() &&
                    viewMonth === currentTime.getMonth() &&
                    viewYear === currentTime.getFullYear()
                  : false;
                return (
                  <div key={day} className={`p-2 min-h-[4rem] md:min-h-[5rem] hover:bg-gradient-to-br hover:from-sky-50 hover:to-blue-50 transition-all duration-200 cursor-pointer ${isToday ? "bg-gradient-to-br from-sky-50 to-blue-50" : "bg-white"}`}>
                    <div className={`w-7 h-7 mx-auto flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${isToday ? "bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg scale-110 animate-pulse" : "text-gray-700 hover:bg-sky-100 hover:scale-105"}`}>
                      {day}
                    </div>
                  </div>
                );
              })}
              {Array.from({ length: emptyAfter }).map((_, i) => (
                <div key={`ea${i}`} className="bg-gray-50/40 p-2 min-h-[4rem] md:min-h-[5rem]" />
              ))}
            </div>
          </div>

          {/* ══════ ขวา: การ์ดข้อมูลการเกษตร ══════ */}
          <div className="w-full xl:w-[62%] bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col h-fit hover:shadow-2xl transition-shadow duration-300">
            <h3 className="w-full text-xl font-bold text-green-700 mb-6 pb-3 border-b-2 border-green-200 flex items-center justify-center gap-2">
              🌿 แนะนำสำหรับเดือนนี้
            </h3>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 flex-1 items-start">

              {/* ── คอลัมน์ซ้าย: รูป + dropdown ── */}
              <div className="w-full lg:w-[48%] flex flex-col gap-6">
                
                <div className="grid grid-cols-2 gap-4 lg:gap-6">
                  {/* พืชในฤดูกาล */}
                  <div className="flex flex-col items-center">
                    {currentWidgetPlant ? (
                      <div 
                        className="w-full aspect-square rounded-xl shadow-lg border-2 border-green-200 mb-3 overflow-hidden relative group bg-gradient-to-br from-green-50 to-emerald-50 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
                        onClick={() => {
                          setModalPlantIdx(widgetPlantIdx);
                          setPlantModalOpen(true);
                        }}
                      >
                        <Image
                          key={`widget-plant-${viewMonth}-${widgetPlantIdx}`}
                          src={currentWidgetPlant.image}
                          alt={currentWidgetPlant.name}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center gap-1">
                          <span className="text-white text-[15px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-md transform group-hover:scale-110">
                            🔍 ดูรายละเอียด
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full aspect-square rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 mb-3 flex items-center justify-center">
                        <span className="text-gray-400 text-sm text-center px-2">ไม่มีข้อมูล</span>
                      </div>
                    )}
                    <div className="flex flex-col items-center justify-start min-h-[3.5rem] w-full">
                      <span className="text-[14px] xl:text-[15px] font-bold text-gray-700 text-center w-full truncate px-1">🌱 พืชในฤดูกาล</span>
                      <span className="text-[14px] xl:text-[15px] bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold text-center mt-1 px-1 line-clamp-2 leading-snug">
                        {currentWidgetPlant?.name || "ไม่มีข้อมูล"}
                      </span>
                    </div>
                  </div>

                  {/* ── Slideshow ปุ๋ย ── */}
                  <div className="flex flex-col items-center">
                    {selectedCrop && thumbSlide ? (
                      <>
                        <div
                          className="w-full aspect-square rounded-xl shadow-lg border-2 border-blue-300 mb-3 overflow-hidden relative group bg-gradient-to-br from-blue-50 to-sky-50 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
                          onClick={() => { setModalIdx(thumbIdx); setModalOpen(true); }}
                        >
                          <Image
                            key={`${selectedCrop}-${thumbIdx}`}
                            src={thumbSlide.product.image}
                            alt={thumbSlide.product.productName}
                            fill
                            className="object-contain p-2"
                            sizes="200px"
                            loading="lazy"
                            quality={80}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col items-center justify-center gap-1 pointer-events-none">
                            <span className="text-white text-[15px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 drop-shadow px-2 text-center transform group-hover:scale-110">
                              🔍 ดูรายละเอียด
                            </span>
                            <span className="text-white/90 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300">
                              กดเพื่อดูทุกสูตร
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center justify-start min-h-[3.5rem] w-full">
                          <span className="text-[14px] xl:text-[15px] font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent text-center w-full px-1 line-clamp-2 leading-tight">
                            {thumbSlide.product.productName}
                          </span>
                          <span className="text-[13px] xl:text-[14px] text-gray-600 text-center line-clamp-2 px-1 mt-1 leading-snug">
                            {thumbSlide.fertText}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-full aspect-square rounded-xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 mb-3 flex items-center justify-center">
                          <span className="text-gray-400 text-sm text-center px-2">🌾 รอเลือกพืช</span>
                        </div>
                        <div className="flex flex-col items-center justify-start min-h-[3.5rem] w-full">
                          <span className="text-[14px] xl:text-[15px] font-bold text-gray-400 text-center w-full truncate px-1">💧 ปุ๋ยที่เหมาะสม</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-4 xl:p-5 rounded-xl border-2 border-blue-200 shadow-md w-full hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-sm xl:text-base font-bold text-blue-700 mb-3 uppercase tracking-wide text-center">🌾 เลือกพืชของคุณ</h4>
                  <select
                    value={selectedCrop}
                    onChange={(e) => handleSelectCrop(e.target.value)}
                    className="w-full bg-white text-blue-800 text-[14px] xl:text-[16px] font-bold py-3 px-4 rounded-lg border-2 border-blue-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <option value="" disabled>-- กรุณาเลือกพืช --</option>
                    {[...CROP_OPTIONS].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* ── คอลัมน์ขวา: ตารางอัตราการใช้ปุ๋ย ── */}
              <div className="w-full lg:w-[52%] flex flex-col h-fit">
                {selectedCrop && usageData && usageData.length > 0 ? (
                  <div className="bg-gradient-to-br from-white to-blue-50/30 p-5 rounded-xl border-2 border-blue-100 shadow-md text-left flex flex-col h-fit hover:shadow-lg transition-shadow duration-300">
                    <h4 className="text-lg font-bold text-blue-700 mb-4 border-b-2 border-blue-200 pb-3 flex items-center gap-2">
                      📊 อัตราการใช้ปุ๋ยตามระยะ
                    </h4>
                    <div className="space-y-4 pr-1">
                      {usageData.map((d, idx) => (
                        <div key={idx} className="relative flex flex-col bg-white p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:border-blue-300">
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-400 to-sky-500 rounded-l-xl" />
                          <div className="flex flex-wrap items-center gap-3 mb-2 pl-3">
                            {d.badge && (
                              <span className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border border-orange-300 px-3 py-1 rounded-md text-[13px] font-bold shadow-sm">
                                {d.badge}
                              </span>
                            )}
                            <span className="text-[16px] xl:text-lg font-bold text-gray-800">{d.stage}</span>
                          </div>
                          <div className="flex justify-between items-end mt-3 pl-3 text-[13px] xl:text-sm gap-3">
                            <span className="text-gray-600">
                               สูตร: <span className="text-blue-600 font-bold">{d.formula}</span>
                               </span>
                            <span className="bg-gradient-to-r from-blue-100 to-sky-100 text-blue-800 border border-blue-300 px-3 py-1.5 rounded-md text-[11px] xl:text-xs font-bold whitespace-nowrap shadow-sm">
                               {d.rate}
                              </span>
                            </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-4 text-center">
                      *อัตราการใช้ขึ้นอยู่กับอายุและความสมบูรณ์ของต้น
                    </p>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50/20 p-5 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center min-h-[300px] h-fit">
                    <span className="text-5xl mb-4 animate-bounce">🌱</span>
                    <h4 className="text-lg text-gray-600 font-bold mb-2">ยังไม่มีข้อมูลแสดงผล</h4>
                    <p className="text-base text-gray-500">กรุณาเลือกพืชเพื่อดูอัตราการใช้ปุ๋ยตามระยะ</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-gray-200 text-sm text-center text-gray-500 w-full">
              📅 ข้อมูลอ้างอิงสำหรับเดือน {viewDate.toLocaleDateString("th-TH", { month: "long" })}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════
        MODAL 1 — รายละเอียดพืชในฤดูกาล
    ══════════════════════════════════════════ */}
    {plantModalOpen && activeModalPlant && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
        onClick={() => setPlantModalOpen(false)}
      >
        <div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setPlantModalOpen(false)}
            className="absolute top-3 right-3 z-30 bg-white/90 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative w-full h-64 bg-gradient-to-br from-green-50 to-emerald-50 select-none">
            <Image
              key={`modal-plant-${modalPlantIdx}`}
              src={activeModalPlant.image}
              alt={activeModalPlant.name}
              fill
              className="object-contain p-6"
              loading="lazy"
              quality={85}
            />
            
            {totalPlants > 1 && (
              <>
                <button
                  onClick={() => moveModalPlant(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white text-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110"
                >‹</button>
                <button
                  onClick={() => moveModalPlant(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white text-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110"
                >›</button>

                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
                  {plantInfo.plants.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setModalPlantIdx(i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === modalPlantIdx ? "bg-gradient-to-r from-green-500 to-emerald-600 w-5 h-2.5 shadow-md" : "bg-gray-400/70 w-2.5 h-2.5 hover:bg-gray-500 hover:scale-125"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            <span className="absolute top-3 left-3 z-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              📅 {viewDate.toLocaleDateString("th-TH", { month: "long" })}
            </span>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent leading-tight mb-2">
              {activeModalPlant.name}
            </h2>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 mt-4 shadow-sm">
              <h3 className="text-sm font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-1 flex items-center gap-1.5">
                <span>💡</span> ทำไมควรปลูกเดือนนี้?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {activeModalPlant.reason}
              </p>
            </div>
            
            <button
              onClick={() => setPlantModalOpen(false)}
              className="w-full mt-6 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-bold py-2.5 px-4 rounded-xl text-center text-sm transition-all duration-200 shadow-sm hover:shadow-md"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      </div>
    )}

    {/* ══════════════════════════════════════════
        MODAL 2 — รายละเอียดปุ๋ย + เลื่อนดูทุกสูตร
    ══════════════════════════════════════════ */}
    {modalOpen && modalSlide && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
        onClick={() => setModalOpen(false)}
      >
        <div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-3 right-3 z-30 bg-white/90 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-sky-50 select-none">
            <Image
              key={`modal-${selectedCrop}-${modalIdx}`}
              src={modalSlide.product.image}
              alt={modalSlide.product.productName}
              fill
              className="object-contain p-6"
              loading="lazy"
              quality={85}
            />

            {totalFert > 1 && (
              <>
                <button
                  onClick={() => moveFertModal(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white text-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110"
                >‹</button>
                <button
                  onClick={() => moveFertModal(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white text-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110"
                >›</button>
              </>
            )}

            {totalFert > 1 && (
              <span className="absolute top-3 left-3 z-20 bg-gradient-to-r from-blue-600 to-sky-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                {modalIdx + 1} / {totalFert}
              </span>
            )}

            {totalFert > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setModalIdx(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === modalIdx ? "bg-gradient-to-r from-blue-500 to-sky-600 w-5 h-2.5 shadow-md" : "bg-gray-400/70 w-2.5 h-2.5 hover:bg-gray-500 hover:scale-125"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent leading-tight flex-1">
                {modalSlide.product.productName}
              </h2>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-sm text-gray-400 line-through">
                  ฿{modalSlide.product.oldPrice.toLocaleString()}
                </span>
                <span className="text-2xl font-black text-blue-800 whitespace-nowrap">
                  ฿{modalSlide.product.price.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-2 leading-relaxed">
              {modalSlide.product.description}
            </p>

            <div className="text-sm font-medium text-blue-700 bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200 rounded-lg px-3 py-2 mb-5 shadow-sm">
              💡 {modalSlide.fertText}
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <Link
                href={`/products/${modalSlide.product.productId}`}
                onClick={() => setModalOpen(false)}
                className="relative overflow-hidden group bg-gradient-to-r from-orange-500 via-amber-600 to-yellow-600 hover:from-orange-600 hover:via-amber-700 hover:to-yellow-700 text-white font-bold py-4 px-6 rounded-xl text-center transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="text-base">ดูรายละเอียดสินค้า</span>
                </div>
              </Link>
              <a
                href="https://www.facebook.com/share/p/1ArBAZtMvr/?mibextid=wwXIf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setModalOpen(false)}
                className="relative overflow-hidden group bg-gradient-to-r from-blue-500 via-sky-600 to-cyan-600 hover:from-blue-600 hover:via-sky-700 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-base">สั่งซื้อผ่าน Facebook</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </a>
            </div>

            {totalFert > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 pt-1 border-t border-gray-100">
                {slides.map((slide, i) => (
                  <button
                    key={i}
                    onClick={() => setModalIdx(i)}
                    title={slide.product.productName}
                    className={`flex-shrink-0 w-14 h-14 rounded-lg border-2 overflow-hidden transition-all duration-300 ${
                      i === modalIdx
                        ? "border-blue-500 scale-110 shadow-lg ring-2 ring-blue-200"
                        : "border-gray-200 opacity-55 hover:opacity-90 hover:scale-105"
                    }`}
                  >
                    <Image
                      src={slide.product.image}
                      alt={slide.product.productName}
                      width={56} height={56}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )}
    </>
  );
}
