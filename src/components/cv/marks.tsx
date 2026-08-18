/**
 * Les trois signes qui ouvrent les sections du CV de référence.
 * Dessinés en SVG plutôt qu'en caractères Unicode : rendu identique
 * quel que soit le moteur, et alignement optique maîtrisé.
 */
export type MarkName = "star6" | "sparkle" | "triangle";

const PATHS: Record<MarkName, string> = {
  // Étoile à six branches — section « Expériences ».
  star6:
    "M5 0 L3.98 3.22 L0.67 2.5 L2.95 5 L0.67 7.5 L3.98 6.78 L5 10 L6.02 6.78 L9.33 7.5 L7.05 5 L9.33 2.5 L6.02 3.22 Z",
  // Étoile à quatre branches, concave et étirée — section « Projets ».
  sparkle:
    "M5 0 C5.25 3.3 5.85 4.1 9.4 5 C5.85 5.9 5.25 6.7 5 10 C4.75 6.7 4.15 5.9 0.6 5 C4.15 4.1 4.75 3.3 5 0 Z",
  // Triangle — section « Formations ».
  triangle: "M5 0.6 L9.6 9.2 L0.4 9.2 Z",
};

export function Mark({ name, size = 11 }: { name: MarkName; size?: number }) {
  return (
    <svg
      viewBox="0 0 10 10"
      width={`${size}pt`}
      height={`${size}pt`}
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", flex: "none" }}
    >
      <path d={PATHS[name]} fill="currentColor" />
    </svg>
  );
}
