"use client";

import React from "react";
import { IMPACT_COMPARISONS } from "../data/mockData";
import { HelpCircle, AlertCircle, CheckCircle } from "lucide-react";

export default function ImpactSection() {
  return (
    <section id="impact" className="py-16 sm:py-24 bg-white dark:bg-[#020c1b] border-b border-sky-200/80 dark:border-sky-900/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Section 6 • Problèmes &amp; Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-700 dark:text-sky-300 tracking-tight [text-wrap:balance]">
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
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#041833]/80 border border-sky-200/80 dark:border-sky-800/80 hover:border-sky-400 dark:hover:border-sky-600 shadow-xs hover:shadow-xl hover:shadow-sky-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* En-tête de cas */}
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-sky-100 dark:border-sky-900/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                    {item.pole}
                  </span>
                  <span className="font-mono text-xs text-sky-600 dark:text-sky-400 font-bold px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950 border border-sky-200/60 dark:border-sky-800">
                    0{idx + 1}
                  </span>
                </div>

                {/* Le constat actuel */}
                <div className="mb-5 p-4 rounded-2xl bg-slate-50 dark:bg-[#020c1b]/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                    <span>Constat actuel</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {item.problem}
                  </p>
                </div>

                {/* La solution concrète */}
                <div className="mb-6 p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider mb-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <span>Notre solution avec Salimata</span>
                  </div>
                  <p className="text-sm font-semibold text-sky-900 dark:text-sky-100 leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>

              {/* Bénéfice concret attendu */}
              <div className="pt-4 border-t border-sky-100 dark:border-sky-900/60 flex items-center justify-between text-xs">
                <span className="font-medium text-sky-800/80 dark:text-sky-300">
                  Bénéfice concret :
                </span>
                <span className="font-bold text-sky-700 dark:text-sky-200 bg-sky-50 dark:bg-sky-950 px-2.5 py-1 rounded-lg border border-sky-200/80 dark:border-sky-800">
                  {item.gain}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
