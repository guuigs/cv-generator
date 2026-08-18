import type { CvModel } from "@/lib/types";

const shell: React.CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: "11px", lineHeight: 1.6, color: "#3a3a3a",
};

/**
 * Panneau d'explication — visible à l'écran, jamais imprimé.
 * Il rend la sélection auditable : pourquoi ce bloc, pourquoi pas celui-là.
 */
export function SelectionPanel({ model }: { model: CvModel }) {
  const { profile, trace } = model;
  const kept = trace.filter((t) => t.kept);
  const dropped = trace.filter((t) => !t.kept);

  return (
    <aside className="no-print" style={{ ...shell, width: "300px", flex: "none" }}>
      <h2 style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#000", marginBottom: "10px" }}>
        Sélection
      </h2>

      <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: "10px", marginBottom: "16px" }}>
        <dt style={{ color: "#8a8a8a" }}>offre</dt>
        <dd>{profile.offer.title}</dd>
        <dt style={{ color: "#8a8a8a" }}>société</dt>
        <dd>{profile.offer.company}</dd>
        {profile.offer.url ? (
          <>
            <dt style={{ color: "#8a8a8a" }}>lien</dt>
            <dd style={{ overflowWrap: "anywhere" }}>
              <a href={profile.offer.url} style={{ color: "#3a3a3a" }}>{profile.offer.url}</a>
            </dd>
          </>
        ) : null}
        <dt style={{ color: "#8a8a8a" }}>accroche</dt>
        <dd>{model.headline}</dd>
      </dl>

      <Group title={`Retenus (${kept.length})`} items={kept} />
      <Group title={`Écartés (${dropped.length})`} items={dropped} dim />

      {profile.offer.notes ? (
        <>
          <h3 style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#000", margin: "16px 0 6px" }}>
            Notes de lecture
          </h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{profile.offer.notes}</p>
        </>
      ) : null}
    </aside>
  );
}

function Group({ title, items, dim }: { title: string; items: CvModel["trace"]; dim?: boolean }) {
  if (!items.length) return null;
  return (
    <>
      <h3 style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#000", margin: "0 0 6px" }}>
        {title}
      </h3>
      <ul style={{ marginBottom: "16px", opacity: dim ? 0.55 : 1 }}>
        {items.map((t) => (
          <li key={t.id} style={{ display: "flex", gap: "8px", justifyContent: "space-between", borderBottom: "1px solid #e0ddd8", padding: "3px 0" }}>
            <span style={{ overflowWrap: "anywhere" }}>
              {t.id}
              {t.matched.length ? (
                <span style={{ display: "block", color: "#8a8a8a" }}>↳ {t.matched.slice(0, 6).join(", ")}</span>
              ) : null}
            </span>
            <span style={{ color: "#8a8a8a", flex: "none" }}>{t.score.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
