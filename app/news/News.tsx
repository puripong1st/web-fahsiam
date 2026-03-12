// src/pages/NewsPage.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
// จุดที่แก้ไขที่ 1: เปลี่ยนจาก react-router-dom เป็น next/link
import Link from "next/link"; 
import { db } from "../lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Image from 'next/image'

type NewsItem = {
  id: string;
  title: string;
  date?: string;           
  publishedAt?: unknown;   // ✅ แก้ไขที่ 1: เปลี่ยนจาก any เป็น unknown
  cover: string;           
  image?: string;          
  summary: string;
  link: string;            
  status?: "published" | "draft";
  featured?: boolean;
  category?: string;
  tags?: string[];
  author?: string;
};

// ✅ สร้าง Interface สำหรับข้อมูลที่ดึงจาก Firestore เพื่อแทนที่ any
interface NewsDoc {
  title?: string;
  cover?: string;
  publishedAt?: unknown;
  date?: unknown;
  slug?: string;
  summary?: string;
  status?: string;
  featured?: boolean;
  category?: string;
  tags?: string[];
  author?: string;
}

const PER_PAGE = 6;

/* ---------- utils ---------- */
// ✅ แก้ไขที่ 2: เปลี่ยน v: any เป็น v: unknown และเช็ค Type ภายในให้ปลอดภัย
function toISODate(v: unknown): string | undefined {
  if (!v) return undefined;
  
  // Firestore Timestamp
  if (typeof v === "object" && v !== null && "toDate" in v) {
    const ts = v as { toDate: () => Date };
    if (typeof ts.toDate === "function") {
      try {
        return ts.toDate().toISOString().slice(0, 10);
      } catch {
        return undefined;
      }
    }
  }
  
  // string หรืออย่างอื่นที่แปลงเป็น Date ได้
  if (typeof v === "string") {
    if (/^\d{4}-\d{2}-\d{2}/.test(v)) return v.slice(0, 10);
    const d = new Date(v);
    if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }
  return undefined;
}

function formatTHDate(iso?: string) {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
}

function estimateReadingMins(text: string, wpm = 220) {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wpm));
}

