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
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://lin.ee/Xy0naat"
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10"
            >
              <FaLine />
            </a>

            <a
              href="https://www.youtube.com/@SMARTAgri-Tech"
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
            <li>
              <Link href="/about">เกี่ยวกับเรา</Link>
            </li>

            <li>
              <Link href="/products">ผลิตภัณฑ์</Link>
            </li>

            <li>
              <Link href="/blog">บทความ</Link>
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
              <a href="#">คู่มือการปลูกพืช</a>
              <FiExternalLink />
            </li>

            <li className="flex items-center gap-1">
              <a href="#">บทความข่าวสาร</a>
              <FiExternalLink />
            </li>

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
              info@company.com
            </li>

          </ul>

        </div>

      </div>

      {/* bottom */}
      <div className="border-t border-white/10">

        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between text-sm">

          <p>© {year} SiamAgriTech</p>

          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="fixed bottom-6 right-6 rounded-full bg-sky-600 p-3"
          >
            <FiArrowUp />
          </button>

        </div>

      </div>

    </footer>
  );
}