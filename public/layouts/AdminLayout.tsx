// src/layouts/AdminLayout.tsx
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome, FiBox, FiFileText, FiSettings, FiLogOut,
  FiBell, FiUser, FiUsers, FiArrowLeftCircle, FiExternalLink,
  FiMessageSquare, FiShoppingBag,
} from "react-icons/fi";
import {  useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [names] = useState<string>(() => {
    try {
      const raw = localStorage.getItem("adminSession");
      if (raw) {
        const s = JSON.parse(raw);
        return s?.names ?? "";
      }
    } catch {
      return "";
    }
    return "";
  });



  const logout = () => {
    localStorage.removeItem("adminSession");
    navigate("/adminlogin", { replace: true });
  };

  // ตั้ง title จาก path ปัจจุบัน
  const pageTitle =
    pathname === "/admin" || pathname === "/admin/"
      ? "ภาพรวม"
      : pathname.startsWith("/admin/products")
      ? "สินค้า"
      : pathname.startsWith("/admin/news")
      ? "ข่าวสาร"
      : pathname.startsWith("/admin/employees")
      ? "พนักงาน"
      : pathname.startsWith("/admin/contacts")
      ? "ข้อมูลติดต่อ"
      : pathname.startsWith("/admin/orders")
      ? "ข้อมูลการสั่งซื้อ"
      : pathname.startsWith("/admin/settings")
      ? "ตั้งค่าระบบ"
      : "แผงควบคุม";

  const baseLink =
    "flex items-center gap-3 px-3 py-2 rounded-lg w-full transition text-sky-50/90 hover:bg-white/10";
  const activeLink = "bg-white/15 text-white";

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 shrink-0 bg-sky-700 text-white flex flex-col">
        <div className="px-5 py-4 border-b border-white/10">
          <div className="text-xl font-extrabold tracking-tight">แผงควบคุมผู้ดูแล</div>
          <div className="text-sky-100/80 text-xs">Admin Console</div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {/* กลับหน้าเว็บ */}
          <button
            onClick={() => navigate("/")}
            className={baseLink}
            title="กลับหน้าเว็บไซต์"
          >
            <FiArrowLeftCircle className="text-lg" />
            <span className="font-medium">กลับหน้าเว็บไซต์</span>
          </button>

          {/* เปิดหน้าเว็บ (แท็บใหม่) */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={baseLink}
            title="เปิดหน้าเว็บไซต์ (แท็บใหม่)"
          >
            <FiExternalLink className="text-lg" />
            <span className="font-medium">เปิดหน้าเว็บ (แท็บใหม่)</span>
          </a>

          <div className="pt-2 border-t border-white/10" />

          {/* เมนูหลัก: ใช้ NavLink ชี้ path จริง */}
          <NavLink to="/admin" end className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ""}`}>
            <FiHome className="text-lg" />
            <span className="font-medium">ภาพรวม</span>
          </NavLink>

          <NavLink to="/admin/products" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ""}`}>
            <FiBox className="text-lg" />
            <span className="font-medium">สินค้า</span>
          </NavLink>

          <NavLink to="/admin/news" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ""}`}>
            <FiFileText className="text-lg" />
            <span className="font-medium">ข่าวสาร</span>
          </NavLink>

          <NavLink to="/admin/employees" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ""}`}>
            <FiUsers className="text-lg" />
            <span className="font-medium">พนักงาน</span>
          </NavLink>

          <NavLink to="/admin/contacts" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ""}`}>
            <FiMessageSquare className="text-lg" />
            <span className="font-medium">ข้อมูลติดต่อ</span>
          </NavLink>

          <NavLink to="/admin/orders" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ""}`}>
            <FiShoppingBag className="text-lg" />
            <span className="font-medium">ข้อมูลการสั่งซื้อ</span>
          </NavLink>

          <NavLink
            to="/admin/reviews"
            className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ""}`}
          >
            <FiMessageSquare className="text-lg" />
            <span className="font-medium">รีวิวสินค้า</span>
          </NavLink>

          <div className="pt-2 border-t border-white/10" />

          <NavLink to="/admin/settings" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ""}`}>
            <FiSettings className="text-lg" />
            <span className="font-medium">ตั้งค่าระบบ</span>
          </NavLink>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2 hover:bg-white/20"
          >
            <FiLogOut /> ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center gap-3 px-4">
          <div className="ml-2 text-base font-semibold text-gray-700">
            {pageTitle}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100" aria-label="แจ้งเตือน">
              <FiBell />
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100">
              <FiUser className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {names || "ไม่ระบุ"}
              </span>
            </div>
          </div>
        </div>

        {/* เนื้อหาเพจย่อย */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
