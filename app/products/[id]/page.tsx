import { MOCK_PRODUCTS } from "../../data/productsdetail";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnimateIn from "../../components/AnimateIn";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";

/* ── ข้อมูล SEO แยกไว้ (ใช้ร่วมกันระหว่าง metadata กับ JSON-LD) ── */
const products: Record<string, { name: string; description: string; price: number; image: string }> = {
  "organic-chemical-12-3-5-growth": {
    name: "ปุ๋ยอินทรีย์เคมี 12-3-5",
    description: "ปุ๋ยอินทรีย์เคมีสูตร 12-3-5 เหมาะสำหรับพืชที่ต้องการไนโตรเจนสูง ช่วยส่งเสริมการเจริญเติบโตของลำต้นและใบ",
    price: 1290,
    image: "/image/Fertilizer/1.webp",
  },
  "organic-chemical-3-6-15-bloom": {
    name: "ปุ๋ยอินทรีย์เคมี 3-6-15",
    description: "ปุ๋ยอินทรีย์เคมีสูตร 3-6-15 เหมาะสำหรับช่วงออกดอกและติดผล เพิ่มคุณภาพผลผลิต",
    price: 1390,
    image: "/image/Fertilizer/2.webp",
  },
  "chemical-fertilizer-0-0-30-sweetness": {
    name: "ปุ๋ยเคมี 0-0-30",
    description: "ปุ๋ยโพแทสเซียมสูง 0-0-30 ช่วยเพิ่มความหวาน สีผิว และความแข็งแรงของพืช",
    price: 1390,
    image: "/image/Fertilizer/3.webp",
  },
  "organic-powder-om-25-soil-booster": {
    name: "ปุ๋ยอินทรีย์ผง OM 25%",
    description: "ปุ๋ยอินทรีย์ผงคุณภาพสูง OM 25% ปรับปรุงโครงสร้างดิน เพิ่มจุลินทรีย์ที่เป็นประโยชน์",
    price: 690,
    image: "/image/Fertilizer/4.webp",
  },
  "organic-pellet-om-20-slow-release": {
    name: "ปุ๋ยอินทรีย์เม็ด OM 20%",
    description: "ปุ๋ยอินทรีย์เม็ด OM 20% ใช้งานง่าย ปลดปล่อยธาตุอาหารช้า เหมาะสำหรับไม้ผลและพืชไร่",
    price: 790,
    image: "/image/Fertilizer/5.webp",
  },
  "organic-chemical-6-3-3-all-purpose": {
    name: "ปุ๋ยอินทรีย์เคมี 6-3-3",
    description: "ปุ๋ยอินทรีย์เคมีสูตร 6-3-3 สูตรรวม เหมาะสำหรับบำรุงพืชทั่วไปในระยะเจริญเติบโต",
    price: 1090,
    image: "/image/Fertilizer/6.webp",
  },
};

