"use client"; 

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image'

const hoverLink =
  "cursor-pointer text-sm md:text-base lg:text-xl text-sky-600 hover:text-sky-700 transform transition duration-300 ease-out hover:-translate-y-0.5";

const menuItems = [
  { label: "หน้าแรก", path: "/" },
  // { label: "เกี่ยวกับเรา", path: "/news" },
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
    <header className="sticky top-0 z-50">
      <div className="border-b border-sky-100 bg-white/95 backdrop-blur">
        {/* Desktop Menu */}
        <div className="mx-auto hidden max-w-6xl grid-cols-5 items-center gap-2 px-4 py-2 md:grid">
          <div className="col-span-1 flex items-center justify-start">
            <Link href="/">
              <Image
                src="/favicon-32x32.png"
                alt="ปุ๋ยตราฟ้าสยาม SiamAgriTech Logo"
                width={96}
                height={96}
                className="h-auto w-20 object-contain lg:w-24" 
                priority
              />
            </Link>
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
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 md:hidden">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
              <Image src="/favicon-32x32.png" alt="ปุ๋ยตราฟ้าสยาม SiamAgriTech Logo" width={32} height={32} className="w-8 h-8" priority />
              <span className="font-semibold text-sky-700 text-sm">
                Smart Agri Tech
              </span>
            </Link>
          </div>

          <button
            type="button"
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
            aria-label="เปิดเมนูนำทาง"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-lg border border-sky-100 bg-white"
          >
            <span className={`w-6 h-[2px] bg-gray-800 transition-all ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`w-6 h-[2px] bg-gray-800 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-[2px] bg-gray-800 transition-all ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`
            border-t border-gray-200 bg-white/95 md:hidden
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
    </header>
  );
};

export default Navbar;