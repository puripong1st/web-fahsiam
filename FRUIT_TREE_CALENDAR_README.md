# 🌳 ระบบปฏิทินการปลูกไม้ผลไม้ยืนต้น

## 📋 ภาพรวม

ระบบปฏิทินไม้ผลใหม่นี้ถูกออกแบบมาเพื่อแยกออกจากระบบปฏิทินการเกษตรทั่วไป โดยเน้นเฉพาะไม้ผลไม้ยืนต้นและพืชเศรษฐกิจ มีการ sync ข้อมูลกับไฟล์ JSON ใน `.agent/skills/fruit-tree-calendar/references/calendar_data.json`

## 🗂️ โครงสร้างไฟล์

```
app/
├── data/
│   ├── fruitTreeCalendarData.ts    # ข้อมูลปฏิทินไม้ผล (ใหม่)
│   └── calendarData.ts              # ข้อมูลปฏิทินเดิม (พืชทั่วไป)
├── components/
│   ├── FruitTreeCalendar.tsx       # Component ปฏิทินไม้ผล (ใหม่)
│   └── Calendar.tsx                 # Component ปฏิทินเดิม
.agent/
└── skills/
    └── fruit-tree-calendar/
        └── references/
            └── calendar_data.json   # ข้อมูลต้นฉบับจาก JSON
```

## 🎯 คุณสมบัติหลัก

### 1. **Type-Safe Data Structure**
- ใช้ TypeScript เต็มรูปแบบ
- มี Type definitions ที่ชัดเจนสำหรับทุกข้อมูล
- รองรับการตรวจสอบข้อมูลในขั้นตอน compile time

### 2. **ข้อมูลไม้ผลที่รองรับ**
- **ไม้ผลเมืองร้อน**: กล้วยไข่, ทุเรียน, ขนุน, ลำไย, มะม่วง, มังคุด, เงาะ
- **พืชเศรษฐกิจ**: กาแฟ (ปีที่ 1-3), มะพร้าว, ชา
- รองรับการเพิ่มไม้ผลใหม่ได้ง่าย

### 3. **ระบบกิจกรรมตามฤดูกาล**
- แสดงกิจกรรมแต่ละเดือนพร้อมสีและไอคอนที่แตกต่างกัน
- กิจกรรมแบ่งเป็น: ปลูก, ออกดอก, ออกผล, เก็บเกี่ยว, ตัดแต่ง, ใส่ปุ๋ย, ดูแล

### 4. **ระบบปุ๋ยอัจฉริยะ**
- แสดงปุ๋ยที่เหมาะสมในแต่ละเดือน
- ระบุอัตราการใส่และวัตถุประสงค์
- เชื่อมโยงกับข้อมูลสินค้าปุ๋ยจาก `productsdetail.ts`

### 5. **UI/UX ที่ทันสมัย**
- ออกแบบด้วย Tailwind CSS
- รองรับ Responsive Design
- มี Modal สำหรับดูข้อมูลทั้งปี
- Animation และ Transition ที่ลื่นไหล

## 📊 โครงสร้างข้อมูล

### Type Definitions

```typescript
// กิจกรรมในแต่ละเดือน
type FruitTreeActivity = {
  activity: string;
  color: "green" | "blue" | "orange" | "purple" | "pink" | "yellow" | "red" | "gray";
  icon?: string;
};

// ข้อมูลไม้ผลแต่ละชนิด
type FruitTreeInfo = {
  id: string;
  name: string;
  category: "ไม้ผลเมืองร้อน" | "ไม้ผลเมืองหนาว" | "ไม้ผลอื่นๆ" | "พืชเศรษฐกิจ";
  image: string;
  description: string;
  harvestNote: string;
  monthlyActivities: MonthlyActivity[];
  fertilizers: FertilizerSchedule[];
};

// ตารางปุ๋ย
type FertilizerSchedule = {
  month: number;
  type: string;
  formula: string;
  rate: string;
  purpose: string;
};
```

## 🚀 การใช้งาน

### 1. Import Component

```tsx
import FruitTreeCalendar from "@/app/components/FruitTreeCalendar";

export default function Page() {
  return (
    <div>
      <FruitTreeCalendar />
    </div>
  );
}
```

### 2. เพิ่มไม้ผลใหม่

เพิ่มข้อมูลใน `fruitTreeCalendarData.ts`:

```typescript
{
  id: "new-fruit",
  name: "ชื่อไม้ผล",
  category: "ไม้ผลเมืองร้อน",
  image: "URL รูปภาพ",
  description: "คำอธิบาย",
  harvestNote: "หมายเหตุการเก็บเกี่ยว",
  monthlyActivities: [
    {
      month: 0, // มกราคม
      monthName: "มกราคม",
      activities: [
        { activity: "ปลูก", color: "green", icon: "🌱" }
      ]
    },
    // ... เดือนอื่นๆ
  ],
  fertilizers: [
    {
      month: 0,
      type: "OM 25%",
      formula: "OM25",
      rate: "50-100 กรัม/ต้น",
      purpose: "เตรียมดิน"
    },
    // ... ปุ๋ยอื่นๆ
  ]
}
```

### 3. ใช้ Helper Functions

```typescript
import {
  getFruitTreeById,
  getFruitTreesByCategory,
  getAllCategories
} from "@/app/data/fruitTreeCalendarData";

// ดึงข้อมูลไม้ผลตาม ID
const durian = getFruitTreeById("durian");

// ดึงไม้ผลตามหมวดหมู่
const tropicalFruits = getFruitTreesByCategory("ไม้ผลเมืองร้อน");

// ดึงหมวดหมู่ทั้งหมด
const categories = getAllCategories();
```

