"use client";

import React, { useState } from "react";
import { PROGRAM_PILLARS } from "../data/mockData";
import { Check, ChevronRight, Layers, Gauge, DollarSign, Wrench, Calendar, Coins } from "lucide-react";

export default function ProgramSection() {
  const [selectedAxe, setSelectedAxe] = useState<string>("axe-1");

  const currentPillar = PROGRAM_PILLARS.find((p) => p.id === selectedAxe) || PROGRAM_PILLARS[0];

  const pillarMeta: Record<string, { budget: string; deadline: string; impact: string }> = {
    "axe-1": { budget: "2 800 €", deadline: "Dès Novembre 2026", impact: "Tous étudiants" },
    "axe-2": { budget: "1 500 €", deadline: "Semestre 1 & 2", impact: "Écologie & Campus" },
    "axe-3": { budget: "3 200 €", deadline: "Semestre 1", impact: "Tous cycles (L/M)" },
    "axe-4": { budget: "2 000 € (Fonds d'urgence)", deadline: "Permanent", impact: "Étudiants en difficulté" },
  };

  const meta = pillarMeta[currentPillar.id] || { budget: "2 000 €", deadline: "Semestre 1", impact: "Campus" };

  return (
    <section id="programme" className="py-16 sm:py-24 bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre & Note Méthodologique */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/60 text-[#F59E0B] border border-amber-200 dark:border-amber-900/50 rounded-md text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Feuille de Route Chiffrée &amp; Faisabilité</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Le Programme de Mandat : 4 Piliers Engagés
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Chaque mesure a fait l&apos;objet d&apos;un audit budgétaire et technique préalable.
            Zéro promesse irréalisable : des jalons précis avec dates de mise en œuvre et enveloppes allouées.
          </p>
        </div>

        {/* Sélecteur d'Axe (Navigation par onglets) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-10">
          {PROGRAM_PILLARS.map((pillar) => {
            const isSelected = pillar.id === selectedAxe;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedAxe(pillar.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1E3A8A] text-white border-blue-900 shadow-md"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className={`font-mono text-xs font-black uppercase mb-1 ${isSelected ? "text-amber-400" : "text-[#1E3A8A] dark:text-blue-400"}`}>
                  AXE {pillar.number}
                </div>
                <div className="font-bold text-sm sm:text-base leading-snug line-clamp-1">
                  {pillar.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Fiche Détaillée de l'Axe Sélectionné */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Colonne Gauche : Synthèse & Jauges d'Audit */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center space-x-2 text-xs font-black text-[#F59E0B] tracking-wider uppercase mb-1">
                  <span>Axe Opérationnel {currentPillar.number}</span>
                  <span>•</span>
                  <span>Mandat 2026-2027</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 mb-3">
                  {currentPillar.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentPillar.summary}
                </p>
              </div>

              {/* Fiche d'Engagement Chiffrée */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#F8FAFC] dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <Coins className="w-3.5 h-3.5 text-amber-500" />
                    <span>Budget Estimé</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                    {meta.budget}
                  </div>
                </div>

                <div className="p-3 bg-[#F8FAFC] dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>Déploiement</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                    {meta.deadline}
                  </div>
                </div>
              </div>

              {/* Jauges d'audit de faisabilité */}
              <div className="bg-[#F8FAFC] dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  <div className="flex items-center space-x-1.5">
                    <Gauge className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400" />
                    <span>Audit de Faisabilité</span>
                  </div>
                  <span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 font-mono text-[10px]">
                    CONTRÔLE QG : VALIDÉ
                  </span>
                </div>

                {/* Faisabilité Technique */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span className="flex items-center space-x-1">
                      <Wrench className="w-3.5 h-3.5 text-slate-500" />
                      <span>Faisabilité Technique &amp; Logistique</span>
                    </span>
                    <span className="font-bold text-[#1E3A8A] dark:text-blue-400 font-mono">{currentPillar.feasibilityTechnical}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1E3A8A] dark:bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${currentPillar.feasibilityTechnical}%` }}
                    />
                  </div>
                </div>

                {/* Faisabilité Financière */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span className="flex items-center space-x-1">
                      <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                      <span>Faisabilité Budgétaire &amp; Trésorerie</span>
                    </span>
                    <span className="font-bold text-[#F59E0B] font-mono">{currentPillar.feasibilityFinancial}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F59E0B] rounded-full transition-all duration-500"
                      style={{ width: `${currentPillar.feasibilityFinancial}%` }}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1">
                  *Pendant le mandat, ces jauges basculeront automatiquement en compte-rendu public d&apos;avancement des promesses réalisées.
                </p>
              </div>
            </div>

            {/* Colonne Droite : Liste des Propositions d'Action */}
            <div className="lg:col-span-7">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                Mesures concrètes inscrites au mandat :
              </h4>

              <div className="space-y-3">
                {currentPillar.proposals.map((prop, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-950 flex items-start space-x-3.5 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-[#1E3A8A] dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">
                      {prop}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span>Vous souhaitez enrichir cet axe avant le vote ?</span>
                <a
                  href="#voix-etudiante"
                  className="font-bold text-[#1E3A8A] dark:text-blue-400 hover:underline flex items-center shrink-0"
                >
                  Proposer dans la Boîte à Idées <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
