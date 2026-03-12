import type { Metadata } from "next";
import { plants } from "../../data/datafame";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const plant = plants.find((p) => p.id === id);

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";
  const url = `${BASE_URL}/plants/${id}`;

  if (!plant) {
    return {
      title: "ไม่พบข้อมูลพืช",
      description: "ไม่พบข้อมูลพืชที่คุณค้นหา",
    };
  }

  return {
    title: `วิธีดูแล${plant.name} และแนะนำปุ๋ย | ฟ้าสยาม`,
    description: `${plant.desc} — คู่มือการปลูก${plant.name}ครบ ${plant.howToGrow.length} ขั้นตอน พร้อมสูตรปุ๋ยแนะนำ: ${plant.fertilizer.slice(0, 3).join(", ")} โดยฟ้าสยาม`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `วิธีดูแล${plant.name} และแนะนำปุ๋ย | ฟ้าสยาม`,
      description: `${plant.desc} คู่มือครบ ${plant.howToGrow.length} ขั้นตอน พร้อมสูตรปุ๋ยที่เหมาะสม`,
      url,
      type: "website",
      images: [
        {
          url: plant.image,
          width: 828,
          height: 600,
          alt: `การดูแล${plant.name}ด้วยปุ๋ยอินทรีย์ฟ้าสยาม`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `วิธีดูแล${plant.name} และแนะนำปุ๋ย | ฟ้าสยาม`,
      description: `${plant.desc} คู่มือครบ ${plant.howToGrow.length} ขั้นตอน พร้อมสูตรปุ๋ยที่เหมาะสม`,
      images: [plant.image],
    },
  };
}

export default function PlantLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
