import type { SkillBlock, SkillGroupBlock } from "@/lib/types";
import { SkillGroup } from "./SkillGroup";

/**
 * Bandeau de compétences — plafonné à 1/5 de page, jamais forcé à l'atteindre.
 *
 * Première version : ce composant grandissait (`flex-grow`) pour absorber
 * l'espace laissé libre par le reste de la page, jusqu'à ce budget. Sur un
 * CV maître, bien rempli, l'effet était invisible. Sur un CV ciblé — moins
 * d'expériences et de projets retenus, donc plus de place libre — grandir
 * jusqu'au plafond a produit un bloc de compétences flottant dans un vide
 * bien visible, centré ou non : ça se lisait comme une maquette cassée, pas
 * comme de la respiration.
 *
 * Le bandeau garde donc sa taille naturelle, exactement comme l'en-tête et
 * chaque section — `--skills-panel-h` (1/5 de la hauteur d'une page A4,
 * globals.css) reste le plafond documenté à ne jamais dépasser, jamais un
 * objectif à remplir de force. Un CV ciblé qui laisse un peu de blanc en
 * bas de page, après les formations, n'est pas un défaut : c'est un CV qui
 * ne dit que ce qu'il y a à dire.
 *
 * La mise en page interne s'adapte au nombre de groupes réellement
 * sélectionnés — jamais figée sur 4 colonnes ou 2×2.
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
        flexShrink: 0,
        maxHeight: `calc(var(--skills-panel-h) * var(--density))`,
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
  );
}
