"use client";

import React from "react";
import { AGENDA_EVENTS } from "../data/mockData";
import { Calendar, Clock, MapPin, Download, ExternalLink, CalendarPlus } from "lucide-react";

export default function AgendaSection() {
  const downloadIcs = (event: typeof AGENDA_EVENTS[0]) => {
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Campus Uni et Connecte//Campagne BDE 2026//FR",
      "BEGIN:VEVENT",
      `SUMMARY:BDE 2026 - ${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      "DTSTART:20261023T080000Z",
      "DTEND:20261023T180000Z",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `event_${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openGoogleCalendar = (event: typeof AGENDA_EVENTS[0]) => {
    const title = encodeURIComponent(`BDE 2026 - ${event.title}`);
    const details = encodeURIComponent(event.description);
    const location = encodeURIComponent(event.location);
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(gcalUrl, "_blank");
  };

  return (
    <section id="agenda" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 text-[#1E3A8A] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Calendrier Événementiel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Agenda des Rendez-Vous de Campagne
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Retrouvez-nous sur le campus pour échanger, débattre et partager des moments conviviaux.
            Ajoutez les dates à votre calendrier en un clic.
          </p>
        </div>

        {/* Liste des Événements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AGENDA_EVENTS.map((event) => (
            <div
              key={event.id}
              className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-100 text-[#1E3A8A]">
                    {event.type}
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{event.time}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {event.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  {event.description}
                </p>

                <div className="flex items-center space-x-2 text-xs font-medium text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200 mb-4">
                  <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Boutons d'export de calendrier */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                <button
                  onClick={() => openGoogleCalendar(event)}
                  className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                  <span>Google Calendar</span>
                </button>

                <button
                  onClick={() => downloadIcs(event)}
                  className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-600" />
                  <span>Apple / Outlook (.ics)</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
