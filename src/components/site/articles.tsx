import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { articles, searchArticles, type Article } from "@/data/articles";
import { cn } from "@/lib/cn";

export function ArticlesCard() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => searchArticles(query), [query]);

  return (
    <section className="rounded-3xl bg-card p-5 shadow-card" aria-label="文章摘錄">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium tracking-wide text-subtle">文章摘錄</p>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-subtle" strokeWidth={1.75} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜尋文章…"
            aria-label="搜尋文章"
            className="h-9 w-32 rounded-full bg-wash pr-3 pl-8 text-sm text-ink placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus sm:w-40"
          />
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {filtered.length === 0 ? (
          <li className="rounded-2xl bg-wash px-4 py-6 text-center text-sm text-muted">
            找不到「{query}」相關文章。
          </li>
        ) : (
          filtered.map((article) => (
            <li key={article.id}>
              <a
                href={article.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex min-h-14 items-start gap-3 rounded-2xl border border-line bg-card/80 px-4 py-3 transition-colors duration-200 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="shrink-0 rounded-full bg-sage-tint px-2 py-0.5 text-[10px] font-medium text-sage">
                      {article.date}
                    </span>
                    <span className="truncate text-sm font-medium text-ink">{article.title}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{article.excerpt}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {article.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full bg-wash px-2 py-0.5 text-[10px] text-subtle"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight
                  className="mt-1 size-4 shrink-0 text-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                  strokeWidth={1.75}
                />
              </a>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
