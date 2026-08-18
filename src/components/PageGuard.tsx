"use client";

import { useEffect, useState } from "react";

const A4_HEIGHT_PT = 841.89;
const PT = 96 / 72;

/**
 * Garde-fou de mise en page : signale à l'écran (jamais à l'impression)
 * qu'une page déborde. Un CV qui déborde d'1 mm est un CV à 2 pages.
 */
export function PageGuard() {
  const [overflow, setOverflow] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const el = document.querySelector<HTMLElement>(".cv-page");
      if (!el) return;
      const excess = el.getBoundingClientRect().height - A4_HEIGHT_PT * PT;
      setOverflow(excess > 1 ? excess / PT : null);
    };
    measure();
    const ro = new ResizeObserver(measure);
    const el = document.querySelector(".cv-page");
    if (el) ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  if (overflow === null) return null;

  return (
    <div
      className="no-print"
      style={{
        position: "fixed", bottom: "16px", left: "16px", zIndex: 50,
        background: "#1a1a1a", color: "#fff", padding: "8px 12px", borderRadius: "6px",
        fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.02em",
      }}
    >
      débordement : {overflow.toFixed(0)}pt — baissez `density` ou `limits` dans le profil
    </div>
  );
}
