"use client";

import React, { useState } from "react";
import { PARTNER_OFFERS } from "../data/mockData";
import { Tag, Check, Copy, Gift } from "lucide-react";

export default function PartnersSection() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="partenariats" className="py-16 sm:py-24 bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/60 text-[#F59E0B] border border-amber-200 dark:border-amber-900/50 rounded-md text-xs font-bold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5" />
            <span>Pouvoir d&apos;Achat &amp; Avantages Étudiants</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Partenariats &amp; Bons Plans Négociés pour le Campus
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Nous avons déjà pré-négocié des avantages exclusifs pour alléger votre budget quotidien.
            Copiez votre code promo en 1 clic.
          </p>
        </div>

        {/* Grille des Offres Partenaires */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PARTNER_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {offer.category}
                  </span>
                  <Tag className="w-4 h-4 text-[#F59E0B]" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{offer.name}</h3>
                
                <div className="inline-block text-base font-extrabold text-[#1E3A8A] dark:text-blue-400 mb-3">
                  {offer.discount}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {offer.description}
                </p>
              </div>

              {/* Code Promo à copier */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase mb-1">
                  Code promo réservé :
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-700">
                  <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">{offer.code}</span>
                  <button
                    onClick={() => handleCopy(offer.code)}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                    title="Copier le code"
                  >
                    {copiedCode === offer.code ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
