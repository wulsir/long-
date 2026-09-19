import { MapPin, Play } from "lucide-react";
import { profile } from "@/lib/profile";
import { cn } from "@/lib/utils";

export function ProfileHeader({ onPlayVideo }: { onPlayVideo: () => void }) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="hero-enter relative">
        <button
          type="button"
          onClick={onPlayVideo}
          aria-label="播放動態影像"
          className={cn(
            "relative rounded-full",
            "transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)]",
            "hover:-translate-y-0.5 active:scale-[0.96]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <img
            src={profile.avatar}
            alt={`${profile.name} 的頭像`}
            width={128}
            height={128}
            className={cn(
              "size-28 rounded-full object-cover shadow-avatar sm:size-32",
              "outline outline-1 -outline-offset-1 outline-foreground/10",
              "ring-4 ring-background",
            )}
          />
          <span
            className={cn(
              "absolute right-0.5 bottom-0.5 flex size-9 items-center justify-center rounded-full",
              "bg-card text-foreground shadow-card sm:size-10",
            )}
          >
            <Play className="ml-0.5 size-3.5 fill-foreground sm:size-4" strokeWidth={1.75} />
          </span>
        </button>
      </div>

      <p
        className="hero-enter mt-5 text-sm font-medium tracking-wide text-muted"
        style={{ animationDelay: "70ms" }}
      >
        {profile.handle}
      </p>

      <h1
        className="hero-enter mt-1 font-display text-name text-foreground"
        style={{ animationDelay: "110ms" }}
      >
        {profile.name}
      </h1>

      {profile.nameEn !== profile.name ? (
        <p
          className="hero-enter mt-1 text-sm tracking-wide text-subtle"
          style={{ animationDelay: "150ms" }}
        >
          {profile.nameEn}
        </p>
      ) : null}

      <p
        className="hero-enter mt-3 text-sm font-medium text-foreground"
        style={{ animationDelay: "180ms" }}
      >
        {profile.role}
      </p>

      <p
        className="hero-enter mt-3 max-w-80 text-base leading-relaxed text-muted"
        style={{ animationDelay: "220ms" }}
      >
        {profile.bio}
      </p>

      <div
        className="hero-enter mt-4 flex flex-wrap items-center justify-center gap-2"
        style={{ animationDelay: "260ms" }}
      >
        <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-card px-3 text-xs font-medium text-muted shadow-card">
          <MapPin className="size-3.5" strokeWidth={1.75} />
          {profile.location}
        </span>
        <span className="inline-flex h-8 items-center rounded-full bg-accent/12 px-3 text-xs font-medium text-accent">
          {profile.availability}
        </span>
      </div>
    </header>
  );
}
