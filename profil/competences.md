# Compétences — Guilhem "Ekko" Terrier

---

## Hard skills

### UX/UI & conception produit
Recherche utilisateur, personas, cadrage fonctionnel, wireframes, prototypage
Figma (mobile-first et desktop), design systems produit et institutionnels.

- **Preuves** : Megacarte (personas + prototypage), TheBookClub (parcours
  utilisateurs, design system personnel), Wakey (design system mobile natif
  construit sans framework UI tiers), FrenchBook Scan (interface pensée pour
  un usage terrain à une main).
- **Regard critique** : la conception UX est systématiquement suivie d'un
  développement complet par Ekko lui-même, ce qui est une force (cohérence
  design→code) mais rend difficile d'isoler la compétence UX pure d'une
  compétence de "développeur produit solo" — utile à clarifier selon que le
  poste visé est UX pur ou full-stack produit.

### Design graphique & brand
Identité visuelle (logo, palette, typographie), guidelines de marque,
packaging, préparation pré-presse (CMJN, fonds perdus, repères), Suite Adobe
(Illustrator, Photoshop, InDesign), mise en page éditoriale, imposition
(booklet A5), création de slide decks.

- **Preuves** : expérience Elapsio (freelance design de marque), visuels
  INRAP affichés en gares en septembre, imposition A5 du mémoire M2.
- **Regard critique** : compétence bien attestée par des livrables physiques
  concrets (gares, impression), mais l'attribution exacte de la Suite Adobe
  (quels logiciels réellement maîtrisés vs. simplement utilisés
  ponctuellement) restait à confirmer lors d'un échange précédent — à vérifier
  avant de l'afficher comme compétence "avancée" sur un CV.

### Développement front-end (assisté par IA)
HTML5/CSS3, JavaScript/TypeScript, React, React Native, Next.js (App Router),
Tailwind CSS, composants, hooks, routing, gestion d'état applicatif.

- **Preuves** : les quatre projets produit (Megacarte, TheBookClub, Wakey,
  FrenchBook Scan) plus le portfolio personnel.
- **Regard critique** — **le point le plus important à nuancer sur l'ensemble
  du profil** : ce développement est mené en solo, avec un usage intensif de
  Claude Code, sans revue de code par des pairs développeurs ni formation
  d'ingénierie logicielle formelle. C'est une vraie compétence de "vibecoding"
  produit-orienté, utile en handoff design→dev et en QA design, mais ce n'est
  pas équivalent à une expérience de développeur front-end professionnel en
  équipe (code review, tests automatisés en continu, standards d'équipe). Un
  positionnement "développement front comme atout de handoff et de QA design"
  est plus honnête et plus solide en entretien qu'un positionnement "développeur
  front-end".

### Back-end & infrastructure
Supabase (PostgreSQL, Row Level Security, Auth, Storage), modélisation de
bases de données relationnelles, API REST, intégration d'API tierces (Google
Books, Perplexity, MiniMax, ElevenLabs, Mistral), Bunny.net, VPS Linux
(self-hosting), Postiz, Git/GitHub, GitHub Actions, FTP/SSH, OVH.

- **Preuves** : TheBookClub (Postiz auto-hébergé sur VPS suisse), FrenchBook
  Scan (double appel Mistral côté serveur, clé jamais exposée côté client),
  Megacarte (Supabase + RLS en contexte institutionnel), portfolio (CMS +
  Supabase avec séparation stricte clé `anon`/`service_role`).
- **Regard critique** : la compréhension des enjeux de sécurité de base (ne
  jamais exposer une clé serveur, RLS, cookies signés plutôt que sessions
  côté serveur) est réelle et cohérente sur plusieurs projets — ce n'est pas
  un hasard répété. Mais l'administration VPS reste un usage personnel/side
  project (pas d'astreinte, pas de SLA, pas de montée en charge réelle
  éprouvée) : à présenter comme "autonomie en self-hosting" plutôt que comme
  une expérience DevOps en production critique.

