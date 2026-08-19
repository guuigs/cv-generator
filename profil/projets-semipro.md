# Projets semi-professionnels — Guilhem "Ekko" Terrier

> Document de référence compilé à partir de nos échanges (Claude.ai) et des dépôts
> GitHub publics de guuigs (`portfolio`, `memoire-m2`, `TheBookClub`,
> `frenchbook-scan`). Le dépôt `wakey-app` est privé — la section Wakey s'appuie
> donc uniquement sur ce qui a été décrit en conversation, pas sur le code.
> Dernière mise à jour : 18 août 2026.

---

## 1. FrenchBook Scan — réception de cartons de livres (freelance, FrenchBook Distribution)

**Type** : mission freelance (auto-entreprise) · **Statut** : en production

**Contexte** : application web de contrôle de réception à l'export pour FrenchBook
Distribution. Un carton arrive avec un bon de commande papier (bordereaux
SODIS/Gallimard ou CDL Hachette) ; l'app le photographie, l'OCRise, fait
arbitrer les cas douteux par l'opérateur, puis fait scanner les livres un à un
pour vérifier ce qui est physiquement dans le carton. Pensée pour un usage à
une main, sur iPhone, debout en entrepôt.

**Rôle** : conception + développement solo (produit, UX et code), en usage réel
par une équipe de réception.

**Stack** : Next.js 16 (App Router) sur Vercel, TypeScript, Tailwind CSS 4,
ZXing pour la lecture code-barres (Safari n'implémente pas `BarcodeDetector`),
Zustand + IndexedDB pour l'état du carton, jsPDF pour l'export, Web Audio pour
les retours sonores. OCR via **deux moteurs Mistral en parallèle** (endpoint
documentaire + modèle vision), appelés côté serveur pour ne jamais exposer la
clé API.

**Ce qui a été fait concrètement** :
- Un pipeline de double lecture croisée champ à champ, avec un schéma JSON
  strict imposé aux deux moteurs pour rendre les sorties comparables.
- Une **clé de contrôle ISBN** (EAN-13 / ISBN-10) utilisée comme arbitre
  automatique quand les deux lectures divergent — sans demander à un humain
  de recalculer une clé de tête.
- Une modélisation fine des cas d'erreur réels des bordereaux papier : décalage
  d'un bloc de deux lignes (quantité/titre puis ISBN/éditeur), compléments de
  titre pris pour des articles, intertitres qui sortent des lignes du
  décompte ("MANQUANT", "NON-SERVI"), doublons d'ISBN fusionnés en gardant le
  max plutôt que la somme.
- Une distinction stricte entre ce qui **bloque** l'opérateur (ISBN cassé,
  deux ISBN valides concurrents, quantité incohérente) et ce qui reste une
  simple mention visible sans jamais interrompre le flux.
- Un mode caméra continu avec anti-rebond (pause de 900 ms après validation,
  double lecture exigée pour tout ce qui n'est pas un code Bookland) pour
  éviter les faux positifs pendant l'échange physique des livres.
- Un système d'accès léger (code partagé → cookie signé HMAC), pensé pour
  protéger le crédit API plutôt que des données sensibles (rien n'est stocké
  côté serveur).
- Un mode démo (`NEXT_PUBLIC_ENABLE_DEMO`) et une suite d'assertions sur la
  logique métier (clés ISBN, réconciliation, fusion de doublons) — rare sur un
  projet freelance solo de cette taille.

**Points forts** :
- Le README documente non seulement *ce que fait* l'app mais *pourquoi* chaque
  garde-fou existe, avec les cas réels observés sur les bordereaux — signe
  d'un vrai travail d'observation terrain, pas d'une spec abstraite.
- Bonne lecture des contraintes navigateur (pas de vibration ni de contrôle de
  torche sur iOS Safari) compensées par un design d'interface (voile plein
  écran coloré) plutôt qu'ignorées.
- Enjeu métier bien compris : une erreur d'OCR sur un ISBN devient un litige
  fournisseur, donc le système est conçu pour préférer bloquer à tort
  (rarement) plutôt que laisser passer une erreur silencieuse.

**Regard critique** :
- C'est un projet solo, sans revue de code externe ni pairs développeurs — la
  robustesse repose sur les tests d'assertions et l'usage réel, pas sur une
  validation d'équipe. À nuancer en entretien : "testé en production par une
  équipe" plutôt que "testé unitairement à 100 %".
- Dépendance forte à Mistral (deux appels API par page) : le coût et la
  disponibilité du service sont un point de fragilité non mentionné dans le
  code lui-même.
