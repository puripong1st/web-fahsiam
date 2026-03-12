"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MOCK_PRODUCTS } from "../data/productsdetail";

// ─────────────────────────────────────────────
// 1. ข้อมูลสินค้าปุ๋ย — ดึงจาก MOCK_PRODUCTS โดยตรง
// ─────────────────────────────────────────────
type ProductInfo = {
  productId: string;
  productName: string;
  description: string;
  price: number;
  oldPrice: number;
  image: string;
};

// แปลง MOCK_PRODUCTS → ProductInfo (ดึงประโยชน์แรกเป็น description)
const FERTILIZER_PRODUCTS: ProductInfo[] = MOCK_PRODUCTS.map((p) => ({
  productId: p.id,
  productName: p.name,
  description: p.benefits[0] ?? "",
  price: p.price,
  oldPrice: p.oldPrice ?? p.price,
  image: p.image,
}));

// shorthand refs — ดึงด้วย id ตรงจาก MOCK_PRODUCTS
const findP = (id: string) => FERTILIZER_PRODUCTS.find((p) => p.productId === id)!;
const P = {
  "12-3-5": findP("p1"),
  "3-6-15": findP("p2"),
  "0-0-30": findP("p3"),
  "OM25":   findP("p4"),
  "OM20":   findP("p5"),
  "6-3-3":  findP("p6"),
};

// ─────────────────────────────────────────────
// 2. Slides ปุ๋ยแยกตามพืช (ใช้ใน slideshow + modal)
// ─────────────────────────────────────────────
type FertSlide = {
  fertText: string;
  product: ProductInfo;
};

const CROP_FERT_SLIDES: Record<string, FertSlide[]> = {
  "กาแฟ": [
    { fertText: "เตรียมดิน / รองก้นหลุมก่อนปลูก",    product: P["OM25"]   },
    { fertText: "เตรียมดิน / รองก้นหลุม (ชนิดเม็ด)",  product: P["OM20"]   },
    { fertText: "เร่งต้น บำรุงต้นและใบ",               product: P["6-3-3"]  },
    { fertText: "บำรุงดอก เพิ่มผลผลิต",                product: P["3-6-15"] },
  ],
  "ทุเรียน (ยังไม่ให้ผลผลิต) 0-1 ปี": [
    { fertText: "เตรียมดิน / รองก้นหลุม OM ผง",        product: P["OM25"]  },
    { fertText: "เตรียมดิน / รองก้นหลุม OM เม็ด",       product: P["OM20"]  },
    { fertText: "ต้นตั้งตัว / บำรุงต้นอ่อน",            product: P["6-3-3"] },
  ],
  "ทุเรียน (ยังไม่ให้ผลผลิต) 2-3 ปี": [
    { fertText: "ปรับดิน / เพิ่มอินทรียวัตถุ OM ผง",   product: P["OM25"]    },
    { fertText: "ปรับดิน / เพิ่มอินทรียวัตถุ OM เม็ด", product: P["OM20"]    },
    { fertText: "บำรุงใบ ขยายทรงพุ่ม (2-3 ปี)",        product: P["6-3-3"]   },
    { fertText: "เร่งต้น บำรุงใบ ขยายทรงพุ่ม (3-4 ปี)",product: P["12-3-5"] },
  ],
  "ทุเรียน (ให้ผลผลิต)": [
    { fertText: "ฟื้นฟูสภาพต้น บำรุงดิน (หลังเก็บเกี่ยว) OM เม็ด", product: P["OM20"]   },
    { fertText: "บำรุงต้น-ใบ ระยะทำใบ",                              product: P["6-3-3"]  },
    { fertText: "เร่งต้น-ใบ ระยะทำใบ",                               product: P["12-3-5"] },
    { fertText: "สะสมอาหาร สร้างตาดอก / บำรุงผล",                   product: P["3-6-15"] },
    { fertText: "ขยายผล เพิ่มความหวาน น้ำหนัก (ระยะเบ่งพู)",        product: P["0-0-30"] },
  ],
  "ปาล์มน้ำมัน เริ่มปลูก": [
    { fertText: "รองก้นหลุมก่อนปลูก OM ผง",            product: P["OM25"]    },
    { fertText: "รองก้นหลุมก่อนปลูก OM เม็ด",           product: P["OM20"]    },
    { fertText: "ปีที่ 1-3 บำรุงลำต้น (สลับ)",          product: P["6-3-3"]   },
    { fertText: "ปีที่ 1-3 เร่งการเจริญเติบโต (สลับ)",  product: P["12-3-5"]  },
  ],
  "ปาล์มน้ำมัน ตั้งแต่ ปี 4 ปีต้นไป": [
    { fertText: "ปีที่ 4 เร่งต้น (สลับ)",               product: P["12-3-5"] },
    { fertText: "ปีที่ 4-5 บำรุงผล เพิ่มทะลาย (สลับ)", product: P["3-6-15"] },
    { fertText: "ปีที่ 5+ เพิ่มน้ำหนักทะลาย",           product: P["0-0-30"] },
  ],
  "ยาสูบ": [
    { fertText: "เตรียมดินก่อนปลูก OM ผง",              product: P["OM25"]   },
    { fertText: "เตรียมดินก่อนปลูก OM เม็ด",             product: P["OM20"]   },
    { fertText: "เร่งต้น บำรุงใบ (ครั้งที่ 1)",          product: P["6-3-3"]  },
    { fertText: "บำรุงดอก เพิ่มกลิ่น (ครั้งที่ 2)",      product: P["3-6-15"] },
  ],
  "ยางพาราเริ่มปลูก": [
    { fertText: "รองก้นหลุมก่อนปลูก OM ผง",                    product: P["OM25"]   },
    { fertText: "รองก้นหลุมก่อนปลูก OM เม็ด",                   product: P["OM20"]   },
    { fertText: "ปีที่ 1-6 บำรุงรากและลำต้น (สลับ)",             product: P["6-3-3"]  },
    { fertText: "ปีที่ 1-6 เร่งการเจริญเติบโต (สลับ)",           product: P["12-3-5"] },
  ],
  "ยางพาราเริ่มกรีด 7 ปี ขึ้นไป": [
    { fertText: "บำรุงต้น เพิ่มน้ำยาง (ใช้เดี่ยว)",              product: P["12-3-5"] },
    { fertText: "บำรุงผลผลิต เพิ่มน้ำยาง (ผสม 1:1 กับ 3-6-15)", product: P["3-6-15"] },
  ],
};

