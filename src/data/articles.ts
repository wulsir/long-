export type Article = {
  id: string;
  title: string;
  excerpt: string;
  keywords: string[];
  href: string;
  date: string;
};

export const articles: Article[] = [
  {
    id: "ai-reflections",
    title: "AI 文章隨想",
    excerpt: "用 AI 記錄日常，把想法做成可以分享的東西。從物理教學到 AI 設計，記錄每個靈光乍現的瞬間。",
    keywords: ["AI", "隨想", "記錄", "分享", "教學"],
    href: "https://docs.google.com/document/d/1ENKuMIIA1HyTDJHCnG4mq206ToJYElJZ/edit?usp=drive_link&ouid=104819613392939956914&rtpof=true&sd=true",
    date: "09-27",
  },
  {
    id: "fate-awakening",
    title: "宿命的喚醒",
    excerpt: "短篇散文。關於記憶、時間，和那些以為忘記卻又想起的時刻。",
    keywords: ["散文", "宿命", "記憶", "時間"],
    href: "https://docs.google.com/document/d/1ENKuMIIA1HyTDJHCnG4mq206ToJYElJZ/edit?usp=drive_link&ouid=104819613392939956914&rtpof=true&sd=true",
    date: "09-27",
  },
  {
    id: "physics-teacher-daily-02",
    title: "物理教師日常 — 課程實錄 #02",
    excerpt: "備課、演示、學生提問。把一堂課的節奏記錄下來，回頭看哪些地方可以更好。",
    keywords: ["物理", "教學", "課程", "實錄", "教師"],
    href: "https://www.youtube.com/@Quantumlogic-rd1sv",
    date: "09-26",
  },
  {
    id: "physics-ai-teaching-video",
    title: "物理 AI 教學影片",
    excerpt: "一堂完整課程影片，用 AI 輔助說明物理概念，搭配實驗動畫。",
    keywords: ["物理", "AI", "教學", "影片", "實驗"],
    href: "https://youtu.be/TmxfccWpFWo?si=-bvrT1cRg63NRD0K",
    date: "09-25",
  },
];

export function searchArticles(query: string): Article[] {
  const q = query.trim().toLowerCase();
  if (!q) return articles;
  return articles.filter((a) => {
    const text = `${a.title} ${a.excerpt} ${a.keywords.join(" ")}`.toLowerCase();
    return text.includes(q);
  });
}
