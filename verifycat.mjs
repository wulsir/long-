import { chromium } from "playwright";

const URL = "https://long-ten-alpha.vercel.app/";
const OUT = "C:/Users/wwwuu/AppData/Local/hermes/cache/scratch";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push("PAGE: " + e.message));
page.on("console", (m) => {
  if (m.type() === "error" && !m.text().includes("NotSameOrigin")) errors.push("CONSOLE: " + m.text());
});

await page.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(3500);

const tabs = await page.evaluate(() => {
  const tl = document.querySelector('[role="tablist"]');
  return tl ? Array.from(tl.querySelectorAll('[role="tab"]')).map((b) => b.textContent.trim()) : null;
});
console.log("=== 分類按鈕 ===");
console.log(tabs ? tabs.join("  |  ") : "❌ 找不到");

async function check(label) {
  await page.locator('[role="tab"]', { hasText: label }).first().click();
  await page.waitForTimeout(1000);
  return page.evaluate(() => {
    const col = document.querySelector('[role="tablist"]')?.parentElement?.parentElement;
    const wrap = col?.children?.[1];
    return Array.from(wrap?.children ?? [])
      .map((c) => (c.textContent ?? "").trim().slice(0, 12))
      .filter((t) => t && !t.startsWith("複製"));
  });
}

console.log("\n=== 各分類內容 ===");
for (const label of ["教學", "筆記", "動態", "全部"]) {
  const s = await check(label);
  console.log(`  [${label}] ${s.join(" / ")}`);
}

// sticky
await page.locator('[role="tab"]', { hasText: "全部" }).first().click();
await page.waitForTimeout(700);
const stick = [];
for (const y of [0, 900, 2000]) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(500);
  stick.push(await page.evaluate(() => {
    const r = document.querySelector('[role="tablist"]')?.parentElement?.getBoundingClientRect();
    return { scrollY: Math.round(window.scrollY), barTop: r ? Math.round(r.top) : null };
  }));
}
console.log("\n=== Sticky ===");
stick.forEach((s) => console.log(`  scrollY=${s.scrollY} → barTop=${s.barTop}`));

// 舊內容還在嗎
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
const content = await page.evaluate(() => {
  const body = document.body.innerText;
  const keys = ["今日物理箋", "正在合作", "入口", "工作室節奏", "每日貢獻", "文章摘錄", "最近動態", "作品集", "合作洽詢"];
  return keys.map((k) => ({ k, ok: body.includes(k) }));
});
console.log("\n=== 原有內容檢查 ===");
console.log(content.map((c) => `${c.ok ? "✅" : "❌"} ${c.k}`).join("  "));

await page.screenshot({ path: `${OUT}/live_cat.png` });

// 手機
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
await m.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
await m.waitForTimeout(3000);
const mo = await m.evaluate(() => ({ overflow: document.documentElement.scrollWidth > window.innerWidth + 1 }));
await m.locator('[role="tab"]', { hasText: "動態" }).first().click();
await m.waitForTimeout(1200);
await m.evaluate(() => window.scrollTo(0, 700));
await m.waitForTimeout(700);
await m.screenshot({ path: `${OUT}/live_cat_mobile.png` });
console.log("\n手機版水平溢出:", mo.overflow ? "❌ 有" : "✅ 無");

console.log("\nJS 錯誤:", errors.length === 0 ? "✅ 無" : errors.slice(0, 4).join("\n"));
await browser.close();
