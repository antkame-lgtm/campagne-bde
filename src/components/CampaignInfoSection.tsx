"use client";

import React, { useState } from "react";
import { FAQ_ITEMS } from "../data/mockData";
import { CheckCircle2, ChevronDown, ChevronUp, HelpCircle, UserPlus, AlertCircle } from "lucide-react";

interface CampaignInfoSectionProps {
  onJoinSupport: (name: string, email: string) => Promise<{ success: boolean; error?: string }>;
}

export default function CampaignInfoSection({ onJoinSupport }: CampaignInfoSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [supportName, setSupportName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportJoined, setSupportJoined] = useState(false);
  const [supportError, setSupportError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSupportSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supportName.trim() || !supportEmail.trim()) return;

    setSupportError("");
    setIsSubmitting(true);
    try {
      const result = await onJoinSupport(supportName.trim(), supportEmail.trim());
      if (result.success) {
        setSupportJoined(true);
        setTimeout(() => {
          setSupportName("");
          setSupportEmail("");
          setSupportJoined(false);
        }, 4000);
      } else {
        setSupportError(result.error || "Une erreur est survenue lors de l'enregistrement.");
      }
    } catch {
      setSupportError("Erreur réseau. Impossible d'enregistrer votre ralliement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white dark:bg-[#020c1b] border-b border-sky-200/80 dark:border-sky-900/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200 dark:border-sky-800 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Questions &amp; soutien</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-700 dark:text-sky-300 tracking-tight [text-wrap:balance]">
            Questions fréquentes et comité de soutien
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-lg font-bold text-sky-700 dark:text-sky-300 mb-4 flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Foire aux questions</span>
            </h3>

            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={item.question}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? "border-sky-300 bg-sky-50/50 dark:bg-[#041833] dark:border-sky-700 shadow-2xs"
                      : "border-sky-200/80 dark:border-sky-800/80 bg-white dark:bg-[#041833]/60 hover:border-sky-300 dark:hover:border-sky-700"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between space-x-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-sky-800 dark:text-sky-200">{item.question}</span>
                    <span className="p-1 rounded-full text-sky-600 dark:text-sky-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-sky-800/90 dark:text-sky-200 font-normal leading-relaxed border-t border-sky-100 dark:border-sky-900/60 pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-[#041833]/80 p-6 sm:p-8 rounded-3xl border border-sky-200/80 dark:border-sky-800/80 shadow-xs space-y-5">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 rounded-full text-xs font-semibold uppercase tracking-wider border border-sky-200 dark:border-sky-800">
                <UserPlus className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>Comité de soutien</span>
              </div>
              <h3 className="text-xl font-bold text-sky-700 dark:text-sky-300">Rejoindre le comité de soutien</h3>
              <p className="text-xs text-sky-800/80 dark:text-sky-300 font-normal leading-relaxed">
                Laissez vos coordonnées pour soutenir la campagne et recevoir ses informations.
              </p>
            </div>

            {supportJoined ? (
              <div className="p-5 bg-sky-50 dark:bg-sky-950 border border-sky-200 dark:border-sky-800 rounded-2xl text-center space-y-2">
                <div className="w-9 h-9 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 mx-auto flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-sky-800 dark:text-sky-200">Merci pour votre soutien !</h4>
                <p className="text-xs text-sky-700 dark:text-sky-400 font-medium">Votre inscription a été enregistrée.</p>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-3.5">
                {supportError && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{supportError}</span>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-sky-700 dark:text-sky-300 uppercase mb-1">Prénom &amp; nom *</label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    value={supportName}
                    onChange={(event) => setSupportName(event.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-[#020c1b] border border-sky-200 dark:border-sky-800 rounded-xl text-xs text-sky-900 dark:text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-400 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-sky-700 dark:text-sky-300 uppercase mb-1">Email de contact *</label>
                  <input
                    type="email"
                    required
                    value={supportEmail}
                    onChange={(event) => setSupportEmail(event.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-[#020c1b] border border-sky-200 dark:border-sky-800 rounded-xl text-xs text-sky-900 dark:text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-400 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-sky-700 hover:bg-sky-800 disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-900/20 transition-all cursor-pointer active:scale-[0.99]"
                >
                  {isSubmitting ? "Enregistrement…" : "Rejoindre le comité"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
