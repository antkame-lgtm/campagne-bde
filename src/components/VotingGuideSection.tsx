"use client";

import React, { useState } from "react";
import { FAQ_ITEMS } from "../data/mockData";
import { Vote, CheckCircle2, ChevronDown, ChevronUp, HelpCircle, UserPlus } from "lucide-react";

interface VotingGuideSectionProps {
  onJoinSupport: (name: string, email: string) => void;
}

export default function VotingGuideSection({ onJoinSupport }: VotingGuideSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [supportName, setSupportName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportJoined, setSupportJoined] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportName.trim() || !supportEmail.trim()) return;

    onJoinSupport(supportName.trim(), supportEmail.trim());
    setSupportJoined(true);
    setTimeout(() => {
      setSupportName("");
      setSupportEmail("");
      setSupportJoined(false);
    }, 4000);
  };

  return (
    <section id="elections" className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-b border-sky-200 dark:border-sky-900/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200 dark:border-sky-800">
            <Vote className="w-3.5 h-3.5 text-sky-500" />
            <span>Modalités Officielles de Scrutin</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-600 dark:text-sky-400 tracking-tight">
            Guide du Vote &amp; Protocole Électoral
          </h2>
          <p className="mt-3 text-base text-sky-800 dark:text-sky-200 font-medium">
            Toutes les informations pratiques pour exprimer votre suffrage en toute sérénité
            le jour du scrutin électoral.
          </p>
        </div>

        {/* 3 Cartes Étapes du Vote - Disposition aérée et épurée */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900/60 hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
            <div className="font-mono text-xs font-bold text-sky-400 mb-2">
              Étape 01
            </div>
            <h3 className="text-base sm:text-lg font-bold text-sky-700 dark:text-sky-300 mb-2">Quand voter ?</h3>
            <p className="text-xs sm:text-sm text-sky-800/80 dark:text-sky-200/90 leading-relaxed font-normal">
              Le scrutin aura lieu le <strong>Vendredi 23 Octobre 2026</strong>. Les urnes physiques et électroniques seront ouvertes sans interruption de <strong>08h00 à 18h00</strong>.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900/60 hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
            <div className="font-mono text-xs font-bold text-sky-400 mb-2">
              Étape 02
            </div>
            <h3 className="text-base sm:text-lg font-bold text-sky-700 dark:text-sky-300 mb-2">Quels justificatifs ?</h3>
            <p className="text-xs sm:text-sm text-sky-800/80 dark:text-sky-200/90 leading-relaxed font-normal">
              Présentez votre <strong>carte étudiante de l&apos;école</strong> ou une pièce d&apos;identité officielle (CNI, passeport, permis de conduire).
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900/60 hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
            <div className="font-mono text-xs font-bold text-sky-400 mb-2">
              Étape 03
            </div>
            <h3 className="text-base sm:text-lg font-bold text-sky-700 dark:text-sky-300 mb-2">Où voter ?</h3>
            <p className="text-xs sm:text-sm text-sky-800/80 dark:text-sky-200/90 leading-relaxed font-normal">
              Bureau physique dans le <strong>Hall Principal du Campus</strong>, ou via le <strong>lien sécurisé</strong> reçu par email pour les étudiants en stage ou alternance.
            </p>
          </div>
        </div>

        {/* FAQ et Ralliement au Comité - Disposition aérée */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* FAQ Accordéon */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-lg font-bold text-sky-700 dark:text-sky-300 mb-4 flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-sky-500" />
              <span>Foire Aux Questions</span>
            </h3>

            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? "border-sky-300 bg-sky-50/30 dark:bg-slate-900 dark:border-sky-700"
                      : "border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between space-x-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-sky-800 dark:text-sky-200">
                      {item.question}
                    </span>
                    <span className="p-1 rounded-full text-sky-500 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-sky-800/90 dark:text-sky-200 font-normal leading-relaxed border-t border-sky-100 dark:border-sky-900/40 pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Comité de soutien officiel - Épuré */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-sky-100 dark:border-sky-900/60 space-y-5">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 rounded-full text-xs font-semibold uppercase tracking-wider border border-sky-100 dark:border-sky-900/60">
                <UserPlus className="w-3.5 h-3.5 text-sky-500" />
                <span>Comité Officiel</span>
              </div>
              <h3 className="text-xl font-bold text-sky-700 dark:text-sky-300">
                Rejoindre le Comité de Soutien
              </h3>
              <p className="text-xs text-sky-700/80 dark:text-sky-400 font-normal leading-relaxed">
                Apportez votre signature publique pour soutenir le mandat de Salimata et recevoir nos informations de campagne.
              </p>
            </div>

            {supportJoined ? (
              <div className="p-5 bg-sky-50 dark:bg-sky-950 border border-sky-200 dark:border-sky-800 rounded-2xl text-center space-y-2">
                <div className="w-9 h-9 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 mx-auto flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-sky-800 dark:text-sky-200">Merci pour votre soutien !</h4>
                <p className="text-xs text-sky-700 dark:text-sky-400 font-medium">
                  Votre nom a été ajouté à la liste officielle des soutiens de la campagne.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-sky-700 dark:text-sky-300 uppercase mb-1">
                    Prénom &amp; Nom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Sarah Delorme"
                    value={supportName}
                    onChange={(e) => setSupportName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-sky-200 dark:border-sky-800 rounded-xl text-xs text-sky-900 dark:text-sky-100 focus:ring-2 focus:ring-sky-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-sky-700 dark:text-sky-300 uppercase mb-1">
                    Email institutionnel (@ecole.fr) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah.delorme@ecole.fr"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-sky-200 dark:border-sky-800 rounded-xl text-xs text-sky-900 dark:text-sky-100 focus:ring-2 focus:ring-sky-500 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-sm shadow-sky-500/20 transition-all cursor-pointer active:scale-[0.99]"
                >
                  Je rejoins le comité officiel
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
