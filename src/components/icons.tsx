import {
  BookOpen,
  Camera,
  Github,
  Instagram,
  Mail,
  ShoppingBag,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import type { LinkIconId } from "@/lib/profile";
import { cn } from "@/lib/utils";

function XMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const lucideMap: Record<Exclude<LinkIconId, "x">, LucideIcon> = {
  camera: Camera,
  instagram: Instagram,
  book: BookOpen,
  shop: ShoppingBag,
  mail: Mail,
  youtube: Youtube,
  github: Github,
};

export function LinkIcon({
  id,
  className,
}: {
  id: LinkIconId;
  className?: string;
}) {
  if (id === "x") {
    return <XMark className={cn("size-4", className)} />;
  }
  const Icon = lucideMap[id];
  return <Icon className={cn("size-4", className)} strokeWidth={1.75} />;
}
