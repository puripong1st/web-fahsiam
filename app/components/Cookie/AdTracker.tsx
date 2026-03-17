"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Script from "next/script";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export default function AdTracker() {
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // 🆔 ใส่ ID ของคุณที่นี่
  const FB_PIXEL_ID = "ใส่เลข_FB_PIXEL_ID_ของคุณ";
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

  // ✅ Check consent on mount and listen for cookie consent events
  useEffect(() => {
    setIsClient(true);

    const checkConsent = () => {
      const consent = Cookies.get("cookie_consent");
      if (consent === "accepted") {
        setHasConsent(true);
        
        // ✅ Generate or retrieve tracking ID
        let userTrackId = Cookies.get("my_ad_tracking_id");
        if (!userTrackId) {
          userTrackId = "usr_" + Math.random().toString(36).substring(2, 15);
          Cookies.set("my_ad_tracking_id", userTrackId, { expires: 30, path: "/" });
        }
      } else {
        setHasConsent(false);
      }
    };

    // ✅ Check consent on initial load
    checkConsent();

    // ✅ Listen for cookie consent granted event from CookieBanner
    window.addEventListener("cookieConsentGranted", checkConsent);

    return () => {
      window.removeEventListener("cookieConsentGranted", checkConsent);
    };
  }, []);

  // ✅ Track page views when consent is granted and route changes
  useEffect(() => {
    if (!hasConsent || !isClient) return;

    // ✅ Fire PageView events on route change
    if (window.fbq) {
      window.fbq("track", "PageView");
    }

    if (window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [pathname, hasConsent, GA_MEASUREMENT_ID]);

  // ✅ Don't render scripts if no consent
  if (!hasConsent || !isClient) return null;

  return (
    <>
      {/* 🔵 Facebook Pixel — only loads when consent is granted */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
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

      {/* 🟠 Google Analytics (GA4) — only loads when consent is granted */}
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
