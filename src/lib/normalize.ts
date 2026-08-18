/** Normalisation partagée par le scoring et l'extraction de mots-clés. */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2019']/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Découpe en mots utiles (≥ 3 caractères, hors mots vides FR/EN). */
const STOP = new Set(
  (
    // Mots vides français
    "alors ainsi apres main partie place niveau cadre sein assez attendu aucun aussi autre autres avant avec avoir beaucoup bien car cela celle celui cependant certains ces cet cette chaque chez comme comment dans depuis des deux doit doivent donc dont elle elles encore entre est etre eux faire fait faut grace ici jusqu leur leurs lors mais meme mieux moins nos notre nous ont ou par parmi pas peu peut plus plusieurs pour pourquoi pres puis quand que quel quelle quels quelles qui quoi sans sera seront ses soit son sont sous sur tous tout toute toutes tres trop une vers voici voila vos votre vous etes " +
    // Mots vides anglais
    "about above after again against all also and any are because been before being both but can cannot could does doing down during each few for from further had has have having here how into its itself more most other our ours out over own same she should some such than that the their them then there these they this those through too under until very was were what when where which while who whom why will with would you your " +
    // Vocabulaire de recrutement : présent partout, ne dit rien du poste
    "annonce candidat candidate candidature cdd cdi challenge collaborateur collaborateurs competences contrat description diplome domaine emploi entreprise environnement equipe equipes evoluer experience experiences formation groupe integrer mission missions offre opportunite poste postuler process profil profils recherchons recherche recrutement rejoindre remuneration salaire societe stage teletravail " +
    // Verbes et adverbes trop génériques
    "aider animer apporter assurer avez capacite connaissance connaissances construire contribuer creer developper etre faire garantir gerer maitrise mettre participer permettre pouvoir prendre proposer realiser savoir suivre travailler utiliser " +
    // Mesures de temps
    "ans annee annees jour jours mois semaine semaines"
  ).split(" "),
);

export function tokenize(input: string): string[] {
  return normalize(input)
    .split(/[^a-z0-9+#.-]+/)
    .filter((w) => w.length >= 3 && !STOP.has(w));
}
