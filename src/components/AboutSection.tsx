"use client";

import React from "react";
import { User, CheckCircle2, Compass, Layers, Heart } from "lucide-react";
import { CANDIDATE_INFO, MANDATE_POLES } from "../data/mockData";

export default function AboutSection() {
  return (
    <section id="qui-sommes-nous" className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-b border-sky-200 dark:border-sky-900/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200 dark:border-sky-800">
            <User className="w-3.5 h-3.5 text-sky-500" />
            <span>Section 2 • Qui sommes-nous ?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-600 dark:text-sky-400 tracking-tight">
            Faire connaissance avec Salimata &amp; l&apos;équipe
          </h2>
          <p className="mt-3 text-base text-sky-800 dark:text-sky-200 font-medium">
            Une candidature née d&apos;un constat lucide sur le terrain et portée par la volonté 
            d&apos;agir concrètement pour tous les étudiants.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Colonne Gauche : Parcours & « Pourquoi je me présente » */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Le Parcours en quelques lignes */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-sky-600 dark:text-sky-400">
                <Compass className="w-4 h-4 text-sky-500" />
                <span>Mon Parcours Étudiant</span>
              </div>
              <h3 className="text-xl font-bold text-sky-700 dark:text-sky-300">
                Engagée pour notre communauté depuis le premier jour.
              </h3>
              <p className="text-sm text-sky-800 dark:text-sky-200 leading-relaxed font-medium">
                {CANDIDATE_INFO.bio}
              </p>
            </div>

            {/* « Pourquoi je me présente » */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-sky-600 dark:text-sky-400">
                <Heart className="w-4 h-4 text-sky-500" />
                <span>Pourquoi je me présente</span>
              </div>
              <h3 className="text-xl font-bold text-sky-700 dark:text-sky-300">
                Trois convictions inébranlables qui guident ma candidature :
              </h3>
              
              <ul className="space-y-3 pt-2">
                {CANDIDATE_INFO.whyRunning.map((reason, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-sky-800 dark:text-sky-200 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Colonne Droite : Les 5 Pôles Opérationnels */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-sky-200 dark:border-sky-800">
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-sky-700 dark:text-sky-300">
                <Layers className="w-4 h-4 text-sky-500" />
                <span>Les Pôles de Notre Équipe</span>
              </div>
              <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-bold">
                5 Pôles Dédiés
              </span>
            </div>

            <p className="text-xs text-sky-700 dark:text-sky-300 font-medium leading-relaxed mb-4">
              Pour assurer un suivi rigoureux, notre équipe est structurée en pôles opérationnels clairs :
            </p>

            <div className="space-y-3">
              {MANDATE_POLES.map((pole) => (
                <div
                  key={pole.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800 shadow-xs hover:border-sky-400 dark:hover:border-sky-600 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-sky-500 dark:text-sky-400">
                      PÔLE {pole.number}
                    </span>
                    <span className="text-[11px] font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                      Opérationnel
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-sky-700 dark:text-sky-200">
                    {pole.title}
                  </h4>
                  <p className="text-xs text-sky-800 dark:text-sky-300 font-medium mt-1 leading-relaxed">
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
