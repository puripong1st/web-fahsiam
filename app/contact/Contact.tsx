// src/pages/Contact.tsx
"use client";
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiChevronDown } from "react-icons/fi";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { SiLine } from "react-icons/si";
import { useState } from "react";

/* ⬇️ เพิ่มส่วนเชื่อม Firestore */
import { db } from "../lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function Contact() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  // ✅ state ฟอร์ม + สถานะส่ง
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot กันบอท
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<"ok" | "err" | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrMsg(null);
    setSent(null);

    // กันบอท: ถ้า honeypot มีค่า ไม่ทำอะไร
    if (form.website) return;

    if (!form.name.trim() || !form.phone.trim() || !form.subject.trim() || !form.message.trim()) {
      setErrMsg("กรุณากรอกข้อมูลที่จำเป็นให้ครบ");
      setSent("err");
      return;
    }

    try {
      setSending(true);
      await addDoc(collection(db, "contacts"), {
        name: form.name.trim(),
        phone: form.phone.trim() || null,
        email: form.email.trim() || null,
        subject: form.subject.trim() || null,
        message: form.message.trim() || null,
        status: "new",
        createdAt: serverTimestamp(),
      });
      setSent("ok");
      setForm({ name: "", phone: "", email: "", subject: "", message: "", website: "" });
    } catch (err: any) {
      setErrMsg(err?.message || "ส่งข้อความไม่สำเร็จ");
      setSent("err");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="bg-gradient-to-b from-white via-sky-50/40 to-white min-h-screen">
      {/* HERO */}
      <section className="relative">
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img src="/background/background1.png" alt="ข่าวสาร" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-x-0 bottom-6 md:bottom-10">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow">ติดต่อเรา</h1>
            <p className="text-white/90 text-sm md:text-base">เรายินดีให้คำปรึกษาและพร้อมช่วยเหลือคุณเสมอ</p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-10">
        {/* Top cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard icon={<FiPhone />} title="โทรศัพท์" value="082-529-8388" href="tel:082-529-8388"/>
          <InfoCard icon={<FiMail />} title="อีเมล" value="Smarttech.ioniq@gmail.com" href="mailto:Smarttech.ioniq@gmail.com" />
          <InfoCard icon={<FiClock />} title="เวลาทำการ" value="จ.–ศ. 08:30–17:30 น." />
        </div>

        {/* Grid: form + map */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Form */}
          <section className="lg:col-span-7">
            <div className="rounded-2xl border border-gray-300 bg-white shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900">ส่งข้อความถึงเรา</h2>
              <p className="text-gray-600 text-sm mt-1">ทีมงานจะติดต่อกลับโดยเร็วที่สุด</p>

              {/* แจ้งสถานะ */}
              {sent === "ok" && (
                <div className="mt-4 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-700 p-3 text-sm">
                  ส่งข้อความเรียบร้อยแล้ว ขอบคุณครับ 🙌
                </div>
              )}
              {sent === "err" && (
                <div className="mt-4 rounded-lg border border-rose-300 bg-rose-50 text-rose-700 p-3 text-sm">
                  {errMsg || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"}
                </div>
              )}

              <form onSubmit={onSubmit} className="mt-5 grid gap-4">
                {/* honeypot (ซ่อน) */}
                <input
                  name="website"
                  value={form.website}
                  onChange={onChange}
                  className="hidden"
                  autoComplete="off"
                  tabIndex={-1}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="ชื่อ-นามสกุล">
                    <input
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      required
                      placeholder="เช่น สมชาย ใจดี"
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                    />
                  </Field>

                  <Field label="เบอร์โทร">
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      required
                      placeholder="+66"
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                    />
                  </Field>
                </div>

                <Field label="อีเมล (ถ้ามี)">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@email.com"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </Field>

                <Field label="หัวข้อ">
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    required
                    placeholder="เรื่องที่ต้องการติดต่อ"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </Field>

                <Field label="ข้อความ">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    required
                    rows={5}
                    placeholder="พิมพ์ข้อความของคุณ…"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </Field>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">ข้อมูลของคุณจะถูกเก็บเป็นความลับตามนโยบายความเป็นส่วนตัว</p>
                  <button
                    disabled={sending}
                    className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
                  >
                    <FiSend /> {sending ? "กำลังส่ง…" : "ส่งข้อความ"}
                  </button>
                </div>
              </form>

              {/* Social buttons */}
              <div className="mt-6 border-t border-gray-300 pt-4">
                <p className="text-sm text-gray-600 mb-3">หรือพูดคุยกับเราได้ที่</p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://lin.ee/Xy0naat" className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 hover:bg-green-50">
                    <SiLine className="text-green-500" /> LINE
                  </a>
                  <a href="https://www.facebook.com/share/19UpsyudBU/" className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 hover:bg-sky-50">
                    <FaFacebook className="text-sky-600" /> Facebook
                  </a>
                  <a href="https://www.tiktok.com/@fhasiam_rerun" className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 hover:bg-gray-50">
                    <FaTiktok /> TikTok
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Office + Map */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-gray-300 bg-white shadow-sm">
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">สำนักงานของเรา</h3>
                <p className="mt-1 text-gray-600 text-sm">กรุงเทพฯ ประเทศไทย</p>
                <div className="mt-3 flex items-start gap-2 text-sm text-gray-700">
                  <FiMapPin className="mt-0.5 shrink-0 text-sky-600" />
                  <span>71/19 ซอย จรัญสนิทวงศ์ 45 แขวงอรุณอมรินทร์ เขตบางกอกน้อย กรุงเทพมหานคร 10700</span>
                </div>
              </div>
              <div className="h-64 md:h-80">
                <iframe
                  title="Google Map"
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.010925584381!2d100.47172937509066!3d13.778214586616384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e299007a315291%3A0xf7d8dfe650b3ad9b!2z4Lia4Lij4Li04Lip4Lix4LiX4Lib4Li44LmL4Lii4Lif4LmJ4Liy4Liq4Lii4Liy4Lih!5e0!3m2!1sth!2sth!4v1758527153037!5m2!1sth!2sth"
                  loading="lazy"
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>
            </div>

            {/* FAQ */}
            <div className="rounded-2xl border border-gray-300 bg-white shadow-sm p-5">
              <h3 className="text-lg font-bold text-gray-900">คำถามที่พบบ่อย</h3>
              <ul className="mt-3 divide-y divide-gray-300">
                {FAQ_LIST.map((f, i) => (
                  <li key={i}>
                    <button
                      className="w-full py-3 flex items-center justify-between text-left hover:text-sky-700"
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    >
                      <span className="font-medium">{f.q}</span>
                      <FiChevronDown className={`transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`overflow-hidden transition-all  ${faqOpen === i ? "max-h-40 pb-3" : "max-h-0"}`}>
                      <p className="text-sm text-gray-600">{f.a}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* CTA bar */}
        <div className="rounded-2xl border bg-gradient-to-br from-sky-600 to-cyan-500 p-6 md:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-extrabold">ต้องการคำปรึกษาเฉพาะด้าน?</h3>
            <p className="text-white/90">ทีมผู้เชี่ยวชาญพร้อมช่วยวางแผนการปลูกและผลิตภัณฑ์ที่เหมาะกับฟาร์มของคุณ</p>
          </div>
          <a href="tel:082-529-8388" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-sky-700 hover:bg-white/90">
            <FiPhone /> โทรหาเรา
          </a>
        </div>
      </main>
    </div>
  );
}

/* ========== small components & data ========== */
function InfoCard({
  icon, title, value, href,
}: { icon: React.ReactNode; title: string; value: string; href?: string }) {
  const content = (
    <div className="rounded-2xl border border-gray-300 bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-700 text-xl">
          {icon}
        </div>
        <div>
          <p className="text-xs text-gray-500">{title}</p>
          <p className="font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{content}</a> : content;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      {children}
    </label>
  );
}

const FAQ_LIST = [
  { q: "ใช้เวลาตอบกลับกี่ชั่วโมง?", a: "โดยทั่วไปภายใน 24 ชั่วโมงในวันทำการ และเร็วกว่าในเวลาทำการ" },
  { q: "ขอใบเสนอราคาได้อย่างไร?", a: "กรอกแบบฟอร์มพร้อมระบุสินค้า/ปริมาณ ทีมขายจะส่งใบเสนอราคาให้ทางอีเมล" },
  { q: "มีบริการจัดส่งทั่วประเทศหรือไม่?", a: "มีครับ จัดส่งครอบคลุมทั่วประเทศ พร้อมตัวเลือกขนส่งตามพื้นที่ของคุณ" },
];
