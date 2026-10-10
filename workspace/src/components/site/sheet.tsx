import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { SubLink } from "@/data/site";
import { cn } from "@/lib/cn";

const rowClass =
  "flex min-h-12 w-full items-center gap-3 rounded-2xl bg-wash px-4 py-3 text-left transition-[transform,background-color] duration-200 ease-out hover:bg-card-hover active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus";

export function LinkSheet({
  open,
  title,
  links,
  onClose,
}: {
  open: boolean;
  title: string;
  links: SubLink[];
  onClose: () => void;
}) {
  const [stack, setStack] = useState<SubLink[]>([]);

  useEffect(() => {
    if (!open) setStack([]);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (stack.length > 0) setStack((current) => current.slice(0, -1));
      else onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, stack.length]);

  if (!open) return null;

  const current = stack[stack.length - 1];
  const items = current?.children ?? links;
  const heading = current?.label ?? title;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-5">
      <button type="button" aria-label="關閉選單" className="absolute inset-0 bg-ink/70" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={heading}
        className="relative z-10 w-full max-w-md rounded-t-3xl bg-card p-5 shadow-card-hover sm:max-w-sm sm:rounded-3xl"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1">
            {stack.length > 0 ? (
              <button
                type="button"
                aria-label="返回"
                onClick={() => setStack((currentStack) => currentStack.slice(0, -1))}
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-wash text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                <ChevronLeft className="size-4" strokeWidth={1.75} />
              </button>
            ) : null}
            <h2 className="truncate font-medium text-ink">{heading}</h2>
          </div>
          <button
            type="button"
            aria-label="關閉"
            onClick={onClose}
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-wash text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>
        <div className="flex max-h-[60dvh] flex-col gap-2 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
          {items.map((item) =>
            item.children && item.children.length > 0 ? (
              <button key={item.label} type="button" className={rowClass} onClick={() => setStack((currentStack) => [...currentStack, item])}>
                <span className="flex-1 font-medium text-ink">{item.label}</span>
                <ChevronRight className="size-4 shrink-0 text-subtle" strokeWidth={1.75} />
              </button>
            ) : item.href ? (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer noopener" className={rowClass}>
                <span className="flex-1 font-medium text-ink">{item.label}</span>
                <ArrowUpRight className="size-4 shrink-0 text-subtle" strokeWidth={1.75} />
              </a>
            ) : (
              <div key={item.label} className={cn(rowClass, "cursor-default hover:bg-wash active:scale-100")}>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-ink">{item.label}</span>
                  {item.note ? <span className="mt-1 block text-sm leading-relaxed text-muted">{item.note}</span> : null}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
