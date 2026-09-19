import { useEffect, useMemo, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import {
  POINTS_PER_QUESTION,
  QUIZ_BEST_KEY,
  QUIZ_MAX_SCORE,
  dealQuiz,
  scoreRank,
  type QuizQuestion,
} from "@/lib/logic-quiz";
import { cn } from "@/lib/utils";

type Phase = "intro" | "play" | "result";

function readBest(): number {
  try {
    const raw = localStorage.getItem(QUIZ_BEST_KEY);
    const value = raw ? Number.parseInt(raw, 10) : 0;
    return Number.isFinite(value) ? Math.min(QUIZ_MAX_SCORE, Math.max(0, value)) : 0;
  } catch {
    return 0;
  }
}

function writeBest(score: number) {
  try {
    localStorage.setItem(QUIZ_BEST_KEY, String(score));
  } catch {
    /* ignore quota */
  }
}

export function LogicQuiz({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [deck, setDeck] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  const question = deck[index];
  const total = deck.length || 10;
  const locked = picked !== null;
  const correct = question ? picked === question.answer : false;
  const lastQuestion = index + 1 >= total;

  useEffect(() => {
    if (!open) return;
    setPhase("intro");
    setDeck([]);
    setIndex(0);
    setPicked(null);
    setScore(0);
    setBest(readBest());
    setHydrated(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

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
        else if (locked) next();
        return;
      }
      if (phase !== "play" || locked) return;
      const n = Number.parseInt(event.key, 10);
      if (n >= 1 && n <= 4) choose(n - 1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const rank = useMemo(() => scoreRank(score), [score]);

  function start() {
    setDeck(dealQuiz());
    setIndex(0);
    setPicked(null);
    setScore(0);
    setPhase("play");
  }

  function choose(choiceIndex: number) {
    if (locked || !question) return;
    if (choiceIndex < 0 || choiceIndex >= question.choices.length) return;
    setPicked(choiceIndex);
    if (choiceIndex === question.answer) {
      setScore((value) => value + POINTS_PER_QUESTION);
    }
  }

  function next() {
    if (!locked) return;
    if (lastQuestion) {
      setBest((prev) => {
        const nextBest = Math.max(prev, score);
        writeBest(nextBest);
        return nextBest;
      });
      setPhase("result");
      return;
    }
    setIndex((value) => value + 1);
    setPicked(null);
  }

  if (!open) return null;

  const progress = ((index + (locked ? 1 : 0)) / total) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-5">
      {phase === "play" ? (
        <div className="absolute inset-0 bg-foreground/70" />
      ) : (
        <button
          type="button"
          aria-label="關閉測驗"
          className="absolute inset-0 bg-foreground/70"
          onClick={onClose}
        />
      )}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="基礎邏輯測驗"
        className={cn(
          "relative z-10 flex h-[min(100dvh,46rem)] w-full max-w-md flex-col overflow-hidden",
          "rounded-t-3xl bg-card shadow-card-hover sm:h-auto sm:max-h-[min(46rem,90dvh)] sm:rounded-3xl",
        )}
      >
        <div className="flex items-center justify-between px-5 pt-5">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted">AI教育</p>
            <h2 className="font-display text-lg font-medium text-foreground">
              基礎邏輯
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="關閉"
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-full",
              "bg-icon text-foreground",
              "transition-[transform,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
              "hover:shadow-card active:scale-[0.96]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>

        {phase === "intro" ? (
          <div className="flex flex-1 flex-col px-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-6">
            <p className="text-sm leading-relaxed text-muted">
              十題基礎推論，每題 10 分，滿分 100。選完立刻看到對錯與解析，再進入下一題。
            </p>
            <dl className="mt-6 grid grid-cols-3 gap-2">
              <Stat label="題數" value="10" />
              <Stat label="每題" value="10 分" />
              <Stat
                label="最佳"
                value={`${hydrated ? best : 0}`}
                suffix={` / ${QUIZ_MAX_SCORE}`}
              />
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-subtle">
              作答可用 1–4 鍵，Enter 開始或進入下一題。
            </p>
            <button type="button" onClick={start} className={primaryBtn}>
              開始測驗
            </button>
          </div>
        ) : null}

        {phase === "play" && question ? (
          <div className="flex min-h-0 flex-1 flex-col px-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-4">
            <div className="flex items-end justify-between gap-3">
              <p className="text-xs tabular-nums text-muted">
                第 {index + 1} / {total} 題
              </p>
              <p className="text-sm font-medium tabular-nums text-foreground">
                {score}
                <span className="text-subtle"> / {QUIZ_MAX_SCORE}</span>
              </p>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-icon">
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-[var(--motion-fast)] ease-[var(--ease-out)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-5 font-medium leading-relaxed text-foreground">
              {question.prompt}
            </p>

            <div className="mt-4 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
              {question.choices.map((choice, choiceIndex) => {
                const isPicked = picked === choiceIndex;
                const isAnswer = choiceIndex === question.answer;
                const showAnswer = locked && isAnswer;
                const showWrong = locked && isPicked && !isAnswer;
                return (
                  <button
                    key={`${question.id}-${choice}`}
                    type="button"
                    disabled={locked}
                    onClick={() => choose(choiceIndex)}
                    className={cn(
                      "flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3 text-left",
                      "bg-icon text-foreground",
                      "transition-[transform,background-color,box-shadow,opacity] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
                      "active:scale-[0.97]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      !locked && "hover:-translate-y-0.5",
                      showAnswer && "bg-accent/15 shadow-card",
                      showWrong && "opacity-55",
                    )}
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-card text-xs tabular-nums text-muted">
                      {choiceIndex + 1}
                    </span>
                    <span className="flex-1 text-sm leading-snug">{choice}</span>
                    {showAnswer ? (
                      <Check className="size-4 shrink-0 text-accent" strokeWidth={2} />
                    ) : null}
                    {showWrong ? (
                      <X className="size-4 shrink-0 text-subtle" strokeWidth={2} />
                    ) : null}
                  </button>
                );
              })}

              {locked ? (
                <div className="rounded-2xl bg-icon px-4 py-3">
                  <p className="text-xs font-medium text-accent">
                    {correct ? "答對，加 10 分" : "這題 0 分"}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {question.explain}
                  </p>
                </div>
              ) : null}
            </div>

            <button
              type="button"
              disabled={!locked}
              onClick={next}
              className={cn(primaryBtn, "disabled:opacity-35")}
            >
              {lastQuestion ? "看分數" : "下一題"}
            </button>
          </div>
        ) : null}

        {phase === "result" ? (
          <div className="flex flex-1 flex-col px-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-6">
            <ScoreRing score={score} />
            <p className="mt-5 text-center font-medium text-foreground">{rank.title}</p>
            <p className="mt-1 text-center text-sm leading-relaxed text-muted">
              {rank.note}
            </p>
            <p className="mt-4 text-center text-sm tabular-nums text-muted">
              最佳紀錄 {best} / {QUIZ_MAX_SCORE}
            </p>
            <div className="mt-auto flex flex-col gap-2">
              <button type="button" onClick={start} className={primaryBtn}>
                <RotateCcw className="size-4" strokeWidth={1.75} />
                再測一次
              </button>
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "flex min-h-12 w-full items-center justify-center rounded-2xl",
                  "bg-icon text-foreground",
                  "transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)]",
                  "active:scale-[0.96]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
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

const primaryBtn = cn(
  "mt-auto flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl",
  "bg-foreground text-background",
  "transition-[transform,opacity] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
  "enabled:hover:opacity-90 enabled:active:scale-[0.96]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
);

function Stat({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div className="rounded-2xl bg-icon px-3 py-3">
      <dt className="text-xs text-subtle">{label}</dt>
      <dd className="mt-1 font-medium tabular-nums text-foreground">
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
        style={{
          background: `conic-gradient(var(--sage) ${score}%, var(--paper-icon) 0)`,
        }}
      >
        <div className="flex size-full flex-col items-center justify-center rounded-full bg-card">
          <p className="text-xs tracking-wide text-muted">本次得分</p>
          <p className="font-display text-4xl font-medium tabular-nums tracking-tight text-foreground">
            {score}
          </p>
          <p className="text-xs tabular-nums text-subtle">/ {QUIZ_MAX_SCORE}</p>
        </div>
      </div>
    </div>
  );
}
