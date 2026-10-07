"use client";

import React, { useState } from "react";
import { CALENDAR_SCHEDULE } from "../data/mockData";
import { Calendar, Clock, CheckCircle2, ChevronRight, CalendarDays, ArrowUpRight } from "lucide-react";

export default function CalendarSection() {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);

  const currentMonth = CALENDAR_SCHEDULE[selectedMonthIndex] || CALENDAR_SCHEDULE[0];

  return (
    <section id="calendrier" className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-[#1E3A8A] dark:text-blue-300 rounded-md text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200/60 dark:border-blue-900/40">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Section 5 • Notre calendrier</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            La chronologie annuelle de nos actions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Pour que les promesses ne restent pas des mots, voici comment notre mandat s&apos;organise 
            mois par mois, de la rentrée jusqu&apos;à la fin d&apos;année universitaire.
          </p>
        </div>

        {/* Timeline sélective interactive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-10">
          {CALENDAR_SCHEDULE.map((item, idx) => {
            const isSelected = idx === selectedMonthIndex;
            return (
              <button
                key={item.month}
                onClick={() => setSelectedMonthIndex(idx)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1E3A8A] text-white border-blue-900 shadow-md scale-[1.02]"
                    : "bg-[#F8FAFC] dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className={`font-mono text-[11px] font-bold uppercase mb-1 ${isSelected ? "text-amber-300" : "text-slate-500 dark:text-slate-400"}`}>
                  {item.badge}
                </div>
                <div className="font-extrabold text-sm sm:text-base leading-snug">
                  {item.month}
                </div>
                <div className={`text-xs mt-1 line-clamp-1 ${isSelected ? "text-blue-100" : "text-slate-500 dark:text-slate-400"}`}>
                  {item.theme}
                </div>
              </button>
            );
          })}
        </div>

        {/* Vue détaillée du mois sélectionné */}
        <div className="bg-[#F8FAFC] dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-slate-200 dark:border-slate-800 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-[#D97706] dark:text-amber-400 mb-1">
                <Clock className="w-4 h-4" />
                <span>{currentMonth.badge} • Planification Opérationnelle</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {currentMonth.month} : {currentMonth.theme}
              </h3>
            </div>
            <span className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#1E3A8A] dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/40 w-fit">
              {currentMonth.events.length} temps forts programmés
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {currentMonth.events.map((evt, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-[#1E3A8A] dark:text-blue-300 flex items-center justify-center font-mono text-xs font-bold mb-3">
                    {idx + 1}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {evt}
                  </h4>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Confirmé</span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    2026-2027
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Précédent / Suivant */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setSelectedMonthIndex((prev) => Math.max(0, prev - 1))}
              disabled={selectedMonthIndex === 0}
              className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Mois précédent
            </button>

            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {selectedMonthIndex + 1} / {CALENDAR_SCHEDULE.length}
            </span>

            <button
              onClick={() => setSelectedMonthIndex((prev) => Math.min(CALENDAR_SCHEDULE.length - 1, prev + 1))}
              disabled={selectedMonthIndex === CALENDAR_SCHEDULE.length - 1}
              className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Mois suivant
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
