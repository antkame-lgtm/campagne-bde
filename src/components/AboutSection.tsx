"use client";

import React from "react";
import { User, CheckCircle2, Compass, Layers, Heart, Shield } from "lucide-react";
import { CANDIDATE_INFO, MANDATE_POLES } from "../data/mockData";

export default function AboutSection() {
  return (
    <section id="qui-sommes-nous" className="py-16 sm:py-24 bg-[#F8FAFC] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-[#1E3A8A] dark:text-blue-300 rounded-md text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200/60 dark:border-blue-900/40">
            <User className="w-3.5 h-3.5" />
            <span>Section 2 • Qui sommes-nous ?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Faire connaissance avec Salimata &amp; l&apos;équipe
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Une candidature née d&apos;un constat lucide sur le terrain et portée par la volonté 
            d&apos;agir concrètement pour tous les étudiants.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Colonne Gauche : Parcours & « Pourquoi je me présente » */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Le Parcours en quelques lignes */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-[#1E3A8A] dark:text-blue-400">
                <Compass className="w-4 h-4" />
                <span>Mon Parcours Étudiant</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Engagée pour notre communauté depuis le premier jour.
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {CANDIDATE_INFO.bio}
              </p>
            </div>

            {/* « Pourquoi je me présente » */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-[#D97706] dark:text-amber-400">
                <Heart className="w-4 h-4" />
                <span>Pourquoi je me présente</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Trois convictions inébranlables qui guident ma candidature :
              </h3>
              
              <ul className="space-y-3 pt-2">
                {CANDIDATE_INFO.whyRunning.map((reason, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-[#1E3A8A] dark:text-blue-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Colonne Droite : Les Différents Pôles Opérationnels */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                <Layers className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400" />
                <span>Les Pôles de Notre Équipe</span>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                5 Pôles Dédiés
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Pour assurer un suivi rigoureux, notre équipe est structurée en pôles opérationnels clairs :
            </p>

            <div className="space-y-3">
              {MANDATE_POLES.map((pole) => (
                <div
                  key={pole.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-[#1E3A8A] dark:text-blue-400">
                      PÔLE {pole.number}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                      Actif
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {pole.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {pole.summary}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
