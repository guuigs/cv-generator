import type { ReactNode } from "react";

export const INK = "#161412";
export const PROSE = "#3a352e";
export const MUTED = "#6f6a61";
export const FAINT = "#a39c8f";
export const RULE = "#e4dfd4";
export const PAPER = "#fffdf9";
export const FLAG_BG = "#faf1e6";
export const FLAG_BORDER = "#e2c9a0";
export const FLAG_INK = "#7a4a12";
export const OK_BG = "#eef3e8";
export const OK_BORDER = "#c9d9b8";
export const OK_INK = "#3f5e2a";

const mono: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
};

/** Étiquette de section, en mono capitale — même grammaire que le CV. */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <div style={{ ...mono, fontSize: "8.5pt", letterSpacing: "0.09em", textTransform: "uppercase", color: MUTED }}>
      {children}
    </div>
  );
}

export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      style={{
        fontSize: "19pt", fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.15,
        color: INK, marginTop: "30pt", marginBottom: "4pt",
        breakAfter: "avoid",
      }}
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 style={{ fontSize: "12.5pt", fontWeight: 700, letterSpacing: "-0.005em", color: INK, breakAfter: "avoid" }}>
      {children}
    </h3>
  );
}

export function Lede({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontSize: "10pt", lineHeight: 1.55, color: MUTED, marginTop: "3pt", marginBottom: "14pt", maxWidth: "94ch" }}>
      {children}
    </p>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p style={{ fontSize: "9.6pt", lineHeight: 1.55, color: PROSE }}>{children}</p>;
}

export function Meta({ children }: { children: ReactNode }) {
  return <span style={{ ...mono, fontSize: "8.3pt", color: MUTED }}>{children}</span>;
}

/** Le bloc « regard critique » : distinct visuellement, jamais fondu dans la prose neutre. */
export function Critique({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        marginTop: "8pt", padding: "8pt 11pt", background: "#f5f2ea", borderLeft: `2pt solid ${FAINT}`,
        breakInside: "avoid",
      }}
    >
      <div style={{ ...mono, fontSize: "7.3pt", letterSpacing: "0.08em", textTransform: "uppercase", color: MUTED, marginBottom: "3pt" }}>
        Regard critique
      </div>
      <p style={{ fontSize: "9pt", lineHeight: 1.5, color: PROSE, margin: 0 }}>{children}</p>
    </div>
  );
}

/** Signale un fait incertain, contradictoire ou manquant — jamais silencieux. */
export function Flag({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      style={{
        marginTop: "8pt", padding: "8pt 11pt", background: FLAG_BG, border: `0.75pt solid ${FLAG_BORDER}`,
        borderRadius: "3pt", breakInside: "avoid",
      }}
    >
      <div style={{ ...mono, fontSize: "7.3pt", letterSpacing: "0.08em", textTransform: "uppercase", color: FLAG_INK, marginBottom: "3pt" }}>
        À vérifier — {title}
      </div>
      <p style={{ fontSize: "9pt", lineHeight: 1.5, color: "#4a3512", margin: 0 }}>{children}</p>
    </div>
  );
}

export function Proof({ children }: { children: ReactNode }) {
  return (
    <p style={{ marginTop: "6pt", fontSize: "8.6pt", lineHeight: 1.5, color: MUTED }}>
      <span style={{ ...mono, fontSize: "7.3pt", letterSpacing: "0.06em", textTransform: "uppercase", color: FAINT }}>Preuves </span>
      {children}
    </p>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul style={{ marginTop: "6pt", display: "flex", flexDirection: "column", gap: "3pt" }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: "flex", gap: "6pt", fontSize: "9.3pt", lineHeight: 1.5, color: PROSE }}>
          <span aria-hidden="true" style={{ flex: "none", color: FAINT }}>—</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div style={{ breakInside: "avoid", marginTop: "16pt", paddingTop: "14pt", borderTop: `0.75pt solid ${RULE}` }}>
      {children}
    </div>
  );
}

export function StatusPill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "warn" }) {
  const bg = tone === "warn" ? FLAG_BG : "#eeeae1";
  const fg = tone === "warn" ? FLAG_INK : MUTED;
  const bd = tone === "warn" ? FLAG_BORDER : RULE;
  return (
    <span
      style={{
        ...mono, fontSize: "7.3pt", letterSpacing: "0.06em", textTransform: "uppercase",
        color: fg, background: bg, border: `0.75pt solid ${bd}`, borderRadius: "3pt", padding: "2pt 6pt",
      }}
    >
      {children}
    </span>
  );
}
