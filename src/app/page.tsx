"use client";

import React, { useState } from "react";
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
import StoryGeneratorModal from "../components/StoryGeneratorModal";
import { INITIAL_IDEAS, StudentIdea } from "../data/mockData";

export default function Home() {
  const [ideas, setIdeas] = useState<StudentIdea[]>(INITIAL_IDEAS);
  const [supportCount, setSupportCount] = useState(420);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  // Gestion des idées citoyennes
  const handleAddIdea = (newIdea: StudentIdea) => {
    setIdeas((prev) => [newIdea, ...prev]);
  };

  // Gestion des Upvotes (+1 / -1)
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

  // Ralliement au comité de soutien
  const handleJoinSupport = () => {
    setSupportCount((prev) => prev + 1);
  };

  const totalVotes = ideas.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <main className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Barre de navigation sticky */}
      <Navbar onOpenStoryModal={() => setIsStoryModalOpen(true)} />

      {/* 2. Section Hero (Compte à rebours, portrait, stats direct) */}
      <Hero
        totalIdeas={ideas.length}
        totalVotes={totalVotes}
        onOpenStoryModal={() => setIsStoryModalOpen(true)}
      />

      {/* 3. Espace Vision & Équipe pressentie */}
      <VisionSection />

      {/* 4. Le Programme Interactif (4 axes & jauges de faisabilité) */}
      <ProgramSection />

      {/* 5. La Voix Étudiante (Boîte à idées + Upvotes) */}
      <StudentVoiceSection
        ideas={ideas}
        onAddIdea={handleAddIdea}
        onVote={handleVote}
      />

      {/* 6. Agenda & Calendrier des rendez-vous */}
      <AgendaSection />

      {/* 7. Partenariats & Bons Plans */}
      <PartnersSection />

      {/* 8. Espace SOS Étudiant (Aide, tutorat, annales) */}
      <SosSection />

      {/* 9. Guide du Vote, FAQ & Comité de Soutien */}
      <VotingGuideSection onJoinSupport={handleJoinSupport} />

      {/* 10. Pied de page & mentions */}
      <Footer />

      {/* Modal Levier Viral : Générateur de Story Instagram/TikTok */}
      <StoryGeneratorModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
      />
    </main>
  );
}
