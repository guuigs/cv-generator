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
import { PDFDocument } from "pdf-lib";
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

      // Repère indicatif, mesuré en écran (min-height) : utile pour le message
      // d'erreur, mais PAS le juge de paix — le rendu d'impression (.cv-page en
      // hauteur fixe, @media print) peut reflow différemment (largeur de ligne,
      // retour à la ligne d'une puce) et donner un nombre de pages différent de
      // ce que laissait croire la mesure DOM. Voir le contrôle après export.
      const height = await page.evaluate(() => {
        const el = document.querySelector(".cv-page");
        return el ? el.getBoundingClientRect().height : 0;
      });
      const excessPt = height / PT - A4_HEIGHT_PT;

      const pdf = path.join(outDir, `CV-Guilhem-Terrier-${slug}.pdf`);
      await page.pdf({ path: pdf, format: "A4", printBackground: true, preferCSSPageSize: true });

      // Seul juge de paix : le nombre de pages du PDF réellement produit.
      const pageCount = (await PDFDocument.load(fs.readFileSync(pdf))).getPageCount();
      if (pageCount > 1) {
        overflowed += 1;
        console.warn(
          `  ! ${slug} — ${pageCount} pages (repère écran : ${excessPt > 0 ? `+${excessPt.toFixed(0)}pt` : "page pleine"})`,
        );
      } else {
        console.log(`  ✓ ${path.relative(process.cwd(), pdf)}`);
      }

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
