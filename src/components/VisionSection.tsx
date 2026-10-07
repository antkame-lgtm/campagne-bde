"use client";

import React from "react";
import { TEAM_MEMBERS } from "../data/mockData";
import { Users, GraduationCap, Award } from "lucide-react";

export default function VisionSection() {
  const values = [
    {
      num: "01",
      title: "Écoute Active & Démocratie Directe",
      desc: "Zéro décision unilatérale. Toute proposition recueillant le soutien de la communauté étudiante est inscrite à l'ordre du jour du bureau.",
      commitment: "Permanence bi-hebdomadaire ouverte"
    },
    {
      num: "02",
      title: "Rigueur & Transparence Budgétaire",
      desc: "Gestion exemplaire des fonds associatifs. Comptes publiés en ligne, conventions partenaires transparentes et zéro dépense opaque.",
      commitment: "Rapport financier public trimestriel"
    },
    {
      num: "03",
      title: "Solidarité Concrète & Anti-Précarité",
      desc: "Lutte active contre l'isolement, soutien psychologique d'urgence, tutorat méthodologique et événements accessibles à tous les budgets.",
      commitment: "Fonds d'aide d'urgence & tutorat gratuit"
    },
    {
      num: "04",
      title: "Rayonnement & Insertion Professionnelle",
      desc: "Valorisation de l'école auprès des recruteurs, partenariats diplômés (alumni) renforcés et événements carrière tout au long de l'année.",
      commitment: "Forum entreprises & réseau alumni actif"
    }
  ];

  return (
    <section id="vision" className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-[#1E3A8A] dark:text-blue-300 rounded-md text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200/60 dark:border-blue-900/40">
            <Users className="w-3.5 h-3.5" />
            <span>Notre Vision &amp; Gouvernance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Quatre principes directeurs, un mandat d&apos;actions mesurables.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Un BDE n&apos;est pas une simple machine à soirées. C&apos;est l&apos;institution qui défend vos intérêts 
            académiques, votre pouvoir d&apos;achat et la vitalité quotidienne de notre campus.
          </p>
        </div>

        {/* 4 Piliers Typographiques (Design Éditorial) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((val) => (
            <div
              key={val.num}
              className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div>
                <div className="font-mono text-2xl font-black text-[#1E3A8A] dark:text-blue-400 mb-3">
                  {val.num}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {val.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-[#1E3A8A] dark:text-blue-300 flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>{val.commitment}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Organigramme de l'Équipe Dirigeante */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Le Bureau Exécutif Pressenti
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Une équipe pluridisciplinaire unie pour un mandat de 12 mois.
              </p>
            </div>
            <span className="inline-flex items-center text-xs font-bold px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 text-[#1E3A8A] dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-900/50 w-fit">
              6 Pôles d&apos;Engagement
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-[#F8FAFC] dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-slate-900/90 text-white text-[11px] font-bold rounded-md shadow-xs">
                      {member.role}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {member.name}
                    </h4>
                    <div className="flex items-center space-x-1.5 text-xs text-[#1E3A8A] dark:text-blue-400 font-medium mt-0.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>{member.filiere}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                    ID : {member.id.toUpperCase()} • PÔLE OPÉRATIONNEL
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
