import type { Identity } from "@/lib/types";
import { Meta, Pipe } from "./primitives";

export function CvHeader({ identity, headline }: { identity: Identity; headline: string }) {
  const lines = ([1, 2, 3] as const)
    .map((n) => identity.contacts.filter((c) => c.line === n))
    .filter((l) => l.length > 0);

  return (
    <header style={{ display: "flex", gap: "var(--portrait-gap)", alignItems: "flex-start" }}>
      {identity.portrait ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={identity.portrait.src}
          alt={identity.portrait.alt}
          width={148}
          height={148}
          style={{
            width: "var(--portrait-size)",
            height: "var(--portrait-size)",
            borderRadius: "6pt",
            objectFit: "cover",
            flex: "none",
          }}
        />
      ) : null}

      <div style={{ flex: "1 1 auto", minWidth: 0 }}>
        <h1 style={{ fontSize: "var(--t-name)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em" }}>
          {identity.name}
        </h1>

        <p style={{ fontSize: "var(--t-title)", fontWeight: 400, lineHeight: 1.15, marginTop: "6pt", letterSpacing: "-0.005em" }}>
          {headline}
        </p>

        {/* Ligne de contact en Geist 9 pt : arbitrage de Guilhem sur maquette.
            Le mono y coûtait de la lisibilité sans rien apporter — ce sont des
            mots, pas des codes. Les dates et organisations, elles, restent mono. */}
        <div style={{ marginTop: "9pt", display: "flex", flexDirection: "column", gap: "1pt" }}>
          {lines.map((line, i) => (
            <div key={i} style={{ lineHeight: "12pt", fontSize: "9pt" }}>
              {line.map((c, j) => (
                <span key={c.id}>
                  {j > 0 ? <Pipe /> : null}
                  {c.label}
                </span>
              ))}
            </div>
          ))}
        </div>

        {identity.portfolio ? (
          <p style={{ marginTop: "8pt", display: "flex", alignItems: "baseline", gap: "6pt" }}>
            <span style={{ fontSize: "var(--t-item)", fontWeight: 700, letterSpacing: "-0.01em" }}>
              {identity.portfolio.label} <span aria-hidden="true">→</span>
            </span>
            <Meta tone="ink" size="8.5pt">
              {identity.portfolio.href.replace(/^https?:\/\//, "")}
            </Meta>
          </p>
        ) : null}
      </div>
    </header>
  );
}
