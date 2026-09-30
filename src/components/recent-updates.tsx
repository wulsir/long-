import { BookOpen, Video, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type UpdateItem = {
  date: string;        // "09-27" 格式
  type: "筆記" | "分享" | "文章" | "更新";
  title: string;
  href?: string;
};

export const recentUpdates: UpdateItem[] = [
  {
    date: "09-27",
    type: "筆記",
    title: "AI文章隨想上線",
    href: "https://docs.google.com/document/d/19nUmtO3kQe6uXclO-xZjYuE_7Mz4Te7U/view?usp=sharing",
  },
  {
    date: "09-27",
    type: "分享",
    title: "短篇散文「宿命的喚醒」",
    href: "#",
  },
  {
    date: "09-26",
    type: "分享",
    title: "物理教師日常 — 課程實錄 #02",
    href: "https://www.youtube.com/@Quantumlogic-rd1sv",
  },
  {
    date: "09-25",
    type: "更新",
    title: "個人站點上線，開始累積筆記",
    href: "#",
  },
];

const typeLabel: Record<UpdateItem["type"], string> = {
  筆記: "筆記",
  分享: "分享",
  文章: "文章",
  更新: "更新",
};

export function RecentUpdates() {
  return (
    <section className="mx-auto mt-8 w-full max-w-md">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-subtle">
        <BookOpen className="size-3.5" strokeWidth={1.75} />
        <span>最近動態</span>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {recentUpdates.map((item) => (
          <li
            key={item.date + item.title}
            className={cn(
              "group flex min-h-12 items-start gap-3 rounded-2xl border border-border/50 bg-card/50 px-4 py-3",
              "transition-[background-color,border-color] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
              "hover:bg-card hover:border-border/80",
              "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring",
            )}
          >
            <span className="mt-0.5 shrink-0 rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
              {item.date}
            </span>
            <div className="flex flex-1 min-w-0 gap-2">
              <span className="shrink-0 text-[11px] font-medium text-subtle/80">
                {typeLabel[item.type]}
              </span>
              <span className="flex-1 min-w-0 text-sm leading-snug text-foreground">
                {item.title}
              </span>
              {item.href && item.href !== "#" ? (
                <ArrowRight
                  className="shrink-0 size-3.5 text-subtle transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:text-foreground"
                  strokeWidth={1.75}
                />
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
