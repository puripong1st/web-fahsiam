"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// 1. ข้อมูลพืชในฤดูกาล
const MONTHLY_PLANTS = [
  { month: 0, plant: "กะหล่ำปลี, ผักกาดขาว", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Jan+Plant" },
  { month: 1, plant: "แตงกวา, ถั่วฝักยาว", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Feb+Plant" },
  { month: 2, plant: "ผักบุ้ง, ผักกวางตุ้ง", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Mar+Plant" },
  { month: 3, plant: "บวบ, ฟักเขียว", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Apr+Plant" },
  { month: 4, plant: "ข้าวโพด, ข้าว", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=May+Plant" },
  { month: 5, plant: "พริก, มะเขือ", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Jun+Plant" },
  { month: 6, plant: "ผักชี, ขึ้นฉ่าย", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Jul+Plant" },
  { month: 7, plant: "คะน้า, กวางตุ้ง", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Aug+Plant" },
  { month: 8, plant: "แครอท, หัวไชเท้า", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Sep+Plant" },
  { month: 9, plant: "กระเทียม, หอมแดง", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Oct+Plant" },
  { month: 10, plant: "บรอกโคลี, ผักกาดแก้ว", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Nov+Plant" },
  { month: 11, plant: "ผักกาดหอม, สลัด", plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Dec+Plant" },
];

// 2. รายชื่อพืชสำหรับ Dropdown
const CROP_OPTIONS = [
  "กาแฟ",
  "ทุเรียน (ยังไม่ให้ผลผลิต) 0-1 ปี",
  "ทุเรียน (ยังไม่ให้ผลผลิต) 2-3 ปี",
  "ทุเรียน (ให้ผลผลิต)",
  "ปาล์มน้ำมัน เริ่มปลูก",
  "ปาล์มน้ำมัน ตั้งแต่ ปี 4 ปีต้นไป",
  "ยาสูบ",
  "ยางพาราเริ่มปลูก",
  "ยางพาราเริ่มกรีด 7 ปี ขึ้นไป",
];

// 3. ข้อมูลปุ๋ยแยกตามชนิดพืชและเดือน
const CROP_FERTILIZER_DATA: Record<string, { fertText: string; fertImg: string }[]> = {
  "กาแฟ": Array(12).fill({ fertText: "ปุ๋ยอินทรีย์เคมี 6-3-3 (บำรุงต้นและใบ)", fertImg: "/image/Fertilizer/6-3-3.png" }),
  "ทุเรียน (ยังไม่ให้ผลผลิต) 0-1 ปี": Array(12).fill({ fertText: "ปุ๋ยอินทรีย์ ฟ้าสยาม ชนิดผง (บำรุงต้นอ่อน/ฟื้นฟูดิน)", fertImg: "/image/Fertilizer/OM25_.png" }),
  "ทุเรียน (ยังไม่ให้ผลผลิต) 2-3 ปี": Array(12).fill({ fertText: "ปุ๋ยอินทรีย์เคมี 12-3-5 (เร่งการเจริญเติบโต ดึงใบ)", fertImg: "/image/Fertilizer/12-3-5.png" }),
  "ทุเรียน (ให้ผลผลิต)": [
    { fertText: "ปุ๋ยอินทรีย์เคมี 3-6-15 (สะสมอาหาร บำรุงตาดอก)", fertImg: "/image/Fertilizer/3-6-15.png" },
    { fertText: "ปุ๋ยอินทรีย์เคมี 3-6-15 (สะสมอาหาร บำรุงตาดอก)", fertImg: "/image/Fertilizer/3-6-15.png" },
    { fertText: "ปุ๋ยอินทรีย์เคมี 3-6-15 (บำรุงผล)", fertImg: "/image/Fertilizer/3-6-15.png" },
    { fertText: "ปุ๋ยเคมี 0-0-30 (ขยายผล สร้างเนื้อ)", fertImg: "/image/Fertilizer/0-0-30.png" },
    { fertText: "ปุ๋ยเคมี 0-0-30 (เพิ่มความหวาน น้ำหนัก)", fertImg: "/image/Fertilizer/0-0-30.png" },
    { fertText: "ปุ๋ยอินทรีย์ ฟ้าสยาม ชนิดเม็ด (ฟื้นต้นหลังเก็บเกี่ยว)", fertImg: "/image/Fertilizer/-OM25_.png" },
    { fertText: "ปุ๋ยอินทรีย์ ฟ้าสยาม ชนิดเม็ด (ฟื้นต้น บำรุงดิน)", fertImg: "/image/Fertilizer/-OM25_.png" },
    { fertText: "ปุ๋ยอินทรีย์เคมี 12-3-5 (บำรุงต้น ดึงใบอ่อน)", fertImg: "/image/Fertilizer/2-3-5.png" },
    { fertText: "ปุ๋ยอินทรีย์เคมี 12-3-5 (บำรุงต้น ดึงใบอ่อน)", fertImg: "/image/Fertilizer/12-3-5.png" },
    { fertText: "ปุ๋ยอินทรีย์เคมี 6-3-3 (บำรุงต้น สะสมอาหารเบื้องต้น)", fertImg: "/image/Fertilizer/6-3-3.png" },
    { fertText: "ปุ๋ยอินทรีย์เคมี 3-6-15 (สะสมอาหาร สร้างตาดอก)", fertImg: "/image/Fertilizer/3-6-15.png" },
    { fertText: "ปุ๋ยอินทรีย์เคมี 3-6-15 (สะสมอาหาร สร้างตาดอก)", fertImg: "/image/Fertilizer/3-6-15.png" },
  ],
  "ปาล์มน้ำมัน เริ่มปลูก": Array(12).fill({ fertText: "ปุ๋ยอินทรีย์ ฟ้าสยาม ชนิดเม็ด (รองก้นหลุม บำรุงราก)", fertImg: "/image/Fertilizer/-OM25_.png" }),
  "ปาล์มน้ำมัน ตั้งแต่ ปี 4 ปีต้นไป": Array(12).fill({ fertText: "ปุ๋ยอินทรีย์เคมี 3-6-15 (บำรุงผล เพิ่มทะลาย)", fertImg: "/image/Fertilizer/3-6-15.png" }),
  "ยาสูบ": Array(12).fill({ fertText: "ปุ๋ยอินทรีย์เคมี 12-3-5 (บำรุงใบ)", fertImg: "/image/Fertilizer/12-3-5.png" }),
  "ยางพาราเริ่มปลูก": Array(12).fill({ fertText: "ปุ๋ยอินทรีย์เคมี 6-3-3 (บำรุงรากและลำต้น)", fertImg: "/image/Fertilizer/6-3-3.png" }),
  "ยางพาราเริ่มกรีด 7 ปี ขึ้นไป": Array(12).fill({ fertText: "ปุ๋ยอินทรีย์เคมี 12-3-5 (บำรุงต้น เพิ่มน้ำยาง)", fertImg: "/image/Fertilizer/12-3-5.png" }),
};

// 4. ข้อมูลรายละเอียดอัตราการใช้ปุ๋ยตามระยะ
const CROP_USAGE_DETAILS: Record<string, { badge: string; stage: string; formula: string; rate: string }[]> = {
  "กาแฟ": [
    { badge: "ก่อนปลูก", stage: "เตรียมดิน", formula: "ปุ๋ยอินทรีย์", rate: "50-100 กรัม/ต้น" },
    { badge: "ครั้งที่ 1", stage: "เร่งต้น", formula: "6-3-3 หรือ 12-3-5", rate: "200-400 กรัม/ต้น" },
    { badge: "ครั้งที่ 2", stage: "บำรุงดอก บำรุงผลผลิต", formula: "ปุ๋ยอินทรีย์เคมี 3-6-15", rate: "600-800 กรัม/ต้น" },
  ],
  "ทุเรียน (ยังไม่ให้ผลผลิต) 0-1 ปี": [
    { badge: "อายุ 0-1 ปี", stage: "เตรียมดินก่อนปลูก", formula: "ปุ๋ยอินทรีย์", rate: "50-100 กรัม/ต้น" },
    { badge: "อายุ 0-1 ปี", stage: "ต้นตั้งตัว", formula: "ปุ๋ยอินทรีย์เคมี 6-3-3", rate: "50-100 กรัม/ต้น" },
    { badge: "อายุ 1-2 ปี", stage: "เตรียมดิน", formula: "ปุ๋ยอินทรีย์", rate: "100-200 กรัม/ต้น" },
    { badge: "อายุ 1-2 ปี", stage: "เร่งต้น บำรุงใบ", formula: "ปุ๋ยอินทรีย์เคมี 6-3-3", rate: "100-200 กรัม/ต้น" },
  ],
  "ทุเรียน (ยังไม่ให้ผลผลิต) 2-3 ปี": [
    { badge: "อายุ 2-3 ปี", stage: "ปรับดิน", formula: "ปุ๋ยอินทรีย์", rate: "200-300 กรัม/ต้น" },
    { badge: "อายุ 2-3 ปี", stage: "บำรุงใบขยายทรงพุ่ม", formula: "ปุ๋ยอินทรีย์เคมี 6-3-3", rate: "300-500 กรัม/ต้น" },
    { badge: "อายุ 3-4 ปี", stage: "ปรับดิน", formula: "ปุ๋ยอินทรีย์", rate: "100-200 กรัม/ต้น" },
    { badge: "อายุ 3-4 ปี", stage: "เร่งต้น บำรุงใบ ขยายทรงพุ่ม", formula: "ปุ๋ยอินทรีย์เคมี 12-3-5", rate: "100-200 กรัม/ต้น" },
  ],
  "ทุเรียน (ให้ผลผลิต)": [
    { badge: "หลังเก็บเกี่ยว", stage: "ฟื้นฟูสภาพต้น บำรุงดิน", formula: "ปุ๋ยอินทรีย์", rate: "1-2 กก./ต้น" },
    { badge: "ระยะทำใบ", stage: "บำรุงต้น-บำรุงใบ", formula: "6-3-3 และ 12-3-5", rate: "1-3 กก./ต้น" },
    { badge: "ก่อนออกดอก", stage: "สะสมอาหาร", formula: "ปุ๋ยอินทรีย์เคมี 3-6-15", rate: "1-3 กก./ต้น" },
    { badge: "ติดผล", stage: "บำรุงลูก (ไข่ไก่-ผลกลาง)", formula: "ปุ๋ยอินทรีย์เคมี 3-6-15", rate: "1-2 กก./ต้น" },
    { badge: "ใกล้เก็บเกี่ยว", stage: "ระยะเบ่งพู", formula: "ปุ๋ยเคมี 0-0-30", rate: "1-3 กก./ต้น" },
  ],
  "ปาล์มน้ำมัน เริ่มปลูก": [
    { badge: "ก่อนปลูก", stage: "เตรียมดินก่อนปลูก", formula: "ปุ๋ยอินทรีย์", rate: "100-200 กรัม/ต้น" },
    { badge: "ปีที่ 1", stage: "ปาล์มเล็ก (ใช้สลับ 2 สูตร)", formula: "6-3-3 สลับ 12-3-5", rate: "1.5-2 กก./ต้น/ปี" },
    { badge: "ปีที่ 2", stage: "ปาล์มเล็ก (ใช้สลับ 2 สูตร)", formula: "6-3-3 สลับ 12-3-5", rate: "3.5-4 กก./ต้น/ปี" },
    { badge: "ปีที่ 3", stage: "ปาล์มเล็ก (ใช้สลับ 2 สูตร)", formula: "6-3-3 สลับ 12-3-5", rate: "5.5-6 กก./ต้น/ปี" },
  ],
  "ปาล์มน้ำมัน ตั้งแต่ ปี 4 ปีต้นไป": [
    { badge: "ปีที่ 4", stage: "ปาล์มเล็ก (ใช้สลับ 2 สูตร)", formula: "12-3-5 สลับ 3-6-15", rate: "6.5-7 กก./ต้น/ปี" },
    { badge: "ปีที่ 5 ขึ้นไป", stage: "ปาล์มใหญ่", formula: "3-6-15 หรือ 0-0-30", rate: "1.5-2 กก./ต้น/ปี" },
  ],
  "ยาสูบ": [
    { badge: "ก่อนปลูก", stage: "เตรียมดินก่อนปลูก", formula: "ปุ๋ยอินทรีย์", rate: "50 กก./ไร่" },
    { badge: "ครั้งที่ 1", stage: "เร่งต้น", formula: "6-3-3 หรือ 12-3-5", rate: "50 กก./ไร่" },
    { badge: "ครั้งที่ 2", stage: "บำรุงดอก เพิ่มกลิ่น", formula: "ปุ๋ยอินทรีย์เคมี 3-6-15", rate: "50 กก./ไร่" },
  ],
  "ยางพาราเริ่มปลูก": [
    { badge: "ก่อนปลูก", stage: "เตรียมดินก่อนปลูก", formula: "ปุ๋ยอินทรีย์", rate: "50-100 กรัม/ต้น" },
    { badge: "ปีที่ 1", stage: "ใช้สลับกัน", formula: "6-3-3 สลับ 12-3-5", rate: "400-500 กรัม/ต้น/ปี" },
    { badge: "ปีที่ 2-4", stage: "ใช้สลับกัน", formula: "6-3-3 สลับ 12-3-5", rate: "600-700 กรัม/ต้น/ปี" },
    { badge: "ปีที่ 5-6", stage: "ใช้สลับกัน", formula: "6-3-3 สลับ 12-3-5", rate: "700-800 กรัม/ต้น/ปี" },
  ],
  "ยางพาราเริ่มกรีด 7 ปี ขึ้นไป": [
    { badge: "ปีที่ 7 ขึ้นไป", stage: "ใช้เดี่ยว", formula: "ปุ๋ยอินทรีย์เคมี 12-3-5", rate: "1.5-2 กก./ต้น/ปี" },
    { badge: "ปีที่ 7 ขึ้นไป", stage: "ใช้ผสม 1:1", formula: "12-3-5 ผสม 3-6-15", rate: "1.5-2 กก./ต้น/ปี" },
  ],
};

const daysOfWeek = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

export default function CalendarWidget() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());
  
  // ✨ แก้ไขส่วนนี้: เปลี่ยนค่าเริ่มต้นให้เป็นค่าว่าง แทนที่จะเลือก index [0]
  const [selectedCrop, setSelectedCrop] = useState("");
  
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  const goToToday = () => setViewDate(new Date());

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();

  const currentPlantInfo = MONTHLY_PLANTS[viewMonth];
  
  // ✨ แก้ไขส่วนนี้: ป้องกัน Error โดยการดึงข้อมูลปุ๋ยเมื่อมีการเลือกพืช (selectedCrop ไม่ว่างเปล่า) เท่านั้น
  const currentFertilizerInfo = selectedCrop ? CROP_FERTILIZER_DATA[selectedCrop][viewMonth] : null;
  const currentUsageDetails = selectedCrop ? CROP_USAGE_DETAILS[selectedCrop] : null; 

  const totalCells = 42;
  const emptyDaysAfterCount = totalCells - (firstDayOfMonth + daysInMonth);

  return (
    <>
      <div className="max-w-[1400px] w-full mx-auto p-4 my-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col xl:flex-row overflow-hidden">
          
          {/* ================= ฝั่งซ้าย: ปฏิทิน ================= */}
          <div className="w-full xl:w-[40%] p-6 flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-6 gap-4">
              <div className="flex flex-col items-center md:items-start w-full md:w-auto">
                <div className="flex items-center justify-center gap-3 mb-2 w-full">
                  <button 
                    onClick={prevMonth}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition"
                  >
                    ◀
                  </button>
                  <h2 className="text-3xl font-bold text-sky-800 w-40 text-center">
                    {viewDate.toLocaleDateString("th-TH", { month: "long" })}
                  </h2>
                  <button 
                    onClick={nextMonth}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition"
                  >
                    ▶
                  </button>
                </div>
                <button 
                  onClick={goToToday}
                  className="text-sm font-medium text-sky-600 hover:text-sky-800 hover:underline px-2 text-center md:text-left w-full md:w-auto"
                >
                  กลับไปเดือนปัจจุบัน
                </button>
              </div>
              
              <div className="flex flex-col items-center md:items-end w-full md:w-auto mt-2 md:mt-0">
                <div className="text-3xl font-bold text-sky-800 mb-2 md:mr-2 text-center md:text-right">
                  {viewDate.toLocaleDateString("th-TH", { year: "numeric" })}
                </div>
                <div className="text-xl font-mono font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-lg text-center">
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

          {/* ================= ฝั่งขวา: รายละเอียดการเกษตร & รูปภาพแนะนำ ================= */}
          <div className="w-full xl:w-[60%] bg-gray-50 p-6 border-t xl:border-t-0 xl:border-l border-gray-200 flex flex-col">
            
            <h3 className="w-full text-lg font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200 flex items-center justify-center gap-2">
              🌿 แนะนำสำหรับเดือนนี้
            </h3>
            
            <div className="flex flex-col md:flex-row gap-6 flex-1">
              
              <div className="w-full md:w-[45%] flex flex-col gap-4">
                
                <div className="grid grid-cols-2 gap-4">
                  {/* กรอบพืช (พืชในฤดูกาลโชว์ตามปกติเพราะไม่ได้อิงตาม dropdown) */}
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-full aspect-square rounded-xl shadow-md border border-gray-200 mb-2 overflow-hidden cursor-pointer relative group bg-white"
                      onClick={() => setZoomedImage(currentPlantInfo.plantImg)}
                    >
                      <Image 
                        src={currentPlantInfo.plantImg} 
                        alt="พืชในฤดูกาล" 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 font-medium drop-shadow-md">🔍 ขยายดูรูป</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-700 text-center w-full truncate px-1">พืชในฤดูกาล</span>
                    <span className="text-xs text-gray-500 text-center">{currentPlantInfo.plant}</span>
                  </div>

                  {/* ✨ แก้ไขส่วนนี้: กรอบปุ๋ย ซ่อนจนกว่าจะเลือกพืช */}
                  <div className="flex flex-col items-center">
                    {selectedCrop && currentFertilizerInfo ? (
                      <>
                        <div 
                          className="w-full aspect-square rounded-xl shadow-md border border-gray-200 mb-2 overflow-hidden cursor-pointer relative group bg-white"
                          onClick={() => setZoomedImage(currentFertilizerInfo.fertImg)}
                        >
                          <Image
                            src={currentFertilizerInfo.fertImg} 
                            alt="ปุ๋ยแนะนำ" 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="text-white opacity-0 group-hover:opacity-100 font-medium drop-shadow-md">🔍 ขยายดูรูป</span>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-gray-700 text-center w-full truncate px-1">ปุ๋ยที่เหมาะสม</span>
                      </>
                    ) : (
                      <>
                         <div className="w-full aspect-square rounded-xl border-2 border-dashed border-gray-300 bg-gray-100 mb-2 flex items-center justify-center">
                           <span className="text-gray-400 text-xs">รอเลือกพืช</span>
                         </div>
                         <span className="text-sm font-bold text-gray-400 text-center w-full truncate px-1">ปุ๋ยที่เหมาะสม</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="text-center bg-white p-4 rounded-xl border border-blue-100 shadow-sm mt-2">
                  <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">เลือกพืชของคุณ</h4>
                  <select 
                    value={selectedCrop} 
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full bg-blue-50 text-blue-800 text-base md:text-lg font-bold py-2.5 px-3 rounded-lg border-2 border-transparent hover:border-blue-200 focus:border-blue-500 focus:ring-0 outline-none cursor-pointer transition"
                  >
                    {/* ✨ แก้ไขส่วนนี้: เพิ่ม Option เริ่มต้นแบบปิดการใช้งานไว้ */}
                    <option value="" disabled>-- กรุณาเลือกพืช --</option>
                    {CROP_OPTIONS.map((crop) => (
                      <option key={crop} value={crop}>{crop}</option>
                    ))}
                  </select>
                </div>

                <div className="text-center bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex-1 flex flex-col justify-center">
                  <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">ควรใช้ปุ๋ยสูตรอะไร</h4>
                  {/* ✨ แก้ไขส่วนนี้: เช็คว่ามีการเลือกพืชหรือยัง ก่อนจะแสดงสูตรปุ๋ย */}
                  {selectedCrop && currentFertilizerInfo ? (
                    <p className="text-lg font-bold text-blue-700 bg-blue-50 py-3 px-2 rounded-lg break-words">
                      {currentFertilizerInfo.fertText}
                    </p>
                  ) : (
                    <p className="text-sm font-medium text-gray-400 py-3 px-2">
                      กรุณาเลือกพืชเพื่อดูคำแนะนำ
                    </p>
                  )}
                </div>
              </div>

              {/* ขวาของฝั่งขวา: ตารางรายละเอียดอัตราการใช้ปุ๋ย */}
              <div className="w-full md:w-[55%] flex flex-col">
                {/* ✨ แก้ไขส่วนนี้: แสดงตารางต่อเมื่อเลือกพืชแล้วเท่านั้น หากยังไม่เลือกจะแสดงกล่องเปล่าๆ รอผู้ใช้ */}
                {selectedCrop ? (
                  currentUsageDetails && currentUsageDetails.length > 0 && (
                    <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm text-left flex-1 flex flex-col">
                      <h4 className="text-sm font-bold text-green-700 mb-3 border-b border-green-100 pb-2 flex items-center gap-2">
                        📊 อัตราการใช้ปุ๋ยตามระยะ
                      </h4>
                      <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                        {currentUsageDetails.map((detail, idx) => (
                          <div key={idx} className="flex flex-col bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400 rounded-l-xl"></div>
                            <div className="flex flex-wrap items-center gap-2 mb-1 pl-2">
                              {detail.badge && (
                                <span className="bg-orange-100 text-orange-700 border border-orange-200 px-2.5 py-0.5 rounded-md text-xs font-bold tracking-wide">
                                  {detail.badge}
                                </span>
                              )}
                              <span className="text-sm font-bold text-gray-800">{detail.stage}</span>
                            </div>
                            <div className="flex justify-between items-end mt-2 pl-2 text-xs">
                              <span className="text-gray-600 font-medium">สูตร: <span className="text-blue-600 font-bold">{detail.formula}</span></span>
                              <span className="bg-green-100 text-green-800 border border-green-200 px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap ml-2 shadow-sm">
                                {detail.rate}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-3 text-center">*อัตราการใช้ขึ้นอยู่กับอายุและความสมบูรณ์ของต้น</p>
                    </div>
                  )
                ) : (
                  <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-200 shadow-sm flex-1 flex flex-col items-center justify-center text-center h-full min-h-[250px]">
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

      {/* ================= Modal สำหรับแสดงภาพขยายเต็มจอ ================= */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative w-full max-w-4xl h-full flex justify-center items-center">
            <button 
              className="absolute top-4 right-4 text-white hover:text-red-400 bg-black/50 rounded-full p-2 transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation();
                setZoomedImage(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <Image
              src={zoomedImage} 
              alt="รูปภาพขยาย" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl scale-100 animate-in fade-in zoom-in duration-200"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}
    </>
  );
}