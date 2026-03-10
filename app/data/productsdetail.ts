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
  { id: "p2", name: "ปุ๋ยอินทรีย์เคมี 12 - 6 - 15", price: 1390, oldPrice: 1590, image: "/image/Fertilizer/2.jpg", category: "ปุ๋ย"},
  { id: "p3", name: "ปุ๋ยเคมี 0 - 0 - 30", price: 1390, oldPrice: 1590, image: "/image/Fertilizer/3.jpg", category: "ปุ๋ย" },
  { id: "p4", name: "ปุ๋ยอินทรีย์ผง MO 25 %", price: 690, oldPrice: 790, image: "/image/Fertilizer/4.jpg", category: "ปุ๋ย",},
  { id: "p5", name: "ปุ๋ยอินทรีย์เม็ด MO 20 %", price: 790, oldPrice: 890, image: "/image/Fertilizer/5.jpg", category: "ปุ๋ย" },
  { id: "p6", name: "ปุ๋ยอินทรีเคมี 6 - 3 - 3", price: 1090, oldPrice: 1390, image: "/image/Fertilizer/6.jpg", category: "ปุ๋ย" },
  
];