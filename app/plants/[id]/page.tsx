"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { plants } from "../../data/datafame";

export default function PlantDetail() {
  const params = useParams();
  const id = params?.id as string;

  // ค้นหาข้อมูลพืชจาก id ใน datafame.ts
  const plant = useMemo(() => {
    return plants.find((p) => p.id === id);
  }, [id]);

  // สร้างสถานะสำหรับ Checkbox ตามจำนวนขั้นตอนการปลูก
  const [checked, setChecked] = useState<boolean[]>([]);

  // อัปเดตจำนวน Checkbox เมื่อข้อมูล plant มาถึง
  useEffect(() => {
    if (plant) {
      setChecked(new Array(plant.howToGrow.length).fill(false));
    }
  }, [plant]);

  // กรณีไม่พบข้อมูล
  if (!plant) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-red-600 text-xl font-bold">ไม่พบข้อมูลพืชที่เลือก (ID: {id})</p>
        <Link href="/plants" className="text-sky-600 underline mt-4 inline-block">
          ← กลับไปหน้าเลือกพืช
        </Link>
      </div>
    );
  }

  const toggleStep = (i: number) =>
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });

  const progress = checked.length 
    ? Math.round((checked.filter(Boolean).length / checked.length) * 100) 
    : 0;

  // หา “ขั้นถัดไปที่ยังไม่ติ๊ก”
  const nextStepIndex = checked.findIndex((v) => !v);

  // คีย์ช่วงเวลาที่สอดคล้องกับลำดับ Checkbox
  const stepKeys = ["prepare", "plant", "water", "feed", "harvest"];

  // คำแนะนำที่จะแสดงตามขั้นตอนปัจจุบัน
  const currentGuide = useMemo(() => {
    if (nextStepIndex === -1) return null; // ทำครบทุกขั้นตอนแล้ว
    const key = stepKeys[nextStepIndex];
    return plant.phaseGuides.find((g) => g.key === key) || null;
  }, [nextStepIndex, plant]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/40 to-white">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        {/* เปลี่ยน to เป็น href */}
        <Link href="/plants" className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1">
          ← กลับหน้าแรก
        </Link>

        <div className="mt-8 grid md:grid-cols-2 gap-10 items-start">
          {/* รูปภาพพืช */}
          <div className="relative aspect-square overflow-hidden rounded-3xl shadow-lg border-4 border-white">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-full object-cover transition hover:scale-105 duration-500"
            />
          </div>

          {/* รายละเอียดพืช */}
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-3">
              คู่มือการเพาะปลูก
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">{plant.name}</h1>
            <p className="mt-4 text-gray-600 leading-relaxed text-lg">{plant.desc}</p>

            <h2 className="mt-8 text-xl font-bold text-gray-800 flex items-center gap-2">
              🌱 ขั้นตอนการทำงานของคุณ
            </h2>
            <div className="mt-4 space-y-3">
              {plant.howToGrow.map((s, i) => (
                <label 
                  key={i} 
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    checked[i] ? "bg-green-50 border-green-200" : "bg-white border-gray-200 hover:border-green-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked[i] || false}
                    onChange={() => toggleStep(i)}
                    className="h-5 w-5 text-green-600 rounded-md border-gray-300 focus:ring-green-500"
                  />
                  <span className={`text-gray-700 ${checked[i] ? "line-through opacity-50" : "font-medium"}`}>
                    {s}
                  </span>
                </label>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-700">ความสำเร็จ</span>
                <span className="text-sm font-bold text-green-600">{progress}%</span>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ====== แผงคำแนะนำแบบไดนามิก ====== */}
        <div className="mt-12">
          <hr className="mb-10 border-gray-200" />
          
          {nextStepIndex === -1 ? (
            <div className="rounded-3xl border-2 border-emerald-100 bg-emerald-50 p-8 text-center shadow-sm">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-emerald-800">ดูแลและเตรียมเก็บเกี่ยว</h3>
              <p className="mt-2 text-emerald-700 max-w-2xl mx-auto">
                ยินดีด้วย! คุณดำเนินการตามขั้นตอนพื้นฐานครบแล้ว อย่าลืมสำรวจโรคและแมลงศัตรูพืชสม่ำเสมอ และเตรียมวางแผนการตลาดล่วงหน้า
              </p>
            </div>
          ) : currentGuide ? (
            <div className="rounded-3xl bg-white p-8 border border-gray-200 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-green-500"></div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 mb-6">
                <div>
                  <p className="text-sm font-bold text-green-600 uppercase tracking-wider">ขั้นถัดไปที่คุณต้องทำ</p>
                  <h3 className="text-2xl font-extrabold text-gray-900 mt-1">
                    {currentGuide.title}
                  </h3>
                </div>
                <div className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm">
                  ช่วงเวลา: {currentGuide.when}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                    ✅ สิ่งที่ต้องปฏิบัติ
                  </h4>
                  <ul className="space-y-2">
                    {currentGuide.actions.map((a, i) => (
                      <li key={i} className="flex gap-2 text-gray-600">
                        <span className="text-green-500">•</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  {currentGuide.fertilizers?.length ? (
                    <div>
                      <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                        🧪 ปุ๋ยที่แนะนำ
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentGuide.fertilizers.map((f, i) => (
                          <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium border border-blue-100">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {currentGuide.care?.length ? (
                    <div>
                      <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                        🛡️ การดูแลเพิ่มเติม
                      </h4>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        {currentGuide.care.map((c, i) => <li key={i}>- {c}</li>)}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>

              {currentGuide.note && (
                <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-800 text-sm">
                  <strong>💡 ข้อแนะนำเพิ่มเติม:</strong> {currentGuide.note}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}