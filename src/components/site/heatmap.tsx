import { useEffect, useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import {
  activityColors,
  activityLabel,
  activityTypes,
  addActivity,
  dateKey,
  formatDate,
  getYearStats,
  readAll,
  removeActivity,
  todayKey,
  type ActivityType,
  type DayRecord,
} from "@/data/contributions";
import { cn } from "@/lib/cn";

const YEAR = 2026;

function getLevel(record: DayRecord | undefined, max: number): number {
  if (!record || record.activities.length === 0) return 0;
  const ratio = record.activities.length / Math.max(max, 1);
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

const levelColors = ["bg-wash", "bg-sage/30", "bg-sage/60", "bg-sage/90", "bg-ink"];

export function Heatmap() {
  const [data, setData] = useState<Record<string, DayRecord>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    setData(readAll());
  }, []);

  const maxPerDay = useMemo(() => {
    let max = 1;
    for (const key of Object.keys(data)) {
      const len = data[key]?.activities.length ?? 0;
      if (len > max) max = len;
    }
    return max;
  }, [data]);

  const stats = useMemo(() => getYearStats(), [data]);

  const today = todayKey();

  function toggleActivity(type: ActivityType) {
    if (!selected) return;
    const existing = data[selected];
    if (existing?.activities.includes(type)) {
      removeActivity(selected, type);
    } else {
      addActivity(selected, type);
    }
    setData(readAll());
  }

  function isSelected(type: ActivityType): boolean {
    if (!selected) return false;
    return data[selected]?.activities.includes(type) ?? false;
  }

  const selectedRecord = selected ? data[selected] : null;
  const selectedLevel = getLevel(selectedRecord ?? undefined, maxPerDay);

  // 52 weeks x 7 days grid
  const weeks = useMemo(() => {
    const result: { key: string; record: DayRecord | undefined; dayOfWeek: number }[][] = [];
    const firstDay = new Date(YEAR, 0, 1);
    const startOffset = firstDay.getDay(); // 0=Sun

    let week: { key: string; record: DayRecord | undefined; dayOfWeek: number }[] = [];
    // Fill leading empty cells
    for (let i = 0; i < startOffset; i += 1) {
      week.push({ key: `empty-${i}`, record: undefined, dayOfWeek: i });
    }

    for (let day = 0; day < 365; day += 1) {
      const key = dateKey(day);
      week.push({ key, record: data[key], dayOfWeek: new Date(YEAR, 0, 1 + day).getDay() });
      if (week.length === 7) {
        result.push(week);
        week = [];
      }
    }
    if (week.length > 0) {
      while (week.length < 7) {
        week.push({ key: `tail-${week.length}`, record: undefined, dayOfWeek: week.length });
      }
      result.push(week);
    }
    return result;
  }, [data]);

  return (
    <section className="rounded-3xl bg-card p-5 shadow-card" aria-label="每日貢獻熱圖">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium tracking-wide text-subtle">每日貢獻</p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="上一年"
            className="flex size-8 items-center justify-center rounded-full text-subtle hover:bg-wash hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <ChevronLeft className="size-4" strokeWidth={1.75} />
          </button>
          <p className="min-w-14 text-center text-sm font-medium text-ink tabular-nums">{YEAR}</p>
          <button
            type="button"
            aria-label="下一年"
            className="flex size-8 items-center justify-center rounded-full text-subtle hover:bg-wash hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <ChevronRight className="size-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Year stats */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-2xl bg-wash px-3 py-2.5">
          <p className="text-xs text-subtle">總活動</p>
          <p className="mt-0.5 text-lg font-semibold text-ink tabular-nums">{stats.total}</p>
        </div>
        <div className="rounded-2xl bg-wash px-3 py-2.5">
          <p className="text-xs text-subtle">活躍天數</p>
          <p className="mt-0.5 text-lg font-semibold text-ink tabular-nums">{stats.activeDays}</p>
        </div>
        <div className="rounded-2xl bg-wash px-3 py-2.5">
          <p className="text-xs text-subtle">連續天數</p>
          <p className="mt-0.5 text-lg font-semibold text-ink tabular-nums">{stats.streak}</p>
        </div>
      </div>

      {/* Heatmap grid */}
      <div className="mt-5 overflow-x-auto pb-1">
        <div className="flex gap-1" style={{ minWidth: "max-content" }}>
          {weeks.map((week, wi) => (
            <div key={`w-${wi}`} className="flex flex-col gap-1">
              {week.map((cell) => {
                const level = getLevel(cell.record, maxPerDay);
                const isToday = cell.key === today;
                const isSelected = cell.key === selected;
                return (
                  <button
                    key={cell.key}
                    type="button"
                    disabled={cell.key.startsWith("empty-") || cell.key.startsWith("tail-")}
                    onClick={() => {
                      setSelected(cell.key === selected ? null : cell.key);
                      setPickerOpen(cell.key !== selected);
                    }}
                    aria-label={cell.record ? `${cell.key}: ${cell.record.activities.join(", ")}` : cell.key}
                    className={cn(
                      "size-3 rounded-sm transition-transform duration-100 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus sm:size-3.5",
                      levelColors[level],
                      isToday && "ring-2 ring-sage ring-offset-1 ring-offset-card",
                      isSelected && "ring-2 ring-ink ring-offset-1 ring-offset-card",
                      cell.key.startsWith("empty-") || cell.key.startsWith("tail-") ? "invisible" : "hover:scale-110",
                    )}
                  />
                );
              })}
            </div>
          ))}
        </div>
        {/* Day labels */}
        <div className="mt-1 flex gap-1 text-[10px] text-subtle" style={{ minWidth: "max-content" }}>
          {weeks.map((week, wi) => (
            <div key={`lbl-${wi}`} className="flex flex-col gap-1">
              {week.map((cell, di) => (
                <span key={`lbl-${wi}-${di}`} className="flex size-3 items-center justify-center sm:size-3.5">
                  {wi === 0 && cell.dayOfWeek === 1 ? "一" : null}
                  {wi === 0 && cell.dayOfWeek === 3 ? "三" : null}
                  {wi === 0 && cell.dayOfWeek === 5 ? "五" : null}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-subtle">
        <span>少</span>
        {levelColors.map((c) => (
          <span key={c} className={cn("size-3 rounded-sm", c)} />
        ))}
        <span>多</span>
      </div>

      {/* Activity type summary */}
      <div className="mt-4 flex flex-wrap gap-2">
        {activityTypes.map((type) => (
          <span
            key={type}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs"
            style={{ backgroundColor: `${activityColors[type]}1a`, color: activityColors[type] }}
          >
            <span className="size-2 rounded-full" style={{ backgroundColor: activityColors[type] }} />
            {type} {stats.byType[type]}
          </span>
        ))}
      </div>

      {/* Selected day picker */}
      {selected && pickerOpen ? (
        <div className="mt-4 rounded-2xl bg-wash p-4">
          <p className="text-sm font-medium text-ink">{formatDate(selected)}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {activityTypes.map((type) => {
              const active = isSelected(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleActivity(type)}
                  aria-pressed={active}
                  className={cn(
                    "min-h-10 rounded-full px-3.5 text-sm font-medium transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                    active
                      ? "text-white shadow-card"
                      : "bg-card text-ink hover:bg-card-hover",
                  )}
                  style={active ? { backgroundColor: activityColors[type] } : undefined}
                >
                  {activityLabel(type)}
                </button>
              );
            })}
          </div>
          {selectedRecord && selectedRecord.activities.length > 0 ? (
            <p className="mt-3 text-sm text-muted">
              當天做了：{selectedRecord.activities.join("、")}
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted">這天还没有記錄。</p>
          )}
        </div>
      ) : null}
    </section>
  );
}
