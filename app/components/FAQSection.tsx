"use client";

import { useState } from "react";
import AnimateIn from "./AnimateIn";

const faqs = [
  {
    question: "ปุ๋ยอินทรีย์กับปุ๋ยเคมีต่างกันอย่างไร?",
    answer: "ปุ๋ยอินทรีย์ทำจากวัสดุธรรมชาติ เช่น มูลสัตว์ เปลือกพืช ปรับปรุงโครงสร้างดินและให้ธาตุอาหารแบบค่อยเป็นค่อยไป ส่วนปุ๋ยเคมีให้ธาตุอาหารเข้มข้น ซึมซับเร็ว เหมาะกับช่วงเร่งการเจริญเติบโต ปุ๋ยอินทรีย์-เคมีของฟ้าสยามผสมผสานจุดเด่นทั้งสองแบบ"
  },
  {
    question: "ควรใช้ปุ๋ยฟ้าสยามอย่างไรให้เห็นผลดีที่สุด?",
    answer: "แนะนำให้ใช้ตามระยะการเจริญเติบโตของพืช: ระยะเร่งต้นใช้สูตร 6-3-3 หรือ 12-3-5, ระยะบำรุงดอก-ผลใช้สูตร 3-6-15, ระยะเบ่งพูใช้สูตร 0-0-30 พร้อมรองพื้นด้วยปุ๋ยอินทรีย์ OM 20% หรือ OM 25% ก่อนปลูก"
  },
  {
    question: "ปุ๋ยฟ้าสยามเหมาะกับพืชอะไรบ้าง?",
    answer: "มีสูตรปุ๋ยเฉพาะทางสำหรับพืชหลากหลายชนิด อาทิ ทุเรียน ยางพารา ข้าว มันสำปะหลัง ข้าวโพด อ้อย ปาล์มน้ำมัน กาแฟ และพืชผักทั่วไป แต่ละสูตรถูกคิดค้นให้เหมาะสมกับลักษณะการเจริญเติบโตและความต้องการธาตุอาหารของแต่ละชนิด"
  },
  {
    question: "ปุ๋ยฟ้าสยามมีการรับรองจากหน่วยงานภาครัฐหรือไม่?",
    answer: "ใช่ ปุ๋ยทุกสูตรของฟ้าสยามได้รับการรับรองจากกรมวิชาการเกษตร กระทรวงเกษตรและสหกรณ์ มีเลขทะเบียนปุ๋ยถูกต้องตามกฎหมาย มั่นใจได้ในคุณภาพและความปลอดภัย"
  },
  {
    question: "ใช้ปุ๋ยฟ้าสยามแล้วจะเห็นผลเมื่อไหร่?",
    answer: "ผลลัพธ์ขึ้นอยู่กับชนิดพืชและสภาพดิน โดยทั่วไป พืชไร่จะเห็นความแตกต่างภายใน 2-4 สัปดาห์ พืชยืนต้นเช่นทุเรียนและยางพารา จะเห็นผลชัดเจนหลังใช้ต่อเนื่อง 2-3 เดือน แนะนำใช้ตามคำแนะนำและปรับปรุงดินควบคู่กัน"
  },
  {
    question: "ปุ๋ยอินทรีย์-เคมี 6-3-3 เหมาะกับช่วงไหนของพืช?",
    answer: "สูตร 6-3-3 มีธาตุไนโตรเจนสูง (6%) เหมาะสำหรับระยะเร่งต้นและบำรุงใบ ช่วยให้พืชแตกกอดี ใบเขียวสด โตเร็ว ใช้ได้ทั้งพืชไร่และพืชยืนต้นในช่วงแรกของการปลูก"
  },
  {
    question: "ซื้อปุ๋ยฟ้าสยามได้ที่ไหน? มีบริการจัดส่งไหม?",
    answer: "สามารถสั่งซื้อได้ทาง Facebook โดยตรง หรือติดต่อสอบถามผ่านเบอร์โทร 082-529-8388 มีบริการจัดส่งทั่วประเทศ สอบถามโปรโมชั่นและค่าขนส่งเพิ่มเติมได้ที่ช่องทางติดต่อของเรา"
  },
  {
    question: "เกษตรกรมือใหม่ควรเริ่มต้นใช้ปุ๋ยอย่างไร?",
    answer: "แนะนำให้เริ่มจากการรองพื้นดินด้วยปุ๋ยอินทรีย์ OM 20% หรือ OM 25% เพื่อปรับปรุงโครงสร้างดิน จากนั้นใช้ปุ๋ยอินทรีย์-เคมีตามระยะพืช เริ่มจากสูตร 6-3-3 หรือ 12-3-5 สำหรับเร่งต้น ติดต่อเราเพื่อขอคำแนะนำเฉพาะพืชที่ต้องการปลูก"
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-sky-50" id="faq">
      <div className="max-w-[1400px] mx-auto">
        <AnimateIn>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              คำถามที่พบบ่อย
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
              ข้อสงสัยเกี่ยวกับ<span className="text-emerald-600">ปุ๋ยฟ้าสยาม</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              รวมคำถามที่เกษตรกรมือใหม่และมืออาชีพสอบถามบ่อย พร้อมคำตอบจากผู้เชี่ยวชาญ
            </p>
          </div>
        </AnimateIn>

        <AnimateIn animation="fade-in" delay="0.1s">
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? "border-emerald-300 shadow-lg shadow-emerald-100"
                    : "border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-200"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index
                        ? "bg-emerald-500 text-white rotate-180"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* Contact CTA */}
        <AnimateIn animation="fade-in" delay="0.2s">
          <div className="mt-10 text-center">
            <p className="text-gray-500 mb-4">ยังมีข้อสงสัยเพิ่มเติม?</p>
            <a
              href="https://www.facebook.com/share/p/1ArBAZtMvr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-sky-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              ติดต่อสอบถามเพิ่มเติม
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
