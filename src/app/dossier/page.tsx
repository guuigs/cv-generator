import {
  Bullets, Card, Critique, Flag, H2, H3, Kicker, Lede, Meta, P, Proof, StatusPill,
  INK, MUTED, RULE, PAPER,
} from "@/components/dossier/primitives";

export const metadata = { title: "Dossier de compétences — Guilhem Terrier" };

/**
 * Document de référence interne. Jamais envoyé tel quel à un employeur —
 * contrairement au CV, il garde les nuances, les manques et les questions
 * ouvertes. Compilé à partir de profil/competences.md et
 * profil/projets-semipro.md (fournis par Guilhem le 18/08/2026), croisés
 * avec le contenu déjà validé du CV.
 */
export default function DossierPage() {
  return (
    <article className="dossier-doc" style={{ background: PAPER, color: INK }}>
      {/* ---------------------------------------------------------------- */}
      <header style={{ paddingTop: "50pt", paddingBottom: "18pt", borderBottom: `1pt solid ${RULE}` }}>
        <Kicker>Document de référence interne — jamais envoyé tel quel à un employeur</Kicker>
        <h1 style={{ fontSize: "27pt", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05, marginTop: "8pt" }}>
          Dossier de compétences
        </h1>
        <p style={{ fontSize: "12pt", color: MUTED, marginTop: "4pt" }}>Guilhem Terrier</p>
        <p style={{ marginTop: "14pt" }}><Meta>
          Sources : profil/competences.md, profil/projets-semipro.md (Guilhem Terrier, 18 août 2026) · CV validé (src/content/) · compilé le 18 août 2026
        </Meta></p>
      </header>

      {/* ---------------------------------------------------------------- */}
      <section>
        <H2>Comment lire ce document</H2>
        <P>
          Ce dossier n&rsquo;est pas un CV. Un CV choisit, dans un stock de faits déjà validés, ce qui sert une
          candidature précise — il ne montre jamais ses doutes. Ce document fait l&rsquo;inverse : il rassemble tout ce
          qui est documenté, et garde visibles les nuances que la version envoyée à un employeur doit taire ou
          reformuler. Trois marqueurs reviennent tout du long :
        </P>
        <Bullets
          items={[
            <><strong>Regard critique</strong> — une lecture qui dit ce qu&rsquo;un fait prouve réellement, et ce qu&rsquo;il ne prouve pas encore.</>,
            <><strong>À vérifier</strong> — une information manquante, non confirmée, ou en contradiction avec ce qui a été établi ailleurs. Rien n&rsquo;y est deviné.</>,
            <><strong>Preuves</strong> — sur quoi une compétence s&rsquo;appuie concrètement, projet par projet.</>,
          ]}
        />
        <P>
          Le tri est volontairement sévère : ce qui n&rsquo;est pas assez documenté pour être défendu en entretien
          n&rsquo;est pas présenté comme acquis, même quand la source le laisse entendre. Belvédère, par exemple, est
          cité comme preuve dans <code>profil/competences.md</code> mais n&rsquo;a jamais été décrit comme projet — il
          n&rsquo;a donc pas sa propre fiche ici, seulement une mention en zone grise.
        </P>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section>
        <H2>Expériences professionnelles</H2>
        <Lede>Déjà détaillées sur le CV (src/content/experience/) — rappel bref, sans reformulation.</Lede>

        <Card>
          <H3>UX/UI Designer — Alternance · INRAP · 2025–2026</H3>
          <P>Refonte de 3 sites institutionnels, conception de Megacarte (voir Projets). Aucune métrique chiffrée disponible à ce jour — seul poste du CV sans résultat mesuré.</P>
        </Card>
        <Card>
          <H3>Brand designer — Freelance · Elapsio · 2025</H3>
          <P>Charte graphique complète et packaging pour un lancement commercial.</P>
        </Card>
        <Card>
          <H3>UX researcher / Webmaster — Alternance · C2RMF · 2023–2025</H3>
          <P>+100 % de trafic en 2 ans. C&rsquo;est la métrique la plus solide et la plus vérifiable de tout le profil.</P>
        </Card>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section>
        <H2>Projets</H2>
        <Lede>
          Six projets documentés à des degrés très différents. Classés par solidité de preuve plutôt que par
          chronologie : ce qui est vérifiable et daté d&rsquo;abord, ce qui reste à corriger ou à préciser ensuite.
        </Lede>

        {/* ---- FrenchBook Scan --------------------------------------- */}
        <Card>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12pt" }}>
            <H3>FrenchBook Scan</H3>
            <StatusPill>Freelance · en production</StatusPill>
          </div>
          <Lede>
            Contrôle de réception de cartons de livres pour FrenchBook Distribution : le bon de commande papier
            est photographié, lu par OCR, les cas douteux arbitrés, puis chaque livre scanné pour vérifier ce qui
            est physiquement dans le carton. Pensé pour un usage à une main, debout, en entrepôt.
          </Lede>
          <P>
            Next.js 16 (App Router) sur Vercel, TypeScript, Tailwind CSS 4, ZXing pour la lecture code-barres
            (Safari n&rsquo;implémente pas <code>BarcodeDetector</code>), Zustand + IndexedDB, jsPDF, deux moteurs OCR
            Mistral en parallèle appelés côté serveur.
          </P>
          <Bullets
            items={[
              "Double lecture croisée par deux moteurs OCR, comparées via un schéma JSON strict qui rend leurs sorties comparables.",
              "Clé de contrôle ISBN (checksum EAN-13 / ISBN-10) utilisée comme arbitre automatique quand les deux lectures divergent — sans recalcul manuel.",
              "Modélisation des erreurs réelles observées sur les bordereaux papier : décalages de blocs, doublons d'ISBN fusionnés en gardant le maximum plutôt que la somme.",
              "Distinction stricte entre ce qui bloque l'opérateur (ISBN cassé, quantité incohérente) et ce qui reste une mention visible sans interrompre le flux.",
              "Mode caméra continu avec anti-rebond (900 ms, double lecture exigée) pour éviter les faux positifs pendant l'échange physique des livres.",
              "Accès par code partagé et cookie signé HMAC — protège le crédit API, aucune donnée stockée côté serveur.",
              "Suite d'assertions sur la logique métier (clés ISBN, fusion de doublons).",
            ]}
          />
          <Critique>
            Le projet le plus proche d&rsquo;un vrai logiciel de production, avec un enjeu métier réel : une erreur
            d&rsquo;OCR sur un ISBN devient un litige fournisseur, et le système est conçu pour préférer bloquer à tort
            plutôt que laisser passer une erreur silencieuse. Mais c&rsquo;est un projet solo, sans revue de code par
            des pairs développeurs — la robustesse repose sur l&rsquo;usage réel et des tests écrits par la même
            personne qui a écrit le code, pas sur une validation d&rsquo;équipe. En entretien : &laquo;&nbsp;testé en
            production par une équipe&nbsp;&raquo; est exact, &laquo;&nbsp;testé unitairement&nbsp;&raquo; aussi, mais
            aucun des deux n&rsquo;équivaut à une couverture de tests d&rsquo;ingénierie logicielle en équipe.
          </Critique>
          <Flag title="date de début non documentée">
            Aucune date de début n&rsquo;apparaît dans le dossier source. Nécessaire avant de créer un bloc CV daté
            pour ce projet — les champs <code>start</code>/<code>end</code> sont obligatoires dans le modèle de
            contenu du générateur.
          </Flag>
        </Card>

        {/* ---- Mémoire M2 ---------------------------------------------- */}
        <Card>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12pt" }}>
            <H3>Mémoire M2 &amp; système d&rsquo;écriture multi-agents</H3>
            <StatusPill>Soutenu juin 2026 · 116–117 pages · major de promotion</StatusPill>
          </div>
          <Lede>
            Recherche sur la crise d&rsquo;adoption des applications mobiles d&rsquo;audioguidage dans les musées
            français. Thèse défendue : l&rsquo;échec de ces applications n&rsquo;est pas un problème de design mais le
            résultat combiné de contraintes institutionnelles, économiques, organisationnelles et attentionnelles —
            avec l&rsquo;obligation méthodologique de rester ouvert à l&rsquo;hypothèse que l&rsquo;app mobile
            n&rsquo;est pas la bonne réponse.
          </Lede>
          <P>
            Matériau : 2 entretiens visiteurs, 2 entretiens institutionnels (musée avec et sans audioguide),
            questionnaire à 70 répondants, corpus de 6 audioguides analysés selon une grille codée, prototype testé
            à la Cité de l&rsquo;Architecture et du Patrimoine (voir « Bot audioguide CAPa » ci-dessous).
          </P>
          <div style={{ marginTop: "10pt" }}>
            <Meta>Architecture d&rsquo;écriture (dépôt public <code>memoire-m2</code>)</Meta>
          </div>
          <Bullets
            items={[
              <>Obsidian comme environnement de rédaction, gouverné par un <code>CLAUDE.md</code> racine qui fixe un contrat de travail explicite : anti-hallucination strict, registre académique, préservation de la voix d&rsquo;auteur, garde-fou contre le biais pro-design de l&rsquo;agent lui-même.</>,
              "Six sous-agents à périmètre d'écriture délimité : veille-refondeur (retravail du M1 selon 3 modes explicites), analyste-empirique (traite entretiens et questionnaire, ne rédige jamais la prose finale), chercheur-sources (bibliographie avec ordre de priorité des bases et gestion du proxy BU), redacteur (seul agent autorisé à écrire dans les chapitres finaux, pose 2–3 questions de cadrage avant toute section non triviale), gardien-coherence (passes de cohérence transversale, produit des rapports, ne réécrit rien), avocat-du-diable (invoqué à la demande pour contester une position, produit systématiquement les raisons pour lesquelles la thèse pourrait être fausse).",
              "Zotero + Better BibTeX, journal réflexif traité comme un artefact de recherche à part entière, log systématique des contributions IA pour la section méthodologie.",
              "Livrables annexes : skill Claude Code personnalisé, booklet A5 imposé à la main, soutenance de 18 slides, résumés bilingues FR/EN.",
            ]}
          />
          <Critique>
            Cette architecture n&rsquo;est pas un gadget : chaque agent a un périmètre d&rsquo;écriture strict — seul le
            <code>redacteur</code> écrit la prose finale, les autres produisent des notes — ce qui évite le piège
            classique du texte généré en vrac puis recollé. L&rsquo;<code>avocat-du-diable</code>, dédié à contester
            ses propres thèses, est une vraie méthode de contrôle de biais, rare dans un usage étudiant de l&rsquo;IA.
            Mais c&rsquo;est un outil conçu pour un seul document et un seul auteur : la charge de mise en place (six
            agents, conventions, mémoire persistante) n&rsquo;est rentable que sur un travail long — ce n&rsquo;est pas
            un framework généralisable tel quel à un contexte professionnel sans adaptation. Et la rigueur
            anti-hallucination dépend de la discipline avec laquelle les agents sont effectivement suivis session
            après session : le système documente une intention, pas une garantie automatique — la relecture humaine
            reste le dernier filtre. En entretien, à présenter comme une compétence d&rsquo;<strong>architecture de
            workflow IA et de gestion de projet de recherche long</strong>, pas comme une preuve d&rsquo;ingénierie
            logicielle au sens classique.
          </Critique>
        </Card>

        {/* ---- Bot CAPa -------------------------------------------------- */}
        <Card>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12pt" }}>
            <H3>Bot audioguide CAPa</H3>
            <StatusPill>Prototype testé sur le terrain · 2026</StatusPill>
          </div>
          <Lede>
            Génération de scripts d&rsquo;audioguides pour la Cité de l&rsquo;Architecture et du Patrimoine : à partir
            d&rsquo;un sujet donné, produit un script narratif calibré pour la synthèse vocale et un prompt de
            musique d&rsquo;ambiance, mixés en post-production.
          </Lede>
          <P>MiniMax TTS (balises de pause inline), ElevenLabs Music (prompts contraints), ffmpeg/pydub pour le mixage avec ducking sur le canal vocal, Claude Project dédié.</P>
          <Bullets
            items={[
              "Prompt engineering pour transposer un cadre théorique de médiation muséale (modèles dialogique vs. déficit) en règles opérationnelles automatisables.",
              "Écriture adaptée à la voix synthétique (rythme, ponctuation, pauses).",
              "Testé en conditions réelles au CAPa, avec itération sur retours utilisateurs concrets.",
            ]}
          />
          <Critique>
            Pont direct et concret entre la partie recherche du mémoire et un prototype fonctionnel testé sur le
            terrain — rare de voir les deux aussi articulées. Mais l&rsquo;échelle du test reste un prototype, pas un
            déploiement en production, et la dépendance à deux API tierces n&rsquo;a pas été éprouvée à l&rsquo;échelle.
          </Critique>
        </Card>

        {/* ---- TheBookClub ------------------------------------------- */}
        <Card>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12pt" }}>
            <H3>TheBookClub.cafe</H3>
            <StatusPill>Déjà au CV · développement actif</StatusPill>
          </div>
          <Lede>Plateforme sociale de découverte de livres, type Letterboxd. Base ci-dessous : ce que le dossier source ajoute au-delà de ce qui figure déjà sur le CV.</Lede>
          <Bullets
            items={[
              "Construction organique de la base de livres : plutôt qu'un import de catalogue, chaque livre absent entre en base quand un utilisateur le cherche et le renseigne par ISBN — arbitrage explicite entre extraction d'URL Google Books et saisie d'ISBN, tranché pour l'ISBN (universalité, validation plus simple).",
              "Pipeline de promotion automatisée : bot de génération de contenu publié sur plusieurs plateformes via Postiz, auto-hébergé sur un VPS suisse.",
              "Audits de sécurité et de production documentés dans le temps (traces datées, mars 2026), scripts de nettoyage et de migration de données.",
            ]}
          />
          <Critique>
            Vision produit tenue dans la durée, avec une vraie logique construire-mesurer-corriger — les audits
            successifs et les scripts de nettoyage en sont la preuve, pas une déclaration d&rsquo;intention. Le choix
            ISBN plutôt qu&rsquo;extraction d&rsquo;URL montre une capacité à challenger sa propre première idée pour
            une solution plus robuste. Mais le dépôt contient des dossiers de session temporaires et un reliquat
            d&rsquo;itération antérieure non nettoyé — hygiène de dépôt à ne pas reproduire sur un livrable client.
            Aucune métrique d&rsquo;audience ou de rétention communiquée : la valeur démontrée est la capacité à
            construire et opérer une plateforme sociale complexe, pas encore une traction mesurée.
          </Critique>
        </Card>

        {/* ---- Megacarte ------------------------------------------- */}
        <Card>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12pt" }}>
            <H3>Megacarte</H3>
            <StatusPill>Alternance INRAP · non publiée par l&rsquo;institution</StatusPill>
          </div>
          <Lede>
            Plateforme de cartographie contributive du patrimoine mégalithique, en contexte institutionnel exigeant
            en sécurité et conformité réglementaire. Développée et non lancée pour des raisons administratives
            propres à l&rsquo;INRAP, sans lien avec le travail réalisé.
          </Lede>
          <Bullets
            items={[
              "Modération différée (publication directe + signalement) plutôt qu'une validation a priori bloquante.",
              "RGPD pensé dès la conception : consentement explicite à la cession de droits, hash d'IP/user-agent comme preuve légale plutôt que stockage d'IP brute.",
              "Conformité RGAA, hébergement européen (Bunny.net) par principe de souveraineté numérique.",
            ]}
          />
          <Critique>
            Rare exemple où les contraintes légales sont traitées comme des contraintes de conception dès le
            départ, pas comme un correctif après coup — et une vraie capacité à défendre des choix techniques
            devant une institution publique. La marge de décision réelle (autonomie produit et technique, vs.
            validation hiérarchique) mérite d&rsquo;être précisée selon l&rsquo;interlocuteur. Aucun retour
            utilisateur en usage réel documenté à ce stade, contrairement au bot CAPa.
          </Critique>
        </Card>

        {/* ---- Wakey — correction --------------------------------------- */}
        <Card>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12pt" }}>
            <H3>Wakey</H3>
            <StatusPill tone="warn">Retiré de l&rsquo;App Store — captures uniquement</StatusPill>
          </div>
          <Flag title="contredit profil/projets-semipro.md">
            Le dossier source date la publication « disponible sur l&rsquo;App Store (2025) ». Guilhem a confirmé
            directement, en conversation le 18/08/2026, que l&rsquo;app a depuis été retirée et qu&rsquo;il n&rsquo;en
            reste que des captures d&rsquo;écran. C&rsquo;est cette confirmation directe, plus récente, qui fait foi —
            le CV (src/content/projects/wakey.ts) est déjà à jour sur ce point.
          </Flag>
          <Lede>
            Application iOS de synthèse quotidienne de l&rsquo;actualité par intelligence artificielle, selon des
            thématiques choisies par l&rsquo;utilisateur. Conçue, designée et développée seul, de bout en bout,
            jusqu&rsquo;à sa publication sur l&rsquo;App Store — publication aujourd&rsquo;hui terminée.
          </Lede>
          <Bullets
            items={[
              "Design system mobile dédié, construit en autonomie complète, sans framework UI tiers.",
              "Modèle freemium avec niveaux d'accès et autorisations différenciées.",
              "Intégration de l'API Perplexity pour la génération des résumés.",
              "Publication App Store menée jusqu'au bout : compte développeur, fiche produit, conformité aux règles Apple.",
            ]}
          />
          <Critique>
            Le cycle complet mené seul jusqu&rsquo;à une publication réelle sur une plateforme à barrière à
            l&rsquo;entrée reste la preuve la plus concrète d&rsquo;un produit livré du profil — la dépublication
            depuis ne l&rsquo;efface pas, mais elle interdit de le présenter au présent. Aucune métrique d&rsquo;usage
            (utilisateurs, rétention, avis) n&rsquo;a jamais été documentée : même pendant sa mise en ligne, c&rsquo;était
            une preuve de capacité à livrer, pas une preuve de traction produit.
          </Critique>
        </Card>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section>
        <H2>Compétences techniques</H2>
        <Lede>Dix domaines, chacun avec ses preuves et ses limites réelles — pas une liste de mots-clés.</Lede>

        <Card>
          <H3>Développement front-end</H3>
          <P>HTML5/CSS3, JavaScript/TypeScript, React, React Native, Next.js (App Router), Tailwind CSS, composants, hooks, routing, gestion d&rsquo;état applicatif.</P>
          <Proof>Megacarte, TheBookClub, Wakey, FrenchBook Scan, portfolio personnel.</Proof>
          <Critique>
            La nuance la plus importante de tout le profil. Ce développement est mené en solo, avec un usage
            intensif de Claude Code, sans revue de code par des pairs développeurs ni formation d&rsquo;ingénierie
            logicielle formelle. C&rsquo;est une vraie compétence de développement produit assisté par IA, utile en
            handoff design→dev et en QA design — mais ce n&rsquo;est pas équivalent à une expérience de développeur
            front-end professionnel en équipe (revue de code, tests automatisés en continu, standards d&rsquo;équipe).
            Se positionner comme <strong>« développement front comme atout de handoff et de QA design »</strong> est
            plus honnête, et plus solide en entretien, que « développeur front-end ».
          </Critique>
        </Card>

        <Card>
          <H3>IA &amp; outillage</H3>
          <P>Claude Code (skills, sous-agents, hooks, slash-commands, MCP), Claude Project, prompt engineering avancé, architecture agentique multi-agents, workflows multi-API, Anthropic API, MiniMax TTS, ElevenLabs Music, Perplexity API, documentation de contribution IA.</P>
          <Proof>Les six sous-agents du mémoire M2, le pipeline TTS/musique du bot CAPa, l&rsquo;usage de Claude Code sur l&rsquo;ensemble des projets de développement.</Proof>
          <Critique>
            Probablement la compétence la plus différenciante et la plus actuelle du profil — peu de profils
            UX/design savent concevoir une architecture multi-agents avec périmètres d&rsquo;écriture séparés et logs
            de contribution. Le risque est inverse de celui des autres compétences : elle peut sembler « à la mode »
            ou difficile à évaluer par un recruteur qui ne connaît pas l&rsquo;outillage. Mieux vaut la démontrer
            concrètement (dépôt public, exemples de prompts) que la lister comme un simple mot-clé.
          </Critique>
        </Card>

        <Card>
          <H3>UX/UI &amp; conception produit</H3>
          <P>Recherche utilisateur, personas, cadrage fonctionnel, wireframes, prototypage Figma (mobile-first et desktop), design systems produit et institutionnels.</P>
          <Proof>Megacarte (personas, prototypage), TheBookClub (parcours utilisateurs, design system), Wakey (design system mobile natif sans framework tiers), FrenchBook Scan (interface pensée pour un usage terrain à une main).</Proof>
          <Critique>
            La conception est systématiquement suivie d&rsquo;un développement complet par la même personne — cohérence
            forte entre design et code, mais qui rend difficile d&rsquo;isoler une compétence UX pure d&rsquo;une
            compétence de développeur produit solo. À clarifier selon que le poste visé cherche un profil UX pur ou
            un profil produit full-stack.
          </Critique>
        </Card>

        <Card>
          <H3>Back-end &amp; infrastructure</H3>
          <P>Supabase (PostgreSQL, Row Level Security, Auth, Storage), modélisation de bases relationnelles, API REST, intégration d&rsquo;API tierces, Bunny.net, VPS Linux (self-hosting), Postiz, Git/GitHub, GitHub Actions.</P>
          <Proof>TheBookClub (Postiz auto-hébergé, VPS suisse), FrenchBook Scan (clé Mistral jamais exposée côté client), Megacarte (Supabase + RLS en contexte institutionnel), portfolio (séparation stricte clé anon/service_role).</Proof>
          <Critique>
            La compréhension des enjeux de sécurité de base — ne jamais exposer une clé serveur, RLS, cookies signés
            plutôt que sessions côté serveur — est réelle et cohérente sur plusieurs projets : ce n&rsquo;est pas un
            hasard répété. Mais l&rsquo;administration VPS reste un usage personnel : pas d&rsquo;astreinte, pas de SLA,
            pas de montée en charge réelle éprouvée. À présenter comme « autonomie en self-hosting », pas comme une
            expérience DevOps en production critique.
          </Critique>
        </Card>

        <Card>
          <H3>CMS &amp; éditorial</H3>
          <P>Drupal (administration, taxonomies, modules, export), architecture éditoriale, SEO institutionnel, rédaction web, Markdown, Obsidian.</P>
          <Proof>C2RMF (webmaster / UX analyst), mémoire M2 (Obsidian).</Proof>
          <Critique>
            Le +100 % de trafic au C2RMF est la métrique la plus solide et la plus vérifiable de tout le profil — à
            mettre en avant systématiquement, sur n&rsquo;importe quel poste où elle est pertinente. Le reste des
            compétences éditoriales (SEO, architecture de l&rsquo;information) reste qualitatif, faute d&rsquo;autres
            chiffres disponibles.
          </Critique>
        </Card>

        <Card>
          <H3>Conformité &amp; cadre légal</H3>
          <P>RGPD (cession de droits, consentement, anonymisation, hash), RGAA, souveraineté numérique, cadre légal des données publiques.</P>
          <Proof>Megacarte (hash d&rsquo;IP/user-agent comme preuve légale plutôt que stockage d&rsquo;IP brute, consentement explicite à la cession de droits).</Proof>
          <Flag title="jamais validé par un DPO ou un juriste">
            Compétence peu commune et intégrée dès la conception plutôt qu&rsquo;ajoutée après coup — un vrai point
            fort différenciant. Mais la compréhension du RGPD n&rsquo;a, à ce stade, jamais été validée par un DPO ou
            un juriste externe. À formuler comme « conception avec le RGPD en tête », jamais « conformité RGPD
            garantie ».
          </Flag>
        </Card>

        <Card>
          <H3>Méthodologie &amp; gestion de projet</H3>
          <P>Design Thinking, Design Sprint, ateliers de co-conception, recueil de besoins, spécifications fonctionnelles, recherche utilisateur qualitative, méthodologie de recherche en sciences sociales/SIC, analyse de corpus codée, gestion bibliographique (Zotero, BibTeX).</P>
          <Proof>Mémoire M2 (méthodologie qualitative complète : entretiens, questionnaire, corpus), Megacarte (recueil de besoins en contexte institutionnel).</Proof>
          <Flag title="aucune pratique Scrum formelle">
            La logique agile est appliquée intuitivement, jamais certifiée par une pratique encadrée en entreprise :
            pas de rituels Scrum, pas de vrai A/B testing ou CRO pratiqué. À ne pas sur-affirmer sur un poste très
            process-driven — mieux vaut assumer « logique agile appliquée naturellement, pas de pratique Scrum
            formelle » que laisser deviner une expérience qui n&rsquo;existe pas.
          </Flag>
        </Card>

        <Card>
          <H3>Recherche académique &amp; rédaction</H3>
          <P>Rédaction académique en français universitaire, conventions APA/Management &amp; Avenir, conduite d&rsquo;entretiens semi-directifs, conception et passation de questionnaire, analyse statistique descriptive, synthèse de littérature.</P>
          <Proof>Mémoire M2 dans son ensemble (116–117 pages, 24 mois de travail, major de promotion et meilleure note de mémoire de la promotion).</Proof>
          <Critique>
            Compétence solide et bien documentée, mais fortement liée au cadre académique. Sa transposition à un
            contexte d&rsquo;entreprise (rédaction de spécifications, de rapports d&rsquo;étude utilisateur) est
            plausible mais reste à démontrer sur un cas non académique pour être totalement convaincante en entretien.
          </Critique>
        </Card>

        <Card>
          <H3>Design graphique &amp; brand</H3>
          <P>Identité visuelle, guidelines de marque, packaging, pré-presse (CMJN, fonds perdus, repères), mise en page éditoriale, imposition, création de slide decks.</P>
          <Proof>Elapsio (freelance design de marque), visuels INRAP affichés en gares, imposition A5 du mémoire M2.</Proof>
          <Flag title="niveau réel sur la Suite Adobe non confirmé">
            Compétence bien attestée par des livrables physiques concrets (affichage en gares, impression). Mais
            l&rsquo;attribution exacte de la Suite Adobe — quels logiciels sont réellement maîtrisés, lesquels sont
            simplement utilisés ponctuellement — reste à confirmer avant de l&rsquo;afficher comme compétence
            « avancée » sur un CV.
          </Flag>
        </Card>

        <Card>
          <H3>Cartographie &amp; data</H3>
          <P>Leaflet.js, OpenStreetMap, BDTOPO IGN, Python (GeoPandas, extrusion 3D, conversion STL), modélisation 3D paramétrique, impression 3D.</P>
          <Proof>Megacarte (cartographie contributive) ; Belvédère, cité mais non documenté comme projet (voir zone grise).</Proof>
          <Critique>
            Niche rare dans un profil UX/UI — un vrai différenciateur. Mais elle reste circonscrite à des projets
            liés à la même structure (INRAP), donc pas encore généralisée à d&rsquo;autres contextes.
          </Critique>
        </Card>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section>
        <H2>Compétences humaines</H2>

        <Card>
          <H3>Posture intellectuelle</H3>
          <Bullets
            items={[
              "Esprit critique appliqué à sa propre discipline — le mémoire M2 impose explicitement de rester ouvert à l'hypothèse que le design n'est pas la solution, contre son propre biais pro-UX.",
              "Honnêteté épistémique : transparence sur l'usage de l'IA, logs de contribution, limites assumées des conclusions.",
              "Rigueur méthodologique : sources vérifiées, anti-hallucination structuré dans le workflow de rédaction.",
              "Curiosité technique et veille permanente (self-hosting, IA, souveraineté numérique).",
            ]}
          />
          <Critique>
            La compétence la plus originale et la mieux prouvée du profil — peu de candidats construisent
            volontairement un « avocat du diable » pour contester leurs propres conclusions. Le risque, en
            entretien, est de la sous-vendre en la présentant comme un simple outil technique plutôt que comme une
            vraie disposition intellectuelle : à raconter comme une histoire — pourquoi ce choix, ce que ça a
            changé dans le mémoire — plutôt qu&rsquo;à lister comme un mot-clé.
          </Critique>
        </Card>

        <Card>
          <H3>Conduite de projet &amp; autonomie</H3>
          <Bullets
            items={[
              "Pilotage de projet en autonomie complète, de la conception au déploiement (Wakey publié seul jusqu'à son retrait, Megacarte conçue et développée en propre, mémoire et stack de rédaction conçus de bout en bout).",
              "Coordination avec des parties prenantes institutionnelles multiples (INRAP, C2RMF, CAPa, Sorbonne Paris Nord).",
              "Cadrage et arbitrage technique sous contraintes contradictoires (sécurité, budget, délais).",
              "Documentation systématique (spécifications, logs, journaux, README).",
            ]}
          />
          <Critique>
            La compétence la plus démontrée de tout le profil — presque tous les projets sont solo ou en très petit
            binôme. Une vraie force pour un poste demandant de l&rsquo;initiative, mais aussi un angle mort à
            anticiper en entretien : très peu d&rsquo;expérience documentée de travail dans une équipe produit large
            (plusieurs développeurs, PM, designers en parallèle), avec les frictions et compromis que ça implique.
            Mieux vaut le dire soi-même que laisser un recruteur le découvrir.
          </Critique>
        </Card>

        <Card>
          <H3>Relation &amp; communication</H3>
          <Bullets
            items={[
              "Vulgarisation auprès d'interlocuteurs non techniques (scientifiques, juridique, grand public).",
              "Dialogue technique avec des développeurs (handoff, QA design).",
              "Médiation entre départements aux logiques différentes (scientifiques vs. techniques au C2RMF).",
              "Conduite du changement (refonte de processus éditoriaux internes).",
            ]}
          />
          <Critique>
            Bien attesté dans le contexte institutionnel (INRAP, C2RMF), où le lien se fait entre métiers
            différents — un vrai signal de maturité professionnelle. Moins de preuves disponibles côté présentation
            devant un comité de direction ou négociation client au sens commercial du terme — à sonder si le poste
            visé en a besoin.
          </Critique>
        </Card>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section style={{ paddingBottom: "56pt" }}>
        <H2>Zone grise — à traiter avant toute autre utilisation</H2>
        <Lede>Ce qui reste ouvert, consolidé en un seul endroit plutôt que dispersé dans chaque fiche.</Lede>
        <Bullets
          items={[
            <><strong>Wakey</strong> — confirmé retiré de l&rsquo;App Store, il n&rsquo;en reste que des captures. Ce document corrige <code>profil/projets-semipro.md</code> sur ce point ; le CV est déjà à jour.</>,
            <><strong>FrenchBook Scan</strong> — aucune date de début documentée. Nécessaire avant d&rsquo;en faire un bloc CV daté.</>,
            <><strong>Belvédère</strong> — cité comme preuve (cartographie, travail en binôme avec Noé Perrier) mais jamais décrit comme projet à part entière. À documenter avant de le citer davantage.</>,
            <><strong>Suite Adobe</strong> — niveau de maîtrise réel par logiciel non confirmé.</>,
            <><strong>RGPD (Megacarte)</strong> — conception jamais validée par un DPO ou un juriste externe.</>,
            <><strong>Méthodologie agile</strong> — aucune pratique Scrum formelle en entreprise, aucun A/B testing ou CRO réel pratiqué.</>,
            <><strong>INRAP</strong> — seul poste du CV sans métrique chiffrée disponible, contrairement au C2RMF.</>,
          ]}
        />
      </section>
    </article>
  );
}
