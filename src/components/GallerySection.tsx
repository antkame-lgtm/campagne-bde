"use client";

import React from "react";
import { Camera, Users, Target } from "lucide-react";

export default function GallerySection() {
  const galleryItems = [
    {
      src: "/images/sami-groupe.jpg",
      title: "Séminaire d'intégration au SAMI",
      badge: "SAMI • Cohésion",
      icon: Users,
      description: "Moments forts et rassemblement de la communauté étudiante lors du séminaire au SAMI : esprit d'équipe, partage et dynamique collective.",
    },
    {
      src: "/images/sami-paintball.jpg",
      title: "Activité Paintball & Esprit d'équipe",
      badge: "SAMI • Activités",
      icon: Target,
      description: "Défis sportifs et activités en plein air au SAMI pour tisser des liens forts et fédérer les étudiants de toutes les promotions.",
    },
  ];

  return (
    <section id="photos" className="py-16 sm:py-24 bg-white dark:bg-[#020c1b] border-b border-sky-200/80 dark:border-sky-900/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200 dark:border-sky-800 shadow-2xs">
            <Camera className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Vie de campus &amp; événements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-700 dark:text-sky-300 tracking-tight [text-wrap:balance]">
            Moments forts au SAMI
          </h2>
          <p className="mt-4 text-base sm:text-lg text-sky-800 dark:text-sky-200 font-medium leading-relaxed">
            Retour en images sur les activités d&apos;intégration et de cohésion étudiante au SAMI : esprit d&apos;équipe, dynamisme et convivialité au cœur de notre vision.
          </p>
        </div>

        {/* Grille des photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {galleryItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.src}
                className="group rounded-3xl overflow-hidden border border-sky-200/80 dark:border-sky-800/80 bg-white dark:bg-[#041833]/80 shadow-xs hover:shadow-xl hover:shadow-sky-900/5 hover:border-sky-400 dark:hover:border-sky-600 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative overflow-hidden aspect-16/9 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 backdrop-blur-md text-white border border-white/20 shadow-md">
                      <Icon className="w-3 h-3 text-sky-300" />
                      <span>{item.badge}</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-sky-800 dark:text-sky-200 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-sky-800/80 dark:text-sky-300 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
