# Générateur de CV — Guilhem Terrier

Un CV par offre d'emploi, généré à partir d'un contenu validé une seule fois.
Le moteur **choisit, ordonne et raccourcit**. Il n'écrit jamais une phrase que
vous n'avez pas écrite vous-même.

- Rendu fidèle au CV de référence : A4, grille au point près, export PDF vectoriel.
- Deux polices, deux rôles : **Geist** pour l'information principale, **DepartureMono** pour tout le secondaire.
- Chaque compétence, expérience, projet et formation est un **bloc indépendant**, adressable par son id.

---

## Démarrage

```bash
npm install
npm run dev          # http://localhost:3000
```

`/` liste les profils, `/cv/<slug>` affiche un CV avec, à gauche, le détail de
la sélection : ce qui a été retenu, ce qui a été écarté, et pourquoi.

---

## Le flux : une annonce → un CV

```bash
# 1. Analyser l'annonce
npm run tailor -- --url "https://exemple.com/offre/ui-designer" --slug studio-x

# La plupart des sites d'emploi bloquent les robots. Dans ce cas :
#   copiez le texte de l'annonce dans un fichier, puis :
npm run tailor -- --file annonce.txt --slug studio-x \
  --title "Product Designer" --company "Studio X"

# 2. Relire profiles/studio-x.json, ajuster à la main si besoin
# 3. Vérifier
npm run verify

# 4. Exporter
npm run pdf -- studio-x        # → export/CV-Guilhem-Terrier-studio-x.pdf
```

`tailor` produit un **profil** : un fichier JSON qui dit *quoi montrer*. Il ne
touche jamais au contenu, qui reste celui de `src/content/`.

Il remonte aussi ce que l'annonce demande et que le CV ne dit nulle part —
notamment les outils nommés dans l'annonce :

```
⚠ Demandé par l'annonce, absent du CV :
  framer [outil], motion [outil]
  Ces manques ne seront PAS comblés automatiquement.
```

C'est délibéré. Le générateur ne bouche pas les trous : il vous les montre.

---

## Architecture du contenu

Un fichier = un fait. Ajouter une expérience, c'est créer un fichier et
l'enregistrer dans le registre — rien d'autre à toucher.

```
src/content/
├── identity.ts                 nom, accroches autorisées, contacts
├── skills/
│   ├── ux-design.ts            groupe + 6 compétences atomiques
│   ├── ui-design.ts
│   ├── frontend.ts
│   └── methods.ts
├── experience/
│   ├── inrap.ts                un fichier par poste
│   ├── elapsio.ts
│   └── c2rmf.ts
├── projects/
│   ├── thebookclub.ts
│   └── wakey.ts
├── education/
│   ├── master-design.ts
│   ├── bachelor-com.ts
│   └── licence-histoire.ts
└── index.ts                    le registre
```

Chaque bloc porte :

| champ     | rôle |
|-----------|------|
| `id`      | identifiant stable, utilisé par `pin` / `drop` / `order` |
| `tags`    | mots-clés servant au score de pertinence |
| `weight`  | importance intrinsèque (0→1), quand l'annonce ne matche rien |
| `bullets` | chaque puce a ses propres `tags` — la sélection descend au niveau de la puce |
| `short`   | variante courte **écrite à la main**, utilisée quand la place manque |
| `pinned`  | toujours affiché : évite les trous dans la chronologie |

### Ajouter une expérience

```ts
// src/content/experience/nouvelle-boite.ts
import type { ExperienceBlock } from "@/lib/types";

export const nouvelleBoite: ExperienceBlock = {
  kind: "experience",
  id: "exp.nouvelle-boite",
  role: "Product Designer",
  contract: "CDI",
  org: "Nouvelle Boîte",
  location: "Lyon",
  start: "2026",
  end: "présent",
  weight: 1,
  pinned: true,
  tags: ["produit", "design system", "figma"],
  bullets: [
    { id: "exp.nouvelle-boite.b1", tags: ["design system"], text: "…" },
  ],
};
```

Puis l'importer dans `src/content/index.ts` et lancer `npm run verify -- --approve`.

---

## Comment le moteur choisit

`src/lib/select.ts`, sans magie et sans appel réseau :

