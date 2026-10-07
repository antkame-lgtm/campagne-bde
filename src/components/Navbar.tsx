"use client";

import React, { useState } from "react";
import { Menu, X, MessageCircle, Sparkles, Vote, Sun, Moon, HelpCircle } from "lucide-react";

interface NavbarProps {
  onOpenStoryModal: () => void;
  onOpenQuizModal: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export default function Navbar({
  onOpenStoryModal,
  onOpenQuizModal,
  isDark,
  onToggleDark,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Vision", href: "#vision" },
    { label: "Programme", href: "#programme" },
    { label: "La Voix Étudiante", href: "#voix-etudiante" },
    { label: "Agenda", href: "#agenda" },
    { label: "Partenariats", href: "#partenariats" },
    { label: "SOS Étudiant", href: "#sos" },
    { label: "Guide du Vote", href: "#elections" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo officiel */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg text-[#1E3A8A] dark:text-blue-400 tracking-tight block leading-tight">
                Campus Uni &amp; Connecté
              </span>
              <span className="text-[11px] font-semibold text-[#F59E0B] tracking-wider uppercase block">
                Présidence BDE 2026
              </span>
            </div>
          </a>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs xl:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#1E3A8A] dark:hover:text-blue-400 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Actions Desktop */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* Toggle Mode Sombre */}
            <button
              onClick={onToggleDark}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              title={isDark ? "Mode Clair" : "Mode Sombre"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Bouton Quiz Rapide */}
            <button
              onClick={onOpenQuizModal}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#1E3A8A] dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all shadow-xs cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-blue-400" />
              <span>Quiz 30s</span>
            </button>

            {/* Bouton Story Instagram */}
            <button
              onClick={onOpenStoryModal}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Générateur Story</span>
            </button>

            {/* WhatsApp */}
            <a
              href="https://chat.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-xl bg-[#1E3A8A] text-white hover:bg-[#172554] shadow-md shadow-blue-900/20 transition-all hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Bouton Menu Burger Mobile */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onToggleDark}
              className="p-2 text-slate-500 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-800"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Menu de navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Déroulant Mobile */}
      {isOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-[#1E3A8A] dark:hover:text-blue-400 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-2">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenQuizModal();
              }}
              className="w-full flex items-center justify-center space-x-2 text-sm font-bold py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#1E3A8A] dark:text-blue-300 border border-blue-200 dark:border-blue-800"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Faire le Quiz Électoral (30s)</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenStoryModal();
              }}
              className="w-full flex items-center justify-center space-x-2 text-sm font-bold py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
            >
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>Créer ma Story Instagram (9:16)</span>
            </button>

            <a
              href="https://chat.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 text-sm font-bold py-2.5 rounded-xl bg-[#1E3A8A] text-white shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>Rejoindre la Communauté WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
