// src/data/calendarData.ts
// ไฟล์นี้เก็บข้อมูลทั้งหมดของ CalendarWidget
// Calendar.tsx จะ import เฉพาะ types และ constants จากที่นี่

import { MOCK_PRODUCTS } from "./productsdetail";

// ═══════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════

export type ProductInfo = {
  productId: string;
  productName: string;
  description: string;
  price: number;
  oldPrice: number;
  image: string;
};

export type FertSlide = {
  fertText: string;
  product: ProductInfo;
};

export type MonthlyFert = {
  fertText: string;
  fertImg: string;
};

export type UsageDetail = {
  badge: string;
  stage: string;
  formula: string;
  rate: string;
};

export type MonthlyPlant = {
  month: number;
  plant: string;
  plantImg: string;
};

// ═══════════════════════════════════════════════
// 1. ข้อมูลสินค้าปุ๋ย — แปลงจาก MOCK_PRODUCTS
// ═══════════════════════════════════════════════

export const FERTILIZER_PRODUCTS: ProductInfo[] = MOCK_PRODUCTS.map((p) => ({
  productId: p.id,
  productName: p.name,
  description: p.benefits[0] ?? "",
  price: p.price,
  oldPrice: p.oldPrice ?? p.price,
  image: p.image,
}));

// shorthand ดึงด้วย id
const fp = (id: string): ProductInfo =>
  FERTILIZER_PRODUCTS.find((p) => p.productId === id)!;

const P = {
  "12-3-5": fp("p1"),
  "3-6-15": fp("p2"),
  "0-0-30": fp("p3"),
  "OM25":   fp("p4"),
  "OM20":   fp("p5"),
  "6-3-3":  fp("p6"),
};

// ═══════════════════════════════════════════════
// 2. พืชในฤดูกาลแต่ละเดือน
// ═══════════════════════════════════════════════

