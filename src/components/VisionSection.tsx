"use client";

import React from "react";
import { TEAM_MEMBERS, PILLARS } from "../data/mockData";
import { CheckCircle2, HeartHandshake, Shield, Sparkles, Target, Users } from "lucide-react";

export default function VisionSection() {
  const values = [
    {
      title: "Écoute",
      desc: "Chaque proposition et remarque étudiante est prise en considération sans filtre.",
      icon: HeartHandshake,
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      title: "Rigueur",
      desc: "Gestion budgétaire transparente avec publication semestrielle des comptes.",
      icon: Shield,
      color: "text-amber-600 bg-amber-50 border-amber-200"
    },
    {
      title: "Solidarité",
      desc: "Aide d'urgence, tutorat et lutte contre toute forme d'isolement ou précarité.",
      icon: Sparkles,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    {
      title: "Ambition",
      desc: "Faire rayonner notre école auprès des entreprises et du réseau des diplômés.",
      icon: Target,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200"
    }
  ];

  return (
    <section id="vision" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 text-[#1E3A8A] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Vision & Équipe Pressentie</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Une équipe engagée, représentative et transparente
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Notre liste rassemble des étudiants de différentes filières, unis par une volonté commune :
            redonner du pouvoir d&apos;action et de la convivialité à notre vie de campus.
          </p>
        </div>

        {/* 4 Valeurs Cardinales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 ${val.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{val.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Trombinoscope de l'Équipe */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Le Bureau Pressenti</h3>
              <p className="text-sm text-slate-500">Des profils complémentaires au service de vos projets quotidiens.</p>
            </div>
            <span className="inline-flex items-center text-xs font-semibold px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg w-fit">
              6 Pôles Opérationnels
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-[#F8FAFC] rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-slate-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold rounded-lg shadow-xs">
                      {member.role}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{member.name}</h4>
                    <p className="text-xs font-semibold text-[#1E3A8A] mb-3">{member.filiere}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{member.bio}</p>
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
