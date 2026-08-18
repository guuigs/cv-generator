/** Outil de calage : imprime la position (en pt) des repères du CV. */
import { launch } from "./browser";
import { startServer } from "./dev-server";

const PT = 96 / 72;
const slug = process.argv[2] ?? "default";

async function main() {
const { url, stop } = await startServer();
const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: 1400, height: 1400 } })).newPage();
await page.goto(`${url}/cv/${slug}`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

const rows = await page.evaluate(() => {
  const root = document.querySelector(".cv-page") as HTMLElement;
  const base = root.getBoundingClientRect().top;
  const sel = [
    ["page", ".cv-page"],
    ["h1", ".cv-page h1"],
    ["headline", ".cv-page header p"],
    ["skills-grid", ".cv-page > div"],
    ["section-1", ".cv-page section:nth-of-type(1)"],
    ["section-2", ".cv-page section:nth-of-type(2)"],
    ["section-3", ".cv-page section:nth-of-type(3)"],
  ] as const;
  const out: Array<{ k: string; top: number; h: number }> = [];
  for (const [k, s] of sel) {
    const el = document.querySelector(s) as HTMLElement | null;
    if (!el) continue;
    const r = el.getBoundingClientRect();
    out.push({ k, top: r.top - base, h: r.height });
  }
  document.querySelectorAll(".cv-page .cv-entry").forEach((el, i) => {
    const r = (el as HTMLElement).getBoundingClientRect();
    out.push({ k: `entry-${i}`, top: r.top - base, h: r.height });
  });
  return out;
});

for (const r of rows) console.log(`${r.k.padEnd(14)} top=${(r.top / PT).toFixed(1).padStart(7)}pt  h=${(r.h / PT).toFixed(1).padStart(6)}pt`);

await browser.close();
  stop();
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
