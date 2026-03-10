"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Script from "next/script";

export default function AdTracker() {
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState(false);

  // ใส่เลข PIXEL ID ของคุณตรงนี้
  const FB_PIXEL_ID = "ใส่เลข_PIXEL_ID_ของคุณตรงนี้"; 

  // 1. ตรวจสอบสถานะตอนโหลดหน้าเว็บ
  useEffect(() => {
    console.log("🛠️ [AdTracker] ระบบตรวจสอบคุกกี้เริ่มทำงาน...");
    
    const consent = Cookies.get("cookie_consent");
    
    if (consent === "accepted") {
      console.log("✅ [AdTracker] ผู้ใช้เคยกดยอมรับคุกกี้แล้ว (อนุญาตให้ยิง Ads)");
      setHasConsent(true);
      
      let userTrackId = Cookies.get("my_ad_tracking_id");
      if (!userTrackId) {
        userTrackId = "usr_" + Math.random().toString(36).substring(2, 15);
        Cookies.set("my_ad_tracking_id", userTrackId, { expires: 30, path: "/" });
        console.log(`🆕 [AdTracker] สร้าง User Tracking ID ใหม่: ${userTrackId}`);
      } else {
        console.log(`🔄 [AdTracker] พบ User Tracking ID เดิม: ${userTrackId}`);
      }
    } else {
      console.log("🚫 [AdTracker] ผู้ใช้ยังไม่กดยอมรับ หรือกดปฏิเสธ (ระงับการทำงาน Pixel)");
    }
  }, []);

  // 2. ยิง Event เมื่อเปลี่ยนหน้า (ถ้ากดยอมรับแล้ว)
  useEffect(() => {
    if (hasConsent) {
      console.log(`📡 [AdTracker] ตรวจพบการเข้าชมหน้า: ${pathname}`);
      
      // เช็คว่าโหลด Script ของ Facebook เสร็จหรือยัง
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "PageView");
        console.log("🚀 [AdTracker] ยิงข้อมูล 'PageView' ไปที่โฆษณาสำเร็จ!");
      } else {
        console.log("⏳ [AdTracker] รอระบบโหลด Script โฆษณา...");
      }
    }
  }, [pathname, hasConsent]);

  if (!hasConsent) return null;

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        // เพิ่ม onLoad เพื่อให้รู้ว่าโค้ดดึงมาจาก Facebook สำเร็จแล้ว
        onLoad={() => console.log("📦 [AdTracker] ดาวน์โหลด Script ของ Facebook สำเร็จพร้อมใช้งาน!")}
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
    </>
  );
}