## 🎨 สีและไอคอนกิจกรรม

| กิจกรรม | สี | ไอคอน |
|---------|-----|-------|
| ปลูก | เขียว (green) | 🌱 |
| ออกดอก | ชมพู (pink) | 🌸 |
| ออกผล/ติดผล | ส้ม (orange) | 🍊 |
| เก็บเกี่ยว | น้ำเงิน (blue) | 🧺 |
| ตัดแต่ง | ม่วง (purple) | ✂️ |
| ใส่ปุ๋ย | เหลือง (yellow) | 💧 |
| ดูแล | เทา (gray) | 🌿 |
| เตรียม | เทา (gray) | 🔧 |

## 🔄 Sync ข้อมูลจาก JSON

ข้อมูลในระบบนี้ถูก sync จาก `.agent/skills/fruit-tree-calendar/references/calendar_data.json`

### โครงสร้าง JSON

```json
{
  "ชนิดพืช": "ชื่อพืช",
  "ม.ค.": "กิจกรรมในมกราคม",
  "ก.พ.": "กิจกรรมในกุมภาพันธ์",
  ...
  "หมายเหตุ": "หมายเหตุเพิ่มเติม"
}
```

## 📝 ตัวอย่างข้อมูลที่มีอยู่

### ไม้ผลที่รองรับในปัจจุบัน:

1. **กล้วยไข่** - ปลูก ม.ค.-ก.พ., เก็บเกี่ยว ส.ค.-ก.ย.
2. **ทุเรียน** - ออกดอก ต.ค.-พ.ย., เก็บเกี่ยว ก.พ.-มี.ค.
3. **ขนุน** - ให้ผลตลอดทั้งปี
4. **ลำไยในฤดู** - เก็บเกี่ยว มิ.ย.-ก.ย.
5. **ลำไยนอกฤดู** - เก็บเกี่ยว ม.ค.-ก.พ.
6. **มะม่วงในฤดู** - เก็บเกี่ยว มี.ค.-เม.ย.
7. **มังคุด** - เก็บเกี่ยว ก.ค.-ส.ค.
8. **เงาะ** - เก็บเกี่ยว พ.ค.-มิ.ย.
9. **กาแฟ ปีที่ 1-3** - แบ่งตามอายุต้น
10. **มะพร้าว ปีที่ 1-3, 4-5** - แบ่งตามอายุต้น
11. **ชา ปีที่ 1-3, 4-5** - แบ่งตามอายุต้น

## 🔧 การปรับแต่ง

### เปลี่ยนสีธีม

แก้ไขใน `FruitTreeCalendar.tsx`:

```tsx
const ACTIVITY_COLORS = {
  green: "bg-green-100 text-green-700 border-green-300",
  // เปลี่ยนสีตามต้องการ
};
```

### เพิ่มฟีเจอร์ใหม่

1. เพิ่ม Type ใหม่ใน `fruitTreeCalendarData.ts`
2. อัปเดต Component ใน `FruitTreeCalendar.tsx`
3. ทดสอบการทำงาน

## 📱 Responsive Design

- **Mobile**: แสดงปฏิทินและข้อมูลแบบ Stack
- **Tablet**: แสดงแบบ 2 คอลัมน์
- **Desktop**: แสดงแบบ 38/62 split

## 🎯 ความแตกต่างจากระบบเดิม

| คุณสมบัติ | ระบบเดิม (Calendar.tsx) | ระบบใหม่ (FruitTreeCalendar.tsx) |
|-----------|------------------------|----------------------------------|
| เน้น | พืชทั่วไป, ปุ๋ย | ไม้ผลไม้ยืนต้น |
| ข้อมูล | CROP_OPTIONS, CROP_FERT_SLIDES | FRUIT_TREES |
| กิจกรรม | ไม่มี | มีกิจกรรมตามฤดูกาล |
| UI | ปุ๋ยเป็นหลัก | กิจกรรมและปุ๋ยครบถ้วน |
| Modal | รายละเอียดปุ๋ย | ปฏิทินทั้งปี + ตารางปุ๋ย |

## 🚧 การพัฒนาต่อ

### ไม้ผลที่ควรเพิ่ม (จาก JSON):
- ชมพู่
- ลองกอง
- ลิ้นจี่
- ส้มโอในฤดู / ส้มโอทะวาย
- น้อยหน่า
- มะขามหวาน
- มะปราง
- สตรอเบอรี่
- องุ่น
- มะละกอ
- ฝรั่ง

### ฟีเจอร์ที่ควรเพิ่ม:
- [ ] ระบบค้นหาไม้ผล
- [ ] ฟิลเตอร์ตามหมวดหมู่
- [ ] ระบบแจ้งเตือนกิจกรรม
- [ ] Export ปฏิทินเป็น PDF
- [ ] เชื่อมต่อกับ API สภาพอากาศ
- [ ] ระบบบันทึกการปลูกของผู้ใช้

## 📞 การติดต่อและสนับสนุน

หากมีคำถามหรือต้องการความช่วยเหลือ:
- ดูเอกสารเพิ่มเติมใน `.agent/skills/fruit-tree-calendar/`
- ตรวจสอบ Type definitions ใน `fruitTreeCalendarData.ts`
- ดูตัวอย่างการใช้งานใน `FruitTreeCalendar.tsx`

---

**สร้างโดย**: ระบบปฏิทินการเกษตรอัจฉริยะ  
**วันที่อัปเดต**: 17 มีนาคม 2026  
**เวอร์ชัน**: 1.0.0
