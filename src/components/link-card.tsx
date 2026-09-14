import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { LinkIcon } from "@/components/icons";
import { LinkOptionsSheet } from "@/components/link-options-sheet";
import type { FeaturedLink } from "@/lib/profile";
import { cn } from "@/lib/utils";

export function LinkCard({
  link,
  index,
}: {
  link: FeaturedLink;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const external = link.href.startsWith("http");
  const hasOptions = Boolean(link.subLinks && link.subLinks.length > 0);

  const cardClassName = cn(
    "link-enter group relative flex min-h-14 w-full items-center gap-3 rounded-3xl bg-card p-3",
    "shadow-card",
    "transition-[box-shadow,transform,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
    "hover:-translate-y-0.5 hover:bg-card-hover hover:shadow-card-hover",
    "active:scale-[0.96] active:shadow-card",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  );

  const cardContent = (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-icon text-foreground">
        <LinkIcon id={link.icon} className="size-4" />
      </span>
      <span className="min-w-0 flex-1 pr-1 text-left">
        <span className="block font-medium leading-snug text-foreground">
          {link.title}
        </span>
        <span className="mt-0.5 block text-sm leading-snug text-muted">
          {link.subtitle}
        </span>
      </span>
      {hasOptions ? (
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-subtle",
            "transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)]",
            "group-hover:text-foreground",
          )}
          strokeWidth={1.75}
        />
      ) : (
        <ArrowUpRight
          className={cn(
            "size-4 shrink-0 text-subtle",
            "transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)]",
            "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground",
          )}
          strokeWidth={1.75}
        />
      )}
    </>
  );

  if (hasOptions) {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ animationDelay: `${180 + index * 70}ms` }}
          className={cardClassName}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          {cardContent}
        </button>
        <LinkOptionsSheet
          open={open}
          onClose={() => setOpen(false)}
          title={link.title}
          links={link.subLinks ?? []}
        />
      </>
    );
  }

  return (
    <a
      href={link.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      style={{ animationDelay: `${180 + index * 70}ms` }}
      className={cardClassName}
    >
      {cardContent}
    </a>
  );
}
