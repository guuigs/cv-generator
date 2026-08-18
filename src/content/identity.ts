import type { Identity } from "@/lib/types";

/**
 * Faits d'identité. Les accroches (`headlines`) forment une liste blanche :
 * le générateur choisit dedans, il n'en invente jamais. Chaque ligne ajoutée
 * ici doit être une description exacte de ce que Guilhem fait réellement.
 */
export const identity: Identity = {
  name: "Guilhem Terrier",

  defaultHeadline: "UX/Ui designer - brand designer - graphic designer",
  headlines: [
    "UX/Ui designer - brand designer - graphic designer",
    "UX/Ui designer - brand designer",
    "UX/Ui designer",
    "Brand designer - graphic designer",
  ],

  portrait: { src: "/img/portrait.png", alt: "Portrait de Guilhem Terrier" },
  portfolio: { label: "Portfolio", href: "https://guilhemterrier.com" },

  contacts: [
    { id: "phone", label: "06 61 55 28 34", href: "tel:+33661552834", line: 1 },
    { id: "email", label: "guilhemtr@proton.me", href: "mailto:guilhemtr@proton.me", line: 1 },
    { id: "linkedin", label: "linkedin.com/in/guilhemterrier", href: "https://linkedin.com/in/guilhemterrier", line: 1 },
    { id: "location", label: "Lyon, France", line: 2 },
    { id: "availability", label: "Disponible à partir de Septembre 2026", line: 2 },
    { id: "lang-fr", label: "Français (natif)", line: 3 },
    { id: "lang-en", label: "Anglais (B2 - 820 TOEIC)", line: 3 },
  ],
};
