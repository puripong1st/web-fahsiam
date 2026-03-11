"use client"; 

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image'
const hoverLink =
  "cursor-pointer sm:text-sm md:text-md lg:text-xl text-sky-600 hover:text-sky-700 transform transition duration-300 ease-out hover:-translate-y-0.5 truncate";

// ปรับแก้ส่วน menuItems ให้เหลือเฉพาะที่จำเป็น
const menuItems = [
  { label: "หน้าแรก", path: "/" },
  { label: "เกี่ยวกับเรา", path: "/news" },
  { label: "ผลิตภัณฑ์", path: "/conproduct" },
  { label: "การดูแลพืช", path: "/plants" },
  { label: "ติดต่อเรา", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname(); 

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <div className="sticky top-0 z-50">
      {/* ส่วน Topbar (Register/Login) */}
      <div className="hidden md:flex justify-end gap-4 bg-black/70 text-white text-xl p-4">
        <a className="cursor-pointer">ลงทะเบียน</a>
        <a className="cursor-pointer">เข้าสู่ระบบ</a>
        <a className="cursor-pointer">TH</a>
      </div>

      <div className="bg-white/90 border-b border-gray-200">
        {/* Desktop Menu */}
        <div className="hidden md:grid grid-cols-7 items-center p-5"> 
          {/* ปรับ grid-cols จาก 9 เป็น 7 เพื่อให้สัดส่วนพอดีกับจำนวนเมนูที่ลดลง */}
          <div className="col-span-1 flex justify-center">
            <Image
              src="/favicon-32x32.png"
              alt="logo"
              width={96}
              height={96}
              className="fixed top-11 w-24 h-auto object-contain"
            />
          </div>

          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.label}
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
        
        {/* Mobile Navbar */}
        <div className="md:hidden px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/favicon-32x32.png" alt="logo" width={32} height={32} className="w-8 h-8" priority />
            <span className="font-semibold text-sky-700 text-sm">
              Smart Agri Tech
            </span>
          </div>

          <button
            type="button"
            onClick={toggleMobile}
            className="flex flex-col justify-center items-center gap-1 w-8 h-8"
          >
            <span className={`w-6 h-[2px] bg-gray-800 transition-all ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`w-6 h-[2px] bg-gray-800 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-[2px] bg-gray-800 transition-all ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`
            md:hidden border-t border-gray-200 bg-white/95 
            overflow-hidden transition-all duration-300 ease-out
            ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <nav className="flex flex-col py-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.label}
                  href={item.path}
                  onClick={closeMobileMenu}
                  className={`px-4 py-3 text-sm hover:bg-gray-50 ${
                    isActive ? "font-bold text-sky-800 bg-sky-50" : "text-gray-700"
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