// ดึง Component Contact ที่คุณสร้างไว้มาใช้งาน (ใช้ ../ เพื่อถอยออกจากโฟลเดอร์ contact 1 ขั้น)
import Contact from "./Contact";

export default function ContactPage() {
  return (
    <main>
      <Contact />
    </main>
  );
}