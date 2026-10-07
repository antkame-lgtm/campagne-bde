"use client";

import React, { useState } from "react";
import { LifeBuoy, ShieldCheck, BookOpen, Users, Lock, Send, CheckCircle2, FileText, Download } from "lucide-react";

export default function SosSection() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !email.trim()) return;

    setSent(true);
    setTimeout(() => {
      setSubject("");
      setMessage("");
      setEmail("");
      setSent(false);
    }, 4000);
  };

  const sampleResources = [
    { title: "Annales Mathématiques & Algorithmique (2024-2025)", size: "2.4 Mo", format: "PDF" },
    { title: "Fiches de Révision - Gestion Financière & Droit", size: "1.8 Mo", format: "PDF" },
    { title: "Guide de Survie du Nouvel Arrivant sur le Campus", size: "4.1 Mo", format: "PDF" },
  ];

  return (
    <section id="sos" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Entraide &amp; Solidarité</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Espace &quot;SOS Étudiant&quot; &amp; Guichet d&apos;Aide
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Personne ne doit rester isolé. Que vous ayez besoin d&apos;un soutien académique, d&apos;une aide
            sociale d&apos;urgence ou d&apos;un tuteur, notre pôle solidarité est là pour vous accompagner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Colonne Gauche : Formulaire Confidentiel Chiffré */}
          <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <Lock className="w-5 h-5 text-[#1E3A8A]" />
                <span>Formulaire d&apos;Urgence Confidentiel</span>
              </h3>
              <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Chiffré SSL</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Vos informations sont strictement confidentielles et ne sont traitées que par le référent solidarité
              du bureau, avec votre accord.
            </p>

            {sent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-sm">Message transmis en toute confidentialité</h4>
                <p className="text-xs text-emerald-700">
                  Un membre référent prendra contact avec vous dans les 24 heures en toute discrétion.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Nature de la demande
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#1E3A8A]"
                  >
                    <option value="difficultes-cours">Difficultés scolaires / Recherche d&apos;un tuteur</option>
                    <option value="soutien-social">Aide sociale d&apos;urgence / Précarité</option>
                    <option value="litige-logement">Litige stage / logement / administration</option>
                    <option value="autre">Autre situation personnelle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Votre email de contact (ou numéro WhatsApp) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="prenom.nom@ecole.fr ou 06 XX XX XX XX"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#1E3A8A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Votre message (explication libre) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Expliquez brièvement votre situation pour que nous puissions orienter l'aide adéquate..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#1E3A8A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1E3A8A] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#172554] shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer la demande confidentielle</span>
                </button>
              </form>
            )}
          </div>

          {/* Colonne Droite : Tutorat & Ressources Pédagogiques */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Boîte Tutorat */}
            <div className="p-6 rounded-3xl bg-blue-50/60 border border-blue-200">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1E3A8A] flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Plateforme de Tutorat Solidaire</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Des étudiants de Master et de 3e année s&apos;engagent bénévolement pour vous aider
                à réviser vos partiels et rattrapages.
              </p>
              <div className="flex gap-2">
                <a
                  href="#sos"
                  className="px-3 py-1.5 rounded-lg bg-[#1E3A8A] text-white text-xs font-bold shadow-xs hover:bg-[#172554]"
                >
                  Devenir Tuteur
                </a>
                <a
                  href="#sos"
                  className="px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-[#1E3A8A] text-xs font-bold hover:bg-blue-50"
                >
                  Demander un Tuteur
                </a>
              </div>
            </div>

            {/* Banque d'Annales */}
            <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-200">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#F59E0B] flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">Banque de Ressources &amp; Annales</h4>
              <p className="text-xs text-slate-600 mb-4">
                Sujets d&apos;examens des années précédentes corrigés et partagés.
              </p>

              <div className="space-y-2">
                {sampleResources.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white border border-amber-100 flex items-center justify-between hover:border-amber-300 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-800 line-clamp-1">{res.title}</span>
                    </div>
                    <button
                      onClick={() => alert(`Téléchargement de : ${res.title}`)}
                      className="p-1 rounded-md text-amber-700 hover:bg-amber-50"
                      title="Télécharger"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
