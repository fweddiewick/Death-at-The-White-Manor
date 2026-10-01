import React, { useState } from 'react';
import { SCHEDULE_EVENTS } from '../../data/manorData';
import { Clock, Eye, ChevronRight, Scale } from 'lucide-react';

interface ForewordTabProps {
  onInspectImage: (url: string, title: string, caption: string) => void;
  onOpenPosters: () => void;
  onNavigateTab: (tabKey: string) => void;
}

export const ForewordTab: React.FC<ForewordTabProps> = ({
  onInspectImage,
  onOpenPosters,
  onNavigateTab
}) => {
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);

  return (
    <section className="flex flex-col gap-3 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
        {/* Left Column: Parchment Letter & Event Synopsis (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3 min-h-0 overflow-y-auto custom-scroll pr-1">
          {/* Main Parchment Letter */}
          <div className="paper-texture p-4 rounded border border-[#dfd4b7] shadow-paper-sheet relative">
            <div className="paperclip -top-3 left-6"></div>
            <div className="scotch-tape absolute top-2 right-4 w-24 h-4 rotate-[2.5deg]"></div>

            {/* Letterhead */}
            <div className="flex items-center justify-between border-b border-[#cfc09f] pb-2.5 mb-2.5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#87110c] text-amber-100 flex items-center justify-center font-serif-display font-bold text-xl shadow-md border border-amber-900/60">
                  <Scale className="w-6 h-6 text-amber-200" />
                </div>
                <div>
                  <h2 className="font-serif-display text-base sm:text-lg text-[#342013] font-bold leading-tight uppercase tracking-wide">
                    FROM THE DESK OF THE HIGH COMMISSIONER
                  </h2>
                  <p className="font-typewriter text-[10px] text-[#71593e]">
                    Straits Settlements Police Force • Singapore Office
                  </p>
                </div>
              </div>
              <span className="rubber-stamp text-stamp-red border-stamp-red text-[10px] hidden sm:inline">
                OFFICIAL COMMENDATION
              </span>
            </div>

            {/* Letter Body */}
            <div className="space-y-2.5 font-garamond text-base sm:text-base text-[#261b14] leading-relaxed">
              <p className="font-serif-display italic font-bold text-base text-[#611c14]">
                To the Esteemed Detectives,
              </p>
              <p>
                If this letter has found its way into your hands, it may be taken as evidence that you have successfully concluded the investigation entrusted to you.
              </p>
              <p>
                The untimely death of the esteemed Sir White was a matter shrouded in no small degree of mystery and suspicion. Each of the suspects possessed a motive of sufficient gravity to warrant the closest scrutiny. Indeed, throughout the course of this most peculiar affair, it remained entirely conceivable that any one among them might be the guilty party.
              </p>
              <p>
                Yet, through your perseverance, keen observation, and determination, you have navigated the many trials and operations set before you. Piece by piece, you gathered the evidence, pursued the necessary leads, and brought the truth to light—thereby securing justice for the White family and bringing this most unfortunate case to its conclusion.
              </p>
              <p>
                Such an accomplishment is deserving of due recognition.
              </p>
              <p>
                In commemoration of your distinguished service, the Committee has prepared this Special Case File, containing a record of the moments, discoveries, triumphs, and occasional misadventures that marked the course of your investigation. Within its pages are preserved the little victories and, perhaps most importantly, the remarkable camaraderie displayed by each and every team.
              </p>
              <p>
                May this volume serve as a fitting remembrance of the case you have solved and the company with whom you solved it.
              </p>
              <p className="font-bold text-[#611c14] font-serif-display">
                You have served the cause of justice admirably.
              </p>
            </div>
          </div>

          {/* Post-Event Executive Synopsis Card */}
          <div className="paper-texture p-3.5 rounded border border-[#dfd4b7] shadow-paper-sheet space-y-2">
            <div className="flex items-center justify-between border-b border-[#cfc09f] pb-1.5">
              <span className="text-stamp-red font-bold text-[11px] tracking-wider uppercase font-typewriter">
                EXECUTIVE EVENT HIGHLIGHTS // WRITE-UP
              </span>
              <span className="text-[9px] bg-[#d9ca8e] px-1.5 py-0.5 rounded font-courier text-[#2b1e10]">
                POST-EVENT DECLASSIFIED
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-garamond text-[#2c1b12]">
              <div className="p-2 rounded bg-[#f4ecd7] border border-[#d8cca7]">
                <strong className="text-[#87110c] block mb-0.5 font-serif-display">1. The Convocation &amp; Shock</strong>
                <p className="leading-tight">
                  Over 36 detectives converged at Fairy Point 3 dressed in 1920s cloche hats and double-breasted suits. The detectives were dispatched in teams of 6 per group and armed with cameras &amp; detective gears for their mission.
                </p>
              </div>
              <div className="p-2 rounded bg-[#f4ecd7] border border-[#d8cca7]">
                <strong className="text-[#87110c] block mb-0.5 font-serif-display">2. Dual Murder Mystery</strong>
                <p className="leading-tight">
                  Unlike conventional cases, there were 2 deaths at the White Manor. Sir White's death due to the poisoned floral tea and Miss Scarlet's subsequent death from bludgeoning, an attempt to silence her from exposing the mastermind.
                </p>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2 font-typewriter text-[10px]">
              <button
                onClick={() => onNavigateTab('suspects')}
                className="px-2.5 py-1 bg-[#231710] hover:bg-[#3d2c1e] text-amber-100 rounded flex items-center gap-1 transition-colors"
              >
                <span>Inspect Suspects</span>
                <ChevronRight className="w-3 h-3" />
              </button>
              <button
                onClick={() => onNavigateTab('map')}
                className="px-2.5 py-1 bg-[#231710] hover:bg-[#3d2c1e] text-amber-100 rounded flex items-center gap-1 transition-colors"
              >
                <span>Manor Blueprint</span>
                <ChevronRight className="w-3 h-3" />
              </button>
              <button
                onClick={() => onNavigateTab('scoreboard')}
                className="px-2.5 py-1 bg-[#231710] hover:bg-[#3d2c1e] text-amber-100 rounded flex items-center gap-1 transition-colors"
              >
                <span>Official Scoreboard</span>
                <ChevronRight className="w-3 h-3" />
              </button>
              <button
                onClick={onOpenPosters}
                className="px-2.5 py-1 bg-[#87110c] hover:bg-[#a61711] text-white rounded flex items-center gap-1 transition-colors ml-auto font-bold"
              >
                <span>Pre-Event Teasers</span>
                <Eye className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Mission Schedule & Timeline (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-2.5 min-h-0 overflow-y-auto custom-scroll">
          {/* Mission Schedule Card */}
          <div className="paper-texture p-3 rounded border border-[#cfd2b5] shadow-paper-sheet relative">
            <div className="paperclip -top-3 right-8"></div>
            <div className="flex items-center justify-between border-b border-zinc-400 pb-1 mb-2 font-typewriter">
              <span className="text-stamp-red font-bold text-[11px] tracking-wider uppercase">
                MISSION SCHEDULE
              </span>
              <span className="text-[9px] bg-zinc-200 px-1.5 py-0.5 rounded font-courier text-zinc-800">
                17 SEP 2026
              </span>
            </div>

            {/* Interactive Schedule Agenda List */}
            <div className="yellow-legal p-3 rounded border border-[#e1d8a4] text-[#2c1d10] font-typewriter text-[10px] space-y-2">
              <div className="font-bold border-b border-[#d8cd95] pb-1 flex justify-between text-[11px]">
                <span className="text-[#87110c]">CHRONOLOGICAL AGENDA</span>
                <span>FAIRY POINT 3</span>
              </div>
              <div className="space-y-1.5 pr-1">
                {SCHEDULE_EVENTS.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedEventIndex(idx)}
                    className={`p-1.5 rounded cursor-pointer transition-colors flex items-center justify-between ${
                      selectedEventIndex === idx
                        ? 'bg-[#87110c] text-white font-bold'
                        : 'hover:bg-[#ebe3bc] text-[#332213] bg-white/40'
                    }`}
                  >
                    <span className="font-courier font-bold">{item.time}</span>
                    <span className="truncate max-w-[210px] text-right">{item.title}</span>
                  </div>
                ))}
              </div>

              {/* Selected Event Detail Box */}
              <div className="pt-2 border-t border-[#d8cd95] text-[10.5px] font-garamond italic text-[#4b331f] bg-amber-50/70 p-2 rounded border border-[#e5dcab]">
                <strong className="text-[#87110c] not-italic font-typewriter text-[10px] block mb-0.5">
                  {SCHEDULE_EVENTS[selectedEventIndex].time} — {SCHEDULE_EVENTS[selectedEventIndex].title}
                </strong>
                {SCHEDULE_EVENTS[selectedEventIndex].desc}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
