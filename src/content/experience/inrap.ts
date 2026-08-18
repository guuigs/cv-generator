import type { ExperienceBlock } from "@/lib/types";

export const inrap: ExperienceBlock = {
  kind: "experience",
  id: "exp.inrap",
  role: "UX/UI Designer",
  contract: "Alternance",
  org: "INRAP",
  orgLong: "Institut National de Recherches Archéologiques Préventives",
  location: "Paris",
  start: "2025",
  end: "2026",
  weight: 1,
  pinned: true,
  tags: [
    "ux", "ui", "refonte", "site web", "institution", "figma", "wireframe",
    "specifications", "accessibilite", "rgaa", "rgpd", "front-end", "cartographie",
    "recherche utilisateur", "coordination", "audit ux", "secteur public",
  ],
  bullets: [
    {
      id: "exp.inrap.b1",
      tags: ["refonte", "audit ux", "wireframe", "figma", "specifications", "coordination", "site web", "institution"],
      text:
        "Pilotage UX de la refonte de 3 sites web institutionnels (portail, iconothèque, Journées Européennes de l'Archéologie) : audit UX, wireframes, maquettes Figma, spécifications fonctionnelles, coordination designers / développeurs et suivi de l'implémentation.",
      short:
        "Pilotage UX de la refonte de 3 sites web institutionnels : audit UX, wireframes, maquettes Figma, spécifications fonctionnelles, coordination designers / développeurs.",
      weight: 1,
    },
    {
      // Megacarte a été conçue et développée, mais l'INRAP ne l'a jamais publiée
      // (blocage administratif). La puce ne revendique donc que le travail réalisé :
      // ne jamais y ajouter « lancée », « mise en ligne » ni de lien.
      id: "exp.inrap.b2",
      tags: ["cartographie", "recherche utilisateur", "cadrage", "prototypage", "figma", "front-end", "rgpd", "rgaa", "accessibilite", "architecture technique"],
      text:
        "Conception et développement de Megacarte, plateforme contributive de cartographie : recherche utilisateur, cadrage fonctionnel, prototypage Figma, architecture technique et développement front-end (conformité RGPD, accessibilité RGAA).",
      short:
        "Conception et développement de Megacarte, plateforme contributive de cartographie : recherche utilisateur, cadrage fonctionnel, prototypage Figma et développement front-end.",
      weight: 0.9,
    },
  ],
};
