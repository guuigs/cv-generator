import type { SkillBlock, SkillGroupBlock } from "@/lib/types";
import { SkillGroup } from "./SkillGroup";

/**
 * Bandeau de compétences — un budget d'espace, pas une grille figée.
 *
 * Règle de mise en page : ce composant vise `--skills-panel-h`, soit 1/5 de
 * la hauteur d'une page A4 (voir globals.css). C'est un objectif, jamais une
 * contrainte dure — le générateur ne clippe ni ne masque de contenu pour
 * l'atteindre. Sur un CV maître (tout le contenu, toutes les sections
 * pleines), la page peut ne laisser que peu de marge et le bandeau restera
 * en dessous du budget ; sur un CV ciblé, où `limits` réduit généralement
 * les expériences et projets, il s'en approche et en profite pour respirer.
 * Dans les deux cas, le seul garde-fou qui compte reste celui de la page
 * entière : `npm run pdf` échoue si elle déborde.
 *
 * La mise en page interne s'adapte au nombre de groupes réellement
 * sélectionnés — jamais figée sur 4 colonnes ou 2×2 — et centre le contenu
 * verticalement dans le budget quand il y a de la place à revendre.
 */
export function SkillsPanel({
  groups,
}: {
  groups: Array<{ block: SkillGroupBlock; skills: SkillBlock[] }>;
}) {
  if (!groups.length) return null;
  const columns = groups.length >= 2 ? 2 : 1;

  return (
    <div
      style={{
        marginTop: "var(--gap-section)",
        // Grandit pour absorber l'espace inutilisé, jamais au-delà de son
        // budget (1/5 de page) ni en dessous de sa taille naturelle : quand
        // il n'y a rien à absorber (CV déjà plein), ce triplet ne change
        // rien et la page reste celle que son contenu impose réellement.
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: "auto",
        maxHeight: `calc(var(--skills-panel-h) * var(--density))`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          columnGap: "16pt",
          rowGap: "calc(9pt * var(--density))",
          alignItems: "start",
        }}
      >
        {groups.map((g) => (
          <SkillGroup key={g.block.id} group={g.block} skills={g.skills} />
        ))}
      </div>
    </div>
  );
}
