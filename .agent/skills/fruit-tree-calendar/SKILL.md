---
name: fruit-tree-calendar
description: ให้ข้อมูลเกี่ยวกับปฏิทินการปลูกและดูแลไม้ผลไม้ยืนต้น 21 ชนิด รวมถึงกาแฟ มะพร้าว และชา ใช้สำหรับค้นหาช่วงเวลาในการปลูก ดูแล ออกดอก และเก็บเกี่ยวของพืชแต่ละชนิดในแต่ละเดือน
---

# Fruit Tree Calendar Skill

This skill provides comprehensive data on the planting, caring, flowering, and harvesting schedule for various fruit trees and perennial plants throughout the year.

## When to use this skill

Use this skill when you need to:
- Find out the best time to plant a specific fruit tree
- Determine when a fruit tree will flower or be ready for harvest
- Know what care is required for a specific plant in a given month
- Retrieve notes and special conditions for planting specific fruit trees

## Available Data

The detailed calendar data is stored in JSON format at:
`/home/ubuntu/skills/fruit-tree-calendar/references/calendar_data.json`

You can read this file to get the exact schedule for each plant. The JSON file contains an array of objects, where each object represents a plant and its schedule for all 12 months, along with any special notes.

### List of Plants Included:
1. กล้วยไข่ (Kluai Khai)
2. ทุเรียน (Durian)
3. ขนุน (Jackfruit)
4. ชมพู่ (Rose Apple)
5. ลำไยในฤดู (In-season Longan)
6. ลำไยนอกฤดู (Off-season Longan)
7. ลองกอง (Longkong)
8. ลิ้นจี่ (Lychee)
9. มะม่วงในฤดู (In-season Mango)
10. มะม่วงนอกฤดู (Off-season Mango)
11. มังคุด (Mangosteen)
12. ส้มโอในฤดู (In-season Pomelo)
13. ส้มโอทะวาย (Ever-bearing Pomelo)
14. เงาะ (Rambutan)
15. น้อยหน่า (Sugar Apple)
16. มะขามหวาน (Sweet Tamarind)
17. มะปราง (Maprang)
18. สตรอเบอรี่ (Strawberry)
19. องุ่น (Grape)
20. มะละกอ (Papaya)
21. ฝรั่ง (Guava)
22. กาแฟ (Coffee) - ปีที่ 1, 2, 3
23. มะพร้าว (Coconut) - ปีที่ 1-3, 4-5
24. ชา (Tea) - ปีที่ 1-3, 4-5

## How to use the data

When a user asks about the schedule for a specific plant, read the JSON file and extract the relevant information for the requested plant.

Example usage in Python:
```python
import json

with open('/home/ubuntu/skills/fruit-tree-calendar/references/calendar_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Find data for Durian
durian_data = next((item for item in data if item['ชนิดพืช'] == 'ทุเรียน'), None)
print(durian_data)
```

## Integrating with web-fahsiam

This data is specifically formatted to be easily integrated into the `web-fahsiam` repository on GitHub. The JSON structure can be directly imported or converted to TypeScript objects to match the existing data structures like `calendarData.ts` in the project.
