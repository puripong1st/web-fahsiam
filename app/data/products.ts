// src/data/products.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  badge?: "ใหม่" | "ฮิต" | "ลดราคา";
  image: string;
  category: string;
};

export const MOCK_PRODUCTS: Product[] = [
  { id: "p1", name: "ปุ๋ยอินทรีย์เคมี 12 - 3 - 5", price: 1290, oldPrice: 1590, image: "/image/Fertilizer/1.jpg", category: "ปุ๋ย" },
  // ... ก๊อปปี้ข้อมูลทั้งหมดมาวางที่นี่
];