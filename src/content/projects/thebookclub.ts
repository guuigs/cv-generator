import type { ProjectBlock } from "@/lib/types";

export const thebookclub: ProjectBlock = {
  kind: "project",
  id: "proj.thebookclub",
  title: "TheBookClub.cafe",
  subtitle: "Plateforme sociale de découverte de livres",
  year: "2026",
  weight: 0.9,
  tags: [
    "produit", "web app", "ux", "ui", "figma", "prototypage", "base de donnees",
    "api", "front-end", "react", "social", "reseau social", "full-stack",
  ],
  bullets: [
    {
      id: "proj.thebookclub.b1",
      tags: ["ux", "ui", "parcours utilisateur", "figma", "prototypage", "base de donnees", "api", "front-end"],
      text:
        "Conception UX/UI et développement complet d'une application web type Letterboxd pour les livres : design des parcours utilisateurs, prototypage Figma, architecture de la base de données relationnelle, intégration de l'API Google Books, et développement front-end.",
      short:
        "Conception UX/UI et développement complet d'une application web type Letterboxd pour les livres : parcours utilisateurs, prototypage Figma et développement front-end.",
      weight: 1,
    },
  ],
};
