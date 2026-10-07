"use client";

import React from "react";
import { IMPACT_COMPARISONS } from "../data/mockData";
import { HelpCircle, AlertCircle, CheckCircle, ArrowRight, Sparkles, TrendingUp } from "lucide-react";

export default function ImpactSection() {
  return (
    <section id="impact" className="py-16 sm:py-24 bg-[#F8FAFC] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/60 text-[#D97706] dark:text-amber-400 border border-amber-200 dark:border-amber-900/50 rounded-md text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Section 6 • Problèmes &amp; Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            &laquo; Concrètement, ça change quoi ? &raquo;
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Pas de discours creux : nous partons des blocages réels que vous rencontrez sur le campus 
            pour y apporter des réponses pragmatiques et immédiates.
          </p>
        </div>

        {/* Grille de Comparaisons Avant / Après */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {IMPACT_COMPARISONS.map((item, idx) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-md"
            >
              <div className="space-y-5">
                {/* Badge du Pôle */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase text-[#1E3A8A] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-200/50 dark:border-blue-900/40">
                    {item.pole}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    Cas 0{idx + 1}
                  </span>
                </div>

                {/* Le Problème Actuel */}
                <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/30 space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Le problème aujourd&apos;hui</span>
                  </div>
                  <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {item.problem}
                  </p>
                </div>

                {/* La Solution Apportée */}
                <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-[#1E3A8A] dark:text-blue-400 uppercase tracking-wider">
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>Notre solution concrète</span>
                  </div>
                  <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {item.solution}
                  </p>
                </div>
              </div>

              {/* Le Bénéfice Direct */}
              <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Bénéfice direct : {item.gain}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
