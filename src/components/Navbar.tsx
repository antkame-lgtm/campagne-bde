"use client";

import React, { useState } from "react";
import { Menu, X, MessageCircle, Sparkles, Vote, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onOpenStoryModal: () => void;
}

export default function Navbar({ onOpenStoryModal }: NavbarProps) {
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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo officiel */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg text-[#1E3A8A] tracking-tight block leading-tight">
                Campus Uni & Connecté
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
                className="text-xs xl:text-sm font-medium text-slate-700 hover:text-[#1E3A8A] px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Actions Desktop */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenStoryModal}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Générateur Story</span>
            </button>

            <a
              href="https://chat.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-lg bg-[#1E3A8A] text-white hover:bg-[#172554] shadow-md shadow-blue-900/20 transition-all hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>WhatsApp Officiel</span>
            </a>
          </div>

          {/* Bouton Menu Burger Mobile */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onOpenStoryModal}
              className="p-2 text-amber-600 bg-amber-50 rounded-lg border border-amber-200 text-xs font-bold flex items-center space-x-1"
            >
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span className="sr-only">Story</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Menu de navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Déroulant Mobile */}
      {isOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-slate-800 hover:text-[#1E3A8A] px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenStoryModal();
              }}
              className="w-full flex items-center justify-center space-x-2 text-sm font-bold py-2.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200"
            >
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>Créer ma Story Instagram (9:16)</span>
            </button>

            <a
              href="https://chat.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 text-sm font-bold py-2.5 rounded-lg bg-[#1E3A8A] text-white shadow-md"
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