// ─────────────────────────────────────────────
// 3. ปุ๋ยประจำเดือน
// ─────────────────────────────────────────────
const CROP_FERTILIZER_DATA: Record<string, { fertText: string; fertImg: string }[]> = {
  "กาแฟ": Array(12).fill({ fertText: "ปุ๋ยอินทรีย์เคมี 6-3-3 (บำรุงต้นและใบ)", fertImg: "/image/Fertilizer/6-3-3.png" }),
  "ทุเรียน (ยังไม่ให้ผลผลิต) 0-1 ปี": Array(12).fill({ fertText: "ปุ๋ยอินทรีย์ผง OM 25% (บำรุงต้นอ่อน/ฟื้นฟูดิน)", fertImg: "/image/Fertilizer/OM25_.png" }),
  "ทุเรียน (ยังไม่ให้ผลผลิต) 2-3 ปี": Array(12).fill({ fertText: "ปุ๋ยอินทรีย์เคมี 12-3-5 (เร่งการเจริญเติบโต ดึงใบ)", fertImg: "/image/Fertilizer/12-3-5.png" }),
  "ทุเรียน (ให้ผลผลิต)": [
    { fertText: "3-6-15 (สะสมอาหาร บำรุงตาดอก)", fertImg: "/image/Fertilizer/3-6-15.png" },
    { fertText: "3-6-15 (สะสมอาหาร บำรุงตาดอก)", fertImg: "/image/Fertilizer/3-6-15.png" },
    { fertText: "3-6-15 (บำรุงผล)", fertImg: "/image/Fertilizer/3-6-15.png" },
    { fertText: "0-0-30 (ขยายผล สร้างเนื้อ)", fertImg: "/image/Fertilizer/0-0-30.png" },
    { fertText: "0-0-30 (เพิ่มความหวาน น้ำหนัก)", fertImg: "/image/Fertilizer/0-0-30.png" },
    { fertText: "OM เม็ด (ฟื้นต้นหลังเก็บเกี่ยว)", fertImg: "/image/Fertilizer/-OM25_.png" },
    { fertText: "OM เม็ด (ฟื้นต้น บำรุงดิน)", fertImg: "/image/Fertilizer/-OM25_.png" },
    { fertText: "12-3-5 (บำรุงต้น ดึงใบอ่อน)", fertImg: "/image/Fertilizer/12-3-5.png" },
    { fertText: "12-3-5 (บำรุงต้น ดึงใบอ่อน)", fertImg: "/image/Fertilizer/12-3-5.png" },
    { fertText: "6-3-3 (บำรุงต้น สะสมอาหาร)", fertImg: "/image/Fertilizer/6-3-3.png" },
    { fertText: "3-6-15 (สะสมอาหาร สร้างตาดอก)", fertImg: "/image/Fertilizer/3-6-15.png" },
    { fertText: "3-6-15 (สะสมอาหาร สร้างตาดอก)", fertImg: "/image/Fertilizer/3-6-15.png" },
  ],
  "ปาล์มน้ำมัน เริ่มปลูก": Array(12).fill({ fertText: "OM เม็ด (รองก้นหลุม บำรุงราก)", fertImg: "/image/Fertilizer/-OM25_.png" }),
  "ปาล์มน้ำมัน ตั้งแต่ ปี 4 ปีต้นไป": Array(12).fill({ fertText: "3-6-15 (บำรุงผล เพิ่มทะลาย)", fertImg: "/image/Fertilizer/3-6-15.png" }),
  "ยาสูบ": Array(12).fill({ fertText: "12-3-5 (บำรุงใบ)", fertImg: "/image/Fertilizer/12-3-5.png" }),
  "ยางพาราเริ่มปลูก": Array(12).fill({ fertText: "6-3-3 (บำรุงรากและลำต้น)", fertImg: "/image/Fertilizer/6-3-3.png" }),
  "ยางพาราเริ่มกรีด 7 ปี ขึ้นไป": Array(12).fill({ fertText: "12-3-5 (บำรุงต้น เพิ่มน้ำยาง)", fertImg: "/image/Fertilizer/12-3-5.png" }),
};

