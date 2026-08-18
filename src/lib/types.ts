/**
 * Modèle de données du générateur de CV.
 *
 * Règle d'or : ce fichier ne décrit que des *faits vérifiés*, saisis à la main
 * par Guilhem. Le moteur de sélection (`src/lib/select.ts`) a le droit de
 * choisir, ordonner et tronquer ces faits — jamais d'en produire de nouveaux.
 */

/** Mot-clé normalisé (minuscules, sans accent) servant au matching offre ↔ contenu. */
export type Tag = string;

export type BlockKind = "experience" | "project" | "education" | "skill" | "skillGroup";

/** Tout bloc adressable par son id, sélectionnable indépendamment. */
export interface BaseBlock {
  kind: BlockKind;
  /** Identifiant stable, utilisé dans les profils (`pin`, `drop`, `order`). */
  id: string;
  /** Mots-clés décrivant le bloc. Sert au score de pertinence. */
  tags: Tag[];
  /**
   * Poids de base 0→1 : importance intrinsèque quand l'offre ne matche rien.
   * Sert à garder un CV cohérent même face à une annonce hors-domaine.
   */
  weight?: number;
}

/** Une puce de description. Chaque puce est sélectionnable indépendamment. */
export interface Bullet {
  id: string;
  /** Texte intégral, verbatim. Jamais reformulé par la machine. */
  text: string;
  /**
   * Variante courte, écrite à la main. `verify` impose qu'elle n'introduise
   * aucun mot absent de `text` (donc aucune affirmation nouvelle).
   */
  short?: string;
  tags: Tag[];
  weight?: number;
}

export interface ExperienceBlock extends BaseBlock {
  kind: "experience";
  role: string;
  /** « Alternance », « Freelance », « CDI »… affiché en mono à côté du poste. */
  contract?: string;
  org: string;
  /** Nom complet de l'organisation, affiché entre parenthèses si la place le permet. */
  orgLong?: string;
  location: string;
  start: string;
  end: string;
  bullets: Bullet[];
  /** Toujours affiché, même score nul : évite les trous dans la chronologie. */
  pinned?: boolean;
}

export interface ProjectBlock extends BaseBlock {
  kind: "project";
  title: string;
  subtitle?: string;
  year: string;
  url?: string;
  bullets: Bullet[];
  pinned?: boolean;
}

export interface EducationBlock extends BaseBlock {
  kind: "education";
  degree: string;
  school: string;
  start: string;
  end: string;
  pinned?: boolean;
}

/** Une compétence atomique : la plus petite unité recomposable du CV. */
export interface SkillBlock extends BaseBlock {
  kind: "skill";
  label: string;
  /** id du groupe d'appartenance. */
  group: string;
}

/** Un groupe de compétences (colonne du bloc « compétences »). */
export interface SkillGroupBlock extends BaseBlock {
  kind: "skillGroup";
  title: string;
  skills: SkillBlock[];
}

export type ContentBlock =
  | ExperienceBlock
  | ProjectBlock
  | EducationBlock
  | SkillGroupBlock;

export interface ContactItem {
  id: string;
  label: string;
  href?: string;
  /** Groupe d'affichage : les items d'une même ligne sont séparés par un filet. */
  line: 1 | 2 | 3;
}

export interface Identity {
  name: string;
  /**
   * Liste blanche d'accroches. Le générateur ne peut en choisir *aucune autre*.
   * Ajouter une entrée ici est un acte humain, délibéré et vérifié.
   */
  headlines: string[];
  defaultHeadline: string;
  portrait?: { src: string; alt: string };
  portfolio?: { label: string; href: string };
  contacts: ContactItem[];
}

/* ------------------------------------------------------------------ */
/* Offre d'emploi                                                      */
/* ------------------------------------------------------------------ */

export interface OfferKeyword {
  term: Tag;
  /** 0→1. Un intitulé de poste pèse plus qu'un « nice to have ». */
  weight: number;
}

export interface CvProfile {
  /** Nom du fichier / segment d'URL : /cv/<slug> */
  slug: string;
  offer: {
    title: string;
    company: string;
    url?: string;
    location?: string;
    /** Notes de lecture de l'annonce. Jamais rendues sur le CV. */
    notes?: string;
  };
  /** Doit appartenir à `identity.headlines`. Sinon le rendu échoue. */
  headline?: string;
  keywords: OfferKeyword[];
  pin?: string[];
  drop?: string[];
  /** Force l'ordre de certains blocs ; le reste suit le score. */
  order?: string[];
  limits?: {
    experiences?: number;
    projects?: number;
    education?: number;
    skillGroups?: number;
    bulletsPerItem?: number;
    skillsPerGroup?: number;
  };
  /** Compacité du rendu, pour tenir sur une page. 0.9 → 1.1 */
  density?: number;
}

/* ------------------------------------------------------------------ */
/* Sortie du moteur de sélection                                       */
/* ------------------------------------------------------------------ */

export interface ScoredBullet extends Bullet {
  score: number;
  /** Texte finalement retenu (`short` si la densité l'exige, sinon `text`). */
  rendered: string;
}

export interface Scored<T> {
  block: T;
  score: number;
  /** Mots-clés de l'offre ayant matché : sert à expliquer la sélection. */
  matched: Tag[];
}

export interface CvModel {
  profile: CvProfile;
  identity: Identity;
  headline: string;
  skillGroups: Array<Scored<SkillGroupBlock> & { skills: SkillBlock[] }>;
  experiences: Array<Scored<ExperienceBlock> & { bullets: ScoredBullet[] }>;
  projects: Array<Scored<ProjectBlock> & { bullets: ScoredBullet[] }>;
  education: Array<Scored<EducationBlock>>;
  /** Journal de sélection, affiché dans le panneau de debug (jamais imprimé). */
  trace: Array<{ id: string; kept: boolean; score: number; matched: Tag[]; reason: string }>;
}
