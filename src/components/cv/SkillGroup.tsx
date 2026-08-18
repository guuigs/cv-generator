import type { SkillBlock, SkillGroupBlock } from "@/lib/types";
import { Meta } from "./primitives";

/**
 * Un groupe de compétences. Le titre reste en Geist (information portante),
 * la liste passe en DepartureMono : c'est un inventaire, pas une phrase.
 */
export function SkillGroup({ group, skills }: { group: SkillGroupBlock; skills: SkillBlock[] }) {
  if (!skills.length) return null;
  return (
    <div className="cv-entry">
      <h3 style={{ fontSize: "var(--t-item)", fontWeight: 700, lineHeight: "12pt", letterSpacing: "-0.01em" }}>
        {group.title}
      </h3>
      <p style={{ marginTop: "3.5pt", lineHeight: "9pt" }}>
        {skills.map((s, i) => (
          <span key={s.id}>
            <Meta tone="ink" size="6.8pt">{s.label}</Meta>
            {i < skills.length - 1 ? <Meta tone="faint" size="6.8pt">{" · "}</Meta> : null}
          </span>
        ))}
      </p>
    </div>
  );
}