// ─────────────────────────────────────────────
// 4. อัตราการใช้ปุ๋ยตามระยะ
// ─────────────────────────────────────────────
const CROP_USAGE_DETAILS: Record<string, { badge: string; stage: string; formula: string; rate: string }[]> = {
  "กาแฟ": [
    { badge: "ก่อนปลูก",   stage: "เตรียมดิน",                  formula: "OM 25% และ OM 20%",  rate: "50-100 กรัม/ต้น"  },
    { badge: "ครั้งที่ 1", stage: "เร่งต้น",                    formula: "6-3-3 หรือ 12-3-5",  rate: "200-400 กรัม/ต้น" },
    { badge: "ครั้งที่ 2", stage: "บำรุงดอก บำรุงผลผลิต",       formula: "3-6-15",             rate: "600-800 กรัม/ต้น" },
  ],
  "ทุเรียน (ยังไม่ให้ผลผลิต) 0-1 ปี": [
    { badge: "อายุ 0-1 ปี", stage: "เตรียมดินก่อนปลูก",        formula: "OM 25% และ OM 20%",  rate: "50-100 กรัม/ต้น"  },
    { badge: "อายุ 0-1 ปี", stage: "ต้นตั้งตัว",               formula: "6-3-3",              rate: "50-100 กรัม/ต้น"  },
    { badge: "อายุ 1-2 ปี", stage: "เตรียมดิน",                formula: "OM 25% และ OM 20%",  rate: "100-200 กรัม/ต้น" },
    { badge: "อายุ 1-2 ปี", stage: "เร่งต้น บำรุงใบ",          formula: "6-3-3",              rate: "100-200 กรัม/ต้น" },
  ],
  "ทุเรียน (ยังไม่ให้ผลผลิต) 2-3 ปี": [
    { badge: "อายุ 2-3 ปี", stage: "ปรับดิน",                   formula: "OM 25% และ OM 20%", rate: "200-300 กรัม/ต้น" },
    { badge: "อายุ 2-3 ปี", stage: "บำรุงใบขยายทรงพุ่ม",        formula: "6-3-3",             rate: "300-500 กรัม/ต้น" },
    { badge: "อายุ 3-4 ปี", stage: "ปรับดิน",                   formula: "OM 25% และ OM 20%", rate: "100-200 กรัม/ต้น" },
    { badge: "อายุ 3-4 ปี", stage: "เร่งต้น บำรุงใบ ขยายพุ่ม", formula: "12-3-5",            rate: "100-200 กรัม/ต้น" },
  ],
  "ทุเรียน (ให้ผลผลิต)": [
    { badge: "หลังเก็บเกี่ยว", stage: "ฟื้นฟูสภาพต้น บำรุงดิน",    formula: "OM 25% และ OM 20%", rate: "1-2 กก./ต้น" },
    { badge: "ระยะทำใบ",       stage: "บำรุงต้น-บำรุงใบ",           formula: "6-3-3 และ 12-3-5",  rate: "1-3 กก./ต้น" },
    { badge: "ก่อนออกดอก",     stage: "สะสมอาหาร",                  formula: "3-6-15",            rate: "1-3 กก./ต้น" },
    { badge: "ติดผล",           stage: "บำรุงลูก (ไข่ไก่-ผลกลาง)",  formula: "3-6-15",            rate: "1-2 กก./ต้น" },
    { badge: "ใกล้เก็บเกี่ยว", stage: "ระยะเบ่งพู",                 formula: "0-0-30",            rate: "1-3 กก./ต้น" },
  ],
  "ปาล์มน้ำมัน เริ่มปลูก": [
    { badge: "ก่อนปลูก", stage: "เตรียมดิน",              formula: "OM 25% และ OM 20%",   rate: "100-200 กรัม/ต้น" },
    { badge: "ปีที่ 1",   stage: "ปาล์มเล็ก (สลับ 2 สูตร)", formula: "6-3-3 สลับ 12-3-5", rate: "1.5-2 กก./ต้น/ปี" },
    { badge: "ปีที่ 2",   stage: "ปาล์มเล็ก (สลับ 2 สูตร)", formula: "6-3-3 สลับ 12-3-5", rate: "3.5-4 กก./ต้น/ปี" },
    { badge: "ปีที่ 3",   stage: "ปาล์มเล็ก (สลับ 2 สูตร)", formula: "6-3-3 สลับ 12-3-5", rate: "5.5-6 กก./ต้น/ปี" },
  ],
  "ปาล์มน้ำมัน ตั้งแต่ ปี 4 ปีต้นไป": [
    { badge: "ปีที่ 4",        stage: "สลับ 2 สูตร", formula: "12-3-5 สลับ 3-6-15",  rate: "6.5-7 กก./ต้น/ปี" },
    { badge: "ปีที่ 5 ขึ้นไป", stage: "ปาล์มใหญ่",   formula: "3-6-15 หรือ 0-0-30", rate: "1.5-2 กก./ต้น/ปี" },
  ],
  "ยาสูบ": [
    { badge: "ก่อนปลูก",   stage: "เตรียมดิน",          formula: "OM 25% และ OM 20%", rate: "50 กก./ไร่" },
    { badge: "ครั้งที่ 1", stage: "เร่งต้น",             formula: "6-3-3 หรือ 12-3-5", rate: "50 กก./ไร่" },
    { badge: "ครั้งที่ 2", stage: "บำรุงดอก เพิ่มกลิ่น", formula: "3-6-15",            rate: "50 กก./ไร่" },
  ],
  "ยางพาราเริ่มปลูก": [
    { badge: "ก่อนปลูก",  stage: "เตรียมดิน",  formula: "OM 25% และ OM 20%",   rate: "50-100 กรัม/ต้น"    },
    { badge: "ปีที่ 1",    stage: "สลับกัน",    formula: "6-3-3 สลับ 12-3-5",  rate: "400-500 กรัม/ต้น/ปี" },
    { badge: "ปีที่ 2-4",  stage: "สลับกัน",    formula: "6-3-3 สลับ 12-3-5",  rate: "600-700 กรัม/ต้น/ปี" },
    { badge: "ปีที่ 5-6",  stage: "สลับกัน",    formula: "6-3-3 สลับ 12-3-5",  rate: "700-800 กรัม/ต้น/ปี" },
  ],
  "ยางพาราเริ่มกรีด 7 ปี ขึ้นไป": [
    { badge: "ปีที่ 7 ขึ้นไป", stage: "ใช้เดี่ยว",    formula: "12-3-5",              rate: "1.5-2 กก./ต้น/ปี" },
    { badge: "ปีที่ 7 ขึ้นไป", stage: "ใช้ผสม 1:1",   formula: "12-3-5 ผสม 3-6-15", rate: "1.5-2 กก./ต้น/ปี" },
  ],
};

