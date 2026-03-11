"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Script from "next/script";

// ใช้ Context หรือ prop drilling เพื่อรับ consent จาก CookieBanner
// แต่ถ้าอยากให้ standalone ให้ listen cookie change แบบนี้
export default function AdTracker() {
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  // 🆔 ใส่ ID ของคุณที่นี่
  const FB_PIXEL_ID = "ใส่เลข_FB_PIXEL_ID_ของคุณ";
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

  useEffect(() => {
    const checkConsent = () => {
      const consent = Cookies.get("cookie_consent");
      if (consent === "accepted") {
        setHasConsent(true);
        let userTrackId = Cookies.get("my_ad_tracking_id");
        if (!userTrackId) {
          userTrackId = "usr_" + Math.random().toString(36).substring(2, 15);
          Cookies.set("my_ad_tracking_id", userTrackId, { expires: 30, path: "/" });
        }
      }
    };

    checkConsent();

    // Listen สำหรับกรณีที่ consent เพิ่งถูก set (จาก CookieBanner)
    // โดยไม่ต้อง reload หน้า
    window.addEventListener("cookieConsentGranted", checkConsent);
    return () => window.removeEventListener("cookieConsentGranted", checkConsent);
  }, []);

  // ยิง PageView เฉพาะตอนเปลี่ยน route — ไม่ยิงตอน init (scripts จะยิงเองอยู่แล้ว)
  useEffect(() => {
    if (!hasConsent || !scriptsLoaded) return;

    if ((window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }

    if ((window as any).gtag) {
      (window as any).gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]); // ✅ ไม่ใส่ hasConsent — เพื่อกันยิงซ้ำตอน consent เปลี่ยน

  if (!hasConsent) return null;

  return (
    <>
      {/* 🔵 Facebook Pixel — init ครั้งเดียว ไม่มี fbq('track', 'PageView') ซ้ำ */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        onLoad={() => setScriptsLoaded(true)}
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

      {/* 🟠 Google Analytics (GA4) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
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
