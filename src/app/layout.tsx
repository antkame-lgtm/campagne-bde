import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salimata • Présidence BDE 2026 — Une nouvelle énergie étudiante",
  description: "Plateforme officielle de campagne de Salimata pour la présidence du BDE TgMaster University. Découvrez le programme et participez à la boîte à idées.",
  keywords: ["BDE", "Élections BDE", "Salimata", "TgMaster University", "Vie étudiante", "BDE 2026"],
  authors: [{ name: "Équipe de campagne Salimata" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Salimata BDE 2026",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#03224c",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full scroll-smooth antialiased" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var d = localStorage.getItem('theme');
                if (d === 'dark') {
                  document.documentElement.classList.add('dark');
                } else if (d === 'light') {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            })();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
