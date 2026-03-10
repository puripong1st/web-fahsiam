"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Script from "next/script";

export default function AdTracker() {
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState(false);

  // 🆔 ใส่ ID ของคุณที่นี่
  const FB_PIXEL_ID = "ใส่เลข_FB_PIXEL_ID_ของคุณ"; 
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // ใส่เลข Google Analytics ID (Measurement ID)

  useEffect(() => {
    console.log("🛠️ [AdTracker] เริ่มระบบตรวจสอบคุกกี้...");
    
    const consent = Cookies.get("cookie_consent");
    
    if (consent === "accepted") {
      console.log("✅ [AdTracker] ยอมรับคุกกี้แล้ว: กำลังเปิดใช้งานระบบ Tracking ทั้งหมด");
      setHasConsent(true);
      
      // การจัดการ User ID ภายใน (ถ้ามี)
      let userTrackId = Cookies.get("my_ad_tracking_id");
      if (!userTrackId) {
        userTrackId = "usr_" + Math.random().toString(36).substring(2, 15);
        Cookies.set("my_ad_tracking_id", userTrackId, { expires: 30, path: "/" });
      }
    } else {
      console.log("🚫 [AdTracker] ยังไม่กดยอมรับคุกกี้: ระงับการโหลด Scripts โฆษณา");
    }
  }, []);

  useEffect(() => {
    if (hasConsent && typeof window !== "undefined") {
      // 🔵 ยิง Facebook PageView
      if ((window as any).fbq) {
        (window as any).fbq("track", "PageView");
        console.log(`🚀 [FB Pixel] ยิง PageView สำเร็จ: ${pathname}`);
      }

      // 🟠 ยิง Google Analytics PageView
      if ((window as any).gtag) {
        (window as any).gtag("config", GA_MEASUREMENT_ID, {
          page_path: pathname,
        });
        console.log(`🚀 [GA4] ส่งข้อมูลเข้า Google Analytics สำเร็จ: ${pathname}`);
      }
    }
  }, [pathname, hasConsent]);

  if (!hasConsent) return null;

  return (
    <>
      {/* --- 🔵 Facebook Pixel Script --- */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        onLoad={() => console.log("📦 [FB Pixel] Script โหลดเสร็จพร้อมใช้")}
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

      {/* --- 🟠 Google Analytics (GA4) Script --- */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => console.log("📦 [GA4] Script โหลดเสร็จพร้อมใช้")}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}