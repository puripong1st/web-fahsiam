// src/pages/Contact.tsx
"use client";
import { FiPhone, FiMail, FiMapPin, FiClock, FiChevronDown } from "react-icons/fi";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { SiLine } from "react-icons/si";
import { useState } from "react";
import Image from 'next/image';
import AnimateIn from '../components/AnimateIn';

export default function Contact() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <div className="bg-[#f4f9f9] min-h-screen pb-16">
      {/* HERO (คงไว้ตามเดิม หรือลบออกได้หากไม่ต้องการ) */}
      <section className="relative">
        <div className="relative w-full h-48 md:h-80 overflow-hidden">
          <Image 
            src="/background/background1.webp" 
            alt="แผนที่และข้อมูลติดต่อฟ้าสยาม SiamAgriTech" 
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-x-0 bottom-6 md:bottom-10">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow animate-fade-in-up">ติดต่อเรา</h1>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        
        {/* Top Section: Contact & Socials */}
        <AnimateIn className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Row 1: Contact Info */}
          <InfoCard icon={<FiPhone />} title="โทรศัพท์" value="082-529-8388" href="tel:082-529-8388"/>
          <InfoCard icon={<FiMail />} title="อีเมล" value="admin@smartagritech.co.th" href="mailto:admin@smartagritech.co.th" />
          <InfoCard icon={<FiClock />} title="เวลาทำการ" value="จ.–ศ. 08:30–17:30 น." />

          {/* Row 2: Social Media */}
          <a href="https://lin.ee/Xy0naat" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 h-[72px] rounded-2xl border border-gray-300 bg-white shadow-sm hover:border-green-400 hover:bg-green-50 transition">
            <SiLine className="text-[#00B900] text-3xl" /> <span className="text-lg font-medium text-gray-700">LINE</span>
          </a>
          <a href="https://www.facebook.com/share/19UpsyudBU/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 h-[72px] rounded-2xl border border-gray-300 bg-white shadow-sm hover:border-blue-400 hover:bg-blue-50 transition">
            <FaFacebook className="text-[#1877F2] text-3xl" /> <span className="text-lg font-medium text-gray-700">Facebook</span>
          </a>
          <a href="https://www.tiktok.com/@fahsiam0" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 h-[72px] rounded-2xl border border-gray-300 bg-white shadow-sm hover:border-gray-400 hover:bg-gray-50 transition">
            <FaTiktok className="text-black text-3xl" /> <span className="text-lg font-medium text-gray-700">TikTok</span>
          </a>
        </AnimateIn>

        {/* Bottom Section: Map & FAQ */}
        <AnimateIn className="grid lg:grid-cols-2 gap-6" delay="0.1s">
          
          {/* Left Column: Office & Map */}
          <section className="flex flex-col h-[500px] lg:h-auto min-h-[500px] rounded-2xl overflow-hidden border border-gray-300 bg-white shadow-sm">
            <div className="p-6 shrink-0">
              <h3 className="text-xl font-bold text-gray-900">สำนักงานของเรา</h3>
              <p className="mt-1 text-gray-500 text-sm">กรุงเทพฯ ประเทศไทย</p>
              <div className="mt-4 flex items-start gap-2 text-sm text-gray-700">
                <FiMapPin className="mt-0.5 shrink-0 text-sky-500 text-lg" />
                <span>71/19 ซอย จรัญสนิทวงศ์ 45 แขวงอรุณอมรินทร์ เขตบางกอกน้อย กรุงเทพมหานคร 10700</span>
              </div>
            </div>
            {/* Map fills the remaining space */}
            <div className="relative w-full flex-1">
              <iframe
                title="Google Map"
                className="absolute inset-0 w-full h-full"
                src="https://maps.google.com/maps?q=71/19%20ซอย%20จรัญสนิทวงศ์%2045%20กรุงเทพมหานคร&t=&z=15&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          </section>

          {/* Right Column: FAQ & CTA */}
          <section className="flex flex-col gap-6">
            
            {/* FAQ Card */}
            <div className="rounded-2xl border border-gray-300 bg-white shadow-sm p-6 flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">คำถามที่พบบ่อย</h3>
              <ul className="divide-y divide-gray-100">
                {FAQ_LIST.map((f, i) => (
                  <li key={i}>
                    <button
                      className="w-full py-4 flex items-center justify-between text-left hover:text-sky-600 transition-colors"
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    >
                      <span className="font-semibold text-gray-800 text-sm pr-4">{f.q}</span>
                      <FiChevronDown className={`shrink-0 text-gray-400 text-lg transition-transform duration-300 ${faqOpen === i ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${faqOpen === i ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0"}`}>
                      <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">{f.a}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Banner */}
            <div className="rounded-2xl shadow-sm bg-gradient-to-r from-sky-500 to-cyan-400 p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shrink-0">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold">ต้องการคำปรึกษาเฉพาะด้าน?</h3>
                <p className="text-white/90 mt-1.5 text-xs sm:text-sm">
                  ทีมผู้เชี่ยวชาญด้านการเกษตรของเราพร้อมช่วยวางแผนการปลูก และแนะนำผลิตภัณฑ์ที่เหมาะสมกับฟาร์มของคุณที่สุด
                </p>
              </div>
              <a href="tel:082-529-8388" className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-sky-500 shadow-sm hover:bg-gray-50 hover:scale-105 transition-all">
                <FiPhone className="text-lg" /> <span className="text-sm">โทรหาเราเลย</span>
              </a>
            </div>

          </section>
        </AnimateIn>
      </main>
    </div>
  );
}

/* ========== small components & data ========== */
function InfoCard({
  icon, title, value, href,
}: { icon: React.ReactNode; title: string; value: string; href?: string }) {
  const content = (
    <div className="h-[72px] flex items-center gap-4 rounded-2xl border border-gray-300 bg-white px-5 shadow-sm hover:border-sky-300 hover:bg-sky-50 transition-all group">
      <div className="flex-shrink-0 text-sky-400 text-2xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] md:text-xs font-medium text-gray-400 mb-0.5">{title}</span>
        <span className="text-sm md:text-base font-bold text-gray-800 leading-none">{value}</span>
      </div>
    </div>
  );
  return href ? <a href={href} className="block w-full" target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{content}</a> : content;
}

const FAQ_LIST = [
  { q: "ใช้เวลาตอบกลับกี่ชั่วโมง?", a: "โดยทั่วไปภายใน 24 ชั่วโมงในวันทำการ และเร็วกว่าในเวลาทำการ" },
  { q: "ขอใบเสนอราคาได้อย่างไร?", a: "กรอกแบบฟอร์มพร้อมระบุสินค้า/ปริมาณ ทีมขายจะส่งใบเสนอราคาให้ทางอีเมล" },
  { q: "มีบริการจัดส่งทั่วประเทศหรือไม่?", a: "มีครับ จัดส่งครอบคลุมทั่วประเทศ พร้อมตัวเลือกขนส่งตามพื้นที่ของคุณ" },
];