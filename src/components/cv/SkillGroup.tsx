import type { SkillBlock, SkillGroupBlock } from "@/lib/types";

/**
 * Un groupe de compétences.
 *
 * L'inventaire était en DepartureMono 6,8 pt — plancher de lisibilité imposé
 * par la largeur du mono. Arbitrage de Guilhem sur maquette : Geist 8,25 pt.
 * À largeur de colonne égale les deux tiennent le même nombre de caractères,
 * mais Geist reste lisible à taille d'impression.
 */
export function SkillGroup({ group, skills }: { group: SkillGroupBlock; skills: SkillBlock[] }) {
  if (!skills.length) return null;
  return (
    <div className="cv-entry">
      <h3 style={{ fontSize: "var(--t-item)", fontWeight: 700, lineHeight: "12pt", letterSpacing: "-0.01em" }}>
        {group.title}
      </h3>
      <p style={{ marginTop: "4.5pt", lineHeight: "var(--lh-skill)", fontSize: "var(--t-skill)" }}>
        {/* Une compétence ne se coupe jamais en deux : la seule césure possible
            est l'espace qui suit le point médian, lui-même collé à l'item
            précédent par une espace insécable. */}
        {skills.map((s, i) => (
          <span key={s.id}>
            <span style={{ whiteSpace: "nowrap" }}>{s.label}</span>
            {i < skills.length - 1 ? (
              <>
                <span aria-hidden="true" style={{ color: "var(--color-faint)" }}>{"\u00a0·"}</span>{" "}
              </>
            ) : null}
          </span>
        ))}
      </p>
    </div>
  );
}