- L'app "efface tout" à la clôture (pas d'historique) — bon réflexe RGPD, mais
  ça veut aussi dire qu'il n'y a pas de traçabilité longue si un litige
  fournisseur remonte plusieurs semaines après.

---

## 2. Mémoire M2 + architecture d'écriture multi-agents

**Type** : projet académique (Université Sorbonne Paris Nord, dir. Benoît
Berthou) · **Statut** : soutenu en juin 2026, 116-117 pages

**Contexte** : mémoire de recherche sur la crise d'adoption des applications
mobiles d'audioguidage dans les musées français. Thèse défendue : l'échec de
ces applications n'est pas un problème de design mais le résultat combiné de
contraintes institutionnelles, économiques, organisationnelles et
attentionnelles — avec l'obligation méthodologique de rester ouvert à
l'hypothèse que l'app mobile n'est pas la bonne solution.

**Matériau produit et analysé** : 2 entretiens visiteurs, 2 entretiens
institutionnels (musée avec et sans audioguide), questionnaire à 70
répondants, corpus de 6 audioguides analysés selon une grille codée, et un
prototype testé à la Cité de l'Architecture et du Patrimoine (CAPa).

**L'architecture d'écriture (dépôt public `memoire-m2`)** :
- **Obsidian** comme environnement de rédaction (dossiers numérotés, journal
  réflexif persistant, graphe de liens).
- **Claude Code** gouverné par un `CLAUDE.md` racine qui fixe le "contrat de
  travail" de l'agent : anti-hallucination strict, registre académique,
  préservation de la voix d'auteur (extraits de référence fournis en exemple),
  et un garde-fou explicite contre son propre biais pro-design.
- **Six sous-agents spécialisés**, chacun avec un rôle et un périmètre
  d'écriture délimité :
  - `veille-refondeur` — retravaille les passages du M1 selon 3 modes
    explicites (lissage, refonte partielle, refonte complète).
  - `analyste-empirique` — traite entretiens et questionnaire, ne rédige
    jamais la prose finale.
  - `chercheur-sources` — recherche bibliographique avec ordre de priorité
    des bases (HAL, OpenAlex, Semantic Scholar, Cairn) et gestion du proxy
    BU Sorbonne Paris Nord pour les sources payantes.
  - `redacteur` — seul agent autorisé à écrire dans les chapitres finaux,
    pose systématiquement 2-3 questions de cadrage avant de rédiger une
    section non triviale.
  - `gardien-coherence` — passes transversales de cohérence
    (problématique/chapitres), produit des rapports, ne réécrit rien.
  - `avocat-du-diable` — invoqué à la demande pour contester une position,
    produit systématiquement les raisons pour lesquelles Ekko pourrait se
    tromper.
  - Trois slash-commands (`/session-start`, `/session-end`, `/contester`) et
    une mémoire persistante par fichiers (`00-etat-projet.md`,
    `00-journal-reflexion.md`).
- Gestion bibliographique via **Zotero + Better BibTeX**, journal réflexif
  traité comme un artefact de recherche à part entière, log systématique des
  contributions IA pour la section méthodologie.
- Livrables annexes : skill Claude Code personnalisé "voix-ekko", booklet A5
  imprimé avec imposition manuelle, soutenance de 18 slides, résumés
  bilingues FR/EN.

**Points forts** :
- L'architecture agentique n'est pas un gadget : chaque agent a un périmètre
  d'écriture strict (le `redacteur` seul écrit la prose finale, les autres
  produisent des notes) — ça évite le piège classique du texte généré en
  vrac puis recollé.
- La présence d'un `avocat-du-diable` dédié à contester ses propres thèses est
  une vraie méthode de contrôle de biais, rare dans un usage étudiant de l'IA.
- Documentation de transparence sur l'usage de l'IA (log des contributions) —
  posture d'honnêteté épistémique qui va au-delà du minimum académique.

**Regard critique** :
- C'est un outil conçu *pour un seul document et un seul auteur* : la charge
  de mise en place (six agents, CLAUDE.md, conventions) n'est rentable que sur
  un travail long (mémoire, thèse) — ce n'est pas un framework généralisable
  tel quel à un contexte professionnel sans adaptation.
- La rigueur anti-hallucination dépend de la discipline avec laquelle les
  agents sont effectivement suivis session après session ; le système
  documente l'intention, pas une garantie automatique de fiabilité du texte
  final (la relecture humaine reste le dernier filtre).
