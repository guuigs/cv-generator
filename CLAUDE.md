# cv-generator — instructions de projet

## Ce que ce dépôt fait

Un générateur de CV qui **choisit, ordonne et raccourcit** un contenu validé
à la main (`src/content/`) — il n'en écrit jamais. Voir `README.md` pour
l'architecture complète : moteur de sélection, garde-fous anti-mensonge,
flux `tailor` (annonce → profil), export PDF.

## Règle stricte : une page pour tout CV ciblé sur une offre

**Tout CV construit pour un poste précis tient sur une seule page A4. Sans
exception, sans négociation.** C'est la règle la plus importante de ce
dépôt et elle prime sur toute autre considération de contenu.

Concrètement, avant de livrer un CV ciblé (`profiles/<slug>.json` avec une
`offer` réelle) :

1. `npm run pdf -- <slug>` — le script échoue (exit 1) si la page déborde.
   Ne jamais livrer un export produit avant que cette commande soit passée
   au vert.
2. Si le contenu déborde, la correction est de **couper**, jamais de
   compresser en dessous du plancher de lisibilité déjà établi (6,8 pt de
   corps minimum, voir `README.md` § Design system). Réduire `limits`
   (moins de puces, moins de compétences par groupe, moins d'expériences)
   ou baisser légèrement `density` (0,9 à 1,1) — jamais l'inverse.
3. Ne jamais résoudre un débordement en inventant une version « plus
   courte » d'un fait qui perdrait en exactitude — `npm run verify`
   vérifie déjà qu'une variante `short` ne peut que retirer des mots,
   jamais en ajouter.

**Seule exception** : le profil `default` (le CV maître, sans offre —
`offer.title` vaut `"CV maître (sans offre)"`) est une référence interne,
jamais envoyée à un employeur. Il n'est pas soumis à cette contrainte s'il
venait à dépasser une page en accumulant du contenu — mais en pratique il
doit lui aussi rester lisible et compact.

## Le bandeau de compétences (`SkillsPanel`)

Les compétences ne sont jamais une grille de taille fixe posée à la main :
elles passent par `src/components/cv/SkillsPanel.tsx`, un composant
générique qui vise **1/5 de la hauteur d'une page A4** (`--skills-panel-h`
dans `globals.css`, dérivé par `calc(var(--page-h) / 5)` — jamais un chiffre
en dur). C'est un budget, pas une contrainte dure : `.cv-page` est une
colonne flex où seul ce bandeau grandit (`flex-grow: 1`, plafonné à son
budget) pour absorber l'espace inutilisé ; l'en-tête et chaque section
gardent leur taille naturelle (`flex-shrink: 0`) et ne se compressent
jamais pour cacher un débordement. Sur un CV déjà plein (le profil
`default`, entre autres), il n'y a rien à absorber et le bandeau reste à sa
taille naturelle — la règle des une-page-pour-un-CV-ciblé ci-dessus garde
la priorité absolue sur ce budget.

La mise en page interne (colonnes, espacement) s'adapte au nombre de
groupes réellement sélectionnés — jamais figée sur 2×2. Si une future
maquette change cet équilibre, ajuster `--skills-panel-h` et le composant
plutôt que de revenir à une grille à hauteur fixe.

## Le dossier de référence (`profil/`)

`profil/` contient le matériau brut sur lequel s'appuie tout enrichissement
du contenu du CV : `competences.md` et `projets-semipro.md`, fournis par
Guilhem, chacun déjà annoté d'un regard critique par item (preuves
disponibles, ce qui reste à vérifier, ce qui ne doit pas être sur-vendu).

**Ces annotations critiques ne sont jamais optionnelles.** Avant d'ajouter
quoi que ce soit tiré de ce dossier à `src/content/`, relire le regard
critique associé : il dit explicitement ce qui est solide, ce qui manque
de preuve, et ce qui ne doit pas apparaître comme une affirmation plus
forte que ce qui est réellement démontré.

Un rendu complet et critique de ce dossier existe : `src/app/dossier/`
(document multi-pages, distinct du CV — jamais envoyé à un employeur,
usage interne uniquement). Régénérer avec `npm run dossier` après toute
mise à jour de `profil/`.

### Faits à ne jamais réconcilier dans le mauvais sens

- **Wakey** n'est plus sur l'App Store — il n'en reste que des captures
  d'écran. C'est ce que Guilhem a confirmé directement en conversation ;
  `profil/projets-semipro.md` (compilé avant le retrait) dit encore
  « disponible sur l'App Store » — c'est le document qui a tort, pas la
  confirmation directe. Ne jamais ajouter de lien App Store ni de verbe
  au présent pour Wakey.
- **Megacarte** a été conçue et développée pour l'INRAP mais n'a jamais
  été publiée par l'institution (blocage administratif, sans lien avec le
  travail réalisé). Ne jamais écrire qu'elle est « lancée » ou « en
  ligne », ne jamais y ajouter de lien.
- **FrenchBook Scan** : aucune date de début n'est documentée dans
  `profil/projets-semipro.md`. Ne pas en inventer une — demander à
  Guilhem avant de créer un bloc `src/content/` daté pour ce projet.
- **Suite Adobe** (Illustrator/Photoshop/InDesign) : le niveau de maîtrise
  réel par logiciel n'est pas confirmé. Ne jamais l'afficher comme
  compétence « avancée » sans confirmation explicite.
