import type { ExperienceBlock } from "@/lib/types";

export const elapsio: ExperienceBlock = {
  kind: "experience",
  id: "exp.elapsio",
  role: "Brand designer",
  contract: "Freelance",
  org: "Elapsio",
  location: "Lyon",
  start: "2025",
  end: "2025",
  weight: 0.7,
  tags: [
    "brand", "branding", "charte graphique", "identite visuelle", "packaging",
    "direction artistique", "graphic design", "freelance", "lancement",
  ],
  bullets: [
    {
      id: "exp.elapsio.b1",
      tags: ["charte graphique", "identite visuelle", "guidelines", "packaging", "branding", "lancement"],
      text:
        "Création d'une charte graphique complète (identité visuelle, guidelines) et conception de packaging pour le lancement commercial de la marque.",
      short:
        "Création d'une charte graphique complète (identité visuelle, guidelines) et conception de packaging.",
      weight: 1,
    },
  ],
};
