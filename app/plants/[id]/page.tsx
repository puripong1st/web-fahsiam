// app/plants/[id]/page.tsx
import { plants } from "../../data/datafame";
import type { Metadata } from "next";
import PlantDetailClient from "./PlantDetailClient";

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
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-500">ไม่พบข้อมูลพืชที่คุณต้องการ</h1>
      </div>
    );
  }

  // เส้นแดงจะหายไป เพราะส่งไปแค่ข้อมูลที่ถูกต้องเท่านั้น
  return <PlantDetailClient plant={plant} />;
}