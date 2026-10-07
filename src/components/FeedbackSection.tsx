"use client";

import React, { useState } from "react";
import { StudentIdea, INSPIRATION_QUESTIONS } from "../data/mockData";
import {
  ThumbsUp,
  Search,
  MessageSquare,
  AlertCircle,
  Lightbulb,
  Check,
  Sparkles,
  ArrowRight,
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
        return "bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800";
      case "En étude":
        return "bg-sky-50/60 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900";
      case "Pris en compte":
      default:
        return "bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800";
    }
  };

  return (
    <section id="avis" className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-b border-sky-200 dark:border-sky-900/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
            <span>Section 7 • Donnez-nous votre avis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-600 dark:text-sky-400 tracking-tight">
            &laquo; Quelle est LA chose que vous aimeriez voir changer à l&apos;école ? &raquo;
          </h2>
          <p className="mt-4 text-base sm:text-lg text-sky-800 dark:text-sky-200 font-medium leading-relaxed">
            Votre voix façonne directement notre mandat. Déposez votre suggestion, votez pour celles 
            de vos camarades et suivez leur prise en compte par le bureau.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Formulaire Principal (Colonne Gauche - 5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-sky-200 dark:border-sky-800 shadow-xl shadow-sky-500/5 transition-colors">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-sky-100 dark:border-sky-800">
              <h3 className="text-lg font-bold text-sky-700 dark:text-sky-300 flex items-center space-x-2">
                <Send className="w-4 h-4 text-sky-500" />
                <span>Votre Proposition</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowInspiration(!showInspiration)}
                className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                <span>{showInspiration ? "Masquer les idées" : "Besoin d'inspiration ?"}</span>
              </button>
            </div>

            {/* Module d'Inspiration Candy Blue */}
            {showInspiration && (
              <div className="mb-6 p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-sky-800 dark:text-sky-300">
                  <Lightbulb className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Suggestions prêtes à l&apos;emploi (cliquez pour remplir) :</span>
                </div>
                <div className="space-y-2">
                  {INSPIRATION_QUESTIONS.map((group) => (
                    <div key={group.category} className="space-y-1">
                      <div className="text-[11px] font-bold uppercase text-sky-700 dark:text-sky-400">
                        {group.category} :
                      </div>
                      <div className="flex flex-col gap-1">
                        {group.examples.map((ex, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleApplyInspiration(group.category, ex)}
                            className="text-left text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-sky-100/60 dark:hover:bg-slate-800 text-sky-900 dark:text-sky-100 border border-sky-200 dark:border-sky-800 transition-colors flex items-center justify-between group cursor-pointer shadow-2xs"
                          >
                            <span className="line-clamp-1 font-medium">{ex}</span>
                            <ArrowRight className="w-3 h-3 text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formSuccess ? (
              <div className="p-6 bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 rounded-2xl text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 mx-auto flex items-center justify-center font-bold">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-sky-800 dark:text-sky-200">
                  Merci pour votre contribution !
                </h4>
                <p className="text-xs text-sky-700 dark:text-sky-300 font-medium">
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
                  <label className="block text-xs font-bold text-sky-700 dark:text-sky-300 uppercase mb-1">
                    Type de retour *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as StudentIdea["category"])}
                    className="w-full px-4 py-2.5 rounded-xl border border-sky-200 dark:border-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm bg-white dark:bg-slate-950 text-sky-900 dark:text-sky-100 font-medium"
                  >
                    <option value="Idée de projet">Une idée de projet</option>
                    <option value="Activité souhaitée">Une activité souhaitée</option>
                    <option value="Difficulté rencontrée">Une difficulté rencontrée</option>
                    <option value="Suggestion BDE">Une suggestion pour le BDE</option>
                  </select>
                </div>

                {/* Titre */}
                <div>
                  <label className="block text-xs font-bold text-sky-700 dark:text-sky-300 uppercase mb-1">
                    Titre court *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Permanence tutorat le jeudi soir..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-sky-200 dark:border-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm bg-white dark:bg-slate-950 text-sky-900 dark:text-sky-100 font-medium"
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
                    placeholder="Détaillez ce que vous aimeriez voir changer et comment l'équipe peut vous aider..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-sky-200 dark:border-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm bg-white dark:bg-slate-950 text-sky-900 dark:text-sky-100 font-medium"
                    required
                  />
                </div>

                {/* Email institutionnel */}
                <div>
                  <label className="block text-xs font-bold text-sky-700 dark:text-sky-300 uppercase mb-1">
                    Email étudiant (@ecole.fr ou @univ-*.fr) *
                  </label>
                  <input
                    type="email"
                    placeholder="prenom.nom@ecole.fr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-sky-200 dark:border-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm bg-white dark:bg-slate-950 text-sky-900 dark:text-sky-100 font-medium"
                    required
                  />
                </div>

                {/* Prénom / Anonymat */}
                <div>
                  <label className="block text-xs font-bold text-sky-700 dark:text-sky-300 uppercase mb-1">
                    Prénom / Promotion (optionnel)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Sarah (M1)"
                    disabled={isAnonymous}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border border-sky-200 dark:border-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm bg-white dark:bg-slate-950 text-sky-900 dark:text-sky-100 font-medium ${
                      isAnonymous ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  />
                  <div className="mt-1.5 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="anon-check"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded-sm border-sky-300 text-sky-500 focus:ring-sky-500"
                    />
                    <label htmlFor="anon-check" className="text-xs text-sky-700 dark:text-sky-300 font-medium cursor-pointer">
                      Soumettre anonymement
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm rounded-xl shadow-md shadow-sky-500/25 transition-all cursor-pointer flex items-center justify-center space-x-2 active:scale-[0.99]"
                >
                  <Send className="w-4 h-4 text-sky-100" />
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
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-sky-500 text-white shadow-xs"
                        : "bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-800 border border-sky-200 dark:border-sky-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-60">
                <Search className="w-3.5 h-3.5 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filtrer les idées..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-950 border border-sky-200 dark:border-sky-800 rounded-xl text-xs text-sky-900 dark:text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Liste des idées soumises */}
            <div className="space-y-4">
              {filteredIdeas.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-sky-200 dark:border-sky-800">
                  <Lightbulb className="w-8 h-8 text-sky-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-sky-700 dark:text-sky-300">
                    Aucune proposition trouvée dans cette catégorie.
                  </p>
                  <p className="text-xs text-sky-600 dark:text-sky-400 font-medium mt-1">
                    Soyez le premier à proposer quelque chose via le formulaire ci-contre !
                  </p>
                </div>
              ) : (
                filteredIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-600 transition-all flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5 gap-2">
                        <span className="text-[11px] font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                          {idea.category}
                        </span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(idea.status)}`}>
                          {idea.status}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-sky-800 dark:text-sky-200 leading-snug mb-1.5">
                        {idea.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-sky-900 dark:text-sky-300 font-medium leading-relaxed mb-4">
                        {idea.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-sky-100 dark:border-sky-800 flex items-center justify-between">
                      <span className="text-xs text-sky-600 dark:text-sky-400 font-medium">
                        Par <strong className="text-sky-800 dark:text-sky-200">{idea.author}</strong> • {idea.createdAt}
                      </span>

                      <button
                        type="button"
                        onClick={() => onVote(idea.id)}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          idea.hasVoted
                            ? "bg-sky-500 text-white border-sky-600 shadow-xs"
                            : "bg-white dark:bg-slate-950 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-600 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-800"
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
