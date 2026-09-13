import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ShoppingBag, c as MapPin, d as Instagram, f as Check, h as ArrowUpRight, i as Sun, l as Mail, m as BookOpen, n as X, o as Play, p as Camera, s as Moon, t as Youtube, u as Link2 } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BEEWCLKA.js
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
	video: Play
};
function LinkIcon({ id, className }) {
	if (id === "x") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XMark, { className: cn("size-4", className) });
	const Icon = lucideMap[id];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		className: cn("size-4", className),
		strokeWidth: 1.75
	});
}
var cardClass = cn("link-enter group relative flex min-h-14 w-full items-center gap-3 rounded-3xl bg-card p-3", "shadow-card", "transition-[box-shadow,transform,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "hover:-translate-y-0.5 hover:bg-card-hover hover:shadow-card-hover", "active:scale-[0.96] active:shadow-card", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring");
function LinkCard({ link, index, onPlayVideo }) {
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
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
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
			className: cn("size-4 shrink-0 text-subtle", "transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)]", "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"),
			strokeWidth: 1.75
		})
	] });
	if (link.action === "video") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: onPlayVideo,
		style: { animationDelay: `${180 + index * 70}ms` },
		className: cardClass,
		children: inner
	});
	const href = link.href ?? "#";
	const external = href.startsWith("http");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		target: external ? "_blank" : void 0,
		rel: external ? "noreferrer noopener" : void 0,
		style: { animationDelay: `${180 + index * 70}ms` },
		className: cardClass,
		children: inner
	});
}
var profile = {
	name: "physics",
	nameEn: "physics",
	handle: "@physics",
	role: "AI設計師 · 物理教師",
	bio: "用光影記錄日常，把想法做成可以分享的東西。",
	location: "桃園 Taoyuan",
	availability: "開放品牌與編輯合作",
	avatar: "/avatar.jpg",
	video: "/intro.mp4",
	email: "hello@physics.studio"
};
var featuredLinks = [
	{
		title: "動態影像",
		subtitle: "水龍與劍的短片",
		action: "video",
		icon: "video"
	},
	{
		title: "Instagram",
		subtitle: "日常與拍攝現場",
		href: "https://instagram.com/physics",
		icon: "instagram"
	},
	{
		title: "寫作筆記",
		subtitle: "關於觀看與製作",
		href: "https://physics.studio/notes",
		icon: "book"
	},
	{
		title: "限量印刷",
		subtitle: "海報、小誌與相本",
		href: "https://physics.studio/shop",
		icon: "shop"
	},
	{
		title: "合作洽詢",
		subtitle: "品牌、雜誌與空間案",
		href: `mailto:${profile.email}`,
		icon: "mail"
	}
];
var socialLinks = [
	{
		label: "Instagram",
		href: "https://instagram.com/physics",
		icon: "instagram"
	},
	{
		label: "X",
		href: "https://x.com/physics",
		icon: "x"
	},
	{
		label: "YouTube",
		href: "https://youtube.com/@physics",
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
							onPlayVideo: () => setVideoOpen(true)
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
			})
		]
	});
}
//#endregion
export { Home as component };
