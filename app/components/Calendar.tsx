"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  type FertSlide,
  MONTHLY_PLANTS,
  CROP_OPTIONS,
  CROP_FERT_SLIDES,
  CROP_FERTILIZER_DATA,
  CROP_USAGE_DETAILS,
  DAYS_OF_WEEK,
} from "..//data/calendarData";

// ═══════════════════════════════════════════════
// COMPONENT — UI only, ไม่มี data hardcode
// ═══════════════════════════════════════════════
export default function CalendarWidget() {
  const [mounted, setMounted]           = useState(false);
  const [currentTime, setCurrentTime]   = useState(new Date());
  const [viewDate, setViewDate]         = useState(new Date());
  const [selectedCrop, setSelectedCrop] = useState("");
  const [thumbIdx, setThumbIdx]         = useState(0);
  const [modalOpen, setModalOpen]       = useState(false);
  const [modalIdx, setModalIdx]         = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // mount + นาฬิกา
  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // reset index เมื่อเปลี่ยนพืช
  useEffect(() => {
    setThumbIdx(0);
    setModalIdx(0);
  }, [selectedCrop]);

  // slides ของพืชที่เลือก
  const slides: FertSlide[] = selectedCrop ? (CROP_FERT_SLIDES[selectedCrop] ?? []) : [];
  const total = slides.length;

  // auto-slide ทุก 3 วิ
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (total <= 1) return;
    timerRef.current = setInterval(() => {
      setThumbIdx((p) => (p + 1) % total);
    }, 3000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [total, selectedCrop]);

  // เลื่อน modal
  const moveModal = (dir: 1 | -1) =>
    setModalIdx((p) => (p + dir + total) % total);

  if (!mounted) return null;

  // ── calendar vars ──
  const viewYear    = viewDate.getFullYear();
  const viewMonth   = viewDate.getMonth();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const emptyAfter  = 42 - (firstDay + daysInMonth);

  const plantInfo  = MONTHLY_PLANTS[viewMonth];
  const monthFert  = selectedCrop ? CROP_FERTILIZER_DATA[selectedCrop]?.[viewMonth] : null;
  const usageData  = selectedCrop ? CROP_USAGE_DETAILS[selectedCrop] : null;
  const thumbSlide = slides[thumbIdx] ?? null;
  const modalSlide = slides[modalIdx] ?? null;

  // ══════════════════════════════════════════════
  return (
    <>
    <section className="py-16 bg-white" id="why">
      <div className="max-w-[1400px] w-full mx-auto p-4 my-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col xl:flex-row overflow-hidden">

          {/* ══════ ซ้าย: ปฏิทิน ══════ */}
          <div className="w-full xl:w-[40%] p-6 flex flex-col">
            {/* Header เดือน / ปี / เวลา */}
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-6 gap-4">
              <div className="flex flex-col items-center md:items-start w-full md:w-auto">
                <div className="flex items-center justify-center gap-3 mb-2 w-full">
                  <button
                    onClick={() => setViewDate(new Date(viewYear, viewMonth - 1, 1))}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition"
                  >◀</button>
                  <h2 className="text-3xl font-bold text-sky-800 w-40 text-center">
                    {viewDate.toLocaleDateString("th-TH", { month: "long" })}
                  </h2>
                  <button
                    onClick={() => setViewDate(new Date(viewYear, viewMonth + 1, 1))}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition"
                  >▶</button>
                </div>
                <button
                  onClick={() => setViewDate(new Date())}
                  className="text-sm font-medium text-sky-600 hover:text-sky-800 hover:underline px-2 text-center md:text-left w-full md:w-auto"
                >
                  กลับไปเดือนปัจจุบัน
                </button>
              </div>
              <div className="flex flex-col items-center md:items-end w-full md:w-auto">
                <div className="text-3xl font-bold text-sky-800 mb-2 md:mr-2">
                  {viewDate.toLocaleDateString("th-TH", { year: "numeric" })}
                </div>
                <div className="text-xl font-mono font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-lg">
                  เวลา: {currentTime.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </div>
              </div>
            </div>

            {/* Grid วัน */}
            <div className="bg-gray-200 grid grid-cols-7 gap-px border border-gray-200 rounded-xl overflow-hidden flex-1">
              {DAYS_OF_WEEK.map((d, i) => (
                <div key={d} className={`bg-gray-50 py-2 text-center text-sm font-semibold ${i === 0 ? "text-red-500" : "text-gray-600"}`}>
                  {d}
                </div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`eb${i}`} className="bg-gray-50/40 p-2 min-h-[4rem] md:min-h-[5rem]" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isToday =
                  day === currentTime.getDate() &&
                  viewMonth === currentTime.getMonth() &&
                  viewYear === currentTime.getFullYear();
                return (
                  <div key={day} className={`p-2 min-h-[4rem] md:min-h-[5rem] hover:bg-sky-50 ${isToday ? "bg-sky-50" : "bg-white"}`}>
                    <div className={`w-7 h-7 mx-auto flex items-center justify-center rounded-full text-sm font-medium ${isToday ? "bg-sky-600 text-white shadow" : "text-gray-700"}`}>
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

          {/* ══════ ขวา: ข้อมูลการเกษตร ══════ */}
          <div className="w-full xl:w-[60%] bg-gray-50 p-6 border-t xl:border-t-0 xl:border-l border-gray-200 flex flex-col">
            <h3 className="w-full text-lg font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200 flex items-center justify-center gap-2">
              🌿 แนะนำสำหรับเดือนนี้
            </h3>

            <div className="flex flex-col md:flex-row gap-6 flex-1">

              {/* ── คอลัมน์ซ้าย: รูป + dropdown + สูตรเดือน ── */}
              <div className="w-full md:w-[45%] flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">

                  {/* พืชในฤดูกาล */}
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-square rounded-xl shadow-md border border-gray-200 mb-2 overflow-hidden bg-white">
                      <Image
                        src={plantInfo.plantImg}
                        alt="พืชในฤดูกาล"
                        width={400} height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-700 text-center w-full truncate px-1">พืชในฤดูกาล</span>
                    <span className="text-xs text-gray-500 text-center">{plantInfo.plant}</span>
                  </div>

                  {/* ── Slideshow ปุ๋ย (auto-slide เท่านั้น, กดเพื่อเปิด modal) ── */}
                  <div className="flex flex-col items-center">
                    {selectedCrop && thumbSlide ? (
                      <>
                        <div
                          className="w-full aspect-square rounded-xl shadow-md border-2 border-blue-200 mb-2 overflow-hidden relative group bg-white cursor-pointer"
                          onClick={() => { setModalIdx(thumbIdx); setModalOpen(true); }}
                        >
                          <Image
                            key={`${selectedCrop}-${thumbIdx}`}
                            src={thumbSlide.product.image}
                            alt={thumbSlide.product.productName}
                            width={400} height={400}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center gap-1 pointer-events-none">
                            <span className="text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity drop-shadow px-2 text-center">
                              🔍 ดูรายละเอียด
                            </span>
                            <span className="text-white/80 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                              กดเพื่อดูทุกสูตร
                            </span>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-[#026EB5] text-center w-full px-1 line-clamp-2 leading-snug">
                          {thumbSlide.product.productName}
                        </span>
                        <span className="text-xs text-gray-400 text-center line-clamp-1 px-1">
                          {thumbSlide.fertText}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-full aspect-square rounded-xl border-2 border-dashed border-gray-300 bg-gray-100 mb-2 flex items-center justify-center">
                          <span className="text-gray-400 text-xs text-center px-2">รอเลือกพืช</span>
                        </div>
                        <span className="text-sm font-bold text-gray-400 text-center w-full truncate px-1">ปุ๋ยที่เหมาะสม</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Dropdown เลือกพืช */}
                <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                  <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide text-center">เลือกพืชของคุณ</h4>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full bg-blue-50 text-blue-800 text-base font-bold py-2.5 px-3 rounded-lg border-2 border-transparent hover:border-blue-200 focus:border-blue-500 focus:ring-0 outline-none cursor-pointer transition"
                  >
                    <option value="" disabled>-- กรุณาเลือกพืช --</option>
                    {CROP_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* สูตรปุ๋ยแนะนำเดือนนี้ */}
                <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex-1 flex flex-col justify-center">
                  <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide text-center">ควรใช้ปุ๋ยสูตรอะไร</h4>
                  {selectedCrop && monthFert ? (
                    <p className="text-base font-bold text-blue-700 bg-blue-50 py-3 px-2 rounded-lg break-words text-center">
                      {monthFert.fertText}
                    </p>
                  ) : (
                    <p className="text-sm font-medium text-gray-400 py-3 px-2 text-center">
                      กรุณาเลือกพืชเพื่อดูคำแนะนำ
                    </p>
                  )}
                </div>
              </div>

              {/* ── คอลัมน์ขวา: ตารางอัตราการใช้ปุ๋ย ── */}
              <div className="w-full md:w-[55%] flex flex-col">
                {selectedCrop && usageData && usageData.length > 0 ? (
                  <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm text-left flex-1 flex flex-col">
                    <h4 className="text-sm font-bold text-blue-700 mb-3 border-b border-blue-100 pb-2 flex items-center gap-2">
                      📊 อัตราการใช้ปุ๋ยตามระยะ
                    </h4>
                    <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                      {usageData.map((d, idx) => (
                        <div key={idx} className="relative flex flex-col bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-l-xl" />
                          <div className="flex flex-wrap items-center gap-2 mb-1 pl-2">
                            {d.badge && (
                              <span className="bg-orange-100 text-orange-700 border border-orange-200 px-2.5 py-0.5 rounded-md text-xs font-bold">
                                {d.badge}
                              </span>
                            )}
                            <span className="text-sm font-bold text-gray-800">{d.stage}</span>
                          </div>
                          <div className="flex justify-between items-end mt-2 pl-2 text-xs gap-2">
                            <span className="text-gray-600">
                              สูตร: <span className="text-blue-600 font-bold">{d.formula}</span>
                            </span>
                            <span className="bg-blue-100 text-blue-800 border border-blue-200 px-2 py-1 rounded-md font-bold whitespace-nowrap shadow-sm">
                              {d.rate}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-3 text-center">
                      *อัตราการใช้ขึ้นอยู่กับอายุและความสมบูรณ์ของต้น
                    </p>
                  </div>
                ) : (
                  <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-200 flex-1 flex flex-col items-center justify-center text-center min-h-[250px]">
                    <span className="text-4xl mb-3">🌱</span>
                    <h4 className="text-gray-500 font-bold mb-1">ยังไม่มีข้อมูลแสดงผล</h4>
                    <p className="text-sm text-gray-400">กรุณาเลือกพืชเพื่อดูอัตราการใช้ปุ๋ยตามระยะ</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-center text-gray-400 w-full">
              ข้อมูลอ้างอิงสำหรับเดือน {viewDate.toLocaleDateString("th-TH", { month: "long" })}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════
        MODAL — รายละเอียดปุ๋ย + เลื่อนดูทุกสูตร
    ══════════════════════════════════════════ */}
    {modalOpen && modalSlide && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
        onClick={() => setModalOpen(false)}
      >
        <div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ปุ่มปิด */}
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-3 right-3 z-30 bg-white/90 text-gray-400 hover:text-red-500 rounded-full p-1.5 shadow transition"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* รูปปุ๋ย + ลูกศรเลื่อน */}
          <div className="relative w-full h-64 bg-gray-50 select-none">
            <Image
              key={`modal-${selectedCrop}-${modalIdx}`}
              src={modalSlide.product.image}
              alt={modalSlide.product.productName}
              fill
              className="object-contain p-6"
            />

            {total > 1 && (
              <>
                <button
                  onClick={() => moveModal(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/35 hover:bg-black/65 text-white text-2xl flex items-center justify-center transition shadow-lg"
                >‹</button>
                <button
                  onClick={() => moveModal(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/35 hover:bg-black/65 text-white text-2xl flex items-center justify-center transition shadow-lg"
                >›</button>
              </>
            )}

            {total > 1 && (
              <span className="absolute top-3 left-3 z-20 bg-black/50 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {modalIdx + 1} / {total}
              </span>
            )}

            {total > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setModalIdx(i)}
                    className={`rounded-full transition-all duration-200 ${
                      i === modalIdx ? "bg-[#026EB5] w-5 h-2.5" : "bg-gray-400/70 w-2.5 h-2.5 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* รายละเอียด */}
          <div className="p-6">
            {/* ชื่อ + ราคา */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <h2 className="text-xl font-bold text-[#026EB5] leading-tight flex-1">
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

            <div className="text-sm font-medium text-blue-700 bg-blue-50 rounded-lg px-3 py-2 mb-5">
              💡 {modalSlide.fertText}
            </div>

            {/* ปุ่มซื้อ */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Link
                href={`/products/${modalSlide.product.productId}`}
                onClick={() => setModalOpen(false)}
                className="flex-1 bg-[#007a33] hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl text-center text-sm transition shadow-md"
              >
                🛒 ดูรายละเอียดสินค้า
              </Link>
              <a
                href="https://www.facebook.com/share/p/1ArBAZtMvr/?mibextid=wwXIf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setModalOpen(false)}
                className="flex-1 bg-[#1877F2] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition shadow-md"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                สั่งซื้อ Facebook
              </a>
            </div>

            {/* Thumbnail strip */}
            {total > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 pt-1 border-t border-gray-100">
                {slides.map((slide, i) => (
                  <button
                    key={i}
                    onClick={() => setModalIdx(i)}
                    title={slide.product.productName}
                    className={`flex-shrink-0 w-14 h-14 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                      i === modalIdx
                        ? "border-[#026EB5] scale-110 shadow-md"
                        : "border-gray-200 opacity-55 hover:opacity-90"
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
