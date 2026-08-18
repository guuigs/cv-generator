import Link from "next/link";
import { loadAllProfiles } from "@/lib/profiles";
import { library } from "@/content";

const mono: React.CSSProperties = { fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.02em" };

export default function Home() {
  const profiles = loadAllProfiles();
  const counts = {
    experiences: library.experiences.length,
    projects: library.projects.length,
    education: library.education.length,
    skills: library.skills.length,
  };

  return (
    <main style={{ maxWidth: "760px", margin: "0 auto", padding: "64px 32px 96px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.02em" }}>Générateur de CV</h1>
      <p style={{ ...mono, color: "#6a6a6a", marginTop: "10px" }}>
        {counts.experiences} expériences · {counts.projects} projets · {counts.education} formations · {counts.skills} compétences
      </p>
      <p style={{ marginTop: "18px", lineHeight: 1.6, color: "#3a3a3a" }}>
        Un profil = une offre d'emploi. Le moteur sélectionne, ordonne et tronque le contenu validé —
        il n'en écrit jamais de nouveau.
      </p>

      <ul style={{ marginTop: "36px", borderTop: "1px solid #d8d4cd" }}>
        {profiles.map((p) => (
          <li key={p.slug} style={{ borderBottom: "1px solid #d8d4cd" }}>
            <Link
              href={`/cv/${p.slug}`}
              style={{ display: "flex", justifyContent: "space-between", gap: "24px", padding: "16px 0", textDecoration: "none", color: "inherit" }}
            >
              <span>
                <span style={{ fontWeight: 600 }}>{p.offer.title}</span>
                <span style={{ ...mono, display: "block", color: "#6a6a6a", marginTop: "3px" }}>
                  {p.offer.company}
                  {p.keywords.length ? ` · ${p.keywords.length} mots-clés` : " · aucun mot-clé"}
                </span>
              </span>
              <span style={{ ...mono, color: "#8a8a8a", flex: "none" }}>/{p.slug}</span>
            </Link>
          </li>
        ))}
      </ul>

      {profiles.length === 0 ? (
        <p style={{ ...mono, marginTop: "24px", color: "#6a6a6a" }}>
          Aucun profil. Lancez : npm run tailor -- --url &quot;https://…&quot;
        </p>
      ) : null}
    </main>
  );
}
