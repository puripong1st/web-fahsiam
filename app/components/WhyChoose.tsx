// src/components/WhyChoose.tsx

import { plants } from "../data/datafame"; 
import Link from "next/link";
import Image from 'next/image'
import AnimateIn from './AnimateIn'

export default function WhyChoose() {
  return (
    <section className="py-16 bg-gray-50" id="why">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <AnimateIn>
          <p className="text-sky-700 font-medium">เริ่มจากการเลือกพืช</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-1">เลือกพืชและวางแผนการปลูก</h2>
        </AnimateIn>

        <AnimateIn className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" animation="fade-in" delay="0.1s">
          {plants.slice(0, 6).map((p) => (
            <Link
              href={`/plants/${p.id}`} // เปลี่ยนจาก to เป็น href
              key={p.id}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-300 flex flex-col"
            >
              <div className="relative">
                <div className="aspect-[4/3] w-full">
                  {/* จุดที่แก้ไข: เพิ่ม width={400} และ height={300} ให้สอดคล้องกับ aspect-[4/3] */}
                  <Image 
                    src={p.image} 
                    alt={p.name} 
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition group-hover:scale-[1.02]" 
                  />
                </div>
                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-sky-700/90 px-3 py-1 text-[11px] font-semibold text-white shadow">
                    {p.howToGrow?.length || 0} ขั้นตอน
                  </span>
                  <span className="rounded-full bg-sky-600/90 px-3 py-1 text-[11px] font-semibold text-white shadow">
                    ปุ๋ย {p.fertilizer?.length || 0} รายการ
                  </span>
                </div>
              </div>

              <div className="p-4 text-left">
                <h3 className="font-bold text-gray-900">{p.name}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{p.desc}</p>
                <div className="mt-3 text-right">
                  <span className="text-sky-700 text-sm font-semibold">ดูรายละเอียด →</span>
                </div>
              </div>
            </Link>
          ))}
        </AnimateIn>

        <AnimateIn className="mt-8" delay="0.2s">
          <Link href="/plants" className="inline-flex items-center rounded-xl border px-5 py-2.5 font-semibold text-sky-700 hover:bg-sky-50">
            ดูพืชทั้งหมด →
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}