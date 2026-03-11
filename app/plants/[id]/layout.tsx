import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "การดูแลพืช | ฟ้าสยาม",
  description: "คู่มือการปลูกและดูแลพืช พร้อมสูตรปุ๋ยที่เหมาะสม โดยฟ้าสยาม",
  openGraph: {
    title: "การดูแลพืช | ฟ้าสยาม",
    description: "คู่มือการปลูกและดูแลพืช พร้อมสูตรปุ๋ยที่เหมาะสม โดยฟ้าสยาม",
    url: "https://web-fahsiam.vercel.app/plants",
    siteName: "ฟ้าสยาม",
    images: [{ url: "/background/background1.webp", width: 1200, height: 630, alt: "ฟ้าสยาม" }],
    locale: "th_TH",
    type: "website",
  },
};

export default function PlantLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
