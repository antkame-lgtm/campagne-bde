"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import VisionSection from "../components/VisionSection";
import ProgramSection from "../components/ProgramSection";
import CalendarSection from "../components/CalendarSection";
import ImpactSection from "../components/ImpactSection";
import FeedbackSection from "../components/FeedbackSection";
import CampaignInfoSection from "../components/CampaignInfoSection";
import GallerySection from "../components/GallerySection";
import Footer from "../components/Footer";
export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 1. Initialisation du mode sombre
    const savedTheme = localStorage.getItem("theme");
    const dark = savedTheme === "dark";
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);

    // Nettoyage de l'ancien thème multi-couleurs et tokens résiduels
    localStorage.removeItem("color_theme");
    document.documentElement.removeAttribute("data-color");
    localStorage.removeItem("bde_voter_token");
    localStorage.removeItem("bde_voter_hash");
    localStorage.removeItem("student_email");
  }, []);

  const handleToggleDark = () => {
    setIsDark((previous) => {
      const next = !previous;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  const handleJoinSupport = async (name: string, email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        return { success: false, error: data.error || "Impossible d'enregistrer votre ralliement." };
      }
      return { success: true };
    } catch (error) {
      console.error("Erreur d'adhésion au comité :", error);
      return { success: false, error: "Erreur réseau lors de l'enregistrement de votre ralliement." };
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-[#020c1b] text-sky-900 dark:text-sky-100 transition-colors duration-200">
      <Navbar
        isDark={isDark}
        onToggleDark={handleToggleDark}
      />
      <Hero />
      <AboutSection />
      <VisionSection />
      <ProgramSection />
      <CalendarSection />
      <ImpactSection />
      <FeedbackSection />
      <CampaignInfoSection onJoinSupport={handleJoinSupport} />
      <GallerySection />
      <Footer />
    </main>
  );
}