export const MONTHLY_PLANTS: MonthlyPlant[] = [
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

// ═══════════════════════════════════════════════
// 3. รายชื่อพืชใน Dropdown
// ═══════════════════════════════════════════════

export const CROP_OPTIONS: string[] = [
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

// ═══════════════════════════════════════════════
// 4. Slides ปุ๋ยแยกตามพืช (ใช้ใน Slideshow + Modal)
// ═══════════════════════════════════════════════

export const CROP_FERT_SLIDES: Record<string, FertSlide[]> = {
  "กาแฟ": [
    { fertText: "เตรียมดิน / รองก้นหลุมก่อนปลูก",    product: P["OM25"]   },
    { fertText: "เตรียมดิน / รองก้นหลุม (ชนิดเม็ด)",  product: P["OM20"]   },
    { fertText: "เร่งต้น บำรุงต้นและใบ",               product: P["6-3-3"]  },
    { fertText: "เร่งต้น บำรุงต้นและใบ",               product: P["12-3-5"]  },
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
    { fertText: "เร่งต้น บำรุงใบ (ครั้งที่ 1)",          product: P["12-3-5"]  },
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


// ═══════════════════════════════════════════════
// 5. ปุ๋ยที่แนะนำประจำเดือน
// ═══════════════════════════════════════════════

export const CROP_FERTILIZER_DATA: Record<string, MonthlyFert[]> = {
  "กาแฟ": Array(12).fill({ fertText: "ปุ๋ยอินทรีย์เคมี 6-3-3 (บำรุงต้นและใบ)", fertImg: P["6-3-3"].image }),
  "ทุเรียน (ยังไม่ให้ผลผลิต) 0-1 ปี": Array(12).fill({ fertText: "ปุ๋ยอินทรีย์ผง OM 25% (บำรุงต้นอ่อน/ฟื้นฟูดิน)", fertImg: P["OM25"].image }),
  "ทุเรียน (ยังไม่ให้ผลผลิต) 2-3 ปี": Array(12).fill({ fertText: "ปุ๋ยอินทรีย์เคมี 12-3-5 (เร่งการเจริญเติบโต ดึงใบ)", fertImg: P["12-3-5"].image }),
  "ทุเรียน (ให้ผลผลิต)": [
    { fertText: "3-6-15 (สะสมอาหาร บำรุงตาดอก)",   fertImg: P["3-6-15"].image },
    { fertText: "3-6-15 (สะสมอาหาร บำรุงตาดอก)",   fertImg: P["3-6-15"].image },
    { fertText: "3-6-15 (บำรุงผล)",                 fertImg: P["3-6-15"].image },
    { fertText: "0-0-30 (ขยายผล สร้างเนื้อ)",       fertImg: P["0-0-30"].image },
    { fertText: "0-0-30 (เพิ่มความหวาน น้ำหนัก)",   fertImg: P["0-0-30"].image },
    { fertText: "OM เม็ด (ฟื้นต้นหลังเก็บเกี่ยว)", fertImg: P["OM20"].image   },
    { fertText: "OM เม็ด (ฟื้นต้น บำรุงดิน)",       fertImg: P["OM20"].image   },
    { fertText: "12-3-5 (บำรุงต้น ดึงใบอ่อน)",      fertImg: P["12-3-5"].image },
    { fertText: "12-3-5 (บำรุงต้น ดึงใบอ่อน)",      fertImg: P["12-3-5"].image },
    { fertText: "6-3-3 (บำรุงต้น สะสมอาหาร)",       fertImg: P["6-3-3"].image  },
    { fertText: "3-6-15 (สะสมอาหาร สร้างตาดอก)",    fertImg: P["3-6-15"].image },
    { fertText: "3-6-15 (สะสมอาหาร สร้างตาดอก)",    fertImg: P["3-6-15"].image },
  ],
  "ปาล์มน้ำมัน เริ่มปลูก":             Array(12).fill({ fertText: "OM เม็ด (รองก้นหลุม บำรุงราก)", fertImg: P["OM20"].image   }),
  "ปาล์มน้ำมัน ตั้งแต่ ปี 4 ปีต้นไป": Array(12).fill({ fertText: "3-6-15 (บำรุงผล เพิ่มทะลาย)",  fertImg: P["3-6-15"].image }),
  "ยาสูบ":                              Array(12).fill({ fertText: "12-3-5 (บำรุงใบ)",              fertImg: P["12-3-5"].image }),
  "ยางพาราเริ่มปลูก":                  Array(12).fill({ fertText: "6-3-3 (บำรุงรากและลำต้น)",     fertImg: P["6-3-3"].image  }),
  "ยางพาราเริ่มกรีด 7 ปี ขึ้นไป":     Array(12).fill({ fertText: "12-3-5 (บำรุงต้น เพิ่มน้ำยาง)", fertImg: P["12-3-5"].image }),
};

// ═══════════════════════════════════════════════
// 6. อัตราการใช้ปุ๋ยตามระยะ
// ═══════════════════════════════════════════════

export const CROP_USAGE_DETAILS: Record<string, UsageDetail[]> = {
  "กาแฟ": [
    { badge: "ก่อนปลูก",   stage: "เตรียมดิน",             formula: "OM 25% และ OM 20%", rate: "50-100 กรัม/ต้น"  },
    { badge: "ครั้งที่ 1", stage: "เร่งต้น",               formula: "6-3-3 หรือ 12-3-5", rate: "200-400 กรัม/ต้น" },
    { badge: "ครั้งที่ 2", stage: "บำรุงดอก บำรุงผลผลิต", formula: "3-6-15",            rate: "600-800 กรัม/ต้น" },
  ],
  "ทุเรียน (ยังไม่ให้ผลผลิต) 0-1 ปี": [
    { badge: "อายุ 0-1 ปี", stage: "เตรียมดินก่อนปลูก", formula: "OM 25% และ OM 20%", rate: "50-100 กรัม/ต้น"  },
    { badge: "อายุ 0-1 ปี", stage: "ต้นตั้งตัว",        formula: "6-3-3",             rate: "50-100 กรัม/ต้น"  },
    { badge: "อายุ 1-2 ปี", stage: "เตรียมดิน",         formula: "OM 25% และ OM 20%", rate: "100-200 กรัม/ต้น" },
    { badge: "อายุ 1-2 ปี", stage: "เร่งต้น บำรุงใบ",   formula: "6-3-3",             rate: "100-200 กรัม/ต้น" },
  ],
  "ทุเรียน (ยังไม่ให้ผลผลิต) 2-3 ปี": [
    { badge: "อายุ 2-3 ปี", stage: "ปรับดิน",                    formula: "OM 25% และ OM 20%", rate: "200-300 กรัม/ต้น" },
    { badge: "อายุ 2-3 ปี", stage: "บำรุงใบขยายทรงพุ่ม",         formula: "6-3-3",             rate: "300-500 กรัม/ต้น" },
    { badge: "อายุ 3-4 ปี", stage: "ปรับดิน",                    formula: "OM 25% และ OM 20%", rate: "100-200 กรัม/ต้น" },
    { badge: "อายุ 3-4 ปี", stage: "เร่งต้น บำรุงใบ ขยายพุ่ม",  formula: "12-3-5",            rate: "100-200 กรัม/ต้น" },
  ],
  "ทุเรียน (ให้ผลผลิต)": [
    { badge: "หลังเก็บเกี่ยว", stage: "ฟื้นฟูสภาพต้น บำรุงดิน",   formula: "OM 25% และ OM 20%", rate: "1-2 กก./ต้น" },
    { badge: "ระยะทำใบ",       stage: "บำรุงต้น-บำรุงใบ",          formula: "6-3-3 และ 12-3-5",  rate: "1-3 กก./ต้น" },
    { badge: "ก่อนออกดอก",     stage: "สะสมอาหาร",                 formula: "3-6-15",            rate: "1-3 กก./ต้น" },
    { badge: "ติดผล",           stage: "บำรุงลูก (ไข่ไก่-ผลกลาง)", formula: "3-6-15",            rate: "1-2 กก./ต้น" },
    { badge: "ใกล้เก็บเกี่ยว", stage: "ระยะเบ่งพู",                formula: "0-0-30",            rate: "1-3 กก./ต้น" },
  ],
  "ปาล์มน้ำมัน เริ่มปลูก": [
    { badge: "ก่อนปลูก", stage: "เตรียมดิน",               formula: "OM 25% และ OM 20%",  rate: "100-200 กรัม/ต้น" },
    { badge: "ปีที่ 1",   stage: "ปาล์มเล็ก (สลับ 2 สูตร)", formula: "6-3-3 สลับ 12-3-5", rate: "1.5-2 กก./ต้น/ปี" },
    { badge: "ปีที่ 2",   stage: "ปาล์มเล็ก (สลับ 2 สูตร)", formula: "6-3-3 สลับ 12-3-5", rate: "3.5-4 กก./ต้น/ปี" },
    { badge: "ปีที่ 3",   stage: "ปาล์มเล็ก (สลับ 2 สูตร)", formula: "6-3-3 สลับ 12-3-5", rate: "5.5-6 กก./ต้น/ปี" },
  ],
  "ปาล์มน้ำมัน ตั้งแต่ ปี 4 ปีต้นไป": [
    { badge: "ปีที่ 4",        stage: "สลับ 2 สูตร", formula: "12-3-5 สลับ 3-6-15",  rate: "6.5-7 กก./ต้น/ปี" },
    { badge: "ปีที่ 5 ขึ้นไป", stage: "ปาล์มใหญ่",   formula: "3-6-15 หรือ 0-0-30", rate: "1.5-2 กก./ต้น/ปี" },
  ],
  "ยาสูบ": [
    { badge: "ก่อนปลูก",   stage: "เตรียมดิน",           formula: "OM 25% และ OM 20%", rate: "50 กก./ไร่" },
    { badge: "ครั้งที่ 1", stage: "เร่งต้น",             formula: "6-3-3 หรือ 12-3-5", rate: "50 กก./ไร่" },
    { badge: "ครั้งที่ 2", stage: "บำรุงดอก เพิ่มกลิ่น", formula: "3-6-15",            rate: "50 กก./ไร่" },
  ],
  "ยางพาราเริ่มปลูก": [
    { badge: "ก่อนปลูก",  stage: "เตรียมดิน", formula: "OM 25% และ OM 20%",  rate: "50-100 กรัม/ต้น"     },
    { badge: "ปีที่ 1",    stage: "สลับกัน",   formula: "6-3-3 สลับ 12-3-5", rate: "400-500 กรัม/ต้น/ปี" },
    { badge: "ปีที่ 2-4",  stage: "สลับกัน",   formula: "6-3-3 สลับ 12-3-5", rate: "600-700 กรัม/ต้น/ปี" },
    { badge: "ปีที่ 5-6",  stage: "สลับกัน",   formula: "6-3-3 สลับ 12-3-5", rate: "700-800 กรัม/ต้น/ปี" },
  ],
  "ยางพาราเริ่มกรีด 7 ปี ขึ้นไป": [
    { badge: "ปีที่ 7 ขึ้นไป", stage: "ใช้เดี่ยว",  formula: "12-3-5",             rate: "1.5-2 กก./ต้น/ปี" },
    { badge: "ปีที่ 7 ขึ้นไป", stage: "ใช้ผสม 1:1", formula: "12-3-5 ผสม 3-6-15", rate: "1.5-2 กก./ต้น/ปี" },
  ],
};

// ═══════════════════════════════════════════════
// 7. วันในสัปดาห์ (ภาษาไทย)
// ═══════════════════════════════════════════════

export const DAYS_OF_WEEK: string[] = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
