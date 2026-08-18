import type { SkillGroupBlock } from "@/lib/types";

export const uiDesign: SkillGroupBlock = {
  kind: "skillGroup",
  id: "skills.ui",
  title: "UI Design & Design System",
  weight: 0.9,
  tags: ["ui", "ui design", "design system", "figma", "design"],
  skills: [
    { kind: "skill", id: "skill.figma", group: "skills.ui", label: "Figma (composants, variantes, librairies, prototypage)", weight: 1,
      tags: ["figma", "composants", "variantes", "librairies", "prototypage", "ui"] },
    { kind: "skill", id: "skill.brand-guidelines", group: "skills.ui", label: "Charte graphique", weight: 0.7,
      tags: ["charte graphique", "identite visuelle", "branding", "brand", "direction artistique"] },
    { kind: "skill", id: "skill.atomic-design", group: "skills.ui", label: "Atomic Design", weight: 0.7,
      tags: ["atomic design", "design system", "ui"] },
    { kind: "skill", id: "skill.component-docs", group: "skills.ui", label: "Documentation de composants", weight: 0.6,
      tags: ["documentation", "design system", "composants", "storybook"] },

    /* Prouvées par Wakey et Elapsio. */
    { kind: "skill", id: "skill.design-system-build", group: "skills.ui", label: "Conception d'un design system complet", weight: 0.55,
      tags: ["design system", "conception", "fondations", "tokens", "systeme"] },
    { kind: "skill", id: "skill.packaging", group: "skills.ui", label: "Packaging", weight: 0.4,
      tags: ["packaging", "print", "edition", "branding", "produit physique"] },
  ],
};
