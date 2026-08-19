import type { ReactNode } from "react";
import { Mark, type MarkName } from "./marks";

export function Section({
  title, mark, gap = "var(--gap-entry)", children,
}: {
  title: string;
  mark: MarkName;
  /** Espacement entre entrées — les formations sont plus serrées. */
  gap?: string;
  children: ReactNode;
}) {
  return (
    <section style={{ marginTop: "var(--gap-section)", flexShrink: 0 }}>
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6pt",
          fontSize: "var(--t-title)",
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: "-0.005em",
          marginBottom: "var(--gap-title)",
        }}
      >
        <Mark name={mark} />
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap }}>{children}</div>
    </section>
  );
}
