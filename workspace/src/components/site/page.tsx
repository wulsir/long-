import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Brain,
  Check,
  ChevronDown,
  Github,
  Instagram,
  Link2,
  Mail,
  Moon,
  Play,
  Sparkles,
  Sun,
  Volume2,
  VolumeX,
  Youtube,
} from "lucide-react";
import {
  experimentNote,
  links,
  nowChips,
  physicsPieces,
  profile,
  rhythm,
  slips,
  socials,
  taipeiDayNumber,
  taipeiWeekIndex,
  updates,
  type LinkItem,
} from "@/data/site";
import { cn } from "@/lib/cn";
import { MapleField } from "@/components/site/maple";
import { LinkSheet } from "@/components/site/sheet";
import { QuizDialog } from "@/components/site/quiz";

const iconButton =
  "flex size-11 items-center justify-center rounded-full bg-card text-ink shadow-card transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-px hover:bg-card-hover hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus";

const linkCard =
  "group flex min-h-14 w-full items-center gap-3 rounded-3xl bg-card p-3 text-left shadow-card transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-card-hover hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus";

export function HomePage() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <MapleField />
      <div
        className="fixed right-4 z-40 flex items-center gap-2 sm:right-6"
        style={{ top: "max(1rem, env(safe-area-inset-top))" }}
      >
        <MusicButton ducked={videoOpen} />
        <ThemeButton />
      </div>
      <main
        className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-16 sm:px-8"
        style={{ paddingTop: "max(5rem, calc(env(safe-area-inset-top) + 4rem))" }}
      >
        <div className="grid items-start gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
          <Identity onPlay={() => setVideoOpen(true)} />
          <div className="flex min-w-0 flex-col gap-8">
            <SlipCard />
            <Featured />
            <LinkList onQuiz={() => setQuizOpen(true)} />
            <Rhythm />
            <Updates />
            <Footer />
          </div>
        </div>
      </main>
      <VideoDialog open={videoOpen} onClose={() => setVideoOpen(false)} />
      <QuizDialog open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}

function Identity({ onPlay }: { onPlay: () => void }) {
  return (
    <header className="rise-in flex flex-col items-center text-center lg:sticky lg:top-24 lg:items-start lg:text-left">
      <button
        type="button"
        onClick={onPlay}
        aria-label="播放動態影像"
        className="relative rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
      >
        {/* 內軌道：物理球 */}
        <span
          className="orbit-spin-inner pointer-events-none absolute -inset-1.5 rounded-full border border-sage/30"
          aria-hidden="true"
        >
          <span
            className="absolute top-0 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage shadow-[0_0_4px_color-mix(in_oklab,var(--sage)_50%,transparent)]"
            title="物理"
          />
        </span>
        {/* 外軌道：AI 球 */}
        <span
          className="orbit-spin-reverse pointer-events-none absolute -inset-3.5 rounded-full border border-sage/25"
          aria-hidden="true"
        >
          <span
            className="absolute top-0 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color-mix(in_oklab,var(--sage)_70%,#7a9bb8)] shadow-[0_0_4px_color-mix(in_oklab,#7a9bb8_40%,transparent)]"
            title="AI"
          />
        </span>
        <img
          src={profile.avatar}
          alt="physics long 的頭像"
          width={128}
          height={128}
          className="size-28 rounded-full object-cover shadow-avatar ring-4 ring-paper outline-1 -outline-offset-1 outline-ink/10 sm:size-32"
        />
        <span className="absolute right-0.5 bottom-0.5 flex size-9 items-center justify-center rounded-full bg-card text-ink shadow-card">
          <Play className="size-3.5 translate-x-px" strokeWidth={1.75} />
        </span>
      </button>
      <h1 className="mt-5 font-display text-4xl tracking-tight text-ink">{profile.name}</h1>
      <p className="mt-1 text-sm text-muted">{profile.handle}</p>
      <p className="mt-3 text-sm font-medium text-ink">{profile.role}</p>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{profile.bio}</p>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink">{profile.now}</p>
      <ul className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
        {nowChips.map((chip) => (
          <li key={chip} className="rounded-full bg-wash px-3 py-1 text-xs text-ink">
            {chip}
          </li>
        ))}
      </ul>
      <OrbitClock />
      <SocialRow />
    </header>
  );
}

