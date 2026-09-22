import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

function readIsDark() {
  return document.documentElement.classList.contains("dark");
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  localStorage.setItem("physics-theme", dark ? "dark" : "light");
  localStorage.removeItem("lin-theme");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", dark ? "#12110f" : "#f4f1ec");
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDark(readIsDark());
    setReady(true);
  }, []);

  function toggle() {
    const next = !readIsDark();
    applyTheme(next);
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "切換為淺色主題" : "切換為深色主題"}
      className={cn(
        "relative flex size-11 items-center justify-center rounded-full",
        "bg-card text-foreground shadow-card",
        "transition-[box-shadow,transform,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
        "hover:shadow-card-hover hover:-translate-y-px",
        "active:scale-[0.96]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <span className="relative size-5">
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "transition-[opacity,filter,transform] duration-[var(--motion-fast)] ease-[var(--ease-in-out)]",
            ready && dark
              ? "scale-100 opacity-100 blur-none"
              : "scale-[0.25] opacity-0 blur-[4px]",
          )}
        >
          <Moon className="size-4" strokeWidth={1.75} />
        </span>
        <span
          className={cn(
            "flex items-center justify-center",
            "transition-[opacity,filter,transform] duration-[var(--motion-fast)] ease-[var(--ease-in-out)]",
            ready && dark
              ? "scale-[0.25] opacity-0 blur-[4px]"
              : "scale-100 opacity-100 blur-none",
          )}
        >
          <Sun className="size-4" strokeWidth={1.75} />
        </span>
      </span>
    </button>
  );
}
