import React, { useState } from 'react';
import { SUSPECTS, Suspect } from '../../data/manorData';
import { Eye, ShieldAlert, Sparkles, User, FileText, Compass, Clock, BookOpen } from 'lucide-react';

interface SuspectsTabProps {
  onInspectImage: (url: string, title: string, caption: string) => void;
}

export const SuspectsTab: React.FC<SuspectsTabProps> = ({
  onInspectImage,
}) => {
  const [activeSuspectId, setActiveSuspectId] = useState<string>('cerulean');
  const [viewFullFigure, setViewFullFigure] = useState<boolean>(false);

  const suspect = SUSPECTS[activeSuspectId] || SUSPECTS['cerulean'];

  return (
    <section className="flex flex-col gap-2 h-full font-typewriter">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#cfc09f] pb-1 text-xs flex-shrink-0">
        <div>
          <span className="text-stamp-red font-bold tracking-widest uppercase text-[11px]">
            [DOSSIER CLASSIFIED: PERSONS OF INTEREST]
          </span>
          <h3 className="font-serif-display text-base font-bold text-[#2b1b11] hidden sm:inline ml-2">
            Suspect Gallery &amp; Inquest Dockets
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewFullFigure(!viewFullFigure)}
            className="px-2 py-0.5 bg-[#2a1e17] hover:bg-[#3d2b20] text-amber-200 rounded border border-amber-900/60 text-[10px] transition-colors cursor-pointer"
          >
            {viewFullFigure ? 'SHOW MUGSHOT CARD' : 'SHOW FULL ART FIGURE'}
          </button>
          <span className="rubber-stamp text-stamp-red border-stamp-red text-[9px]">
            5 KEY SUSPECTS
          </span>
        </div>
      </div>

      {/* Suspect Selector Strip (5 Characters) */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 select-none text-[10px] flex-shrink-0">
        {Object.values(SUSPECTS).map((s) => {
          const isActive = s.id === activeSuspectId;
          return (
            <button
              key={s.id}
              onClick={() => {
                setActiveSuspectId(s.id);
              }}
              className={`p-1.5 rounded border shadow flex flex-col items-center transition-all cursor-pointer ${
                isActive
                  ? 'border-2 border-[#87110c] bg-[#eae2cb] shadow-md -translate-y-0.5'
                  : 'border-[#cfc09f] bg-[#f5efe0] hover:bg-[#ebe1c8]'
              }`}
            >
              <div className="w-12 h-14 rounded overflow-hidden mb-1 border border-zinc-400 bg-neutral-900 flex-shrink-0">
                <img
                  src={s.thumbImg}
                  alt={s.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="font-bold text-[10px] sm:text-[11px] text-[#29170f] leading-tight truncate w-full text-center">
                {s.name}
              </span>
              <span className={`text-[8.5px] font-bold px-1.5 py-0.2 rounded-sm mt-0.5 uppercase tracking-wider ${s.statusColor}`}>
                {s.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Suspect Official Form Card */}
      <div className="bg-white p-3 sm:p-3.5 rounded border-2 border-zinc-400 shadow-paper-sheet flex flex-col md:flex-row gap-3 sm:gap-5 relative font-courier text-xs flex-1 min-h-0 overflow-y-auto custom-scroll">
        <div className="paperclip -top-3 left-8"></div>
        <div className="rubber-stamp text-stamp-red border-stamp-red absolute top-3 right-4 text-xs font-bold">
          {suspect.stamp}
        </div>

        {/* Left Portrait Frame - Enlarged & Proportionate */}
        <div className="w-full md:w-[280px] lg:w-[310px] flex flex-col items-center gap-2.5 flex-shrink-0">
          <div
            onClick={() =>
              onInspectImage(
                viewFullFigure ? suspect.fullImg : (suspect.mugshotImg || suspect.fullImg),
                suspect.name,
                `${suspect.role} • ${suspect.classification}`
              )
            }
            className="w-full max-w-[280px] sm:max-w-[310px] h-[330px] sm:h-[370px] border-2 border-[#2b1d14] p-1.5 bg-[#1b1511] shadow-md flex items-center justify-center cursor-pointer group relative overflow-hidden rounded-sm"
            title="Click to enlarge portrait in high resolution"
          >
            <img
              src={viewFullFigure ? suspect.fullImg : (suspect.mugshotImg || suspect.fullImg)}
              alt={suspect.name}
              className={`w-full h-full ${
                viewFullFigure ? 'object-contain' : 'object-cover object-top'
              } group-hover:scale-105 transition-transform duration-300 rounded-[2px]`}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-typewriter">
              <Eye className="w-4 h-4 mr-1 text-amber-200" />
              <span>ENLARGE DOSSIER PORTRAIT</span>
            </div>
          </div>

          {/* Suspect Vital Attributes: Birthdate, Horoscope & MBTI */}
          <div className="w-full max-w-[280px] sm:max-w-[310px] border-2 border-[#2b1d14] bg-[#fbf7ed] p-2 rounded shadow-sm text-center font-courier">
            <div className="text-[10px] font-bold text-stone-900 uppercase tracking-widest border-b border-[#cfc09f] pb-1 mb-1.5 flex items-center justify-between">
              <span className="text-[#87110c] font-serif-display font-bold">VITAL PROFILE</span>
              <span className="text-[9px] bg-[#2b1d14] text-[#fbf7ed] px-1.5 py-0.5 rounded font-bold font-typewriter">
                {suspect.mbti}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="bg-[#f2ead7] p-1.5 rounded border border-[#dfd4bd] flex flex-col items-center justify-center">
                <span className="text-[8px] text-stone-600 font-bold uppercase tracking-wider">BIRTHDATE</span>
                <span className="font-bold text-stone-900 text-[10px] sm:text-[11px] mt-0.5 whitespace-nowrap">
                  {suspect.birthdate || 'N/A'}
                </span>
              </div>

              <div className="bg-[#f2ead7] p-1.5 rounded border border-[#dfd4bd] flex flex-col items-center justify-center">
                <span className="text-[8px] text-stone-600 font-bold uppercase tracking-wider">HOROSCOPE</span>
                <span className="font-bold text-[#87110c] text-[10px] sm:text-[11px] mt-0.5 whitespace-nowrap">
                  {suspect.horoscope || 'N/A'}
                </span>
              </div>

              <div className="bg-[#f2ead7] p-1.5 rounded border border-[#dfd4bd] flex flex-col items-center justify-center">
                <span className="text-[8px] text-stone-600 font-bold uppercase tracking-wider">MBTI</span>
                <span className="font-bold text-[#1a3861] text-[10px] sm:text-[11px] mt-0.5 whitespace-nowrap">
                  {suspect.mbti || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Typewritten Profile Data */}
        <div className="flex-1 min-w-0 flex flex-col space-y-2.5 font-courier min-h-0">
          <div>
            <div className="text-[9px] text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
              <span>CRIMINAL INVESTIGATION DIVISION</span>
              <span>•</span>
              <span>SUSPECT DOSSIER</span>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mt-0.5">
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-black leading-tight">
                {suspect.name}
              </h3>
              <span className="text-xs font-courier font-bold text-stone-600">
                FILE REF: WM-{suspect.id.toUpperCase()}
              </span>
            </div>
            <div className="font-bold text-[#87110c] text-xs sm:text-sm mt-0.5 tracking-wide">
              {suspect.role}
            </div>
          </div>

          {/* Character Description & Background Box */}
          <div className="space-y-2 text-zinc-800 text-xs">
            {suspect.background && (
              <div className="bg-[#faf5eb] p-2.5 rounded border border-[#dfd2b5]">
                <div className="text-[9.5px] font-bold text-[#6a4f32] uppercase tracking-wider mb-0.5 flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-[#87110c]" />
                  <span>Background:</span>
                </div>
                <p className="font-garamond text-xs sm:text-[13.5px] text-[#2c1e13] leading-relaxed">
                  {suspect.background}
                </p>
              </div>
            )}

            {suspect.characterDescription && (
              <div className="bg-[#faf5eb] p-2.5 rounded border border-[#dfd2b5]">
                <div className="text-[9.5px] font-bold text-[#6a4f32] uppercase tracking-wider mb-0.5 flex items-center gap-1">
                  <User className="w-3 h-3 text-[#87110c]" />
                  <span>Character Description:</span>
                </div>
                <p className="font-garamond text-xs sm:text-[13.5px] text-[#2c1e13] leading-relaxed italic">
                  "{suspect.characterDescription}"
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
              <div className="bg-[#f6f2e8] p-2 rounded border border-[#dfd2b5]">
                <span className="font-bold text-[#6a4f32] text-[9.5px] uppercase block mb-0.5">PHYSICAL ATTIRE:</span>
                <span className="text-[#3a2a1c] text-[11px] leading-relaxed">{suspect.attire}</span>
              </div>
              <div className="bg-[#f6f2e8] p-2 rounded border border-[#dfd2b5]">
                <span className="font-bold text-[#6a4f32] text-[9.5px] uppercase block mb-0.5">INVESTIGATIVE FOCUS:</span>
                <span className="text-[#3a2a1c] text-[11px] leading-relaxed">{suspect.motive}</span>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-2 border-t border-zinc-300 flex items-center justify-between text-[11px] mt-auto">
            <span className="font-bold text-[10px] text-zinc-700">
              {suspect.classification}
            </span>
            <span className="text-[9.5px] text-[#87110c] font-courier font-bold">
              VERIFIED INQUEST RECORD • CHANGI CSC
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
