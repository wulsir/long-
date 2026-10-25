import { chromium } from "playwright";

const URL = process.env.T || "https://long-ten-alpha.vercel.app/";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(3500);

async function testLink(name) {
  await page.keyboard.press("Escape").catch(() => {});
  await page.waitForTimeout(400);
  const btn = page.locator("button", { hasText: name }).first();
  const exists = await btn.count();
  if (!exists) return { name, found: false };
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await page.waitForTimeout(1000);
  const r = await page.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"]');
    if (!dlg) return { open: false };
    const rect = dlg.getBoundingClientRect();
    const parent = dlg.closest(".rise-in");
    const ps = parent ? getComputedStyle(parent) : null;
    return {
      open: true,
      label: dlg.getAttribute("aria-label"),
      rect: { top: Math.round(rect.top), left: Math.round(rect.left), w: Math.round(rect.width), h: Math.round(rect.height) },
      inViewport: rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0,
      riseInParent: !!parent,
      parentTransform: ps?.transform ?? null,
      parentHeight: parent ? Math.round(parent.getBoundingClientRect().height) : null,
    };
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);
  return { name, found: true, ...r };
}

for (const n of ["免費 AI 資源", "AI 寫作筆記"]) {
  const r = await testLink(n);
  console.log(`\n=== ${n} ===`);
  console.log(JSON.stringify(r, null, 2));
}

// 對照組：測驗對話框（掛在 rise-in 外面）
await page.locator("button", { hasText: "基礎邏輯" }).first().click();
await page.waitForTimeout(900);
const q = await page.evaluate(() => {
  const dlg = document.querySelector('[role="dialog"]');
  if (!dlg) return { open: false };
  const rect = dlg.getBoundingClientRect();
  return { open: true, label: dlg.getAttribute("aria-label"), inViewport: rect.top < window.innerHeight && rect.bottom > 0, top: Math.round(rect.top) };
});
console.log("\n=== 基礎邏輯（對照組，掛在 rise-in 外）===");
console.log(JSON.stringify(q, null, 2));

await browser.close();
