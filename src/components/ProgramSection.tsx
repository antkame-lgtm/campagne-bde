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
    <section id="programme" className="py-16 sm:py-24 bg-white border-b border-sky-200 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre & Note Méthodologique */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-sky-500" />
            <span>Section 4 • Notre programme</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-600 tracking-tight">
            5 grands pôles d&apos;action pour transformer notre quotidien
          </h2>
          <p className="mt-3 text-base text-sky-800 font-medium">
            Un programme structuré, réaliste et directement inspiré de vos besoins réels. 
            Chaque mesure est planifiée avec une évaluation technique et budgétaire rigoureuse.
          </p>
        </div>

        {/* Sélecteur de Pôles (5 onglets Candy Blue & Blanc) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-10">
          {MANDATE_POLES.map((pole) => {
            const isSelected = pole.id === selectedPoleId;
            const Icon = poleIcons[pole.id] || Layers;
            return (
              <button
                key={pole.id}
                onClick={() => setSelectedPoleId(pole.id)}
                className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-sky-500 text-white border-sky-600 shadow-md shadow-sky-500/25 scale-[1.02]"
                    : "bg-white text-sky-700 border-sky-200 hover:border-sky-400 hover:bg-sky-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-black uppercase ${isSelected ? "text-sky-100" : "text-sky-500"}`}>
                    PÔLE {pole.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-sky-500"}`} />
                </div>
                <div className="font-bold text-xs sm:text-sm leading-snug line-clamp-2">
                  {pole.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Fiche Détaillée du Pôle Sélectionné */}
        <div className="bg-white rounded-3xl border border-sky-200 p-6 sm:p-10 shadow-xl shadow-sky-500/5 transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Colonne Gauche : Synthèse & Jauges d'Audit */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center space-x-2 text-xs font-black text-sky-500 tracking-wider uppercase mb-1">
                  <span>Pôle {currentPole.number}</span>
                  <span>•</span>
                  <span>Mandat 2026-2027</span>
                </div>
                <div className="flex items-center space-x-3 mt-1 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center shrink-0 border border-sky-200">
                    <CurrentIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-sky-700">
                    {currentPole.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-sky-800 font-medium leading-relaxed">
                  {currentPole.summary}
                </p>
              </div>

              {/* Fiche d'Engagement Chiffrée */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-white rounded-2xl border border-sky-200 shadow-xs">
                  <div className="flex items-center space-x-1.5 text-xs text-sky-600 mb-1">
                    <Coins className="w-3.5 h-3.5 text-sky-500" />
                    <span>Budget Estimé</span>
                  </div>
                  <div className="text-sm font-bold text-sky-700 font-mono">
                    {currentPole.budget}
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-sky-200 shadow-xs">
                  <div className="flex items-center space-x-1.5 text-xs text-sky-600 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-500" />
                    <span>Calendrier</span>
                  </div>
                  <div className="text-sm font-bold text-sky-700 font-mono">
                    {currentPole.deadline}
                  </div>
                </div>
              </div>

              {/* Jauges d'audit de faisabilité */}
              <div className="bg-sky-50/50 p-5 rounded-2xl border border-sky-200 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-sky-700 uppercase tracking-wider mb-2">
                  <div className="flex items-center space-x-1.5">
                    <Gauge className="w-4 h-4 text-sky-500" />
                    <span>Audit de Faisabilité</span>
                  </div>
                  <span className="text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full border border-sky-300 font-mono text-[10px] font-bold">
                    VALIDÉ
                  </span>
                </div>

                {/* Faisabilité Technique */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-sky-700 mb-1.5">
                    <span className="flex items-center space-x-1">
                      <Wrench className="w-3.5 h-3.5 text-sky-500" />
                      <span>Faisabilité Technique &amp; Logistique</span>
                    </span>
                    <span className="font-bold text-sky-600 font-mono">{currentPole.feasibilityTechnical}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-sky-200">
                    <div
                      className="h-full bg-sky-500 rounded-full transition-all duration-500"
                      style={{ width: `${currentPole.feasibilityTechnical}%` }}
                    />
                  </div>
                </div>

                {/* Faisabilité Financière */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-sky-700 mb-1.5">
                    <span className="flex items-center space-x-1">
                      <DollarSign className="w-3.5 h-3.5 text-sky-500" />
                      <span>Faisabilité Budgétaire &amp; Trésorerie</span>
                    </span>
                    <span className="font-bold text-sky-600 font-mono">{currentPole.feasibilityFinancial}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-sky-200">
                    <div
                      className="h-full bg-sky-400 rounded-full transition-all duration-500"
                      style={{ width: `${currentPole.feasibilityFinancial}%` }}
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Colonne Droite : Liste des Propositions Précises du Pôle */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-sky-200">
                <span className="text-xs font-black uppercase tracking-wider text-sky-600">
                  Mesures d&apos;application immédiate
                </span>
                <span className="text-xs font-bold text-sky-700">
                  {currentPole.proposals.length} engagements clés
                </span>
              </div>

              <div className="space-y-3">
                {currentPole.proposals.map((prop, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-sky-200 flex items-start space-x-3.5 hover:border-sky-400 transition-colors shadow-xs"
                  >
                    <div className="w-7 h-7 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold border border-sky-200">
                      0{idx + 1}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-sky-800 leading-snug">
                        {prop}
                      </div>
                      <div className="mt-1 flex items-center space-x-2 text-[11px] text-sky-600 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                        <span>Inscrit au plan d&apos;action du mandat</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Encadré d'engagement réciproque */}
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                <p className="text-xs text-sky-800 leading-relaxed font-semibold">
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
