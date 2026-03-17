import Link from "next/link";
import { Check, Leaf, Sprout, Factory } from "lucide-react";
import Image from 'next/image'
import AnimateIn from './AnimateIn'

const STEPS = [
  {
    icon: <Leaf className="w-5 h-5" />,
    title: "แนะนำการทำสวน",
    desc: "เริ่มต้นไว เข้าใจง่าย พร้อมตัวอย่างจริง",
  },
  {
    icon: <Sprout className="w-5 h-5" />,
    title: "เลือกพืช/วางแผน",
    desc: "ระบบช่วยเลือกตามพื้นที่ ฤดูกาล และงบ",
  },
  {
    icon: <Factory className="w-5 h-5" />,
    title: "ดูแล–เก็บเกี่ยว",
    desc: "แจ้งเตือนรดน้ำ ใส่ปุ๋ย และช่วงเก็บเกี่ยว",
  },
];

export default function About() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#e8f7ee_0%,_#ffffff_35%,_#e6f0ff_100%)]" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[url('/image/pattern/dots.svg')] opacity-10" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <AnimateIn>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-semibold">
                เกี่ยวกับเรา
              </span>
              <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-relaxed">
                ปุ๋ยอินทรีย์พืชมาตรฐานโรงงาน{" "}
                <span className="text-emerald-600">ผ่านการรับรองจากกรมวิชาการเกษตร</span>
              </h2>
              <p className="mt-3 text-gray-700 max-w-2xl leading-relaxed">
                ปุ๋ยอินทรีย์ผง OM 25%, ปุ๋ยอินทรีย์เม็ด OM 20%, ปุ๋ยอินทรีย์เคมี 6-3-3, ปุ๋ยอินทรีย์เคมี 12-3-5, ปุ๋ยอินทรีย์เคมี 3-6-15 และปุ๋ยอินทรีย์เคมี 0-0-30
              </p>

              <ul className="mt-6 space-y-2 text-gray-800">
                {[
                  "ใช้นวัตกรรมและงานวิจัยที่เชื่อถือได้",
                  "ผลผลิตสม่ำเสมอ คุณภาพดี ลดต้นทุน",
                  "ใช้แล้วเห็นผลจริง",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 text-sky-600" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white shadow-lg hover:bg-sky-700"
                >
                  ติดต่อเรา
                </Link>
                <Link
                  href="/plants"
                  className="inline-flex items-center rounded-xl border px-5 py-3 font-semibold text-sky-700 hover:bg-sky-50"
                >
                  เริ่มเลือกพืช →
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {STEPS.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-gray-300 bg-white/70 backdrop-blur-md p-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-700 mb-2">
                      {s.icon}
                    </div>
                    <div className="font-semibold text-gray-900">{s.title}</div>
                    <div className="text-xs text-gray-600 mt-1">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          <AnimateIn className="mx-auto w-full max-w-sm" animation="scale-in" delay="0.15s">
            <div className="relative z-10 mx-auto max-w-sm overflow-hidden rounded-[2rem] border border-emerald-100/80 bg-white/70 shadow-xl">
              <Image
                src="/gg1.png"
                alt="เกษตรกรไทยใช้ปุ๋ยตราฟ้าสยาม เพิ่มผลผลิตยั่งยืน"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
              <div className="absolute right-3 top-3 rounded-2xl border border-sky-200/70 bg-white/95 px-4 py-2.5 text-sky-700 shadow-lg backdrop-blur md:right-4 md:top-4 md:px-5 md:py-3">
                <div className="text-3xl leading-none font-extrabold tracking-tight md:text-4xl">
                  <p className="text-center">20</p>
                </div>
                <div className="mt-1 text-xs font-semibold opacity-90 md:text-sm">
                  ปีแห่งประสบการณ์ 🌱
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}