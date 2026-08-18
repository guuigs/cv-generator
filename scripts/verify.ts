/**
 * Garde-fou anti-mensonge.
 *
 *   npm run verify              → contrôle
 *   npm run verify -- --approve → réenregistre l'empreinte du contenu
 *
 * Le principe : le CV généré ne peut contenir que des affirmations validées
 * à la main. Ce script vérifie mécaniquement les quatre façons dont une
 * contre-vérité pourrait se glisser dans le rendu.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { blocksById, library } from "../src/content";
import { listProfileSlugs, loadProfile } from "../src/lib/profiles";
import { selectCv } from "../src/lib/select";
import { normalize } from "../src/lib/normalize";

const LOCK = path.join(process.cwd(), "content.lock.json");

const errors: string[] = [];
const warnings: string[] = [];
const fail = (m: string) => errors.push(m);
const warn = (m: string) => warnings.push(m);

/* 1 — Les variantes courtes n'ajoutent aucune affirmation ------------------ */

function words(s: string): Set<string> {
  return new Set(
    normalize(s)
      .split(/[^a-z0-9%+.]+/)
      // « next.js » garde son point, « développeurs. » perd le sien.
      .map((w) => w.replace(/^\.+|\.+$/g, ""))
      .filter(Boolean),
  );
}

function checkShortVariants() {
  const bullets = [
    ...library.experiences.flatMap((e) => e.bullets.map((b) => [e.id, b] as const)),
    ...library.projects.flatMap((p) => p.bullets.map((b) => [p.id, b] as const)),
  ];
  for (const [owner, b] of bullets) {
    if (!b.short) continue;
    if (b.short.length >= b.text.length) {
      warn(`${owner} / ${b.id} : la variante "short" n'est pas plus courte que le texte complet.`);
    }
    const extra = [...words(b.short)].filter((w) => !words(b.text).has(w));
    if (extra.length) {
      fail(
        `${owner} / ${b.id} : la variante courte introduit des mots absents du texte validé — ` +
          `${extra.join(", ")}. Une version courte peut retirer, jamais ajouter.`,
      );
    }
  }
}

/* 2 — Les profils ne référencent que des blocs existants ------------------- */

function checkProfiles() {
  for (const slug of listProfileSlugs()) {
    let profile;
    try {
      profile = loadProfile(slug);
    } catch (err) {
      fail(err instanceof Error ? err.message : String(err));
      continue;
    }

    const bulletIds = new Set([
      ...library.experiences.flatMap((e) => e.bullets.map((b) => b.id)),
      ...library.projects.flatMap((p) => p.bullets.map((b) => b.id)),
    ]);
    for (const key of ["pin", "drop", "order"] as const) {
      for (const id of profile[key] ?? []) {
        if (!blocksById.has(id) && !bulletIds.has(id)) {
          fail(`profiles/${slug}.json : "${key}" référence un id inconnu — ${id}`);
        }
      }
    }

    // 3 — L'accroche appartient à la liste blanche (selectCv lève sinon).
    try {
      const model = selectCv(profile);
      checkRenderedStrings(slug, model);
    } catch (err) {
      fail(err instanceof Error ? err.message : String(err));
    }
  }
}

/* 3 — Toute chaîne rendue existe telle quelle dans le contenu validé ------- */

function allowedStrings(): Set<string> {
  const set = new Set<string>();
  const add = (s?: string) => { if (s) set.add(s); };
  const { identity } = library;
  add(identity.name);
  identity.headlines.forEach(add);
  identity.contacts.forEach((c) => add(c.label));
  add(identity.portfolio?.href);
  add(identity.portfolio?.label);
  library.skillGroups.forEach((g) => { add(g.title); g.skills.forEach((s) => add(s.label)); });
  library.experiences.forEach((e) => {
    [e.role, e.contract, e.org, e.orgLong, e.location, e.start, e.end].forEach(add);
    e.bullets.forEach((b) => { add(b.text); add(b.short); });
  });
  library.projects.forEach((p) => {
    [p.title, p.subtitle, p.year, p.url].forEach(add);
    p.bullets.forEach((b) => { add(b.text); add(b.short); });
  });
  library.education.forEach((e) => [e.degree, e.school, e.start, e.end].forEach(add));
  return set;
}

function checkRenderedStrings(slug: string, model: ReturnType<typeof selectCv>) {
  const allowed = allowedStrings();
  const seen: string[] = [model.headline];
  model.skillGroups.forEach((g) => { seen.push(g.block.title); g.skills.forEach((s) => seen.push(s.label)); });
  model.experiences.forEach((e) => { seen.push(e.block.role); e.bullets.forEach((b) => seen.push(b.rendered)); });
  model.projects.forEach((p) => { seen.push(p.block.title); p.bullets.forEach((b) => seen.push(b.rendered)); });
  model.education.forEach((e) => seen.push(e.block.degree));

  for (const s of seen) {
    if (!allowed.has(s)) {
      fail(`profiles/${slug}.json rend une chaîne absente du contenu validé : « ${s.slice(0, 80)}… »`);
    }
  }
}

/* 4 — Empreinte du contenu : un fait ne change pas en silence -------------- */

function digest(): Record<string, string> {
  const h = (v: unknown) => crypto.createHash("sha256").update(JSON.stringify(v)).digest("hex").slice(0, 16);
  const out: Record<string, string> = { identity: h(library.identity) };
  library.skillGroups.forEach((g) => { out[g.id] = h(g); });
  library.experiences.forEach((e) => { out[e.id] = h(e); });
  library.projects.forEach((p) => { out[p.id] = h(p); });
  library.education.forEach((e) => { out[e.id] = h(e); });
  return out;
}

function checkLock(approve: boolean) {
  const current = digest();
  if (approve || !fs.existsSync(LOCK)) {
    fs.writeFileSync(LOCK, `${JSON.stringify(current, null, 2)}\n`, "utf8");
    console.log(`  ✓ content.lock.json ${approve ? "réenregistré" : "créé"} (${Object.keys(current).length} faits)`);
    return;
  }
  const locked: Record<string, string> = JSON.parse(fs.readFileSync(LOCK, "utf8"));
  const changed = Object.keys(current).filter((k) => locked[k] && locked[k] !== current[k]);
  const added = Object.keys(current).filter((k) => !locked[k]);
  const removed = Object.keys(locked).filter((k) => !current[k]);
  if (changed.length || added.length || removed.length) {
    fail(
      "Le contenu a changé depuis la dernière validation humaine :\n" +
        [
          ...changed.map((k) => `      modifié : ${k}`),
          ...added.map((k) => `      ajouté  : ${k}`),
          ...removed.map((k) => `      retiré  : ${k}`),
        ].join("\n") +
        "\n    Relisez ces faits, puis validez-les : npm run verify -- --approve",
    );
  }
}

/* ------------------------------------------------------------------------ */

const approve = process.argv.includes("--approve");
console.log("\n  Vérification du contenu\n");
checkShortVariants();
checkProfiles();
checkLock(approve);

for (const w of warnings) console.warn(`  ⚠ ${w}`);
for (const e of errors) console.error(`  ✗ ${e}`);

if (errors.length) {
  console.error(`\n  ${errors.length} problème(s). Le CV ne doit pas être envoyé en l'état.\n`);
  process.exit(1);
}
console.log(`\n  ✓ ${listProfileSlugs().length} profil(s) vérifié(s), aucune affirmation non validée.\n`);
