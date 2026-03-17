"use client";

// ═══════════════════════════════════════════════════════════════
// 🌳 FRUIT TREE CALENDAR COMPONENT v2.0
// ═══════════════════════════════════════════════════════════════

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
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
} from "lucide-react";

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

interface FruitTreeCalendarProps {
  initialSelectedTree?: string;
  onTreeSelect?: (treeId: string) => void;
  compact?: boolean;
  hideHeader?: boolean;
  hideSidebar?: boolean;
  className?: string;
}

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════

const CATEGORY_ICONS: Record<FruitCategory, React.ReactNode> = {
  "ไม้ผลเมืองร้อน": <Sun className="w-4 h-4" />,
  "ไม้ผลเมืองหนาว": <Snowflake className="w-4 h-4" />,
  "ไม้ผลอื่นๆ": <Apple className="w-4 h-4" />,
  "พืชเศรษฐกิจ": <Banknote className="w-4 h-4" />,
  "พืชผัก": <Leaf className="w-4 h-4" />,
};

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
        relative overflow-hidden rounded-xl p-3 cursor-pointer
        transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5
        ${isCurrentMonth ? "ring-2 ring-offset-2 ring-green-500" : ""}
        ${hasActivities ? "bg-white shadow-md" : "bg-gray-50"}
      `}
      style={{
        borderLeft: hasActivities ? `4px solid ${monthData.themeColor}` : "4px solid transparent",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500">{monthData.monthShort}</span>
        {isCurrentMonth && (
          <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-green-500 rounded-full">
            เดือนนี้
          </span>
        )}
      </div>

      <div className="space-y-1.5">
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

function ActivityBadge({
  activity,
  size = "md",
}: {
  activity: FruitTreeActivity;
  size?: "sm" | "md" | "lg";
}) {
  const colors = ACTIVITY_COLORS[activity.color];
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  return (
    <div
      className={`
        inline-flex items-center gap-1 rounded-full font-medium
        border ${colors.bg} ${colors.text} ${colors.border}
        ${sizeClasses[size]}
      `}
    >
      <span className="text-xs">{activity.icon}</span>
      <span className="truncate max-w-[80px]">{activity.activity}</span>
    </div>
  );
}

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
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div
        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                   md:w-full md:max-w-4xl md:max-h-[85vh]
                   bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
      >
        <div className="flex flex-col h-full max-h-[85vh]">
          <div className="relative p-6 bg-gradient-to-br from-green-50 to-emerald-50">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-start gap-4">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shadow-lg">
                <Image
                  src={tree.image}
                  alt={tree.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-2">
                  {tree.category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{tree.name}</h2>
                <p className="text-sm text-gray-600">{tree.description}</p>
              </div>
            </div>

            {tree.harvestNote && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-blue-700 mb-1">หมายเหตุการเก็บเกี่ยว</p>
                    <p className="text-sm text-blue-600">{tree.harvestNote}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-500" />
                กิจกรรมเดือน{getThaiMonthName(currentMonth)} (เดือนนี้)
              </h3>
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="flex flex-wrap gap-2">
                  {currentMonthData?.activities.map((act, idx) => (
                    <ActivityBadge key={idx} activity={act} size="lg" />
                  )) || <span className="text-gray-500">ไม่มีกิจกรรม</span>}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">ปฏิทินทั้งปี</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
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
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-blue-500" />
                  ตารางปุ๋ย
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left font-medium text-gray-700 rounded-l-lg">เดือน</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">ชนิด</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">สูตร</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">อัตรา</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700 rounded-r-lg">วัตถุประสงค์</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {tree.fertilizers.map((fert, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900">
                            {getThaiMonthName(fert.month)}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{fert.type}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
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
      className={`
        relative overflow-hidden rounded-2xl cursor-pointer
        transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg
        ${isSelected ? "ring-2 ring-green-500 shadow-xl" : "shadow-md"}
      `}
    >
      <div className="relative h-40 bg-gray-100">
        <Image src={tree.image} alt={tree.name} fill className="object-cover" />
        
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-white bg-black/50 backdrop-blur-sm rounded-full">
            {CATEGORY_ICONS[tree.category]}
            {tree.category}
          </span>
        </div>

        {hasHarvest && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-white bg-blue-500 rounded-full animate-pulse">
              <ShoppingBag className="w-3 h-3" />
              เก็บเกี่ยว
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-lg font-bold text-white">{tree.name}</h3>
        </div>
      </div>

      <div className="p-3 bg-white">
        <p className="text-xs text-gray-500 line-clamp-2 mb-2">{tree.description}</p>
        
        <div className="flex flex-wrap gap-1">
          {currentMonthData?.activities.slice(0, 2).map((act, idx) => (
            <ActivityBadge key={idx} activity={act} size="sm" />
          ))}
          {(currentMonthData?.activities.length || 0) > 2 && (
            <span className="text-[10px] text-gray-400 px-1">+{currentMonthData!.activities.length - 2}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function FruitTreeCalendar({
  initialSelectedTree,
  onTreeSelect,
  compact = false,
  hideHeader = false,
  hideSidebar = false,
  className = "",
}: FruitTreeCalendarProps) {
  const [selectedCategory, setSelectedCategory] = useState<FruitCategory | "all">("all");
  const [selectedTreeId, setSelectedTreeId] = useState<string | null>(initialSelectedTree || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonth] = useState(() => new Date().getMonth());

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

  const handleTreeSelect = useCallback(
    (treeId: string) => {
      setSelectedTreeId(treeId);
      setIsModalOpen(true);
      onTreeSelect?.(treeId);
    },
    [onTreeSelect]
  );

  const categories = getAllCategories();

  if (compact) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}>
        {!hideHeader && (
          <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TreePine className="w-5 h-5" />
              ปฏิทินไม้ผล
            </h3>
          </div>
        )}

        <div className="p-4 max-h-[400px] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredTrees.slice(0, 6).map((tree) => (
              <TreeCard
                key={tree.id}
                tree={tree}
                isSelected={selectedTreeId === tree.id}
                onClick={() => handleTreeSelect(tree.id)}
                currentMonth={currentMonth}
              />
            ))}
          </div>
        </div>

        {selectedTree && (
          <TreeDetailModal
            tree={selectedTree}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            currentMonth={currentMonth}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`bg-gray-50 min-h-screen ${className}`}>
      {!hideHeader && (
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
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
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ค้นหาไม้ผล..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-green-500 w-full md:w-64"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
              <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <button
                onClick={() => setSelectedCategory("all")}
                className={`
                  px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                  ${selectedCategory === "all"
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                    px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                    ${selectedCategory === cat
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {!hideSidebar && (
            <aside className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-24">
                <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-green-500" />
                  รายชื่อไม้ผล ({filteredTrees.length})
                </h2>
                
                <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-1">
                  {filteredTrees.map((tree) => (
                    <button
                      key={tree.id}
                      onClick={() => handleTreeSelect(tree.id)}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:scale-[1.01]
                        ${selectedTreeId === tree.id
                          ? "bg-green-50 ring-1 ring-green-200"
                          : "hover:bg-gray-50"
                        }
                      `}
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image src={tree.image} alt={tree.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{tree.name}</p>
                        <p className="text-xs text-gray-500">{tree.category}</p>
                      </div>
                      {tree.monthlyActivities[currentMonth].activities.some((act) =>
                        act.activity.includes("เก็บเกี่ยว")
                      ) && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}

          <div className="flex-1">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
      </main>

      {selectedTree && (
        <TreeDetailModal
          tree={selectedTree}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentMonth={currentMonth}
        />
      )}
    </div>
  );
}

export default FruitTreeCalendar;
