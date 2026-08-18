import type { EducationBlock } from "@/lib/types";

/**
 * Menée en même temps que le Bachelor Communication (2021–2024).
 * Le chevauchement de dates se lit comme une coquille s'il n'est pas explicité :
 * le `tag` le transforme en ce qu'il est réellement — deux cursus en parallèle.
 */
export const licenceHistoire: EducationBlock = {
  kind: "education",
  id: "edu.licence",
  degree: "Licence Histoire",
  school: "Université Paris Nanterre",
  tag: "En parallèle du Bachelor",
  start: "2022",
  end: "2024",
  weight: 0.5,
  tags: ["licence", "histoire", "recherche", "culture", "patrimoine", "redaction", "double cursus"],
};
