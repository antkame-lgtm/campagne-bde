"use client";

import React from "react";
import { Sparkles, Compass, HeartHandshake, Rocket, Users2, ShieldCheck } from "lucide-react";

export default function VisionSection() {
  const visionPillars = [
    {
      icon: Users2,
      num: "01",
      title: "Un campus vivant et rassembleur",
      desc: "Rompre avec la routine « cours-métro-dodo ». Nous voulons un campus où l'on a envie de rester, rythmé par des événements réguliers, des espaces conviviaux et une véritable cohésion inter-promotions.",
      highlight: "Faire de notre école un lieu de vie mémorable"
    },
    {
      icon: HeartHandshake,
      num: "02",
      title: "La réussite académique sans isolement",
      desc: "Chacun a le droit d'être soutenu. Nous voulons une vie étudiante où l'entraide est naturelle : fiches d'annales en libre accès, tutorat bienveillant et ateliers ciblés avant chaque période d'examens.",
      highlight: "Zéro étudiant laissé seul face aux partiels"
    },
    {
      icon: Rocket,
      num: "03",
      title: "Un tremplin concret vers votre avenir",
      desc: "La vie étudiante doit booster vos perspectives de carrière. Nous voulons multiplier les passerelles avec les anciens diplômés (alumni), les recruteurs et le tissu économique pour décrocher stages et alternances.",
      highlight: "Des opportunités tangibles dès la 1ère année"
    },
    {
      icon: ShieldCheck,
      num: "04",
      title: "Une équipe à votre écoute au quotidien",
      desc: "Le BDE n'est pas une tour d'ivoire. Nous voulons une gouvernance transparente et accessible : chaque avis compte, chaque difficulté est entendue, et nos comptes sont consultables par tous les étudiants.",
      highlight: "Transparence totale et présence continue"
    }
  ];

  return (
    <section id="vision" className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-[#1E3A8A] dark:text-blue-300 rounded-md text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200/60 dark:border-blue-900/40">
            <Compass className="w-3.5 h-3.5" />
            <span>Section 3 • Notre vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Ce que nous voulons que la vie étudiante devienne
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Notre vision repose sur une conviction simple : votre passage dans cette école doit être bien plus 
            qu&apos;une série de cours. Il doit être une expérience humaine, solidaire et enrichissante qui vous donne 
            toutes les clés pour réussir.
          </p>
        </div>

        {/* 4 Piliers de la Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visionPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-[#1E3A8A] dark:text-blue-400">
                      {pillar.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#1E3A8A] dark:text-blue-300 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-[#D97706] dark:text-amber-400 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{pillar.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
