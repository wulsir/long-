export type LinkIconId =
  | "camera"
  | "instagram"
  | "book"
  | "shop"
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
  name: "physics",
  nameEn: "physics",
  handle: "@physics",
  role: "攝影師 · 獨立設計師",
  bio: "用光影記錄日常，把想法做成可以分享的東西。",
  location: "台北 Taipei",
  availability: "開放品牌與編輯合作",
  avatar: "/avatar.jpg",
  email: "hello@physics.studio",
} as const;

export const featuredLinks: FeaturedLink[] = [
  {
    title: "作品集",
    subtitle: "攝影與設計選集",
    href: "https://are.na/physics",
    icon: "camera",
  },
  {
    title: "Instagram",
    subtitle: "日常與拍攝現場",
    href: "https://instagram.com/physics",
    icon: "instagram",
  },
  {
    title: "寫作筆記",
    subtitle: "關於觀看與製作",
    href: "https://physics.studio/notes",
    icon: "book",
  },
  {
    title: "限量印刷",
    subtitle: "海報、小誌與相本",
    href: "https://physics.studio/shop",
    icon: "shop",
  },
  {
    title: "合作洽詢",
    subtitle: "品牌、雜誌與空間案",
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
  { label: "X", href: "https://x.com/physics", icon: "x" },
  {
    label: "YouTube",
    href: "https://youtube.com/@physics",
    icon: "youtube",
  },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
];
