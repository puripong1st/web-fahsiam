"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays, ChevronLeft, ChevronRight, Sprout, Leaf, X, Info,
  MousePointerClick, Facebook, ShoppingBag, RefreshCw
} from "lucide-react";

import { 
  PLANT_DATA, THAI_MONTHS, ACTIVITY_COLORS, PlantInfo, 
  getFertilizerDetails, PlantActivity
} from "../data/unifiedCalendarData";

// --- Icons Helper ---
function ActivityBadge({ activity, size = "md" }: { activity: PlantActivity; size?: "sm" | "md" | "lg" }) {
  const colors = ACTIVITY_COLORS[activity.color] || ACTIVITY_COLORS.gray;
  const sizeClasses = {
    sm: "px-2.5 py-1 text-[11px]",
    md: "px-3 py-1.5 text-xs",
    lg: "px-4 py-2 text-sm shadow-sm",
  };
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full font-semibold border transition-all duration-200 ${colors.bg} ${colors.text} ${colors.border} ${sizeClasses[size]}`}>
      <span className="flex-shrink-0">{activity.icon}</span>
      <span className="truncate max-w-[120px]">{activity.activity}</span>
    </div>
  );
}

// --- ฟังก์ชันสำหรับดึงปุ๋ยทุกสูตรที่อยู่ในข้อความ ---
function extractMultipleFertilizers(formula: string) {
  if (!formula) return [];
  const found: any[] = [];
  
  if (formula.includes("12-3-5")) found.push(getFertilizerDetails("12-3-5"));
  if (formula.includes("3-6-15")) found.push(getFertilizerDetails("3-6-15"));
  if (formula.includes("0-0-30")) found.push(getFertilizerDetails("0-0-30"));
  if (formula.includes("6-3-3")) found.push(getFertilizerDetails("6-3-3"));
  if (formula.includes("OM 25") || formula.includes("OM ผง")) found.push(getFertilizerDetails("OM 25"));
  if (formula.includes("OM 20") || formula.includes("OM เม็ด")) found.push(getFertilizerDetails("OM 20"));

  const unique = [];
  const map = new Set();
  for (const item of found) {
    if (item && !map.has(item.id)) {
      map.add(item.id);
      unique.push(item);
    }
  }
  return unique;
}

export default function UnifiedCalendar() {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedPlantId, setSelectedPlantId] = useState<string>("");
  const [plantModalOpen, setPlantModalOpen] = useState(false);
  
  const [fertModalOpen, setFertModalOpen] = useState(false);
  const [modalFertilizer, setModalFertilizer] = useState<any>(null);
  const [fertImageIndex, setFertImageIndex] = useState(0);

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const emptyAfter = 42 - (firstDay + daysInMonth);
  const DAYS_OF_WEEK = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
  const currentDate = new Date();

  const selectedPlantInfo = PLANT_DATA.find((p) => p.id === selectedPlantId) || null;
  
  const currentMonthFertilizer = selectedPlantInfo?.fertilizers.find(f => f.month === viewMonth);
  const currentFertilizers = extractMultipleFertilizers(currentMonthFertilizer?.formula || "");
  const activeFertilizer = currentFertilizers.length > 0 ? currentFertilizers[fertImageIndex % currentFertilizers.length] : null;

  useEffect(() => {
    setFertImageIndex(0);
  }, [viewMonth, selectedPlantId]);

  useEffect(() => {
    if (currentFertilizers.length > 1) {
      const timer = setInterval(() => {
        setFertImageIndex((prev) => prev + 1);
      }, 3000); 
      return () => clearInterval(timer);
    }
  }, [currentFertilizers.length, viewMonth, selectedPlantId]);

  // ═══════════════════════════════════════════════════════════════
  // ระบบจัดเรียงข้อมูล: หมวดหมู่ -> ก-ฮ -> อายุ (น้อยไปมาก/ให้ผลผลิตแล้ว)
  // ═══════════════════════════════════════════════════════════════
  const CATEGORY_ORDER = ["ไม้ผลเมืองร้อน", "ไม้ผลเมืองหนาว", "พืชเศรษฐกิจ", "พืชผัก", "พืชอื่นๆ"];
  const groupedPlants = CATEGORY_ORDER.map(cat => {
    const plantsInCat = PLANT_DATA.filter(p => p.category === cat).sort((a, b) => {
      // 1. หาชื่อหลัก (ตัดข้อความในวงเล็บและคำว่าปีออก เพื่อเทียบ ก-ฮ)
      const getBaseName = (name: string) => name.replace(/\s*\(.*\).*/, '').replace(/\s*ปีที่.*/, '').trim();
      const baseA = getBaseName(a.name);
      const baseB = getBaseName(b.name);
      
      if (baseA !== baseB) {
        return baseA.localeCompare(baseB, 'th');
      }
      
      // 2. ถ้าเป็นพืชชื่อเดียวกัน ให้เรียงตามน้ำหนักของระยะการเติบโต
      const getWeight = (name: string) => {
        // กลุ่มเริ่มปลูก / 0-1 ปี เอาไว้บนสุด
        if (name.includes("0-1") || name.includes("เริ่มปลูก") || name.includes("ปีที่ 1") || name.includes("1-6") || name.includes("1-3")) return 1;
        if (name.includes("2-3") || name.includes("ปีที่ 2")) return 2;
        if (name.includes("ปีที่ 3") || name.includes("4-5") || name.includes("4 ปี")) return 3;
        if (name.includes("ยังไม่ให้ผลผลิต")) return 4;
        // กลุ่มให้ผลผลิต เอาไว้ท้ายสุด
        if (name.includes("ให้ผลผลิต") || name.includes("ขึ้นไป") || name.includes("เริ่มกรีด")) return 10;
        return 5; // ทั่วไป
      };
      
      return getWeight(a.name) - getWeight(b.name);
    });
    return { category: cat, plants: plantsInCat };
  }).filter(group => group.plants.length > 0);

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 via-white to-sky-50" id="calendar">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            <CalendarDays className="w-4 h-4" /> ปฏิทินการเกษตรแบบครบวงจร
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            วางแผนการ<span className="text-emerald-600">เพาะปลูก</span>ของคุณ
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            เลือกพืชที่คุณปลูก เพื่อดูคำแนะนำการดูแลและการให้ปุ๋ยตลอดทั้งปี
          </p>
        </div>

        <div className="flex flex-col xl:flex-row items-start gap-6 w-full animate-in fade-in duration-300">
          
          {/* ================= ซ้าย: ปฏิทิน ================= */}
          <div className="w-full xl:w-[38%] bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col h-fit">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-6 gap-4">
              <div className="flex flex-col items-center md:items-start w-full md:w-auto">
                <div className="flex items-center justify-center gap-2 mb-2 w-full">
                  <button onClick={() => setViewDate(new Date(viewYear, viewMonth - 1, 1))} className="p-2 rounded-full hover:bg-sky-100 text-gray-600">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent w-40 text-center">
                    {THAI_MONTHS[viewMonth].full}
                  </h2>
                  <button onClick={() => setViewDate(new Date(viewYear, viewMonth + 1, 1))} className="p-2 rounded-full hover:bg-sky-100 text-gray-600">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <button onClick={() => setViewDate(new Date())} className="text-sm font-semibold text-sky-600 hover:text-sky-800 px-2 text-center w-full">
                  🔄 กลับไปเดือนปัจจุบัน
                </button>
              </div>

              <div className="flex flex-col items-center md:items-end w-full md:w-auto">
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  พ.ศ. {viewYear + 543}
                </div>
                
                {selectedPlantInfo ? (
                  <div className="mt-2 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-3 rounded-xl shadow-sm w-full md:w-auto flex flex-col items-center md:items-end animate-in fade-in zoom-in duration-300">
                    <span className="text-[13px] font-bold text-green-800 mb-2">กิจกรรมพืชเดือนนี้:</span>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                      {selectedPlantInfo.monthlyActivities[viewMonth].activities.map((act, idx) => (
                        <ActivityBadge key={idx} activity={act} size="lg" />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-400">
                    โปรดเลือกพืชเพื่อดูกิจกรรม
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-200 grid grid-cols-7 gap-px border border-gray-200 rounded-xl overflow-hidden h-fit shadow-inner">
              {DAYS_OF_WEEK.map((d, i) => (
                <div key={d} className={`bg-gray-50 py-2 text-center text-sm font-semibold ${i === 0 ? "text-red-600" : "text-gray-700"}`}>{d}</div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => <div key={`eb${i}`} className="bg-gray-50/40 p-2 min-h-[4rem]" />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isToday = day === currentDate.getDate() && viewMonth === currentDate.getMonth() && viewYear === currentDate.getFullYear();
                return (
                  <div key={day} className={`p-2 min-h-[4rem] bg-white hover:bg-sky-50 transition-colors`}>
                    <div className={`w-7 h-7 mx-auto flex items-center justify-center rounded-full text-sm font-semibold ${isToday ? "bg-blue-500 text-white shadow-lg animate-pulse" : "text-gray-700"}`}>
                      {day}
                    </div>
                  </div>
                );
              })}
              {Array.from({ length: emptyAfter }).map((_, i) => <div key={`ea${i}`} className="bg-gray-50/40 p-2 min-h-[4rem]" />)}
            </div>
          </div>

          {/* ================= ขวา: แนะนำข้อมูล ================= */}
          <div className="w-full xl:w-[62%] bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col h-fit">
            <h3 className="w-full text-xl font-bold text-green-700 mb-6 pb-3 border-b-2 border-green-200 flex items-center justify-center gap-2">
              <Sprout className="w-6 h-6" /> ข้อมูลสำหรับ {selectedPlantInfo ? selectedPlantInfo.name : "พืชของคุณ"}
            </h3>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 flex-1 items-start">
              
              {/* === คอลัมน์ย่อย 1: รูปภาพ + เลือกพืช === */}
              <div className="w-full lg:w-[45%] flex flex-col gap-5">
                
                {/* กริดรูปภาพพืชและปุ๋ย */}
                <div className="grid grid-cols-2 gap-4">
                  {/* รูปพืช (คลิกเพื่อดูตารางทั้งปี) */}
                  <div className="flex flex-col items-center">
                    {selectedPlantInfo ? (
                      <div 
                        className="w-full aspect-square rounded-xl border-2 border-green-200 mb-1 overflow-hidden relative shadow-md cursor-pointer group"
                        onClick={() => setPlantModalOpen(true)}
                      >
                        <Image src={selectedPlantInfo.image} alt={selectedPlantInfo.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1">
                          <MousePointerClick className="w-6 h-6 text-white animate-bounce" />
                          <span className="text-white text-xs font-bold px-2 text-center">ดูกิจกรรมทั้งปี</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full aspect-square rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 mb-1 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">รอเลือกพืช</span>
                      </div>
                    )}
                    <span className="text-[14px] font-bold text-gray-700 mt-1 line-clamp-1">{selectedPlantInfo?.name || "-"}</span>
                    {selectedPlantInfo && (
                      <span className="text-[11px] text-green-600 font-semibold mt-0.5 flex items-center gap-1">
                        <MousePointerClick className="w-3 h-3" /> คลิกที่รูปเพื่อดูรายละเอียด
                      </span>
                    )}
                  </div>

                  {/* ปุ๋ยที่แนะนำเดือนนี้ (พร้อมระบบ Auto-Slide หากมีหลายสูตร) */}
                  <div className="flex flex-col items-center">
                    {selectedPlantInfo && currentMonthFertilizer && activeFertilizer ? (
                      <div 
                        className="w-full aspect-square rounded-xl border-2 border-blue-200 mb-1 overflow-hidden relative shadow-md bg-white cursor-pointer group flex flex-col"
                        onClick={() => {
                          setModalFertilizer(activeFertilizer);
                          setFertModalOpen(true);
                        }}
                      >
                        {/* ป้ายกำกับ กรณีมีปุ๋ยหลายสูตรให้ใช้แทนกันได้ */}
                        {currentFertilizers.length > 1 && (
                          <div className="absolute top-1 right-1 left-1 z-10 bg-amber-400 text-amber-950 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm text-center flex items-center justify-center gap-1 animate-pulse">
                            <RefreshCw className="w-2.5 h-2.5" /> ทางเลือก / ใช้สลับกัน
                          </div>
                        )}
                        
                        <div className="relative w-full h-full flex-1 p-2 mt-4">
                          <Image src={activeFertilizer.image} alt={activeFertilizer.name} fill className="object-contain p-2 group-hover:scale-110 transition-transform duration-300" />
                        </div>

                        {/* Overlay ตอนเอาเมาส์ชี้ */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1 rounded-xl z-20">
                          <MousePointerClick className="w-6 h-6 text-white animate-bounce" />
                          <span className="text-white text-xs font-bold px-2 text-center">ดูข้อมูลปุ๋ย</span>
                        </div>

                        {/* จุดไข่ปลาบอกตำแหน่งปุ๋ย (แสดงเมื่อมีหลายตัว) */}
                        {currentFertilizers.length > 1 && (
                          <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1.5 z-10">
                            {currentFertilizers.map((_, idx) => (
                              <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === (fertImageIndex % currentFertilizers.length) ? 'bg-blue-600 w-3' : 'bg-gray-300'}`} />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full aspect-square rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 mb-1 flex items-center justify-center text-center p-2">
                        <span className="text-gray-400 text-xs">{selectedPlantInfo ? "ไม่มีแนะนำปุ๋ยในเดือนนี้" : "รอเลือกพืช"}</span>
                      </div>
                    )}
                    <span className="text-[13px] font-bold text-blue-700 mt-1 text-center leading-tight line-clamp-2 px-1">
                      {currentMonthFertilizer ? currentMonthFertilizer.formula : "-"}
                    </span>
                    {selectedPlantInfo && currentMonthFertilizer && activeFertilizer && (
                      <span className="text-[11px] text-blue-600 font-semibold mt-0.5 flex items-center gap-1">
                        <MousePointerClick className="w-3 h-3" /> คลิกที่รูปเพื่อสั่งซื้อ
                      </span>
                    )}
                  </div>
                </div>

                {/* Dropdown เลือกพืช (จัดกลุ่มและเรียงข้อมูลแล้ว) */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm w-full mt-2">
                  <h4 className="text-sm font-bold text-blue-700 mb-2 flex items-center gap-2">
                    <Leaf className="w-4 h-4" /> เลือกพืชที่ปลูก
                  </h4>
                  <select
                    value={selectedPlantId}
                    onChange={(e) => setSelectedPlantId(e.target.value)}
                    className="w-full bg-white text-blue-800 text-sm font-semibold py-2.5 px-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-300 outline-none cursor-pointer shadow-sm"
                  >
                    <option value="" disabled>-- กรุณาเลือกพืช --</option>
                    {groupedPlants.map((group, idx) => (
                      <optgroup key={idx} label={`--- ${group.category} ---`}>
                        {group.plants.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

              </div>

              {/* === คอลัมน์ย่อย 2: ตารางปุ๋ยรายปี === */}
              <div className="w-full lg:w-[55%] flex flex-col h-fit">
                {selectedPlantInfo && selectedPlantInfo.fertilizers.length > 0 ? (
                  <div className="bg-white p-4 rounded-xl border-2 border-orange-100 shadow-md">
                    <h4 className="text-base font-bold text-orange-700 mb-3 border-b-2 border-orange-200 pb-2">
                      ตารางปุ๋ยรายปี
                    </h4>
                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                      {selectedPlantInfo.fertilizers.map((fert, idx) => (
                        <div key={idx} className="relative flex flex-col bg-orange-50/30 p-3 rounded-lg border border-orange-100 shadow-sm hover:bg-orange-50/70 transition-colors">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-2.5 py-0.5 rounded text-[12px] font-bold shadow-sm">
                              {THAI_MONTHS[fert.month].full}
                            </span>
                            <span className="text-[14px] font-bold text-gray-800">{fert.purpose}</span>
                          </div>
                          <div className="flex justify-between items-center text-[13px] mt-1">
                            <span className="text-gray-600">
                              สูตร: <span className="text-orange-700 font-bold bg-orange-100 px-1.5 py-0.5 rounded">{fert.formula}</span>
                            </span>
                            <span className="text-gray-700 font-medium">{fert.rate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-5 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center min-h-[250px]">
                    <span className="text-4xl mb-3">🌱</span>
                    <h4 className="text-base text-gray-600 font-bold mb-1">ยังไม่มีข้อมูลแสดงผล</h4>
                    <p className="text-sm text-gray-500">กรุณาเลือกพืชเพื่อดูตารางให้ปุ๋ยตลอดปี</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ================= 1. Modal ดูกิจกรรมทั้งปี ================= */}
      {plantModalOpen && selectedPlantInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in" onClick={() => setPlantModalOpen(false)}>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
            <div className="relative px-6 py-5 bg-gradient-to-br from-green-50 to-emerald-50 border-b border-green-100 flex items-start gap-4 rounded-t-3xl">
              <button onClick={() => setPlantModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-red-50 text-gray-500 hover:text-red-500 shadow-sm transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-sm border border-green-200 flex-shrink-0 bg-white">
                <Image src={selectedPlantInfo.image} alt={selectedPlantInfo.name} fill className="object-cover" />
              </div>
              <div>
                <span className="inline-block px-2.5 py-1 text-[10px] font-bold text-white bg-green-500 rounded-full mb-1">{selectedPlantInfo.category}</span>
                <h2 className="text-xl font-bold text-gray-900 leading-tight">{selectedPlantInfo.name}</h2>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{selectedPlantInfo.description}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 rounded-b-3xl">
              <h3 className="text-base font-bold text-gray-900 mb-4 border-b pb-2">ปฏิทินกิจกรรมทั้งปี</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {selectedPlantInfo.monthlyActivities.map((monthData, idx) => {
                  return (
                    <div key={idx} className={`p-3 rounded-xl border ${idx === viewMonth ? 'ring-2 ring-green-500 bg-white shadow-md' : 'border-gray-200 bg-white shadow-sm'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-gray-700">{monthData.monthName}</span>
                        {idx === viewMonth && <span className="text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded-full">เดือนนี้</span>}
                      </div>
                      <div className="space-y-1.5">
                        {monthData.activities.map((act, i) => <ActivityBadge key={i} activity={act} size="sm" />)}
                      </div>
                    </div>
                  );
                })}
              </div>
              {selectedPlantInfo.harvestNote && (
                <div className="mt-5 p-3 bg-blue-50 rounded-lg border border-blue-100 flex gap-2">
                  <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700"><strong>หมายเหตุการเก็บเกี่ยว:</strong> {selectedPlantInfo.harvestNote}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. Modal ดูข้อมูลปุ๋ย ================= */}
      {fertModalOpen && modalFertilizer && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in" onClick={() => setFertModalOpen(false)}>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 flex flex-col items-center text-center animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setFertModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 shadow-sm transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            <div className="relative w-40 h-40 mb-4 rounded-xl border border-gray-100 shadow-sm p-2">
              <Image src={modalFertilizer.image} alt={modalFertilizer.name} fill className="object-contain" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{modalFertilizer.name}</h3>
            <p className="text-sm text-gray-600 mb-6">
              ผลิตภัณฑ์คุณภาพจากฟ้าสยาม ช่วยเพิ่มประสิทธิภาพในการเจริญเติบโต และเพิ่มผลผลิตอย่างยั่งยืน
            </p>
            
            <div className="w-full flex flex-col gap-3">
              <Link href={`/products/${modalFertilizer.id}`} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 rounded-xl font-bold transition-transform active:scale-95 shadow-md">
                <ShoppingBag className="w-5 h-5" /> ดูรายละเอียดสินค้า
              </Link>
              <a 
                href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white py-3 rounded-xl font-bold transition-transform active:scale-95 shadow-md"
              >
                <Facebook className="w-5 h-5" /> ติดต่อสั่งซื้อผ่าน Facebook
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}