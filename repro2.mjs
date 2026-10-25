import { chromium } from "playwright";

const URL = "https://long-ten-alpha.vercel.app/";
const OUT = "C:/Users/wwwuu/AppData/Local/hermes/cache/scratch";
const browser = await chromium.launch({ channel: "chrome" });

for (const [label, vp, file] of [
  ["桌面", { width: 1440, height: 1000 }, "bug_desktop"],
  ["手機", { width: 390, height: 844 }, "bug_mobile"],
]) {
  const page = await browser.newPage({ viewport: vp, isMobile: vp.width < 500, hasTouch: vp.width < 500 });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(3000);
  const btn = page.locator("button", { hasText: "免費 AI 資源" }).first();
  await btn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const scrollBefore = await page.evaluate(() => Math.round(window.scrollY));
  await btn.click();
  await page.waitForTimeout(1200);
  const after = await page.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"]');
    const overlay = dlg?.parentElement;
    const r = dlg?.getBoundingClientRect();
    const o = overlay?.getBoundingClientRect();
    return {
      scrollY: Math.round(window.scrollY),
      dialog: r ? { top: Math.round(r.top), bottom: Math.round(r.bottom), h: Math.round(r.height) } : null,
      overlay: o ? { top: Math.round(o.top), h: Math.round(o.height) } : null,
      vh: window.innerHeight,
      visiblePart: r ? Math.max(0, Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0)) : 0,
      bodyOverflow: document.body.style.overflow,
    };
  });
  console.log(`\n=== ${label}（點擊前 scrollY=${scrollBefore}）===`);
  console.log(JSON.stringify(after, null, 2));
  console.log(`對話框可見高度: ${after.visiblePart}px / ${after.dialog?.h}px`);
  await page.screenshot({ path: `${OUT}/${file}.png` });
  await page.close();
}

await browser.close();
