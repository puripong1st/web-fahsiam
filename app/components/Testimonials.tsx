import { Star } from "lucide-react";

const DATA = [
  { name: "คุณสมชาย เกษตรกร", text: "ผลิตภัณฑ์คุณภาพดี ฟาร์มเติบโตชัดเจน", rating: 5 },
  { name: "คุณอารีย์ ฟาร์มผลไม้", text: "บริการเยี่ยม ให้คำแนะนำละเอียดและเป็นประโยชน์", rating: 5 },
  { name: "คุณวิชัย ชาวนา", text: "ได้ผลผลิตมากขึ้น ประหยัดต้นทุนจริง", rating: 4 },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-sky-50" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sky-700 font-medium">ลูกค้าพูดถึงเรา</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-1">เสียงจากผู้ใช้งานจริง</h2>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {DATA.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-left">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className={`w-5 h-5 ${idx < t.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <p className="text-gray-700 mb-4">“{t.text}”</p>
              <div className="font-semibold text-gray-900">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}