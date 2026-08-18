/**
 * Registre de contenu — le seul endroit où l'on assemble les blocs.
 * Ajouter une expérience / un projet / une compétence = créer un fichier
 * dans `src/content/**` puis l'enregistrer ici. Rien d'autre à toucher.
 */
import type {
  EducationBlock, ExperienceBlock, ProjectBlock, SkillBlock, SkillGroupBlock,
} from "@/lib/types";

import { identity } from "./identity";

import { uxDesign } from "./skills/ux-design";
import { uiDesign } from "./skills/ui-design";
import { frontend } from "./skills/frontend";
import { methods } from "./skills/methods";

import { inrap } from "./experience/inrap";
import { elapsio } from "./experience/elapsio";
import { c2rmf } from "./experience/c2rmf";

import { thebookclub } from "./projects/thebookclub";
import { wakey } from "./projects/wakey";

import { masterDesign } from "./education/master-design";
import { bachelorCom } from "./education/bachelor-com";
import { licenceHistoire } from "./education/licence-histoire";

/** Ordre par défaut = ordre du CV « maître », avant toute personnalisation. */
export const skillGroups: SkillGroupBlock[] = [uxDesign, uiDesign, frontend, methods];
export const experiences: ExperienceBlock[] = [inrap, elapsio, c2rmf];
export const projects: ProjectBlock[] = [thebookclub, wakey];
export const education: EducationBlock[] = [masterDesign, bachelorCom, licenceHistoire];

export const skills: SkillBlock[] = skillGroups.flatMap((g) => g.skills);

export const library = { identity, skillGroups, experiences, projects, education, skills };

export type Library = typeof library;

/** Index id → bloc, pour valider les `pin` / `drop` / `order` des profils. */
export const blocksById = new Map<string, { id: string; kind: string }>([
  ...skillGroups.map((b) => [b.id, b] as const),
  ...skills.map((b) => [b.id, b] as const),
  ...experiences.map((b) => [b.id, b] as const),
  ...projects.map((b) => [b.id, b] as const),
  ...education.map((b) => [b.id, b] as const),
]);

export { identity };
