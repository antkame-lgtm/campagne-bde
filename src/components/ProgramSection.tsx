"use client";

import React, { useState } from "react";
import { MANDATE_POLES } from "../data/mockData";
import { Layers, GraduationCap, PartyPopper, Briefcase, HeartHandshake, Lightbulb } from "lucide-react";

export default function ProgramSection() {
  const [selectedPoleId, setSelectedPoleId] = useState<string>("academique");

  const poleIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    academique: GraduationCap,
    etudiante: PartyPopper,
    carriere: Briefcase,
    solidarite: HeartHandshake,
    innovation: Lightbulb,
  };

  const currentPole = MANDATE_POLES.find((p) => p.id === selectedPoleId) || MANDATE_POLES[0];
  const CurrentIcon = poleIcons[currentPole.id] || Layers;

  return (
    <section id="programme" className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-b border-sky-200 dark:border-sky-900/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre & Description fidèle */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-sky-500" />
            <span>Section 4 • Notre programme</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-600 dark:text-sky-400 tracking-tight">
            Notre programme par grands pôles
          </h2>
          <p className="mt-3 text-base text-sky-800 dark:text-sky-200 font-medium">
            Des actions concrètes réparties par domaines d&apos;intervention pour dynamiser et accompagner la vie étudiante.
          </p>
        </div>

        {/* Sélecteur de Pôles (Pills épurées Candy Blue & Blanc) */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-10">
          {MANDATE_POLES.map((pole) => {
            const isSelected = pole.id === selectedPoleId;
            const Icon = poleIcons[pole.id] || Layers;
            return (
              <button
                key={pole.id}
                onClick={() => setSelectedPoleId(pole.id)}
                className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-sky-500 text-white shadow-sm shadow-sky-500/20"
                    : "bg-white dark:bg-slate-900 text-sky-800 dark:text-sky-200 border border-sky-100 dark:border-sky-900/60 hover:border-sky-300 dark:hover:border-sky-700 hover:bg-sky-50/50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-sky-500"}`} />
                <span>{pole.title}</span>
              </button>
            );
          })}
        </div>

        {/* Fiche Détaillée du Pôle - Disposition aérée et épurée */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-sky-100 dark:border-sky-900/60 p-6 sm:p-10 transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Colonne Gauche : Synthèse du pôle */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-500 flex items-center justify-center shrink-0 border border-sky-100 dark:border-sky-900/60">
                  <CurrentIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-sky-500 dark:text-sky-400 uppercase tracking-wider block">
                    Pôle {currentPole.number}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-sky-700 dark:text-sky-300">
                    {currentPole.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-sky-800/80 dark:text-sky-200/90 leading-relaxed font-normal">
                {currentPole.summary}
              </p>
            </div>

            {/* Colonne Droite : Points clés indiqués par Salimata */}
            <div className="lg:col-span-7">
              <div className="text-xs font-bold uppercase tracking-wider text-sky-500 dark:text-sky-400 mb-4 pb-2 border-b border-sky-100 dark:border-sky-900/40">
                Actions &amp; priorités du pôle
              </div>

              <div className="divide-y divide-sky-100 dark:divide-sky-900/40">
                {currentPole.proposals.map((prop, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-start space-x-3.5 group">
                    <div className="w-6 h-6 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-500 flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold border border-sky-100 dark:border-sky-900/60">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-sky-800 dark:text-sky-200 leading-snug">
                        {prop}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
