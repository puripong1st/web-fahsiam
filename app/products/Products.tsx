"use client"; // จำเป็นต้องมีสำหรับ Next.js

import { useEffect, useMemo, useState } from "react";
// 1. แก้ไข Import Link มาใช้ของ Next.js
import Link from "next/link"; 
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

/* ✅ ย่อภาพ Cloudinary อัตโนมัติ */
function cldThumb(src: string, w = 600, h = 450) {
  if (!src) return src;
  const needle = "/upload/";
  const i = src.indexOf(needle);
  if (i === -1) return src; // ไม่ใช่ลิงก์ Cloudinary
  const head = src.slice(0, i + needle.length);
  const tail = src.slice(i + needle.length);
  return `${head}f_auto,q_auto,c_fit,w_${w},h_${h}/${tail}`;
}

type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  badge?: "ใหม่" | "ฮิต" | "ลดราคา";
  image: string;   // มาจาก img(Firestore)
  category: string;
  sku?: string;
  stock?: number;
  status?: "published" | "draft";
  createdAt?: any;
  updatedAt?: any;
};

const CATEGORIES = ["ทั้งหมด", "ปุ๋ย", "เมล็ดพันธุ์", "อุปกรณ์"] as const;
type Cat = typeof CATEGORIES[number];

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  // ✅ เอา state + setter กลับมา เพื่อใช้กับคอนโทรลบนหน้า
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Cat>("ทั้งหมด");
  const [sortBy, setSortBy] = useState<"new" | "priceAsc" | "priceDesc">("new");

  // ⬆️ ด้านบนไฟล์
  const norm = (s: string = "") =>
    s.normalize("NFC").replace(/\s+/g, " ").trim().toLowerCase();

  // 2. ✅ แก้ไขรูปแบบ useEffect และการ fetch ข้อมูลให้ถูกต้อง
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, "products"));
        const rows: Product[] = snap.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: d.id,
            name: data.name || "-",
            price: Number(data.price ?? 0),
            oldPrice: data.oldPrice ? Number(data.oldPrice) : undefined,
            badge: data.badge,
            image: data.img || "",                     // <= ใช้ img จาก Firestore
            category: data.category || "อื่น ๆ",
            sku: data.sku,
            stock: typeof data.stock === "number" ? data.stock : undefined,
            status: data.status,
            createdAt: data.createdAt ?? null,
            updatedAt: data.updatedAt ?? null,
          };
        });
        
        const published = rows.filter(
          (p) => p.status === "published" && (typeof p.stock !== "number" || p.stock > 0)
        );
        setProducts(published);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    let arr = [...products];

    // filter by category
    if (cat !== "ทั้งหมด") {
      const want = norm(cat);
      arr = arr.filter((p) => norm(p.category) === want);
    }
    // search
    if (q.trim()) {
      const k = q.toLowerCase();
      arr = arr.filter((p) => p.name.toLowerCase().includes(k));
    }
    // sort
    if (sortBy === "priceAsc") arr.sort((a, b) => a.price - b.price);
    if (sortBy === "priceDesc") arr.sort((a, b) => b.price - a.price);
    if (sortBy === "new") {
      arr.sort((a, b) => {
        const ta = (a.updatedAt?.toMillis?.() ?? a.createdAt?.toMillis?.() ?? 0) as number;
        const tb = (b.updatedAt?.toMillis?.() ?? b.createdAt?.toMillis?.() ?? 0) as number;
        if (tb !== ta) return tb - ta;
        return (b.name || "").localeCompare(a.name || "", "th");
      });
    }

    return arr;
  }, [products, q, cat, sortBy]);

  return (
    <section className="bg-gradient-to-b from-white via-sky-50/30 to-white" id="products">
      <section className="relative">
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img src="/background/background1.png" alt="ข่าวสาร" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-x-0 bottom-6 md:bottom-10">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow">
              ผลิตภัณฑ์ของเรา
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              สินค้าเกษตร เทคโนโลยี 
            </p>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 mt-6 mb-12">
        
        {/* ✅ HERO SECTION (ภาพ + ข้อความบนสุด) */}
        <div className="relative overflow-hidden bg-white">
          <div className="grid md:grid-cols-2">
            <div className="">
              <p className="text-sky-700 font-medium">สินค้าแนะนำ</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                ผลิตภัณฑ์ยอดนิยมของเรา
              </h2>
              <p className="mt-2 text-gray-600">
                คุณภาพคัดสรร เหมาะกับการเกษตรทุกรูปแบบ พร้อมโปรโมชันพิเศษ
              </p>

              {/* Controls */}
              <div className="mt-5 flex flex-col sm:flex-row gap-2 sm:items-center">
                <div className="flex rounded-lg border border-gray-300 bg-white px-3 py-2">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="ค้นหาสินค้า…"
                    className="w-56 md:w-64 outline-none text-sm"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                >
                  <option value="new">เรียง: มาใหม่</option>
                  <option value="priceAsc">ราคาต่ำ → สูง</option>
                  <option value="priceDesc">ราคาสูง → ต่ำ</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Category Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm border transition
                ${cat === c ? "bg-sky-600 text-white border-sky-600" : "bg-white hover:bg-sky-50 border-gray-300 text-gray-700"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* ✅ Grid สินค้า */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">
              ยังไม่มีสินค้าที่เผยแพร่หรือสินค้าหมดสต็อก
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ===== Card component ===== */
function ProductCard({ p }: { p: Product }) {
  const hasDiscount = p.oldPrice && p.oldPrice > p.price;

  return (
    // 3. ✅ เปลี่ยน to เป็น href ทั้ง 2 จุด
    <Link
      href={`/product/${p.id}`}   // ไปหน้ารายละเอียดตาม id
      className="group relative overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm hover:shadow-lg transition block"
    >
      {/* image with ratio */}
      <div className="relative">
        <div className="aspect-[4/3] w-full bg-white">
          <img
            src={cldThumb(p.image || "/image/Product/placeholder.png")}
            alt={p.name}
            className="h-full w-full object-contain p-4 transition group-hover:scale-[1.03]"
            onError={(e) => (e.currentTarget.src = "/image/Product/placeholder.png")}
          />
        </div>

        {/* badges */}
        {p.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-sky-600/90 px-3 py-1 text-xs font-semibold text-white">
            {p.badge}
          </span>
        )}
        {hasDiscount && (
          <span className="absolute right-3 top-3 rounded-full bg-rose-600/90 px-3 py-1 text-xs font-semibold text-white">
            ลดราคา
          </span>
        )}
      </div>

      {/* body */}
      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">{p.name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sky-700 font-bold">฿{p.price.toLocaleString()}</span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">฿{p.oldPrice!.toLocaleString()}</span>
          )}
        </div>
        
        {/* เลื่อนลิงก์ดูเพิ่มเติมลงมาเพื่อให้จัดวางสวยงามขึ้น */}
        <div className="mt-1 text-right">
             <span className="text-sky-700 text-xs hover:underline">
                ดูข้อมูลเพิ่มเติม
            </span>
        </div>

        <div className="mt-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              // TODO: เพิ่มลงตะกร้า
              alert(`เพิ่ม "${p.name}" ลงตะกร้าแล้ว (ตัวอย่าง)`);
            }}
            className="w-full rounded-lg bg-sky-600 py-2 text-white text-sm font-semibold hover:bg-sky-700 cursor-pointer"
          >
            ติดต่อทีมขาย
          </button>
        </div>
      </div>
    </Link>
  );
}