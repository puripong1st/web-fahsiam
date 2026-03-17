"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function CookieBanner() {
  // ✅ Start with null to avoid hydration mismatch
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  // ✅ Check cookie only on client side
  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    setIsVisible(!consent);
  }, []);

  const handleAccept = () => {
    // ✅ Set cookie first
    Cookies.set("cookie_consent", "accepted", { expires: 365, path: "/" });
    
    // ✅ Dispatch event to trigger AdTracker
    window.dispatchEvent(new Event("cookieConsentGranted"));
    
    // ✅ Hide banner
    setIsVisible(false);
  };

  const handleDecline = () => {
    Cookies.set("cookie_consent", "declined", { expires: 365, path: "/" });
    setIsVisible(false);
  };

  // ✅ Don't render anything during SSR or if not visible
  if (isVisible === null || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-5 duration-500">
      <div className="flex-1 text-sm text-gray-600">
        <h3 className="font-bold text-gray-800 text-base mb-1">🍪 นโยบายการใช้คุกกี้</h3>
        <p>
          เว็บไซต์นี้ใช้คุกกี้เพื่อนำเสนอเนื้อหาและโฆษณาที่ตรงกับความสนใจของคุณ รวมถึงวิเคราะห์การเข้าชมเว็บไซต์ 
          คุณสามารถเลือก &quot;ยอมรับ&quot; เพื่อให้เรามอบประสบการณ์ที่ดีที่สุด หรือคลิก &quot;ปฏิเสธ&quot; หากไม่ต้องการรับโฆษณาที่ปรับแต่ง
        </p>
      </div>
      <div className="flex flex-row gap-3 w-full md:w-auto shrink-0 justify-end">
        <button
          onClick={handleDecline}
          className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border border-gray-300"
        >
          ปฏิเสธคุกกี้โฆษณา
        </button>
        <button
          onClick={handleAccept}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
        >
          ยอมรับทั้งหมด
        </button>
      </div>
    </div>
  );
}
