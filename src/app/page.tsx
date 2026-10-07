"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import VisionSection from "../components/VisionSection";
import ProgramSection from "../components/ProgramSection";
import StudentVoiceSection from "../components/StudentVoiceSection";
import AgendaSection from "../components/AgendaSection";
import PartnersSection from "../components/PartnersSection";
import SosSection from "../components/SosSection";
import VotingGuideSection from "../components/VotingGuideSection";
import Footer from "../components/Footer";
import { INITIAL_IDEAS, StudentIdea } from "../data/mockData";

export default function Home() {
  const [ideas, setIdeas] = useState<StudentIdea[]>(INITIAL_IDEAS);
  const [supportCount, setSupportCount] = useState(420);
  const [isDark, setIsDark] = useState(false);

  // Gestion du Dark Mode avec persistance classe html
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Ajout d'une idée étudiante après validation
  const handleAddIdea = (newIdea: StudentIdea) => {
    setIdeas((prev) => [newIdea, ...prev]);
  };

  // Upvote citoyen (+1 / -1)
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

  // Ralliement au comité de soutien officiel
  const handleJoinSupport = () => {
    setSupportCount((prev) => prev + 1);
  };

  const totalVotes = ideas.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <main className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* 1. Module 0 : Barre de navigation officielle */}
      <Navbar
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
      />

      {/* 2. Module 1 : Accueil, Candidats, Compte à rebours & Manifeste */}
      <Hero
        totalIdeas={ideas.length}
        totalVotes={totalVotes}
      />

      {/* 3. Module 2 : Notre Vision & Équipe Dirigeante (Organigramme) */}
      <VisionSection />

      {/* 4. Module 3 : Programme & Engagements (4 axes & jauges de faisabilité) */}
      <ProgramSection />

      {/* 5. Module 4 : La Voix Étudiante (Boîte à idées citoyenne & votes) */}
      <StudentVoiceSection
        ideas={ideas}
        onAddIdea={handleAddIdea}
        onVote={handleVote}
      />

      {/* 6. Module 5 : Agenda & Rendez-vous de campagne (Google Cal / ICS) */}
      <AgendaSection />

      {/* 7. Module 6 : Bons Plans & Partenariats Étudiants */}
      <PartnersSection />

      {/* 8. Module 7 : Espace SOS Étudiant (Assistance confidentielle, tutorat, annales) */}
      <SosSection />

      {/* 9. Module 8 : Guide du Vote, Modalités de Scrutin & FAQ officielle */}
      <VotingGuideSection onJoinSupport={handleJoinSupport} />

      {/* 10. Pied de page institutionnel & mentions légales */}
      <Footer />
    </main>
  );
}
