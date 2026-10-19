export const profile = {
  name: "physics long",
  handle: "@physicslong",
  role: "物理教師 · AI 設計師",
  bio: "用 AI 記錄日常，把想法做成可以分享的東西。",
  now: "此刻在剪物理實驗動畫，筆記和邏輯小測已經可以看。",
  email: "wul@go.ymhs.tyc.edu.tw",
  avatar: "/avatar.jpg",
  video: "/intro.mp4",
};

export const nowChips = ["力學演示", "實驗動畫", "邏輯小測"];

export type SubLink = {
  label: string;
  href?: string;
  note?: string;
  children?: SubLink[];
};

export type LinkItem = {
  title: string;
  subtitle: string;
  href?: string;
  icon: "github" | "brain" | "book" | "spark" | "mail";
  action?: "quiz";
  subLinks?: SubLink[];
};

export const links: LinkItem[] = [
  {
    title: "作品集",
    subtitle: "AI 與設計選集",
    href: "https://github.com/wulsir",
    icon: "github",
  },
  {
    title: "基礎邏輯",
    subtitle: "AI 教育 · 互動測驗 · 滿分 100",
    href: "#logic-quiz",
    icon: "brain",
    action: "quiz",
  },
  {
    title: "AI 寫作筆記",
    subtitle: "文章隨想、影片與遊戲製作",
    href: "#notes",
    icon: "book",
    subLinks: [
      {
        label: "AI 文章隨想",
        href: "https://docs.google.com/document/d/19nUmtO3kQe6uXclO-xZjYuE_7Mz4Te7U/view?usp=sharing",
      },
      {
        label: "影片製作",
        note: "這一輯還在剪。想先看內容，從文章隨想開始。",
      },
      {
        label: "遊戲製作",
        note: "互動小遊戲還在排進站內，基礎邏輯可以先玩。",
      },
    ],
  },
  {
    title: "免費 AI 資源",
    subtitle: "五個常用 AI，兩個工作流助手",
    href: "#tools",
    icon: "spark",
    subLinks: [
      { label: "Claude", href: "https://claude.ai/" },
      { label: "ChatGPT", href: "https://chatgpt.com/" },
      { label: "Grok", href: "https://grok.com/" },
      { label: "Meta AI", href: "https://www.meta.ai/" },
      { label: "Gemini", href: "https://gemini.google.com/" },
      {
        label: "工作流 AI",
        children: [
          { label: "Hermes agent", href: "https://hermes-agent.nousresearch.com/" },
          { label: "Manus", href: "https://manus.im/" },
        ],
      },
    ],
  },
  {
    title: "合作洽詢",
    subtitle: "品牌、AI 與設計案件",
    href: `mailto:${profile.email}`,
    icon: "mail",
  },
];

export const socials = [
  { label: "Instagram", href: "https://instagram.com/physicslong", icon: "instagram" as const },
  { label: "X", href: "https://x.com/physicslong", icon: "x" as const },
  { label: "YouTube", href: "https://www.youtube.com/@Quantumlogic-rd1sv", icon: "youtube" as const },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" as const },
];

export const physicsPieces = [
  {
    label: "教學影片",
    href: "https://youtu.be/TmxfccWpFWo?si=-bvrT1cRg63NRD0K",
    note: "一堂已經上線的物理 AI 課。",
  },
];

export const experimentNote =
  "實驗動畫還在後製。落體、單擺會先在課堂裡走一遍，再做成可以重看的畫面。";

