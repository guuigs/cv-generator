import type {
  Bullet, CvModel, CvProfile, EducationBlock, ExperienceBlock, Identity,
  OfferKeyword, ProjectBlock, ScoredBullet, Scored, SkillBlock, SkillGroupBlock, Tag,
} from "./types";
import { normalize } from "./normalize";
import { library } from "@/content";

/* ------------------------------------------------------------------ */
/* Scoring                                                             */
/* ------------------------------------------------------------------ */

/** Poids d'un match sur un tag explicite vs. un match dans le texte libre. */
const TAG_MATCH = 1;
const TEXT_MATCH = 0.4;
/** Part du score qui vient de l'importance intrinsèque du bloc. */
const BASELINE = 0.8;

interface Scorable {
  tags: Tag[];
  weight?: number;
  /** Texte libre du bloc, utilisé en repli quand aucun tag ne matche. */
  text?: string;
}

function scoreOf(item: Scorable, keywords: OfferKeyword[]): { score: number; matched: Tag[] } {
  const tags = item.tags.map(normalize);
  const text = normalize(item.text ?? "");
  const matched: Tag[] = [];
  let score = 0;

  for (const kw of keywords) {
    const term = normalize(kw.term);
    if (!term) continue;
    const onTag = tags.some((t) => t === term || t.includes(term) || term.includes(t));
    if (onTag) {
      score += kw.weight * TAG_MATCH;
      matched.push(kw.term);
      continue;
    }
    if (text && text.includes(term)) {
      score += kw.weight * TEXT_MATCH;
      matched.push(kw.term);
    }
  }

  score += (item.weight ?? 0.5) * BASELINE;
  return { score, matched };
}

const bulletText = (b: Bullet) => b.text;
const expText = (e: ExperienceBlock) =>
  [e.role, e.contract, e.org, e.orgLong, e.location, ...e.bullets.map(bulletText)].filter(Boolean).join(" ");
const projText = (p: ProjectBlock) =>
  [p.title, p.subtitle, ...p.bullets.map(bulletText)].filter(Boolean).join(" ");
const eduText = (e: EducationBlock) => [e.degree, e.school].join(" ");
const groupText = (g: SkillGroupBlock) => [g.title, ...g.skills.map((s) => s.label)].join(" ");

/* ------------------------------------------------------------------ */
/* Sélection                                                           */
/* ------------------------------------------------------------------ */

const DEFAULT_LIMITS = {
  experiences: 3,
  projects: 2,
  education: 3,
  skillGroups: 4,
  bulletsPerItem: 3,
  skillsPerGroup: 7,
} as const;

/**
 * Planchers non négociables, quel que soit le profil.
 *
 * Consigne de Guilhem : l'inventaire d'expériences, de formations et de
 * groupes de compétences ne se réduit jamais pour cibler une offre — seul
 * le contenu *à l'intérieur* (puces d'expérience, compétences d'un groupe)
 * varie. Les projets ont un plancher (minimum 2), pas un carcan : si la
 * bibliothèque en accueille un jour un troisième, le moteur pourra choisir
 * les deux meilleurs plutôt que d'être forcé d'en montrer trois.
 *
 * Appliqués dans `selectCv`, jamais contournables par `profiles/*.json`
 * (ni un `limits` trop bas, ni un `drop` sur l'un de ces id) : un profil
 * ne peut vouloir moins que ça, seulement un moteur mal écrit pourrait le
 * permettre par erreur — ces constantes rendent cette erreur impossible.
 */
const MIN_KEEP = {
  experiences: 3,
  projects: 2,
  education: 3,
  skillGroups: 4,
} as const;

/**
 * Sélectionne, ordonne et tronque le contenu en fonction de l'offre.
 *
 * Invariant : la fonction ne produit **aucun texte**. Elle ne fait que choisir
 * parmi les chaînes déjà présentes dans `src/content/**`. Toute affirmation du
 * CV généré existe donc telle quelle dans le contenu validé à la main.
 */
