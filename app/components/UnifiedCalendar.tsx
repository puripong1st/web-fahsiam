"use client";

// ═══════════════════════════════════════════════════════════════
// 🌿 UNIFIED AGRICULTURAL CALENDAR COMPONENT
// Merged: Calendar + FruitTreeCalendar
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Sprout,
  Flower2,
  Apple,
  ShoppingBag,
  Scissors,
  Droplets,
  TreePine,
  Pause,
  HelpCircle,
  X,
  Search,
  Filter,
  Leaf,
  Info,
  Droplet,
  ChevronLeft,
  ChevronRight,
  Clock,
  Grid3X3,
  CalendarDays,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// IMPORTS FROM CALENDAR DATA
// ═══════════════════════════════════════════════════════════════
import {
  type FertSlide,
  CROP_OPTIONS,
  CROP_FERT_SLIDES,
  CROP_USAGE_DETAILS,
  DAYS_OF_WEEK,
} from "../data/calendarData";

// ═══════════════════════════════════════════════════════════════
// IMPORTS FROM FRUIT TREE DATA
// ═══════════════════════════════════════════════════════════════
import {
  FRUIT_TREES,
  FruitTreeInfo,
  FruitCategory,
  MonthlyActivity,
  FruitTreeActivity,
  THAI_MONTHS,
  ACTIVITY_COLORS,
  getThaiMonthName,
  getThaiMonthShort,
  getFruitTreeById,
  getFruitTreesByCategory,
  getAllCategories,
} from "@/app/data/fruitTreeCalendarData";

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

type TabType = "calendar" | "fruittree";

// ═══════════════════════════════════════════════════════════════
// CATEGORY ICONS
// ═══════════════════════════════════════════════════════════════

