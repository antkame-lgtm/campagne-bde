"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import DynamicBackground from "./DynamicBackground";
import { CANDIDATE_INFO } from "../data/mockData";

export default function Hero() {
  const values = ["Écoute", "Action", "Transparence", "Ambition"];

  return (
    <section id="top" className="relative overflow-hidden bg-white dark:bg-[#020c1b] border-b border-sky-200/80 dark:border-sky-900/60 pt-16 pb-20 sm:pt-24 sm:pb-28 transition-colors duration-200">
      <DynamicBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Colonne Gauche : Aérée, typographique, épurée et statutaire */}
          <div className="lg:col-span-7 space-y-7">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-sky-50 dark:bg-sky-950/90 text-sky-700 dark:text-sky-300 rounded-full text-xs font-bold uppercase tracking-wider border border-sky-200 dark:border-sky-800 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-sky-600 dark:bg-sky-400 animate-pulse" />
              <span>Salimata Diomande • Élections BDE 2026-2027</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-sky-700 dark:text-sky-300 tracking-tight leading-[1.08] [text-wrap:balance]">
                {CANDIDATE_INFO.slogan}
              </h1>

              {/* Citation forte avec bordure Bleu Nuit */}
              <p className="text-lg sm:text-xl font-semibold text-sky-800 dark:text-sky-200 leading-relaxed italic border-l-4 border-sky-700 dark:border-sky-500 pl-4 py-1.5">
                &laquo; {CANDIDATE_INFO.strongQuote} &raquo;
              </p>
            </div>

            <p className="text-base text-sky-800/90 dark:text-sky-300 leading-relaxed max-w-xl font-medium">
              Bienvenue dans notre vision. Découvrez nos 8 temps forts de l&apos;année, nos engagements pour 
              accompagner votre réussite et faire entendre chaque voix étudiante sur notre campus.
            </p>

            {/* Actions principales au design soigné */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <a
                href="#programme"
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-2xl bg-sky-700 hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-900/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Découvrir le programme de l&apos;année</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href="#avis"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900/90 text-sky-700 dark:text-sky-300 font-bold text-sm border border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-slate-800/80 shadow-2xs active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Boîte à idées</span>
              </a>
            </div>

            {/* 4 Valeurs fondamentales avec micro-interaction au survol */}
            <div className="pt-4 flex flex-wrap items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-300">
              <span className="text-sky-600 dark:text-sky-400 uppercase tracking-wider text-[11px] mr-1">Valeurs :</span>
              {values.map((v) => (
                <span
                  key={v}
                  className="px-3 py-1 bg-sky-50 dark:bg-sky-950/60 rounded-full border border-sky-200/80 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-600 transition-colors cursor-default"
                >
                  {v}
                </span>
              ))}
            </div>

          </div>

          {/* Affiche officielle de Salimata : Cadre éditorial soigné */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-sky-200 dark:border-sky-800/80 bg-white dark:bg-slate-900 shadow-xl shadow-sky-900/10 dark:shadow-sky-950/60 group">
              <img
                src="/images/salimata-affiche.jpg"
                alt="Affiche officielle de candidature - Diomande Salimata"
                className="w-full h-auto object-cover rounded-3xl group-hover:scale-[1.015] transition-transform duration-500"
                loading="eager"
              />
              <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 shadow-md">
                Candidate Officielle BDE
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
