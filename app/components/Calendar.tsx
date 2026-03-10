"use client";

import { useState, useEffect } from "react";

// เพิ่ม plantImg และ fertImg สำหรับดึงรูปภาพมาแสดงในแต่ละเดือน
// หมายเหตุ: ปัจจุบันใช้รูป Placeholder หากต้องการใช้รูปจริง แนะนำให้นำรูปไปไว้ในโฟลเดอร์ public/images/ 
// แล้วเปลี่ยน path เช่น "/images/cabbage.jpg"
const agriData = [
  { month: 0, plant: "กะหล่ำปลี, ผักกาดขาว", fruit: "สตรอว์เบอร์รี, พุทรา", fertilizer: "ปุ๋ยคอกหมักสูตรบำรุงใบ", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Plant", fertImg: "https://placehold.co/400x400/dbeafe/1e3a8a?text=Fertilizer" },
  { month: 1, plant: "แตงกวา, ถั่วฝักยาว", fruit: "มะขามป้อม, องุ่น", fertilizer: "ปุ๋ยสูตรเสมอ 15-15-15", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Plant", fertImg: "https://placehold.co/400x400/dbeafe/1e3a8a?text=Fertilizer" },
  { month: 2, plant: "ผักบุ้ง, ผักกวางตุ้ง", fruit: "มะม่วง, แตงโม", fertilizer: "ปุ๋ยน้ำหมักชีวภาพ (เน้นชุ่มชื้น)", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Plant", fertImg: "https://placehold.co/400x400/dbeafe/1e3a8a?text=Fertilizer" },
  { month: 3, plant: "บวบ, ฟักเขียว", fruit: "ทุเรียน, เงาะ", fertilizer: "ปุ๋ยอินทรีย์รองก้นหลุม", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Plant", fertImg: "https://placehold.co/400x400/dbeafe/1e3a8a?text=Fertilizer" },
  { month: 4, plant: "ข้าวโพด, ข้าว", fruit: "มังคุด, ลิ้นจี่", fertilizer: "ปุ๋ยยูเรีย 46-0-0 (เร่งโต)", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Plant", fertImg: "https://placehold.co/400x400/dbeafe/1e3a8a?text=Fertilizer" },
  { month: 5, plant: "พริก, มะเขือ", fruit: "สับปะรด, ระกำ", fertilizer: "ปุ๋ยคอกผสมแกลบ", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Plant", fertImg: "https://placehold.co/400x400/dbeafe/1e3a8a?text=Fertilizer" },
  { month: 6, plant: "ผักชี, ขึ้นฉ่าย", fruit: "ส้มโอ, ลำไย", fertilizer: "ปุ๋ยชีวภาพสูตรป้องกันเชื้อรา", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Plant", fertImg: "https://placehold.co/400x400/dbeafe/1e3a8a?text=Fertilizer" },
  { month: 7, plant: "คะน้า, กวางตุ้ง", fruit: "ส้มเขียวหวาน, ฝรั่ง", fertilizer: "ปุ๋ยคอกบำรุงดิน", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Plant", fertImg: "https://placehold.co/400x400/dbeafe/1e3a8a?text=Fertilizer" },
  { month: 8, plant: "แครอท, หัวไชเท้า", fruit: "กล้วยน้ำว้า, มะละกอ", fertilizer: "ปุ๋ยสูตร 8-24-24 (บำรุงหัว)", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Plant", fertImg: "https://placehold.co/400x400/dbeafe/1e3a8a?text=Fertilizer" },
  { month: 9, plant: "กระเทียม, หอมแดง", fruit: "มะเฟือง, ลองกอง", fertilizer: "ปุ๋ยหมักปลาทะเล", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Plant", fertImg: "https://placehold.co/400x400/dbeafe/1e3a8a?text=Fertilizer" },
  { month: 10, plant: "บรอกโคลี, ผักกาดแก้ว", fruit: "พุทรา, แตงไทย", fertilizer: "ปุ๋ยคอกสูตรเย็น", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Plant", fertImg: "https://placehold.co/400x400/dbeafe/1e3a8a?text=Fertilizer" },
  { month: 11, plant: "ผักกาดหอม, สลัด", fruit: "พุทราแอปเปิล, องุ่น", fertilizer: "ปุ๋ยมูลไส้เดือน", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Plant", fertImg: "https://placehold.co/400x400/dbeafe/1e3a8a?text=Fertilizer" },
];

const daysOfWeek = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

export default function CalendarWidget() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());

  useEffect(() => {
    setMounted(true); // ป้องกัน Hydration Error ใน Next.js
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null; // รอให้โหลดฝั่ง Client เสร็จก่อนค่อย Render

  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  const goToToday = () => setViewDate(new Date());

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const currentAgriInfo = agriData[viewMonth];

  const totalCells = 42;
  const emptyDaysAfterCount = totalCells - (firstDayOfMonth + daysInMonth);

  return (
    // ขยายเป็น max-w-6xl เพื่อให้ฝั่งขวามีพื้นที่แสดงรูปภาพได้สวยงามขึ้น
    <div className="max-w-6xl mx-auto p-4 my-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col lg:flex-row overflow-hidden">
        
        {/* ฝั่งซ้าย: ปฏิทิน */}
        <div className="w-full lg:w-[55%] p-6 flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <button 
                  onClick={prevMonth}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition"
                  aria-label="เดือนก่อนหน้า"
                >
                  ◀
                </button>
                <h2 className="text-3xl font-bold text-sky-800 w-40 text-center">
                  {viewDate.toLocaleDateString("th-TH", { month: "long" })}
                </h2>
                <button 
                  onClick={nextMonth}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition"
                  aria-label="เดือนถัดไป"
                >
                  ▶
                </button>
              </div>
              <button 
                onClick={goToToday}
                className="text-sm font-medium text-sky-600 hover:text-sky-800 hover:underline px-2"
              >
                กลับไปเดือนปัจจุบัน
              </button>
            </div>
            
            <div className="text-left md:text-right flex flex-col md:items-end">
              <div className="text-3xl font-bold text-sky-800 mb-2 md:mr-2">
                {viewDate.toLocaleDateString("th-TH", { year: "numeric" })}
              </div>
              <div className="text-xl font-mono font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-lg">
                เวลา: {currentTime.toLocaleTimeString("th-TH", { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>
          </div>

          <div className="bg-gray-200 grid grid-cols-7 gap-px border border-gray-200 rounded-xl overflow-hidden flex-1">
            {daysOfWeek.map((day, idx) => (
              <div key={day} className={`bg-gray-50 py-2 text-center text-sm font-semibold ${idx === 0 ? 'text-red-500' : 'text-gray-600'}`}>
                {day}
              </div>
            ))}

            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-before-${index}`} className="bg-gray-50/40 p-2 min-h-[4rem] md:min-h-[5rem]"></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const isRealToday = 
                day === currentTime.getDate() && 
                viewMonth === currentTime.getMonth() && 
                viewYear === currentTime.getFullYear();
              
              return (
                <div 
                  key={day} 
                  className={`p-2 min-h-[4rem] md:min-h-[5rem] transition-colors hover:bg-sky-50 
                    ${isRealToday ? "bg-sky-50" : "bg-white"}
                  `}
                >
                  <div className={`
                    w-7 h-7 mx-auto flex items-center justify-center rounded-full text-sm font-medium
                    ${isRealToday ? "bg-sky-600 text-white shadow" : "text-gray-700"}
                  `}>
                    {day}
                  </div>
                </div>
              );
            })}

            {Array.from({ length: emptyDaysAfterCount }).map((_, index) => (
              <div key={`empty-after-${index}`} className="bg-gray-50/40 p-2 min-h-[4rem] md:min-h-[5rem]"></div>
            ))}
          </div>
        </div>

        {/* ฝั่งขวา: รายละเอียดการเกษตร & รูปภาพแนะนำ */}
        <div className="w-full lg:w-[45%] bg-gray-50 p-6 border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col">
          
          <h3 className="w-full text-lg font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200 flex items-center justify-center gap-2">
            🌿 แนะนำสำหรับเดือนนี้
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col items-center">
              <img 
                src={currentAgriInfo.plantImg} 
                alt="พืช/ผลไม้แนะนำ" 
                className="w-full aspect-square object-cover rounded-xl shadow-md border border-gray-200 mb-2 transition hover:scale-105" 
              />
              <span className="text-xs font-medium text-gray-600 text-center w-full truncate px-1">พืชในฤดูกาล</span>
            </div>
            <div className="flex flex-col items-center">
              <img 
                src={currentAgriInfo.fertImg} 
                alt="ปุ๋ยแนะนำ" 
                className="w-full aspect-square object-cover rounded-xl shadow-md border border-gray-200 mb-2 transition hover:scale-105" 
              />
              <span className="text-xs font-medium text-gray-600 text-center w-full truncate px-1">ปุ๋ยที่เหมาะสม</span>
            </div>
          </div>
            
          <div className="flex flex-col gap-4 mt-auto">
            <div className="text-center bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
              <h4 className="text-md font-bold text-gray-700 mb-2">ผลไม้ที่ออกผล</h4>
              <p className="text-lg font-bold text-blue-700 bg-blue-50 py-2 rounded-lg">{currentAgriInfo.fruit}</p>
            </div>

            <div className="text-center bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
              <h4 className="text-md font-bold text-gray-700 mb-2">ควรใช้ปุ๋ยสูตรอะไร</h4>
              <p className="text-lg font-bold text-blue-700 bg-blue-50 py-2 rounded-lg">{currentAgriInfo.fertilizer}</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-center text-gray-400">
            ข้อมูลอ้างอิงสภาพอากาศเดือน {viewDate.toLocaleDateString("th-TH", { month: "long" })}
          </div>
        </div>

      </div>
    </div>
  );
}