"use client";

import React from "react";
import { Vote, MessageCircle, Heart, Shield } from "lucide-react";
import { CANDIDATE_INFO } from "../data/mockData";

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
                  {CANDIDATE_INFO.name} • BDE 2026
                </span>
                <span className="text-[11px] font-semibold text-[#F59E0B] tracking-wider uppercase block">
                  {CANDIDATE_INFO.slogan}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Une communauté étudiante plus dynamique, plus ambitieuse et plus proche de ses étudiants. 
              Pour un mandat transparent, solidaire et fédérateur.
            </p>

            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 font-medium text-[11px]">Plateforme Officielle de Campagne</span>
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides vers les 7 Sections */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Programme &amp; Sections
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#qui-sommes-nous" className="hover:text-amber-400 transition-colors">1. Qui sommes-nous ?</a></li>
              <li><a href="#vision" className="hover:text-amber-400 transition-colors">2. Notre vision</a></li>
              <li><a href="#programme" className="hover:text-amber-400 transition-colors">3. Notre programme (5 pôles)</a></li>
              <li><a href="#calendrier" className="hover:text-amber-400 transition-colors">4. Notre calendrier</a></li>
              <li><a href="#impact" className="hover:text-amber-400 transition-colors">5. Ça change quoi ?</a></li>
              <li><a href="#avis" className="hover:text-amber-400 transition-colors">6. Donnez-nous votre avis</a></li>
            </ul>
          </div>

          {/* Colonne 3 : Contacts & Permanences */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Permanences &amp; Écoute
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <strong className="text-slate-200 block">QG de Campagne :</strong>
                Hall d&apos;accueil et foyer étudiant
              </li>
              <li>
                <strong className="text-slate-200 block">Équipe de Salimata :</strong>
                Permanence d&apos;écoute et de discussion libre
              </li>
              <li>
                <strong className="text-slate-200 block">Scrutin officiel :</strong>
                Vendredi 23 octobre 2026 de 08h00 à 18h00
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Réseaux & RGPD */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Rejoindre la Dynamique
            </h4>
            <div className="flex space-x-3 mb-6">
              <a
                href="https://chat.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                title="Groupe WhatsApp officiel"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Groupe WhatsApp Officiel</span>
              </a>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center space-x-1 text-slate-300 font-semibold">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Protection des Données (RGPD)</span>
              </div>
              <p>
                Vos avis et votes sont certifiés par email institutionnel et ne font l&apos;objet d&apos;aucun traçage commercial.
              </p>
            </div>
          </div>

        </div>

        {/* Bas de page / Mentions */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 Campagne {CANDIDATE_INFO.name} • Tous droits réservés. Élection du Bureau des Étudiants.
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Mentions Légales</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Charte Électorale</a>
            <span>•</span>
            <span className="flex items-center space-x-1 text-slate-400">
              <span>Fait avec</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>pour tous les étudiants</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
