/**
 * Exporte le CV sélectionné en JSON, pour que les planches de `design/`
 * se construisent depuis le vrai contenu et ne puissent pas dériver.
 *
 *   npm run dump-model            → design/model.json (profil « default »)
 *   npm run dump-model -- ciblé   → même chose pour un autre profil
 */
import fs from "node:fs";
import path from "node:path";
import { loadProfile } from "../src/lib/profiles";
import { selectCv } from "../src/lib/select";

const slug = process.argv.slice(2).find((a) => !a.startsWith("--")) ?? "default";
const m = selectCv(loadProfile(slug));

const model = {
  slug,
  identity: {
    name: m.identity.name,
    portfolio: m.identity.portfolio,
    contacts: ([1, 2, 3] as const)
      .map((n) => m.identity.contacts.filter((c) => c.line === n).map((c) => c.label))
      .filter((l) => l.length > 0),
  },
  headline: m.headline,
  skillGroups: m.skillGroups.map((g) => ({ title: g.block.title, skills: g.skills.map((s) => s.label) })),
  experiences: m.experiences.map((e) => ({
    role: e.block.role,
    contract: e.block.contract ?? null,
    org: [e.block.orgLong ? `${e.block.org} (${e.block.orgLong})` : e.block.org, e.block.location]
      .filter(Boolean).join(" · "),
    dates: e.block.end && e.block.end !== e.block.start ? `${e.block.start} – ${e.block.end}` : e.block.start,
    bullets: e.bullets.map((b) => b.rendered),
  })),
  projects: m.projects.map((p) => ({
    title: p.block.title,
    subtitle: p.block.subtitle ?? null,
    dates: p.block.year,
    bullets: p.bullets.map((b) => b.rendered),
  })),
  education: m.education.map((e) => ({
    degree: e.block.degree,
    school: e.block.school,
    tag: e.block.tag ?? null,
    dates: e.block.end && e.block.end !== e.block.start ? `${e.block.start} – ${e.block.end}` : e.block.start,
  })),
};

const out = path.join(process.cwd(), "design", "model.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, `${JSON.stringify(model, null, 2)}\n`, "utf8");
console.log(`  design/model.json — ${model.skillGroups.length} groupes, ${model.experiences.length} expériences, ${model.projects.length} projets, ${model.education.length} formations`);
