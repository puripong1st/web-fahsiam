import { MOCK_PRODUCTS } from "@/app/data/product2";
import Link from "next/link";

// ใช้ async function เพื่อรองรับการรับค่า params ใน Next.js 15
export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 1. รอรับค่า id จาก params
  const { id } = await params;

  // 2. ค้นหาสินค้าจากข้อมูล MOCK
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  // 3. กรณีไม่พบสินค้า
  if (!product) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800">ไม่พบสินค้าที่คุณต้องการ</h2>
        <Link href="/" className="mt-4 inline-block text-emerald-600 hover:underline">
          กลับหน้าหลัก
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
        {/* ส่วนบน: รูปภาพและข้อมูลราคา/ประโยชน์ */}
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

            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#007a33] mb-4">ประโยชน์</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">🏆 ช่วยบำรุงต้นและใบ</li>
                <li className="flex items-center gap-2">🏆 ช่วยให้รากแข็งแรงขึ้น</li>
                <li className="flex items-center gap-2">🏆 ช่วยให้พืชแตกยอดใหม่</li>
                <li className="flex items-center gap-2">🏆 ช่วยให้ต้นพืชทนโรคและสภาพแวดล้อม</li>
                <li className="flex items-center gap-2">🏆 ช่วยขยายใบและเพิ่มการสังเคราะห์แสง</li>
              </ul>
            </div>

            {/* ปุ่มสั่งซื้อ Facebook */}
            <button className="mt-8 bg-[#1877F2] text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors w-full md:w-max shadow-lg">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              สั่งซื้อผ่าน Facebook
            </button>
            
            <Link href="/" className="mt-6 text-gray-500 hover:text-emerald-600 text-sm font-medium transition-colors">
              ← กลับไปเลือกสินค้าอื่น
            </Link>
          </div>
        </div>

        {/* ส่วนล่าง: วิธีใช้ (พื้นหลังสีเขียวอ่อน) */}
        <div className="mt-16 bg-[#f0f9f4] rounded-3xl p-8 md:p-12 border border-emerald-100">
          <h3 className="text-2xl font-bold text-[#007a33] mb-8 border-b-2 border-emerald-200 pb-2 inline-block">
            วิธีใช้
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-16">
            {/* กลุ่มที่ 1: ทุเรียน */}
            <div className="space-y-4">
              <div>
                <p className="font-bold text-gray-800">ทุเรียนอายุ 3-4 ปี</p>
                <p className="text-gray-600">500 กรัม - 1 กก./ต้น</p>
              </div>
              <div>
                <p className="font-bold text-gray-800">ทุเรียนอายุ 1-2 ปี</p>
                <p className="text-gray-600">100-300 กรัม/ต้น</p>
              </div>
              <div>
                <p className="font-bold text-gray-800">ทุเรียน (ให้ผลผลิต)</p>
                <p className="text-gray-600">1-3 กก./ต้น</p>
              </div>
            </div>

            {/* กลุ่มที่ 2: ยางพารา */}
            <div className="space-y-4">
              <div>
                <p className="font-bold text-gray-800">ยางพารา</p>
                <p className="text-gray-600">ปีที่ 1 : 400-500 กรัม/ต้น/ปี</p>
                <p className="text-gray-600">ปีที่ 2-4 : 600-700 กรัม/ต้น/ปี</p>
                <p className="text-gray-600">ปีที่ 5-6 : 700-800 กรัม/ต้น/ปี</p>
                <p className="text-gray-600 italic">หลังเปิดกรีดปีที่ 7 ขึ้นไป 1.5-2 กก./ต้น/ปี</p>
              </div>
            </div>

            {/* กลุ่มที่ 3: ปาล์มน้ำมัน */}
            <div className="space-y-4">
              <div>
                <p className="font-bold text-gray-800">ปาล์มน้ำมัน</p>
                <p className="text-gray-600">ปีที่ 1 : 1.5 - 2 กก./ต้น/ปี</p>
                <p className="text-gray-600">ปีที่ 2 : 3.5 - 4 กก./ต้น/ปี</p>
                <p className="text-gray-600">ปีที่ 3 : 5.5 - 6 กก./ต้น/ปี</p>
                <p className="text-gray-600">ปาล์มเล็กปีที่ 4 : 6.5 - 7 กก./ต้น/ปี</p>
              </div>
            </div>

            {/* แถวเพิ่มเติม */}
            <div className="space-y-2">
               <p className="font-bold text-gray-800">พืชผัก (กินใบ)</p>
               <p className="text-gray-600">30-50 กก./ไร่</p>
            </div>
            <div className="space-y-2">
               <p className="font-bold text-gray-800">นาข้าว</p>
               <p className="text-gray-600">25 กก./ไร่</p>
               <p className="font-bold text-gray-800 mt-2">ข้าวโพด</p>
               <p className="text-gray-600">25-50 กก./ไร่</p>
            </div>
            <div className="space-y-2">
               <p className="font-bold text-gray-800">มันสำปะหลัง</p>
               <p className="text-gray-600">50 กก./ไร่</p>
               <p className="font-bold text-gray-800 mt-2">กาแฟ</p>
               <p className="text-gray-600">200-400 กรัม/ต้น</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}