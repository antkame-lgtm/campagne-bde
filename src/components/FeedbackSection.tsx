"use client";

import React, { useState } from "react";
import type { StudentIdea } from "../data/mockData";
import {
  Search,
  MessageSquare,
  AlertCircle,
  Lightbulb,
  Check,
  Send
} from "lucide-react";
import { validateIdeaDraft } from "../lib/validation";

interface FeedbackSectionProps {
  ideas: StudentIdea[];
  onAddIdea: (newIdea: StudentIdea) => void;
}

export default function FeedbackSection({
  ideas,
  onAddIdea,
}: FeedbackSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Toutes");
  const [searchQuery, setSearchQuery] = useState("");

  // Formulaire de proposition directe (validation d'adresse institutionnelle)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<StudentIdea["category"]>("Idée de projet");
  const [author, setAuthor] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Toutes",
    "Idée de projet",
    "Activité souhaitée",
    "Difficulté rencontrée",
    "Suggestion BDE",
    "Infrastructures",
    "Pédagogie",
    "Cafétéria",
    "Événements",
    "Vie Pratique"
  ];

  const filteredIdeas = ideas
    .filter((idea) => !idea.isSample)
    .filter((idea) => {
      const matchesCat = activeCategory === "Toutes" || idea.category === activeCategory;
      const matchesQuery =
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    });

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

      onAddIdea(data.data);
      setFormSuccess(true);

      setTimeout(() => {
        setTitle("");
        setDescription("");
        setEmail("");
        setAuthor("");
        setIsAnonymous(false);
        setFormSuccess(false);
      }, 3000);
    } catch {
      setFormError("Erreur réseau lors de l'enregistrement de votre proposition.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: StudentIdea["status"]) => {
    switch (status) {
      case "Intégré au programme":
        return "bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800";
      case "En étude":
        return "bg-sky-50/60 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900";
      case "Pris en compte":
      default:
        return "bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800";
    }
  };

  return (
    <section id="avis" className="py-16 sm:py-24 bg-white dark:bg-[#020c1b] border-b border-sky-200/80 dark:border-sky-900/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <MessageSquare className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Section 7 • Donnez-nous votre avis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-700 dark:text-sky-300 tracking-tight [text-wrap:balance]">
            &laquo; Quelle est LA chose que vous aimeriez voir changer à l&apos;école ? &raquo;
          </h2>
          <p className="mt-4 text-base sm:text-lg text-sky-800 dark:text-sky-200 font-medium leading-relaxed">
            Vos propositions nourrissent directement notre mandat. Déposez une idée et consultez celles de vos camarades.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Formulaire Principal (Colonne Gauche - 5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#041833]/80 p-6 sm:p-8 rounded-3xl border border-sky-200/80 dark:border-sky-800/80 shadow-xs transition-colors">
            <div className="pb-4 mb-5 border-b border-sky-100 dark:border-sky-900/60">
              <h3 className="text-base font-bold text-sky-700 dark:text-sky-300 flex items-center space-x-2">
                <Send className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Votre Proposition</span>
              </h3>
            </div>

            {formSuccess ? (
              <div className="p-6 bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 rounded-2xl text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 mx-auto flex items-center justify-center font-bold">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-sky-800 dark:text-sky-200">
                  Merci pour votre contribution !
                </h4>
                <p className="text-xs text-sky-700 dark:text-sky-300 font-medium">
                  Votre proposition a bien été enregistrée et apparaît désormais dans la boîte à idées.
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
                    Type de retour *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as StudentIdea["category"])}
                    className="w-full px-4 py-2.5 rounded-xl border border-sky-200 dark:border-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-400 text-sm bg-white dark:bg-[#020c1b] text-sky-900 dark:text-sky-100 font-medium"
                  >
                    <optgroup label="Retours de campagne">
                      <option value="Idée de projet">Une idée de projet</option>
                      <option value="Activité souhaitée">Une activité souhaitée</option>
                      <option value="Difficulté rencontrée">Une difficulté rencontrée</option>
                      <option value="Suggestion BDE">Une suggestion pour le BDE</option>
                    </optgroup>
                    <optgroup label="Thématiques étudiantes">
                      <option value="Infrastructures">Infrastructures</option>
                      <option value="Pédagogie">Pédagogie</option>
                      <option value="Cafétéria">Cafétéria</option>
                      <option value="Événements">Événements</option>
                      <option value="Vie Pratique">Vie Pratique</option>
                    </optgroup>
                  </select>
                </div>

                {/* Titre */}
                <div>
                  <label className="block text-xs font-bold text-sky-700 dark:text-sky-300 uppercase mb-1">
                    Titre court *
                  </label>
                  <input
                    type="text"
                    placeholder="Titre de votre proposition..."
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
                    rows={3}
                    placeholder="Expliquez en quelques lignes votre proposition ou le problème..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-sky-200 dark:border-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-400 text-sm bg-white dark:bg-[#020c1b] text-sky-900 dark:text-sky-100 font-medium resize-none"
                    required
                  />
                </div>

                {/* Email institutionnel */}
                <div>
                  <label className="block text-xs font-bold text-sky-700 dark:text-sky-300 uppercase mb-1">
                    Email institutionnel (@univ.tgmaster.com) *
                  </label>
                  <input
                    type="email"
                    placeholder="votre.nom@univ.tgmaster.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-sky-200 dark:border-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-400 text-sm bg-white dark:bg-[#020c1b] text-sky-900 dark:text-sky-100 font-medium"
                    required
                  />
                  <span className="text-[11px] text-sky-600 dark:text-sky-400 mt-1 block">
                    Sert uniquement à valider votre statut étudiant. Jamais affiché publiquement.
                  </span>
                </div>

                {/* Auteur et case Anonyme */}
                <div className="space-y-2 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-sky-700 dark:text-sky-300 uppercase mb-1">
                      Votre Prénom / Promo
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Salimata (L2) ou Anonyme"
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
                      className="rounded border-sky-300 text-sky-700 focus:ring-sky-700 h-4 w-4"
                    />
                    <label htmlFor="anon-check" className="text-xs text-sky-700 dark:text-sky-300 font-medium cursor-pointer">
                      Soumettre anonymement
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm rounded-xl shadow-md shadow-sky-900/20 transition-all flex items-center justify-center space-x-2 ${
                    isSubmitting ? "opacity-60 cursor-not-allowed" : "cursor-pointer active:scale-[0.99]"
                  }`}
                >
                  <Send className="w-4 h-4 text-sky-200" />
                  <span>{isSubmitting ? "Enregistrement en cours..." : "Envoyer ma proposition"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Liste des propositions étudiantes */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Barre de filtres et recherche - Pills épurées */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-sky-700 text-white shadow-xs font-bold"
                        : "bg-white dark:bg-[#041833]/80 text-sky-800 dark:text-sky-200 hover:bg-sky-50 dark:hover:bg-slate-800 border border-sky-200 dark:border-sky-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-60">
                <Search className="w-3.5 h-3.5 text-sky-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-white dark:bg-[#020c1b] border border-sky-200 dark:border-sky-800 rounded-full text-xs text-sky-900 dark:text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-400 font-medium"
                />
              </div>
            </div>

            {/* Liste des idées soumises - Aérée et lisible */}
            <div className="space-y-4">
              {filteredIdeas.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-[#041833]/60 rounded-2xl border border-dashed border-sky-200 dark:border-sky-800">
                  <Lightbulb className="w-8 h-8 text-sky-500 mx-auto mb-2" />
                  <p className="text-sm font-bold text-sky-700 dark:text-sky-300">
                    {activeCategory === "Toutes"
                      ? "La boîte à idées est ouverte !"
                      : "Aucune proposition trouvée dans cette catégorie."}
                  </p>
                  <p className="text-xs text-sky-600 dark:text-sky-400 font-medium mt-1">
                    {activeCategory === "Toutes"
                      ? "Soyez le premier à déposer une suggestion ou un besoin via le formulaire ci-contre !"
                      : "Soyez le premier à proposer quelque chose dans cette thématique !"}
                  </p>
                </div>
              ) : (
                filteredIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#041833]/80 border border-sky-200/80 dark:border-sky-800/80 hover:border-sky-400 dark:hover:border-sky-600 shadow-xs hover:shadow-md hover:shadow-sky-900/5 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5 gap-2">
                        <span className="text-[11px] font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                          {idea.category}
                        </span>
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${getStatusBadge(idea.status)}`}>
                          {idea.status}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-sky-800 dark:text-sky-200 leading-snug mb-1.5">
                        {idea.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-sky-900/80 dark:text-sky-300 font-normal leading-relaxed mb-4">
                        {idea.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-sky-100 dark:border-sky-900/50">
                      <span className="text-xs text-sky-600 dark:text-sky-400 font-medium">
                        Par <strong className="text-sky-800 dark:text-sky-200 font-semibold">{idea.author}</strong> • {idea.createdAt}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