### Cartographie & data
Leaflet.js, OpenStreetMap, BDTOPO IGN, Python (GeoPandas, extrusion 3D,
conversion STL), modélisation 3D paramétrique, impression 3D.

- **Preuves** : Megacarte (cartographie contributive), Belvédère (extraction
  de données IGN et impression 3D de blocs architecturaux).
- **Regard critique** : compétence de niche assez rare dans un profil UX/UI,
  ce qui en fait un vrai différenciateur — mais elle reste circonscrite à deux
  projets liés à la même structure (INRAP/CAPa), donc pas encore généralisée
  à d'autres contextes.

### CMS & éditorial
Drupal (administration, taxonomies, modules, export), architecture
éditoriale, SEO institutionnel, rédaction web, Markdown, Obsidian (graphe de
connaissances, templates).

- **Preuves** : expérience C2RMF (webmaster/UX analyst, +100 % de trafic
  mentionné comme métrique forte), mémoire M2 (Obsidian).
- **Regard critique** : le +100 % de trafic à C2RMF est la métrique la plus
  solide de tout le profil (chiffrée, vérifiable en entretien) — à mettre en
  avant systématiquement. Le reste des compétences éditoriales (SEO,
  architecture) mériterait d'être étayé par d'autres chiffres si disponibles,
  sans quoi ça reste qualitatif.

### IA & outillage
Claude Code (skills, sous-agents, hooks, slash-commands, MCP), Claude Project
(instructions, memory), prompt engineering avancé, architecture agentique
multi-agents, workflows IA multi-API, Anthropic API, MiniMax TTS, ElevenLabs
Music, Perplexity API, documentation de contribution IA (logs de
transparence).

- **Preuves** : les six sous-agents du mémoire M2, le pipeline TTS/musique du
  bot CAPa, l'usage de Claude Code sur l'ensemble des projets de dev.
- **Regard critique** : c'est probablement la compétence la plus différenciante
  et la plus actuelle du profil — peu de profils UX/design savent concevoir
  une architecture multi-agents avec périmètres d'écriture séparés et logs de
  contribution. Le risque est inverse des autres compétences : elle peut
  sembler "à la mode" ou difficile à évaluer par un recruteur qui ne connaît
  pas l'outillage — vaut mieux la démontrer concrètement (repo public,
  exemples de prompts) que la lister comme un simple mot-clé.

### Méthodologie & gestion de projet
Design Thinking, Sprint Design, ateliers de co-conception, recueil de
besoins, spécifications fonctionnelles, recherche utilisateur qualitative,
méthodologie de recherche en sciences sociales/SIC, analyse de corpus codée,
gestion bibliographique (Zotero, BibTeX, Better BibTeX).

- **Preuves** : mémoire M2 (méthodologie qualitative complète : entretiens,
  questionnaire, corpus), Megacarte et Belvédère (recueil de besoins en
  contexte institutionnel).
- **Regard critique** : Ekko a lui-même reconnu ne jamais avoir pratiqué de
  rituels Scrum formels en entreprise ni de vrai A/B testing/CRO — la logique
  agile est appliquée intuitivement mais pas certifiée par une pratique
  encadrée. À ne pas sur-affirmer sur un CV ciblant un poste très
  process-driven ; mieux vaut assumer "logique agile appliquée naturellement,
  pas de pratique Scrum formelle" que de laisser deviner une expérience
  qui n'existe pas.

### Recherche académique & rédaction
Rédaction académique en français universitaire, conventions APA/Management &
Avenir, conduite d'entretiens semi-directifs, conception et passation de
questionnaire, analyse statistique descriptive, synthèse de littérature.

- **Preuves** : mémoire M2 dans son ensemble (116-117 pages, 24 mois de
  travail). Major de promotion et meilleur note de mémoire de la promotion.
