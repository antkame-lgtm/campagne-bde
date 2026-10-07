"use client";

import React, { useState } from "react";
import { StudentIdea, INSPIRATION_QUESTIONS } from "../data/mockData";
import {
  ThumbsUp,
  PlusCircle,
  Search,
  MessageSquare,
  AlertCircle,
  Lightbulb,
  Check,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send
} from "lucide-react";
import { validateIdeaSubmission } from "../lib/validation";

interface FeedbackSectionProps {
  ideas: StudentIdea[];
  onAddIdea: (newIdea: StudentIdea) => void;
  onVote: (ideaId: string) => void;
}

export default function FeedbackSection({
  ideas,
  onAddIdea,
  onVote,
}: FeedbackSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Toutes");
  const [searchQuery, setSearchQuery] = useState("");
  const [showInspiration, setShowInspiration] = useState(false);

  // Formulaire d'ajout
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<StudentIdea["category"]>("Idée de projet");
  const [author, setAuthor] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  const categories = [
    "Toutes",
    "Idée de projet",
    "Activité souhaitée",
    "Difficulté rencontrée",
    "Suggestion BDE"
  ];

  const filteredIdeas = ideas.filter((idea) => {
    const matchesCat = activeCategory === "Toutes" || idea.category === activeCategory;
    const matchesQuery =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleApplyInspiration = (cat: string, exampleText: string) => {
    setTitle(exampleText);
    setCategory(cat as StudentIdea["category"]);
    setDescription(`Proposition suggérée pour dynamiser le campus : ${exampleText}. À mettre en place avec l'équipe du BDE.`);
    setShowInspiration(false);
  };

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

    // Reset après confirmation
    setTimeout(() => {
      setTitle("");
      setDescription("");
      setEmail("");
      setAuthor("");
      setIsAnonymous(false);
      setFormSuccess(false);
    }, 2500);
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
    <section id="avis" className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/60 text-[#D97706] dark:text-amber-400 border border-amber-200 dark:border-amber-900/50 rounded-md text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Section 7 • Donnez-nous votre avis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            &laquo; Quelle est LA chose que vous aimeriez voir changer à l&apos;école ? &raquo;
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Votre voix façonne directement notre mandat. Déposez votre suggestion, votez pour celles 
            de vos camarades et suivez leur prise en compte par le bureau.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Formulaire Principal (Colonne Gauche - 5 cols) */}
          <div className="lg:col-span-5 bg-[#F8FAFC] dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Send className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400" />
                <span>Votre Proposition</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowInspiration(!showInspiration)}
                className="text-xs font-semibold text-[#D97706] dark:text-amber-400 hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{showInspiration ? "Masquer les idées" : "Besoin d'inspiration ?"}</span>
              </button>
            </div>

            {/* Module d'Inspiration / Questionnaire d'aide */}
            {showInspiration && (
              <div className="mb-6 p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/60 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 dark:text-amber-200">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Suggestions prêtes à l&apos;emploi (cliquez pour remplir) :</span>
                </div>
                <div className="space-y-2">
                  {INSPIRATION_QUESTIONS.map((group) => (
                    <div key={group.category} className="space-y-1">
                      <div className="text-[11px] font-bold uppercase text-amber-800 dark:text-amber-300">
                        {group.category} :
                      </div>
                      <div className="flex flex-col gap-1">
                        {group.examples.map((ex, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleApplyInspiration(group.category, ex)}
                            className="text-left text-xs p-2 rounded-lg bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 border border-amber-200/50 dark:border-amber-900/40 transition-colors flex items-center justify-between group cursor-pointer"
                          >
                            <span className="line-clamp-1">{ex}</span>
                            <ArrowRight className="w-3 h-3 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formSuccess ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 mx-auto flex items-center justify-center font-bold">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                  Merci pour votre contribution !
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Votre proposition a bien été enregistrée et apparaît désormais dans la boîte à idées avec votre vote.
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

                {/* Choix du type de proposition (4 options de Salimata) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Type de retour *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as StudentIdea["category"])}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Idée de projet">Une idée de projet</option>
                    <option value="Activité souhaitée">Une activité souhaitée</option>
                    <option value="Difficulté rencontrée">Une difficulté rencontrée</option>
                    <option value="Suggestion BDE">Une suggestion pour le BDE</option>
                  </select>
                </div>

                {/* Titre */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Titre court *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Permanence tutorat le jeudi soir..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Précisez votre idée ou besoin *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Détaillez ce que vous aimeriez voir changer et comment l'équipe peut vous aider..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                    required
                  />
                </div>

                {/* Email institutionnel */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Email étudiant (@ecole.fr ou @univ-*.fr) *
                  </label>
                  <input
                    type="email"
                    placeholder="prenom.nom@ecole.fr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                    required
                  />
                </div>

                {/* Prénom / Anonymat */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Prénom / Promotion (optionnel)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Sarah (M1)"
                    disabled={isAnonymous}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 ${
                      isAnonymous ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  />
                  <div className="mt-1.5 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="anon-check"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded-sm border-slate-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                    />
                    <label htmlFor="anon-check" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                      Soumettre anonymement
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1E3A8A] text-white font-bold text-sm rounded-xl hover:bg-[#172554] shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Envoyer ma proposition</span>
                </button>
              </form>
            )}
          </div>

          {/* Mur Citoyen des Retours & Votes (Colonne Droite - 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Barre de filtres et recherche */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-[#1E3A8A] text-white shadow-xs"
                        : "bg-[#F8FAFC] dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-60">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filtrer les idées..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />
              </div>
            </div>

            {/* Liste des idées soumises */}
            <div className="space-y-4">
              {filteredIdeas.length === 0 ? (
                <div className="text-center py-12 bg-[#F8FAFC] dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
                  <Lightbulb className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Aucune proposition trouvée dans cette catégorie.
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Soyez le premier à proposer quelque chose via le formulaire ci-contre !
                  </p>
                </div>
              ) : (
                filteredIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5 gap-2">
                        <span className="text-[11px] font-bold text-[#1E3A8A] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-100 dark:border-blue-900/40">
                          {idea.category}
                        </span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getStatusBadge(idea.status)}`}>
                          {idea.status}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug mb-1.5">
                        {idea.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {idea.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Par <strong className="text-slate-700 dark:text-slate-200">{idea.author}</strong> • {idea.createdAt}
                      </span>

                      <button
                        type="button"
                        onClick={() => onVote(idea.id)}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          idea.hasVoted
                            ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                            : "bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-amber-300 hover:bg-amber-50/50 dark:hover:bg-amber-950/40 hover:text-amber-800 dark:hover:text-amber-300"
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

        </div>

      </div>
    </section>
  );
}
