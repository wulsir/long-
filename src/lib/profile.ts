export type LinkIconId =
  | "camera"
  | "instagram"
  | "book"
  | "shop"
  | "github"
  | "mail"
  | "x"
  | "youtube"
  | "brain";

export type SubLink = {
  label: string;
  href: string;
};

export type FeaturedLink = {
  title: string;
  subtitle: string;
  href: string;
  icon: LinkIconId;
  action?: "quiz";
  subLinks?: SubLink[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon: LinkIconId;
};

export const profile = {
  name: "physics long",
  nameEn: "physics long",
  handle: "@physicslong",
  role: "物理教師 · AI設計師",
  bio: "用AI記錄日常，把想法做成可以分享的東西。",
  location: "桃園 Taoyuan",
  availability: "物理與AI合作",
  avatar: "/avatar.jpg",
  video: "/intro.mp4",
  email: "hello@physicslong.studio",
} as const;

export const featuredLinks: FeaturedLink[] = [
  {
    title: "作品集",
    subtitle: "AI與設計選集",
    href: "https://github.com/wulsir",
    icon: "github",
  },
  {
    title: "基礎邏輯",
    subtitle: "AI教育 · 互動測驗 · 滿分 100",
    href: "#logic-quiz",
    icon: "brain",
    action: "quiz",
  },
  {
    title: "AI寫作筆記",
    subtitle: "關於AI文章隨想與影片及遊戲製作",
    href: "https://physicslong.studio/notes",
    icon: "book",
  },
  {
    title: "免費AI資源",
    subtitle: "好用的5大AI",
    href: "https://grok.com/",
    icon: "shop",
    subLinks: [
      { label: "Claude", href: "https://claude.ai/" },
      { label: "ChatGPT", href: "https://chatgpt.com/" },
      { label: "Grok", href: "https://grok.com/" },
      { label: "Meta AI", href: "https://www.meta.ai/" },
      { label: "Gemini", href: "https://gemini.google.com/" },
    ],
  },
  {
    title: "合作洽詢",
    subtitle: "品牌、AI與設計案件",
    href: `mailto:${profile.email}`,
    icon: "mail",
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://instagram.com/physicslong",
    icon: "instagram",
  },
  { label: "X", href: "https://x.com/physicslong", icon: "x" },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Quantumlogic-rd1sv",
    icon: "youtube",
  },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
];
