import fs from "node:fs";
import { chromium, type Browser } from "playwright-core";

/**
 * Chromium local. On tente d'abord la résolution Playwright standard,
 * puis les emplacements connus des images CI.
 */
const CANDIDATES = [
  process.env.CHROMIUM_PATH,
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  "/opt/pw-browsers/chromium/chrome-linux/chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/usr/bin/google-chrome",
].filter(Boolean) as string[];

export async function launch(): Promise<Browser> {
  const args = ["--no-sandbox", "--font-render-hinting=none"];
  try {
    return await chromium.launch({ args });
  } catch {
    const exe = CANDIDATES.find((p) => fs.existsSync(p));
    if (!exe) {
      throw new Error(
        "Chromium introuvable. Installez-le (`npx playwright install chromium`) " +
          "ou renseignez CHROMIUM_PATH.",
      );
    }
    return chromium.launch({ executablePath: exe, args });
  }
}
