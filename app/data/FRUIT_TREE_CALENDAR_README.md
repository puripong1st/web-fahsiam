# 🌳 Fruit Tree Calendar Data - เอกสารประกอบ

## ภาพรวม

ระบบปฏิทินไม้ผลใหม่นี้ถูกออกแบบมาเพื่อแยกออกจากระบบปฏิทินการเกษตรทั่วไป (`calendarData.ts`) โดยเน้นเฉพาะไม้ผลไม้ยืนต้นและพืชเศรษฐกิจ มีการ sync ข้อมูลกับไฟล์ JSON ใน `.agent/skills/fruit-tree-calendar/references/calendar_data.json`

## ไฟล์ที่สร้างใหม่

### 1. `app/data/fruitTreeCalendarData.ts`
ไฟล์ข้อมูลหลักที่มีโครงสร้าง TypeScript แบบ type-safe:

- **FruitTreeInfo**: ข้อมูลไม้ผลแต่ละชนิด
- **MonthlyActivity**: กิจกรรมรายเดือน
- **FruitTreeActivity**: รายละเอียดกิจกรรมพร้อมสีและไอคอน
- **FertilizerSchedule**: ตารางปุ๋ย

### 2. `app/components/FruitTreeCalendar.tsx`
Component UI สำหรับแสดงปฏิทิน:

- รองรับ 2 โหมด: Full Mode และ Compact Mode
- มี Sidebar สำหรับเลือกไม้ผล
- มี Modal แสดงรายละเอียดครบถ้วน
- รองรับการค้นหาและกรองตามหมวดหมู่
- Responsive Design

## โครงสร้างข้อมูล

### ข้อมูลไม้ผลที่รองรับ (30 ชนิด)

#### ไม้ผลเมืองร้อน (18 ชนิด)
1. 🍌 กล้วยไข่
2. 🥭 ทุเรียน
3. 🍈 ขนุน
4. 🍎 ชมพู่
5. 🍇 ลำไยในฤดู
6. 🍇 ลำไยนอกฤดู
7. 🍇 ลองกอง
8. 🍒 ลิ้นจี่
9. 🥭 มะม่วงในฤดู
10. 🥭 มะม่วงนอกฤดู
11. 🍊 มังคุด
12. 🍊 ส้มโอในฤดู
13. 🍊 ส้มโอทะวาย
14. 🍇 เงาะ
15. 🍎 น้อยหน่า
16. 🍈 มะขามหวาน
17. 🍊 มะปราง
18. 🍏 ฝรั่ง

#### ไม้ผลเมืองหนาว (1 ชนิด)
19. 🍓 สตรอเบอรี่

#### พืชผัก (2 ชนิด)
20. 🍈 มะละกอ
21. 🍇 องุ่น

#### พืชเศรษฐกิจ (9 ชนิด)
22. ☕ กาแฟ ปีที่ 1
23. ☕ กาแฟ ปีที่ 2
24. ☕ กาแฟ ปีที่ 3
25. 🥥 มะพร้าว ปีที่ 1-3
26. 🥥 มะพร้าว ปีที่ 4-5
27. 🍵 ชา ปีที่ 1-3
28. 🍵 ชา ปีที่ 4-5

## การใช้งาน

### 1. ใช้ Component แบบเต็ม

```tsx
import { FruitTreeCalendar } from "@/app/components/FruitTreeCalendar";

export default function Page() {
  return <FruitTreeCalendar />;
}
```

### 2. ใช้ Component แบบ Compact (ผสมกับระบบเดิม)

```tsx
import { FruitTreeCalendar } from "@/app/components/FruitTreeCalendar";

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ปฏิทินเดิม */}
      <Calendar />
      
      {/* ปฏิทินไม้ผลแบบ Compact */}
      <FruitTreeCalendar compact hideHeader />
    </div>
  );
}
```

### 3. ใช้ข้อมูลโดยตรง

