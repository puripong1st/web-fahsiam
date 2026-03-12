// app/sitemap.ts

// ── Imports ───────────────────────────────────────────────────────
import type { MetadataRoute } from "next";
// MetadataRoute.Sitemap คือ Type ของ Next.js
// ช่วย validate ว่าแต่ละ entry มี field ครบและถูกต้อง

import { plants } from "./data/datafame";
import { MOCK_PRODUCTS } from "./data/productsdetail";
// ✅ แก้จาก "../app/data/..." → "./data/..."
// เพราะ sitemap.ts อยู่ใน app/ อยู่แล้ว

// ── Base URL ──────────────────────────────────────────────────────
const BASE_URL = "https://web-fahsiam.vercel.app";
// เก็บ URL หลักไว้ที่เดียว แก้ที่เดียวใช้ได้ทั้งไฟล์

// ── Sitemap Function ──────────────────────────────────────────────
export default function sitemap(): MetadataRoute.Sitemap {
// Next.js จะ detect function นี้อัตโนมัติ
// แล้ว generate เป็น /sitemap.xml ให้เลย ไม่ต้องทำอะไรเพิ่ม

  // ── 1. Static Pages ─────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      // lastModified: บอก Google ว่าหน้านี้อัปเดตล่าสุดเมื่อไหร่
      // ใส่ new Date() = วันที่ deploy ล่าสุด
      lastModified: new Date(),
      // changeFrequency: คาดการณ์ว่าหน้านี้เปลี่ยนบ่อยแค่ไหน
      // ค่า: always | hourly | daily | weekly | monthly | yearly | never
      changeFrequency: "weekly",
      // priority: ความสำคัญเทียบกับหน้าอื่นใน 0.0 - 1.0
      // หน้าแรก = 1.0 (สำคัญที่สุด)
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/conproduct`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9, // หน้าสินค้า สำคัญมาก
    },
    {
      url: `${BASE_URL}/plants`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9, // หน้าพืช สำคัญมาก
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7, // ข่าว อัปเดตรายเดือน
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly", // หน้าติดต่อแทบไม่เปลี่ยน
      priority: 0.5,
    },
  ];

  // ── 2. Dynamic: หน้าพืชแต่ละชนิด ───────────────────────────────
  const plantPages: MetadataRoute.Sitemap = plants.map((plant) => ({
    // map() วน loop สร้าง entry ให้ทุก plant อัตโนมัติ
    // ผลลัพธ์: /plants/rice, /plants/corn, /plants/durian, ...
    url: `${BASE_URL}/plants/${plant.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // ── 3. Dynamic: หน้าสินค้าแต่ละชิ้น ────────────────────────────
  const productPages: MetadataRoute.Sitemap = MOCK_PRODUCTS.map((product) => ({
    // ผลลัพธ์: /products/p1, /products/p2, ...
    url: `${BASE_URL}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // ── รวม array ทั้ง 3 กลุ่ม แล้ว return ──────────────────────────
  return [...staticPages, ...plantPages, ...productPages];
  // Spread operator (...) คือการ merge array เข้าด้วยกัน
  // Google จะเห็น URL ทั้งหมดในไฟล์ sitemap.xml ไฟล์เดียว
}