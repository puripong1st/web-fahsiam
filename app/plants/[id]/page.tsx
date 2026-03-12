// app/plants/[id]/page.tsx
import { plants } from "../../data/datafame";
import type { Metadata } from "next";
import PlantDetailClient from "./PlantDetailClient";
import { FiAlertCircle, FiHome } from "react-icons/fi";
import Link from "next/link";

export function generateStaticParams() {
  return plants.map((plant) => ({
    id: plant.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const plant = plants.find((p) => p.id === id);

  if (!plant) {
    return { title: "ไม่พบข้อมูลพืช" };
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";
  const currentUrl = `${BASE_URL}/plants/${id}`;

  return {
    title: `วิธีปลูก${plant.name} ให้ได้ผลผลิตสูง | ฟ้าสยาม`,
    description: plant.desc,
    alternates: {
      canonical: currentUrl,
    },
    openGraph: {
      title: `คู่มือการปลูก${plant.name} | ฟ้าสยาม`,
      description: plant.desc,
      url: currentUrl,
      type: "article",
      images: [
        {
          url: plant.image,
          width: 1200,
          height: 630,
          alt: `วิธีปลูก${plant.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `วิธีปลูก${plant.name} | ฟ้าสยาม`,
      description: plant.desc,
      images: [plant.image],
    },
  };
}

export default async function PlantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plant = plants.find((p) => p.id === id);

  // ✅ ถ้าหาพืชไม่เจอ ให้ return UI แจ้งเตือนออกไปเลย
  // ตรงนี้ช่วยให้ TypeScript รู้ว่าถ้าโค้ดผ่านจุดนี้ไปได้ plant จะไม่ใช่ undefined แน่นอน
  if (!plant) {
    return (
       <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-gradient-to-b from-white to-sky-50">
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-sky-100 max-w-md w-full flex flex-col items-center transition-all hover:shadow-md">
              
              {/* ไอคอนแจ้งเตือน */}
              <div className="w-20 h-20 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
                <FiAlertCircle />
              </div>
              
              <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">404</h1>
              <h2 className="text-xl font-bold text-sky-700 mb-4">ไม่พบข้อมูลพืชที่คุณต้องการ</h2>
              
              <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                ขออภัย ในส่วนนี้ยังไม่ได้รับการพัฒนา <br /> 
                หรือ URL ที่คุณเข้าถึงอาจไม่ถูกต้อง
              </p>
              
              {/* ปุ่มกลับหน้าหลัก */}
              <Link
                href="/plants"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-sky-600 text-white font-bold rounded-xl hover:bg-sky-700 hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg w-full justify-center"
              >
                <FiHome className="text-lg" /> กลับสู่หน้าเลือกพืช
              </Link>
              
            </div>
          </div>
    );
  }

  // เส้นแดงจะหายไป เพราะส่งไปแค่ข้อมูลที่ถูกต้องเท่านั้น
  return <PlantDetailClient plant={plant} />;
}