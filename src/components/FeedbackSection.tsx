"use client";

import React, { useState } from "react";
import type { StudentIdea } from "../data/mockData";
import {
  MessageSquare,
  AlertCircle,
  Check,
  Send,
  Lock,
  ShieldCheck,
  Zap,
  GraduationCap,
} from "lucide-react";
import { validateIdeaDraft } from "../lib/validation";

interface FeedbackSectionProps {
  ideas?: StudentIdea[];
  onAddIdea?: (newIdea: StudentIdea) => void;
}

export default function FeedbackSection({
  onAddIdea,
}: FeedbackSectionProps) {
  // Formulaire de proposition confidentielle
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<StudentIdea["category"]>("Idée de projet");
  const [author, setAuthor] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories: StudentIdea["category"][] = [
    "Idée de projet",
    "Activité souhaitée",
    "Difficulté rencontrée",
    "Suggestion BDE",
    "Infrastructures",
    "Pédagogie",
    "Cafétéria",
    "Événements",
    "Vie Pratique",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const validation = validateIdeaDraft({
      title,
      description,
      category,
      author,
      email,
      isAnonymous,
    });

    if (!validation.valid || !validation.sanitized) {
      setFormError(validation.error || "Formulaire incomplet.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.sanitized),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setFormError(data.error || "Impossible d'enregistrer la proposition.");
        return;
      }

      if (onAddIdea && data.data) {
        onAddIdea(data.data);
      }
      setFormSuccess(true);

      setTimeout(() => {
        setTitle("");
        setDescription("");
        setEmail("");
        setAuthor("");
        setIsAnonymous(false);
        setFormSuccess(false);
      }, 4000);
    } catch {
      setFormError("Erreur réseau lors de l'enregistrement de votre proposition.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="avis" className="py-16 sm:py-24 bg-white dark:bg-[#020c1b] border-b border-sky-200/80 dark:border-sky-900/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Lock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Boîte à idées confidentielle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-700 dark:text-sky-300 tracking-tight [text-wrap:balance]">
            &laquo; Quelle est LA chose que vous aimeriez voir changer à l&apos;école ? &raquo;
          </h2>
          <p className="mt-4 text-base sm:text-lg text-sky-800 dark:text-sky-200 font-medium leading-relaxed">
            Vos propositions restent <strong>strictement privées</strong> et ne sont pas publiées sur le site. Elles sont transmises en direct à Salimata et son équipe pour nourrir notre plan d&apos;action.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Colonne Gauche (5 cols) : Engagements & Discrétion */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-sky-50/70 dark:bg-[#041833]/70 p-6 sm:p-8 rounded-3xl border border-sky-200/80 dark:border-sky-800/80 shadow-xs space-y-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-sky-100 dark:bg-sky-900/80 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-sky-800 dark:text-sky-200">
                  Votre parole en toute confiance
                </h3>
                <p className="text-xs sm:text-sm text-sky-700 dark:text-sky-300 leading-relaxed font-normal">
                  Nous privilégions un dialogue direct et authentique. Chaque retour est traité avec le plus grand sérieux.
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-sky-200/60 dark:border-sky-800/60 text-xs sm:text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-xl bg-white dark:bg-[#020c1b] border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sky-800 dark:text-sky-200">Zéro affichage public</h4>
                    <p className="text-sky-700/80 dark:text-sky-400 text-xs mt-0.5">
                      Aucune proposition n&apos;est visible par des tiers sur le site.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-xl bg-white dark:bg-[#020c1b] border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sky-800 dark:text-sky-200">Alerte instantanée</h4>
                    <p className="text-sky-700/80 dark:text-sky-400 text-xs mt-0.5">
                      Transmis en temps réel sur le canal de travail de la candidate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-xl bg-white dark:bg-[#020c1b] border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sky-800 dark:text-sky-200">Filtre étudiant certifié</h4>
                    <p className="text-sky-700/80 dark:text-sky-400 text-xs mt-0.5">
                      L&apos;adresse @univ.tgmaster.com valide l&apos;appartenance à notre école.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire Principal (Colonne Droite - 7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#041833]/80 p-6 sm:p-8 rounded-3xl border border-sky-200/80 dark:border-sky-800/80 shadow-xs transition-colors">
            <div className="pb-4 mb-5 border-b border-sky-100 dark:border-sky-900/60">
              <h3 className="text-base font-bold text-sky-700 dark:text-sky-300 flex items-center space-x-2">
                <Send className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Déposer une suggestion confidentielle</span>
              </h3>
            </div>

            {formSuccess ? (
              <div className="p-8 bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 mx-auto flex items-center justify-center font-bold">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-sky-800 dark:text-sky-200">
                  Merci pour votre contribution !
                </h4>
                <p className="text-xs sm:text-sm text-sky-700 dark:text-sky-300 font-medium max-w-md mx-auto leading-relaxed">
                  Votre proposition a bien été transmise en toute confidentialité à Salimata et à l&apos;équipe de campagne.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formError && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Choix du type de proposition */}
                <div>
                  <label className="block text-xs font-bold text-sky-700 dark:text-sky-300 uppercase mb-1">
                    Thématique de la suggestion *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as StudentIdea["category"])}
                    className="w-full px-4 py-2.5 rounded-xl border border-sky-200 dark:border-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-400 text-sm bg-white dark:bg-[#020c1b] text-sky-900 dark:text-sky-100 font-medium"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Titre */}
                <div>
                  <label className="block text-xs font-bold text-sky-700 dark:text-sky-300 uppercase mb-1">
                    Titre court de votre proposition *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Organisation d'ateliers de préparation aux entretiens..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-sky-200 dark:border-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-400 text-sm bg-white dark:bg-[#020c1b] text-sky-900 dark:text-sky-100 font-medium"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-sky-700 dark:text-sky-300 uppercase mb-1">
                    Précisez votre idée ou besoin *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Expliquez en quelques lignes votre suggestion, le problème rencontré ou l'événement souhaité..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-sky-200 dark:border-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-400 text-sm bg-white dark:bg-[#020c1b] text-sky-900 dark:text-sky-100 font-medium resize-none"
                    required
                  />
                </div>

                {/* Email institutionnel */}
                <div>
                  <label className="block text-xs font-bold text-sky-700 dark:text-sky-300 uppercase mb-1">
                    Email étudiant institutionnel (@univ.tgmaster.com) *
                  </label>
                  <input
                    type="email"
                    placeholder="prenom.nom@univ.tgmaster.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-sky-200 dark:border-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-400 text-sm bg-white dark:bg-[#020c1b] text-sky-900 dark:text-sky-100 font-medium"
                    required
                  />
                  <span className="text-[11px] text-sky-600 dark:text-sky-400 mt-1 block">
                    Sert exclusivement à certifier votre statut étudiant. Jamais diffusé.
                  </span>
                </div>

                {/* Auteur et case Anonyme */}
                <div className="space-y-2 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-sky-700 dark:text-sky-300 uppercase mb-1">
                      Votre Prénom &amp; Promo (Optionnel)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Marc (L2 Finance)"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      disabled={isAnonymous}
                      className="w-full px-4 py-2.5 rounded-xl border border-sky-200 dark:border-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-400 text-sm bg-white dark:bg-[#020c1b] text-sky-900 dark:text-sky-100 font-medium disabled:opacity-50"
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      type="checkbox"
                      id="anon-check"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded border-sky-300 text-sky-700 focus:ring-sky-700 h-4 w-4 cursor-pointer"
                    />
                    <label htmlFor="anon-check" className="text-xs text-sky-700 dark:text-sky-300 font-medium cursor-pointer">
                      Garder ma proposition 100% anonyme
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm rounded-xl shadow-md shadow-sky-900/20 transition-all flex items-center justify-center space-x-2 ${
                    isSubmitting ? "opacity-60 cursor-not-allowed" : "cursor-pointer active:scale-[0.99]"
                  }`}
                >
                  <Send className="w-4 h-4 text-sky-200" />
                  <span>{isSubmitting ? "Transmission en cours..." : "Transmettre ma suggestion en privé"}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
