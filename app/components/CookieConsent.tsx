import { useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(true); // 👈 แสดงทุกครั้งที่รีเฟรช (สำหรับทดสอบ)
  const [showSettings, setShowSettings] = useState(false);

  // ถ้าอยากกลับไปใช้จริง: 
  // useEffect(() => {
  //   const consent = localStorage.getItem("cookieConsent");
  //   if (!consent) setVisible(true);
  // }, []);

  const acceptAll = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
  };

  const saveSettings = () => {
    const form = document.querySelector<HTMLFormElement>("#cookie-settings-form");
    if (form) {
      const formData = new FormData(form);
      const settings = {
        necessary: true,
        analytics: formData.get("analytics") === "on",
        marketing: formData.get("marketing") === "on",
      };
      localStorage.setItem("cookieConsent", JSON.stringify(settings));
    }
    setShowSettings(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Bar ด้านล่าง */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur border-t border-gray-300 shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-700">
            เว็บไซต์นี้ใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานของคุณ
            และเก็บข้อมูลการใช้งาน{" "}
            <a href="/privacy" className="underline text-sky-600">
              อ่านเพิ่มเติม
            </a>
          </p>
          <div className="flex gap-2">
            <button
              onClick={decline}
              className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
            >
              ปฏิเสธ
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
            >
              ตั้งค่าเพิ่มเติม
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
            >
              ยอมรับทั้งหมด
            </button>
          </div>
        </div>
      </div>

      {/* Modal ตั้งค่าเพิ่มเติม */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">การตั้งค่าคุกกี้</h2>
            <form id="cookie-settings-form" className="space-y-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked disabled />
                <span className="text-gray-700">คุกกี้ที่จำเป็น (จำเป็นต้องใช้)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="analytics" />
                <span className="text-gray-700">คุกกี้วิเคราะห์การใช้งาน</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="marketing" />
                <span className="text-gray-700">คุกกี้เพื่อการตลาด</span>
              </label>
            </form>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 rounded border"
              >
                ยกเลิก
              </button>
              <button
                onClick={saveSettings}
                className="px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-700"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
