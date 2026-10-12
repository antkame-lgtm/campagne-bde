"use client";

import React from "react";
import { User, CheckCircle2, ArrowRight } from "lucide-react";
import { CANDIDATE_INFO, MANDATE_POLES } from "../data/mockData";

export default function AboutSection() {
  return (
    <section id="qui-sommes-nous" className="py-20 sm:py-28 bg-white dark:bg-[#020c1b] border-b border-sky-200/80 dark:border-sky-900/60 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête aéré */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-sky-200 dark:border-sky-800 shadow-2xs">
            <User className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Section 2 • Qui sommes-nous ?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-700 dark:text-sky-300 tracking-tight [text-wrap:balance]">
            Présentation de Salimata &amp; les différents pôles
          </h2>
          <p className="mt-3 text-base text-sky-800 dark:text-sky-200 font-medium leading-relaxed">
            Une candidature née d&apos;un constat lucide sur le terrain et portée par la volonté 
            d&apos;agir concrètement pour tous les étudiants de TG Master University.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Colonne Gauche : Parcours & Convictions (Fluide, typographique, sans boîtes superposées) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-sky-700 dark:text-sky-300">
                Mon parcours en quelques lignes
              </h3>
              <p className="text-base text-sky-800/90 dark:text-sky-200 leading-relaxed font-medium">
                {CANDIDATE_INFO.bio}
              </p>
            </div>

            <div className="pt-4 border-t border-sky-100 dark:border-sky-900/60 space-y-4">
              <h3 className="text-xl font-bold text-sky-700 dark:text-sky-300">
                Pourquoi je me présente
              </h3>
              
              <ul className="space-y-3.5">
                {CANDIDATE_INFO.whyRunning.map((reason, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm sm:text-base text-sky-800 dark:text-sky-200 font-medium leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Colonne Droite : Les différents Pôles en liste épurée et légère */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-sky-50/70 dark:bg-[#041833]/80 border border-sky-200 dark:border-sky-800/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-sky-200/80 dark:border-sky-800">
              <h3 className="text-sm font-black uppercase tracking-wider text-sky-700 dark:text-sky-300">
                Les Différents Pôles
              </h3>
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                Mandat 2026-2027
              </span>
            </div>

            <div className="divide-y divide-sky-100 dark:divide-sky-900/60">
              {MANDATE_POLES.map((pole) => (
                <div
                  key={pole.id}
                  className="py-3.5 first:pt-0 last:pb-0 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                      PÔLE {pole.number}
                    </span>
                    <span className="text-xs text-sky-700 dark:text-sky-300 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                      <span>Découvrir</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-sky-700 dark:text-sky-200 mt-0.5">
                    {pole.title}
                  </h4>
                  <p className="text-xs text-sky-800/80 dark:text-sky-300 font-medium mt-1 leading-relaxed">
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
