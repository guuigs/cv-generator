import type { ReactNode } from "react";

/** Texte secondaire : tout ce qui est méta passe en DepartureMono. */
export function Meta({
  children, size = "8pt", tone = "muted", className = "", uppercase = false,
}: {
  children: ReactNode;
  size?: string;
  tone?: "ink" | "muted" | "faint";
  className?: string;
  uppercase?: boolean;
}) {
  const color = tone === "ink" ? "var(--color-ink)" : tone === "faint" ? "var(--color-faint)" : "var(--color-muted)";
  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: size,
        color,
        letterSpacing: uppercase ? "0.08em" : "0",
        textTransform: uppercase ? "uppercase" : "none",
      }}
    >
      {children}
    </span>
  );
}

/** Filet vertical fin, séparateur des blocs de contact. */
export function Pipe() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: "0.7pt",
        height: "7.5pt",
        background: "var(--color-faint)",
        margin: "0 6pt",
        verticalAlign: "-0.5pt",
      }}
    />
  );
}

/** Colonne de droite : la période. Toujours en mono, toujours alignée à droite. */
export function DateRange({ start, end }: { start: string; end?: string }) {
  const label = !end || end === start ? start : `${start} – ${end}`;
  return (
    <div style={{ width: "var(--col-date)", textAlign: "right", flex: "none", lineHeight: "10pt" }}>
      <Meta size="8pt">{label}</Meta>
    </div>
  );
}

/** Ligne d'en-tête d'une entrée : titre à gauche, période à droite. */
export function EntryHead({ children, start, end }: { children: ReactNode; start: string; end?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "12pt" }}>
      <div style={{ flex: "1 1 auto", minWidth: 0 }}>{children}</div>
      <DateRange start={start} end={end} />
    </div>
  );
}

/** Liste à puces du corps de CV. */
export function Bullets({ items }: { items: Array<{ id: string; rendered: string }> }) {
  if (!items.length) return null;
  return (
    <ul style={{ marginTop: "var(--gap-bullets)", display: "flex", flexDirection: "column", gap: "0pt" }}>
      {items.map((b) => (
        <li key={b.id} style={{ display: "flex", gap: "3.4pt", paddingLeft: "8.6pt" }}>
          <span aria-hidden="true" style={{ flex: "none", fontSize: "var(--t-body)", lineHeight: "var(--lh-body)", color: "var(--color-ink)" }}>
            •
          </span>
          <span style={{ fontSize: "var(--t-body)", lineHeight: "var(--lh-body)", hyphens: "auto" }}>{b.rendered}</span>
        </li>
      ))}
    </ul>
  );
}
