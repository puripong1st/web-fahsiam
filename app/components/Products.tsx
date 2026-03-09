"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { db } from "./lib/firebase";
import { collection, getDocs } from "firebase/firestore";

function cldThumb(src: string, w = 600, h = 450) {
  if (!src) return src;
  const needle = "/upload/";
  const i = src.indexOf(needle);
  if (i === -1) return src;
  const head = src.slice(0, i + needle.length);
  const tail = src.slice(i + needle.length);
  return `${head}f_auto,q_auto,c_fit,w_${w},h_${h}/${tail}`;
}

type Product = {
  id: string;
  name: string;
  price: number;
  img: string;
  badge?: "ใหม่" | "ฮิต" | "ลดราคา";
  status?: "published" | "draft";
  stock?: number;
  createdAt?: any;
  updatedAt?: any;
};

export default function Products() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const snap = await getDocs(collection(db, "products"));
        const rows: Product[] = snap.docs.map((d) => {
          const x = d.data() as any;
          return {
            id: d.id,
            name: x.name || "-",
            price: Number(x.price ?? 0),
            img: x.img || "",
            badge: x.badge,
            status: x.status,
            stock: typeof x.stock === "number" ? x.stock : undefined,
            createdAt: x.createdAt ?? null,
            updatedAt: x.updatedAt ?? null,
          };
        });

        const published = rows.filter(
          (p) => p.status === "published" && (typeof p.stock !== "number" || p.stock > 0)
        );

        setItems(published);
      } catch (e: any) {
        setErr(e?.message || "โหลดสินค้าไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const topEight = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      const ta = (a.updatedAt?.toMillis?.() ?? a.createdAt?.toMillis?.() ?? 0) as number;
      const tb = (b.updatedAt?.toMillis?.() ?? b.createdAt?.toMillis?.() ?? 0) as number;
      if (tb !== ta) return tb - ta;
      return (b.name || "").localeCompare(a.name || "", "th");
    });
    return sorted.slice(0, 8);
  }, [items]);

  return (
    <section className="py-16" id="products">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
          <div>
            <p className="text-sky-700 font-medium">สินค้าแนะนำ</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">ผลิตภัณฑ์ยอดนิยม</h2>
            <p className="text-gray-600 text-sm mt-1">คุณภาพคัดสรร เหมาะกับการเกษตรทุกรูปแบบ</p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center rounded-xl border px-5 py-2.5 font-semibold text-sky-700 hover:bg-sky-50"
          >
            ดูทั้งหมด →
          </Link>
        </div>

        {err && (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
            {err}
          </div>
        )}
        {loading && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="aspect-[4/3] w-full bg-gray-100 animate-pulse rounded-lg" />
                <div className="h-4 w-3/4 bg-gray-100 animate-pulse rounded mt-3" />
                <div className="h-4 w-1/2 bg-gray-100 animate-pulse rounded mt-2" />
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-5">
            {topEight.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="group relative overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm hover:shadow-lg transition"
              >
                <div className="relative">
                  <div className="aspect-[4/3] w-full bg-white">
                    <img
                      src={cldThumb(p.img || "/image/Product/placeholder.png")}
                      alt={p.name}
                      className="h-full w-full object-contain p-4 transition group-hover:scale-[1.02]"
                      onError={(e) => (e.currentTarget.src = "/image/Product/placeholder.png")}
                    />
                  </div>
                  {p.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-sky-600/90 px-3 py-1 text-xs font-semibold text-white">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">{p.name}</h3>
                  <div className="mt-2 text-sky-700 font-bold">฿{p.price.toLocaleString()}</div>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="mt-3 w-full rounded-lg bg-sky-600 py-2 text-white text-sm font-semibold hover:bg-sky-700"
                  >
                    เพิ่มลงตะกร้า
                  </button>
                </div>
              </Link>
            ))}

            {!err && topEight.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-12">
                ยังไม่มีสินค้าที่เผยแพร่
              </div>
            )}
          </div>
        )}

        <div className="mt-8 rounded-2xl overflow-hidden border border-gray-300 bg-gradient-to-br from-sky-600 to-emerald-500 text-white">
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-extrabold">โปรต้นฤดูกาล: ซื้อครบ 1,500 ส่งฟรี</h3>
              <p className="mt-1 text-white/90 text-sm">เฉพาะเดือนนี้เท่านั้น</p>
              <Link
                href="/promo"
                className="mt-4 inline-flex items-center rounded-xl bg-white px-5 py-3 font-semibold text-sky-700 hover:bg-white/90"
              >
                ดูโปรโมชัน →
              </Link>
            </div>
            <div className="h-40 md:h-full">
              <img src="/image/Test/p1.png" alt="promo" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}