- En entretien, à présenter comme une compétence d'**architecture de workflow
  IA et de gestion de projet de recherche long**, pas comme une preuve de
  compétence en ingénierie logicielle au sens classique.

---

## 3. Wakey — application iOS de résumé d'actualité par IA

**Type** : projet personnel, publié · **Statut** : disponible sur l'App Store
(2025)

**Contexte** : application mobile iOS qui génère chaque jour un résumé
d'actualité personnalisé selon les thématiques choisies par l'utilisateur, via
un appel à un modèle de langage. Conçue, designée et développée seul, de bout
en bout.

**Stack** : React Native, Supabase, API Perplexity.

**Ce qui a été fait concrètement** :
- Design system mobile dédié (composants, variantes, états) construit en
  autonomie complète, sans framework UI tiers.
- Modèle **freemium** avec niveaux d'accès et autorisations différenciées.
- Gestion de la personnalisation utilisateur (préférences thématiques
  persistées).
- Intégration d'une API d'IA générative pour la synthèse de contenu.
- Publication App Store complète : compte développeur Apple, screenshots,
  fiche produit, conformité aux règles Apple.

**Points forts** :
- Cycle complet mené seul jusqu'au bout — conception, design, code, mise en
  ligne réelle sur une plateforme avec barrière à l'entrée (validation Apple).
  C'est la preuve la plus concrète d'un "produit livré" dans le portfolio.
- Choix du freemium montre une réflexion produit (modèle économique), pas
  seulement une réflexion technique ou esthétique.