- **Regard critique** : compétence solide et bien documentée, mais fortement
  liée au cadre académique — sa transposition à un contexte d'entreprise
  (rédaction de spécifications, de rapports d'étude utilisateur) est
  plausible mais reste à démontrer sur un cas non-académique pour être
  totalement convaincante en entretien.

### Conformité & cadre légal
RGPD (cession de droits, consentement, anonymisation, hash), RGAA,
souveraineté numérique (choix d'hébergement européen), cadre légal des
données publiques.

- **Preuves** : Megacarte (hash d'IP/user-agent comme preuve légale plutôt que
  stockage d'IP brute, consentement explicite à la cession de droits).
- **Regard critique** : compétence peu commune et bien intégrée dès la
  conception plutôt qu'ajoutée après coup — un vrai point fort différenciant.
  Reste que la compréhension du RGPD n'a, à ce stade, jamais été validée par
  un DPO ou un juriste externe : à formuler comme "conception avec RGPD en
  tête" plutôt que "conformité RGPD garantie".


---

## Soft skills

### Conduite de projet & autonomie
- Pilotage de projet en autonomie complète, de la conception au déploiement
  (Wakey publié seul sur l'App Store, Megacarte conçue et développée en
  propre, mémoire et stack de rédaction conçus de bout en bout).
- Coordination avec des parties prenantes institutionnelles multiples (INRAP,
  C2RMF, CAPa, Sorbonne Paris Nord).
- Cadrage et arbitrage technique sous contraintes contradictoires (sécurité,
  budget, délais).
- Documentation systématique (specs, logs, journaux, README).
- Travail en binôme structuré (Belvédère, avec Noé Perrier).

**Regard critique** : l'autonomie est la compétence la plus démontrée de tout
le profil — presque tous les projets sont solo ou en très petit binôme. C'est
une vraie force pour un poste demandant de l'initiative, mais c'est aussi un
angle mort à anticiper en entretien : le profil a très peu d'expérience
documentée de travail dans une équipe produit large (plusieurs devs, PM,
designers en parallèle) avec les frictions et compromis que ça implique.
Utile de le dire soi-même plutôt que de laisser un recruteur le découvrir.

### Relation et communication
- Vulgarisation auprès d'interlocuteurs non techniques (scientifiques,
  juridique, grand public).
- Dialogue technique avec des développeurs (handoff, QA Design).
- Médiation entre départements aux logiques différentes (scientifiques vs.
  techniques au C2RMF).
- Conduite du changement (refonte de processus éditoriaux internes).

**Regard critique** : bien attesté dans le contexte institutionnel (INRAP,
C2RMF) où Ekko fait le lien entre métiers différents — c'est un vrai signal
de maturité professionnelle. Moins de preuves disponibles côté "présentation
devant un comité de direction" ou "négociation client" au sens commercial du
terme ; à sonder si le poste visé en a besoin.

### Posture intellectuelle
- Esprit critique appliqué à sa propre discipline (le mémoire M2 impose
  explicitement de rester ouvert à l'hypothèse que le design n'est pas la
  solution — contre son propre biais pro-UX).
- Honnêteté épistémique (transparence sur l'usage de l'IA, logs de
  contribution, limites assumées des conclusions).
- Rigueur méthodologique (sources vérifiées, anti-hallucination structurée
  dans le workflow de rédaction).
- Curiosité technique et veille permanente (self-hosting, IA, souveraineté
  numérique).
- Apprentissage continu (stack technique acquise principalement sur projets
  personnels plutôt qu'en formation encadrée).

**Regard critique** : c'est la compétence la plus originale et la mieux
prouvée du profil — peu de candidats construisent volontairement un
"avocat du diable" pour contester leurs propres conclusions. Le risque, en
entretien, est de la sous-vendre en la présentant comme un simple outil
technique plutôt que comme une vraie disposition intellectuelle ; à raconter
comme une histoire (pourquoi ce choix, ce que ça a changé dans le mémoire)
plutôt qu'à lister comme un mot-clé.




---


