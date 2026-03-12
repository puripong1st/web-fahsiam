// src/hooks/useWeeklySales.ts
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot, query, where, Timestamp } from "firebase/firestore";

export type DaySale = { day: string; sales: number };

// ✅ สร้าง Type มารองรับข้อมูล Order แทน any
interface OrderDoc {
  createdAt?: Timestamp;
  amount?: number | string;
}

function fmtYMD(d: Date) {
  return d.toISOString().slice(0,10); // YYYY-MM-DD (UTC) — ถ้าอยากตามโซนไทยให้ใช้ lib dayjs/tz
}
function thShortDay(d: Date) {
  return d.toLocaleDateString("th-TH", { weekday: "short" }); // จ., อ., ...
}

export function useWeeklySales() {
  const [data, setData] = useState<DaySale[]>([]);

  useEffect(() => {
    // ช่วง 7 วันย้อนหลัง (รวมวันนี้)
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6);
    start.setHours(0,0,0,0);

    const qy = query(
      collection(db, "orders"),
      where("createdAt", ">=", Timestamp.fromDate(start)),
      where("createdAt", "<=",  Timestamp.fromDate(end))
    );

    const stop = onSnapshot(qy, (snap) => {
      // ทำ bucket ตามวัน (ไม่ปะปนสัปดาห์อื่น)
      const buckets = new Map<string, number>();
      for (let i=0; i<7; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        buckets.set(fmtYMD(d), 0);
      }

      snap.forEach(doc => {
        // ✅ เปลี่ยนจาก as any เป็น Type ที่เราระบุไว้
        const x = doc.data() as OrderDoc;
        const ts = x.createdAt;
        
        // เช็คให้แน่ใจว่ามีฟังก์ชัน toDate (เป็น Timestamp จริงๆ)
        if (!ts || typeof ts.toDate !== 'function') return;
        
        const d = ts.toDate();
        const key = fmtYMD(d);
        if (buckets.has(key)) {
          buckets.set(key, (buckets.get(key) || 0) + Number(x.amount ?? 0));
        }
      });

      // แปลงเป็น array พร้อม label ภาษาไทย
      const arr: DaySale[] = Array.from(buckets.keys()).map((k) => {
        const d = new Date(k + "T00:00:00");
        return { day: thShortDay(d), sales: buckets.get(k) || 0 };
      });
      setData(arr);
    });

    return () => stop();
  }, []);

  return data;
}