/**
 * Export du dossier de compétences (document interne, multi-pages).
 *
 * Contrairement au CV, ce document n'a pas de contrainte de page unique —
 * les marges et la pagination viennent de Playwright plutôt que d'un
 * conteneur A4 fixe, pour que le texte flotte naturellement sur autant de
 * pages que nécessaire.
 *
 *   npm run dossier
 */
import fs from "node:fs";
import path from "node:path";
import { launch } from "./browser";
import { startServer } from "./dev-server";

async function main() {
  const outDir = path.join(process.cwd(), "export");
  fs.mkdirSync(outDir, { recursive: true });

  const { url, stop } = await startServer();
  const browser = await launch();

  try {
    const ctx = await browser.newContext({ viewport: { width: 900, height: 1200 } });
    const page = await ctx.newPage();

    const res = await page.goto(`${url}/dossier`, { waitUntil: "networkidle" });
    if (!res || res.status() >= 400) {
      throw new Error(`[dossier] page indisponible (${res?.status()})`);
    }
    await page.evaluate(() => document.fonts.ready);

    const out = path.join(outDir, "Dossier-Guilhem-Terrier.pdf");
    await page.pdf({
      path: out,
      format: "A4",
      printBackground: true,
      // Playwright n'accepte que px/in/cm/mm sur `margin`, jamais pt.
      margin: { top: "0.611in", bottom: "0.556in", left: "0.667in", right: "0.667in" },
      displayHeaderFooter: true,
      headerTemplate: `<div></div>`,
      footerTemplate: `
        <div style="width:100%; font-family: 'DepartureMono', ui-monospace, monospace; font-size: 6.5pt; color: #8a8478; padding: 0 48pt; display: flex; justify-content: space-between;">
          <span>Dossier de compétences — Guilhem Terrier · document interne, jamais envoyé tel quel</span>
          <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
        </div>`,
    });
    console.log(`  ✓ ${path.relative(process.cwd(), out)}`);
  } finally {
    await browser.close();
    stop();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
