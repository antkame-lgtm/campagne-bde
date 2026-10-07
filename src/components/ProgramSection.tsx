"use client";

import React, { useState } from "react";
import { MANDATE_POLES } from "../data/mockData";
import { CheckCircle2, Layers, Gauge, DollarSign, Wrench, Calendar, Coins, GraduationCap, PartyPopper, Briefcase, HeartHandshake, Lightbulb } from "lucide-react";

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
    <section id="programme" className="py-16 sm:py-24 bg-[#F8FAFC] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre & Note Méthodologique */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/60 text-[#D97706] dark:text-amber-400 border border-amber-200 dark:border-amber-900/50 rounded-md text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Section 4 • Notre programme</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            5 grands pôles d&apos;action pour transformer notre quotidien
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Un programme structuré, réaliste et directement inspiré de vos besoins réels. 
            Chaque mesure est planifiée avec une évaluation technique et budgétaire rigoureuse.
          </p>
        </div>

        {/* Sélecteur de Pôles (5 onglets) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-10">
          {MANDATE_POLES.map((pole) => {
            const isSelected = pole.id === selectedPoleId;
            const Icon = poleIcons[pole.id] || Layers;
            return (
              <button
                key={pole.id}
                onClick={() => setSelectedPoleId(pole.id)}
                className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1E3A8A] text-white border-blue-900 shadow-md scale-[1.02]"
                    : "bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-black uppercase ${isSelected ? "text-amber-300" : "text-[#1E3A8A] dark:text-blue-400"}`}>
                    PÔLE {pole.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-slate-400"}`} />
                </div>
                <div className="font-bold text-xs sm:text-sm leading-snug line-clamp-2">
                  {pole.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Fiche Détaillée du Pôle Sélectionné */}
        <div className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Colonne Gauche : Synthèse & Jauges d'Audit */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center space-x-2 text-xs font-black text-[#D97706] dark:text-amber-400 tracking-wider uppercase mb-1">
                  <span>Pôle {currentPole.number}</span>
                  <span>•</span>
                  <span>Mandat 2026-2027</span>
                </div>
                <div className="flex items-center space-x-3 mt-1 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#1E3A8A] dark:text-blue-300 flex items-center justify-center shrink-0">
                    <CurrentIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {currentPole.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentPole.summary}
                </p>
              </div>

              {/* Fiche d'Engagement Chiffrée */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#F8FAFC] dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <Coins className="w-3.5 h-3.5 text-amber-500" />
                    <span>Budget Estimé</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                    {currentPole.budget}
                  </div>
                </div>

                <div className="p-3 bg-[#F8FAFC] dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>Calendrier</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                    {currentPole.deadline}
                  </div>
                </div>
              </div>

              {/* Jauges d'audit de faisabilité */}
              <div className="bg-[#F8FAFC] dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
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
                    <span className="font-bold text-[#1E3A8A] dark:text-blue-400 font-mono">{currentPole.feasibilityTechnical}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1E3A8A] dark:bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${currentPole.feasibilityTechnical}%` }}
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
                    <span className="font-bold text-[#D97706] dark:text-amber-400 font-mono">{currentPole.feasibilityFinancial}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D97706] dark:bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${currentPole.feasibilityFinancial}%` }}
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Colonne Droite : Liste des Propositions Précises du Pôle */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Mesures d&apos;application immédiate
                </span>
                <span className="text-xs font-bold text-[#1E3A8A] dark:text-blue-400">
                  {currentPole.proposals.length} engagements clés
                </span>
              </div>

              <div className="space-y-3">
                {currentPole.proposals.map((prop, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start space-x-3.5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-[#1E3A8A] dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                      0{idx + 1}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                        {prop}
                      </div>
                      <div className="mt-1 flex items-center space-x-2 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Inscrit au plan d&apos;action du mandat</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Encadré d'engagement réciproque */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/40">
                <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
                  <strong>Engagement de suivi :</strong> Un état d&apos;avancement mensuel pour le pôle {currentPole.title} sera publié en direct pour permettre à chaque étudiant de vérifier la tenue des engagements.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