export const slips = [
  {
    field: "力學",
    formula: "T = 2π√(L/g)",
    title: "單擺",
    line: "小角度時，週期幾乎只跟繩長有關。",
    classroom: "我會先問：換成更重的砝碼，會不會更快回到原點？多數人點頭，然後一起看它沒有。",
  },
  {
    field: "力學",
    formula: "s = ½gt²",
    title: "落體",
    line: "忽略空氣的時候，重的和輕的一起落地。",
    classroom: "兩張紙，一張揉成團。同時放手，團先到。不是因為比較重，是空氣來不及拖住它。",
  },
  {
    field: "力學",
    formula: "F₁₂ = −F₂₁",
    title: "作用力",
    line: "你推牆的時候，牆也在推你，而且一樣大。",
    classroom: "力一定成對，但作用在不同物體上。所以「互相抵消」常常是受力圖畫錯的開始。",
  },
  {
    field: "電磁",
    formula: "V = IR",
    title: "歐姆",
    line: "電壓、電流、電阻。先畫電路，再代這條。",
    classroom: "串聯先想分壓，並聯先想分流。公式很短，圖畫錯就全錯。",
  },
  {
    field: "波動",
    formula: "v = fλ",
    title: "波速",
    line: "頻率變了，波長通常跟著變。波速先別急著改。",
    classroom: "同一條繩、同一種介質，速度多半先當常數。聲音是縱波，光是橫波，這條式子兩邊都用得上。",
  },
  {
    field: "能量",
    formula: "mgh = ½mv²",
    title: "交換",
    line: "擺到最高點幾乎停住，最低點跑得最快。",
    classroom: "高度換成速度，中間沒有憑空消失。摩擦會偷走一點，所以它不會永遠擺下去。",
  },
  {
    field: "近代",
    formula: "Δx·Δp ≥ ℏ/2",
    title: "測不準",
    line: "位置看得越準，動量就越糊。這不是儀器壞了。",
    classroom: "如果只先記一句：測量本身會打擾那個被測量的東西。數學可以晚一點再補。",
  },
];

export const rhythm = [
  { day: "一", title: "備課", line: "把這週要演示的現象，收成課堂上一次做得完的步驟。" },
  { day: "二", title: "力學", line: "單擺、落體、受力圖。先看現象，再寫式子。" },
  { day: "三", title: "動畫", line: "把今天的演示拆成物理 AI 實驗動畫的鏡頭。" },
  { day: "四", title: "邏輯", line: "十分鐘基礎推論。充分條件和否定句最容易摔。" },
  { day: "五", title: "筆記", line: "把這週的想法收成可以分享的文章或影片。" },
  { day: "六", title: "寫作", line: "短篇與隨想。不一定跟物理有關，但跟把話說清楚有關。" },
  { day: "日", title: "留白", line: "不排進度。音樂開著就好。" },
];

export const updates: { date: string; type: string; title: string; href?: string }[] = [
  { date: "10-10", type: "更新", title: "加上軌道時鐘、今日物理箋與工作室節奏" },
  {
    date: "09-27",
    type: "筆記",
    title: "AI 文章隨想上線",
    href: "https://docs.google.com/document/d/19nUmtO3kQe6uXclO-xZjYuE_7Mz4Te7U/view?usp=sharing",
  },
  { date: "09-27", type: "分享", title: "短篇散文「宿命的喚醒」" },
  {
    date: "09-26",
    type: "分享",
    title: "物理教師日常 — 課程實錄 #02",
    href: "https://www.youtube.com/@Quantumlogic-rd1sv",
  },
  { date: "09-25", type: "更新", title: "個人站點上線，開始累積筆記" },
];

