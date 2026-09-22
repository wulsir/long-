import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

const MUSIC_KEY = "physics-music";

export function AutumnAudio({ ducked }: { ducked: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(MUSIC_KEY);
      setOn(stored !== "off");
    } catch {
      setOn(true);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !ready) return;

    audio.volume = ducked ? 0.12 : 0.38;

    if (!on) {
      audio.pause();
      return;
    }

    const tryPlay = () => {
      if (!on) return;
      const play = audio.play();
      if (play) play.catch(() => {});
    };

    tryPlay();
    const onGesture = () => tryPlay();
    window.addEventListener("pointerdown", onGesture);
    window.addEventListener("keydown", onGesture);
    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [on, ready, ducked]);

  function toggle() {
    const next = !on;
    setOn(next);
    try {
      localStorage.setItem(MUSIC_KEY, next ? "on" : "off");
    } catch {
      /* ignore */
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (next) {
      const play = audio.play();
      if (play) play.catch(() => {});
    } else {
      audio.pause();
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/autumn.mp3"
        loop
        preload="auto"
        playsInline
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? "關閉秋意音樂" : "播放秋意音樂"}
        className={cn(
          "relative flex size-11 items-center justify-center rounded-full",
          "bg-card text-foreground shadow-card",
          "transition-[box-shadow,transform,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
          "hover:shadow-card-hover hover:-translate-y-px",
          "active:scale-[0.96]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        {on ? (
          <Volume2 className="size-4" strokeWidth={1.75} />
        ) : (
          <VolumeX className="size-4" strokeWidth={1.75} />
        )}
      </button>
    </>
  );
}
