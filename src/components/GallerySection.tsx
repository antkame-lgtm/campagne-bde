"use client";

import React from "react";
import { Camera, MapPin, Sparkles } from "lucide-react";
import { CAMPUS_PHOTOS } from "../data/mockData";

export default function GallerySection() {
  return (
    <section id="photos" className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-b border-sky-200 dark:border-sky-900/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200 dark:border-sky-800">
            <Camera className="w-3.5 h-3.5 text-sky-500" />
            <span>Section 8 • Sur le terrain &amp; au SAMI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-600 dark:text-sky-400 tracking-tight">
            Avec vous cette semaine &amp; au SAMI
          </h2>
          <p className="mt-4 text-base sm:text-lg text-sky-800 dark:text-sky-200 font-medium leading-relaxed">
            Les moments partagés avec les étudiants sur le campus et lors de nos rencontres au SAMI. 
            Cette galerie s&apos;enrichit tout au long de la semaine au fil des échanges !
          </p>
        </div>

        {/* Grille de photos aérée et épurée */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CAMPUS_PHOTOS.map((photo, idx) => (
            <div
              key={idx}
              className="group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900/60 hover:border-sky-300 dark:hover:border-sky-700 transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-sky-50 dark:bg-slate-950">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center space-x-1 px-3 py-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-full text-[11px] font-bold text-sky-600 dark:text-sky-300 shadow-xs border border-sky-100 dark:border-sky-800">
                    <MapPin className="w-3 h-3 text-sky-500" />
                    <span>{photo.tag}</span>
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-sky-800 dark:text-sky-200 leading-snug">
                  {photo.title}
                </h3>
                <p className="text-xs sm:text-sm text-sky-600 dark:text-sky-400 font-medium">
                  {photo.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note d'actualisation de la semaine */}
        <div className="mt-10 p-5 rounded-2xl bg-sky-50/60 dark:bg-slate-900/60 border border-sky-100 dark:border-sky-900/40 flex items-center justify-between flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-3 text-xs sm:text-sm text-sky-800 dark:text-sky-200 font-medium">
            <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
            <span>Retrouvez-nous cette semaine sur le campus et au SAMI pour échanger et immortaliser nos moments ensemble !</span>
          </div>
          <span className="text-xs font-mono font-bold text-sky-500 shrink-0">
            #Campagne2026 #SAMI
          </span>
        </div>

      </div>
    </section>
  );
}
