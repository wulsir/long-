import { chromium } from "playwright";

const URL = process.env.T || "http://127.0.0.1:5199/";
const OUT = "C:/Users/wwwuu/AppData/Local/hermes/cache/scratch";
const browser = await chromium.launch({ channel: "chrome" });
const errors = [];
const fail = [];

function chk(name, ok, extra = "") {
  console.log(`${ok ? "✅" : "❌"} ${name}${extra ? " — " + extra : ""}`);
  if (!ok) fail.push(name);
}

// ===== 桌面 =====
const d = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
d.on("pageerror", (e) => errors.push("desktop: " + e.message));
d.on("console", (m) => { if (m.type() === "error" && !m.text().includes("NotSameOrigin")) errors.push("desktop: " + m.text()); });
await d.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
await d.waitForTimeout(3000);

const tabs = await d.evaluate(() => Array.from(document.querySelectorAll('[role="tab"]')).map((b) => b.textContent.trim()));
chk("分類按鈕存在（4 顆）", tabs.length === 4, tabs.join(" "));

async function secs(page, label) {
  await page.locator('[role="tab"]', { hasText: label }).first().click();
  await page.waitForTimeout(1000);
  return page.evaluate(() => {
    const col = document.querySelector('[role="tablist"]')?.parentElement?.parentElement;
    return Array.from(col?.children?.[1]?.children ?? [])
      .map((c) => (c.textContent ?? "").trim().slice(0, 10))
      .filter((t) => t && !t.startsWith("複製"));
  });
}

const groups = { "教學": 2, "筆記": 2, "動態": 3, "全部": 7 };
for (const [label, want] of Object.entries(groups)) {
  const s = await secs(d, label);
  chk(`[${label}] 顯示 ${want} 個區塊`, s.length === want, s.join(" / "));
}

// sticky
await d.locator('[role="tab"]', { hasText: "全部" }).first().click();
await d.waitForTimeout(700);
const stick = [];
for (const y of [0, 900, 2000]) {
  await d.evaluate((yy) => window.scrollTo(0, yy), y);
  await d.waitForTimeout(450);
  stick.push(await d.evaluate(() => Math.round(document.querySelector('[role="tablist"]')?.parentElement?.getBoundingClientRect().top ?? -1)));
}
chk("Sticky 黏在頂端", stick[1] === 0 && stick[2] === 0, `barTop = ${stick.join(", ")}`);

// 原內容都在
await d.evaluate(() => window.scrollTo(0, 0));
await d.waitForTimeout(500);
const body = await d.evaluate(() => document.body.innerText);
const must = ["今日物理箋", "正在合作", "入口", "工作室節奏", "每日貢獻", "文章摘錄", "最近動態", "作品集", "合作概詢", "合作洽詢"];
const missing = must.filter((k) => !body.includes(k));
chk("原有內容完整", missing.length === 0, missing.length ? "缺: " + missing.join(",") : "10 項全在");

// 互動還在
await d.locator('[role="tab"]', { hasText: "全部" }).first().click();
await d.waitForTimeout(800);
const quizOk = await d.evaluate(() => {
  const b = Array.from(document.querySelectorAll("button")).find((x) => x.textContent.includes("基礎邏輯"));
  if (b) { b.click(); return true; }
  return false;
});
await d.waitForTimeout(900);
const dialogOpen = await d.evaluate(() => !!document.querySelector('[role="dialog"]'));
chk("測驗對話框仍可開啟", quizOk && dialogOpen);
await d.keyboard.press("Escape");
await d.waitForTimeout(500);

// ===== 手機 =====
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
m.on("pageerror", (e) => errors.push("mobile: " + e.message));
await m.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
await m.waitForTimeout(3000);
await m.evaluate(() => window.scrollTo(0, 800));
await m.waitForTimeout(700);

const mm = await m.evaluate(() => {
  const tl = document.querySelector('[role="tablist"]');
  const tabs = Array.from(tl.querySelectorAll('[role="tab"]'));
  const fb = Array.from(document.querySelectorAll("div.fixed")).find((e) => e.querySelector("button"))?.getBoundingClientRect();
  return {
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    needScroll: tl.scrollWidth > tl.clientWidth + 1,
    lastRight: Math.round(tabs[tabs.length - 1].getBoundingClientRect().right),
    fbLeft: fb ? Math.round(fb.left) : null,
    pillH: Math.round(tabs[0].getBoundingClientRect().height),
    barTop: Math.round(tl.parentElement.getBoundingClientRect().top),
  };
});
chk("手機：無水平溢出", !mm.overflow);
chk("手機：4 顆按鈕不需橫向捲動", !mm.needScroll);
chk("手機：不被浮動按鈕遮住", mm.fbLeft !== null && mm.lastRight < mm.fbLeft, `pill右${mm.lastRight} < 按鈕左${mm.fbLeft}`);
chk("手機：有效點擊高 ≥44px", mm.pillH + 12 >= 44, `${mm.pillH + 12}px`);
chk("手機：sticky 生效", mm.barTop === 0, `barTop=${mm.barTop}`);

const mSecs = await secs(m, "動態");
chk("手機：分類切換正常", mSecs.length === 3, mSecs.join(" / "));

chk("無 JS 錯誤", errors.length === 0, errors.slice(0, 3).join(" | "));

console.log(`\n${fail.length === 0 ? "全部通過" : "失敗 " + fail.length + " 項: " + fail.join(", ")}`);
await browser.close();
