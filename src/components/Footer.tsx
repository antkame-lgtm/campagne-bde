"use client";

import React, { useState } from "react";
import { MessageCircle, Heart, Shield, Lightbulb, X } from "lucide-react";
import { CANDIDATE_INFO } from "../data/mockData";

export default function Footer() {
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isCharterOpen, setIsCharterOpen] = useState(false);

  const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_LINK ||
    "https://whatsapp.com/channel/0029VbDdkdR0Qeaelvy0fl2g";

  return (
    <footer className="bg-slate-950 dark:bg-[#010915] text-slate-300 border-t border-sky-900/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          
          {/* Colonne 1 : Identité officielle de la liste */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 px-2 py-1 rounded-xl bg-white flex items-center justify-center border border-white/20 shadow-xs shrink-0">
                <img
                  src="/images/logo-nexus.png"
                  alt="Logo NEXUS 360° • TgMaster University"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <div className="min-w-0">
                <span className="font-extrabold text-base text-white block leading-tight whitespace-nowrap">
                  {CANDIDATE_INFO.name} <span className="text-sky-400">• BDE 2026</span>
                </span>
                <span className="text-[11px] font-bold text-sky-400 tracking-wider uppercase block truncate">
                  {CANDIDATE_INFO.slogan}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Une communauté étudiante plus dynamique, plus ambitieuse et plus proche de ses étudiants à TG Master University. 
              Pour un mandat transparent, solidaire et fédérateur.
            </p>

            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-sky-900/60 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
              </span>
              <span className="text-sky-300 font-bold text-[11px]">Plateforme Officielle de Campagne</span>
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides vers les Sections */}
          <div>
            <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-4">
              Programme &amp; Sections
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#qui-sommes-nous" className="hover:text-white font-medium text-slate-400 transition-colors">1. Qui sommes-nous ?</a></li>
              <li><a href="#vision" className="hover:text-white font-medium text-slate-400 transition-colors">2. Notre vision</a></li>
              <li><a href="#programme" className="hover:text-white font-medium text-slate-400 transition-colors">3. Le programme de l&apos;année</a></li>
              <li><a href="#calendrier" className="hover:text-white font-medium text-slate-400 transition-colors">4. Notre calendrier</a></li>
              <li><a href="#impact" className="hover:text-white font-medium text-slate-400 transition-colors">5. Ça change quoi ?</a></li>
              <li><a href="#avis" className="hover:text-white font-medium text-slate-400 transition-colors">6. Donnez votre avis</a></li>
              <li><a href="#faq" className="hover:text-white font-medium text-slate-400 transition-colors">7. FAQ &amp; comité de soutien</a></li>
              <li><a href="#photos" className="hover:text-white font-medium text-slate-400 transition-colors">8. Galerie de campagne</a></li>
            </ul>
          </div>

          {/* Colonne 3 : Contacts & Permanences */}
          <div>
            <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-4">
              Permanences &amp; Écoute
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <strong className="text-slate-200 block">Sur le terrain :</strong>
                Hall d&apos;accueil, foyer étudiant et au SAMI
              </li>
              <li>
                <strong className="text-slate-200 block">Rencontres :</strong>
                Permanence d&apos;écoute et de discussion libre
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Contact & données personnelles */}
          <div>
            <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-4">
              Rejoindre la Dynamique
            </h4>
            {whatsappUrl ? (
              <div className="flex space-x-3 mb-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white text-xs font-bold transition-all shadow-md shadow-sky-950/40"
                  title="Contacter l'équipe de campagne sur WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-sky-200" />
                  <span>WhatsApp de campagne</span>
                </a>
              </div>
            ) : (
              <p className="mb-6 text-xs text-slate-400">Lien WhatsApp à configurer.</p>
            )}

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-sky-900/60 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center space-x-1.5 text-sky-300 font-bold">
                <Shield className="w-3.5 h-3.5 text-sky-400" />
                <span>Données personnelles</span>
              </div>
              <p className="font-medium leading-relaxed">
                L&apos;email de dépôt doit appartenir au domaine de l&apos;école (@univ.tgmaster.com). Les coordonnées transmises au comité de soutien sont conservées pour gérer les inscriptions. Aucun suivi publicitaire n&apos;est intégré.
              </p>
            </div>
          </div>

        </div>

        {/* Bas de page / Mentions */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="font-medium">
            © 2026 Campagne {CANDIDATE_INFO.name} • Tous droits réservés. Élection du Bureau des Étudiants.
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setIsLegalOpen(true)}
              className="hover:text-white transition-colors font-medium cursor-pointer"
            >
              Mentions légales &amp; données personnelles
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsCharterOpen(true)}
              className="hover:text-white transition-colors font-medium cursor-pointer"
            >
              Charte de la boîte à idées
            </button>
            <span>•</span>
            <span className="flex items-center space-x-1 text-slate-400 font-medium">
              <span>Fait avec</span>
              <Heart className="w-3 h-3 text-sky-400 fill-sky-400" />
              <span>pour tous les étudiants</span>
            </span>
          </div>
        </div>

      </div>

      {/* Modal Mentions Légales */}
      {isLegalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-sky-800 shadow-2xl relative space-y-4 text-slate-200">
            <button
              type="button"
              onClick={() => setIsLegalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Shield className="w-5 h-5 text-sky-400" />
              <span>Mentions légales &amp; données personnelles</span>
            </h3>
            <div className="text-xs text-slate-300 space-y-2.5 max-h-80 overflow-y-auto leading-relaxed pr-2">
              <p>
                <strong>Éditeur du site :</strong> Équipe de campagne « {CANDIDATE_INFO.name} — BDE 2026 ». Plateforme bénévole d&apos;information étudiante et de démocratie participative pour l&apos;élection du Bureau des Étudiants.
              </p>
              <p>
                <strong>Hébergement :</strong> Le nom de l&apos;hébergeur doit être renseigné par l&apos;équipe selon le service utilisé pour le déploiement.
              </p>
              <p>
                <strong>Données :</strong> Pour déposer une proposition, une adresse email étudiante valide (@univ.tgmaster.com) est requise. Le formulaire du comité de soutien conserve le nom et l&apos;email de contact afin de gérer les inscriptions. Les propositions peuvent être publiées anonymement.
              </p>
              <p>
                <strong>Cookies &amp; Tiers :</strong> Le site n&apos;intègre pas de suivi publicitaire. Le formulaire de contact transmet les coordonnées au service de stockage configuré par l&apos;équipe.
              </p>
              <p>
                <strong>Demandes :</strong> Pour demander une modification ou suppression de vos données, contactez l&apos;équipe de campagne via le groupe WhatsApp ou lors des permanences.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsLegalOpen(false)}
              className="w-full py-2.5 bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal Charte de la boîte à idées */}
      {isCharterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-sky-800 shadow-2xl relative space-y-4 text-slate-200">
            <button
              type="button"
              onClick={() => setIsCharterOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-sky-400" />
              <span>Charte de la boîte à idées</span>
            </h3>
            <div className="text-xs text-slate-300 space-y-2.5 max-h-80 overflow-y-auto leading-relaxed pr-2">
              <p>
                <strong>1. Adresse institutionnelle :</strong> Une adresse autorisée de l&apos;établissement (@univ.tgmaster.com) est requise pour déposer une proposition.
              </p>
              <p>
                <strong>2. Respect :</strong> Les propositions doivent respecter les valeurs de l&apos;école. Les contenus insultants, diffamatoires ou commerciaux peuvent être retirés.
              </p>
              <p>
                <strong>3. Anonymat :</strong> L&apos;option anonyme masque le nom de l&apos;auteur dans la boîte à idées.
              </p>
              <p>
                <strong>4. Prise en compte :</strong> Chaque proposition déposée est examinée par l&apos;équipe pour enrichir le programme et les actions du mandat.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCharterOpen(false)}
              className="w-full py-2.5 bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
