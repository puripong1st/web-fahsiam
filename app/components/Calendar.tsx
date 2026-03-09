"use client";

import { useState, useEffect } from "react";

const agriData = [
  { month: 0, plant: "กะหล่ำปลี, ผักกาดขาว", fruit: "สตรอว์เบอร์รี, พุทรา", fertilizer: "ปุ๋ยคอกหมักสูตรบำรุงใบ" },
  { month: 1, plant: "แตงกวา, ถั่วฝักยาว", fruit: "มะขามป้อม, องุ่น", fertilizer: "ปุ๋ยสูตรเสมอ 15-15-15" },
  { month: 2, plant: "ผักบุ้ง, ผักกวางตุ้ง", fruit: "มะม่วง, แตงโม", fertilizer: "ปุ๋ยน้ำหมักชีวภาพ (เน้นชุ่มชื้น)" },
  { month: 3, plant: "บวบ, ฟักเขียว", fruit: "ทุเรียน, เงาะ", fertilizer: "ปุ๋ยอินทรีย์รองก้นหลุม" },
  { month: 4, plant: "ข้าวโพด, ข้าว", fruit: "มังคุด, ลิ้นจี่", fertilizer: "ปุ๋ยยูเรีย 46-0-0 (เร่งโต)" },
  { month: 5, plant: "พริก, มะเขือ", fruit: "สับปะรด, ระกำ", fertilizer: "ปุ๋ยคอกผสมแกลบ" },
  { month: 6, plant: "ผักชี, ขึ้นฉ่าย", fruit: "ส้มโอ, ลำไย", fertilizer: "ปุ๋ยชีวภาพสูตรป้องกันเชื้อรา" },
  { month: 7, plant: "คะน้า, กวางตุ้ง", fruit: "ส้มเขียวหวาน, ฝรั่ง", fertilizer: "ปุ๋ยคอกบำรุงดิน" },
  { month: 8, plant: "แครอท, หัวไชเท้า", fruit: "กล้วยน้ำว้า, มะละกอ", fertilizer: "ปุ๋ยสูตร 8-24-24 (บำรุงหัว)" },
  { month: 9, plant: "กระเทียม, หอมแดง", fruit: "มะเฟือง, ลองกอง", fertilizer: "ปุ๋ยหมักปลาทะเล" },
  { month: 10, plant: "บรอกโคลี, ผักกาดแก้ว", fruit: "พุทรา, แตงไทย", fertilizer: "ปุ๋ยคอกสูตรเย็น" },
  { month: 11, plant: "ผักกาดหอม, สลัด", fruit: "พุทราแอปเปิล, องุ่น", fertilizer: "ปุ๋ยมูลไส้เดือน" },
];

const daysOfWeek = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

export default function CalendarWidget() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  const goToToday = () => setViewDate(new Date());

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const currentAgriInfo = agriData[viewMonth];

  // คำนวณช่องว่างที่ต้องเติมด้านหลัง เพื่อให้ตารางมี 42 ช่อง (6 สัปดาห์) เสมอ
  const totalCells = 42;
  const emptyDaysAfterCount = totalCells - (firstDayOfMonth + daysInMonth);

  return (
    <div className="max-w-5xl mx-auto p-4 my-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col md:flex-row overflow-hidden">
        
        {/* ฝั่งซ้าย: ปฏิทิน */}
        <div className="w-full md:w-2/3 p-6 flex flex-col">
          
          {/* ส่วนหัวปฏิทิน: จัด Layout ใหม่ */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
            
            {/* ซ้าย: ปุ่มเลื่อน และ ชื่อเดือน */}
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
            
            {/* ขวา: ปี (ด้านบน) และ เวลา (ด้านล่าง) */}
            <div className="text-right flex flex-col items-end">
              <div className="text-3xl font-bold text-sky-800 mb-2 mr-2">
                {viewDate.toLocaleDateString("th-TH", { year: "numeric" })}
              </div>
              <div className="text-xl font-mono font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-lg">
                เวลา: {currentTime.toLocaleTimeString("th-TH", { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>

          </div>

          {/* ตารางปฏิทิน */}
          <div className="bg-gray-200 grid grid-cols-7 gap-px border border-gray-200 rounded-xl overflow-hidden flex-1">
            {/* หัวตารางวัน */}
            {daysOfWeek.map((day, idx) => (
              <div key={day} className={`bg-gray-50 py-2 text-center text-sm font-semibold ${idx === 0 ? 'text-red-500' : 'text-gray-600'}`}>
                {day}
              </div>
            ))}

            {/* ช่องว่างก่อนวันที่ 1 */}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-before-${index}`} className="bg-gray-50/40 p-2 min-h-[4rem] md:min-h-[5rem]"></div>
            ))}

            {/* ช่องวันที่จริง */}
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

            {/* ช่องว่างหลังวันสุดท้าย (ล็อคตารางให้เต็ม 6 แถวเสมอ) */}
            {Array.from({ length: emptyDaysAfterCount }).map((_, index) => (
              <div key={`empty-after-${index}`} className="bg-gray-50/40 p-2 min-h-[4rem] md:min-h-[5rem]"></div>
            ))}
          </div>
        </div>

        {/* ฝั่งขวา: รายละเอียดการเกษตร */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
            🌿 แนะนำสำหรับเดือนนี้
          </h3>
          
          <div className="space-y-4 flex-1">
            <div className="bg-white rounded-xl p-4 border border-green-100 shadow-sm transition-all">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🌱</span>
                <h4 className="font-semibold text-green-700 text-sm">พืชที่ควรปลูก</h4>
              </div>
              <p className="text-gray-600 text-sm ml-7">{currentAgriInfo.plant}</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-orange-100 shadow-sm transition-all">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🍎</span>
                <h4 className="font-semibold text-orange-700 text-sm">ผลไม้ที่ออกผล</h4>
              </div>
              <p className="text-gray-600 text-sm ml-7">{currentAgriInfo.fruit}</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm transition-all">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🧪</span>
                <h4 className="font-semibold text-blue-700 text-sm">ปุ๋ยที่แนะนำ</h4>
              </div>
              <p className="text-gray-600 text-sm ml-7">{currentAgriInfo.fertilizer}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-center text-gray-500">
            ข้อมูลอ้างอิงสภาพอากาศเดือน {viewDate.toLocaleDateString("th-TH", { month: "long" })}
          </div>
        </div>

      </div>
    </div>
  );
}