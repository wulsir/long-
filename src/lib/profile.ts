export type LinkIconId =
  | "camera"
  | "instagram"
  | "book"
  | "shop"
  | "github"
  | "mail"
  | "x"
  | "youtube";

export type FeaturedLink = {
  title: string;
  subtitle: string;
  href: string;
  icon: LinkIconId;
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
    title: "社群",
    subtitle: "AI教育",
    href: "https://instagram.com/physics",
    icon: "instagram",
  },
  {
    title: "AI寫作筆記",
    subtitle: "關於觀看與製作",
    href: "https://physics.studio/notes",
    icon: "book",
  },
  {
    title: "免費AI資源",
    subtitle: "遊戲與影片製作",
    href: "https://physics.studio/shop",
    icon: "shop",
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
    href: "https://instagram.com/physics",
    icon: "instagram",
  },
  { label: "X", href: "https://x.com/physicslong", icon: "x" },
  {
    label: "YouTube",
    href: "https://youtube.com/@Quantumlogic-rd1sv",
    icon: "youtube",
  },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
];
