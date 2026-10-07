"use client";

import React from "react";
import { ArrowRight, HeartHandshake, Zap, Shield, Target } from "lucide-react";
import DynamicBackground from "./DynamicBackground";
import { CANDIDATE_INFO } from "../data/mockData";

export default function Hero() {
  const valueIcons = [
    { label: "Écoute", icon: HeartHandshake },
    { label: "Action", icon: Zap },
    { label: "Transparence", icon: Shield },
    { label: "Ambition", icon: Target },
  ];

  return (
    <section id="top" className="relative overflow-hidden bg-white dark:bg-slate-950 border-b border-sky-200 dark:border-sky-900/60 pt-12 pb-16 sm:pt-20 sm:pb-24 transition-colors duration-200">
      <DynamicBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête : Badge Officiel */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-sky-100 dark:border-sky-950 text-xs text-sky-600 dark:text-sky-400">
          <div className="inline-flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 ring-4 ring-sky-100 dark:ring-sky-950" />
            <span className="font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
              Candidature Officielle à la Présidence du BDE
            </span>
          </div>
          <span className="font-mono text-[11px] bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800 font-bold">
            Mandat 2026-2027
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Colonne Gauche : Nom, Slogan, Phrase Forte & CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <span className="inline-block px-3.5 py-1.5 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 font-extrabold text-xs uppercase tracking-wider rounded-xl border border-sky-200 dark:border-sky-800">
                {CANDIDATE_INFO.name} • Présidence BDE
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-sky-600 dark:text-sky-400 tracking-tight leading-[1.08]">
                {CANDIDATE_INFO.slogan}
              </h1>
            </div>

            {/* Phrase forte résumant la candidature */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border-l-4 border-sky-500 border border-sky-200 dark:border-sky-800 shadow-xs">
              <p className="text-base sm:text-lg font-bold text-sky-800 dark:text-sky-200 leading-relaxed italic">
                &laquo; {CANDIDATE_INFO.strongQuote} &raquo;
              </p>
            </div>

            <p className="text-sm sm:text-base text-sky-800 dark:text-sky-200 font-medium leading-relaxed">
              Bienvenue dans notre vision. Découvrez nos propositions pour accompagner votre réussite, 
              dynamiser la vie de campus et faire entendre la voix de chaque étudiant avec transparence.
            </p>

            {/* Boutons d'Action Candy Blue & Blanc */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#programme"
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-500/25 active:scale-[0.99] transition-all"
              >
                <span>Découvrir notre programme</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href="#avis"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-300 font-bold text-sm border-2 border-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition-all shadow-xs"
              >
                <span>Donnez votre avis</span>
              </a>
            </div>

            {/* 4 Valeurs Clés de Campagne */}
            <div className="pt-6 border-t border-sky-100 dark:border-sky-900/60">
              <div className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-3">
                Nos 4 valeurs cardinales :
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {valueIcons.map((val) => {
                  const Icon = val.icon;
                  return (
                    <div
                      key={val.label}
                      className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800 shadow-xs flex items-center space-x-2.5 hover:border-sky-400 dark:hover:border-sky-600 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-sky-50 dark:bg-sky-950 text-sky-500 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-extrabold text-xs text-sky-700 dark:text-sky-300">
                        {val.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Colonne Droite : Belle Photo Professionnelle de Salimata */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xl shadow-sky-500/10 border border-sky-200 dark:border-sky-800">
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-sky-50 dark:bg-slate-800 border border-sky-100 dark:border-sky-900/40">
                <img
                  src={CANDIDATE_INFO.photo}
                  alt="Salimata - Candidate à la Présidence du BDE"
                  className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="inline-block px-2.5 py-0.5 bg-sky-500 text-white font-bold text-[11px] uppercase tracking-wider rounded-md shadow-sm">
                      Tête de Liste
                    </span>
                    <h3 className="text-2xl font-black text-white">{CANDIDATE_INFO.name}</h3>
                    <p className="text-xs text-sky-100 font-medium">{CANDIDATE_INFO.title}</p>
                  </div>
                </div>
              </div>

              {/* Slogan en bas du portrait */}
              <div className="mt-4 p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-center">
                <p className="text-xs font-bold text-sky-700 dark:text-sky-300">
                  &laquo; {CANDIDATE_INFO.slogan} &raquo;
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