export function selectCv(profile: CvProfile, identity: Identity = library.identity): CvModel {
  const kws = profile.keywords ?? [];
  const pin = new Set(profile.pin ?? []);
  const drop = new Set(profile.drop ?? []);
  const limits = { ...DEFAULT_LIMITS, ...(profile.limits ?? {}) };
  const trace: CvModel["trace"] = [];

  const headline = resolveHeadline(profile, identity);

  /**
   * Trie par score, garde les meilleurs, puis restaure l'ordre d'origine.
   *
   * `minKeep`, quand fourni, protège la catégorie entière : le plancher
   * l'emporte sur un `limits` trop bas, et un `drop` visant l'un de ces id
   * est ignoré (tracé, mais sans effet) plutôt que silencieusement appliqué.
   */
  function pick<T extends { id: string; pinned?: boolean }>(
    all: T[],
    n: number,
    score: (b: T) => { score: number; matched: Tag[] },
    label: string,
    minKeep = 0,
  ): Array<Scored<T>> {
    const protectedIds = minKeep > 0 ? new Set(all.map((b) => b.id)) : new Set<string>();
    const effectiveN = Math.max(n, minKeep);

    const scored = all
      .filter((b) => protectedIds.has(b.id) || !drop.has(b.id))
      .map((b, index) => {
        const s = score(b);
        const forced = pin.has(b.id) || b.pinned === true;
        return { block: b, index, forced, score: forced ? s.score + 100 : s.score, matched: s.matched };
      });

    const keep = new Set(
      [...scored].sort((a, b) => b.score - a.score).slice(0, effectiveN).map((s) => s.block.id),
    );

    for (const s of scored) {
      const droppedButProtected = drop.has(s.block.id) && protectedIds.has(s.block.id);
      trace.push({
        id: s.block.id,
        kept: keep.has(s.block.id),
        score: Math.round(s.score * 100) / 100,
        matched: s.matched,
        reason: droppedButProtected
          ? "drop ignoré : plancher non négociable"
          : s.forced
            ? "épinglé"
            : keep.has(s.block.id)
              ? `retenu (top ${effectiveN} ${label})`
              : `écarté (hors top ${effectiveN} ${label})`,
      });
    }
    for (const id of drop) {
      if (all.some((b) => b.id === id)) continue;
      trace.push({ id, kept: false, score: 0, matched: [], reason: "drop sur un id inconnu" });
    }

    return scored
      .filter((s) => keep.has(s.block.id))
      .sort((a, b) => a.index - b.index)
      .map(({ block, score, matched }) => ({ block, score, matched }));
  }

  function pickBullets(bullets: Bullet[], useShort: boolean): ScoredBullet[] {
    const scored = bullets
      .filter((b) => !drop.has(b.id))
      .map((b, index) => ({
        b,
        index,
        ...scoreOf({ tags: b.tags, weight: b.weight, text: b.text }, kws),
      }));
    const keep = new Set(
      [...scored].sort((a, b) => b.score - a.score).slice(0, limits.bulletsPerItem).map((s) => s.b.id),
    );
    return scored
      .filter((s) => keep.has(s.b.id))
      .sort((a, b) => a.index - b.index)
      .map(({ b, score }) => ({ ...b, score, rendered: useShort && b.short ? b.short : b.text }));
  }

  const useShort = (profile.density ?? 1) < 1;

  const experiences = pick(
    library.experiences,
    limits.experiences,
    (e) => scoreOf({ tags: e.tags, weight: e.weight, text: expText(e) }, kws),
    "expériences",
    MIN_KEEP.experiences,
  ).map((s) => ({ ...s, bullets: pickBullets(s.block.bullets, useShort) }));

  const projects = pick(
    library.projects,
    limits.projects,
    (p) => scoreOf({ tags: p.tags, weight: p.weight, text: projText(p) }, kws),
    "projets",
    MIN_KEEP.projects,
  ).map((s) => ({ ...s, bullets: pickBullets(s.block.bullets, useShort) }));

  const educationSel = pick(
    library.education,
    limits.education,
    (e) => scoreOf({ tags: e.tags, weight: e.weight, text: eduText(e) }, kws),
    "formations",
    MIN_KEEP.education,
  );

  const skillGroups = pick(
    library.skillGroups,
    limits.skillGroups,
    (g) => scoreOf({ tags: g.tags, weight: g.weight, text: groupText(g) }, kws),
    "groupes de compétences",
    MIN_KEEP.skillGroups,
  ).map((s) => ({ ...s, skills: pickSkills(s.block, kws, drop, limits.skillsPerGroup, pin) }));

  return {
    profile, identity, headline,
    skillGroups, experiences, projects,
    education: educationSel,
    trace: applyOrder(trace, profile.order),
  };
}

function pickSkills(
  group: SkillGroupBlock, kws: OfferKeyword[], drop: Set<string>, n: number, pin: Set<string>,
): SkillBlock[] {
  const scored = group.skills
    .filter((s) => !drop.has(s.id))
    .map((s, index) => ({
      s, index,
      score: scoreOf({ tags: s.tags, weight: s.weight, text: s.label }, kws).score + (pin.has(s.id) ? 100 : 0),
    }));
  const keep = new Set([...scored].sort((a, b) => b.score - a.score).slice(0, n).map((x) => x.s.id));
  return scored.filter((x) => keep.has(x.s.id)).sort((a, b) => a.index - b.index).map((x) => x.s);
}

function applyOrder(trace: CvModel["trace"], order?: string[]): CvModel["trace"] {
  if (!order?.length) return trace;
  const rank = new Map(order.map((id, i) => [id, i]));
  return [...trace].sort((a, b) => (rank.get(a.id) ?? 999) - (rank.get(b.id) ?? 999));
}

/**
 * L'accroche doit appartenir à la liste blanche `identity.headlines`.
 * Sans cette barrière, une personnalisation « un peu trop enthousiaste »
 * pourrait faire dire au CV ce qu'il ne doit pas dire.
 */
export function resolveHeadline(profile: CvProfile, identity: Identity): string {
  if (!profile.headline) return identity.defaultHeadline;
  if (!identity.headlines.includes(profile.headline)) {
    throw new Error(
      `[cv] Accroche non validée pour « ${profile.slug} » : "${profile.headline}".\n` +
        `Les accroches autorisées sont définies dans src/content/identity.ts :\n` +
        identity.headlines.map((h) => `  - ${h}`).join("\n") +
        `\nAjoutez-la explicitement si elle est exacte — le générateur n'a pas le droit d'en inventer.`,
    );
  }
  return profile.headline;
}
