"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import DynamicBackground from "./DynamicBackground";
import { CANDIDATE_INFO } from "../data/mockData";

export default function Hero() {
  const values = ["Écoute", "Action", "Transparence", "Ambition"];

  return (
    <section id="top" className="relative overflow-hidden bg-white dark:bg-slate-950 border-b border-sky-100 dark:border-sky-950/80 pt-16 pb-20 sm:pt-24 sm:pb-28 transition-colors duration-200">
      <DynamicBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Colonne Gauche : Aérée, typographique, épurée */}
          <div className="lg:col-span-7 space-y-7">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 rounded-full text-xs font-bold uppercase tracking-wider border border-sky-200/80 dark:border-sky-800">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span>Salimata • Élections BDE 2026-2027</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-sky-600 dark:text-sky-400 tracking-tight leading-[1.08]">
                {CANDIDATE_INFO.slogan}
              </h1>

              {/* Phrase forte épurée sans double encadré lourd */}
              <p className="text-lg sm:text-xl font-semibold text-sky-800 dark:text-sky-200 leading-relaxed italic border-l-3 border-sky-500 pl-4 py-1">
                &laquo; {CANDIDATE_INFO.strongQuote} &raquo;
              </p>
            </div>

            <p className="text-base text-sky-800/90 dark:text-sky-300 leading-relaxed max-w-xl font-medium">
              Bienvenue dans notre vision. Découvrez nos propositions pour accompagner votre réussite, 
              dynamiser la vie de campus et faire entendre votre voix au quotidien.
            </p>

            {/* Actions principales aérées */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <a
                href="#programme"
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 active:scale-[0.99] transition-all"
              >
                <span>Découvrir notre programme</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href="#avis"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 font-bold text-sm border border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-slate-800 transition-all"
              >
                <span>Donnez votre avis</span>
              </a>
            </div>

            {/* 4 Valeurs en ligne épurée sans boîtes lourdes */}
            <div className="pt-4 flex flex-wrap items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-300">
              <span className="text-sky-500 uppercase tracking-wider text-[11px] mr-1">Valeurs :</span>
              {values.map((v, i) => (
                <span
                  key={v}
                  className="px-3 py-1 bg-sky-50 dark:bg-sky-950/60 rounded-full border border-sky-200/60 dark:border-sky-900"
                >
                  {v}
                </span>
              ))}
            </div>

          </div>

          {/* Colonne Droite : Portrait épuré avec cadre minimal */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-4/5 rounded-3xl overflow-hidden shadow-2xl shadow-sky-500/10 border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-900">
              <img
                src={CANDIDATE_INFO.photo}
                alt="Salimata - Candidate à la Présidence du BDE"
                className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-950/85 via-sky-950/20 to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="inline-block px-2.5 py-0.5 bg-sky-500 text-white font-bold text-[11px] uppercase tracking-wider rounded-md">
                    Candidate à la Présidence
                  </span>
                  <h3 className="text-2xl font-black text-white">{CANDIDATE_INFO.name}</h3>
                  <p className="text-xs text-sky-200 font-medium">BDE 2026-2027</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
