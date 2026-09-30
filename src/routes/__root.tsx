import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const APP_NAME = "physics long";
const THEME_BOOTSTRAP = `(function(){try{var t=localStorage.getItem("physics-theme")||localStorage.getItem("lin-theme");if(t){try{localStorage.setItem("physics-theme",t);localStorage.removeItem("lin-theme");}catch(e){}}var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var dark=t==="dark"||((t===null||t==="system")&&d);document.documentElement.classList.toggle("dark",dark);document.documentElement.style.colorScheme=dark?"dark":"light";}catch(e){}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      {
        name: "description",
        content: "physics 的個人連結頁。作品集、AI筆記、影片與遊戲製作分享。",
      },
      { name: "theme-color", content: "#f4f1ec" },
      { property: "og:title", content: "physics long — 物理教師 · AI設計師" },
      { property: "og:description", content: "用AI記錄日常，把想法做成可以分享的東西。作品集、AI筆記、影片與遊戲製作。" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://long-ten-alpha.vercel.app/" },
      { property: "og:image", content: "https://long-ten-alpha.vercel.app/og.svg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "physics long — 物理教師 · AI設計師" },
      { name: "twitter:description", content: "用AI記錄日常，把想法做成可以分享的東西。" },
      { name: "twitter:image", content: "https://long-ten-alpha.vercel.app/og.svg" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600&family=Noto+Serif+TC:wght@500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
    scripts: [{ children: THEME_BOOTSTRAP }],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="zh-Hant" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
