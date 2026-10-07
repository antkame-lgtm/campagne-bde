"use client";

import React from "react";
import { Vote, MessageCircle, Heart, Shield, Share2, Globe, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Colonne 1 : Projet */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center text-white font-bold shadow-md">
                <Vote className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-base text-white block leading-tight">
                  Campus Uni &amp; Connecté
                </span>
                <span className="text-[11px] font-semibold text-[#F59E0B] tracking-wider uppercase block">
                  Présidence BDE 2026
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Pour un campus transparent, solidaire et dynamique. Co-construisons ensemble
              le mandat de demain.
            </p>

            {/* Statut Système BDE Connect */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 font-medium text-[11px]">BDE Connect : En Ligne</span>
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#vision" className="hover:text-amber-400 transition-colors">Vision &amp; Équipe</a></li>
              <li><a href="#programme" className="hover:text-amber-400 transition-colors">Programme &amp; Jauges</a></li>
              <li><a href="#voix-etudiante" className="hover:text-amber-400 transition-colors">La Voix Étudiante (Idées &amp; Vote)</a></li>
              <li><a href="#agenda" className="hover:text-amber-400 transition-colors">Agenda Événementiel</a></li>
              <li><a href="#partenariats" className="hover:text-amber-400 transition-colors">Partenaires &amp; Réductions</a></li>
              <li><a href="#sos" className="hover:text-amber-400 transition-colors">Guichet SOS Étudiant</a></li>
            </ul>
          </div>

          {/* Colonne 3 : Contacts & Urgence */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Contacts &amp; Permanences
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <strong className="text-slate-200 block">QG de Campagne :</strong>
                Foyer des étudiants / Hall B
              </li>
              <li>
                <strong className="text-slate-200 block">Email officiel :</strong>
                contact@campus-uni-connecte.fr
              </li>
              <li>
                <strong className="text-slate-200 block">Urgence SOS Étudiant :</strong>
                Permanence d&apos;écoute 7j/7 via le formulaire chiffré
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Réseaux Sociaux & Conformité */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Réseaux Sociaux Officiels
            </h4>
            <div className="flex space-x-3 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#F59E0B] hover:text-slate-950 flex items-center justify-center transition-all text-slate-300"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#3B82F6] hover:text-white flex items-center justify-center transition-all text-slate-300"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://chat.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all text-slate-300"
                title="Communauté WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center space-x-1 text-slate-300 font-semibold">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Protection des Données (RGPD)</span>
              </div>
              <p>
                Vos emails sont utilisés exclusivement pour la certification des votes uniques et ne sont jamais cédés.
              </p>
            </div>
          </div>

        </div>

        {/* Bas de page / Mentions */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 Campus Uni &amp; Connecté. Tous droits réservés. Élection du Bureau des Étudiants.
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Mentions Légales</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Politique de Confidentialité</a>
            <span>•</span>
            <span className="flex items-center space-x-1 text-slate-400">
              <span>Fait avec</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>pour le campus</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
