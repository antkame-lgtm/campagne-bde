"use client";

import React, { useState } from "react";
import { FAQ_ITEMS } from "../data/mockData";
import { Vote, CheckCircle2, ChevronDown, ChevronUp, MessageCircle, HelpCircle, UserPlus, Send, Sparkles } from "lucide-react";

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
    <section id="elections" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 text-[#1E3A8A] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Vote className="w-3.5 h-3.5" />
            <span>Mobilisation Citoyenne</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Guide du Vote &amp; Ralliement Officiel
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Toutes les informations pratiques pour exprimer votre suffrage en toute sérénité
            le jour du scrutin électoral.
          </p>
        </div>

        {/* 3 Cartes Étapes du Vote */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1E3A8A] flex items-center justify-center font-black text-sm mb-4">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Quand voter ?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Le scrutin aura lieu le <strong>Vendredi 23 Octobre 2026</strong>. Les urnes physiques et électroniques seront ouvertes sans interruption de <strong>08h00 à 18h00</strong>.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#F59E0B] flex items-center justify-center font-black text-sm mb-4">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Quels justificatifs ?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Présentez votre <strong>carte étudiante de l&apos;école</strong> ou une pièce d&apos;identité officielle (carte d&apos;identité, passeport, permis de conduire).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm mb-4">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Où voter ?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bureau physique dans le <strong>Hall Principal</strong>, ou via le <strong>lien sécurisé</strong> reçu par email pour les étudiants en stage/alternance.
            </p>
          </div>
        </div>

        {/* FAQ et Formulaire de Soutien */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FAQ Accordéon */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#1E3A8A]" />
              <span>Foire Aux Questions (FAQ)</span>
            </h3>

            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4.5 text-left flex items-center justify-between font-bold text-sm text-slate-800 hover:text-[#1E3A8A] transition-colors"
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4.5 pb-4.5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Formulaire Comité de Soutien */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1E3A8A] to-[#172554] text-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/10 rounded-full text-[11px] font-bold text-amber-300 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Faites la Différence</span>
            </div>

            <h3 className="text-2xl font-black mb-2">Rejoindre le Comité de Soutien</h3>
            <p className="text-xs text-blue-200 leading-relaxed mb-6">
              Ralliez officiellement la liste &quot;Campus Uni &amp; Connecté&quot; et accédez au groupe WhatsApp privé
              de campagne pour suivre les coulisses et les annonces prioritaires.
            </p>

            {supportJoined ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-300 mx-auto" />
                <h4 className="font-bold text-white text-sm">Bienvenue dans l&apos;équipe !</h4>
                <p className="text-xs text-emerald-200">
                  Votre ralliement a été enregistré. Cliquez ci-dessous pour intégrer la communauté WhatsApp.
                </p>
                <a
                  href="https://chat.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Ouvrir WhatsApp</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-1">
                    Votre Prénom &amp; Nom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Léo Dupont"
                    value={supportName}
                    onChange={(e) => setSupportName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-blue-300/60 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-1">
                    Email étudiant ou Numéro *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="leo.dupont@ecole.fr"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-blue-300/60 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#F59E0B] hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Je rejoins le comité de soutien</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
