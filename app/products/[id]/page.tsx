import { MOCK_PRODUCTS } from "../../data/productsdetail";
import Link from "next/link";

// ใช้ p1 ตามชื่อโฟลเดอร์ของคุณ
export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800">ไม่พบสินค้าที่คุณต้องการ</h2>
        <Link href="/products" className="mt-4 inline-block text-emerald-600 hover:underline">
          กลับไปหน้าสินค้า
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* ส่วนหัวสีเขียว (Banner) */}
      <div className="bg-[#007a33] text-white py-6 md:py-10 text-center">
        <h1 className="text-2xl md:text-4xl font-bold px-4">
          {product.name} 50 กิโลกรัม
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* รูปภาพสินค้า */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover" 
            />
          </div>

          {/* รายละเอียดราคาและประโยชน์ */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-[#007a33] leading-tight">
              {product.name} <br /> 50 กิโลกรัม
            </h2>
            <div className="mt-4 flex items-baseline gap-4">
              <span className="text-4xl font-black text-blue-800">
                ฿ {product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through">
                  จากปกติ ฿{product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* ดึงข้อมูล "ประโยชน์" มาแสดงแบบอัตโนมัติ */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#007a33] mb-4">ประโยชน์</h3>
              <ul className="space-y-2 text-gray-700">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1">🏆</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ปุ่มสั่งซื้อ Facebook */}
            <a 
                href="https://www.facebook.com/share/p/1ArBAZtMvr/?mibextid=wwXIf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-8 bg-[#1877F2] text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors w-full md:w-max shadow-lg cursor-pointer"
                  >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  สั่งซื้อผ่าน Facebook
                </a>
            
            <Link href="/conproduct" className="mt-6 text-gray-500 hover:text-emerald-600 text-sm font-medium transition-colors">
              ← กลับไปเลือกสินค้าอื่น
            </Link>
          </div>
        </div>

        {/* ส่วนล่าง: วิธีใช้ ดึงข้อมูลแบบอัตโนมัติ */}
        <div className="mt-16 bg-[#f0f9f4] rounded-3xl p-8 md:p-12 border border-emerald-100">
          <h3 className="text-2xl font-bold text-[#007a33] mb-8 border-b-2 border-emerald-200 pb-2 inline-block">
            วิธีใช้
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-12">
            {product.usages.map((usageGroup, index) => (
              <div key={index} className="space-y-3">
                <h4 className="text-lg font-extrabold text-[#007a33] border-b border-emerald-100 pb-1">
                  {usageGroup.groupName}
                </h4>
                <div className="space-y-2">
                  {usageGroup.items.map((item, idx) => (
                    <div key={idx}>
                      <p className="font-bold text-gray-800">{item.label}</p>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}