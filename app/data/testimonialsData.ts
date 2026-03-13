export type Testimonial = {
  name: string;
  text: string;
  rating: number;
  role: string;
  img: string;
};

export const TESTIMONIALS: Testimonial[] = [
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