**Regard critique** :
- Le dépôt GitHub `wakey-app` est privé : impossible de vérifier l'état actuel
  du code, sa maintenance, ou la stack exacte (une clarification sur
  React Native vs. React avait déjà été identifiée comme à confirmer lors
  d'un échange précédent).
- Rien n'indique de métriques d'usage réel (nombre d'utilisateurs, rétention,
  avis) — en l'état c'est une preuve de capacité à livrer, pas encore une
  preuve de traction produit. À ne pas sur-vendre comme "succès" sans chiffres
  à l'appui.
- Développement solo assisté par IA sur une stack mobile : bonne autonomie,
  mais l'absence de revue de code ou de pair-programming est, comme pour
  FrenchBook Scan, un angle mort assumé plutôt que comblé.

---

## 4. TheBookClub.cafe — plateforme sociale de découverte de livres

**Type** : projet personnel · **Statut** : en développement actif / production

**Contexte** : application "type Letterboxd pour les livres" — bibliothèque
personnelle, notes, critiques, suivi d'autres lecteurs, recommandations.
Développée en autonomie complète, de la conception UX au déploiement, avec un
pipeline de promotion de contenu automatisé.

**Stack** : Next.js, TypeScript, Supabase/PostgreSQL, API Google Books,
Tailwind CSS, `@supabase/ssr`, Vercel Analytics.

**Ce qui a été fait concrètement** :
- Modélisation d'une base relationnelle œuvres / éditions / utilisateurs /
  critiques / listes.
- Construction progressive et organique de la base de données livres : plutôt
  que d'importer un catalogue entier, chaque livre absent entre dans la base
  quand un utilisateur le cherche et le renseigne par ISBN (design choisi
  après arbitrage explicite entre extraction d'URL Google Books et saisie
  d'ISBN — l'ISBN retenu pour sa universalité et sa validation plus simple).
- Pipeline de promotion automatisée : bot de génération de contenu →
  publication multi-plateformes via **Postiz** auto-hébergé sur un VPS
  suisse, avec une stratégie de contenu "shitpost littéraire".
- Audits de sécurité et de production réguliers (traces de plusieurs audits
  datés dans le dépôt, mars 2026), scripts de nettoyage et migration de
  données (`scripts/clean_books.py`, `scripts/fix_authors.py`).

**Points forts** :
- Vision produit indépendante tenue dans la durée, avec une vraie logique de
  build-mesure-corrige (audits successifs, scripts de nettoyage de données).
- Le choix ISBN plutôt qu'extraction d'URL montre une capacité à challenger sa
  propre première idée pour une solution plus robuste et générique.
- Self-hosting du pipeline de diffusion (VPS + Postiz) — compétence
  d'infrastructure rare chez un profil design.

**Regard critique** :
- Le dépôt contient de nombreux dossiers de session temporaires
  (`tmpclaude-*`) et un `my-app/` qui semble être un reliquat d'une itération
  antérieure non nettoyée — signe d'un projet solo géré vite, sans hygiène de
  dépôt stricte (compréhensible en side-project, à ne pas reproduire sur un
  livrable client).
- Comme pour Wakey, pas de métrique d'audience ou de rétention communiquée :
  la valeur démontrée est la capacité à construire et opérer une plateforme
  sociale complexe (auth, modération, contenu généré), pas encore une preuve
  de traction communautaire.
- La stratégie de contenu "shitpost" est cohérente pour l'acquisition
  organique mais suppose une tolérance au ton informel qui ne convient pas à
  tous les contextes professionnels — à adapter selon l'interlocuteur.

---

## 5. Megacarte — plateforme cartographique contributive du patrimoine mégalithique

**Type** : mission dans le cadre de l'alternance INRAP · **Statut** : en
développement

**Contexte** : plateforme de cartographie contributive du patrimoine
mégalithique, dans un cadre institutionnel public exigeant en sécurité,
souveraineté des données et conformité réglementaire.

**Stack** : Next.js (App Router), TypeScript, Supabase (PostgreSQL + RLS),
Leaflet.js, OpenStreetMap, Bunny.net (stockage/CDN européen), Tailwind CSS.

**Ce qui a été fait concrètement** :
- Recherche utilisateur, personas, cadrage fonctionnel, prototypage Figma
  mobile-first et desktop.
- Architecture technique pensée en autonomie, modélisation de base
  relationnelle.
- Système de modération différée (publication directe + signalement) plutôt
  qu'une validation a priori bloquante.
- Back-office administrateur protégé.
- Conformité RGPD pensée dès la conception : consentement explicite à la
  cession de droits sur les contributions, hash d'IP/user-agent comme preuve
  légale plutôt que stockage d'IP brute, aucune donnée personnelle inutile
  stockée.
- Conformité RGAA (accessibilité) et choix d'un hébergement européen par
  principe de souveraineté numérique.

**Points forts** :
- Rare exemple de projet où les contraintes légales (RGPD, RGAA) sont traitées
  comme des contraintes de conception dès le départ et pas comme un correctif
  a posteriori.
- Bon arbitrage no-code vs. sur-mesure documenté, et capacité à défendre des
  choix techniques devant une institution publique — compétence de posture
  autant que technique.

**Regard critique** :
- Projet mené en contexte institutionnel (INRAP) : la marge de décision réelle
  d'Ekko (produit + tech en autonomie vs. validation hiérarchique) mériterait
  d'être précisée selon l'interlocuteur pour ne pas laisser croire à une
  autonomie totale de gouvernance sur un projet public.
- Pas de retour utilisateur en usage réel mentionné à ce stade (contrairement
  au bot CAPa, testé sur le terrain) — à vérifier avant de le présenter comme
  "validé par les usagers".

---

## 6. Bot audioguide CAPa — pipeline TTS + musique générative

**Type** : mission liée à l'alternance / au mémoire · **Statut** : prototype
testé sur le terrain (2026)

**Contexte** : outil de génération de scripts d'audioguides pour la Cité de
l'Architecture et du Patrimoine. À partir d'un sujet donné, produit deux
fichiers couplés — un script narratif en français calibré pour la synthèse
vocale, et un prompt de musique d'ambiance en anglais — mixés en
post-production.

**Stack / architecture** : MiniMax TTS (balises de pause inline), ElevenLabs
Music (prompts de 15-25 mots contraints "background-friendly"),
ffmpeg/pydub pour le mixage avec ducking sur le canal vocal, Claude Project
paramétré avec `project_memory.md` et `project_instructions.md` dédiés.

**Ce qui a été fait concrètement** :
- Prompt engineering avancé pour transposer un cadre théorique de médiation
  muséale (modèles dialogique vs. déficit, Bensaude-Vincent / Jacobi) en
  règles opérationnelles automatisables.
- Écriture adaptée à la voix synthétique (rythme, ponctuation, pauses).
- Testé en conditions réelles au CAPa, avec itération sur retours
  utilisateurs concrets.

**Points forts** :
- Pont direct et concret entre le cadre théorique du mémoire et un prototype
  fonctionnel testé sur le terrain — rare de voir la partie recherche et la
  partie prototypage aussi articulées.
- Choix technique justifié (deux moteurs distincts TTS/musique plutôt qu'un
  outil tout-en-un) qui montre une compréhension fine de ce que chaque outil
  fait bien.

**Regard critique** :
- L'échelle du test (prototype, CAPa) reste limitée — à ne pas présenter comme
  un déploiement en production à grande échelle.
- Dépendance à deux API tierces (MiniMax, ElevenLabs) dont la disponibilité et
  le coût à l'échelle n'ont pas été éprouvés au-delà du prototype.

---
