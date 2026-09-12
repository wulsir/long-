import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ShareLink() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium",
        "text-muted transition-[color,background-color,transform] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
        "hover:bg-card hover:text-foreground",
        "active:scale-[0.96]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <span className="relative size-3.5">
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "transition-[opacity,filter,transform] duration-[var(--motion-fast)] ease-[var(--ease-in-out)]",
            copied
              ? "scale-100 opacity-100 blur-none"
              : "scale-[0.25] opacity-0 blur-[4px]",
          )}
        >
          <Check className="size-3.5" strokeWidth={2} />
        </span>
        <span
          className={cn(
            "flex items-center justify-center",
            "transition-[opacity,filter,transform] duration-[var(--motion-fast)] ease-[var(--ease-in-out)]",
            copied
              ? "scale-[0.25] opacity-0 blur-[4px]"
              : "scale-100 opacity-100 blur-none",
          )}
        >
          <Link2 className="size-3.5" strokeWidth={1.75} />
        </span>
      </span>
      {copied ? "已複製連結" : "複製頁面連結"}
    </button>
  );
}
