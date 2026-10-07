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
    <section id="elections" className="py-16 sm:py-24 bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-[#1E3A8A] dark:text-blue-300 rounded-md text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200/60 dark:border-blue-900/40">
            <Vote className="w-3.5 h-3.5" />
            <span>Modalités Officielles de Scrutin</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Guide du Vote &amp; Protocole Électoral
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Toutes les informations pratiques pour exprimer votre suffrage en toute sérénité
            le jour du scrutin électoral.
          </p>
        </div>

        {/* 3 Cartes Étapes du Vote */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-[#1E3A8A] dark:text-blue-300 w-fit mb-3">
              ÉTAPE 01
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Quand voter ?</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Le scrutin aura lieu le <strong>Vendredi 23 Octobre 2026</strong>. Les urnes physiques et électroniques seront ouvertes sans interruption de <strong>08h00 à 18h00</strong>.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 w-fit mb-3">
              ÉTAPE 02
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Quels justificatifs ?</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Présentez votre <strong>carte étudiante de l&apos;école</strong> ou une pièce d&apos;identité officielle (carte nationale d&apos;identité, passeport, permis de conduire).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 w-fit mb-3">
              ÉTAPE 03
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Où voter ?</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Bureau physique dans le <strong>Hall Principal du Campus</strong>, ou via le <strong>lien sécurisé</strong> reçu par email pour les étudiants en stage ou alternance.
            </p>
          </div>
        </div>

        {/* FAQ et Ralliement au Comité */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FAQ Accordéon */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#1E3A8A] dark:text-blue-400" />
              <span>Foire Aux Questions Fréquentes</span>
            </h3>

            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white hover:text-[#1E3A8A] dark:hover:text-blue-400 cursor-pointer"
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Formulaire de Ralliement au Comité de Soutien */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#1E3A8A] dark:text-blue-400 uppercase tracking-wider mb-2">
              <UserPlus className="w-4 h-4" />
              <span>Engagement &amp; Bénévolat</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Rejoindre le Comité de Soutien
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Donnez de la voix à notre programme. Rejoignez les 420+ étudiants mobilisés 
              pour porter la liste le jour du vote.
            </p>

            {supportJoined ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">Bienvenue dans l&apos;équipe !</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Votre nom a été ajouté à la liste des soutiens officiels.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Prénom &amp; Nom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Sarah Delorme"
                    value={supportName}
                    onChange={(e) => setSupportName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#1E3A8A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Email institutionnel (@ecole.fr) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah.delorme@ecole.fr"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#1E3A8A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1E3A8A] text-white font-bold text-xs rounded-xl hover:bg-[#172554] shadow-md transition-all cursor-pointer"
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
