"use client";

import React, { useState } from "react";
import { CALENDAR_SCHEDULE } from "../data/mockData";
import { Clock, CheckCircle2, CalendarDays } from "lucide-react";

export default function CalendarSection() {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);

  const currentMonth = CALENDAR_SCHEDULE[selectedMonthIndex] || CALENDAR_SCHEDULE[0];

  return (
    <section id="calendrier" className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-b border-sky-200 dark:border-sky-900/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200 dark:border-sky-800">
            <CalendarDays className="w-3.5 h-3.5 text-sky-500" />
            <span>Section 5 • Notre calendrier</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-600 dark:text-sky-400 tracking-tight">
            Quand les actions auront lieu
          </h2>
          <p className="mt-4 text-base sm:text-lg text-sky-800 dark:text-sky-200 font-medium leading-relaxed">
            Pour montrer clairement quand les actions auront lieu, voici l&apos;organisation prévisionnelle 
            de notre mandat au fil des mois.
          </p>
        </div>

        {/* Timeline sélective en pills épurées Candy Blue & Blanc */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-10">
          {CALENDAR_SCHEDULE.map((item, idx) => {
            const isSelected = idx === selectedMonthIndex;
            return (
              <button
                key={item.month}
                onClick={() => setSelectedMonthIndex(idx)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-sky-500 text-white shadow-sm shadow-sky-500/20"
                    : "bg-white dark:bg-slate-900 text-sky-800 dark:text-sky-200 border border-sky-100 dark:border-sky-900/60 hover:border-sky-300 dark:hover:border-sky-700 hover:bg-sky-50/50"
                }`}
              >
                <span>{item.month}</span>
                <span className={`ml-1.5 text-xs ${isSelected ? "text-sky-100" : "text-sky-400"}`}>
                  → {item.theme}
                </span>
              </button>
            );
          })}
        </div>

        {/* Vue détaillée du mois sélectionné - Disposition aérée */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-sky-100 dark:border-sky-900/60 p-6 sm:p-10 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-sky-100 dark:border-sky-900/40 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-sky-500 dark:text-sky-400 mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentMonth.badge} • Planification</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-sky-700 dark:text-sky-300">
                {currentMonth.month} : {currentMonth.theme}
              </h3>
            </div>
            <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
              {currentMonth.events.length} axe(s) clé(s)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentMonth.events.map((evt, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900/60 flex flex-col justify-between hover:border-sky-300 dark:hover:border-sky-700 transition-colors"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-sky-400 mb-2">
                    Action 0{idx + 1}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-sky-800 dark:text-sky-200 leading-snug">
                    {evt}
                  </h4>
                </div>
                <div className="pt-4 mt-6 border-t border-sky-100 dark:border-sky-900/40 flex items-center justify-between text-xs text-sky-500 dark:text-sky-400 font-medium">
                  <span className="flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Prévu</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Précédent / Suivant */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-sky-100 dark:border-sky-900/40">
            <button
              onClick={() => setSelectedMonthIndex((prev) => Math.max(0, prev - 1))}
              disabled={selectedMonthIndex === 0}
              className="px-4 py-2 text-xs font-semibold rounded-full border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              ← Mois précédent
            </button>

            <span className="text-xs font-mono text-sky-500 font-semibold">
              {selectedMonthIndex + 1} / {CALENDAR_SCHEDULE.length}
            </span>

            <button
              onClick={() => setSelectedMonthIndex((prev) => Math.min(CALENDAR_SCHEDULE.length - 1, prev + 1))}
              disabled={selectedMonthIndex === CALENDAR_SCHEDULE.length - 1}
              className="px-4 py-2 text-xs font-semibold rounded-full border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Mois suivant →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