export const questions = [
  {
    id: "modus-ponens",
    prompt: "若 P 為真，則 Q 為真。現在已知 P 為真。可以得出什麼？",
    choices: ["Q 必為真", "Q 必為假", "無法判斷 Q", "P 會變成假"],
    answer: 0,
    explain: "這是肯定前件（modus ponens）：由「若 P 則 Q」加上 P，可推出 Q。",
  },
  {
    id: "syllogism",
    prompt: "所有金屬都會導電。銅是金屬。因此：",
    choices: ["銅會導電", "只有銅會導電", "金屬不一定導電", "還需要實驗才能判斷"],
    answer: 0,
    explain: "這是有效的定言三段論：所有 A 是 B，C 是 A，所以 C 是 B。",
  },
  {
    id: "affirming-consequent",
    prompt: "「如果下雨，地面會濕。地面現在是濕的。」能推出一定下雨了嗎？",
    choices: ["能，地面濕就代表下雨", "不能，地面濕可能有別的原因", "能，因為兩句都提到濕", "不能，因為下雨和地面無關"],
    answer: 1,
    explain: "肯定後件是常見謬誤。地面濕也可能來自灑水，不能反推一定下雨。",
  },
  {
    id: "negation",
    prompt: "否定「所有天鵝都是白色」等於哪一句？",
    choices: ["所有天鵝都不是白色", "存在一隻不是白色的天鵝", "沒有天鵝", "所有天鵝都是黑色"],
    answer: 1,
    explain: "「所有 A 都是 B」的否定是「至少有一個 A 不是 B」，不是改成全部相反。",
  },
  {
    id: "disjunction",
    prompt: "要嘛去實驗室，要嘛去圖書館。小李沒有去圖書館。結論是？",
    choices: ["小李去了實驗室", "兩個地方都沒去", "還是可能去圖書館", "無法判斷"],
    answer: 0,
    explain: "選言三段論：P 或 Q，非 Q，所以 P。排除一個選項後，另一個成立。",
  },
  {
    id: "comparison",
    prompt: "A 比 B 高，B 比 C 高。三人裡誰最矮？",
    choices: ["A", "B", "C", "無法比較"],
    answer: 2,
    explain: "高矮關係可傳遞：A > B > C，所以 C 最矮。",
  },
  {
    id: "sequence",
    prompt: "數列 3、6、12、24、？ 下一個數是？",
    choices: ["36", "48", "30", "42"],
    answer: 1,
    explain: "每一項都是前一項的兩倍，24 × 2 = 48。",
  },
  {
    id: "sufficient",
    prompt: "「A 是 B 的充分條件」代表什麼？",
    choices: ["有 A 就一定有 B", "有 B 就一定有 A", "沒有 A 就一定沒有 B", "A 和 B 互不相關"],
    answer: 0,
    explain: "充分條件是「有它就夠了」：A 成立則 B 成立。B 成立時，A 不一定成立。",
  },
  {
    id: "and-gate",
    prompt: "條件：x > 0 且 x < 10。當 x = 10 時，這個條件為？",
    choices: ["真", "假", "有時真有時假", "無法運算"],
    answer: 1,
    explain: "「且」要兩邊都成立。x = 10 不小於 10，所以整個條件為假。",
  },
  {
    id: "xor-liar",
    prompt: "兩人恰好一人說實話。A 說「B 在說謊」。B 說「我們都說實話」。誰說實話？",
    choices: ["A", "B", "兩人都說謊", "無法判斷"],
    answer: 0,
    explain: "若 B 說實話，則兩人都說實話，與「恰好一人說實話」矛盾。所以 B 說謊、A 說實話。",
  },
];

export function scoreNote(score: number) {
  if (score >= 100) return { title: "邏輯滿分", note: "十題全對，推論乾淨而穩定。" };
  if (score >= 80) return { title: "推理清晰", note: "大方向正確，再把謬誤題看一次就更穩。" };
  if (score >= 60) return { title: "基礎穩固", note: "已掌握核心規則，錯題解析值得再走一輪。" };
  if (score >= 40) return { title: "還在熱身", note: "先抓住充分條件與否定句，分數會很快上來。" };
  return { title: "從這題開始", note: "沒關係，每題都有解析。再測一次就熟了。" };
}

export function taipeiWeekIndex(date = new Date()) {
  const wd = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Taipei",
    weekday: "short",
  }).format(date);
  const map: Record<string, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
  return map[wd] ?? 0;
}

export function taipeiDayNumber(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
  const [year, month, day] = parts.split("-").map(Number);
  const start = Date.UTC(year ?? 2026, 0, 0);
  const current = Date.UTC(year ?? 2026, (month ?? 1) - 1, day ?? 1);
  return Math.floor((current - start) / 86400000);
}
