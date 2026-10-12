"use client";

import React from "react";
import { ANNUAL_PROGRAM } from "../data/mockData";
import {
  CalendarDays,
  Sparkles,
  Trophy,
  Gamepad2,
  Flame,
  UtensilsCrossed,
  Presentation,
  HeartHandshake,
  Utensils,
  ArrowDown
} from "lucide-react";

export default function ProgramSection() {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Trophy,
    Gamepad2,
    Flame,
    UtensilsCrossed,
    Presentation,
    HeartHandshake,
    Sparkles,
    Utensils,
  };

  return (
    <section id="programme" className="py-16 sm:py-24 bg-white dark:bg-[#020c1b] border-b border-sky-200/80 dark:border-sky-900/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre & Description fidèle */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Section 4 • Le programme de l&apos;année</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-700 dark:text-sky-300 tracking-tight [text-wrap:balance]">
            Le programme de l&apos;année
          </h2>
          <p className="mt-3 text-base text-sky-800 dark:text-sky-200 font-medium leading-relaxed">
            8 grands temps forts pensés pour dynamiser votre quotidien et renforcer la cohésion de tout le campus :
            sport, défis inter-écoles, convivialité, ouverture professionnelle et solidarité.
          </p>
        </div>

        {/* Grille des 8 Événements & Actions phares de l'année */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ANNUAL_PROGRAM.map((item) => {
            const Icon = iconMap[item.iconName] || Sparkles;
            return (
              <div
                key={item.id}
                className="group p-6 rounded-3xl bg-white dark:bg-[#041833]/80 border border-sky-200/80 dark:border-sky-800/80 hover:border-sky-400 dark:hover:border-sky-600 shadow-xs hover:shadow-xl hover:shadow-sky-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* En-tête de carte : Numéro, Icône & Catégorie */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                      {item.number}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-100 dark:border-sky-900 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="inline-block text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-2">
                    {item.category}
                  </span>

                  <h3 className="text-lg font-bold text-sky-800 dark:text-sky-200 leading-snug mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-sky-800/80 dark:text-sky-200/90 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Pied de carte : Période prévisionnelle reliée à la Section 5 */}
                <div className="pt-4 mt-5 border-t border-sky-100 dark:border-sky-900/60 flex items-center space-x-1.5 text-xs font-semibold text-sky-700 dark:text-sky-300">
                  <CalendarDays className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>{item.period}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bannière de liaison de transition vers la Section 5 (Calendrier) */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-sky-50/80 dark:bg-[#041833]/90 border border-sky-200 dark:border-sky-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-700 text-white flex items-center justify-center shrink-0 shadow-sm shadow-sky-900/20">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-sky-800 dark:text-sky-200">
                Planification chronologique
              </h4>
              <p className="text-xs text-sky-800/80 dark:text-sky-300 font-medium">
                Retrouvez la répartition mois par mois de ces 8 temps forts dans le calendrier prévisionnel.
              </p>
            </div>
          </div>
          <a
            href="#calendrier"
            className="inline-flex items-center space-x-1.5 px-4.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-700 hover:bg-sky-50 dark:hover:bg-slate-700 text-xs font-bold transition-all shadow-2xs shrink-0 cursor-pointer active:scale-95"
          >
            <span>Voir le calendrier (Section 5)</span>
            <ArrowDown className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          </a>
        </div>

      </div>
    </section>
  );
}
