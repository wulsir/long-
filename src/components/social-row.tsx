import { LinkIcon } from "@/components/icons";
import { socialLinks } from "@/lib/profile";
import { cn } from "@/lib/utils";

export function SocialRow() {
  return (
    <ul className="flex items-center justify-center gap-2.5">
      {socialLinks.map((item, index) => {
        const external = item.href.startsWith("http");
        return (
          <li
            key={item.label}
            className="social-enter"
            style={{ animationDelay: `${520 + index * 60}ms` }}
          >
            <a
              href={item.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer noopener" : undefined}
              aria-label={item.label}
              className={cn(
                "flex size-11 items-center justify-center rounded-full bg-card text-foreground shadow-card",
                "transition-[box-shadow,transform,background-color,color] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
                "hover:-translate-y-0.5 hover:bg-card-hover hover:shadow-card-hover",
                "active:scale-[0.96]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <LinkIcon id={item.icon} className="size-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