1. **Score** = Σ (poids du mot-clé × 1 si le tag matche, × 0,4 si le mot n'apparaît que dans le texte) + poids intrinsèque × 0,8.
2. **Sélection** des `n` meilleurs par section (`limits` du profil).
3. **Remise en ordre naturel** : on garde la chronologie, jamais l'ordre du score — un CV trié par pertinence se lit mal.
4. **Puces** : même traitement, à l'intérieur de chaque entrée.
5. `pin` force un bloc, `drop` l'exclut, `order` réordonne.

Tout est visible dans le panneau de gauche, à l'écran : score, mots-clés qui
ont matché, raison du rejet.

---

## La garantie « jamais de mensonge »

Quatre barrières, vérifiées mécaniquement par `npm run verify` :

1. **Le moteur ne produit aucun texte.** `selectCv` ne fait que choisir parmi
   les chaînes de `src/content/`. Il n'y a pas de générateur de phrases dans
   ce dépôt — pas d'appel à un modèle de langage au moment du rendu.
2. **Liste blanche d'accroches.** Le champ `headline` d'un profil doit
   appartenir à `identity.headlines`. Une accroche non listée fait échouer le
   rendu, avec la liste des valeurs autorisées.
3. **Les variantes courtes ne peuvent que retirer.** `verify` compare les mots
   de `short` à ceux de `text` : un mot nouveau = erreur.
4. **Empreinte du contenu.** `content.lock.json` enregistre le hash de chaque
   fait. Toute modification silencieuse fait échouer `verify` tant qu'un humain
   n'a pas relu et lancé `npm run verify -- --approve`.

Plus un filet : chaque chaîne effectivement rendue est recherchée dans le
contenu validé. Si elle n'y est pas, `verify` échoue.

Ce que ces barrières **ne** couvrent pas : la véracité de ce que vous écrivez
dans `src/content/`. C'est là, et seulement là, que la sincérité se joue.

---

## Design system

Repris au point près du CV de référence, puis étendu.

**Page** — A4, 595,28 × 841,89 pt, marges 25 pt. Tout est exprimé en `pt` :
1 pt à l'écran = 1 pt dans le PDF.

**Typographie**

| rôle | police | taille |
|------|--------|--------|
| Nom | Geist 700 | 24 pt |
| Accroche, titres de section | Geist 400 | 14 pt |
| Intitulés de poste, projets, diplômes | Geist 700 | 10 pt |
| Corps des puces | Geist 400 | 8 pt / interligne 12 pt |
| Contacts, organisations, dates, écoles | DepartureMono | 8 pt |
| Listes de compétences | DepartureMono | 6,8 pt / interligne 9 pt |
| Type de contrat | DepartureMono capitales | 7 pt |

La règle : **Geist porte le sens, DepartureMono porte le contexte.** Tout ce qui
se lit en diagonale (dates, organisations, inventaires de compétences) passe en
mono ; tout ce qui se lit vraiment reste en Geist.

**Couleurs** — encre `#000`, secondaire `#747474` (relevé sur le PDF d'origine),
filets `#a9a9a9`.

**Signes de section** — les trois dingbats (étoile à six branches, étoile à
quatre branches, triangle) sont des SVG, pas des caractères : rendu identique
partout, alignement optique maîtrisé. Voir `src/components/cv/marks.tsx`.

**Garde-fou de mise en page** — un badge apparaît à l'écran si le CV dépasse
une page, et `npm run pdf` sort en erreur. `npm run calibrate` imprime la
position en points de chaque repère, pour comparer au PDF de référence.

---

## Scripts

| commande | effet |
|----------|-------|
| `npm run dev` | serveur de développement |
| `npm run tailor -- --url … \| --file … \| --stdin` | annonce → `profiles/<slug>.json` |
| `npm run verify` | contrôle anti-mensonge (`-- --approve` pour valider un changement de contenu) |
| `npm run pdf [slug] [--png]` | export PDF (et PNG) dans `export/` |
| `npm run calibrate [slug]` | position en pt des repères de mise en page |
| `npm run check` | typecheck + verify + build |

L'export PDF passe par Chromium (Playwright). Si le binaire n'est pas trouvé :
`npx playwright install chromium`, ou `CHROMIUM_PATH=/chemin/vers/chrome`.

---

## Pistes d'évolution

- **Auto-ajustement** : faire varier `bulletsPerItem` et `density` jusqu'à
  remplir la page au plus juste, au lieu de fixer les limites à la main.
- **Version anglaise** : ajouter un champ `lang` aux blocs et un sélecteur de
  langue, plutôt qu'un second dépôt.
- **Lettre de motivation** : même principe — un stock de paragraphes validés,
  sélectionnés par l'annonce, jamais générés.
- **Journal de candidatures** : chaque profil est déjà une trace horodatée de
  ce qui a été envoyé à qui ; il ne manque qu'un statut et une date.
- **Comparateur** : afficher deux profils côte à côte pour voir ce que le
  ciblage a réellement changé.
