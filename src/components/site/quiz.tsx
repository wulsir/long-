import { useEffect, useMemo, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { questions, scoreNote } from "@/data/site";
import { cn } from "@/lib/cn";

const BEST_KEY = "physics-logic-quiz-best";

type PlayQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  answer: number;
  explain: string;
};

function shuffle<T>(items: T[]) {
  const next = items.slice();
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    const current = next[index];
    next[index] = next[swap] as T;
    next[swap] = current as T;
  }
  return next;
}

function deal(): PlayQuestion[] {
  return shuffle(questions).map((question) => {
    const order = shuffle(question.choices.map((_, index) => index));
    return {
      ...question,
      choices: order.map((index) => question.choices[index] ?? ""),
      answer: order.indexOf(question.answer),
    };
  });
}

function readBest() {
  try {
    const raw = localStorage.getItem(BEST_KEY);
    const value = raw ? Number.parseInt(raw, 10) : 0;
    return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  } catch {
    return 0;
  }
}

function writeBest(score: number) {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {
    /* ignore quota */
  }
}

const primaryButton =
  "mt-auto flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-ink text-paper transition-[transform,opacity] duration-200 ease-out hover:opacity-90 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:opacity-35";

export function QuizDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [phase, setPhase] = useState<"intro" | "play" | "result">("intro");
  const [deck, setDeck] = useState<PlayQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [bestReady, setBestReady] = useState(false);

  useEffect(() => {
    if (!open) return;
    setPhase("intro");
    setDeck([]);
    setIndex(0);
    setPicked(null);
    setScore(0);
    setBest(readBest());
    setBestReady(true);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const question = deck[index];
  const total = deck.length || 10;
  const answered = picked !== null;
  const correct = question ? picked === question.answer : false;
  const last = index + 1 >= total;
  const verdict = useMemo(() => scoreNote(score), [score]);

  function start() {
    setDeck(deal());
    setIndex(0);
    setPicked(null);
    setScore(0);
    setPhase("play");
  }

  function choose(choice: number) {
    if (answered || !question || choice < 0 || choice >= question.choices.length) return;
    setPicked(choice);
    if (choice === question.answer) setScore((current) => current + 10);
  }

  function advance() {
    if (!answered) return;
    if (last) {
      setBest((current) => {
        const next = Math.max(current, score);
        writeBest(next);
        return next;
      });
      setPhase("result");
      return;
    }
    setIndex((current) => current + 1);
    setPicked(null);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        if (phase === "intro" || phase === "result") start();
        else if (answered) advance();
        return;
      }
      if (phase !== "play" || answered) return;
      const number = Number.parseInt(event.key, 10);
      if (number >= 1 && number <= 4) choose(number - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!open) return null;

  const progress = ((index + (answered ? 1 : 0)) / total) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-5">
      {phase === "play" ? (
        <div className="absolute inset-0 bg-ink/70" />
      ) : (
        <button type="button" aria-label="關閉測驗" className="absolute inset-0 bg-ink/70" onClick={onClose} />
      )}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="基礎邏輯測驗"
        className="relative z-10 flex h-[min(100dvh,46rem)] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-card shadow-card-hover sm:h-auto sm:max-h-[min(46rem,90dvh)] sm:rounded-3xl"
      >
        <div className="flex items-center justify-between px-5 pt-5">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted">AI 教育</p>
            <h2 className="font-display text-lg text-ink">基礎邏輯</h2>
          </div>
          <button
            type="button"
            aria-label="關閉"
            onClick={onClose}
            className="flex size-11 items-center justify-center rounded-full bg-wash text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>

        {phase === "intro" ? (
          <div className="flex flex-1 flex-col px-5 pt-6 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
            <p className="text-sm leading-relaxed text-muted">
              十題基礎推論，每題 10 分，滿分 100。選完立刻看到對錯與解析，再進入下一題。
            </p>
            <dl className="mt-6 grid grid-cols-3 gap-2">
              <Stat label="題數" value="10" />
              <Stat label="每題" value="10 分" />
              <Stat label="最佳" value={bestReady ? String(best) : "—"} suffix={bestReady ? " / 100" : undefined} />
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-subtle">作答可用 1–4 鍵，Enter 開始或進入下一題。</p>
            <button type="button" onClick={start} className={primaryButton}>
              開始測驗
            </button>
          </div>
        ) : null}

        {phase === "play" && question ? (
          <div className="flex min-h-0 flex-1 flex-col px-5 pt-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
            <div className="flex items-end justify-between gap-3">
              <p className="text-xs text-muted tabular-nums">
                第 {index + 1} / {total} 題
              </p>
              <p className="text-sm font-medium text-ink tabular-nums">
                {score}
                <span className="text-subtle"> / 100</span>
              </p>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-wash">
              <div className="h-full rounded-full bg-sage transition-[width] duration-200 ease-out" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-5 font-medium leading-relaxed text-ink">{question.prompt}</p>
            <div className="mt-4 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
              {question.choices.map((choice, choiceIndex) => {
                const isPick = picked === choiceIndex;
                const isAnswer = choiceIndex === question.answer;
                const showRight = answered && isAnswer;
                const showWrong = answered && isPick && !isAnswer;
                return (
                  <button
                    key={`${question.id}-${choice}`}
                    type="button"
                    disabled={answered}
                    onClick={() => choose(choiceIndex)}
                    className={cn(
                      "flex min-h-12 items-center gap-3 rounded-2xl bg-wash px-4 py-3 text-left text-ink transition-[transform,background-color,opacity] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                      !answered && "hover:-translate-y-0.5",
                      showRight && "bg-sage-tint shadow-card",
                      showWrong && "opacity-55",
                    )}
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-card text-xs text-muted tabular-nums">
                      {choiceIndex + 1}
                    </span>
                    <span className="flex-1 text-sm leading-snug">{choice}</span>
                    {showRight ? <Check className="size-4 shrink-0 text-sage" strokeWidth={2} /> : null}
                    {showWrong ? <X className="size-4 shrink-0 text-subtle" strokeWidth={2} /> : null}
                  </button>
                );
              })}
              {answered ? (
                <div className="rounded-2xl bg-wash px-4 py-3">
                  <p className="text-xs font-medium text-sage">{correct ? "答對，加 10 分" : "這題 0 分"}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{question.explain}</p>
                </div>
              ) : null}
            </div>
            <button type="button" disabled={!answered} onClick={advance} className={primaryButton}>
              {last ? "看分數" : "下一題"}
            </button>
          </div>
        ) : null}

        {phase === "result" ? (
          <div className="flex flex-1 flex-col px-5 pt-6 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
            <ScoreRing score={score} />
            <p className="mt-5 text-center font-medium text-ink">{verdict.title}</p>
            <p className="mt-1 text-center text-sm leading-relaxed text-muted">{verdict.note}</p>
            <p className="mt-4 text-center text-sm text-muted tabular-nums">最佳紀錄 {best} / 100</p>
            <div className="mt-auto flex flex-col gap-2 pt-6">
              <button type="button" onClick={start} className={primaryButton}>
                <RotateCcw className="size-4" strokeWidth={1.75} />
                再測一次
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-wash text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                回到主頁
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Stat({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="rounded-2xl bg-wash px-3 py-3">
      <dt className="text-xs text-subtle">{label}</dt>
      <dd className="mt-1 font-medium text-ink tabular-nums">
        {value}
        {suffix ? <span className="text-subtle">{suffix}</span> : null}
      </dd>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  return (
    <div className="mx-auto flex size-36 items-center justify-center">
      <div
        className="flex size-full items-center justify-center rounded-full p-2"
        style={{ background: `conic-gradient(var(--sage) ${score}%, var(--wash) 0)` }}
      >
        <div className="flex size-full flex-col items-center justify-center rounded-full bg-card">
          <p className="text-xs tracking-wide text-muted">本次得分</p>
          <p className="font-display text-4xl text-ink tabular-nums">{score}</p>
          <p className="text-xs text-subtle tabular-nums">/ 100</p>
        </div>
      </div>
    </div>
  );
}