```tsx
import {
  FRUIT_TREES,
  getFruitTreeById,
  getFruitTreesByCategory,
  getHarvestingFruitTrees,
  searchFruitTrees,
} from "@/app/data/fruitTreeCalendarData";

// ดึงข้อมูลทั้งหมด
const allTrees = FRUIT_TREES;

// ดึงตาม ID
const durian = getFruitTreeById("durian");

// ดึงตามหมวดหมู่
const tropicalFruits = getFruitTreesByCategory("ไม้ผลเมืองร้อน");

// ดึงไม้ผลที่กำลังเก็บเกี่ยว
const harvestingNow = getHarvestingFruitTrees();

// ค้นหา
const searchResults = searchFruitTrees("มะม่วง");
```

## การ Sync ข้อมูล

ข้อมูลใน `fruitTreeCalendarData.ts` ถูกสร้างจาก `calendar_data.json` โดย:

1. แปลงชื่อเดือนภาษาไทยเป็น index (0-11)
2. แยกกิจกรรมหลายรายการด้วยตัวแยก (-, /, |)
3. กำหนดสีและไอคอนอัตโนมัติตามชื่อกิจกรรม
4. สร้างตารางปุ๋ยจากข้อมูลที่มีอยู่

## การผสมกับระบบเดิม

### ใช้ร่วมกับ CROP_OPTIONS

```tsx
import { FRUIT_TREE_OPTIONS } from "@/app/data/fruitTreeCalendarData";
import { CROP_OPTIONS } from "@/app/data/calendarData";

// รวมรายการ
const allOptions = [...CROP_OPTIONS, ...FRUIT_TREE_OPTIONS];
```

### ใช้ร่วมกับ CROP_FERTILIZER_DATA

```tsx
import { convertToLegacyFormat } from "@/app/data/fruitTreeCalendarData";

const tree = getFruitTreeById("durian");
const legacyFormat = convertToLegacyFormat(tree);
// { cropName: "ทุเรียน", monthlyFertilizers: [...] }
```

## สีและความหมาย

| สี | ความหมาย | กิจกรรม |
|---|---|---|
| 🟢 เขียว | ปลูก/เตรียมต้น | ปลูก, เตรียมต้น |
| 🔵 น้ำเงิน | เก็บเกี่ยว | เก็บเกี่ยว |
| 🟠 ส้ม | ออกผล/ติดผล | ออกผล, ติดผล |
| 🟣 ม่วง | ตัดแต่ง | ตัดแต่งกิ่ง |
| 🩷 ชมพู | ออกดอก | ออกดอก |
| 🟡 เหลือง | ใส่ปุ๋ย | ใส่ปุ๋ย, ให้น้ำ |
| 🔴 แดง | แตกใบอ่อน | แตกใบ, แตกกิ่ง |
| 🔵 ฟ้า | ดูแล | ดูแล, บำรุง |
| ⚪ เทา | พักต้น | พักต้น, ว่าง |

## Props ของ FruitTreeCalendar

| Prop | Type | Default | คำอธิบาย |
|---|---|---|---|
| `initialSelectedTree` | `string` | - | ID ไม้ผลเริ่มต้น |
| `onTreeSelect` | `(treeId: string) => void` | - | Callback เมื่อเลือกไม้ผล |
| `compact` | `boolean` | `false` | โหมด Compact |
| `hideHeader` | `boolean` | `false` | ซ่อน Header |
| `hideSidebar` | `boolean` | `false` | ซ่อน Sidebar |
| `className` | `string` | - | Class เพิ่มเติม |

## ฟีเจอร์ที่วางแผนไว้

- [ ] ระบบแจ้งเตือนกิจกรรม
- [ ] Export ปฏิทินเป็น PDF
- [ ] เชื่อมต่อกับ API สภาพอากาศ
- [ ] ระบบบันทึกการปลูกของผู้ใช้
- [ ] การแนะนำปุ๋ยอัจฉริยะตามสภาพดิน

## การอัปเดตข้อมูล

หากต้องการอัปเดตข้อมูลจาก JSON ต้นฉบับ:

1. แก้ไขไฟล์ `.agent/skills/fruit-tree-calendar/references/calendar_data.json`
2. รัน script sync (หากมี)
3. หรือแก้ไข `fruitTreeCalendarData.ts` โดยตรง

---

**สร้างเมื่อ**: 17 มีนาคม 2026  
**เวอร์ชัน**: 2.0.0  
**ผู้พัฒนา**: ระบบปฏิทินการเกษตรอัจฉริยะ
