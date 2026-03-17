"use client";

import { FaFacebookF, FaLine, FaYoutube, FaPhoneAlt } from "react-icons/fa";
import { FiMapPin, FiMail, FiArrowUp, FiExternalLink } from "react-icons/fi";
import { BsShieldCheck } from "react-icons/bs";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-sky-800 text-white">

      <div className="h-2 bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-400" />

      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <BsShieldCheck className="text-emerald-300 text-2xl" />
            <h3 className="font-extrabold text-xl">
              SiamAgriTech
            </h3>
          </div>

          <p className="mt-3 text-sm text-sky-100/90">
            เรามุ่งมั่นพัฒนานวัตกรรมการเกษตรที่ยั่งยืน
          </p>

          <div className="mt-4 flex gap-3">
            <a
              href="https://www.facebook.com/share/19UpsyudBU/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://lin.ee/Xy0naat"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Line"
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10"
            >
              <FaLine />
            </a>

            <a
              href="https://www.youtube.com/@SMARTAgri-Tech"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div className="hidden md:block">
          <h4 className="font-semibold text-lg mb-3">ลิงก์ด่วน</h4>

          <ul className="space-y-2 text-sm">
            {/* <li>
              <Link href="/news">เกี่ยวกับเรา</Link>
            </li> */}

            <li>
              <Link href="/conproduct">ผลิตภัณฑ์</Link>
            </li>

            <li>
              <Link href="/plants">การดูแลพืช</Link>
            </li>

            <li>
              <Link href="/contact">ติดต่อเรา</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="hidden md:block">
          <h4 className="font-semibold text-lg mb-3">แหล่งข้อมูล</h4>

          <ul className="space-y-2 text-sm">

            <li className="flex items-center gap-1">
              <Link href="/plants">คู่มือการปลูกพืช</Link>
              <FiExternalLink />
            </li>

            {/* <li className="flex items-center gap-1">
              <Link href="/news">บทความข่าวสาร</Link>
              <FiExternalLink />
            </li> */}

            <li>
              <a href="#">คำถามที่พบบ่อย</a>
            </li>

            <li>
              <a href="#">นโยบายความเป็นส่วนตัว</a>
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-lg mb-3">ติดต่อเรา</h4>

          <ul className="space-y-2 text-sm text-sky-100">

            <li className="flex gap-2">
              <FiMapPin />
              กรุงเทพมหานคร
            </li>

            <li className="flex gap-2">
              <FaPhoneAlt />
              082-529-8388
            </li>

            <li className="flex gap-2">
              <FiMail />
              admin@smartagritech.co.th
            </li>

          </ul>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 flex gap-2"
          >
            <input
              type="email"
              placeholder="อีเมลของคุณ"
              className="w-full rounded-lg px-3 py-2 text-sky-900 placeholder:text-sky-400 outline-none
                         border border-white/20 bg-white focus:border-emerald-300"
              required
            />
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-white hover:bg-emerald-600 transition"
            >
              สมัคร
            </button>
          </form>
          <p className="mt-1 text-xs text-sky-100/80">
            รับข่าวสาร เคล็ดลับ และโปรโมชันก่อนใคร
          </p>

        </div>

      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-sky-100">
          <p>© {year} SiamAgriTech — All rights reserved.</p>
          
          <a
            href="tel:0825298388"
            className="inline-flex items-center gap-2 hover:underline"
          >
            <FaPhoneAlt /> สายด่วน 082-529-8388
          </a>
        </div>
      </div>

      {/* ปุ่มขึ้นบนสุด */}
      <button
        aria-label="กลับไปด้านบนสุด"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center 
          rounded-full bg-sky-600 p-3 text-white shadow-lg 
          hover:bg-sky-700 hover:-translate-y-0.5 transition-all duration-200"
      >
        <FiArrowUp className="text-xl" />
      </button>

    </footer>
  );
}