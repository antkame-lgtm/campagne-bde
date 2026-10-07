"use client";

import React from "react";
import { IMPACT_COMPARISONS } from "../data/mockData";
import { HelpCircle, AlertCircle, CheckCircle, TrendingUp } from "lucide-react";

export default function ImpactSection() {
  return (
    <section id="impact" className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-b border-sky-200 dark:border-sky-900/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-sky-500" />
            <span>Section 6 • Problèmes &amp; Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-600 dark:text-sky-400 tracking-tight">
            &laquo; Concrètement, ça change quoi ? &raquo;
          </h2>
          <p className="mt-4 text-base sm:text-lg text-sky-800 dark:text-sky-200 font-medium leading-relaxed">
            Pas de discours creux : nous partons des blocages réels que vous rencontrez sur le campus 
            pour y apporter des réponses pragmatiques et immédiates.
          </p>
        </div>

        {/* Grille de Comparaisons Avant / Après - Disposition aérée et épurée */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {IMPACT_COMPARISONS.map((item, idx) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900/60 hover:border-sky-300 dark:hover:border-sky-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* En-tête de cas */}
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-sky-100 dark:border-sky-900/40">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                    {item.pole}
                  </span>
                  <span className="font-mono text-xs text-sky-400 font-semibold">
                    0{idx + 1}
                  </span>
                </div>

                {/* Le constat actuel */}
                <div className="mb-5">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>Constat actuel</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {item.problem}
                  </p>
                </div>

                {/* La solution concrète */}
                <div className="mb-6">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-sky-500" />
                    <span>Notre solution avec Salimata</span>
                  </div>
                  <p className="text-sm sm:text-base text-sky-900 dark:text-sky-100 font-semibold leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>

              {/* Le gain direct */}
              <div className="pt-4 border-t border-sky-100 dark:border-sky-900/40 flex items-center space-x-2 text-xs font-semibold text-sky-600 dark:text-sky-400">
                <TrendingUp className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span>Résultat : {item.gain}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
