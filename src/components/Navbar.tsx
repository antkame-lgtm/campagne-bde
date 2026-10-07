"use client";

import React, { useState } from "react";
import { Menu, X, MessageCircle, Vote, Sun, Moon } from "lucide-react";

interface NavbarProps {
  isDark: boolean;
  onToggleDark: () => void;
}

export default function Navbar({ isDark, onToggleDark }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Qui sommes-nous ?", href: "#qui-sommes-nous" },
    { label: "Notre Vision", href: "#vision" },
    { label: "Programme", href: "#programme" },
    { label: "Calendrier", href: "#calendrier" },
    { label: "Ça change quoi ?", href: "#impact" },
    { label: "Donnez votre avis", href: "#avis" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-sky-100 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo officiel & Identification de la liste de Salimata */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight block leading-tight">
                Salimata <span className="text-sky-600 dark:text-sky-400">• BDE 2026</span>
              </span>
              <span className="text-[11px] font-bold text-sky-500 dark:text-sky-300 tracking-wider uppercase block">
                Une nouvelle énergie étudiante
              </span>
            </div>
          </a>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs xl:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 px-3 py-2 rounded-xl hover:bg-sky-50/70 dark:hover:bg-slate-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions Desktop */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Toggle Mode Sombre */}
            <button
              onClick={onToggleDark}
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800 border border-sky-100 dark:border-slate-800 transition-all cursor-pointer"
              title={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
              aria-label="Basculer le thème"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Canal de communication officiel WhatsApp */}
            <a
              href="https://chat.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/25 active:scale-[0.99] transition-all"
            >
              <MessageCircle className="w-4 h-4 text-sky-100" />
              <span>Rejoindre l&apos;équipe</span>
            </a>
          </div>

          {/* Boutons Mobile */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onToggleDark}
              className="p-2 text-slate-500 dark:text-slate-300 rounded-lg border border-sky-100 dark:border-slate-800"
              aria-label="Basculer le thème"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Menu de navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Déroulant Mobile */}
      {isOpen && (
        <div className="lg:hidden border-b border-sky-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 px-3 py-2.5 rounded-lg hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-sky-100 dark:border-slate-800">
            <a
              href="https://chat.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 text-sm font-bold py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/20"
            >
              <MessageCircle className="w-4 h-4 text-sky-100" />
              <span>Rejoindre la Communauté WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
