import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Brain, a as ShoppingBag, c as Moon, d as Link2, f as Instagram, g as Camera, h as Check, i as Sun, l as MapPin, m as ChevronDown, n as X, o as RotateCcw, p as Github, s as Play, t as Youtube, u as Mail, v as BookOpen, y as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DYzKDwsi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function XMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
	});
}
var lucideMap = {
	camera: Camera,
	instagram: Instagram,
	book: BookOpen,
	shop: ShoppingBag,
	mail: Mail,
	youtube: Youtube,
	github: Github,
	brain: Brain
};
function LinkIcon({ id, className }) {
	if (id === "x") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XMark, { className: cn("size-4", className) });
	const Icon = lucideMap[id];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		className: cn("size-4", className),
		strokeWidth: 1.75
	});
}
function LinkOptionsSheet({ open, onClose, title, links }) {
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [open, onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "關閉選單",
			className: "absolute inset-0 bg-foreground/70",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": title,
			className: cn("relative z-10 w-full max-w-md rounded-t-3xl bg-card p-5 shadow-card-hover", "sm:max-w-sm sm:rounded-3xl", "pb-[calc(env(safe-area-inset-bottom)+1.25rem)]"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-medium text-foreground",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					"aria-label": "關閉",
					className: cn("flex size-9 shrink-0 items-center justify-center rounded-full", "bg-icon text-foreground", "transition-[transform,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "hover:shadow-card active:scale-[0.96]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						className: "size-4",
						strokeWidth: 1.75
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2",
				children: links.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: item.href,
					target: "_blank",
					rel: "noreferrer noopener",
					className: cn("group flex min-h-12 items-center gap-3 rounded-2xl bg-icon px-4 py-3", "transition-[transform,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "hover:-translate-y-0.5 active:scale-[0.97]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1 text-left font-medium text-foreground",
						children: item.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
						className: "size-4 shrink-0 text-subtle transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground",
						strokeWidth: 1.75
					})]
				}, item.label))
			})]
		})]
	});
}
function LinkCard({ link, index, onOpenQuiz }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const external = link.href.startsWith("http");
	const hasOptions = Boolean(link.subLinks && link.subLinks.length > 0);
	const isQuiz = link.action === "quiz";
	const cardClassName = cn("link-enter group relative flex min-h-14 w-full items-center gap-3 rounded-3xl bg-card p-3", "shadow-card", "transition-[box-shadow,transform,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "hover:-translate-y-0.5 hover:bg-card-hover hover:shadow-card-hover", "active:scale-[0.96] active:shadow-card", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring");
	const trailing = isQuiz ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
		className: cn("ml-0.5 size-4 shrink-0 fill-subtle text-subtle", "transition-[color,fill,transform] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "group-hover:fill-foreground group-hover:text-foreground"),
		strokeWidth: 1.75
	}) : hasOptions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
		className: cn("size-4 shrink-0 text-subtle", "transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)]", "group-hover:text-foreground"),
		strokeWidth: 1.75
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
		className: cn("size-4 shrink-0 text-subtle", "transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)]", "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"),
		strokeWidth: 1.75
	});
	const cardContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-icon text-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkIcon, {
				id: link.icon,
				className: "size-4"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0 flex-1 pr-1 text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-medium leading-snug text-foreground",
				children: link.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 block text-sm leading-snug text-muted",
				children: link.subtitle
			})]
		}),
		trailing
	] });
	if (isQuiz) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: onOpenQuiz,
		style: { animationDelay: `${180 + index * 70}ms` },
		className: cardClassName,
		"aria-haspopup": "dialog",
		children: cardContent
	});
	if (hasOptions) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => setOpen(true),
		style: { animationDelay: `${180 + index * 70}ms` },
		className: cardClassName,
		"aria-haspopup": "dialog",
		"aria-expanded": open,
		children: cardContent
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkOptionsSheet, {
		open,
		onClose: () => setOpen(false),
		title: link.title,
		links: link.subLinks ?? []
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: link.href,
		target: external ? "_blank" : void 0,
		rel: external ? "noreferrer noopener" : void 0,
		style: { animationDelay: `${180 + index * 70}ms` },
		className: cardClassName,
		children: cardContent
	});
}
var QUIZ_BEST_KEY = "physics-logic-quiz-best";
var logicQuestions = [
	{
		id: "modus-ponens",
		prompt: "若 P 為真，則 Q 為真。現在已知 P 為真。可以得出什麼？",
		choices: [
			"Q 必為真",
			"Q 必為假",
			"無法判斷 Q",
			"P 會變成假"
		],
		answer: 0,
		explain: "這是肯定前件（modus ponens）：由「若 P 則 Q」加上 P，可推出 Q。"
	},
	{
		id: "syllogism",
		prompt: "所有金屬都會導電。銅是金屬。因此：",
		choices: [
			"銅會導電",
			"只有銅會導電",
			"金屬不一定導電",
			"還需要實驗才能判斷"
		],
		answer: 0,
		explain: "這是有效的定言三段論：所有 A 是 B，C 是 A，所以 C 是 B。"
	},
	{
		id: "affirming-consequent",
		prompt: "「如果下雨，地面會濕。地面現在是濕的。」能推出一定下雨了嗎？",
		choices: [
			"能，地面濕就代表下雨",
			"不能，地面濕可能有別的原因",
			"能，因為兩句都提到濕",
			"不能，因為下雨和地面無關"
		],
		answer: 1,
		explain: "肯定後件是常見謬誤。地面濕也可能來自灑水，不能反推一定下雨。"
	},
	{
		id: "negation",
		prompt: "否定「所有天鵝都是白色」等於哪一句？",
		choices: [
			"所有天鵝都不是白色",
			"存在一隻不是白色的天鵝",
			"沒有天鵝",
			"所有天鵝都是黑色"
		],
		answer: 1,
		explain: "「所有 A 都是 B」的否定是「至少有一個 A 不是 B」，不是改成全部相反。"
	},
	{
		id: "disjunction",
		prompt: "要嘛去實驗室，要嘛去圖書館。小李沒有去圖書館。結論是？",
		choices: [
			"小李去了實驗室",
			"兩個地方都沒去",
			"還是可能去圖書館",
			"無法判斷"
		],
		answer: 0,
		explain: "選言三段論：P 或 Q，非 Q，所以 P。排除一個選項後，另一個成立。"
	},
	{
		id: "comparison",
		prompt: "A 比 B 高，B 比 C 高。三人裡誰最矮？",
		choices: [
			"A",
			"B",
			"C",
			"無法比較"
		],
		answer: 2,
		explain: "高矮關係可傳遞：A > B > C，所以 C 最矮。"
	},
	{
		id: "sequence",
		prompt: "數列 3、6、12、24、？ 下一個數是？",
		choices: [
			"36",
			"48",
			"30",
			"42"
		],
		answer: 1,
		explain: "每一項都是前一項的兩倍，24 × 2 = 48。"
	},
	{
		id: "sufficient",
		prompt: "「A 是 B 的充分條件」代表什麼？",
		choices: [
			"有 A 就一定有 B",
			"有 B 就一定有 A",
			"沒有 A 就一定沒有 B",
			"A 和 B 互不相關"
		],
		answer: 0,
		explain: "充分條件是「有它就夠了」：A 成立則 B 成立。B 成立時，A 不一定成立。"
	},
	{
		id: "and-gate",
		prompt: "條件：x > 0 且 x < 10。當 x = 10 時，這個條件為？",
		choices: [
			"真",
			"假",
			"有時真有時假",
			"無法運算"
		],
		answer: 1,
		explain: "「且」要兩邊都成立。x = 10 不小於 10，所以整個條件為假。"
	},
	{
		id: "xor-liar",
		prompt: "兩人恰好一人說實話。A 說「B 在說謊」。B 說「我們都說實話」。誰說實話？",
		choices: [
			"A",
			"B",
			"兩人都說謊",
			"無法判斷"
		],
		answer: 0,
		explain: "若 B 說實話，則兩人都說實話，與「恰好一人說實話」矛盾。所以 B 說謊、A 說實話。"
	}
];
function shuffleInPlace(items) {
	for (let i = items.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		const current = items[i];
		const swap = items[j];
		if (current === void 0 || swap === void 0) continue;
		items[i] = swap;
		items[j] = current;
	}
	return items;
}
function dealQuiz() {
	return shuffleInPlace(logicQuestions.map((question) => {
		const order = shuffleInPlace(question.choices.map((_, index) => index));
		return {
			...question,
			choices: order.map((index) => question.choices[index] ?? ""),
			answer: order.indexOf(question.answer)
		};
	}));
}
function scoreRank(score) {
	if (score >= 100) return {
		title: "邏輯滿分",
		note: "十題全對，推論乾淨而穩定。"
	};
	if (score >= 80) return {
		title: "推理清晰",
		note: "大方向正確，再把謬誤題看一次就更穩。"
	};
	if (score >= 60) return {
		title: "基礎穩固",
		note: "已掌握核心規則，錯題解析值得再走一輪。"
	};
	if (score >= 40) return {
		title: "還在熱身",
		note: "先抓住充分條件與否定句，分數會很快上來。"
	};
	return {
		title: "從這題開始",
		note: "沒關係，每題都有解析。再測一次就熟了。"
	};
}
function readBest() {
	try {
		const raw = localStorage.getItem(QUIZ_BEST_KEY);
		const value = raw ? Number.parseInt(raw, 10) : 0;
		return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
	} catch {
		return 0;
	}
}
function writeBest(score) {
	try {
		localStorage.setItem(QUIZ_BEST_KEY, String(score));
	} catch {}
}
function LogicQuiz({ open, onClose }) {
	const [phase, setPhase] = (0, import_react.useState)("intro");
	const [deck, setDeck] = (0, import_react.useState)([]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const [best, setBest] = (0, import_react.useState)(0);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const question = deck[index];
	const total = deck.length || 10;
	const locked = picked !== null;
	const correct = question ? picked === question.answer : false;
	const lastQuestion = index + 1 >= total;
	(0, import_react.useEffect)(() => {
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
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (event) => {
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
	const rank = (0, import_react.useMemo)(() => scoreRank(score), [score]);
	function start() {
		setDeck(dealQuiz());
		setIndex(0);
		setPicked(null);
		setScore(0);
		setPhase("play");
	}
	function choose(choiceIndex) {
		if (locked || !question) return;
		if (choiceIndex < 0 || choiceIndex >= question.choices.length) return;
		setPicked(choiceIndex);
		if (choiceIndex === question.answer) setScore((value) => value + 10);
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
	const progress = (index + (locked ? 1 : 0)) / total * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "關閉測驗",
			className: "absolute inset-0 bg-foreground/70",
			onClick: phase === "play" ? void 0 : onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "基礎邏輯測驗",
			className: cn("relative z-10 flex h-[min(100dvh,46rem)] w-full max-w-md flex-col overflow-hidden", "rounded-t-3xl bg-card shadow-card-hover sm:h-auto sm:max-h-[min(46rem,90dvh)] sm:rounded-3xl"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-5 pt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-wide text-muted",
						children: "AI教育"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-medium text-foreground",
						children: "基礎邏輯"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": "關閉",
						className: cn("flex size-11 shrink-0 items-center justify-center rounded-full", "bg-icon text-foreground", "transition-[transform,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "hover:shadow-card active:scale-[0.96]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							className: "size-4",
							strokeWidth: 1.75
						})
					})]
				}),
				phase === "intro" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col px-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted",
							children: "十題基礎推論，每題 10 分，滿分 100。選完立刻看到對錯與解析，再進入下一題。"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-6 grid grid-cols-3 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "題數",
									value: "10"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "每題",
									value: "10 分"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "最佳",
									value: `${hydrated ? best : 0}`,
									suffix: ` / 100`
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs leading-relaxed text-subtle",
							children: "作答可用 1–4 鍵，Enter 開始或進入下一題。"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: start,
							className: primaryBtn,
							children: "開始測驗"
						})
					]
				}) : null,
				phase === "play" && question ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-0 flex-1 flex-col px-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs tabular-nums text-muted",
								children: [
									"第 ",
									index + 1,
									" / ",
									total,
									" 題"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-medium tabular-nums text-foreground",
								children: [score, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-subtle",
									children: [" / ", 100]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-1 overflow-hidden rounded-full bg-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-accent transition-[width] duration-[var(--motion-fast)] ease-[var(--ease-out)]",
								style: { width: `${progress}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 font-medium leading-relaxed text-foreground",
							children: question.prompt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto",
							children: [question.choices.map((choice, choiceIndex) => {
								const isPicked = picked === choiceIndex;
								const isAnswer = choiceIndex === question.answer;
								const showAnswer = locked && isAnswer;
								const showWrong = locked && isPicked && !isAnswer;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: locked,
									onClick: () => choose(choiceIndex),
									className: cn("flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3 text-left", "bg-icon text-foreground", "transition-[transform,background-color,box-shadow,opacity] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "active:scale-[0.97]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", !locked && "hover:-translate-y-0.5", showAnswer && "bg-accent/15 shadow-card", showWrong && "opacity-55"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex size-6 shrink-0 items-center justify-center rounded-full bg-card text-xs tabular-nums text-muted",
											children: choiceIndex + 1
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex-1 text-sm leading-snug",
											children: choice
										}),
										showAnswer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											className: "size-4 shrink-0 text-accent",
											strokeWidth: 2
										}) : null,
										showWrong ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
											className: "size-4 shrink-0 text-subtle",
											strokeWidth: 2
										}) : null
									]
								}, `${question.id}-${choice}`);
							}), locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-icon px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium text-accent",
									children: correct ? "答對，加 10 分" : "這題 0 分"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-relaxed text-muted",
									children: question.explain
								})]
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !locked,
							onClick: next,
							className: cn(primaryBtn, "disabled:opacity-35"),
							children: lastQuestion ? "看分數" : "下一題"
						})
					]
				}) : null,
				phase === "result" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col px-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRing, { score }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-center font-medium text-foreground",
							children: rank.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-center text-sm leading-relaxed text-muted",
							children: rank.note
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-center text-sm tabular-nums text-muted",
							children: [
								"最佳紀錄 ",
								best,
								" / ",
								100
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: start,
								className: primaryBtn,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
									className: "size-4",
									strokeWidth: 1.75
								}), "再測一次"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onClose,
								className: cn("flex min-h-12 w-full items-center justify-center rounded-2xl", "bg-icon text-foreground", "transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)]", "active:scale-[0.96]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"),
								children: "回到主頁"
							})]
						})
					]
				}) : null
			]
		})]
	});
}
var primaryBtn = cn("mt-auto flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl", "bg-foreground text-background", "transition-[transform,opacity] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "enabled:hover:opacity-90 enabled:active:scale-[0.96]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring");
function Stat({ label, value, suffix }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-icon px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
			className: "mt-1 font-medium tabular-nums text-foreground",
			children: [value, suffix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-subtle",
				children: suffix
			}) : null]
		})]
	});
}
function ScoreRing({ score }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto flex size-36 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex size-full items-center justify-center rounded-full p-2",
			style: { background: `conic-gradient(var(--sage) ${score}%, var(--paper-icon) 0)` },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex size-full flex-col items-center justify-center rounded-full bg-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-wide text-muted",
						children: "本次得分"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-4xl font-medium tabular-nums tracking-tight text-foreground",
						children: score
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs tabular-nums text-subtle",
						children: ["/ ", 100]
					})
				]
			})
		})
	});
}
var profile = {
	name: "physics long",
	nameEn: "physics long",
	handle: "@physicslong",
	role: "物理教師 · AI設計師",
	bio: "用AI記錄日常，把想法做成可以分享的東西。",
	location: "桃園 Taoyuan",
	availability: "物理與AI合作",
	avatar: "/avatar.jpg",
	video: "/intro.mp4",
	email: "hello@physicslong.studio"
};
var featuredLinks = [
	{
		title: "作品集",
		subtitle: "AI與設計選集",
		href: "https://github.com/wulsir",
		icon: "github"
	},
	{
		title: "基礎邏輯",
		subtitle: "AI教育 · 互動測驗 · 滿分 100",
		href: "#logic-quiz",
		icon: "brain",
		action: "quiz"
	},
	{
		title: "AI寫作筆記",
		subtitle: "關於AI文章隨想與影片及遊戲製作",
		href: "https://physicslong.studio/notes",
		icon: "book"
	},
	{
		title: "免費AI資源",
		subtitle: "好用的5大AI",
		href: "https://grok.com/",
		icon: "shop",
		subLinks: [
			{
				label: "Claude",
				href: "https://claude.ai/"
			},
			{
				label: "ChatGPT",
				href: "https://chatgpt.com/"
			},
			{
				label: "Grok",
				href: "https://grok.com/"
			},
			{
				label: "Meta AI",
				href: "https://www.meta.ai/"
			},
			{
				label: "Gemini",
				href: "https://gemini.google.com/"
			}
		]
	},
	{
		title: "合作洽詢",
		subtitle: "品牌、AI與設計案件",
		href: `mailto:${profile.email}`,
		icon: "mail"
	}
];
var socialLinks = [
	{
		label: "Instagram",
		href: "https://instagram.com/physicslong",
		icon: "instagram"
	},
	{
		label: "X",
		href: "https://x.com/physicslong",
		icon: "x"
	},
	{
		label: "YouTube",
		href: "https://www.youtube.com/@Quantumlogic-rd1sv",
		icon: "youtube"
	},
	{
		label: "Email",
		href: `mailto:${profile.email}`,
		icon: "mail"
	}
];
function ProfileHeader({ onPlayVideo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex flex-col items-center text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero-enter relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onPlayVideo,
					"aria-label": "播放動態影像",
					className: cn("relative rounded-full", "transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)]", "hover:-translate-y-0.5 active:scale-[0.96]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: profile.avatar,
						alt: `${profile.name} 的頭像`,
						width: 128,
						height: 128,
						className: cn("size-28 rounded-full object-cover shadow-avatar sm:size-32", "outline outline-1 -outline-offset-1 outline-foreground/10", "ring-4 ring-background")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("absolute right-0.5 bottom-0.5 flex size-9 items-center justify-center rounded-full", "bg-card text-foreground shadow-card sm:size-10"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
							className: "ml-0.5 size-3.5 fill-foreground sm:size-4",
							strokeWidth: 1.75
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hero-enter mt-5 text-sm font-medium tracking-wide text-muted",
				style: { animationDelay: "70ms" },
				children: profile.handle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "hero-enter mt-1 font-display text-name text-foreground",
				style: { animationDelay: "110ms" },
				children: profile.name
			}),
			profile.nameEn !== profile.name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hero-enter mt-1 text-sm tracking-wide text-subtle",
				style: { animationDelay: "150ms" },
				children: profile.nameEn
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hero-enter mt-3 text-sm font-medium text-foreground",
				style: { animationDelay: "180ms" },
				children: profile.role
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hero-enter mt-3 max-w-80 text-base leading-relaxed text-muted",
				style: { animationDelay: "220ms" },
				children: profile.bio
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero-enter mt-4 flex flex-wrap items-center justify-center gap-2",
				style: { animationDelay: "260ms" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex h-8 items-center gap-1.5 rounded-full bg-card px-3 text-xs font-medium text-muted shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						className: "size-3.5",
						strokeWidth: 1.75
					}), profile.location]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex h-8 items-center rounded-full bg-accent/12 px-3 text-xs font-medium text-accent",
					children: profile.availability
				})]
			})
		]
	});
}
function ShareLink() {
	const [copied, setCopied] = (0, import_react.useState)(false);
	async function copy() {
		try {
			await navigator.clipboard.writeText(window.location.href);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1800);
		} catch {
			setCopied(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: copy,
		className: cn("inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium", "text-muted transition-[color,background-color,transform] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "hover:bg-card hover:text-foreground", "active:scale-[0.96]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative size-3.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("absolute inset-0 flex items-center justify-center", "transition-[opacity,filter,transform] duration-[var(--motion-fast)] ease-[var(--ease-in-out)]", copied ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-[4px]"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					className: "size-3.5",
					strokeWidth: 2
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("flex items-center justify-center", "transition-[opacity,filter,transform] duration-[var(--motion-fast)] ease-[var(--ease-in-out)]", copied ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {
					className: "size-3.5",
					strokeWidth: 1.75
				})
			})]
		}), copied ? "已複製連結" : "複製頁面連結"]
	});
}
function SocialRow() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex items-center justify-center gap-2.5",
		children: socialLinks.map((item, index) => {
			const external = item.href.startsWith("http");
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "social-enter",
				style: { animationDelay: `${520 + index * 60}ms` },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: item.href,
					target: external ? "_blank" : void 0,
					rel: external ? "noreferrer noopener" : void 0,
					"aria-label": item.label,
					className: cn("flex size-11 items-center justify-center rounded-full bg-card text-foreground shadow-card", "transition-[box-shadow,transform,background-color,color] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "hover:-translate-y-0.5 hover:bg-card-hover hover:shadow-card-hover", "active:scale-[0.96]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkIcon, {
						id: item.icon,
						className: "size-[18px]"
					})
				})
			}, item.label);
		})
	});
}
function readIsDark() {
	return document.documentElement.classList.contains("dark");
}
function applyTheme(dark) {
	document.documentElement.classList.toggle("dark", dark);
	document.documentElement.style.colorScheme = dark ? "dark" : "light";
	localStorage.setItem("lin-theme", dark ? "dark" : "light");
	const meta = document.querySelector("meta[name=\"theme-color\"]");
	if (meta) meta.setAttribute("content", dark ? "#12110f" : "#f4f1ec");
}
function ThemeToggle() {
	const [dark, setDark] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setDark(readIsDark());
		setReady(true);
	}, []);
	function toggle() {
		const next = !readIsDark();
		applyTheme(next);
		setDark(next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: toggle,
		"aria-label": dark ? "切換為淺色主題" : "切換為深色主題",
		className: cn("relative flex size-11 items-center justify-center rounded-full", "bg-card text-foreground shadow-card", "transition-[box-shadow,transform,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "hover:shadow-card-hover hover:-translate-y-px", "active:scale-[0.96]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative size-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("absolute inset-0 flex items-center justify-center", "transition-[opacity,filter,transform] duration-[var(--motion-fast)] ease-[var(--ease-in-out)]", ready && dark ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-[4px]"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
					className: "size-4",
					strokeWidth: 1.75
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("flex items-center justify-center", "transition-[opacity,filter,transform] duration-[var(--motion-fast)] ease-[var(--ease-in-out)]", ready && dark ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
					className: "size-4",
					strokeWidth: 1.75
				})
			})]
		})
	});
}
function VideoModal({ open, onClose }) {
	const videoRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) {
			videoRef.current?.pause();
			return;
		}
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (event) => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "關閉影片",
			className: "absolute inset-0 bg-foreground/70",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "動態影像",
			className: "relative z-10 w-full max-w-xs sm:max-w-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onClose,
				"aria-label": "關閉",
				className: cn("absolute -top-12 right-0 flex size-11 items-center justify-center rounded-full", "bg-card text-foreground shadow-card", "transition-[transform,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "hover:shadow-card-hover active:scale-[0.96]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
					className: "size-4",
					strokeWidth: 1.75
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				src: profile.video,
				poster: profile.avatar,
				controls: true,
				playsInline: true,
				autoPlay: true,
				className: "w-full rounded-2xl bg-foreground shadow-avatar outline outline-1 -outline-offset-1 outline-foreground/20"
			})]
		})]
	});
}
function Home() {
	const [videoOpen, setVideoOpen] = (0, import_react.useState)(false);
	const [quizOpen, setQuizOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute right-4 z-10 sm:right-6",
				style: { top: "max(1rem, env(safe-area-inset-top))" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-12",
				style: { paddingTop: "max(4.5rem, calc(env(safe-area-inset-top) + 3.25rem))" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileHeader, { onPlayVideo: () => setVideoOpen(true) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-8 flex flex-col gap-2.5",
						"aria-label": "精選連結",
						children: featuredLinks.map((link, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkCard, {
							link,
							index,
							onOpenQuiz: () => setQuizOpen(true)
						}, link.title))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialRow, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "footer-enter mt-10 flex flex-col items-center gap-3 pb-[env(safe-area-inset-bottom)] text-center",
						style: { animationDelay: "760ms" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareLink, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-subtle",
							children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" ",
								profile.name
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoModal, {
				open: videoOpen,
				onClose: () => setVideoOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogicQuiz, {
				open: quizOpen,
				onClose: () => setQuizOpen(false)
			})
		]
	});
}
//#endregion
export { Home as component };
