import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Uni & Connecté — Présidence BDE 2026",
  description: "Plateforme participative officielle de campagne et de mandat pour la présidence du Bureau des Étudiants. Votez, proposez vos idées et suivez notre programme en direct.",
  keywords: ["BDE", "Élections BDE", "Campus Uni & Connecté", "Vie étudiante", "La Voix Étudiante"],
  authors: [{ name: "Équipe Campus Uni & Connecté" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BDE 2026",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1E3A8A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full scroll-smooth antialiased">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#1E293B] transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
