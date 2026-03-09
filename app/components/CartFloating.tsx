import { useState } from "react";

export default function CartFloating() {
  const [isOpen, setIsOpen] = useState(false);

  // 🛒 mock data สินค้าที่เลือก
  const cartItems = [
    { id: 1, name: "ปุ๋ยอินทรีย์", price: 250, qty: 2 },
    { id: 2, name: "เมล็ดพันธุ์ข้าว", price: 120, qty: 1 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      {/* Floating Button with Hover Scale & Badge */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-sky-600 text-white rounded-full p-4 shadow-lg hover:bg-sky-700 hover:scale-110 transition-transform duration-200 z-50 "
      >
        🛒
        {/* Badge แสดงจำนวนสินค้า */}
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
            {cartCount}
          </span>
        )}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">ตะกร้าสินค้า</h2>

            {cartItems.length > 0 ? (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.qty} × {item.price} บาท
                      </p>
                    </div>
                    <span className="font-semibold">
                      {item.qty * item.price} บาท
                    </span>
                  </div>
                ))}

                <div className="flex justify-between mt-4 font-bold text-lg">
                  <span>รวม</span>
                  <span>{total} บาท</span>
                </div>

                <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                  ดำเนินการสั่งซื้อ
                </button>
              </div>
            ) : (
              <p className="text-gray-500 text-center">ยังไม่มีสินค้าในตะกร้า</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
