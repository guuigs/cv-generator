import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

/**
 * Deux polices, deux rôles :
 *   Geist          → l'information principale (nom, intitulés, corps de texte)
 *   DepartureMono  → l'information secondaire (dates, méta, tags, compétences)
 */
const departureMono = localFont({
  src: "../fonts/DepartureMono-Regular.woff2",
  variable: "--font-departure-mono",
  weight: "400",
  style: "normal",
  display: "block",
});

export const metadata: Metadata = {
  title: "CV — Guilhem Terrier",
  description: "Générateur de CV adapté à l'offre, sans jamais rien inventer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${departureMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