function Sun({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function Snowflake({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    </svg>
  );
}

function Banknote({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <line x1="7" y1="9" x2="7" y2="9.01" />
      <line x1="17" y1="9" x2="17" y2="9.01" />
    </svg>
  );
}

function Settings({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v10M21 12h-6m-6 0H3m15.364-6.364l-4.242 4.242m-6.364 6.364l-4.242 4.242m18.384 0l-4.242-4.242M7.758 7.758L3.516 3.516" />
    </svg>
  );
}

const CATEGORY_ICONS: Record<FruitCategory, React.ReactNode> = {
  "ไม้ผลเมืองร้อน": <Sun className="w-4 h-4" />,
  "ไม้ผลเมืองหนาว": <Snowflake className="w-4 h-4" />,
  "ไม้ผลอื่นๆ": <Apple className="w-4 h-4" />,
  "พืชเศรษฐกิจ": <Banknote className="w-4 h-4" />,
  "พืชผัก": <Leaf className="w-4 h-4" />,
};

function ActivityIconComponent({ icon, className }: { icon: string; className?: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    "🌱": <Sprout className={className} />,
    "🌸": <Flower2 className={className} />,
    "🍊": <Apple className={className} />,
    "🧺": <ShoppingBag className={className} />,
    "✂️": <Scissors className={className} />,
    "💧": <Droplets className={className} />,
    "🌿": <Leaf className={className} />,
    "🔧": <Settings className={className} />,
    "🌳": <TreePine className={className} />,
    "⏸️": <Pause className={className} />,
    "❓": <HelpCircle className={className} />,
  };

  return <>{iconMap[icon] || <HelpCircle className={className} />}</>;
}

function ActivityBadge({
  activity,
  size = "md",
}: {
  activity: FruitTreeActivity;
  size?: "sm" | "md" | "lg";
}) {
  const colors = ACTIVITY_COLORS[activity.color];
  const sizeClasses = {
    sm: "px-2.5 py-1 text-[11px]",
    md: "px-3 py-1.5 text-xs",
    lg: "px-3.5 py-2 text-sm",
  };

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 rounded-full font-semibold
        border transition-all duration-200
        ${colors.bg} ${colors.text} ${colors.border}
        ${sizeClasses[size]}
        hover:shadow-md hover:scale-105
      `}
    >
      <span className="flex-shrink-0">{activity.icon}</span>
      <span className="truncate max-w-[85px]">{activity.activity}</span>
    </div>
  );
}

function MonthActivityCard({
  monthData,
  isCurrentMonth,
  onClick,
}: {
  monthData: MonthlyActivity;
  isCurrentMonth: boolean;
  onClick?: () => void;
}) {
  const hasActivities = monthData.activities.some((act) => act.activity !== "-");

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl p-3.5 cursor-pointer
        transition-all duration-300 ease-out
        hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400
        active:scale-[0.97]
        ${isCurrentMonth ? "ring-2 ring-offset-2 ring-green-500 shadow-lg" : "shadow-sm"}
        ${hasActivities ? "bg-white border border-gray-100" : "bg-gray-50 border border-gray-100"}
      `}
      style={{
        borderLeft: hasActivities ? `5px solid ${monthData.themeColor}` : "5px solid transparent",
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          onClick();
        }
      }}
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs font-semibold text-gray-600">{monthData.monthShort}</span>
        {isCurrentMonth && (
          <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-sm">
            เดือนนี้
          </span>
        )}
      </div>

      <div className="space-y-1">
        {monthData.activities.map((activity, idx) => (
          <ActivityBadge key={idx} activity={activity} size="sm" />
        ))}
      </div>

      {hasActivities && (
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${monthData.themeColor} 0%, transparent 50%)`,
          }}
        />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODAL COMPONENTS
// ═══════════════════════════════════════════════════════════════

function TreeDetailModal({
  tree,
  isOpen,
  onClose,
  currentMonth,
}: {
  tree: FruitTreeInfo | null;
  isOpen: boolean;
  onClose: () => void;
  currentMonth: number;
}) {
  if (!isOpen || !tree) return null;

  const currentMonthData = tree.monthlyActivities[currentMonth];

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md transition-opacity duration-200 animate-in fade-in"
      />

      <div
        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                   md:w-full md:max-w-4xl md:max-h-[85vh]
                   bg-white rounded-3xl shadow-2xl z-50 overflow-hidden
                   animate-in zoom-in-95 duration-300 ease-out"
      >
        <div className="flex flex-col h-full max-h-[85vh]">
          <div className="relative px-6 py-7 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-b border-green-100">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white hover:bg-red-50 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
            </button>

            <div className="flex items-start gap-4">
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-gray-100 shadow-md flex-shrink-0 border border-green-100">
                <Image
                  src={tree.image}
                  alt={tree.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-2 shadow-sm">
                  {tree.category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-1 line-clamp-2">{tree.name}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">{tree.description}</p>
              </div>
            </div>

            {tree.harvestNote && (
              <div className="mt-4 p-3.5 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-blue-700 mb-1">หมายเหตุการเก็บเกี่ยว</p>
                    <p className="text-sm text-blue-600">{tree.harvestNote}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3.5 flex items-center gap-2.5 text-green-700">
                <Calendar className="w-5 h-5" />
                กิจกรรมเดือน{getThaiMonthName(currentMonth)} (เดือนนี้)
              </h3>
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 shadow-sm">
                <div className="flex flex-wrap gap-2.5">
                  {currentMonthData?.activities.map((act, idx) => (
                    <ActivityBadge key={idx} activity={act} size="lg" />
                  )) || <span className="text-gray-500 text-sm">ไม่มีกิจกรรม</span>}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3.5">ปฏิทินทั้งปี</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {tree.monthlyActivities.map((monthData, idx) => (
                  <MonthActivityCard
                    key={idx}
                    monthData={monthData}
                    isCurrentMonth={idx === currentMonth}
                  />
                ))}
              </div>
            </div>

            {tree.fertilizers.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3.5 flex items-center gap-2.5 text-blue-700">
                  <Droplet className="w-5 h-5" />
                  ตารางปุ๋ยสำหรับปี
                </h3>
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">เดือน</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">ชนิด</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">สูตร</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">อัตรา</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">วัตถุประสงค์</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {tree.fertilizers.map((fert, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-4 py-3 font-medium text-gray-900">
                            {getThaiMonthName(fert.month)}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{fert.type}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex px-2.5 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-lg">
                              {fert.formula}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{fert.rate}</td>
                          <td className="px-4 py-3 text-gray-600">{fert.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function TreeCard({
  tree,
  isSelected,
  onClick,
  currentMonth,
}: {
  tree: FruitTreeInfo;
  isSelected: boolean;
  onClick: () => void;
  currentMonth: number;
}) {
  const currentMonthData = tree.monthlyActivities[currentMonth];
  const hasHarvest = currentMonthData?.activities.some((act) =>
    act.activity.includes("เก็บเกี่ยว")
  );

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      className={`
        relative overflow-hidden rounded-2xl cursor-pointer
        transition-all duration-300 ease-out
        hover:scale-[1.03] hover:-translate-y-1.5 hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400
        active:scale-[0.98]
        ${isSelected ? "ring-2 ring-green-500 shadow-xl" : "shadow-md"}
        border border-gray-100
      `}
    >
      <div className="relative h-40 bg-gray-100 overflow-hidden group">
        <Image 
          src={tree.image} 
          alt={tree.name} 
          fill 
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-white bg-black/50 backdrop-blur-sm rounded-full shadow-md">
            {CATEGORY_ICONS[tree.category]}
            {tree.category}
          </span>
        </div>

        {hasHarvest && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-white bg-blue-500 rounded-full shadow-md animate-pulse">
              <ShoppingBag className="w-3.5 h-3.5" />
              เก็บเกี่ยว
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-3.5">
          <h3 className="text-lg font-bold text-white drop-shadow-lg line-clamp-2">{tree.name}</h3>
        </div>
      </div>

      <div className="p-3.5 bg-white">
        <p className="text-xs text-gray-600 line-clamp-2 mb-2.5 leading-relaxed">{tree.description}</p>
        
        <div className="flex flex-wrap gap-1.5">
          {currentMonthData?.activities.slice(0, 2).map((act, idx) => (
            <ActivityBadge key={idx} activity={act} size="sm" />
          ))}
          {(currentMonthData?.activities.length || 0) > 2 && (
            <span className="text-xs text-gray-400 px-1 font-medium">+{currentMonthData!.activities.length - 2}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN UNIFIED COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function UnifiedCalendar() {
  // ═══════ TAB STATE ═══════
  const [activeTab, setActiveTab] = useState<TabType>("calendar");

  // ═══════ CALENDAR TAB STATE ═══════
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedCrop, setSelectedCrop] = useState("");
  const [thumbIdx, setThumbIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const [widgetPlantIdx, setWidgetPlantIdx] = useState(0);
  const [plantModalOpen, setPlantModalOpen] = useState(false);
  const [modalPlantIdx, setModalPlantIdx] = useState(0);

  // ═══════ FRUIT TREE TAB STATE ═══════
  const [selectedCategory, setSelectedCategory] = useState<FruitCategory | "all">("all");
  const [selectedTreeId, setSelectedTreeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTreeModalOpen, setIsTreeModalOpen] = useState(false);
  const [currentMonth] = useState(() => new Date().getMonth());

  // ═══════ REFS ═══════
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const plantTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ═══════ EFFECTS FOR CALENDAR TAB ═══════
  useEffect(() => {
    const init = setTimeout(() => setCurrentTime(new Date()), 0);
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      clearTimeout(init);
      clearInterval(t);
    };
  }, []);

  const handleSelectCrop = (crop: string) => {
    setSelectedCrop(crop);
    setThumbIdx(0);
    setModalIdx(0);
  };

  const handleSetViewDate = (date: Date) => {
    setViewDate(date);
    setWidgetPlantIdx(0);
  };

  const slides: FertSlide[] = selectedCrop ? (CROP_FERT_SLIDES[selectedCrop] ?? []) : [];
  const totalFert = slides.length;

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (totalFert <= 1) return;
    timerRef.current = setInterval(() => {
      setThumbIdx((p) => (p + 1) % totalFert);
    }, 3000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [totalFert, selectedCrop]);

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const emptyAfter = 42 - (firstDay + daysInMonth);

  // ═══════ DYNAMIC SEASONAL PLANTS - ดึงพืชที่มีกิจกรรม "ปลูก" ในเดือนนั้นๆ ═══════
  const seasonalPlants = useMemo(() => {
    return FRUIT_TREES.filter((tree) => {
      const monthData = tree.monthlyActivities[viewMonth];
      return monthData?.activities.some((act) => act.activity.includes("ปลูก"));
    }).map((tree) => ({
      id: tree.id,
      name: tree.name,
      image: tree.image,
      category: tree.category,
      description: tree.description,
    }));
  }, [viewMonth]);

  const totalPlants = seasonalPlants.length;

  useEffect(() => {
    if (plantTimerRef.current) clearInterval(plantTimerRef.current);
    if (totalPlants <= 1 || totalPlants === 0) return;
    plantTimerRef.current = setInterval(() => {
      setWidgetPlantIdx((prev) => (prev + 1) % totalPlants);
    }, 3500);
    return () => { if (plantTimerRef.current) clearInterval(plantTimerRef.current); };
  }, [totalPlants, viewMonth]);

  const usageData = selectedCrop ? CROP_USAGE_DETAILS[selectedCrop] : null;
  const thumbSlide = slides[thumbIdx] ?? null;
  const modalSlide = slides[modalIdx] ?? null;

  const moveFertModal = (dir: 1 | -1) => {
    if (totalFert === 0) return;
    setModalIdx((p) => (p + dir + totalFert) % totalFert);
  };

  const moveModalPlant = (dir: 1 | -1) => {
    if (totalPlants === 0) return;
    setModalPlantIdx((p) => (p + dir + totalPlants) % totalPlants);
  };

  const currentWidgetPlant = seasonalPlants[widgetPlantIdx];
  const activeModalPlant = seasonalPlants[modalPlantIdx];

  // ═══════ FRUIT TREE LOGIC ═══════
  const filteredTrees = useMemo(() => {
    let trees = FRUIT_TREES;
    if (selectedCategory !== "all") {
      trees = getFruitTreesByCategory(selectedCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      trees = trees.filter(
        (tree) =>
          tree.name.toLowerCase().includes(query) ||
          tree.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    return trees;
  }, [selectedCategory, searchQuery]);

  const selectedTree = useMemo(
    () => (selectedTreeId ? getFruitTreeById(selectedTreeId) : null),
    [selectedTreeId]
  );

  const handleTreeSelect = useCallback((treeId: string) => {
    setSelectedTreeId(treeId);
    setIsTreeModalOpen(true);
  }, []);

  const categories = getAllCategories();

  // ═══════════════════════════════════════════════════════════════
  // RENDER: CALENDAR TAB
  // ═══════════════════════════════════════════════════════════════
  const renderCalendarTab = () => (
    <div className="flex flex-col xl:flex-row items-start gap-6 w-full animate-in fade-in duration-300">
      {/* ══════ ซ้าย: การ์ดปฏิทิน ══════ */}
      <div className="w-full xl:w-[38%] bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col h-fit hover:shadow-2xl transition-all duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-6 gap-4">
          <div className="flex flex-col items-center md:items-start w-full md:w-auto">
            <div className="flex items-center justify-center gap-2 mb-2 w-full">
              <button
                onClick={() => handleSetViewDate(new Date(viewYear, viewMonth - 1, 1))}
                className="p-2.5 rounded-full hover:bg-gradient-to-r hover:from-sky-100 hover:to-blue-100 text-gray-600 hover:text-sky-700 transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent w-40 text-center">
                {viewDate.toLocaleDateString("th-TH", { month: "long" })}
              </h2>
              <button
                onClick={() => handleSetViewDate(new Date(viewYear, viewMonth + 1, 1))}
                className="p-2.5 rounded-full hover:bg-gradient-to-r hover:from-sky-100 hover:to-blue-100 text-gray-600 hover:text-sky-700 transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300"
                aria-label="Next month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => handleSetViewDate(new Date())}
              className="text-sm font-semibold text-sky-600 hover:text-sky-800 hover:underline px-2 text-center md:text-left w-full md:w-auto transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300 rounded"
            >
              🔄 กลับไปเดือนปัจจุบัน
            </button>
          </div>
          <div className="flex flex-col items-center md:items-end w-full md:w-auto">
            <div className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-2 md:mr-2">
              {viewDate.toLocaleDateString("th-TH", { year: "numeric" })}
            </div>
            <div className="text-xl font-mono font-bold text-sky-700 bg-gradient-to-r from-sky-50 to-blue-50 px-4 py-2 rounded-xl shadow-sm border border-sky-100 flex items-center gap-2">
              <Clock className="w-5 h-5 flex-shrink-0" />
              {currentTime
                ? currentTime.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
                : "--:--:--"}
            </div>
          </div>
        </div>

        <div className="bg-gray-200 grid grid-cols-7 gap-px border border-gray-200 rounded-xl overflow-hidden h-fit shadow-inner">
          {DAYS_OF_WEEK.map((d, i) => (
            <div key={d} className={`bg-gradient-to-b from-gray-50 to-gray-100 py-2 text-center text-sm font-semibold ${i === 0 ? "text-red-600" : "text-gray-700"}`}>
              {d}
            </div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`eb${i}`} className="bg-gray-50/40 p-2 min-h-[4rem] md:min-h-[5rem]" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = currentTime
              ? day === currentTime.getDate() &&
                viewMonth === currentTime.getMonth() &&
                viewYear === currentTime.getFullYear()
              : false;
            return (
              <div key={day} className={`p-2 min-h-[4rem] md:min-h-[5rem] hover:bg-gradient-to-br hover:from-sky-50 hover:to-blue-50 transition-all duration-200 cursor-pointer ${isToday ? "bg-gradient-to-br from-sky-50 to-blue-50" : "bg-white"}`}>
                <div className={`w-7 h-7 mx-auto flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 ${isToday ? "bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg scale-110 animate-pulse" : "text-gray-700 hover:bg-sky-100 hover:scale-105"}`}>
                  {day}
                </div>
              </div>
            );
          })}
          {Array.from({ length: emptyAfter }).map((_, i) => (
            <div key={`ea${i}`} className="bg-gray-50/40 p-2 min-h-[4rem] md:min-h-[5rem]" />
          ))}
        </div>
      </div>

      {/* ══════ ขวา: การ์ดข้อมูลการเกษตร ══════ */}
      <div className="w-full xl:w-[62%] bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col h-fit hover:shadow-2xl transition-shadow duration-300">
        <h3 className="w-full text-xl font-bold text-green-700 mb-6 pb-3 border-b-2 border-green-200 flex items-center justify-center gap-2">
          <Sprout className="w-6 h-6" />
          แนะนำสำหรับเดือนนี้
        </h3>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 flex-1 items-start">
          {/* ── คอลัมน์ซ้าย: รูป + dropdown ── */}
          <div className="w-full lg:w-[48%] flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {/* ── พืชในฤดูกาล - ดึงจาก Fruit Trees ที่มีกิจกรรม "ปลูก" ── */}
              <div className="flex flex-col items-center">
                {currentWidgetPlant ? (
                  <div 
                    className="w-full aspect-square rounded-xl shadow-lg border-2 border-green-200 mb-3 overflow-hidden relative group bg-gradient-to-br from-green-50 to-emerald-50 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={() => {
                      setModalPlantIdx(widgetPlantIdx);
                      setPlantModalOpen(true);
                    }}
                  >
                    <Image
                      key={`widget-plant-${viewMonth}-${widgetPlantIdx}`}
                      src={currentWidgetPlant.image}
                      alt={currentWidgetPlant.name}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center gap-1">
                      <span className="text-white text-[15px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-md transform group-hover:scale-110">
                        🔍 ดูรายละเอียด
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-square rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 mb-3 flex items-center justify-center">
                    <span className="text-gray-400 text-sm text-center px-2">ไม่มีพืชที่เหมาะปลูก</span>
                  </div>
                )}
                <div className="flex flex-col items-center justify-start min-h-[3.5rem] w-full">
                  <span className="text-[14px] xl:text-[15px] font-bold text-gray-700 text-center w-full truncate px-1 flex items-center gap-1">
                    <Leaf className="w-4 h-4 text-green-600" /> พืชในฤดูกาล
                  </span>
                  <span className="text-[14px] xl:text-[15px] bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold text-center mt-1 px-1 line-clamp-2 leading-snug">
                    {currentWidgetPlant?.name || "ไม่มีพืชที่เหมาะปลูก"}
                  </span>
                </div>
              </div>

              {/* ── Slideshow ปุ๋ย ── */}
              <div className="flex flex-col items-center">
                {selectedCrop && thumbSlide ? (
                  <>
                    <div
                      className="w-full aspect-square rounded-xl shadow-lg border-2 border-blue-300 mb-3 overflow-hidden relative group bg-gradient-to-br from-blue-50 to-sky-50 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
                      onClick={() => { setModalIdx(thumbIdx); setModalOpen(true); }}
                    >
                      <Image
                        key={`${selectedCrop}-${thumbIdx}`}
                        src={thumbSlide.product.image}
                        alt={thumbSlide.product.productName}
                        fill
                        className="object-contain p-2"
                        sizes="200px"
                        loading="lazy"
                        quality={70}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col items-center justify-center gap-1 pointer-events-none">
                        <span className="text-white text-[15px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 drop-shadow px-2 text-center transform group-hover:scale-110">
                          🔍 ดูรายละเอียด
                        </span>
                        <span className="text-white/90 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300">
                          กดเพื่อดูทุกสูตร
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-start min-h-[3.5rem] w-full">
                      <span className="text-[14px] xl:text-[15px] font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent text-center w-full px-1 line-clamp-2 leading-tight">
                        {thumbSlide.product.productName}
                      </span>
                      <span className="text-[13px] xl:text-[14px] text-gray-600 text-center line-clamp-2 px-1 mt-1 leading-snug">
                        {thumbSlide.fertText}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full aspect-square rounded-xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 mb-3 flex items-center justify-center">
                      <span className="text-gray-400 text-sm text-center px-2">🌾 รอเลือกพืช</span>
                    </div>
                    <div className="flex flex-col items-center justify-start min-h-[3.5rem] w-full">
                      <span className="text-[14px] xl:text-[15px] font-bold text-gray-400 text-center w-full truncate px-1 flex items-center gap-1">
                        <Droplet className="w-4 h-4" /> ปุ๋ยที่เหมาะสม
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-5 rounded-xl border-2 border-blue-200 shadow-md w-full hover:shadow-lg transition-all duration-300 hover:border-blue-300">
              <h4 className="text-sm font-bold text-blue-700 mb-3.5 uppercase tracking-wide text-center flex items-center justify-center gap-2">
                <Sprout className="w-5 h-5 flex-shrink-0" /> เลือกพืชของคุณ
              </h4>
              <select
                value={selectedCrop}
                onChange={(e) => handleSelectCrop(e.target.value)}
                className="w-full bg-white text-blue-800 text-sm font-semibold py-3 px-4 rounded-lg border-2 border-blue-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 outline-none cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <option value="" disabled>-- กรุณาเลือกพืช --</option>
                {[...CROP_OPTIONS].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ── คอลัมน์ขวา: ตารางอัตราการใช้ปุ๋ย ── */}
          <div className="w-full lg:w-[52%] flex flex-col h-fit">
            {selectedCrop && usageData && usageData.length > 0 ? (
              <div className="bg-gradient-to-br from-white to-blue-50/30 p-5 rounded-xl border-2 border-blue-100 shadow-md text-left flex flex-col h-fit hover:shadow-lg transition-shadow duration-300">
                <h4 className="text-lg font-bold text-blue-700 mb-4 border-b-2 border-blue-200 pb-3 flex items-center gap-2">
                  📊 อัตราการใช้ปุ๋ยตามระยะ
                </h4>
                <div className="space-y-4 pr-1">
                  {usageData.map((d, idx) => (
                    <div key={idx} className="relative flex flex-col bg-white p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:border-blue-300">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-400 to-sky-500 rounded-l-xl" />
                      <div className="flex flex-wrap items-center gap-3 mb-2 pl-3">
                        {d.badge && (
                          <span className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border border-orange-300 px-3 py-1 rounded-md text-[13px] font-bold shadow-sm">
                            {d.badge}
                          </span>
                        )}
                        <span className="text-[16px] xl:text-lg font-bold text-gray-800">{d.stage}</span>
                      </div>
                      <div className="flex justify-between items-end mt-3 pl-3 text-[13px] xl:text-sm gap-3">
                        <span className="text-gray-600">
                          สูตร: <span className="text-blue-600 font-bold">{d.formula}</span>
                        </span>
                        <span className="bg-gradient-to-r from-blue-100 to-sky-100 text-blue-800 border border-blue-300 px-3 py-1.5 rounded-md text-[11px] xl:text-xs font-bold whitespace-nowrap shadow-sm">
                          {d.rate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4 text-center">
                  *อัตราการใช้ขึ้นอยู่กับอายุและความสมบูรณ์ของต้น
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-blue-50/20 p-5 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center min-h-[300px] h-fit">
                <span className="text-5xl mb-4 animate-bounce">🌱</span>
                <h4 className="text-lg text-gray-600 font-bold mb-2">ยังไม่มีข้อมูลแสดงผล</h4>
                <p className="text-base text-gray-500">กรุณาเลือกพืชเพื่อดูอัตราการใช้ปุ๋ยตามระยะ</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t-2 border-gray-200 text-sm text-center text-gray-500 w-full flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4" />
          ข้อมูลอ้างอิงสำหรับเดือน {viewDate.toLocaleDateString("th-TH", { month: "long" })}
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // RENDER: FRUIT TREE TAB
  // ═══════════════════════════════════════════════════════════════
  const renderFruitTreeTab = () => (
    <div className="animate-in fade-in duration-300">
      {/* Header with Search */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-md">
              <TreePine className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ปฏิทินไม้ผลไม้ยืนต้น</h1>
              <p className="text-sm text-gray-500">
                เดือน{getThaiMonthName(currentMonth)} {new Date().getFullYear() + 543}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="ค้นหาไม้ผล..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-200 w-full md:w-64 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <button
            onClick={() => setSelectedCategory("all")}
            className={`
              px-3.5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ease-out
              focus:outline-none focus:ring-2 focus:ring-offset-2
              active:scale-95
              ${selectedCategory === "all"
                ? "bg-green-500 text-white shadow-md scale-105 focus:ring-green-400"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 focus:ring-gray-400"
              }
            `}
          >
            ทั้งหมด
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-3.5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ease-out
                focus:outline-none focus:ring-2 focus:ring-offset-2
                active:scale-95
                ${selectedCategory === cat
                  ? "bg-green-500 text-white shadow-md scale-105 focus:ring-green-400"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 focus:ring-gray-400"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <p className="text-2xl font-bold text-gray-900">{FRUIT_TREES.length}</p>
          <p className="text-xs text-gray-500">ไม้ผลทั้งหมด</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <p className="text-2xl font-bold text-green-600">
            {FRUIT_TREES.filter((t) =>
              t.monthlyActivities[currentMonth].activities.some((act) =>
                act.activity.includes("เก็บเกี่ยว")
              )
            ).length}
          </p>
          <p className="text-xs text-gray-500">เก็บเกี่ยวเดือนนี้</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <p className="text-2xl font-bold text-pink-600">
            {FRUIT_TREES.filter((t) =>
              t.monthlyActivities[currentMonth].activities.some((act) =>
                act.activity.includes("ออกดอก")
              )
            ).length}
          </p>
          <p className="text-xs text-gray-500">ออกดอกเดือนนี้</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <p className="text-2xl font-bold text-yellow-600">
            {FRUIT_TREES.filter((t) =>
              t.monthlyActivities[currentMonth].activities.some((act) =>
                act.activity.includes("ใส่ปุ๋ย")
              )
            ).length}
          </p>
          <p className="text-xs text-gray-500">ใส่ปุ๋ยเดือนนี้</p>
        </div>
      </div>

      {/* Tree Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTrees.map((tree) => (
          <TreeCard
            key={tree.id}
            tree={tree}
            isSelected={selectedTreeId === tree.id}
            onClick={() => handleTreeSelect(tree.id)}
            currentMonth={currentMonth}
          />
        ))}
      </div>

      {filteredTrees.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">ไม่พบไม้ผลที่ค้นหา</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-emerald-50 via-white to-sky-50" id="calendar">
        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              <CalendarDays className="w-4 h-4" />
              ปฏิทินการเกษตร
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
              วางแผนการ<span className="text-emerald-600">เพาะปลูก</span>ของคุณ
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              เลือกดูปฏิทินการเพาะปลูกหรือข้อมูลไม้ผลยืนต้น พร้อมคำแนะนำการใช้ปุ๋ยตามระยะการเติบโต
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-1.5 inline-flex gap-1">
              <button
                onClick={() => setActiveTab("calendar")}
                className={`
                  px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ease-out flex items-center gap-2
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  active:scale-95
                  ${activeTab === "calendar"
                    ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg scale-105 focus:ring-sky-400"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400"
                  }
                `}
              >
                <Calendar className="w-4 h-4" />
                ปฏิทินเพาะปลูก
              </button>
              <button
                onClick={() => setActiveTab("fruittree")}
                className={`
                  px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ease-out flex items-center gap-2
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  active:scale-95
                  ${activeTab === "fruittree"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105 focus:ring-green-400"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400"
                  }
                `}
              >
                <TreePine className="w-4 h-4" />
                ไม้ผลยืนต้น
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "calendar" ? renderCalendarTab() : renderFruitTreeTab()}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MODALS
      ═══════════════════════════════════════════════════════════ */}

      {/* Plant Detail Modal */}
      {plantModalOpen && activeModalPlant && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setPlantModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPlantModalOpen(false)}
              className="absolute top-4 right-4 z-30 bg-white/95 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative w-full h-64 bg-gradient-to-br from-green-50 to-emerald-50 select-none">
              <Image
                key={`modal-plant-${modalPlantIdx}`}
                src={activeModalPlant.image}
                alt={activeModalPlant.name}
                fill
                className="object-contain p-6"
                loading="lazy"
                quality={80}
              />
              
              {totalPlants > 1 && (
                <>
                  <button
                    onClick={() => moveModalPlant(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/70 text-white text-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/50"
                    aria-label="Previous"
                  >‹</button>
                  <button
                    onClick={() => moveModalPlant(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/70 text-white text-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/50"
                    aria-label="Next"
                  >›</button>

                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
                    {seasonalPlants.map((_, i: number) => (
                      <button
                        key={i}
                        onClick={() => setModalPlantIdx(i)}
                        className={`rounded-full transition-all duration-300 ease-out ${
                          i === modalPlantIdx ? "bg-gradient-to-r from-green-500 to-emerald-600 w-5 h-2.5 shadow-md" : "bg-gray-400/70 w-2.5 h-2.5 hover:bg-gray-500 hover:scale-125 active:scale-100"
                        }`}
                        aria-label={`Go to plant ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}

              <span className="absolute top-3 left-3 z-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                📅 {viewDate.toLocaleDateString("th-TH", { month: "long" })}
              </span>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent leading-tight mb-3">
                {activeModalPlant.name}
              </h2>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-2 flex items-center gap-1.5">
                  <Info className="w-4 h-4 flex-shrink-0" /> พืชที่เหมาะกับการปลูก
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {activeModalPlant.description || "พืชชนิดนี้เหมาะสำหรับการปลูกในเดือนนี้ ตามข้อมูลจากปฏิทินไม้ผล"}
                </p>
              </div>
              
              <button
                onClick={() => setPlantModalOpen(false)}
                className="w-full mt-6 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-bold py-3 px-4 rounded-xl text-center text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fertilizer Modal */}
      {modalOpen && modalSlide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300 ease-out max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-30 bg-white/95 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-sky-50 select-none">
              <Image
                key={`modal-${selectedCrop}-${modalIdx}`}
                src={modalSlide.product.image}
                alt={modalSlide.product.productName}
                fill
                className="object-contain p-6"
                loading="lazy"
                quality={80}
              />

              {totalFert > 1 && (
                <>
                  <button
                    onClick={() => moveFertModal(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/70 text-white text-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/50"
                    aria-label="Previous"
                  >‹</button>
                  <button
                    onClick={() => moveFertModal(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/70 text-white text-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/50"
                    aria-label="Next"
                  >›</button>
                </>
              )}

              {totalFert > 1 && (
                <span className="absolute top-3 left-3 z-20 bg-gradient-to-r from-blue-600 to-sky-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                  {modalIdx + 1} / {totalFert}
                </span>
              )}

              {totalFert > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setModalIdx(i)}
                      className={`rounded-full transition-all duration-300 ease-out ${
                        i === modalIdx ? "bg-gradient-to-r from-blue-500 to-sky-600 w-5 h-2.5 shadow-md" : "bg-gray-400/70 w-2.5 h-2.5 hover:bg-gray-500 hover:scale-125 active:scale-100"
                      }`}
                      aria-label={`Go to product ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent leading-tight flex-1">
                  {modalSlide.product.productName}
                </h2>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-sm text-gray-400 line-through">
                    ฿{modalSlide.product.oldPrice.toLocaleString()}
                  </span>
                  <span className="text-2xl font-black text-blue-800 whitespace-nowrap">
                    ฿{modalSlide.product.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {modalSlide.product.description}
              </p>

              <div className="text-sm font-medium text-blue-700 bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200 rounded-lg px-3 py-2 mb-5 shadow-sm">
                💡 {modalSlide.fertText}
              </div>

              <div className="flex flex-col gap-3 mb-4">
                <Link
                  href={`/products/${modalSlide.product.productId}`}
                  onClick={() => setModalOpen(false)}
                  className="relative overflow-hidden group bg-gradient-to-r from-orange-500 via-amber-600 to-yellow-600 hover:from-orange-600 hover:via-amber-700 hover:to-yellow-700 text-white font-bold py-4 px-6 rounded-xl text-center transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-base">ดูรายละเอียดสินค้า</span>
                  </div>
                </Link>
                <a
                  href="https://www.facebook.com/share/p/1ArBAZtMvr/?mibextid=wwXIf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setModalOpen(false)}
                  className="relative overflow-hidden group bg-gradient-to-r from-blue-500 via-sky-600 to-cyan-600 hover:from-blue-600 hover:via-sky-700 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-base">สั่งซื้อผ่าน Facebook</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </a>
              </div>

              {totalFert > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 pt-2 border-t border-gray-100">
                  {slides.map((slide, i) => (
                    <button
                      key={i}
                      onClick={() => setModalIdx(i)}
                      title={slide.product.productName}
                      className={`flex-shrink-0 w-14 h-14 rounded-lg border-2 overflow-hidden transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        i === modalIdx
                          ? "border-blue-500 scale-110 shadow-lg ring-2 ring-blue-200 focus:ring-blue-400"
                          : "border-gray-200 opacity-55 hover:opacity-90 hover:scale-105 focus:ring-gray-400"
                      }`}
                      aria-label={`Select product ${i + 1}`}
                    >
                      <Image
                        src={slide.product.image}
                        alt={slide.product.productName}
                        width={56} height={56}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tree Detail Modal */}
      {selectedTree && (
        <TreeDetailModal
          tree={selectedTree}
          isOpen={isTreeModalOpen}
          onClose={() => setIsTreeModalOpen(false)}
          currentMonth={currentMonth}
        />
      )}
    </>
  );
}
