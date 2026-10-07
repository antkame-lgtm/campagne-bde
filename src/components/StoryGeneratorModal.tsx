"use client";

import React, { useState, useRef } from "react";
import { X, Download, Sparkles, Share2, Check, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";

interface StoryGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StoryGeneratorModal({ isOpen, onClose }: StoryGeneratorModalProps) {
  const [name, setName] = useState("Alex");
  const [slogan, setSlogan] = useState("Moi aussi, je vote Campus Uni !");
  const [promo, setPromo] = useState("Promo 2027");
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (!isOpen) return null;

  const slogans = [
    "Moi aussi, je vote Campus Uni !",
    "Pour un BDE transparent et solidaire",
    "Ensemble pour transformer notre campus",
    "Team Léa Martin • BDE 2026",
  ];

  const handleDownload = () => {
    setIsGenerating(true);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Dimensions standard Instagram / TikTok Story (1080 x 1920)
    canvas.width = 1080;
    canvas.height = 1920;

    // Fond Dégradé Royal Navy vers Bleu Nuit
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1920);
    gradient.addColorStop(0, "#1E3A8A");
    gradient.addColorStop(0.5, "#172554");
    gradient.addColorStop(1, "#0F172A");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // Cercles de lumière d'ambiance
    ctx.fillStyle = "rgba(245, 158, 11, 0.15)";
    ctx.beginPath();
    ctx.arc(900, 300, 400, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(59, 130, 246, 0.2)";
    ctx.beginPath();
    ctx.arc(200, 1500, 500, 0, Math.PI * 2);
    ctx.fill();

    // Cadre doré / ambre fin
    ctx.strokeStyle = "rgba(245, 158, 11, 0.6)";
    ctx.lineWidth = 12;
    ctx.strokeRect(60, 60, 960, 1800);

    // Header : Badge BDE
    ctx.fillStyle = "#F59E0B";
    ctx.beginPath();
    ctx.roundRect(140, 160, 800, 100, 50);
    ctx.fill();

    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 44px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("CAMPUS UNI & CONNECTÉ", 540, 225);

    // Titre d'engagement
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 64px sans-serif";
    ctx.fillText("JE SOUTIENS LA LISTE BDE 2026", 540, 380);

    // Carte Centrale Blanche
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.roundRect(120, 500, 840, 850, 40);
    ctx.fill();

    // Cercle Avatar Initiales
    ctx.fillStyle = "#1E3A8A";
    ctx.beginPath();
    ctx.arc(540, 680, 110, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#F59E0B";
    ctx.font = "bold 90px sans-serif";
    const initial = name.trim().charAt(0).toUpperCase() || "E";
    ctx.fillText(initial, 540, 712);

    // Prénom de l'étudiant
    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 76px sans-serif";
    ctx.fillText(name.trim() || "Étudiant", 540, 880);

    // Promo
    ctx.fillStyle = "#64748B";
    ctx.font = "500 44px sans-serif";
    ctx.fillText(promo.trim() || "Étudiant Engagé", 540, 950);

    // Séparateur
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(220, 1020);
    ctx.lineTo(860, 1020);
    ctx.stroke();

    // Citation Slogan
    ctx.fillStyle = "#1E3A8A";
    ctx.font = "italic bold 52px sans-serif";
    ctx.fillText(`“ ${slogan} ”`, 540, 1150);

    // Hashtags / Date
    ctx.fillStyle = "#F59E0B";
    ctx.font = "bold 44px sans-serif";
    ctx.fillText("SCRUTIN LE 23 OCTOBRE 2026", 540, 1260);

    // Footer : Appel à l'action
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 46px sans-serif";
    ctx.fillText("Rejoins la mobilisation sur le site officiel :", 540, 1500);

    ctx.fillStyle = "#93C5FD";
    ctx.font = "500 40px sans-serif";
    ctx.fillText("vote-bde-campus.fr", 540, 1570);

    // Badge QR Code symbolique
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    ctx.roundRect(390, 1630, 300, 120, 25);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 38px sans-serif";
    ctx.fillText("1 VOTE = 1 VOIX", 540, 1705);

    // Téléchargement
    const imageUri = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `Story_BDE_${name.replace(/\s+/g, "_")}.png`;
    link.href = imageUri;
    link.click();

    setIsGenerating(false);
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden">
        
        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* En-tête modal */}
        <div className="mb-5 text-center">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Levier Viral Réseaux Sociaux</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Générateur de Story de Soutien</h3>
          <p className="text-xs text-slate-500 mt-1">
            Générez votre visuel officiel format 9:16 pour Instagram &amp; TikTok en 1 clic.
          </p>
        </div>

        {/* Aperçu miniature de la Story */}
        <div className="relative aspect-9/12 max-h-56 mx-auto rounded-2xl bg-gradient-to-br from-[#1E3A8A] via-[#172554] to-slate-900 text-white p-4 shadow-md flex flex-col justify-between items-center text-center border-2 border-amber-400/40 mb-5">
          <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
            Campus Uni &amp; Connecté • BDE 2026
          </div>
          
          <div className="space-y-1">
            <div className="w-12 h-12 rounded-full bg-white text-[#1E3A8A] font-black text-xl flex items-center justify-center mx-auto shadow-md">
              {name.trim().charAt(0).toUpperCase() || "E"}
            </div>
            <div className="text-sm font-bold">{name || "Votre Prénom"}</div>
            <div className="text-[10px] text-blue-200">{promo || "Promo 2027"}</div>
            <div className="text-xs font-semibold italic text-amber-300 mt-1">
              &quot;{slogan}&quot;
            </div>
          </div>

          <div className="text-[9px] text-slate-300 font-medium">
            Scrutin officiel le 23 Octobre
          </div>
        </div>

        {/* Champs de personnalisation */}
        <div className="space-y-3 mb-6 text-left">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Votre Prénom
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={25}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Votre Promo / Année
              </label>
              <input
                type="text"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                maxLength={20}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Votre Slogan de Campagne
            </label>
            <select
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            >
              {slogans.map((s, idx) => (
                <option key={idx} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bouton de Téléchargement */}
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2 transition-all cursor-pointer"
        >
          {isGenerating ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>Télécharger ma Story HD (1080x1920)</span>
        </button>

      </div>
    </div>
  );
}
