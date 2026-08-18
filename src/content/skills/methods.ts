import type { SkillGroupBlock } from "@/lib/types";

export const methods: SkillGroupBlock = {
  kind: "skillGroup",
  id: "skills.methods",
  title: "Méthodologies & outils",
  weight: 0.7,
  tags: ["methodologie", "outils", "process", "atelier", "agile"],
  skills: [
    { kind: "skill", id: "skill.design-thinking", group: "skills.methods", label: "Design Thinking", weight: 0.7,
      tags: ["design thinking", "methodologie", "ideation"] },
    { kind: "skill", id: "skill.workshops", group: "skills.methods", label: "Ateliers de co-conception", weight: 0.8,
      tags: ["atelier", "workshop", "co-conception", "facilitation", "collaboration"] },
    { kind: "skill", id: "skill.analytics", group: "skills.methods", label: "Analyse d'usages (analytics)", weight: 0.8,
      tags: ["analytics", "data", "mesure", "kpi", "analyse d'usages"] },
    { kind: "skill", id: "skill.design-sprint", group: "skills.methods", label: "Sprint Design", weight: 0.6,
      tags: ["design sprint", "sprint design", "agile", "scrum"] },
    { kind: "skill", id: "skill.claude-code", group: "skills.methods", label: "Claude Code", weight: 0.6,
      tags: ["claude code", "ia", "ai", "intelligence artificielle", "llm"] },
    { kind: "skill", id: "skill.figma-tool", group: "skills.methods", label: "Figma", weight: 0.8,
      tags: ["figma", "outils"] },
    { kind: "skill", id: "skill.supabase-tool", group: "skills.methods", label: "Supabase", weight: 0.5,
      tags: ["supabase", "outils", "backend"] },
  ],
};
