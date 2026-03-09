"use client"; // สำคัญมากใน Next.js App Router เมื่อมีการใช้ Hooks (useState, usePathname)

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const hoverLink =
  "cursor-pointer sm:text-sm md:text-md lg:text-xl text-sky-600 hover:text-sky-700 transform transition duration-300 ease-out hover:-translate-y-0.5 truncate";

const menuItems = [
  { label: "หน้าแรก", path: "/" },
  { label: "เกี่ยวกับเรา", path: "/news" },
  { label: "ผลิตภัณฑ์", path: "/products" },
  { label: "การดูแลพืช", path: "/plants" },
  { label: "สนใจสั่งซื้อสินค้า", path: "/conproduct" },
  { label: "ติดต่อเรา", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname(); // ดึง path ปัจจุบันเพื่อเช็ค Active menu

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <div className="sticky top-0 z-50">
      <div className="hidden md:flex justify-end gap-4 bg-black/70 text-white text-xl p-4">
        <a>
          <span></span>ลงทะเบียน
        </a>
        <a>
          <span></span>เข้าสู่ระบบ
        </a>
        <a>
          <span></span>TH
        </a>
      </div>
      <div className="bg-white/90 border-b border-gray-200">
        <div className="hidden md:grid grid-cols-9 items-center p-5">
          <div></div>
          <div className="relative">
            {/* ใน Next.js แนะนำให้ใช้ <Image /> จาก next/image แต่ใช้ <img> แบบเดิมก็ทำงานได้ปกติ */}
            <img
              src="/favicon-32x32.png"
              alt="logo"
              className="fixed top-11 w-25"
            />
          </div>

          {/* เมนู desktop */}
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`${hoverLink} text-center ${
                  isActive ? "font-semibold text-sky-800" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        
        {/* --- Mobile Navbar (< md) --- */}
        <div className="md:hidden px-4 py-3 flex items-center justify-between">
          {/* โลโก้ + ชื่อแบรนด์ */}
          <div className="flex items-center gap-2">
            <img src="/favicon-32x32.png" alt="logo" className="w-8 h-8" />
            <span className="font-semibold text-sky-700 text-sm">
              Smart Agri Tech
            </span>
          </div>

          {/* ปุ่ม Hamburger */}
          <button
            type="button"
            onClick={toggleMobile}
            className="inline-flex flex-col justify-center items-center gap-1 w-8 h-8"
            aria-label="Toggle menu"
          >
            <span className="w-6 h-[2px] bg-gray-800 rounded" />
            <span className="w-6 h-[2px] bg-gray-800 rounded" />
            <span className="w-6 h-[2px] bg-gray-800 rounded" />
          </button>
        </div>

        {/* เมนูมือถือที่พับได้ */}
        <div
          className={`
            md:hidden border-t border-gray-200 bg-white/95 
            overflow-hidden transform transition-all duration-300 ease-out origin-top
            ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <nav className="flex flex-col py-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={closeMobileMenu}
                  className={`text-left px-4 py-2 text-sm hover:bg-gray-50 truncate ${
                    isActive ? "font-semibold text-sky-800" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;