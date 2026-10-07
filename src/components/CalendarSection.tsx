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
            La chronologie annuelle de nos actions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-sky-800 dark:text-sky-200 font-medium leading-relaxed">
            Pour que les promesses ne restent pas des mots, voici comment notre mandat s&apos;organise 
            mois par mois, de la rentrée jusqu&apos;à la fin d&apos;année universitaire.
          </p>
        </div>

        {/* Timeline sélective interactive Candy Blue & Blanc */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-10">
          {CALENDAR_SCHEDULE.map((item, idx) => {
            const isSelected = idx === selectedMonthIndex;
            return (
              <button
                key={item.month}
                onClick={() => setSelectedMonthIndex(idx)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-sky-500 text-white border-sky-600 shadow-md shadow-sky-500/25 scale-[1.02]"
                    : "bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-600 hover:bg-sky-50 dark:hover:bg-slate-800"
                }`}
              >
                <div className={`font-mono text-[11px] font-bold uppercase mb-1 ${isSelected ? "text-sky-100" : "text-sky-500 dark:text-sky-400"}`}>
                  {item.badge}
                </div>
                <div className="font-extrabold text-sm sm:text-base leading-snug">
                  {item.month}
                </div>
                <div className={`text-xs mt-1 line-clamp-1 font-medium ${isSelected ? "text-sky-100" : "text-sky-600 dark:text-sky-300"}`}>
                  {item.theme}
                </div>
              </button>
            );
          })}
        </div>

        {/* Vue détaillée du mois sélectionné */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-sky-200 dark:border-sky-800 p-6 sm:p-10 shadow-lg shadow-sky-500/5 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-sky-200 dark:border-sky-800 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
                <Clock className="w-4 h-4 text-sky-500" />
                <span>{currentMonth.badge} • Planification Opérationnelle</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-sky-700 dark:text-sky-300">
                {currentMonth.month} : {currentMonth.theme}
              </h3>
            </div>
            <span className="inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 w-fit">
              {currentMonth.events.length} temps forts programmés
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {currentMonth.events.map((evt, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-sky-200 dark:border-sky-800 flex flex-col justify-between hover:border-sky-400 dark:hover:border-sky-600 transition-colors shadow-xs"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-mono text-xs font-bold mb-3 border border-sky-200 dark:border-sky-800">
                    {idx + 1}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-sky-800 dark:text-sky-200 leading-snug">
                    {evt}
                  </h4>
                </div>
                <div className="pt-4 mt-4 border-t border-sky-100 dark:border-sky-900/60 flex items-center justify-between text-xs text-sky-600 dark:text-sky-400 font-semibold">
                  <span className="flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                    <span>Confirmé</span>
                  </span>
                  <span className="font-mono text-[11px] text-sky-500">
                    2026-2027
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Précédent / Suivant */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-sky-200 dark:border-sky-800">
            <button
              onClick={() => setSelectedMonthIndex((prev) => Math.max(0, prev - 1))}
              disabled={selectedMonthIndex === 0}
              className="px-4 py-2 text-xs font-bold rounded-xl border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Mois précédent
            </button>

            <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-bold">
              {selectedMonthIndex + 1} / {CALENDAR_SCHEDULE.length}
            </span>

            <button
              onClick={() => setSelectedMonthIndex((prev) => Math.min(CALENDAR_SCHEDULE.length - 1, prev + 1))}
              disabled={selectedMonthIndex === CALENDAR_SCHEDULE.length - 1}
              className="px-4 py-2 text-xs font-bold rounded-xl border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Mois suivant
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