// ─────────────────────────────────────────────
// 5. ค่าคงที่อื่นๆ
// ─────────────────────────────────────────────
const MONTHLY_PLANTS = [
  { month: 0,  plant: "กะหล่ำปลี, ผักกาดขาว",  plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Jan+Plant" },
  { month: 1,  plant: "แตงกวา, ถั่วฝักยาว",    plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Feb+Plant" },
  { month: 2,  plant: "ผักบุ้ง, ผักกวางตุ้ง",  plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Mar+Plant" },
  { month: 3,  plant: "บวบ, ฟักเขียว",          plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Apr+Plant" },
  { month: 4,  plant: "ข้าวโพด, ข้าว",          plantImg: "https://placehold.co/400x400/dcfce7/166534?text=May+Plant" },
  { month: 5,  plant: "พริก, มะเขือ",           plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Jun+Plant" },
  { month: 6,  plant: "ผักชี, ขึ้นฉ่าย",       plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Jul+Plant" },
  { month: 7,  plant: "คะน้า, กวางตุ้ง",       plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Aug+Plant" },
  { month: 8,  plant: "แครอท, หัวไชเท้า",      plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Sep+Plant" },
  { month: 9,  plant: "กระเทียม, หอมแดง",      plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Oct+Plant" },
  { month: 10, plant: "บรอกโคลี, ผักกาดแก้ว",  plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Nov+Plant" },
  { month: 11, plant: "ผักกาดหอม, สลัด",       plantImg: "https://placehold.co/400x400/dcfce7/166534?text=Dec+Plant" },
];

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

const DAYS_OF_WEEK = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

// ═══════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════
export default function CalendarWidget() {
  const [mounted, setMounted]           = useState(false);
  const [currentTime, setCurrentTime]   = useState(new Date());
  const [viewDate, setViewDate]         = useState(new Date());
  const [selectedCrop, setSelectedCrop] = useState("");

  // thumbnail slideshow index
  const [thumbIdx, setThumbIdx] = useState(0);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdx, setModalIdx]   = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // mount + clock
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

  // slides สำหรับพืชที่เลือก
  const slides: FertSlide[] = selectedCrop ? (CROP_FERT_SLIDES[selectedCrop] ?? []) : [];
  const total = slides.length;

  // auto-slide ทุก 3 วิ
  const startAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (total <= 1) return;
    timerRef.current = setInterval(() => {
      setThumbIdx((p) => (p + 1) % total);
    }, 3000);
  };

  useEffect(() => {
    startAuto();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, selectedCrop]);

  // เลื่อน thumbnail + หยุด auto
  const moveThumb = (dir: 1 | -1) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setThumbIdx((p) => (p + dir + total) % total);
  };
  const jumpThumb = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setThumbIdx(i);
  };

  // เลื่อน modal (ไม่กระทบ auto)
  const moveModal = (dir: 1 | -1) => setModalIdx((p) => (p + dir + total) % total);

  if (!mounted) return null;

  // calendar vars
  const viewYear        = viewDate.getFullYear();
  const viewMonth       = viewDate.getMonth();
  const daysInMonth     = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay        = new Date(viewYear, viewMonth, 1).getDay();
  const emptyAfter      = 42 - (firstDay + daysInMonth);

  const plantInfo   = MONTHLY_PLANTS[viewMonth];
  const monthFert   = selectedCrop ? CROP_FERTILIZER_DATA[selectedCrop]?.[viewMonth] : null;
  const usageData   = selectedCrop ? CROP_USAGE_DETAILS[selectedCrop] : null;

  const thumbSlide = slides[thumbIdx] ?? null;
  const modalSlide = slides[modalIdx] ?? null;

  // ───────────────────────────────────────────
  return (
    <>
    <section className="py-16 bg-white" id="why">
      <div className="max-w-[1400px] w-full mx-auto p-4 my-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col xl:flex-row overflow-hidden">

          {/* ══════ ซ้าย: ปฏิทิน ══════ */}
          <div className="w-full xl:w-[40%] p-6 flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-6 gap-4">
              <div className="flex flex-col items-center md:items-start w-full md:w-auto">
                <div className="flex items-center justify-center gap-3 mb-2 w-full">
                  <button onClick={() => setViewDate(new Date(viewYear, viewMonth - 1, 1))} className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition">◀</button>
                  <h2 className="text-3xl font-bold text-sky-800 w-40 text-center">
                    {viewDate.toLocaleDateString("th-TH", { month: "long" })}
                  </h2>
                  <button onClick={() => setViewDate(new Date(viewYear, viewMonth + 1, 1))} className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition">▶</button>
                </div>
                <button onClick={() => setViewDate(new Date())} className="text-sm font-medium text-sky-600 hover:text-sky-800 hover:underline px-2 text-center md:text-left w-full md:w-auto">
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

            <div className="bg-gray-200 grid grid-cols-7 gap-px border border-gray-200 rounded-xl overflow-hidden flex-1">
              {DAYS_OF_WEEK.map((d, i) => (
                <div key={d} className={`bg-gray-50 py-2 text-center text-sm font-semibold ${i === 0 ? "text-red-500" : "text-gray-600"}`}>{d}</div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`eb${i}`} className="bg-gray-50/40 p-2 min-h-[4rem] md:min-h-[5rem]" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const today = day === currentTime.getDate() && viewMonth === currentTime.getMonth() && viewYear === currentTime.getFullYear();
                return (
                  <div key={day} className={`p-2 min-h-[4rem] md:min-h-[5rem] hover:bg-sky-50 ${today ? "bg-sky-50" : "bg-white"}`}>
                    <div className={`w-7 h-7 mx-auto flex items-center justify-center rounded-full text-sm font-medium ${today ? "bg-sky-600 text-white shadow" : "text-gray-700"}`}>
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

              {/* ── คอลัมน์ซ้าย ── */}
              <div className="w-full md:w-[45%] flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">

                  {/* พืชในฤดูกาล */}
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-square rounded-xl shadow-md border border-gray-200 mb-2 overflow-hidden bg-white">
                      <Image src={plantInfo.plantImg} alt="พืชในฤดูกาล" width={400} height={400} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-bold text-gray-700 text-center w-full truncate px-1">พืชในฤดูกาล</span>
                    <span className="text-xs text-gray-500 text-center">{plantInfo.plant}</span>
                  </div>

                  {/* ══ Slideshow ปุ๋ย ══ */}
                  <div className="flex flex-col items-center">
                    {selectedCrop && thumbSlide ? (
                      <>
                        <div
                          className="w-full aspect-square rounded-xl shadow-md border-2 border-green-200 mb-2 overflow-hidden relative group bg-white cursor-pointer"
                          onClick={() => { setModalIdx(thumbIdx); setModalOpen(true); }}
                        >
                          {/* รูปปุ๋ย — key บังคับ re-render เมื่อเปลี่ยน slide */}
                          <Image
                            key={`${selectedCrop}-${thumbIdx}`}
                            src={thumbSlide.product.image}
                            alt={thumbSlide.product.productName}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />

                          {/* hover overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center gap-1 pointer-events-none">
                            <span className="text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity drop-shadow px-2 text-center">🔍 ดูรายละเอียด</span>
                            <span className="text-white/80 text-xs opacity-0 group-hover:opacity-100 transition-opacity">กดเพื่อดูทุกสูตร</span>
                          </div>


                        </div>

                        <span className="text-xs font-bold text-[#007a33] text-center w-full px-1 line-clamp-2 leading-snug">
                          {thumbSlide.product.productName}
                        </span>
                        <span className="text-[10px] text-gray-400 text-center line-clamp-1 px-1">
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

                {/* Dropdown */}
                <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                  <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide text-center">เลือกพืชของคุณ</h4>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full bg-blue-50 text-blue-800 text-base font-bold py-2.5 px-3 rounded-lg border-2 border-transparent hover:border-blue-200 focus:border-blue-500 focus:ring-0 outline-none cursor-pointer transition"
                  >
                    <option value="" disabled>-- กรุณาเลือกพืช --</option>
                    {CROP_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* สูตรปุ๋ยเดือนนี้ */}
                <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex-1 flex flex-col justify-center">
                  <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide text-center">ควรใช้ปุ๋ยสูตรอะไร</h4>
                  {selectedCrop && monthFert ? (
                    <p className="text-base font-bold text-blue-700 bg-blue-50 py-3 px-2 rounded-lg break-words text-center">
                      {monthFert.fertText}
                    </p>
                  ) : (
                    <p className="text-sm font-medium text-gray-400 py-3 px-2 text-center">กรุณาเลือกพืชเพื่อดูคำแนะนำ</p>
                  )}
                </div>
              </div>

              {/* ── คอลัมน์ขวา: อัตราการใช้ ── */}
              <div className="w-full md:w-[55%] flex flex-col">
                {selectedCrop && usageData && usageData.length > 0 ? (
                  <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm text-left flex-1 flex flex-col">
                    <h4 className="text-sm font-bold text-green-700 mb-3 border-b border-green-100 pb-2 flex items-center gap-2">
                      📊 อัตราการใช้ปุ๋ยตามระยะ
                    </h4>
                    <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                      {usageData.map((d, idx) => (
                        <div key={idx} className="relative flex flex-col bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400 rounded-l-xl" />
                          <div className="flex flex-wrap items-center gap-2 mb-1 pl-2">
                            {d.badge && (
                              <span className="bg-orange-100 text-orange-700 border border-orange-200 px-2.5 py-0.5 rounded-md text-xs font-bold">
                                {d.badge}
                              </span>
                            )}
                            <span className="text-sm font-bold text-gray-800">{d.stage}</span>
                          </div>
                          <div className="flex justify-between items-end mt-2 pl-2 text-xs gap-2">
                            <span className="text-gray-600">สูตร: <span className="text-blue-600 font-bold">{d.formula}</span></span>
                            <span className="bg-green-100 text-green-800 border border-green-200 px-2 py-1 rounded-md font-bold whitespace-nowrap shadow-sm">{d.rate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-3 text-center">*อัตราการใช้ขึ้นอยู่กับอายุและความสมบูรณ์ของต้น</p>
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
        MODAL — ดูรายละเอียด + เลื่อนดูปุ๋ยทุกสูตร
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

          {/* รูปปุ๋ย + ลูกศร */}
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

            {/* counter */}
            {total > 1 && (
              <span className="absolute top-3 left-3 z-20 bg-black/50 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {modalIdx + 1} / {total}
              </span>
            )}

            {/* dots */}
            {total > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setModalIdx(i)}
                    className={`rounded-full transition-all duration-200 ${i === modalIdx ? "bg-[#007a33] w-5 h-2.5" : "bg-gray-400/70 w-2.5 h-2.5 hover:bg-gray-500"}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* รายละเอียด */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h2 className="text-xl font-bold text-[#007a33] leading-tight flex-1">{modalSlide.product.productName}</h2>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-sm text-gray-400 line-through">
                  ฿{modalSlide.product.oldPrice.toLocaleString()}
                </span>
                <span className="text-2xl font-black text-blue-800 whitespace-nowrap">
                  ฿{modalSlide.product.price.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-2 leading-relaxed">{modalSlide.product.description}</p>

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

            {/* thumbnail strip */}
            {total > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 pt-1 border-t border-gray-100">
                {slides.map((slide, i) => (
                  <button
                    key={i}
                    onClick={() => setModalIdx(i)}
                    title={slide.product.productName}
                    className={`flex-shrink-0 w-14 h-14 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                      i === modalIdx ? "border-[#007a33] scale-110 shadow-md" : "border-gray-200 opacity-55 hover:opacity-90"
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
