"use client";

import React, { useState, useEffect } from "react";
import { MessageSquarePlus, ArrowRight, Clock, Users, Lightbulb, CheckCircle2, Play, Sparkles } from "lucide-react";

interface HeroProps {
  totalIdeas: number;
  totalVotes: number;
  onOpenStoryModal: () => void;
}

export default function Hero({ totalIdeas, totalVotes, onOpenStoryModal }: HeroProps) {
  // Compte à rebours orienté vers la date du scrutin (ex: 23 Octobre 2026 à 08h00)
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
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-[#F8FAFC] pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-200">
      {/* Éléments visuels de fond */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-100/50 via-amber-100/30 to-sky-100/40 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Colonne Gauche : Titre, Slogan & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Badge de campagne */}
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#1E3A8A] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
              <span>Campagne Officielle • Liste &quot;Campus Uni & Connecté&quot;</span>
            </div>

            {/* Titre d'impact & Slogan */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1E293B] tracking-tight leading-[1.12]">
              Pour un campus <span className="text-[#1E3A8A] underline decoration-[#F59E0B] decoration-4 underline-offset-4">uni</span>,{" "}
              <span className="text-[#3B82F6]">connecté</span> et solidaire.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Une présidence transparente, engagée et à l&apos;écoute de chaque étudiant. Découvrez notre programme, 
              déposez vos propositions et votez pour co-construire le futur de notre vie de campus.
            </p>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#voix-etudiante"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-[#1E3A8A] text-white font-bold text-sm shadow-lg shadow-blue-900/25 hover:bg-[#172554] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
                <span>Proposer une idée / Voter</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href="#programme"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-white text-slate-800 font-bold text-sm border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-xs"
              >
                <span>Explorer le Programme</span>
              </a>

              <button
                onClick={onOpenStoryModal}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-3.5 rounded-xl bg-amber-500 text-white font-bold text-sm hover:bg-amber-600 shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Story Instagram</span>
              </button>
            </div>

            {/* Statistiques en temps réel */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/80">
              <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
                <div className="text-xl sm:text-3xl font-extrabold text-[#1E3A8A]">{totalIdeas}</div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5">Idées Soumises</div>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
                <div className="text-xl sm:text-3xl font-extrabold text-[#F59E0B]">{totalVotes}</div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5">Votes Citoyens</div>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
                <div className="text-xl sm:text-3xl font-extrabold text-[#3B82F6]">420+</div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5">Membres Soutien</div>
              </div>
            </div>

          </div>

          {/* Colonne Droite : Portrait & Compte à Rebours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Carte Candidate & Vidéo */}
            <div className="relative rounded-2xl bg-white p-4 sm:p-5 shadow-xl border border-slate-200/80">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 group">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Léa Martin - Candidate Présidente BDE"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/80 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 bg-[#F59E0B] text-slate-950 font-black text-[11px] uppercase tracking-wider rounded-md mb-1">
                      Tête de Liste
                    </span>
                    <h3 className="text-lg font-bold text-white">Léa Martin</h3>
                    <p className="text-xs text-blue-200">Candidate à la Présidence du BDE</p>
                  </div>
                </div>

                {/* Badge Vidéo d'engagement */}
                <a
                  href="#video"
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 p-2.5 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all flex items-center justify-center group/btn"
                  title="Voir la vidéo de campagne"
                >
                  <Play className="w-4 h-4 fill-[#1E3A8A] text-[#1E3A8A]" />
                </a>
              </div>

              {/* Citation de campagne */}
              <div className="mt-4 p-3 rounded-lg bg-blue-50/60 border border-blue-100 text-xs sm:text-sm text-slate-700 italic">
                &quot;Un BDE fort n&apos;est pas un club fermé : c&apos;est un accélérateur d&apos;opportunités pour chacun d&apos;entre nous.&quot;
              </div>
            </div>

            {/* Compte à Rebours Interactif */}
            <div className="bg-[#1E3A8A] text-white p-5 rounded-2xl shadow-lg shadow-blue-950/20 border border-blue-900">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Clock className="w-4 h-4" />
                  <span>Ouverture du Scrutin Électoral</span>
                </div>
                <span className="text-[11px] bg-blue-900/60 text-blue-200 px-2 py-0.5 rounded-md border border-blue-800">
                  23 Oct. 2026
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-blue-950/50 p-2.5 rounded-xl border border-blue-800/60">
                  <span className="block text-xl sm:text-2xl font-black text-white">{timeLeft.days}</span>
                  <span className="text-[10px] text-blue-300 uppercase font-semibold">Jours</span>
                </div>
                <div className="bg-blue-950/50 p-2.5 rounded-xl border border-blue-800/60">
                  <span className="block text-xl sm:text-2xl font-black text-white">{timeLeft.hours}</span>
                  <span className="text-[10px] text-blue-300 uppercase font-semibold">Heures</span>
                </div>
                <div className="bg-blue-950/50 p-2.5 rounded-xl border border-blue-800/60">
                  <span className="block text-xl sm:text-2xl font-black text-white">{timeLeft.minutes}</span>
                  <span className="text-[10px] text-blue-300 uppercase font-semibold">Min</span>
                </div>
                <div className="bg-blue-950/50 p-2.5 rounded-xl border border-blue-800/60">
                  <span className="block text-xl sm:text-2xl font-black text-[#F59E0B]">{timeLeft.seconds}</span>
                  <span className="text-[10px] text-amber-300 uppercase font-semibold">Sec</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
