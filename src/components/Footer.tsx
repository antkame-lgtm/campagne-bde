"use client";

import React from "react";
import { Vote, MessageCircle, Heart, Shield } from "lucide-react";
import { CANDIDATE_INFO } from "../data/mockData";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 text-sky-800 dark:text-sky-200 border-t border-sky-200 dark:border-sky-900/60 pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Colonne 1 : Projet */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white font-bold shadow-md shadow-sky-500/20">
                <Vote className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-base text-sky-700 dark:text-sky-300 block leading-tight">
                  {CANDIDATE_INFO.name} <span className="text-sky-500">• BDE 2026</span>
                </span>
                <span className="text-[11px] font-bold text-sky-500 dark:text-sky-400 tracking-wider uppercase block">
                  {CANDIDATE_INFO.slogan}
                </span>
              </div>
            </div>

            <p className="text-xs text-sky-800 dark:text-sky-300 font-medium leading-relaxed">
              Une communauté étudiante plus dynamique, plus ambitieuse et plus proche de ses étudiants. 
              Pour un mandat transparent, solidaire et fédérateur.
            </p>

            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-slate-900 border border-sky-200 dark:border-sky-800 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span className="text-sky-700 dark:text-sky-300 font-bold text-[11px]">Plateforme Officielle de Campagne</span>
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides vers les 7 Sections */}
          <div>
            <h4 className="text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider mb-4">
              Programme &amp; Sections
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#qui-sommes-nous" className="hover:text-sky-500 dark:hover:text-white font-medium text-sky-700 dark:text-sky-300 transition-colors">1. Qui sommes-nous ?</a></li>
              <li><a href="#vision" className="hover:text-sky-500 dark:hover:text-white font-medium text-sky-700 dark:text-sky-300 transition-colors">2. Notre vision</a></li>
              <li><a href="#programme" className="hover:text-sky-500 dark:hover:text-white font-medium text-sky-700 dark:text-sky-300 transition-colors">3. Notre programme</a></li>
              <li><a href="#calendrier" className="hover:text-sky-500 dark:hover:text-white font-medium text-sky-700 dark:text-sky-300 transition-colors">4. Notre calendrier</a></li>
              <li><a href="#impact" className="hover:text-sky-500 dark:hover:text-white font-medium text-sky-700 dark:text-sky-300 transition-colors">5. Ça change quoi ?</a></li>
              <li><a href="#avis" className="hover:text-sky-500 dark:hover:text-white font-medium text-sky-700 dark:text-sky-300 transition-colors">6. Donnez-nous votre avis</a></li>
              <li><a href="#photos" className="hover:text-sky-500 dark:hover:text-white font-medium text-sky-700 dark:text-sky-300 transition-colors">7. Photos &amp; au SAMI</a></li>
            </ul>
          </div>

          {/* Colonne 3 : Contacts & Permanences */}
          <div>
            <h4 className="text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider mb-4">
              Permanences &amp; Écoute
            </h4>
            <ul className="space-y-2.5 text-xs text-sky-800 dark:text-sky-300">
              <li>
                <strong className="text-sky-700 dark:text-sky-200 block">Sur le terrain :</strong>
                Hall d&apos;accueil, foyer étudiant et au SAMI
              </li>
              <li>
                <strong className="text-sky-700 dark:text-sky-200 block">Rencontres :</strong>
                Permanence d&apos;écoute et de discussion libre
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Réseaux & RGPD */}
          <div>
            <h4 className="text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider mb-4">
              Rejoindre la Dynamique
            </h4>
            <div className="flex space-x-3 mb-6">
              <a
                href="https://chat.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-all shadow-md shadow-sky-500/25"
                title="Groupe WhatsApp officiel"
              >
                <MessageCircle className="w-4 h-4 text-sky-100" />
                <span>Groupe WhatsApp Officiel</span>
              </a>
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-slate-900 border border-sky-200 dark:border-sky-800 text-[11px] text-sky-800 dark:text-sky-300 space-y-1">
              <div className="flex items-center space-x-1.5 text-sky-700 dark:text-sky-300 font-bold">
                <Shield className="w-3.5 h-3.5 text-sky-500" />
                <span>Protection des Données (RGPD)</span>
              </div>
              <p className="font-medium">
                Vos avis et votes sont certifiés par email institutionnel et ne font l&apos;objet d&apos;aucun traçage commercial.
              </p>
            </div>
          </div>

        </div>

        {/* Bas de page / Mentions */}
        <div className="pt-8 border-t border-sky-100 dark:border-sky-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-sky-600 dark:text-sky-400 gap-4">
          <div className="font-medium">
            © 2026 Campagne {CANDIDATE_INFO.name} • Tous droits réservés. Élection du Bureau des Étudiants.
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-sky-700 dark:hover:text-white transition-colors font-medium">Mentions Légales</a>
            <span>•</span>
            <a href="#" className="hover:text-sky-700 dark:hover:text-white transition-colors font-medium">Charte Électorale</a>
            <span>•</span>
            <span className="flex items-center space-x-1 text-sky-600 dark:text-sky-400 font-medium">
              <span>Fait avec</span>
              <Heart className="w-3 h-3 text-sky-500 fill-sky-500" />
              <span>pour tous les étudiants</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
