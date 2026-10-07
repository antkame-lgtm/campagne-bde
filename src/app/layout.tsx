import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Uni & Connecté — Présidence BDE 2026",
  description: "Plateforme participative officielle de campagne et de mandat pour la présidence du Bureau des Étudiants. Votez, proposez vos idées et suivez notre programme en direct.",
  keywords: ["BDE", "Élections BDE", "Campus Uni & Connecté", "Vie étudiante", "La Voix Étudiante"],
  authors: [{ name: "Équipe Campus Uni & Connecté" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#1E293B]">
        {children}
      </body>
    </html>
  );
}
