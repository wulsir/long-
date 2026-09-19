export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  answer: number;
  explain: string;
};

export const POINTS_PER_QUESTION = 10;
export const QUIZ_MAX_SCORE = 100;
export const QUIZ_BEST_KEY = "physics-logic-quiz-best";

export const logicQuestions: QuizQuestion[] = [
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
    choices: [
      "銅會導電",
      "只有銅會導電",
      "金屬不一定導電",
      "還需要實驗才能判斷",
    ],
    answer: 0,
    explain: "這是有效的定言三段論：所有 A 是 B，C 是 A，所以 C 是 B。",
  },
  {
    id: "affirming-consequent",
    prompt: "「如果下雨，地面會濕。地面現在是濕的。」能推出一定下雨了嗎？",
    choices: [
      "能，地面濕就代表下雨",
      "不能，地面濕可能有別的原因",
      "能，因為兩句都提到濕",
      "不能，因為下雨和地面無關",
    ],
    answer: 1,
    explain: "肯定後件是常見謬誤。地面濕也可能來自灑水，不能反推一定下雨。",
  },
  {
    id: "negation",
    prompt: "否定「所有天鵝都是白色」等於哪一句？",
    choices: [
      "所有天鵝都不是白色",
      "存在一隻不是白色的天鵝",
      "沒有天鵝",
      "所有天鵝都是黑色",
    ],
    answer: 1,
    explain: "「所有 A 都是 B」的否定是「至少有一個 A 不是 B」，不是改成全部相反。",
  },
  {
    id: "disjunction",
    prompt: "要嘛去實驗室，要嘛去圖書館。小李沒有去圖書館。結論是？",
    choices: [
      "小李去了實驗室",
      "兩個地方都沒去",
      "還是可能去圖書館",
      "無法判斷",
    ],
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
    choices: [
      "有 A 就一定有 B",
      "有 B 就一定有 A",
      "沒有 A 就一定沒有 B",
      "A 和 B 互不相關",
    ],
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
    explain:
      "若 B 說實話，則兩人都說實話，與「恰好一人說實話」矛盾。所以 B 說謊、A 說實話。",
  },
];

function shuffleInPlace<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const current = items[i];
    const swap = items[j];
    if (current === undefined || swap === undefined) continue;
    items[i] = swap;
    items[j] = current;
  }
  return items;
}

export function dealQuiz(): QuizQuestion[] {
  const deck = logicQuestions.map((question) => {
    const order = shuffleInPlace(question.choices.map((_, index) => index));
    return {
      ...question,
      choices: order.map((index) => question.choices[index] ?? ""),
      answer: order.indexOf(question.answer),
    };
  });
  return shuffleInPlace(deck);
}

export function scoreRank(score: number): { title: string; note: string } {
  if (score >= QUIZ_MAX_SCORE) {
    return { title: "邏輯滿分", note: "十題全對，推論乾淨而穩定。" };
  }
  if (score >= 80) {
    return { title: "推理清晰", note: "大方向正確，再把謬誤題看一次就更穩。" };
  }
  if (score >= 60) {
    return { title: "基礎穩固", note: "已掌握核心規則，錯題解析值得再走一輪。" };
  }
  if (score >= 40) {
    return { title: "還在熱身", note: "先抓住充分條件與否定句，分數會很快上來。" };
  }
  return { title: "從這題開始", note: "沒關係，每題都有解析。再測一次就熟了。" };
}
