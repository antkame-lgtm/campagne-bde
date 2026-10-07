"use client";

import React, { useState } from "react";
import { LifeBuoy, ShieldCheck, BookOpen, Users, Lock, CheckCircle2, Download } from "lucide-react";

export default function SosSection() {
  const [subject, setSubject] = useState("difficultes-cours");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !email.trim()) return;

    setSent(true);
    setTimeout(() => {
      setSubject("difficultes-cours");
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
    <section id="sos" className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/50 rounded-md text-xs font-bold uppercase tracking-wider mb-3">
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Entraide, Tutorat &amp; Solidarité d&apos;Urgence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Espace &quot;SOS Étudiant&quot; &amp; Guichet d&apos;Aide Confidentiel
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Personne ne doit rester isolé. Que vous ayez besoin d&apos;un soutien académique, d&apos;une aide
            sociale d&apos;urgence ou d&apos;un tuteur, notre pôle solidarité est là pour vous accompagner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Colonne Gauche : Formulaire Confidentiel Chiffré */}
          <div className="lg:col-span-7 bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Lock className="w-5 h-5 text-[#1E3A8A] dark:text-blue-400" />
                <span>Formulaire d&apos;Urgence Confidentiel</span>
              </h3>
              <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Chiffré SSL</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Vos informations sont strictement confidentielles et ne sont traitées que par le référent solidarité
              du bureau, avec votre accord explicite.
            </p>

            {sent ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">Message transmis en toute confidentialité</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Un membre référent prendra contact avec vous dans les 24 heures en toute discrétion.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Nature de la demande
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#1E3A8A]"
                  >
                    <option value="difficultes-cours">Difficultés scolaires / Recherche d&apos;un tuteur</option>
                    <option value="soutien-social">Aide sociale d&apos;urgence / Précarité</option>
                    <option value="litige-logement">Litige stage / logement / administration</option>
                    <option value="autre">Autre situation personnelle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Votre email de contact (ou numéro WhatsApp) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="prenom.nom@ecole.fr ou 06 XX XX XX XX"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#1E3A8A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Décrivez votre situation (facultatif si vous préférez en parler de vive voix)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Expliquez brièvement votre besoin..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#1E3A8A]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1E3A8A] text-white font-bold text-xs rounded-xl hover:bg-[#172554] shadow-md transition-all cursor-pointer"
                >
                  Transmettre la demande discrètement
                </button>
              </form>
            )}
          </div>

          {/* Colonne Droite : Tutorat & Ressources de Révision */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tutorat Étudiant */}
            <div className="p-6 bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#1E3A8A] dark:text-blue-400 uppercase tracking-wider mb-2">
                <Users className="w-4 h-4" />
                <span>Réseau de Tutorat Solidaire</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Besoin d&apos;aide sur une matière ?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Nous mettons en relation des étudiants de promotion supérieure avec ceux qui rencontrent 
                des blocages méthodologiques. Gratuit et sans jugement.
              </p>
              <a
                href="https://chat.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-[#1E3A8A] dark:text-blue-400 hover:underline"
              >
                Rejoindre le groupe WhatsApp de tutorat &rarr;
              </a>
            </div>

            {/* Téléchargement d'Annales */}
            <div className="p-6 bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#F59E0B] uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Base Collaborative d&apos;Annales</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Annales &amp; Fiches de Révision
              </h4>
              <div className="space-y-2 mt-3">
                {sampleResources.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{res.title}</div>
                      <div className="text-[10px] text-slate-400">{res.format} • {res.size}</div>
                    </div>
                    <button
                      onClick={() => alert(`Téléchargement de : ${res.title}`)}
                      className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
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
