import Link from "next/link";
import { FiAlertCircle, FiHome } from "react-icons/fi";
import { Metadata } from "next";

// ✅ เพิ่ม Metadata ตรงนี้
export const metadata: Metadata = {
  title: "404 ไม่พบหน้าเว็บ",
  description: "ขออภัย ไม่พบหน้าที่คุณต้องการ หรือหน้านี้ยังไม่ได้รับการพัฒนา กลับสู่หน้าหลักฟ้าสยาม SiamAgriTech",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-gradient-to-b from-white to-sky-50">
      <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-sky-100 max-w-md w-full flex flex-col items-center transition-all hover:shadow-md animate-fade-in-up">
        
        {/* ไอคอนแจ้งเตือน */}
        <div className="w-20 h-20 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
          <FiAlertCircle />
        </div>
        
        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">404</h1>
        <h2 className="text-xl font-bold text-sky-700 mb-4">ไม่พบหน้าที่คุณต้องการ</h2>
        
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          ขออภัย ในส่วนนี้ยังไม่ได้รับการพัฒนา <br /> 
          หรือ URL ที่คุณเข้าถึงอาจไม่ถูกต้อง
        </p>
        
        {/* ปุ่มกลับหน้าหลัก */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-sky-600 text-white font-bold rounded-xl hover:bg-sky-700 hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg w-full justify-center"
        >
          <FiHome className="text-lg" /> กลับสู่หน้าหลัก
        </Link>
        
      </div>
    </div>
  );
}