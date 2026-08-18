import type { SkillGroupBlock } from "@/lib/types";

/** Chaque compétence est un bloc autonome, adressable par son id. */
export const uxDesign: SkillGroupBlock = {
  kind: "skillGroup",
  id: "skills.ux",
  title: "UX Design",
  weight: 0.9,
  tags: ["ux", "ux design", "recherche utilisateur", "user research", "design"],
  skills: [
    { kind: "skill", id: "skill.user-research", group: "skills.ux", label: "Recherche utilisateur (interviews, tests, questionnaires)", weight: 0.9,
      tags: ["recherche utilisateur", "user research", "interviews", "tests utilisateurs", "questionnaires", "ux"] },
    { kind: "skill", id: "skill.user-flows", group: "skills.ux", label: "User flows", weight: 0.7,
      tags: ["user flows", "parcours utilisateur", "ux"] },
    { kind: "skill", id: "skill.wireframing", group: "skills.ux", label: "Wireframing", weight: 0.8,
      tags: ["wireframing", "wireframe", "zoning", "ux"] },
    { kind: "skill", id: "skill.prototyping", group: "skills.ux", label: "Prototypage", weight: 0.8,
      tags: ["prototypage", "prototyping", "prototype", "figma", "ux"] },
    { kind: "skill", id: "skill.inclusive-design", group: "skills.ux", label: "Design inclusif", weight: 0.6,
      tags: ["design inclusif", "inclusive design", "accessibilite", "ux"] },
    { kind: "skill", id: "skill.a11y", group: "skills.ux", label: "Accessibilité (RGAA)", weight: 0.7,
      tags: ["accessibilite", "rgaa", "rgesn", "wcag", "a11y", "accessibility"] },
  ],
};
