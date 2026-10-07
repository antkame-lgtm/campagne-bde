"use client";

import React, { useState } from "react";
import { X, Sparkles, CheckCircle2, ArrowRight, RotateCcw, Share2, ThumbsUp } from "lucide-react";
import confetti from "canvas-confetti";

interface CampaignQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStory: () => void;
}

export default function CampaignQuizModal({
  isOpen,
  onClose,
  onOpenStory,
}: CampaignQuizModalProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    cycle: "",
    frustration: "",
    ambition: "",
  });
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handleSelect = (field: "cycle" | "frustration" | "ambition", value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      setCompleted(true);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ cycle: "", frustration: "", ambition: "" });
    setCompleted(false);
  };

  const getRecommendations = () => {
    if (answers.frustration === "cafet") {
      return [
        { axe: "Axe 1 - Vie de campus", title: "Micro-ondes supplémentaires & Prises rapides", impact: "Gain de 20 min chaque midi" },
        { axe: "Axe 1 - Convivialité", title: "Jeudi Campus Festif : Crêpes et musique", impact: "Tous les 15 jours au foyer" },
        { axe: "Partenariats", title: "-20% chez Bagel Corner & Enseignes de campus", impact: "Pouvoir d'achat immédiat" },
      ];
    }
    if (answers.frustration === "pedagogie") {
      return [
        { axe: "Axe 2 - Académique", title: "Ouverture de la bibliothèque le samedi & Tutorat solidaire", impact: "Espaces calmes pour vos partiels" },
        { axe: "Axe 2 - Ressources", title: "Banque d'annales corrigées en ligne", impact: "Téléchargement gratuit en 1 clic" },
        { axe: "SOS Étudiant", title: "Guichet d'écoute & Aide d'urgence chiffrée", impact: "Prise en charge sous 24h" },
      ];
    }
    return [
      { axe: "Axe 3 - Événementiel", title: "Grand Gala de l'École & Sortie Ski abordable", impact: "Tarifs négociés pour toutes les bourses" },
      { axe: "Axe 2 - Carrière", title: "Forum Entreprises & Simulations d'entretiens RH", impact: "Stages et alternances garantis" },
      { axe: "Axe 4 - RSE", title: "Épicerie solidaire et zéro plastique", impact: "Un campus durable et solidaire" },
    ];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
        
        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!completed ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-[#1E3A8A] dark:text-blue-300 rounded-full text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Simulateur en 30 secondes</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Trouve les 3 mesures clés pour toi
              </h3>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#F59E0B] transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Étape 1 */}
            {step === 1 && (
              <div className="space-y-3 animate-in fade-in">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                  1. Quel est ton cycle d&apos;études ?
                </p>
                {[
                  { id: "prepa", label: "Licence 1 / Licence 2 / Prépa intégrée" },
                  { id: "bachelor", label: "Licence 3 / Bachelor / 3e année" },
                  { id: "master", label: "Master / Alternant / Fin de cycle" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect("cycle", opt.id)}
                    className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#1E3A8A] hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 cursor-pointer flex items-center justify-between"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            )}

            {/* Étape 2 */}
            {step === 2 && (
              <div className="space-y-3 animate-in fade-in">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                  2. Ta priorité n°1 à améliorer sur le campus ?
                </p>
                {[
                  { id: "cafet", label: "La pause déjeuner (trop d'attente, prix, manque de places)" },
                  { id: "pedagogie", label: "La réussite académique (manque d'annales, bibli fermée le weekend)" },
                  { id: "evenements", label: "L'ambiance et la vie associative (plus de soirées, sorties, galas)" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect("frustration", opt.id)}
                    className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#1E3A8A] hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 cursor-pointer flex items-center justify-between"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            )}

            {/* Étape 3 */}
            {step === 3 && (
              <div className="space-y-3 animate-in fade-in">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                  3. Qu&apos;attends-tu principalement de ton BDE ?
                </p>
                {[
                  { id: "bonsplans", label: "Des réductions négociées et un grand gala inoubliable" },
                  { id: "solidarite", label: "Un soutien sans faille en cas de galère ou de partiels" },
                  { id: "transparence", label: "Une transparence totale sur les comptes et décisions" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect("ambition", opt.id)}
                    className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#1E3A8A] hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 cursor-pointer flex items-center justify-between"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Résultats Personnalisés */
          <div className="animate-in fade-in space-y-5">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center font-bold mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Voici tes 3 mesures sur-mesure !
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Voici comment notre programme répond directement à tes attentes quotidiennes :
              </p>
            </div>

            <div className="space-y-3">
              {getRecommendations().map((rec, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80"
                >
                  <span className="text-[10px] font-black uppercase text-[#F59E0B] tracking-wider block mb-0.5">
                    {rec.axe}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {rec.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    🎯 Impact direct : {rec.impact}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => {
                  onClose();
                  onOpenStory();
                }}
                className="flex-1 py-3 bg-[#1E3A8A] hover:bg-[#172554] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Créer ma Story de soutien</span>
              </button>

              <button
                onClick={handleReset}
                className="px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl flex items-center justify-center space-x-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Refaire</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
