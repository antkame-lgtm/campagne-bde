"use client";

import React, { useState } from "react";
import { CALENDAR_SCHEDULE } from "../data/mockData";
import { Clock, CheckCircle2, CalendarDays, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export default function CalendarSection() {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);

  const currentMonth = CALENDAR_SCHEDULE[selectedMonthIndex] || CALENDAR_SCHEDULE[0];

  const handlePrev = () => {
    setSelectedMonthIndex((prev) => (prev > 0 ? prev - 1 : CALENDAR_SCHEDULE.length - 1));
  };

  const handleNext = () => {
    setSelectedMonthIndex((prev) => (prev < CALENDAR_SCHEDULE.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="calendrier" className="py-16 sm:py-24 bg-white dark:bg-[#020c1b] border-b border-sky-200/80 dark:border-sky-900/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200 dark:border-sky-800 shadow-2xs">
            <CalendarDays className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Section 5 • Notre calendrier</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-700 dark:text-sky-300 tracking-tight [text-wrap:balance]">
            Quand les actions auront lieu
          </h2>
          <p className="mt-4 text-base sm:text-lg text-sky-800 dark:text-sky-200 font-medium leading-relaxed">
            Pour montrer clairement quand les actions auront lieu, voici l&apos;organisation prévisionnelle 
            de notre mandat au fil des mois. Cliquez sur un mois pour découvrir les priorités associées.
          </p>
        </div>

        {/* Timeline sélective en pills interactives */}
        <div
          role="tablist"
          aria-label="Sélection des mois du calendrier"
          className="flex flex-wrap gap-2.5 sm:gap-3.5 mb-10"
        >
          {CALENDAR_SCHEDULE.map((item, idx) => {
            const isSelected = idx === selectedMonthIndex;
            return (
              <button
                key={item.month}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`panel-month-${idx}`}
                id={`tab-month-${idx}`}
                onClick={() => setSelectedMonthIndex(idx)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer touch-manipulation select-none active:scale-95 ${
                  isSelected
                    ? "bg-sky-700 hover:bg-sky-800 text-white shadow-md shadow-sky-900/20 ring-2 ring-sky-700 ring-offset-2 ring-offset-white dark:ring-offset-[#020c1b] font-bold"
                    : "bg-white dark:bg-[#041833]/80 text-sky-800 dark:text-sky-200 border border-sky-200 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-600 hover:bg-sky-50/70 dark:hover:bg-slate-800/60"
                }`}
              >
                <span>{item.month}</span>
                <span className={`ml-2 text-xs font-normal ${isSelected ? "text-sky-100" : "text-sky-600 dark:text-sky-400"}`}>
                  → {item.theme}
                </span>
              </button>
            );
          })}
        </div>

        {/* Vue détaillée du mois sélectionné */}
        <div
          id={`panel-month-${selectedMonthIndex}`}
          role="tabpanel"
          aria-labelledby={`tab-month-${selectedMonthIndex}`}
          className="bg-white dark:bg-[#041833]/80 rounded-3xl border border-sky-200 dark:border-sky-800/80 p-6 sm:p-10 transition-all shadow-xs"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-sky-100 dark:border-sky-900/60 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentMonth.badge} • Planification</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-sky-700 dark:text-sky-300">
                {currentMonth.month} : {currentMonth.theme}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                {currentMonth.events.length} axe(s) clé(s)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentMonth.events.map((evt, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#020c1b]/80 border border-sky-200/80 dark:border-sky-800/70 flex flex-col justify-between hover:border-sky-400 dark:hover:border-sky-600 hover:shadow-md hover:shadow-sky-900/5 transition-all"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 mb-2">
                    Action 0{idx + 1}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-sky-800 dark:text-sky-100 leading-snug">
                    {evt}
                  </h4>
                </div>
                <div className="pt-4 mt-6 border-t border-sky-100 dark:border-sky-900/50 flex items-center justify-between text-xs text-sky-700 dark:text-sky-300 font-medium">
                  <span className="flex items-center space-x-1.5 font-semibold text-sky-700 dark:text-sky-300">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span>Engagé dans le mandat</span>
                  </span>
                  <a
                    href="#avis"
                    className="inline-flex items-center space-x-1 text-xs text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-200 hover:underline"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Suggérer une idée</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Précédent / Suivant interactive avec retour cyclique */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-sky-100 dark:border-sky-900/60">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center space-x-1.5 px-4.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Mois précédent</span>
            </button>

            <span className="text-xs sm:text-sm font-mono text-sky-700 dark:text-sky-300 font-bold px-3 py-1 bg-sky-50 dark:bg-sky-950/60 rounded-lg border border-sky-200 dark:border-sky-800">
              {selectedMonthIndex + 1} / {CALENDAR_SCHEDULE.length}
            </span>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center space-x-1.5 px-4.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
            >
              <span>Mois suivant</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