/* ── generateMetadata ─────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products[id];

  if (!product) {
    return { title: "ไม่พบสินค้า" };
  }

  const url = `${BASE_URL}/products/${id}`;
  const seoTitle = `${product.name} ตราฟ้าสยาม | ฿${product.price.toLocaleString()} บาท`;
  const seoDescription = `${product.description} ราคา ฿${product.price.toLocaleString()} บาท ได้รับการรับรองจากกรมวิชาการเกษตร`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      product.name,
      `${product.name} ฟ้าสยาม`,
      "ปุ๋ยอินทรีย์",
      "ปุ๋ยอินทรีย์เคมี",
      "ฟ้าสยาม",
      "ลดต้นทุนเพิ่มผลผลิต",
      "SiamAgriTech",
    ],
    robots: {
      index: true,
      follow: true,
    },
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: `${BASE_URL}${product.image}`,
          width: 1200,
          height: 900,
          alt: `${product.name} ตราฟ้าสยาม`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [`${BASE_URL}${product.image}`],
    },
  };
}

/* ── Page ─────────────────────────────────────────────── */
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  /* ── 1. Structured Data (JSON-LD) สำหรับ Product ──────────────────────── */
  const seoProduct = products[id];
  const priceValidUntil = new Date(new Date().getFullYear() + 1, 11, 31)
    .toISOString()
    .split("T")[0];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: seoProduct?.description ?? product.name,
    image: `${BASE_URL}${product.image}`,
    url: `${BASE_URL}/products/${id}`,
    brand: {
      "@type": "Brand",
      name: "ฟ้าสยาม",
    },
    // ⚠️ ซ่อนส่วน Review ไว้ก่อนเพื่อป้องกัน Google Penalty จากการทำ Hardcode
    /*
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      reviewCount: "24",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "คุณสมชาย เกษตรกร",
        },
        reviewBody: "ผลิตภัณฑ์คุณภาพดี ฟาร์มเติบโตชัดเจน ใช้แล้วเห็นผลจริง",
      },
    ],
    */
    offers: {
      "@type": "Offer",
      priceCurrency: "THB",
      price: product.price,
      priceValidUntil,
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/products/${id}`,
      seller: {
        "@type": "Organization",
        name: "ฟ้าสยาม SiamAgriTech",
      },
    },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "0",
        currency: "THB",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "TH",
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 2,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 3,
          unitCode: "DAY",
        },
      },
    },
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "TH",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 7,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/FreeReturn",
    },
    ...(product.benefits?.length > 0 && {
      additionalProperty: product.benefits.map((b) => ({
        "@type": "PropertyValue",
        name: "ประโยชน์",
        value: b,
      })),
    }),
  };

  /* ── 2. Structured Data (JSON-LD) สำหรับ Breadcrumb ───────────────────── */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "หน้าแรก",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "ผลิตภัณฑ์",
        item: `${BASE_URL}/conproduct`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${BASE_URL}/products/${id}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ── ฝัง Schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ส่วนหัวสีเขียว (Banner) */}
      <div className="bg-sky-800 text-white py-6 md:py-10 text-center">
        <h1 className="text-2xl md:text-4xl font-bold px-4 animate-fade-in-up">
          {product.name} 50 กิโลกรัม
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* รูปภาพสินค้า */}
          <AnimateIn className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100" animation="scale-in">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-auto object-cover"
              priority
            />
          </AnimateIn>

          {/* รายละเอียดราคาและประโยชน์ */}
          <AnimateIn className="flex flex-col" delay="0.15s">
            <h2 className="text-3xl font-bold text-sky-800 leading-tight">
              {product.name} <br /> 50 กิโลกรัม
            </h2>
            <div className="mt-4 flex items-baseline gap-4">
              <span className="text-4xl font-black text-sky-800">
                ฿ {product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through">
                  จากปกติ ฿{product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* ดึงข้อมูล "ประโยชน์" มาแสดงแบบอัตโนมัติ */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-sky-800 mb-4">
                ประโยชน์
              </h3>
              <ul className="space-y-2 text-gray-700">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1">🏆</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ปุ่มสั่งซื้อ Facebook */}
            <a
              href="https://www.facebook.com/share/p/1ArBAZtMvr/?mibextid=wwXIf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 bg-[#1877F2] text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors w-full md:w-max shadow-lg cursor-pointer"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              สั่งซื้อผ่าน Facebook
            </a>

            <Link
              href="/conproduct"
              className="mt-6 text-gray-500 hover:text-sky-600 text-sm font-medium transition-colors"
            >
              ← กลับไปเลือกสินค้าอื่น
            </Link>
          </AnimateIn>
        </div>

        {/* ส่วนล่าง: วิธีใช้ ดึงข้อมูลแบบอัตโนมัติ */}
        <AnimateIn className="mt-16 bg-sky-50/60 rounded-3xl p-8 md:p-12 border border-sky-100">
          <h3 className="text-2xl font-bold text-sky-800 mb-8 border-b-2 border-sky-200 pb-2 inline-block">
            วิธีใช้
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-12">
            {product.usages.map((usageGroup, index) => (
              <div key={index} className="space-y-3">
                <h4 className="text-lg font-extrabold text-sky-800 border-b border-sky-100 pb-1">
                  {usageGroup.groupName}
                </h4>
                <div className="space-y-2">
                  {usageGroup.items.map((item, idx) => (
                    <div key={idx}>
                      <p className="font-bold text-gray-800">{item.label}</p>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </main>
  );
}