"use client";

import React, { useState } from "react";
import { PROGRAM_PILLARS } from "../data/mockData";
import { Check, CheckCircle2, ChevronRight, Layers, Gauge, DollarSign, Wrench } from "lucide-react";

export default function ProgramSection() {
  const [selectedAxe, setSelectedAxe] = useState<string>("axe-1");

  const currentPillar = PROGRAM_PILLARS.find((p) => p.id === selectedAxe) || PROGRAM_PILLARS[0];

  return (
    <section id="programme" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Engagements Chiffrés & Faisabilité</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Le Programme Interactif
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Chaque proposition a fait l&apos;objet d&apos;un chiffrage préalable. Suivez en direct les jauges
            de faisabilité technique et budgétaire de chaque axe.
          </p>
        </div>

        {/* Sélecteur d'Axe (Tabs) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-10">
          {PROGRAM_PILLARS.map((pillar) => {
            const isSelected = pillar.id === selectedAxe;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedAxe(pillar.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1E3A8A] text-white border-blue-900 shadow-lg shadow-blue-950/20 scale-[1.02]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className={`text-xs font-black uppercase mb-1 ${isSelected ? "text-amber-400" : "text-[#1E3A8A]"}`}>
                  Axe {pillar.number}
                </div>
                <div className="font-bold text-sm sm:text-base leading-snug line-clamp-1">
                  {pillar.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Détail de l'Axe Sélectionné */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Colonne Gauche : Synthèse & Jauges */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-extrabold text-[#F59E0B] tracking-wider uppercase">
                  Axe {currentPillar.number}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 mb-3">
                  {currentPillar.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {currentPillar.summary}
                </p>
              </div>

              {/* Jauges d'audit */}
              <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  <div className="flex items-center space-x-1.5">
                    <Gauge className="w-4 h-4 text-[#1E3A8A]" />
                    <span>Jauges de Faisabilité</span>
                  </div>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Vérifié QG
                  </span>
                </div>

                {/* Jauge Technique */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                    <span className="flex items-center space-x-1">
                      <Wrench className="w-3.5 h-3.5 text-slate-500" />
                      <span>Faisabilité Technique / Logistique</span>
                    </span>
                    <span className="font-bold text-[#1E3A8A]">{currentPillar.feasibilityTechnical}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-[#1E3A8A] rounded-full transition-all duration-700"
                      style={{ width: `${currentPillar.feasibilityTechnical}%` }}
                    />
                  </div>
                </div>

                {/* Jauge Financière */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                    <span className="flex items-center space-x-1">
                      <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                      <span>Faisabilité Budgétaire / Trésorerie</span>
                    </span>
                    <span className="font-bold text-[#F59E0B]">{currentPillar.feasibilityFinancial}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-[#F59E0B] rounded-full transition-all duration-700"
                      style={{ width: `${currentPillar.feasibilityFinancial}%` }}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic pt-1">
                  *Pendant le mandat, ces jauges basculeront automatiquement en taux d&apos;avancement réel des promesses réalisées.
                </p>
              </div>
            </div>

            {/* Colonne Droite : Liste des Propositions */}
            <div className="lg:col-span-7">
              <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <span>Actions concrètes prévues :</span>
              </h4>

              <div className="space-y-3">
                {currentPillar.proposals.map((prop, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] flex items-start space-x-3.5 hover:border-blue-200 hover:bg-blue-50/40 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-[#1E3A8A] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <p className="text-sm font-medium text-slate-800 leading-snug">
                      {prop}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                <span>Une idée à rajouter pour cet axe ?</span>
                <a
                  href="#voix-etudiante"
                  className="font-bold text-[#1E3A8A] hover:underline flex items-center"
                >
                  Déposer dans La Voix Étudiante <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
