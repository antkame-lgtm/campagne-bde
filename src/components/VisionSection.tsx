"use client";

import React from "react";
import { Sparkles, Compass, HeartHandshake, Rocket, Users2, ShieldCheck } from "lucide-react";

export default function VisionSection() {
  const visionPillars = [
    {
      icon: Users2,
      num: "01",
      title: "Une vie étudiante plus dynamique",
      desc: "Rompre avec la routine cours-métro-dodo. Nous voulons un campus vivant où l'on a plaisir à rester, rythmé par des événements réguliers et des activités partagées.",
      highlight: "Dynamisme & cohésion"
    },
    {
      icon: Rocket,
      num: "02",
      title: "Une communauté plus ambitieuse",
      desc: "Donner à chacun les moyens de réussir : du soutien méthodologique aux opportunités de stages et rencontres professionnelles pour propulser l'avenir de tous.",
      highlight: "Réussite & tremplin"
    },
    {
      icon: HeartHandshake,
      num: "03",
      title: "Une entraide plus solidaire",
      desc: "Prendre soin de chacun au quotidien. Zéro étudiant laissé seul face aux difficultés, avec une véritable écoute et des actions sociales bienveillantes.",
      highlight: "Solidarité & bien-être"
    },
    {
      icon: ShieldCheck,
      num: "04",
      title: "Un bureau plus proche de vous",
      desc: "Un BDE accessible, transparent et sur le terrain : chaque proposition est écoutée et chaque décision est partagée ouvertement avec les étudiants.",
      highlight: "Écoute & transparence"
    }
  ];

  return (
    <section id="vision" className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-b border-sky-200 dark:border-sky-900/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200 dark:border-sky-800">
            <Compass className="w-3.5 h-3.5 text-sky-500" />
            <span>Section 3 • Notre vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-600 dark:text-sky-400 tracking-tight">
            Ce que nous voulons que la vie étudiante devienne
          </h2>
          <p className="mt-4 text-base sm:text-lg text-sky-800 dark:text-sky-200 font-medium leading-relaxed">
            Une vie étudiante plus dynamique, plus ambitieuse et plus proche de ses étudiants. 
            Découvrez les 4 dimensions de notre vision pour transformer notre quotidien.
          </p>
        </div>

        {/* 4 Piliers de la Vision - Disposition aérée et épurée */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {visionPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="group relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900/60 hover:border-sky-300 dark:hover:border-sky-700 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xl font-black text-sky-400 dark:text-sky-500">
                      {pillar.num}
                    </span>
                    <Icon className="w-5 h-5 text-sky-500/80 group-hover:text-sky-500 transition-colors" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-sky-700 dark:text-sky-300 mb-2.5 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-sky-800/80 dark:text-sky-200/90 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-sky-100 dark:border-sky-900/40 text-xs font-semibold text-sky-600 dark:text-sky-400 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 shrink-0 text-sky-400" />
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
