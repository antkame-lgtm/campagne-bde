"use client";

import React, { useState } from "react";
import { Menu, X, MessageCircle, Sun, Moon } from "lucide-react";

export type ColorTheme = "navy";

interface NavbarProps {
  isDark: boolean;
  onToggleDark: () => void;
  colorTheme?: ColorTheme;
  onChangeColorTheme?: (theme: ColorTheme) => void;
}

export default function Navbar({
  isDark,
  onToggleDark,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_LINK ||
    "https://whatsapp.com/channel/0029VbDdkdR0Qeaelvy0fl2g";

  const navLinks = [
    { label: "Qui sommes-nous ?", href: "#qui-sommes-nous" },
    { label: "Notre Vision", href: "#vision" },
    { label: "Programme de l'année", href: "#programme" },
    { label: "Calendrier", href: "#calendrier" },
    { label: "Ça change quoi ?", href: "#impact" },
    { label: "Boîte à idées", href: "#avis" },
    { label: "FAQ & soutien", href: "#faq" },
    { label: "Photos", href: "#photos" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#020c1b]/95 backdrop-blur-md border-b border-sky-200/80 dark:border-sky-900/60 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Logo officiel & Identification de la liste de Salimata */}
          <a href="#" className="flex items-center space-x-2.5 sm:space-x-3.5 group shrink-0 min-w-0">
            <div className="h-9 sm:h-11 px-2 py-1 rounded-xl bg-white dark:bg-white/95 flex items-center justify-center border border-sky-200 dark:border-white/20 shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/images/logo-nexus.png"
                alt="Logo NEXUS 360° • TgMaster University"
                className="h-6 sm:h-7.5 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span className="font-black text-sm sm:text-base text-sky-700 dark:text-sky-300 tracking-tight leading-none whitespace-nowrap">
                Salimata <span className="text-sky-500 font-extrabold">• BDE 2026</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-sky-500 dark:text-sky-400 tracking-wider uppercase hidden sm:block whitespace-nowrap mt-1">
                Une nouvelle énergie étudiante
              </span>
            </div>
          </a>

          {/* Navigation Desktop */}
          <nav className="hidden xl:flex items-center space-x-1" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs xl:text-sm font-bold text-sky-800 dark:text-sky-200 hover:text-sky-500 dark:hover:text-white px-3 py-2 rounded-xl hover:bg-sky-50 dark:hover:bg-slate-900/80 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions Desktop : Mode Sombre + WhatsApp */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Bouton Toggle Mode Sombre */}
            <button
              onClick={onToggleDark}
              className="p-2.5 rounded-xl border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-900 transition-all cursor-pointer shadow-2xs active:scale-95"
              title={isDark ? "Basculer en mode clair" : "Basculer en mode sombre"}
              aria-label="Basculer le mode sombre"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              ) : (
                <Moon className="w-4 h-4 text-sky-700" />
              )}
            </button>

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-bold px-4.5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white shadow-md shadow-sky-900/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-sky-200" />
                <span>Rejoindre la communauté</span>
              </a>
            ) : (
              <span className="text-xs font-medium text-sky-600 dark:text-sky-400">Lien WhatsApp à configurer</span>
            )}
          </div>

          {/* Boutons Mobile */}
          <div className="flex sm:hidden items-center space-x-2 shrink-0">
            {/* Bouton Dark mode (Mobile) */}
            <button
              onClick={onToggleDark}
              className="p-2 rounded-xl border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 shrink-0"
              aria-label="Basculer le mode sombre"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-700" />}
            </button>

            {/* Menu Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-900 focus:outline-none shrink-0"
              aria-label="Menu de navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Menu Hamburger pour tablette (lg) si caché sur grand écran */}
          <div className="hidden sm:flex xl:hidden items-center space-x-2">
            <button
              onClick={onToggleDark}
              className="p-2.5 rounded-xl border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 shrink-0"
              aria-label="Basculer le mode sombre"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-700" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-900 focus:outline-none shrink-0"
              aria-label="Menu de navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Menu Déroulant Mobile */}
      {isOpen && (
        <div className="xl:hidden border-b border-sky-200 dark:border-sky-900 bg-white dark:bg-[#020c1b] px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold text-sky-800 dark:text-sky-200 hover:text-sky-500 dark:hover:text-white px-3 py-2.5 rounded-xl hover:bg-sky-50 dark:hover:bg-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-sky-100 dark:border-sky-900 flex flex-col gap-2.5">
            <button
              onClick={onToggleDark}
              className="w-full flex items-center justify-center space-x-2 text-xs font-bold py-2.5 rounded-xl border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-900 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-700" />}
              <span>{isDark ? "Mode Clair" : "Mode Sombre"}</span>
            </button>

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 text-sm font-bold py-3 rounded-xl bg-sky-700 hover:bg-sky-800 text-white shadow-md shadow-sky-900/20 active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-4 h-4 text-sky-200" />
                <span>Rejoindre la communauté WhatsApp</span>
              </a>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
}
