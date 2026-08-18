/**
 * Transforme une annonce en profil de CV.
 *
 *   npm run tailor -- --url "https://..." --slug studio-x
 *   npm run tailor -- --file annonce.txt --slug studio-x --title "UI Designer" --company "Studio X"
 *   pbpaste | npm run tailor -- --stdin --slug studio-x
 *
 * Le script ne réécrit jamais le CV : il produit un fichier `profiles/<slug>.json`
 * qui dit *quoi montrer*. Le contenu, lui, reste celui validé dans src/content.
 */
import fs from "node:fs";
import path from "node:path";
import { analyzeOffer, extractText } from "../src/lib/offer";

interface Args { url?: string; file?: string; stdin?: boolean; slug?: string; title?: string; company?: string; force?: boolean }

function parseArgs(argv: string[]): Args {
  const out: Args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    const next = () => argv[(i += 1)];
    if (a === "--url") out.url = next();
    else if (a === "--file") out.file = next();
    else if (a === "--slug") out.slug = next();
    else if (a === "--title") out.title = next();
    else if (a === "--company") out.company = next();
    else if (a === "--stdin") out.stdin = true;
    else if (a === "--force") out.force = true;
  }
  return out;
}

function slugify(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "offre";
}

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const c of process.stdin) chunks.push(Buffer.from(c));
  return Buffer.concat(chunks).toString("utf8");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let html = "";
  let source = "";

  if (args.url) {
    source = args.url;
    const res = await fetch(args.url, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; cv-generator/1.0)" },
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) {
      throw new Error(
        `[cv] ${res.status} sur ${args.url}. Beaucoup de sites d'emploi bloquent les robots :\n` +
          `      copiez le texte de l'annonce dans un fichier puis relancez avec --file annonce.txt`,
      );
    }
    html = await res.text();
  } else if (args.file) {
    source = args.file;
    html = fs.readFileSync(args.file, "utf8");
  } else if (args.stdin) {
    source = "stdin";
    html = await readStdin();
  } else {
    console.error("[cv] Indiquez --url, --file ou --stdin.");
    process.exit(1);
  }

  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(html);
  const { title, text } = looksLikeHtml ? extractText(html) : { title: "", text: html };
  if (text.trim().length < 200) {
    console.warn("[cv] Attention : moins de 200 caractères extraits. Le ciblage sera approximatif.");
  }

  const offerTitle = args.title ?? title ?? "";
  const slug = args.slug ?? slugify([args.company, offerTitle].filter(Boolean).join("-"));
  const file = path.join(process.cwd(), "profiles", `${slug}.json`);
  if (fs.existsSync(file) && !args.force) {
    throw new Error(`[cv] profiles/${slug}.json existe déjà. Ajoutez --force pour l'écraser.`);
  }

  const { keywords, gaps } = analyzeOffer({ title: offerTitle, text });

  const profile = {
    slug,
    offer: {
      title: offerTitle || "(à compléter)",
      company: args.company ?? "(à compléter)",
      ...(args.url ? { url: args.url } : {}),
      notes:
        `Analyse automatique de ${source}.\n` +
        `Relisez les mots-clés : ils décident de ce que le CV met en avant.\n` +
        (gaps.length
          ? `Demandé par l'annonce, absent du CV : ${gaps.map((g) => g.term).join(", ")}.`
          : "Aucun terme fréquent hors périmètre détecté."),
    },
    keywords,
    limits: { experiences: 3, projects: 2, education: 3, skillGroups: 4, bulletsPerItem: 3, skillsPerGroup: 7 },
    density: 1,
  };

  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(profile, null, 2)}\n`, "utf8");

  console.log(`\n  profil      profiles/${slug}.json`);
  console.log(`  mots-clés   ${keywords.length} retenus`);
  console.log(`              ${keywords.slice(0, 12).map((k) => k.term).join(", ")}${keywords.length > 12 ? "…" : ""}`);
  if (gaps.length) {
    console.log(`\n  ⚠ Demandé par l'annonce, absent du CV :`);
    console.log(`    ${gaps.map((g) => `${g.term}${g.proper ? " [outil]" : ` (${g.count}×)`}`).join(", ")}`);
    console.log(`    Ces manques ne seront PAS comblés automatiquement. À vous de voir :`);
    console.log(`    les acquérir, les mentionner en lettre de motivation, ou passer votre tour.`);
  }
  console.log(`\n  → npm run dev   puis  /cv/${slug}`);
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
