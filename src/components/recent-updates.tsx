import { useEffect, useState } from "react";
import { BookOpen, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type UpdateItem = {
  date: string;
  type: "筆記" | "分享" | "文章" | "更新";
  title: string;
  href?: string;
};

type GitHubCommit = {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  html_url: string;
};

function parseCommitMessage(message: string): { type: UpdateItem["type"]; title: string } {
  const lower = message.toLowerCase();
  if (lower.includes("fix") || lower.includes("修復") || lower.includes("修補")) {
    return { type: "更新", title: message };
  }
  if (lower.includes("feat") || lower.includes("新增") || lower.includes("加入")) {
    return { type: "分享", title: message };
  }
  if (lower.includes("筆記") || lower.includes("文章") || lower.includes("散文")) {
    return { type: "筆記", title: message };
  }
  if (lower.includes("更新") || lower.includes("update")) {
    return { type: "更新", title: message };
  }
  return { type: "更新", title: message };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}-${day}`;
}

async function fetchRecentUpdates(): Promise<UpdateItem[]> {
  const response = await fetch(
    "https://api.github.com/repos/wulsir/long-/commits?per_page=10"
  );
  
  if (!response.ok) {
    throw new Error(`GitHub API 錯誤: ${response.status}`);
  }
  
  const commits: GitHubCommit[] = await response.json();
  
  return commits.map((commit) => {
    const { type, title } = parseCommitMessage(commit.commit.message);
    return {
      date: formatDate(commit.commit.author.date),
      type,
      title,
      href: commit.html_url,
    };
  });
}

const typeLabel: Record<UpdateItem["type"], string> = {
  筆記: "筆記",
  分享: "分享",
  文章: "文章",
  更新: "更新",
};

export function RecentUpdates() {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetchRecentUpdates()
      .then((data) => {
        if (mounted) {
          setUpdates(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : "載入失敗");
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="mx-auto mt-8 w-full max-w-md">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-subtle">
        <BookOpen className="size-3.5" strokeWidth={1.75} />
        <span>最近動態</span>
      </div>

      {/* Loading 狀態 */}
      {loading ? (
        <div className="mt-3 flex items-center justify-center gap-2 rounded-2xl border border-border/50 bg-card/50 px-4 py-6 text-sm text-subtle">
          <Loader2 className="size-4 animate-spin" />
          <span>載入中...</span>
        </div>
      ) : error ? (
        /* Error 狀態 */
        <div className="mt-3 flex items-center justify-center gap-2 rounded-2xl border border-border/50 bg-card/50 px-4 py-6 text-sm text-subtle">
          <AlertCircle className="size-4" />
          <span>載入失敗：{error}</span>
        </div>
      ) : (
        /* 正常顯示 */
        <ul className="mt-3 flex flex-col gap-2">
          {updates.map((item) => (
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
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-subtle transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:text-foreground"
                  >
                    <ArrowRight className="size-3.5" strokeWidth={1.75} />
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
