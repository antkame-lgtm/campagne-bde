"use client";

import React, { useState, useEffect } from "react";
import { ThumbsUp, UserCheck, Lightbulb, X, Sparkles } from "lucide-react";

interface ActivityNotification {
  id: number;
  text: string;
  time: string;
  icon: "vote" | "support" | "idea";
}

const SAMPLE_ACTIVITIES: ActivityNotification[] = [
  { id: 1, text: "Un étudiant de Master 1 vient de voter pour l'idée #2", time: "À l'instant", icon: "vote" },
  { id: 2, text: "Camille D. (Promo 2027) a rejoint le comité de soutien", time: "Il y a 2 min", icon: "support" },
  { id: 3, text: "Nouvelle proposition déposée : 'Prises rapides au foyer'", time: "Il y a 5 min", icon: "idea" },
  { id: 4, text: "+1 vote enregistré sur l'Axe 4 (RSE & Écologie)", time: "Il y a 8 min", icon: "vote" },
  { id: 5, text: "Un étudiant vient de générer sa Story Instagram BDE", time: "Il y a 11 min", icon: "support" },
];

export default function LiveToast() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % SAMPLE_ACTIVITIES.length);
        setVisible(true);
      }, 400);
    }, 7000);

    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;

  const current = SAMPLE_ACTIVITIES[currentIdx];

  const getIcon = () => {
    switch (current.icon) {
      case "vote":
        return <ThumbsUp className="w-4 h-4 text-[#F59E0B]" />;
      case "support":
        return <UserCheck className="w-4 h-4 text-emerald-500" />;
      case "idea":
      default:
        return <Lightbulb className="w-4 h-4 text-[#3B82F6]" />;
    }
  };

  return (
    <div
      className={`fixed bottom-4 left-4 z-40 max-w-sm transition-all duration-300 transform ${
        visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-2 opacity-0 scale-95"
      }`}
    >
      <div className="flex items-center space-x-3 p-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-950/10">
        <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
          {getIcon()}
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1 leading-tight">
            {current.text}
          </p>
          <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{current.time} • En direct</span>
          </div>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md"
          title="Masquer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
