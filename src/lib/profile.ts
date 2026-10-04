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
  href?: string;
  children?: SubLink[];
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
  email: "wul@go.pymsh.tyc.edu.tw",
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
    href: "#",
    icon: "book",
    subLinks: [
      { label: "AI文章隨想", href: "https://docs.google.com/document/d/19nUmtO3kQe6uXclO-xZjYuE_7Mz4Te7U/view?usp=sharing" },
      { label: "影片製作", href: "#" },
      { label: "遊戲製作", href: "#" },
    ],
  },
  {
    title: "免費AI資源",
    subtitle: "5大好用AI和2個agent AI",
    href: "https://grok.com/",
    icon: "shop",
    subLinks: [
      { label: "Claude", href: "https://claude.ai/" },
      { label: "ChatGPT", href: "https://chatgpt.com/" },
      { label: "Grok", href: "https://grok.com/" },
      { label: "Meta AI", href: "https://www.meta.ai/" },
      { label: "Gemini", href: "https://gemini.google.com/" },
      {
        label: "工作流AI",
        children: [
          {
            label: "Hermas agent",
            href: "https://hermes-agent.nousresearch.com/",
          },
          { label: "Manus", href: "https://manus.im/" },
        ],
      },
    ],
  },
  {
    title: "合作洽詢",
    subtitle: "品牌、AI與設計案件",
    href: `mailto:${profile.email}`,
    icon: "mail",
  },
  {
    title: "物理與AI合作",
    subtitle: "物理AI教學影片 · 物理AI實驗動畫",
    href: "#physics-ai",
    icon: "brain",
    subLinks: [
      { label: "物理AI教學影片", href: "https://youtu.be/TmxfccWpFWo?si=-bvrT1cRg63NRD0K" },
      { label: "物理AI實驗動畫", href: "#experiment" },
    ],
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
