import { chromium } from "playwright";

const URL = process.env.T || "http://127.0.0.1:5199/";
const OUT = "C:/Users/wwwuu/AppData/Local/hermes/cache/scratch";
const browser = await chromium.launch({ channel: "chrome" });
const fail = [];
const chk = (n, ok, x = "") => { console.log(`${ok ? "✅" : "❌"} ${n}${x ? " — " + x : ""}`); if (!ok) fail.push(n); };

async function run(label, vp, shot) {
  console.log(`\n──────── ${label} ────────`);
  const page = await browser.newPage({ viewport: vp, isMobile: vp.width < 500, hasTouch: vp.width < 500, deviceScaleFactor: vp.width < 500 ? 2 : 1 });
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  await page.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(3000);

  // 父層不該再有 transform
  const wrapper = await page.evaluate(() => {
    const el = document.querySelector(".fade-in");
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { transform: cs.transform, animation: cs.animationName };
  });
  chk("內容容器沒有 transform（不會綁死 fixed）", wrapper?.transform === "none", `transform=${wrapper?.transform}, anim=${wrapper?.animation}`);

  // 開啟每個有子選單的連結
  for (const name of ["免費 AI 資源", "AI 寫作筆記"]) {
    const btn = page.locator("button", { hasText: name }).first();
    await btn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await btn.click();
    await page.waitForTimeout(900);
    const r = await page.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"]');
      if (!dlg) return { open: false };
      const b = dlg.getBoundingClientRect();
      const vis = Math.max(0, Math.min(b.bottom, window.innerHeight) - Math.max(b.top, 0));
      return {
        open: true, label: dlg.getAttribute("aria-label"),
        top: Math.round(b.top), h: Math.round(b.height),
        fullyVisible: b.top >= -1 && b.bottom <= window.innerHeight + 1,
        visibleRatio: Math.round((vis / b.height) * 100),
        items: Array.from(dlg.querySelectorAll("a, button")).filter((e) => !e.getAttribute("aria-label")).map((e) => e.textContent.trim().slice(0, 12)),
      };
    });
    chk(`「${name}」選單完整顯示在畫面內`, r.open && r.fullyVisible, r.open ? `top=${r.top} 高=${r.h} 可見=${r.visibleRatio}% 項目=${r.items.join("/")}` : "未開啟");
    if (name === "免費 AI 資源" && shot) await page.screenshot({ path: `${OUT}/${shot}.png` });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);
  }

  // 巢狀子選單（工作流 AI）
  const btn = page.locator("button", { hasText: "免費 AI 資源" }).first();
  await btn.click();
  await page.waitForTimeout(800);
  const nestedBtn = page.locator('[role="dialog"] button', { hasText: "工作流 AI" }).first();
  if (await nestedBtn.count()) {
    await nestedBtn.click();
    await page.waitForTimeout(800);
    const n = await page.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"]');
      const b = dlg.getBoundingClientRect();
      return { heading: dlg.getAttribute("aria-label"), fullyVisible: b.top >= -1 && b.bottom <= window.innerHeight + 1, items: Array.from(dlg.querySelectorAll("a")).map((a) => a.textContent.trim()) };
    });
    chk("巢狀子選單（工作流 AI）正常", n.fullyVisible && n.items.length === 2, `${n.heading}: ${n.items.join(", ")}`);
  }
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);

  // 對話框關閉後頁面可捲動
  const scrollable = await page.evaluate(async () => {
    window.scrollTo(0, 500);
    await new Promise((r) => setTimeout(r, 300));
    return { overflow: document.body.style.overflow, y: Math.round(window.scrollY) };
  });
  chk("關閉後頁面可捲動（overflow 已還原）", scrollable.overflow !== "hidden" && scrollable.y > 0, `overflow="${scrollable.overflow}" y=${scrollable.y}`);

  // 測驗對話框仍正常
  await page.locator("button", { hasText: "基礎邏輯" }).first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.locator("button", { hasText: "基礎邏輯" }).first().click();
  await page.waitForTimeout(900);
  const q = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"]');
    if (!d) return { open: false };
    const b = d.getBoundingClientRect();
    return { open: true, fullyVisible: b.top >= -1 && b.bottom <= window.innerHeight + 1, label: d.getAttribute("aria-label") };
  });
  chk("測驗對話框正常", q.open && q.fullyVisible, q.label ?? "未開啟");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);

  // 分類切換仍正常
  const before = await page.evaluate(() => document.querySelectorAll('[role="tab"]').length);
  await page.locator('[role="tab"]', { hasText: "教學" }).first().click();
  await page.waitForTimeout(900);
  const after = await page.evaluate(() => {
    const col = document.querySelector('[role="tablist"]')?.parentElement?.parentElement;
    return Array.from(col?.children?.[1]?.children ?? []).map((c) => c.textContent.trim().slice(0, 8)).filter((t) => t && !t.startsWith("複製"));
  });
  chk("分類切換仍正常", before === 4 && after.length === 2, after.join(" / "));

  chk("無 JS 錯誤", errs.length === 0, errs.slice(0, 2).join(" | "));
  await page.close();
}

await run("桌面 1440×1000", { width: 1440, height: 1000 }, "fix_desktop");
await run("手機 390×844", { width: 390, height: 844 }, "fix_mobile");

console.log(`\n${fail.length === 0 ? "🎉 全部通過" : "❌ 失敗: " + fail.join(", ")}`);
await browser.close();