export default function NewsPage() {
  const [loading, setLoading] = useState(true);
  const [listAll, setListAll] = useState<NewsItem[]>([]);
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState<"new" | "old">("new");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>("ทั้งหมด");

  // โหลดข่าวจาก Firestore: newspro
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const qy = query(collection(db, "newspro"), orderBy("publishedAt", "desc"));
        const snap = await getDocs(qy);

        const rows: NewsItem[] = snap.docs.map((d) => {
          // ✅ แก้ไขที่ 3: ใช้ Interface NewsDoc ที่สร้างไว้ แทนคำว่า any
          const x = d.data() as NewsDoc;

          // รูป: ถ้าเป็นชื่อไฟล์ธรรมดา ให้ชี้ไปที่ /image/news/<name>
          const rawCover = String(x.cover || "");
          const cover =
            !rawCover
              ? "/image/news/placeholder.jpg"
              : rawCover.startsWith("http") || rawCover.startsWith("/")
              ? rawCover
              : `/image/news/${rawCover}`;

          // วันที่
          const dateISO = toISODate(x.publishedAt) || toISODate(x.date) || "";

          // ลิงก์หน้าอ่านละเอียด (เปลี่ยนเป็น slug ได้ถ้ามี)
          const link = x.slug ? `/news/${x.slug}` : `/news/${d.id}`;

          return {
            id: d.id,
            title: x.title || "-",
            publishedAt: x.publishedAt,
            date: dateISO,
            cover: rawCover || "/image/news/placeholder.jpg",
            image: cover,
            summary: x.summary || "",
            link,
            // ✅ แก้ไขที่ 4: ระบุ Type ให้ชัดเจนแทน any
            status: x.status as "published" | "draft" | undefined,
            featured: Boolean(x.featured),
            category: x.category || "ทั่วไป",
            tags: Array.isArray(x.tags) ? x.tags : [],
            author: x.author || "",
          };
        });

        // โชว์เฉพาะที่เผยแพร่
        const published = rows.filter((n) => n.status === "published");
        setListAll(published);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // หมวดหมู่จากข้อมูลจริง
  const categories = useMemo(() => {
    const s = new Set<string>(["ทั้งหมด"]);
    listAll.forEach((n) => n.category && s.add(n.category));
    return Array.from(s);
  }, [listAll]);

  // คัด/เรียง/ค้นหา
  const list = useMemo(() => {
    let data = [...listAll];

    if (category !== "ทั้งหมด") {
      data = data.filter((n) => n.category === category);
    }

    data.sort((a, b) => {
      const ta = +(a.date ? new Date(a.date) : 0);
      const tb = +(b.date ? new Date(b.date) : 0);
      return sortBy === "new" ? tb - ta : ta - tb;
    });

    if (q.trim()) {
      const k = q.toLowerCase();
      data = data.filter(
        (n) =>
          n.title.toLowerCase().includes(k) ||
          n.summary.toLowerCase().includes(k) ||
          (n.category || "").toLowerCase().includes(k) ||
          (n.tags || []).some((t) => t.toLowerCase().includes(k))
      );
    }
    return data;
  }, [listAll, q, sortBy, category]);

  // ข่าวเด่น (ถ้ามี) ไม่งั้นหยิบตัวแรก
  const featured = list.find((n) => n.featured) || list[0] || undefined;

  // ที่เหลือนอกเหนือ featured
  const rest = useMemo(() => {
    if (!featured) return list;
    return list.filter((n) => n.id !== featured.id);
  }, [list, featured]);

  // หน้าปัจจุบัน (แบบ load more)
  const pageItems = rest.slice(0, page * PER_PAGE);

  return (
    <div className="bg-gradient-to-b from-white via-sky-50/30 to-white">
      {/* HERO */}
      <section className="relative">
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image src="/background/background1.webp" alt="ข่าวสาร" fill sizes="100vw" className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-x-0 bottom-6 md:bottom-10">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow">
              ข่าวสารและบทความ
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              อัปเดตความรู้เกษตร เทคนิค และเทคโนโลยีล่าสุด
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid md:grid-cols-12 gap-8">
        {/* left / main */}
        <div className="md:col-span-8 space-y-8">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2">
              <svg width="18" height="18" viewBox="0 0 24 24" className="text-gray-400">
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zM4 9.5C4 6.46 6.46 4 9.5 4S15 6.46 15 9.5S12.54 15 9.5 15S4 12.54 4 9.5"
                />
              </svg>
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="ค้นหาข่าว/บทความ..."
                className="w-64 md:w-80 outline-none text-sm"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    หมวด: {c}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                // ✅ แก้ไขที่ 5: บังคับ Type ให้ตรงกับที่ State ต้องการ
                onChange={(e) => setSortBy(e.target.value as "new" | "old")}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
              >
                <option value="new">เรียงจากใหม่ไปเก่า</option>
                <option value="old">เรียงจากเก่าไปใหม่</option>
              </select>
            </div>
          </div>

          {/* Featured card */}
          {loading ? (
            <SkeletonFeatured />
          ) : featured ? (
            <Link
              href={featured.link} 
              className="group block overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm hover:shadow-lg transition"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative">
                  <div className="relative aspect-[16/10] md:aspect-[4/3] w-full">
                   <Image
                      src={featured.image || featured.cover}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition group-hover:scale-[1.02]"
                    />
                  </div>
                  <span className="absolute left-3 top-3 rounded-full bg-sky-600/90 px-3 py-1 text-xs font-semibold text-white">
                    ข่าวเด่น
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <p className="text-gray-400 text-xs md:text-sm">
                    {formatTHDate(featured.date)}
                  </p>
                  <h3 className="mt-1 text-xl md:text-2xl font-bold text-sky-700">
                    {featured.title}
                  </h3>
                  <p className="mt-2 text-gray-700 line-clamp-3">{featured.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sky-600 font-semibold">
                    อ่านต่อ →
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <div className="rounded-2xl border border-gray-300 bg-white p-8 text-center text-gray-600">
              ยังไม่มีข่าวเผยแพร่
            </div>
          )}

          {/* Grid of news */}
          <div className="grid sm:grid-cols-2 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              : pageItems.map((news) => <NewsCard key={news.id} item={news} />)}
          </div>

          {/* Load more */}
          {!loading && pageItems.length < rest.length && (
            <div className="text-center">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="rounded-xl border border-gray-300 px-5 py-2.5 font-semibold text-sky-700 hover:bg-sky-50"
              >
                โหลดเพิ่มเติม
              </button>
            </div>
          )}

          {/* Empty state ค้นหาไม่เจอ */}
          {!loading && list.length === 0 && (
            <div className="rounded-2xl border border-gray-300 bg-white p-8 text-center text-gray-600">
              ไม่พบผลลัพธ์ที่ค้นหา
            </div>
          )}
        </div>

        {/* right / sidebar */}
        <aside className="md:col-span-4 space-y-6">
          <div className="rounded-2xl border border-gray-300 bg-white p-5 shadow-sm">
            <h4 className="font-bold text-gray-900">ล่าสุด</h4>
            <ul className="mt-3 space-y-3">
              {(loading ? [] : [...list]).slice(0, 5).map((n) => (
                <li key={n.id} className="flex gap-3">
                  <Link href={n.link} className="shrink-0 w-16 h-16 rounded-lg overflow-hidden"> 
                    <Image
                      src={n.image || n.cover}
                      alt={n.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div>
                    <Link href={n.link} className="line-clamp-2 font-medium hover:underline"> 
                      {n.title}
                    </Link>
                    <p className="text-xs text-gray-500">{formatTHDate(n.date)}</p>
                  </div>
                </li>
              ))}
              {loading && <li className="text-sm text-gray-400">กำลังโหลด…</li>}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-300 bg-gradient-to-br from-sky-600 to-cyan-500 p-6 text-white">
            <h4 className="font-bold text-lg">สมัครรับข่าวสาร</h4>
            <p className="text-white/90 text-sm mt-1">
              อัปเดตเทคนิคเกษตร เทคโนโลยี และโปรโมชั่นก่อนใคร
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="อีเมลของคุณ"
                className="flex-1 rounded-lg px-3 py-2 text-sky-900 placeholder:text-sky-400 outline-none bg-white"
                required
              />
              <button className="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-white hover:bg-emerald-600">
                สมัคร
              </button>
            </form>
          </div>
        </aside>
      </main>
    </div>
  );
}

/* ===== Components ===== */
function NewsCard({ item }: { item: NewsItem }) {
  const reading = estimateReadingMins(item.summary);
  return (
    <Link
      href={item.link} 
      className="group block overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm hover:shadow-lg transition"
    >
      <div className="relative">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={item.image || item.cover}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition group-hover:scale-[1.02]"
          />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-sky-700">
          {formatTHDate(item.date)}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2">{item.title}</h3>
        <p className="mt-1 text-gray-600 text-sm line-clamp-2">{item.summary}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>อ่าน ~ {reading} นาที</span>
          <span className="text-sky-600 font-semibold">อ่านต่อ →</span>
        </div>
      </div>
    </Link>
  );
}

/* ===== Skeletons ===== */
function SkeletonFeatured() {
  return (
    <div className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="aspect-[16/10] md:aspect-[4/3] w-full bg-gray-100 animate-pulse" />
      <div className="p-6 space-y-3">
        <div className="h-3 w-24 bg-gray-100 animate-pulse rounded" />
        <div className="h-6 w-3/4 bg-gray-100 animate-pulse rounded" />
        <div className="h-4 w-full bg-gray-100 animate-pulse rounded" />
        <div className="h-4 w-5/6 bg-gray-100 animate-pulse rounded" />
      </div>
    </div>
  );
}
function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="aspect-[16/10] bg-gray-100 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-5 w-3/4 bg-gray-100 animate-pulse rounded" />
        <div className="h-4 w-full bg-gray-100 animate-pulse rounded" />
      </div>
    </div>
  );
}