function OrbitClock() {
  const [label, setLabel] = useState("桃園 · --:--");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const clock = new Intl.DateTimeFormat("zh-Hant-TW", {
        timeZone: "Asia/Taipei",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).format(now);
      setLabel(clock);
      setSeconds(Number(new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Taipei", second: "2-digit" }).format(now)));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mt-5 flex items-center gap-3 self-center rounded-3xl bg-card py-2 pr-4 pl-2 shadow-card lg:self-start">
      <svg viewBox="0 0 48 48" className="size-11 text-sage" aria-hidden="true">
        <circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.25" />
        <circle cx="24" cy="24" r="10" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
        <g style={{ transform: `rotate(${seconds * 6}deg)`, transformOrigin: "24px 24px" }}>
          <circle cx="24" cy="8" r="2.1" className="fill-sage" />
        </g>
        <circle cx="24" cy="24" r="1.5" className="fill-ink" />
      </svg>
      <div className="text-left">
        <p className="text-xs text-subtle">桃園時間</p>
        <p className="font-display text-lg text-ink tabular-nums">{label}</p>
      </div>
    </div>
  );
}

function SocialRow() {
  return (
    <ul className="mt-5 flex items-center justify-center gap-2.5 lg:justify-start">
      {socials.map((item) => (
        <li key={item.label}>
          <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer noopener" aria-label={item.label} className={iconButton}>
            <SocialIcon id={item.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}

function SlipCard() {
  const [offset, setOffset] = useState(0);
  const [showClass, setShowClass] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = Number.parseInt(localStorage.getItem("physics-slip-offset") ?? "0", 10);
      if (Number.isFinite(stored)) setOffset(stored);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const index = (taipeiDayNumber() + (ready ? offset : 0) + slips.length * 8) % slips.length;
  const slip = slips[index] ?? slips[0];
  if (!slip) return null;

  function nextSlip() {
    const next = offset + 1;
    setOffset(next);
    setShowClass(false);
    try {
      localStorage.setItem("physics-slip-offset", String(next));
    } catch {
      /* ignore */
    }
  }

  return (
    <section className="rise-in rounded-3xl bg-card p-5 shadow-card" aria-label="今日物理箋">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium tracking-wide text-subtle">今日物理箋</p>
        <p className="text-xs text-sage">{slip.field}</p>
      </div>
      <h2 className="mt-3 font-display text-3xl tracking-tight text-ink">{slip.formula}</h2>
      <p className="mt-2 text-sm font-medium text-ink">{slip.title}</p>
      <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted">{showClass ? slip.classroom : slip.line}</p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setShowClass((value) => !value)}
          className="min-h-11 flex-1 rounded-2xl bg-ink px-3 text-sm font-medium text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          {showClass ? "看式子" : "看課堂"}
        </button>
        <button
          type="button"
          onClick={nextSlip}
          className="min-h-11 flex-1 rounded-2xl bg-wash px-3 text-sm font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          下一則
        </button>
      </div>
    </section>
  );
}

function Featured() {
  const [openNote, setOpenNote] = useState(false);
  const piece = physicsPieces[0];

  return (
    <section className="rounded-3xl bg-card p-5 shadow-card">
      <p className="text-xs font-medium tracking-wide text-subtle">正在合作</p>
      <h2 className="mt-2 font-display text-2xl text-ink">物理與 AI</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        教學影片已經上線。實驗動畫還在後製，先從一堂課看起。
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {piece ? (
          <a
            href={piece.href}
            target="_blank"
            rel="noreferrer noopener"
            className="flex min-h-12 items-center justify-between gap-3 rounded-2xl bg-ink px-4 text-sm font-medium text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            {piece.label}
            <ArrowUpRight className="size-4" strokeWidth={1.75} />
          </a>
        ) : null}
        <button
          type="button"
          aria-expanded={openNote}
          onClick={() => setOpenNote((value) => !value)}
          className="flex min-h-12 items-center justify-between gap-3 rounded-2xl bg-wash px-4 text-left text-sm font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          實驗動畫進度
          <ChevronDown className={cn("size-4 transition-transform duration-200", openNote && "rotate-180")} strokeWidth={1.75} />
        </button>
      </div>
      {openNote ? <p className="mt-3 text-sm leading-relaxed text-muted">{experimentNote}</p> : null}
    </section>
  );
}

function LinkList({ onQuiz }: { onQuiz: () => void }) {
  return (
    <nav aria-label="精選連結" className="flex flex-col gap-2.5">
      <p className="text-xs font-medium tracking-wide text-subtle">入口</p>
      {links.map((link) => (
        <LinkRow key={link.title} link={link} onQuiz={onQuiz} />
      ))}
    </nav>
  );
}

function LinkRow({ link, onQuiz }: { link: LinkItem; onQuiz: () => void }) {
  const [open, setOpen] = useState(false);
  const external = Boolean(link.href?.startsWith("http") || link.href?.startsWith("mailto"));
  const nested = Boolean(link.subLinks?.length);
  const body = (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-wash text-ink">
        <LinkGlyph id={link.icon} />
      </span>
      <span className="min-w-0 flex-1 pr-1">
        <span className="block font-medium text-ink">{link.title}</span>
        <span className="mt-0.5 block text-sm text-muted">{link.subtitle}</span>
      </span>
      {link.action === "quiz" ? (
        <Play className="size-4 shrink-0 text-subtle group-hover:text-ink" strokeWidth={1.75} />
      ) : nested ? (
        <ChevronDown className="size-4 shrink-0 text-subtle" strokeWidth={1.75} />
      ) : (
        <ArrowUpRight className="size-4 shrink-0 text-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" strokeWidth={1.75} />
      )}
    </>
  );

  if (link.action === "quiz") {
    return (
      <button type="button" onClick={onQuiz} className={linkCard} aria-haspopup="dialog">
        {body}
      </button>
    );
  }

  if (nested && link.subLinks) {
    return (
      <>
        <button type="button" onClick={() => setOpen(true)} className={linkCard} aria-haspopup="dialog" aria-expanded={open}>
          {body}
        </button>
        <LinkSheet open={open} title={link.title} links={link.subLinks} onClose={() => setOpen(false)} />
      </>
    );
  }

  return (
    <a href={link.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer noopener" : undefined} className={linkCard}>
      {body}
    </a>
  );
}

function Rhythm() {
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => {
    setPicked(taipeiWeekIndex());
  }, []);

  const active = picked === null ? null : rhythm[picked];

  return (
    <section aria-label="工作室節奏">
      <p className="text-xs font-medium tracking-wide text-subtle">工作室節奏</p>
      <div className="mt-3 grid grid-cols-7 gap-1.5">
        {rhythm.map((item, index) => {
          const selected = picked === index;
          return (
            <button
              key={item.day}
              type="button"
              aria-pressed={selected}
              onClick={() => setPicked(index)}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center rounded-2xl px-1 text-xs transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                selected ? "bg-ink text-paper" : "bg-card text-ink shadow-card",
              )}
            >
              <span className={selected ? "text-paper/70" : "text-subtle"}>{item.day}</span>
              <span className="mt-0.5 font-medium">{item.title}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted">
        {active ? active.line : "點一天，看這間工作室怎麼排。"}
      </p>
    </section>
  );
}

function Updates() {
  return (
    <section>
      <p className="text-xs font-medium tracking-wide text-subtle">最近動態</p>
      <ul className="mt-3 flex flex-col gap-2">
        {updates.map((item) => {
          const inner = (
            <>
              <span className="mt-0.5 shrink-0 rounded-full bg-sage-tint px-2.5 py-1 text-xs font-medium text-sage">{item.date}</span>
              <span className="min-w-0 flex-1">
                <span className="text-xs text-subtle">{item.type}</span>
                <span className="mt-0.5 block text-sm leading-snug text-ink">{item.title}</span>
              </span>
              {item.href ? <ArrowUpRight className="mt-1 size-4 shrink-0 text-subtle" strokeWidth={1.75} /> : null}
            </>
          );
          return (
            <li key={`${item.date}-${item.title}`}>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex min-h-12 items-start gap-3 rounded-2xl border border-line bg-card/80 px-4 py-3 transition-colors duration-200 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                >
                  {inner}
                </a>
              ) : (
                <div className="flex min-h-12 items-start gap-3 rounded-2xl border border-line bg-card/80 px-4 py-3">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Footer() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <footer className="flex flex-col items-center gap-3 pb-[env(safe-area-inset-bottom)] text-center lg:items-start lg:text-left">
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-muted hover:bg-card hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
      >
        {copied ? <Check className="size-3.5" strokeWidth={2} /> : <Link2 className="size-3.5" strokeWidth={1.75} />}
        {copied ? "已複製" : "複製頁面連結"}
      </button>
      <p className="text-xs text-subtle">© {new Date().getFullYear()} {profile.name}</p>
      <p className="text-xs leading-relaxed text-subtle">
        音樂：蕭邦〈練習曲 Op.10 No.3・離別〉
        <br />
        鋼琴：Edward Neeman（Musopen 公有領域演奏）
      </p>
    </footer>
  );
}

function VideoDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      void video.play().catch(() => undefined);
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      videoRef.current?.pause();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-5">
      <button type="button" className="absolute inset-0 bg-ink/70" aria-label="關閉影片" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label="動態影像" className="relative z-10 w-full max-w-lg overflow-hidden rounded-t-3xl bg-card shadow-card-hover sm:rounded-3xl">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-sm font-medium text-ink">動態影像</p>
          <button
            type="button"
            aria-label="關閉"
            onClick={onClose}
            className="inline-flex h-11 items-center rounded-full px-3 text-sm text-ink hover:bg-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            關閉
          </button>
        </div>
        <video ref={videoRef} src={profile.video} className="aspect-square w-full bg-ink object-cover" playsInline controls />
      </div>
    </div>
  );
}

function MusicButton({ ducked }: { ducked: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [enabled, setEnabled] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setEnabled(localStorage.getItem("physics-music") !== "off");
    } catch {
      setEnabled(true);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = ducked ? 0.12 : 0.42;
  }, [ducked, ready]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !ready) return;
    if (!enabled) {
      audio.pause();
      return;
    }
    const tryPlay = () => {
      void audio.play().catch(() => undefined);
    };
    tryPlay();
    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    window.addEventListener("pointerdown", tryPlay);
    window.addEventListener("keydown", tryPlay);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("pointerdown", tryPlay);
      window.removeEventListener("keydown", tryPlay);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [enabled, ready]);

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem("physics-music", next ? "on" : "off");
    } catch {
      /* ignore */
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (next) void audio.play().catch(() => undefined);
    else audio.pause();
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/chopin-tristesse.mp3" loop preload="metadata" playsInline />
      <button type="button" onClick={toggle} aria-pressed={enabled} aria-label={enabled ? "關閉音樂" : "播放蕭邦〈離別〉"} className={iconButton}>
        {enabled ? <Volume2 className="size-4" strokeWidth={1.75} /> : <VolumeX className="size-4" strokeWidth={1.75} />}
      </button>
    </>
  );
}

function ThemeButton() {
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("physics-theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }

  return (
    <button type="button" onClick={toggle} aria-label="切換主題" className={iconButton}>
      <Sun className="hidden size-4 dark:block" strokeWidth={1.75} />
      <Moon className="size-4 dark:hidden" strokeWidth={1.75} />
    </button>
  );
}

function LinkGlyph({ id }: { id: LinkItem["icon"] }) {
  const className = "size-4";
  if (id === "github") return <Github className={className} strokeWidth={1.75} />;
  if (id === "brain") return <Brain className={className} strokeWidth={1.75} />;
  if (id === "book") return <BookOpen className={className} strokeWidth={1.75} />;
  if (id === "mail") return <Mail className={className} strokeWidth={1.75} />;
  return <Sparkles className={className} strokeWidth={1.75} />;
}

function SocialIcon({ id }: { id: (typeof socials)[number]["icon"] }) {
  const className = "size-4";
  if (id === "instagram") return <Instagram className={className} strokeWidth={1.75} />;
  if (id === "youtube") return <Youtube className={className} strokeWidth={1.75} />;
  if (id === "mail") return <Mail className={className} strokeWidth={1.75} />;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
