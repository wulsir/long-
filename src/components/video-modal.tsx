import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { profile } from "@/lib/profile";
import { cn } from "@/lib/utils";

export function VideoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) {
      videoRef.current?.pause();
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      const play = video.play();
      if (play) play.catch(() => {});
    }
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      <button
        type="button"
        aria-label="關閉影片"
        className="absolute inset-0 bg-foreground/70"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="動態影像"
        className="relative z-10 w-full max-w-xs sm:max-w-sm"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="關閉"
          className={cn(
            "absolute -top-12 right-0 flex size-11 items-center justify-center rounded-full",
            "bg-card text-foreground shadow-card",
            "transition-[transform,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
            "hover:shadow-card-hover active:scale-[0.96]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <X className="size-4" strokeWidth={1.75} />
        </button>
        <video
          ref={videoRef}
          src={profile.video}
          poster={profile.avatar}
          controls
          playsInline
          autoPlay
          className="w-full rounded-2xl bg-foreground shadow-avatar outline outline-1 -outline-offset-1 outline-foreground/20"
        />
      </div>
    </div>
  );
}
