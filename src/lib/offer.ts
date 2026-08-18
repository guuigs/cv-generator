import * as cheerio from "cheerio";
import type { OfferKeyword } from "./types";
import { normalize, tokenize } from "./normalize";
import { library } from "@/content";

/** Vocabulaire connu du CV : tous les tags déclarés dans `src/content/**`. */
export function vocabulary(): string[] {
  const out = new Set<string>();
  const add = (tags: string[]) => tags.forEach((t) => out.add(normalize(t)));
  library.skillGroups.forEach((g) => { add(g.tags); g.skills.forEach((s) => add(s.tags)); });
  library.experiences.forEach((e) => { add(e.tags); e.bullets.forEach((b) => add(b.tags)); });
  library.projects.forEach((p) => { add(p.tags); p.bullets.forEach((b) => add(b.tags)); });
  library.education.forEach((e) => add(e.tags));
  return [...out].sort();
}

/** Tout le texte visible du CV : sert à repérer ce que l'annonce demande en plus. */
function corpus(): string[] {
  const out: string[] = [library.identity.name, ...library.identity.headlines];
  library.skillGroups.forEach((g) => { out.push(g.title); g.skills.forEach((s) => out.push(s.label)); });
  library.experiences.forEach((e) => {
    out.push(e.role, e.org, e.orgLong ?? "", e.location);
    e.bullets.forEach((b) => out.push(b.text));
  });
  library.projects.forEach((p) => {
    out.push(p.title, p.subtitle ?? "");
    p.bullets.forEach((b) => out.push(b.text));
  });
  library.education.forEach((e) => out.push(e.degree, e.school));
  return out;
}

/** Extrait le texte utile d'une page d'annonce (retire nav, script, footer…). */
export function extractText(html: string): { title: string; text: string } {
  const $ = cheerio.load(html);
  $("script, style, noscript, svg, nav, header, footer, form").remove();
  const title = ($("h1").first().text() || $("title").first().text() || "").trim();
  const main = $("main").text() || $("article").text() || $("body").text();
  const text = main.replace(/\s+/g, " ").trim();
  return { title, text };
}

export interface OfferAnalysis {
  keywords: OfferKeyword[];
  /** Ce que l'annonce demande et que le CV ne dit nulle part. */
  gaps: Array<{ term: string; count: number; proper: boolean }>;
}

/**
 * Mots capitalisés en milieu de phrase : dans une annonce, ce sont presque
 * toujours des outils ou des technologies (Figma, Storybook, Framer Motion).
 * C'est le signal le plus fiable pour repérer un prérequis technique.
 */
function properNouns(text: string): Set<string> {
  const out = new Set<string>();
  let startOfSentence = true;
  for (const raw of text.split(/\s+/)) {
    const token = raw.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}+#.]+$/gu, "");
    if (token.length >= 3 && !startOfSentence && /^\p{Lu}/u.test(token) && !/^\p{Lu}+$/u.test(token)) {
      out.add(normalize(token));
    }
    startOfSentence = /[.!?:;)]$/.test(raw) || /^[-•*]$/.test(raw);
  }
  return out;
}

/**
 * Croise l'annonce avec le vocabulaire du CV.
 *
 * On ne retient comme mot-clé que ce qui existe déjà côté contenu : le moteur
 * ne peut donc pas « faire apparaître » une compétence que l'annonce demande
 * mais que Guilhem n'a pas. Ces manques sont remontés séparément dans `gaps`,
 * pour être traités par un humain (les acquérir, ou les assumer).
 */
export function analyzeOffer(input: { title?: string; text: string }): OfferAnalysis {
  const title = normalize(input.title ?? "");
  const body = normalize(input.text);
  const vocab = vocabulary();

  const keywords: OfferKeyword[] = [];
  for (const term of vocab) {
    // Sous 3 caractères, un tag matche trop de choses (« ia » dans « médiation »).
    if (term.length < 3) continue;
    const inTitle = countOccurrences(title, term) > 0;
    const count = countOccurrences(body, term);
    if (!inTitle && count === 0) continue;
    const weight = inTitle ? 1 : count >= 3 ? 0.9 : count === 2 ? 0.75 : 0.55;
    keywords.push({ term, weight });
  }
  keywords.sort((a, b) => b.weight - a.weight || a.term.localeCompare(b.term));

  // Un « manque » est un terme absent de *tout* le CV, pas seulement des tags.
  const known = new Set([...vocab, ...corpus()].flatMap((t) => tokenize(t)));
  const freq = new Map<string, number>();
  for (const w of tokenize(input.text)) {
    if (known.has(w) || w.length < 4) continue;
    freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  const proper = properNouns(input.text);
  const gaps = [...freq.entries()]
    .map(([term, count]) => ({ term, count, proper: proper.has(term) }))
    // On ne retient que ce qui ressemble à un prérequis : un outil nommé,
    // ou un terme assez répété pour être structurant.
    .filter((g) => g.proper || g.count >= 2)
    .sort((a, b) => Number(b.proper) - Number(a.proper) || b.count - a.count || a.term.localeCompare(b.term))
    .slice(0, 15);

  return { keywords, gaps };
}

/** Compte les occurrences sur des frontières de mots : « ui » ne matche pas « build ». */
function countOccurrences(haystack: string, needle: string): number {
  if (!needle || !haystack) return 0;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(?<![a-z0-9])${escaped}(?![a-z0-9])`, "g");
  return (haystack.match(re) ?? []).length;
}
