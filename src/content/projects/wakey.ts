import type { ProjectBlock } from "@/lib/types";

export const wakey: ProjectBlock = {
  kind: "project",
  id: "proj.wakey",
  title: "Wakey",
  subtitle: "Application mobile de résumé d'actualité par IA",
  year: "2025",
  weight: 0.9,
  tags: [
    "mobile", "ios", "app store", "ia", "ai", "intelligence artificielle", "llm",
    "design system", "freemium", "produit", "autonomie", "api",
  ],
  bullets: [
    {
      id: "proj.wakey.b1",
      tags: ["mobile", "ios", "ia", "intelligence artificielle", "api", "personnalisation", "produit"],
      text:
        "Conception, design et développement complet d'une app mobile iOS de synthèse quotidienne de l'actualité par intelligence artificielle : sélection de thématiques par l'utilisateur, génération de résumés personnalisés via l'API Perplexity.",
      short:
        "Conception, design et développement complet d'une app mobile iOS de synthèse de l'actualité par intelligence artificielle, via l'API Perplexity.",
      weight: 1,
    },
    {
      id: "proj.wakey.b2",
      tags: ["design system", "freemium", "business model", "app store", "autonomie", "deploiement"],
      text:
        "Création d'un design system dédié, conception d'un modèle freemium avec gestion des niveaux d'accès et autorisations différenciées. Projet réalisé en totale autonomie, de la conception UX au déploiement sur l'App Store.",
      short:
        "Création d'un design system dédié. Projet réalisé en totale autonomie, de la conception UX au déploiement sur l'App Store.",
      weight: 0.85,
    },
  ],
};
