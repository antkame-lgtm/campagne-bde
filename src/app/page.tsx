"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import VisionSection from "../components/VisionSection";
import ProgramSection from "../components/ProgramSection";
import CalendarSection from "../components/CalendarSection";
import ImpactSection from "../components/ImpactSection";
import FeedbackSection from "../components/FeedbackSection";
import VotingGuideSection from "../components/VotingGuideSection";
import Footer from "../components/Footer";
import { INITIAL_IDEAS, StudentIdea } from "../data/mockData";

export default function Home() {
  const [ideas, setIdeas] = useState<StudentIdea[]>(INITIAL_IDEAS);
  const [supportCount, setSupportCount] = useState(420);
  const [isDark, setIsDark] = useState(false);

  // Gestion du Dark Mode avec synchronisation de la classe "dark" sur documentElement
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Ajout d'une nouvelle proposition étudiante
  const handleAddIdea = (newIdea: StudentIdea) => {
    setIdeas((prev) => [newIdea, ...prev]);
  };

  // Gestion des upvotes étudiants (+1 / -1)
  const handleVote = (ideaId: string) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          const hasVoted = idea.hasVoted;
          return {
            ...idea,
            votes: hasVoted ? idea.votes - 1 : idea.votes + 1,
            hasVoted: !hasVoted,
          };
        }
        return idea;
      })
    );
  };

  // Inscription au comité de soutien
  const handleJoinSupport = () => {
    setSupportCount((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* 0. Barre de Navigation Officielle */}
      <Navbar
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
      />

      {/* 1. Accueil — « Bienvenue dans notre vision » */}
      <Hero />

      {/* 2. Qui sommes-nous ? (Candidate, Parcours, Pourquoi je me présente, Les 5 pôles) */}
      <AboutSection />

      {/* 3. Notre vision (Ce que nous voulons que la vie étudiante devienne) */}
      <VisionSection />

      {/* 4. Notre programme (5 grands pôles d'action & fiches détaillées) */}
      <ProgramSection />

      {/* 5. Notre calendrier (Chronologie annuelle d'actions d'Octobre à Juin) */}
      <CalendarSection />

      {/* 6. « Concrètement, ça change quoi ? » (Problème ➔ Solution ➔ Gain direct) */}
      <ImpactSection />

      {/* 7. Donnez-nous votre avis (« Quelle est LA chose que vous aimeriez voir changer ? » + inspiration) */}
      <FeedbackSection
        ideas={ideas}
        onAddIdea={handleAddIdea}
        onVote={handleVote}
      />

      {/* Guide officiel du vote & FAQ */}
      <VotingGuideSection onJoinSupport={handleJoinSupport} />

      {/* Pied de page institutionnel */}
      <Footer />
    </main>
  );
}
