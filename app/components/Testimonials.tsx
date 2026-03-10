"use client";

import { Star, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const DATA = [
  { name: "คุณสมชาย เกษตรกร", text: "ผลิตภัณฑ์คุณภาพดี ฟาร์มเติบโตชัดเจน", rating: 5, role: "เกษตรกรนาข้าว", img: "https://i.pravatar.cc/150?u=1" },
  { name: "คุณอารีย์ ฟาร์มผลไม้", text: "บริการเยี่ยม ให้คำแนะนำละเอียดและเป็นประโยชน์", rating: 5, role: "เจ้าของสวนทุเรียน", img: "https://i.pravatar.cc/150?u=2" },
  { name: "คุณวิชัย ชาวนา", text: "ได้ผลผลิตมากขึ้น ประหยัดต้นทุนจริง", rating: 4, role: "เกษตรกรวิสาหกิจชุมชน", img: "https://i.pravatar.cc/150?u=3" },
  { name: "คุณนภา ไร่ข้าวโพด", text: "ใช้แล้วดินดีขึ้นมาก สังเกตได้จากสีใบที่เขียวเข้มขึ้น", rating: 5, role: "เจ้าของไร่", img: "https://i.pravatar.cc/150?u=4" },
  { name: "ลุงบุญธรรม", text: "ส่งของไวมาก แพ็คมาดี ไม่ผิดหวังเลยครับ", rating: 5, role: "เกษตรกรรายย่อย", img: "https://i.pravatar.cc/150?u=5" },
  { name: "พี่รุ่งเรือง", text: "ระบบสั่งซื้อใช้ง่าย ราคายุติธรรมสำหรับเกษตรกร", rating: 4, role: "ตัวแทนจำหน่าย", img: "https://i.pravatar.cc/150?u=6" },
  { name: "คุณพิมพ์ใจ", text: "ชอบที่มีผู้เชี่ยวชาญคอยตอบคำถามตลอดเวลา", rating: 5, role: "สวนผักออร์แกนิก", img: "https://i.pravatar.cc/150?u=7" },
  { name: "อาคม พัฒนาการ", text: "ช่วยลดการใช้สารเคมี แต่ผลผลิตยังได้มาตรฐาน", rating: 5, role: "ที่ปรึกษาการเกษตร", img: "https://i.pravatar.cc/150?u=8" },
  { name: "ป้าสมใจ", text: "ต้นไม้แข็งแรงขึ้นเยอะเลยจ้า แนะนำบอกต่อเพื่อนบ้านไปหลายคนแล้ว", rating: 5, role: "แม่บ้านสวนครัว", img: "https://i.pravatar.cc/150?u=9" },
];

export default function Testimonials() {
  // 1. ตั้งค่า Autoplay Plugin แยกออกมาเพื่อความชัวร์
  // delay: 3000 คือ 3 วินาทีเปลี่ยนทีหนึ่ง
  const autoplayOptions = {
    delay: 3000,
    stopOnInteraction: false,
    stopOnMouseEnter: true, // หยุดเลื่อนเมื่อเอาเมาส์ไปชี้ เพื่อให้ลูกค้าอ่านได้ถนัด
  };

  // 2. เรียกใช้ Hook พร้อมใส่ Plugin ลงไปใน Array ตัวที่สอง
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      containScroll: "trimSnaps" 
    }, 
    [Autoplay(autoplayOptions)]
  );

  return (
    <section className="py-20 bg-gradient-to-b from-white to-sky-50" id="testimonials">
      <div className="max-w-7xl mx-auto px-4">
        {/* ส่วนหัวข้อ */}
        <div className="text-center mb-12">
          <p className="text-sky-700 font-semibold tracking-wide uppercase text-sm">ลูกค้าพูดถึงเรา</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">เสียงจากผู้ใช้งานจริง</h2>
          <div className="h-1.5 w-20 bg-sky-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* ตัว Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6"> {/* -ml-6 เพื่อหักล้าง gap ของการ์ด */}
            {DATA.map((t, i) => (
              <div 
                key={i} 
                className="pl-6 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
              >
                <div className="h-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between">
                  <div>
                    <Quote className="absolute top-6 right-8 w-12 h-12 text-sky-100 opacity-50" />
                    
                    {/* ดาว */}
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star 
                          key={idx} 
                          className={`w-4 h-4 ${idx < t.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} 
                        />
                      ))}
                    </div>

                    {/* ข้อความรีวิว */}
                    <p className="text-gray-600 italic leading-relaxed mb-6 relative z-10">
                      “{t.text}”
                    </p>
                  </div>

                  {/* ข้อมูลลูกค้า */}
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="relative">
                      <img 
                        src={t.img} 
                        alt={t.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-sky-100"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white" title="Verified Buyer" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 leading-none">{t.name}</div>
                      <div className="text-xs text-sky-600 font-medium mt-1">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* คำแนะนำเพิ่มเติมด้านล่าง */}
        <p className="text-center text-gray-400 text-sm mt-8">
          * ผลลัพธ์ขึ้นอยู่กับสภาพหน้างานและการใช้งานของแต่ละบุคคล
        </p>
      </div>
    </section>
  );
}