import type { SkillGroupBlock } from "@/lib/types";

export const methods: SkillGroupBlock = {
  kind: "skillGroup",
  id: "skills.methods",
  title: "Méthodologies & outils",
  weight: 0.7,
  tags: ["methodologie", "outils", "process", "atelier", "agile"],
  skills: [
    { kind: "skill", id: "skill.workshops", group: "skills.methods", label: "Ateliers de co-conception", weight: 0.8,
      tags: ["atelier", "workshop", "co-conception", "facilitation", "collaboration"] },
    { kind: "skill", id: "skill.analytics", group: "skills.methods", label: "Analyse d'usages (analytics)", weight: 0.8,
      tags: ["analytics", "data", "mesure", "kpi", "analyse d'usages"] },
    { kind: "skill", id: "skill.claude-code", group: "skills.methods", label: "Claude Code", weight: 0.6,
      tags: ["claude code", "ia", "intelligence artificielle", "llm", "agents"] },
    { kind: "skill", id: "skill.figma-tool", group: "skills.methods", label: "Figma", weight: 0.8,
      tags: ["figma", "outils"] },
    { kind: "skill", id: "skill.supabase-tool", group: "skills.methods", label: "Supabase", weight: 0.5,
      tags: ["supabase", "outils", "backend"] },

    /* Prouvées par le C2RMF et Wakey. */
    { kind: "skill", id: "skill.seo", group: "skills.methods", label: "Référencement (SEO)", weight: 0.5,
      tags: ["seo", "referencement", "recherche", "visibilite", "trafic"] },
    { kind: "skill", id: "skill.cms", group: "skills.methods", label: "CMS (Drupal)", weight: 0.45,
      tags: ["cms", "drupal", "wordpress", "back-office", "gestion de contenu"] },
    { kind: "skill", id: "skill.editorial-process", group: "skills.methods", label: "Refonte de processus éditoriaux", weight: 0.4,
      tags: ["process", "editorial", "publication", "gouvernance", "organisation"] },
    { kind: "skill", id: "skill.llm-product", group: "skills.methods", label: "Conception de produit à base de LLM", weight: 0.5,
      tags: ["llm", "ia", "intelligence artificielle", "ai", "generatif", "produit"] },
  ],
};
