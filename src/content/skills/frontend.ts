import type { SkillGroupBlock } from "@/lib/types";

export const frontend: SkillGroupBlock = {
  kind: "skillGroup",
  id: "skills.front",
  title: "Développement front-end (assisté par IA)",
  weight: 0.8,
  tags: ["front-end", "frontend", "developpement", "integration", "code", "react", "next.js"],
  skills: [
    { kind: "skill", id: "skill.html-css", group: "skills.front", label: "HTML5 / CSS3", weight: 0.8,
      tags: ["html", "html5", "css", "css3", "integration", "front-end"] },
    { kind: "skill", id: "skill.js-ts", group: "skills.front", label: "JavaScript / TypeScript", weight: 0.8,
      tags: ["javascript", "typescript", "js", "ts", "front-end"] },
    { kind: "skill", id: "skill.react", group: "skills.front", label: "React (Next.js)", weight: 0.9,
      tags: ["react", "next.js", "nextjs", "front-end"] },
    { kind: "skill", id: "skill.tailwind", group: "skills.front", label: "Tailwind CSS", weight: 0.7,
      tags: ["tailwind", "css", "front-end"] },
    { kind: "skill", id: "skill.supabase", group: "skills.front", label: "Supabase", weight: 0.6,
      tags: ["supabase", "postgres", "base de donnees", "backend"] },
    { kind: "skill", id: "skill.git", group: "skills.front", label: "Git/GitHub", weight: 0.7,
      tags: ["git", "github", "versioning"] },
  ],
};
