import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { updates as curatedUpdates } from "@/data/site";

type UpdateType = "筆記" | "分享" | "文章" | "更新";

export type UpdateItem = {
  date: string;
  type: UpdateType;
  title: string;
  href?: string;
};

type GitHubCommit = {
  sha: string;
  commit: { message: string; author: { date: string } };
  html_url: string;
};

const REPO = "wulsir/long-";
const CACHE_KEY = "physics-updates-cache";
const CACHE_TTL = 10 * 60 * 1000; // 10 分鐘

/** 把 commit 訊息轉成站上看得懂的標題：去掉 feat: / fix: 這類前綴。 */
function parseCommit(message: string): { type: UpdateType; title: string } {
  const firstLine = message.split("\n")[0]?.trim() ?? message;
  const lower = firstLine.toLowerCase();
  const cleaned = firstLine.replace(/^(feat|fix|chore|docs|refactor|style|test|perf)(\([^)]*\))?:\s*/i, "");

  if (lower.startsWith("fix") || firstLine.includes("修復") || firstLine.includes("修補")) {
    return { type: "更新", title: cleaned };
  }
  if (lower.startsWith("feat") || firstLine.includes("新增") || firstLine.includes("加入")) {
    return { type: "分享", title: cleaned };
  }
  if (firstLine.includes("筆記") || firstLine.includes("文章") || firstLine.includes("散文")) {
    return { type: "筆記", title: cleaned };
  }
  return { type: "更新", title: cleaned };
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/** 先讀快取再打 GitHub API：未登入每小時限 60 次，一定要快取。 */
async function fetchCommits(): Promise<UpdateItem[]> {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { at: number; items: UpdateItem[] };
      if (Date.now() - parsed.at < CACHE_TTL && Array.isArray(parsed.items) && parsed.items.length > 0) {
        return parsed.items;
      }
    }
  } catch {
    /* ignore */
  }

  const response = await fetch(`https://api.github.com/repos/${REPO}/commits?per_page=8`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) throw new Error(`GitHub ${response.status}`);

  const commits = (await response.json()) as GitHubCommit[];
  const items = commits.map((commit) => {
    const { type, title } = parseCommit(commit.commit.message);
    return {
      date: formatDate(commit.commit.author.date),
      type,
      title,
      href: commit.html_url,
    };
  });

  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), items }));
  } catch {
    /* ignore quota */
  }
  return items;
}

/** 預設內容：GitHub 抓不到時就用這份策展清單，區塊永遠不會空。 */
const fallback: UpdateItem[] = curatedUpdates.map((item) => ({
  date: item.date,
  type: (item.type as UpdateType) ?? "更新",
  title: item.title,
  href: item.href,
}));

export function RecentUpdates() {
  const [items, setItems] = useState<UpdateItem[]>(fallback);

  useEffect(() => {
    let alive = true;
    fetchCommits()
      .then((data) => {
        if (alive && data.length > 0) setItems(data);
      })
      .catch(() => {
        /* 保留策展清單 */
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section aria-label="最近動態">
      <p className="text-xs font-medium tracking-wide text-subtle">最近動態</p>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((item) => {
          const inner = (
            <>
              <span className="mt-0.5 shrink-0 rounded-full bg-sage-tint px-2.5 py-1 text-xs font-medium text-sage">
                {item.date}
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-xs text-subtle">{item.type}</span>
                <span className="mt-0.5 block text-sm leading-snug text-ink">{item.title}</span>
              </span>
              {item.href ? (
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-subtle" strokeWidth={1.75} />
              ) : null}
            </>
          );
          return (
            <li key={`${item.date}-${item.title}`}>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex min-h-12 items-start gap-3 rounded-2xl border border-line bg-card/80 px-4 py-3 transition-colors duration-200 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                >
                  {inner}
                </a>
              ) : (
                <div className="flex min-h-12 items-start gap-3 rounded-2xl border border-line bg-card/80 px-4 py-3">
                  {inner}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
