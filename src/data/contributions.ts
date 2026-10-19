export type ActivityType = "剪片" | "寫字" | "上課" | "動畫" | "其他";

export type DayRecord = {
  date: string;
  activities: ActivityType[];
};

const STORAGE_KEY = "physics-contributions";
const YEAR = 2026;

export function todayKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * 固定紀錄：寫在程式碼裡，所有訪客都看得到。
 * 要新增就在這裡加一行：「日期: [活動...]」，活動只能是
 * 剪片 / 寫字 / 上課 / 動畫 / 其他。改完 push 就會更新。
 */
const seed: Record<string, ActivityType[]> = {
  "2026-09-25": ["其他"], // 個人站點上線
  "2026-09-26": ["上課", "剪片"], // 物理教師日常 課程實錄 #02
  "2026-09-27": ["寫字"], // AI 文章隨想、散文「宿命的喚醒」
  "2026-10-10": ["其他"], // 軌道時鐘、今日物理箋、工作室節奏
  "2026-10-19": ["動畫"], // 油滴、拉塞福散射、湯姆森射線管
};

function readLocal(): Record<string, DayRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function readAll(): Record<string, DayRecord> {
  const merged: Record<string, DayRecord> = {};
  for (const [date, activities] of Object.entries(seed)) {
    merged[date] = { date, activities: [...activities] };
  }
  const local = readLocal();
  for (const key of Object.keys(local)) {
    const rec = local[key];
    if (!rec) continue;
    const base = merged[key]?.activities ?? [];
    const union = [...base];
    for (const a of rec.activities) if (!union.includes(a)) union.push(a);
    if (union.length > 0) merged[key] = { date: key, activities: union };
  }
  return merged;
}

export function writeAll(data: Record<string, DayRecord>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota */
  }
}

export function addActivity(date: string, type: ActivityType): void {
  const all = readLocal();
  const existing = all[date];
  if (existing) {
    if (!existing.activities.includes(type)) {
      existing.activities.push(type);
    }
  } else {
    all[date] = { date, activities: [type] };
  }
  writeAll(all);
}

export function removeActivity(date: string, type: ActivityType): void {
  const all = readLocal();
  const existing = all[date];
  if (!existing) return;
  existing.activities = existing.activities.filter((a) => a !== type);
  if (existing.activities.length === 0) {
    delete all[date];
  }
  writeAll(all);
}

export function dateKey(offset: number): string {
  const base = new Date(YEAR, 0, 1 + offset);
  const y = base.getFullYear();
  const m = String(base.getMonth() + 1).padStart(2, "0");
  const d = String(base.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDate(key: string): string {
  const [y, m, d] = key.split("-");
  return `${y} 年 ${Number(m)} 月 ${Number(d)} 日`;
}

export function activityLabel(type: ActivityType): string {
  return type;
}

export const activityTypes: ActivityType[] = ["剪片", "寫字", "上課", "動畫", "其他"];

export const activityColors: Record<ActivityType, string> = {
  剪片: "#22c55e",
  寫字: "#3b82f6",
  上課: "#f59e0b",
  動畫: "#8b5cf6",
  其他: "#64748b",
};

export function getYearStats(): {
  total: number;
  activeDays: number;
  streak: number;
  byType: Record<ActivityType, number>;
} {
  const all = readAll();
  let total = 0;
  let activeDays = 0;
  const byType: Record<ActivityType, number> = { 剪片: 0, 寫字: 0, 上課: 0, 動畫: 0, 其他: 0 };

  for (const key of Object.keys(all)) {
    const rec = all[key];
    if (rec.activities.length > 0) {
      activeDays += 1;
      total += rec.activities.length;
      for (const a of rec.activities) {
        byType[a] += 1;
      }
    }
  }

  let streak = 0;
  for (let i = 364; i >= 0; i -= 1) {
    const k = dateKey(i);
    if (all[k] && all[k].activities.length > 0) {
      streak += 1;
    } else {
      break;
    }
  }

  return { total, activeDays, streak, byType };
}
