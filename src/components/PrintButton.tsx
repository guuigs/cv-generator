"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      style={{
        fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.06em",
        textTransform: "uppercase", border: "1px solid #1a1a1a", background: "#1a1a1a",
        color: "#fff", padding: "7px 12px", borderRadius: "5px", cursor: "pointer",
      }}
    >
      Imprimer / PDF
    </button>
  );
}
