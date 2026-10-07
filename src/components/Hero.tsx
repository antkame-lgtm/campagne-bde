"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Sparkles, HeartHandshake, Zap, Shield, Target } from "lucide-react";
import DynamicBackground from "./DynamicBackground";
import { CANDIDATE_INFO } from "../data/mockData";

export default function Hero() {
  const valueIcons = [
    { label: "Écoute", icon: HeartHandshake, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/60" },
    { label: "Action", icon: Zap, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/60" },
    { label: "Transparence", icon: Shield, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60" },
    { label: "Ambition", icon: Target, color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60" },
  ];

  return (
    <section id="top" className="relative overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-12 pb-16 sm:pt-20 sm:pb-24 transition-colors duration-200">
      <DynamicBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête : Badge Officiel */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
          <div className="inline-flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50 dark:ring-emerald-950/60" />
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Candidature Officielle à la Présidence du BDE
            </span>
          </div>
          <span className="font-mono text-[11px] bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded text-slate-700 dark:text-slate-300">
            Mandat 2026-2027
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Colonne Gauche : Nom, Slogan, Phrase Forte & CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-amber-50 dark:bg-amber-950/60 text-[#D97706] dark:text-amber-400 font-bold text-xs uppercase tracking-wider rounded-md border border-amber-200 dark:border-amber-900/40">
                {CANDIDATE_INFO.name} • Présidence BDE
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08]">
                {CANDIDATE_INFO.slogan}
              </h1>
            </div>

            {/* Phrase forte résumant la candidature */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-l-4 border-[#1E3A8A] dark:border-blue-500 border-slate-200 dark:border-slate-800">
              <p className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200 leading-relaxed italic">
                &laquo; {CANDIDATE_INFO.strongQuote} &raquo;
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Bienvenue dans notre vision. Découvrez nos propositions pour accompagner votre réussite,
              dynamiser la vie de campus et faire entendre la voix de chaque étudiant sans filtre.
            </p>

            {/* Boutons d'Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#programme"
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-[#1E3A8A] text-white font-bold text-sm shadow-md hover:bg-[#172554] active:scale-[0.99] transition-all"
              >
                <span>Découvrir notre programme</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href="#avis"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <span>Donnez votre avis</span>
              </a>
            </div>

            {/* 4 Valeurs Clés de Campagne */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Nos 4 valeurs cardinales :
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {valueIcons.map((val) => {
                  const Icon = val.icon;
                  return (
                    <div
                      key={val.label}
                      className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center space-x-2.5"
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${val.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
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
            <div className="relative rounded-3xl bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-2xl border border-slate-200 dark:border-slate-800">
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={CANDIDATE_INFO.photo}
                  alt="Salimata - Candidate à la Présidence du BDE"
                  className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="inline-block px-2.5 py-0.5 bg-[#F59E0B] text-slate-950 font-black text-[11px] uppercase tracking-wider rounded-md">
                      Tête de Liste
                    </span>
                    <h3 className="text-2xl font-black">{CANDIDATE_INFO.name}</h3>
                    <p className="text-xs text-slate-300">{CANDIDATE_INFO.title}</p>
                  </div>
                </div>
              </div>

              {/* Slogan en bas du portrait */}
              <div className="mt-4 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-center">
                <p className="text-xs font-semibold text-[#1E3A8A] dark:text-blue-300">
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
