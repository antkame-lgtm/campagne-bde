"use client";

import React, { useState } from "react";
import { StudentIdea, INITIAL_IDEAS } from "../data/mockData";
import { ThumbsUp, PlusCircle, Search, ShieldCheck, Check, MessageSquare, AlertCircle, Lightbulb } from "lucide-react";
import { validateIdeaSubmission } from "../lib/validation";

interface StudentVoiceSectionProps {
  ideas: StudentIdea[];
  onAddIdea: (newIdea: StudentIdea) => void;
  onVote: (ideaId: string) => void;
}

export default function StudentVoiceSection({
  ideas,
  onAddIdea,
  onVote,
}: StudentVoiceSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Toutes");
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Formulaire d'ajout
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<StudentIdea["category"]>("Vie Pratique");
  const [author, setAuthor] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  const categories = ["Toutes", "Infrastructures", "Pédagogie", "Cafétéria", "Événements", "Vie Pratique"];

  const filteredIdeas = ideas.filter((idea) => {
    const matchesCat = activeCategory === "Toutes" || idea.category === activeCategory;
    const matchesQuery =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const validation = validateIdeaSubmission({
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

    const { title: sTitle, description: sDesc, category: sCat, author: sAuthor } = validation.sanitized;

    const newIdea: StudentIdea = {
      id: `idea-${Date.now()}`,
      title: sTitle,
      description: sDesc,
      category: sCat,
      author: sAuthor,
      votes: 1,
      status: "Pris en compte",
      createdAt: "À l'instant",
      hasVoted: true,
    };

    onAddIdea(newIdea);
    setFormSuccess(true);

    // Reset après succès
    setTimeout(() => {
      setTitle("");
      setDescription("");
      setEmail("");
      setAuthor("");
      setIsAnonymous(false);
      setFormSuccess(false);
      setShowForm(false);
    }, 2000);
  };

  const handleVoteClick = (id: string) => {
    onVote(id);
  };

  const getStatusBadge = (status: StudentIdea["status"]) => {
    switch (status) {
      case "Intégré au programme":
        return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "En étude":
        return "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "Pris en compte":
      default:
        return "bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800";
    }
  };

  return (
    <section id="voix-etudiante" className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/60 text-[#F59E0B] border border-amber-200 dark:border-amber-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Démocratie Participative Certifiée</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              La Boîte à Idées : Proposez &amp; Votez
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              Chaque voix compte. Déposez vos propositions, votez pour vos priorités et suivez leur statut
              en toute transparence. 1 étudiant = 1 vote par proposition.
            </p>
          </div>

          <div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#1E3A8A] text-white font-bold text-sm shadow-md hover:bg-[#172554] transition-all cursor-pointer"
            >
              <PlusCircle className="w-5 h-5 text-amber-400" />
              <span>{showForm ? "Fermer le formulaire" : "Soumettre une idée"}</span>
            </button>
          </div>
        </div>

        {/* Formulaire de Soumission Rétractable */}
        {showForm && (
          <div className="mb-12 p-6 sm:p-8 bg-[#F8FAFC] dark:bg-slate-950 border-2 border-blue-100 dark:border-slate-800 rounded-3xl shadow-lg transition-colors">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-[#1E3A8A] dark:text-blue-400" />
              <span>Nouvelle Proposition Citoyenne</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Votre email universitaire est requis pour certifier votre statut d&apos;étudiant et empêcher les spams.
            </p>

            {formSuccess ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 mx-auto flex items-center justify-center font-bold">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200">Proposition enregistrée avec succès !</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Votre idée a été transmise au QG de campagne. Elle apparaît désormais avec votre vote initial.
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Titre de l&apos;idée *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Distributeur d'écouteurs ou chargeurs en bibliothèque..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Catégorie *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as StudentIdea["category"])}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                    >
                      <option value="Cafétéria">Cafétéria &amp; Restauration</option>
                      <option value="Infrastructures">Infrastructures &amp; Espaces</option>
                      <option value="Pédagogie">Pédagogie &amp; Révisions</option>
                      <option value="Événements">Événements &amp; Soirées</option>
                      <option value="Vie Pratique">Vie Pratique &amp; Transport</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Description détaillée *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Expliquez en quelques lignes en quoi cette idée améliore le quotidien des étudiants..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Email universitaire (@ecole.fr ou @univ-*.fr) *
                    </label>
                    <input
                      type="email"
                      placeholder="prenom.nom@ecole.fr"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Votre prénom / Pseudo (optionnel)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Thomas M."
                      disabled={isAnonymous}
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 ${
                        isAnonymous ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    />
                    <div className="mt-1 flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded-sm border-slate-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                      />
                      <label htmlFor="anonymous" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                        Publier sous le nom &quot;Anonyme&quot;
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1E3A8A] text-white font-bold text-sm rounded-xl hover:bg-[#172554] shadow-md transition-all cursor-pointer"
                  >
                    Publier ma proposition
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Barre de Filtres & Recherche */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Onglets Catégories */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#1E3A8A] text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Recherche */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher une idée..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:bg-white dark:focus:bg-slate-900 transition-all"
            />
          </div>
        </div>

        {/* Liste des Cartes d'Idées */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredIdeas.length === 0 ? (
            <div className="col-span-2 text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
              <Lightbulb className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Aucune idée trouvée pour cette recherche.</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-3 text-xs font-bold text-[#1E3A8A] dark:text-blue-400 hover:underline cursor-pointer"
              >
                Soyez le premier à en proposer une !
              </button>
            </div>
          ) : (
            filteredIdeas.map((idea) => (
              <div
                key={idea.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <span className="text-[11px] font-bold text-[#1E3A8A] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-100 dark:border-blue-800">
                      {idea.category}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getStatusBadge(idea.status)}`}>
                      {idea.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug mb-2">
                    {idea.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {idea.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Par <span className="font-semibold text-slate-700 dark:text-slate-200">{idea.author}</span> • {idea.createdAt}
                  </div>

                  <button
                    onClick={() => handleVoteClick(idea.id)}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      idea.hasVoted
                        ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                        : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-300 hover:bg-amber-50/50 dark:hover:bg-amber-950/40 hover:text-amber-800 dark:hover:text-amber-300"
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${idea.hasVoted ? "fill-white" : ""}`} />
                    <span>{idea.votes}</span>
                    <span className="hidden sm:inline">{idea.hasVoted ? "Voté !" : "Soutenir"}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
