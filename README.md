<div align="center">

# 🌾 Fah Siam · ฟ้าสยาม

**Smart Agriculture Platform for Thai Farmers**

[![Next.js](https://img.shields.io/badge/Next.js-14+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://web-fahsiam.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> *ปลูกได้ ปลูกดี ด้วยเทคโนโลยีที่เข้าใจเกษตรกรไทย*

**[🌐 ดูเว็บไซต์จริง](https://web-fahsiam.vercel.app)** · **[🐛 รายงานปัญหา](https://github.com/puripong1st/web-fahsiam/issues)** · **[💡 เสนอแนะฟีเจอร์](https://github.com/puripong1st/web-fahsiam/issues)**

</div>

---

## 📖 เกี่ยวกับโปรเจกต์

**ฟ้าสยาม (Fah Siam)** คือแพลตฟอร์มเกษตรอัจฉริยะที่พัฒนาขึ้นเพื่อช่วยเกษตรกรไทยบริหารจัดการปุ๋ยอย่างมีประสิทธิภาพ ระบบจะวิเคราะห์ชนิดพืช ช่วงเวลา และฤดูกาล เพื่อแนะนำสูตรปุ๋ยที่เหมาะสมที่สุด — ลดต้นทุน เพิ่มผลผลิต อย่างยั่งยืน

```
เกษตรกรไทย + เทคโนโลยี = อนาคตที่ดีกว่า 🌱
```

---

## ✨ ฟีเจอร์หลัก

| ฟีเจอร์ | รายละเอียด |
|--------|-----------|
| 🧪 **Smart Fertilizer Scheduler** | ระบบแนะนำสูตรปุ๋ยรายเดือน ปรับตามชนิดพืช เช่น ทุเรียน กาแฟ ปาล์มน้ำมัน |
| 📅 **Agriculture Calendar** | ปฏิทินอัจฉริยะแสดงพืชตามฤดูกาลและอัตราการใช้ปุ๋ยที่แม่นยำ |
| 🛡️ **PDPA Compliant** | ระบบ Cookie Consent ครบถ้วน สอดคล้องกับ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล |
| 📊 **Analytics & Ads Integration** | รองรับ Meta Pixel + Google Analytics 4 พร้อม Console Log ตรวจสอบการทำงาน |
| 🔍 **SEO Optimized** | Metadata API ครบ พร้อม Open Graph สำหรับการแชร์บน Social Media |
| ⚡ **Performance First** | สร้างด้วย Next.js App Router สำหรับ UX ที่รวดเร็วและลื่นไหล |

---

## 🛠️ Tech Stack

```
Frontend Framework  →  Next.js 14+ (App Router)
Language            →  TypeScript
Styling             →  Tailwind CSS
Analytics           →  Meta Pixel  +  Google Analytics 4
Cookie Management   →  js-cookie
Deployment          →  Vercel
```

---

## 🚀 เริ่มต้นใช้งาน

### สิ่งที่ต้องมี

- Node.js `18.x` ขึ้นไป
- Package manager: `npm` / `yarn` / `pnpm`

### ติดตั้งและรันโปรเจกต์

```bash
# 1. Clone repository
git clone https://github.com/puripong1st/web-fahsiam.git

# 2. เข้าไปยัง directory
cd web-fahsiam

# 3. ติดตั้ง dependencies
npm install

# 4. รัน development server
npm run dev
```

เปิดเบราว์เซอร์ไปที่ **[http://localhost:3000](http://localhost:3000)** 🎉

### คำสั่งอื่น ๆ

```bash
npm run build    # Build สำหรับ production
npm run start    # รัน production server
npm run lint     # ตรวจสอบ code quality
```

---

## 📂 โครงสร้างโปรเจกต์

```
web-fahsiam/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout + SEO Metadata
│   ├── page.tsx            # หน้าแรก
│   └── ...                 # หน้าอื่น ๆ
│
├── public/                 # Static assets
│   └── ...                 # รูปภาพปุ๋ย, พืช, ไอคอน
│
├── next.config.ts          # Next.js configuration
├── tailwind.config.*       # Tailwind CSS config
├── tsconfig.json           # TypeScript config
└── eslint.config.mjs       # ESLint rules
```

---

## 🌿 พืชที่รองรับ

- 🟡 **ทุเรียน** — พืชพรีเมียมส่งออก
- ☕ **กาแฟ** — พืชที่ต้องการสูตรปุ๋ยเฉพาะทาง
- 🌴 **ปาล์มน้ำมัน** — พืชเศรษฐกิจหลัก
- 🌱 และพืชอื่น ๆ อีกมากมาย...

---

## 🤝 Contributing

ยินดีรับทุก contribution ครับ! ไม่ว่าจะเป็น bug fixes, feature requests หรือ documentation

1. Fork repository นี้
2. สร้าง feature branch: `git checkout -b feature/amazing-feature`
3. Commit การเปลี่ยนแปลง: `git commit -m 'Add: amazing feature'`
4. Push ขึ้น branch: `git push origin feature/amazing-feature`
5. เปิด Pull Request 🚀

---

## 📄 License

Distributed under the **MIT License** — ใช้งานได้อย่างอิสระ ดู [LICENSE](LICENSE) สำหรับรายละเอียด

---

<div align="center">

Developed with ❤️ for Thai Farmers by **[Puripong](https://github.com/puripong1st)**

*ฟ้าสยาม — เพราะเกษตรกรไทยสมควรได้รับเครื่องมือที่ดีที่สุด*

</div>
