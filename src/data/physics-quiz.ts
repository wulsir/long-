export type PhysicsQuestion = {
  id: string;
  field: string;
  prompt: string;
  choices: string[];
  answer: number;
  explain: string;
};

export const physicsQuestions: PhysicsQuestion[] = [
  {
    id: "free-fall",
    field: "力學",
    prompt: "在忽略空氣阻力的情況下，一個鐵球和一顆羽毛從同一高度同時落下，哪一個先落地？",
    choices: ["鐵球先落地", "羽毛先落地", "同時落地", "要看兩者重量"],
    answer: 2,
    explain: "自由落體加速度 g 與質量無關。忽略空氣阻力時，兩者具有相同的加速度，因此同時落地。",
  },
  {
    id: "pendulum-period",
    field: "力學",
    prompt: "單擺的週期 T = 2π√(L/g)。如果把擺繩長度 L 變為原來的 4 倍，週期會變成原來的幾倍？",
    choices: ["2 倍", "4 倍", "8 倍", "16 倍"],
    answer: 0,
    explain: "週期與擺繩長度的平方根成正比。L 變成 4 倍，√4 = 2，所以週期變為 2 倍。",
  },
  {
    id: "newton-third-law",
    field: "力學",
    prompt: "你用手推牆壁，牆壁對你的反作用力方向為何？",
    choices: ["與你的推力同方向", "與你的推力反方向", "垂直向上", "沒有反作用力"],
    answer: 1,
    explain: "牛頓第三定律：作用力與反作用力大小相等、方向相反、作用在不同物體上。牆壁推你的方向與你推牆壁的方向相反。",
  },
  {
    id: "ohm-series",
    field: "電磁",
    prompt: "兩個相同的電阻串聯，總電阻為 R1；並聯後總電阻為 R2。R1 與 R2 的比值為何？",
    choices: ["4:1", "2:1", "1:2", "1:4"],
    answer: 0,
    explain: "串聯總電阻為 2R，並聯總電阻為 R/2，比值為 2R : R/2 = 4:1。",
  },
  {
    id: "wave-frequency",
    field: "波動",
    prompt: "聲波在空氣中傳播時，如果頻率變為 2 倍，波速會如何變化？",
    choices: ["變為 2 倍", "變為 1/2 倍", "不變", "變為 4 倍"],
    answer: 2,
    explain: "波速由介質決定。在同一種介質（空氣）中，波速是固定的，頻率變則波長變，波速不變。",
  },
  {
    id: "energy-swap",
    field: "能量",
    prompt: "單擺從高點釋放，在最低點時能量主要為何種形式？",
    choices: ["重力位能", "動能", "熱能", "彈力位能"],
    answer: 1,
    explain: "高點時速度為零，能量以重力位能為主；落下過程中位能轉換為動能，在最低點時速度最大，動能最大。",
  },
  {
    id: "projectile-horizontal",
    field: "力學",
    prompt: "一個球從水平桌面邊緣水平滾出，與另一個球同時從桌面邊緣自由落下，哪一個先落地？",
    choices: ["水平滾出的先落下的先落地", "同時落地", "要看球的質量", "要看桌子高度"],
    answer: 1,
    explain: "鉛直方向的運動與水平方向無關。兩球在鉛直方向都是自由落體，初始鉛直速度都是零，因此同時落地。",
  },
  {
    id: "friction-static",
    field: "力學",
    prompt: "一個木箱靜止在地面上，你用水平力推它但推不動。此時木箱受到的摩擦力為何？",
    choices: ["零", "等於你的推力", "小於你的推力", "大於你的推力"],
    answer: 1,
    explain: "靜摩擦力會自動調整大小以抵抗外力。木箱靜止表示合力為零，因此靜摩擦力大小等於你的推力，方向相反。",
  },
  {
    id: "momentum-collision",
    field: "力學",
    prompt: "兩個物體碰撞前後，系統的總動量會如何變化？",
    choices: ["增加", "減少", "不變", "要看碰撞種類"],
    answer: 2,
    explain: "動量守恒定律：若系統不受外力（或外力合力為零），碰撞前後總動量不變。彈性或非彈性碰撞都遵守。",
  },
  {
    id: "doppler-approach",
    field: "波動",
    prompt: "一輛鳴笛的火車朝你接近，你聽到的聲波頻率與發出的頻率相比為何？",
    choices: ["較高", "較低", "相同", "要看火車速度"],
    answer: 0,
    explain: "都卜勒效應：當波源朝觀察者接近時，觀察者測得的波長被壓縮，頻率變高。遠離時則頻率變低。",
  },
];

export function physicsScoreNote(score: number) {
  if (score >= 100) return { title: "物理滿分", note: "十題全對，力學到波動都很穩。" };
  if (score >= 80) return { title: "概念清晰", note: "核心概念掌握得好，錯題再看一次會更穩。" };
  if (score >= 60) return { title: "基礎穩固", note: "已經掌握大部分觀念，值得再走一輪錯題。" };
  if (score >= 40) return { title: "還在熱身", note: "先把力學和能量守恒抓住，分數會很快上升。" };
  return { title: "從這題開始", note: "沒關係，每題都有解析。再測一次就熟了。" };
}
