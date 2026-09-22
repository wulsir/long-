from pathlib import Path
from playwright.sync_api import sync_playwright

html = """<!doctype html>
<meta charset="utf-8">
<style>
html,body{margin:0;background:#e8e4dc}
.row{display:flex;gap:24px;align-items:flex-end;padding:20px}
.cell{display:flex;flex-direction:column;align-items:center;gap:6px;font:12px sans-serif;color:#1a1916}
</style>
<div class="row">
  <div class="cell"><img src="../favicon-staged.svg" width="16" height="16"><span>16</span></div>
  <div class="cell"><img src="../favicon-staged.svg" width="32" height="32"><span>32</span></div>
  <div class="cell"><img src="../favicon-staged.svg" width="64" height="64"><span>64</span></div>
  <div class="cell"><canvas id="c" width="128" height="128"></canvas><span>16 nearest x8</span></div>
</div>
<script>
const img = new Image();
img.onload = () => {
  const c = document.getElementById("c");
  const ctx = c.getContext("2d");
  const c2 = document.createElement("canvas");
  c2.width = 16;
  c2.height = 16;
  const ctx2 = c2.getContext("2d");
  ctx2.drawImage(img, 0, 0, 16, 16);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(c2, 0, 0, 128, 128);
};
img.src = "../favicon-staged.svg";
</script>
"""
Path("/workspace/.grok/favicon-preview/preview.html").write_text(html)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 700, "height": 240})
    page.goto("file:///workspace/.grok/favicon-preview/preview.html")
    page.wait_for_timeout(400)
    page.screenshot(path="/workspace/.grok/favicon-preview/svg-raster.png")
    browser.close()
print("ok")
