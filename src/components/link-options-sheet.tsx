import { useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { SubLink } from "@/lib/profile";
import { cn } from "@/lib/utils";

export function LinkOptionsSheet({
  open,
  onClose,
  title,
  links,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  links: SubLink[];
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-5">
      <button
        type="button"
        aria-label="關閉選單"
        className="absolute inset-0 bg-foreground/70"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "relative z-10 w-full max-w-md rounded-t-3xl bg-card p-5 shadow-card-hover",
          "sm:max-w-sm sm:rounded-3xl",
          "pb-[calc(env(safe-area-inset-bottom)+1.25rem)]",
        )}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-medium text-foreground">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="關閉"
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full",
              "bg-icon text-foreground",
              "transition-[transform,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
              "hover:shadow-card active:scale-[0.96]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "group flex min-h-12 items-center gap-3 rounded-2xl bg-icon px-4 py-3",
                "transition-[transform,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
                "hover:-translate-y-0.5 active:scale-[0.97]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <span className="flex-1 text-left font-medium text-foreground">
                {item.label}
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-subtle transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                strokeWidth={1.75}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
