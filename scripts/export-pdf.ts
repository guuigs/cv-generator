/**
 * Export PDF « print-perfect ».
 *
 * Usage :
 *   npm run pdf                    → tous les profils
 *   npm run pdf -- default         → un profil
 *   npm run pdf -- --png           → export PNG en plus (relecture visuelle)
 */
import fs from "node:fs";
import path from "node:path";
import { launch } from "./browser";
import { startServer } from "./dev-server";
import { listProfileSlugs } from "../src/lib/profiles";

const A4_HEIGHT_PT = 841.89;
const PT = 96 / 72;

async function main() {
  const args = process.argv.slice(2);
  const png = args.includes("--png");
  const slugs = args.filter((a) => !a.startsWith("--"));
  const targets = slugs.length ? slugs : listProfileSlugs();
  if (!targets.length) {
    console.error("[cv] Aucun profil à exporter.");
    process.exit(1);
  }

  const outDir = path.join(process.cwd(), "export");
  fs.mkdirSync(outDir, { recursive: true });

  const { url, stop } = await startServer();
  const browser = await launch();
  let overflowed = 0;

  try {
    const ctx = await browser.newContext({ viewport: { width: 1400, height: 1200 } });
    const page = await ctx.newPage();

    for (const slug of targets) {
      const res = await page.goto(`${url}/cv/${slug}`, { waitUntil: "networkidle" });
      if (!res || res.status() >= 400) {
        console.error(`  ✗ ${slug} — page indisponible (${res?.status()})`);
        continue;
      }
      await page.evaluate(() => document.fonts.ready);

      // Contrôle de débordement avant export : un CV sur 2 pages est un bug.
      const height = await page.evaluate(() => {
        const el = document.querySelector(".cv-page");
        return el ? el.getBoundingClientRect().height : 0;
      });
      const excessPt = height / PT - A4_HEIGHT_PT;
      if (excessPt > 1) {
        overflowed += 1;
        console.warn(`  ! ${slug} — débordement de ${excessPt.toFixed(0)}pt (≈ ${(excessPt / A4_HEIGHT_PT * 100).toFixed(0)} % de page)`);
      }

      const pdf = path.join(outDir, `CV-Guilhem-Terrier-${slug}.pdf`);
      await page.pdf({ path: pdf, format: "A4", printBackground: true, preferCSSPageSize: true });
      console.log(`  ✓ ${path.relative(process.cwd(), pdf)}`);

      if (png) {
        const el = await page.$(".cv-page");
        const shot = path.join(outDir, `CV-Guilhem-Terrier-${slug}.png`);
        await el?.screenshot({ path: shot, scale: "device" });
        console.log(`  ✓ ${path.relative(process.cwd(), shot)}`);
      }
    }
  } finally {
    await browser.close();
    stop();
  }

  if (overflowed) {
    console.error(`\n[cv] ${overflowed} CV déborde(nt) d'une page. Ajustez density / limits dans le profil.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
