"use client";

import React, { useState } from "react";
import { PARTNER_OFFERS } from "../data/mockData";
import { Tag, Check, Copy, Gift, Sparkles, Building2 } from "lucide-react";

export default function PartnersSection() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="partenariats" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Pouvoir d&apos;Achat Étudiant</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Partenariats &amp; Bons Plans Négociés
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Nous avons déjà pré-négocié des avantages exclusifs pour alléger votre budget quotidien.
            Copiez votre code promo en 1 clic.
          </p>
        </div>

        {/* Grille des Offres Partenaires */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PARTNER_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {offer.category}
                  </span>
                  <Tag className="w-4 h-4 text-[#F59E0B]" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">{offer.name}</h3>
                
                <div className="inline-block text-base font-extrabold text-[#1E3A8A] mb-3">
                  {offer.discount}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {offer.description}
                </p>
              </div>

              {/* Code Promo à copier */}
              <div className="pt-4 border-t border-slate-100">
                <div className="text-[10px] text-slate-400 font-semibold uppercase mb-1">
                  Code promo réservé :
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-dashed border-slate-300">
                  <span className="font-mono text-xs font-bold text-slate-800">{offer.code}</span>
                  <button
                    onClick={() => handleCopy(offer.code)}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-all cursor-pointer"
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
