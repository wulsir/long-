import { useEffect } from "react";

/**
 * 秋日氛圍面板（小貓巡場、古典音樂含蕭邦〈離別〉、楓葉飄落）。
 * 實際邏輯在 public/fx-addon.js，掛載完成後才載入，避免干擾 hydration。
 */
export function FxAddon() {
  useEffect(() => {
    if (document.getElementById("fx-addon-script")) return;
    const script = document.createElement("script");
    script.id = "fx-addon-script";
    script.src = "/fx-addon.js";
    script.defer = true;
    document.body.appendChild(script);
  }, []);
  return null;
}
