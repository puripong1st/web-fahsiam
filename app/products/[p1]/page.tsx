import { MOCK_PRODUCTS } from "@/data/products"; // Import ข้อมูลกลางมา
import Link from "next/link";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // ค้นหาสินค้าที่มี id ตรงกับ URL
  const product = MOCK_PRODUCTS.find((p) => p.id === params.id);

  // ถ้าไม่เจอสินค้า (เช่น พิมพ์ URL มั่ว) ให้แสดงข้อความแจ้งเตือน
  if (!product) {
    return <div className="p-20 text-center">ไม่พบสินค้าที่คุณต้องการ</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <Link href="/" className="text-emerald-600 mb-4 inline-block">← กลับหน้าหลัก</Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
        {/* รูปภาพสินค้า */}
        <div className="bg-gray-100 rounded-3xl p-10 flex justify-center">
          <img src={product.image} alt={product.name} className="max-w-full h-auto object-contain" />
        </div>

        {/* รายละเอียดสินค้า */}
        <div>
          <h1 className="text-4xl font-black text-gray-900">{product.name}</h1>
          <p className="mt-4 text-emerald-700 text-5xl font-bold">฿{product.price.toLocaleString()}</p>
          {product.oldPrice && (
            <p className="text-gray-400 line-through text-2xl mt-2">฿{product.oldPrice.toLocaleString()}</p>
          )}
          <div className="mt-8">
            <h3 className="font-bold text-lg">รายละเอียดสินค้าเบื้องต้น</h3>
            <p className="text-gray-600 mt-2">หมวดหมู่: {product.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}