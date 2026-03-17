# SEO & Metadata Templates

## 1. Next.js Metadata Template

ใช้สำหรับกำหนด Metadata ใน `layout.tsx` หรือ `page.tsx` ของโปรเจกต์ Next.js

```typescript
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'ชื่อเว็บไซต์ | คำโปรยที่เน้น Keyword หลัก',
    template: '%s | ชื่อแบรนด์/เว็บไซต์',
  },
  description: 'คำอธิบายเว็บไซต์ที่ดึงดูดใจ มี Keyword หลักและรอง ความยาว 150-160 ตัวอักษร',
  keywords: ['keyword1', 'keyword2', 'keyword3', 'long-tail keyword'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: BASE_URL,
    siteName: 'ชื่อเว็บไซต์',
    title: 'ชื่อหัวข้อสำหรับ Social Media',
    description: 'คำอธิบายสำหรับ Social Media',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'คำอธิบายรูปภาพ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ชื่อหัวข้อสำหรับ Twitter',
    description: 'คำอธิบายสำหรับ Twitter',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

## 2. Schema.org (JSON-LD) Templates

### 2.1 Organization Schema
ใช้สำหรับหน้าแรกหรือหน้าเกี่ยวกับเรา เพื่อบอกข้อมูลองค์กร

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ชื่อบริษัท/องค์กร",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+66-XX-XXX-XXXX",
    "contactType": "customer service",
    "areaServed": "TH",
    "availableLanguage": "Thai"
  },
  "sameAs": [
    "https://www.facebook.com/yourpage",
    "https://twitter.com/youraccount",
    "https://www.instagram.com/youraccount"
  ]
}
```

### 2.2 Product Schema
ใช้สำหรับหน้าสินค้า เพื่อแสดง Rich Snippets บน Google

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "ชื่อสินค้า",
  "image": "https://example.com/product-image.jpg",
  "description": "คำอธิบายสินค้าที่เน้นคุณประโยชน์และ Keyword",
  "sku": "SKU-ID",
  "brand": {
    "@type": "Brand",
    "name": "ชื่อแบรนด์"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/products/item-id",
    "priceCurrency": "THB",
    "price": "990.00",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock"
  }
}
```

### 2.3 FAQ Schema
ใช้สำหรับหน้าคำถามที่พบบ่อย เพื่อแสดงคำถาม-คำตอบบนผลการค้นหา

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "คำถามที่พบบ่อย 1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "คำตอบสำหรับคำถามที่ 1 ที่กระชับและได้ใจความ"
      }
    },
    {
      "@type": "Question",
      "name": "คำถามที่พบบ่อย 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "คำตอบสำหรับคำถามที่ 2"
      }
    }
  ]
}
```
