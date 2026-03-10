# 🌱 Fah Siam - Smart Agriculture Solution

**Fah Siam (ฟ้าสยาม)** คือเว็บแอปพลิเคชันสมัยใหม่ที่พัฒนาด้วย Next.js 14+ ออกแบบมาเพื่อช่วยเหลือเกษตรกรไทยในการบริหารจัดการการใช้ปุ๋ยอย่างมีประสิทธิภาพ ระบบจะช่วยวิเคราะห์และแนะนำสูตรปุ๋ยที่เหมาะสมตามช่วงเวลาและชนิดของพืช เพื่อเพิ่มผลผลิตอย่างยั่งยืน

---

## ✨ Key Features

* **Smart Fertilizer Scheduler**: ระบบแนะนำสูตรปุ๋ยรายเดือนที่ปรับเปลี่ยนตามชนิดพืช เช่น ทุเรียน, กาแฟ, และปาล์มน้ำมัน
* **Interactive Agriculture Calendar**: ปฏิทินอัจฉริยะแสดงพืชในฤดูกาลและอัตราการใช้ปุ๋ยที่แม่นยำ
* **PDPA Compliant**: ระบบจัดการคุกกี้ (Cookie Consent) ที่สอดคล้องกับกฎหมายคุ้มครองข้อมูลส่วนบุคคล
* **Ads & Analytics Integrated**: รองรับการติดตามข้อมูลผ่าน Meta (Facebook) Pixel และ Google Analytics 4 พร้อมระบบ Console Log ตรวจสอบการทำงาน
* **SEO Optimized**: ติดตั้ง Metadata API สำหรับการจัดลำดับบน Search Engine และการแชร์ลง Social Media

## 🛠️ Tech Stack

* **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Tracking**: Meta Pixel, Google Analytics 4, js-cookie

## 🚀 Getting Started

### 1. Prerequisites
* Node.js 18.x หรือสูงกว่า
* npm / yarn / pnpm

### 2. Installation

# Clone the repository
git clone [https://github.com/puripong1st/web-fahsiam.git](https://github.com/puripong1st/web-fahsiam.git)

# Navigate to the project directory
cd web-fahsiam

# Install dependencies
npm install

### 3. Running the Development Server
Bash
npm run dev
เปิด http://localhost:3000 บนเบราว์เซอร์เพื่อดูผลลัพธ์

### 📂 Project Structure
/app: จัดการ Routing, SEO Metadata และ Page ต่างๆ

/components: คอมโพเนนต์หลัก เช่น CalendarWidget, AdTracker, และ CookieBanner

/public: เก็บ Asset ต่างๆ เช่น รูปภาพปุ๋ยและพืชในฤดูกาล

### 🛡️ License
Distributed under the MIT License.

Developed with ❤️ for Thai Farmers by Puripong
```bash