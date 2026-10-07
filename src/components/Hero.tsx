"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Clock, Users, Lightbulb, CheckCircle2, ShieldCheck, FileText } from "lucide-react";

interface HeroProps {
  totalIdeas: number;
  totalVotes: number;
}

export default function Hero({ totalIdeas, totalVotes }: HeroProps) {
  // Compte à rebours officiel jusqu'au scrutin
  const [timeLeft, setTimeLeft] = useState({
    days: 16,
    hours: 21,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 16);
    targetDate.setHours(8, 0, 0, 0);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16 sm:pt-16 sm:pb-24 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bandeau Supérieur : Statut Institutionnel */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-8 mb-8 border-b border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50 dark:ring-emerald-950/60" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">Campagne Officielle BDE 2026-2027</span>
            <span>•</span>
            <span>Liste « Campus Uni &amp; Connecté »</span>
          </div>
          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <span>SCRUTIN : 23 OCTOBRE 2026</span>
            <span>•</span>
            <span className="text-[#1E3A8A] dark:text-blue-400 font-bold">1 ÉTUDIANT = 1 VOIX</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Colonne Gauche : Titrage & Manifeste de Campagne */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-[#1E3A8A] dark:text-blue-300 font-bold text-xs uppercase tracking-wider rounded-md border border-blue-200/60 dark:border-blue-900/40">
                Élection de la Présidence &amp; du Bureau
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08]">
                Pour un campus <span className="text-[#1E3A8A] dark:text-blue-400">uni</span>,{" "}
                <span className="text-[#F59E0B]">connecté</span> et solidaire.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl">
              Fini les promesses sans lendemain. Notre équipe s&apos;engage sur une gouvernance transparente, 
              un budget vérifiable et une boîte à idées citoyenne où chaque proposition étudiante est étudiée 
              en conseil de mandat sous 14 jours.
            </p>

            {/* Actions Primaires */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#voix-etudiante"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-[#1E3A8A] text-white font-bold text-sm shadow-md hover:bg-[#172554] active:scale-[0.99] transition-all"
              >
                <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
                <span>Déposer une proposition / Voter</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href="#programme"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Consulter le Programme Chiffré</span>
              </a>
            </div>

            {/* Cartouche Métriques & Mobilisation */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-2xl sm:text-3xl font-black text-[#1E3A8A] dark:text-blue-400 tabular-nums">
                  {totalIdeas}
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  Propositions citoyennes
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-2xl sm:text-3xl font-black text-[#F59E0B] tabular-nums">
                  {totalVotes}
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  Suffrages exprimés
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                  420+
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  Étudiants engagés
                </div>
              </div>
            </div>

          </div>

          {/* Colonne Droite : Le Manifeste Signé & Compte à Rebours */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Tableau de Bord Compte à Rebours */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Clock className="w-4 h-4" />
                  <span>Temps restant avant le scrutin</span>
                </div>
                <span className="font-mono text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  J-16
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center font-mono">
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="block text-2xl font-black text-white">{timeLeft.days}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Jours</span>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="block text-2xl font-black text-white">{timeLeft.hours}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Heures</span>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="block text-2xl font-black text-white">{timeLeft.minutes}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Min</span>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="block text-2xl font-black text-[#F59E0B]">{timeLeft.seconds}</span>
                  <span className="text-[10px] text-amber-400 uppercase font-semibold">Sec</span>
                </div>
              </div>
            </div>

            {/* Carte d'Engagement Officiel (Manifeste de Mandat) */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-[#1E3A8A] dark:text-blue-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    Pacte de Mandat 2026-2027
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  3 Engagements Fermes
                </span>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Transparence budgétaire totale :</strong> Publication trimestrielle de chaque euro dépensé et des conventions partenaires.
                  </span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Démocratie continue :</strong> Toute proposition recueillant 50+ votes étudiants est obligatoirement soumise au vote du bureau.
                  </span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Égalité &amp; Solidarité :</strong> Aucun événement sans option solidaire à prix coûtant (&le; 5 €) et navette sécurisée.
                  </span>
                </li>
              </ul>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Signé par <strong>Léa Martin</strong> &amp; l&apos;équipe</span>
                <span className="font-mono text-[11px]">Réf. MANDAT-BDE-26</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
