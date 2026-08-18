import type { ExperienceBlock } from "@/lib/types";

export const c2rmf: ExperienceBlock = {
  kind: "experience",
  id: "exp.c2rmf",
  role: "UX researcher / Webmaster",
  contract: "Alternance",
  org: "C2RMF",
  orgLong: "Centre de Recherche et de Restauration des Musées de France",
  location: "Paris",
  start: "2023",
  end: "2025",
  weight: 0.9,
  pinned: true,
  tags: [
    "ux research", "recherche utilisateur", "analytics", "architecture de l'information",
    "seo", "accessibilite", "cms", "drupal", "webmaster", "atelier", "co-conception",
    "specifications", "secteur public", "musee", "culture",
  ],
  bullets: [
    {
      id: "exp.c2rmf.b1",
      tags: ["analytics", "architecture de l'information", "seo", "accessibilite", "trafic", "mesure", "data"],
      text:
        "Analyse des comportements utilisateurs (analytics) et restructuration de l'architecture d'information du site. Optimisation de l'accessibilité et du référencement de l'ensemble des pages du site. Aboutissant à une augmentation du trafic de +100 % en 2 ans.",
      short:
        "Analyse des comportements utilisateurs (analytics) et restructuration de l'architecture d'information du site. Aboutissant à une augmentation du trafic de +100 % en 2 ans.",
      weight: 1,
    },
    {
      id: "exp.c2rmf.b2",
      tags: ["atelier", "co-conception", "cms", "drupal", "recueil de besoins", "specifications", "tests", "collaboration"],
      text:
        "Participation aux ateliers de co-conception avec l'institution et le prestataire pour améliorer le CMS (Drupal) : recueil de besoins, spécifications fonctionnelles, tests.",
      short:
        "Participation aux ateliers de co-conception pour améliorer le CMS (Drupal) : recueil de besoins, spécifications fonctionnelles, tests.",
      weight: 0.8,
    },
    {
      id: "exp.c2rmf.b3",
      tags: ["process", "publication", "coordination", "collaboration", "editorial"],
      text:
        "Refonte des processus de publication en lien avec les différents départements scientifiques du centre.",
      weight: 0.6,
    },
  ],
};
