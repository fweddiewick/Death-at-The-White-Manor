import React, { useState } from 'react';
import { X, Calendar, MapPin, Compass, Shirt, Briefcase, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface PreEventPostersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInspectImage: (url: string, title: string, caption: string) => void;
}

export const PreEventPostersModal: React.FC<PreEventPostersModalProps> = ({
  isOpen,
  onClose,
  onInspectImage
}) => {
  const [activePosterIndex, setActivePosterIndex] = useState(0);

  if (!isOpen) return null;

  const posters = [
    {
      name: "1 Week Teaser",
      title: "1 Week Teaser",
      badge: "COUNTDOWN: -7 DAYS",
      subtitle: "The White Manor Beckons... Are you ready, Detectives?",
      date: "10 September 2026",
      headline: "The Countdown Commences",
      highlights: [
        "Date of Convocation: 17 September 2026",
        "Setting: Fairy Point 3, Civil Service Club @ Changi",
        "A grand gathering of corporate operatives and distinguished guests.",
        "Rumors swirl of secret agreements and covert shipping manifests."
      ],
      flavor: "A sealed invitation packet arrived by private courier bearing the iconic gold and crimson 'W' wax seal.",
      imageUrl: "https://i.imgur.com/I2cdJGe.png"
    },
    {
      name: "1 Day Teaser",
      title: "1 Day Teaser",
      badge: "FINAL EVE DIRECTIVE",
      subtitle: "Secrets Lurk. Everyone's a Suspect. But Who Tells the Truth?",
      date: "16 September 2026",
      headline: "Three Golden Directives for All Sleuths",
      highlights: [
        "1. Bring Your Investigation Tools: Laptop (1 per team), physical notebook & fountain pen.",
        "2. Dress the Part: Gear up in vintage 1920s detective attire. Teams with all members dressed up score bonus clues!",
        "3. Be On Time: Event commences at 8:30 AM sharp! Don't let the crime scene turn cold.",
        "A goodie bag awaits all arriving field operatives."
      ],
      flavor: "The suspects have gathered. The murderer is ready. Are you prepared to confront the darkness of the White Manor?",
      imageUrl: "https://i.imgur.com/RWBdUp0.png"
    },
    {
      name: "Email Teaser",
      title: "Email Teaser",
      badge: "OFFICIAL INVITATION",
      subtitle: "Venue, Logistics & Master Timing Matrix",
      date: "17 September 2026",
      headline: "Operational Dispatch & Venue Coordinates",
      highlights: [
        "Venue: Civil Service Club @ Changi, 3A Catterick Road, Singapore 507022 (Fairy Point 3).",
        "Dress Code: Detective Style! Comfortable for active tactical sweeps across manor wings.",
        "Morning Refreshments: Hot breakfast & coffee available from 8:00 AM.",
        "Roll Call & Briefing: 8:30 AM prompt at the Living Hall Grand Foyer."
      ],
      flavor: "A heritage colonial estate overlooking the tranquil waters of the Changi coast... transformed into an enigmatic labyrinth of clues.",
      imageUrl: "https://i.imgur.com/R2IamfZ.png"
    }
  ];

  const current = posters[activePosterIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4">
      <div className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-[#1c1512] border-2 border-[#b59f77] rounded shadow-2xl overflow-hidden font-courier text-[#2b1f15]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#2a1e17] border-b border-[#8c7355]/40 text-xs text-amber-100">
          <div className="flex items-center gap-2">
            <span className="rubber-stamp text-[#ff907f] border-[#ff907f] text-[10px] py-0 px-1 font-bold">
              PRE-EVENT DOSSIER
            </span>
            <span className="font-bold text-amber-200 uppercase tracking-wider hidden sm:inline">
              ARCHIVED REMINDER NOTICES &amp; TEASERS
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-950 rounded text-zinc-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Poster Tabs Navigation */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#34261d] border-b border-[#8c7355]/30 text-xs text-zinc-300">
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scroll">
            {posters.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setActivePosterIndex(idx)}
                className={`px-3 py-1 rounded text-[11px] font-bold tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                  activePosterIndex === idx
                    ? 'bg-[#b52619] text-white shadow'
                    : 'bg-[#211812] hover:bg-[#2b1e17] text-zinc-400'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <button
              onClick={() => setActivePosterIndex((idx) => (idx > 0 ? idx - 1 : posters.length - 1))}
              className="p-1 hover:bg-black/40 rounded text-zinc-400 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-amber-300">
              {activePosterIndex + 1} of {posters.length}
            </span>
            <button
              onClick={() => setActivePosterIndex((idx) => (idx < posters.length - 1 ? idx + 1 : 0))}
              className="p-1 hover:bg-black/40 rounded text-zinc-400 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Poster Body */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#fbf7ee] paper-texture relative space-y-4">
          <div className="paperclip -top-3 left-8"></div>
          <div className="scotch-tape absolute top-2 right-6 w-24 h-4 rotate-[2deg]"></div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#cfc09f] pb-2">
            <div>
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
                {current.badge} • {current.date}
              </span>
              <h2 className="font-serif-display text-2xl font-bold text-[#301c10] leading-tight">
                {current.title}
              </h2>
              <p className="font-serif-display italic text-sm text-[#87110c] font-bold">
                {current.subtitle}
              </p>
            </div>
            <button
              onClick={() => onInspectImage(current.imageUrl, current.title, current.subtitle)}
              className="mt-2 sm:mt-0 flex items-center gap-1.5 px-3 py-1 bg-[#1f150d] hover:bg-[#3d2c1e] text-amber-100 rounded text-[10px] tracking-wider uppercase font-bold"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>ENLARGE POSTER</span>
            </button>
          </div>

          {/* Content Columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left Graphic Preview */}
            <div
              onClick={() => onInspectImage(current.imageUrl, current.title, current.subtitle)}
              className="md:col-span-5 flex flex-col items-center justify-center p-2 bg-[#17110e] rounded border border-zinc-700 shadow-polaroid cursor-pointer group relative overflow-hidden"
              title="Click to enlarge in full resolution"
            >
              <img
                src={current.imageUrl}
                alt={current.title}
                className="w-full h-auto max-h-72 object-contain rounded group-hover:scale-102 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-typewriter">
                <Eye className="w-4 h-4 mr-1 text-amber-200" />
                <span>CLICK TO ENLARGE</span>
              </div>
              <span className="text-[9px] text-zinc-400 mt-1 uppercase tracking-wider">
                {current.name.toUpperCase()} • CHANGI 2026
              </span>
            </div>

            {/* Right Directives & Text */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-3 font-garamond text-base text-[#2c1d13]">
              <div>
                <h3 className="font-serif-display text-lg font-bold text-[#231209] mb-1">
                  {current.headline}
                </h3>
                <ul className="space-y-2 text-sm leading-relaxed">
                  {current.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 p-1.5 rounded bg-[#f4ecd7]/70 border border-[#dfd2b5]">
                      <span className="text-[#87110c] font-bold font-courier text-xs">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-2.5 rounded bg-[#ebdcb8] border-l-4 border-[#87110c] text-xs font-garamond italic text-[#392415]">
                "{current.flavor}"
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2 bg-[#251b15] border-t border-[#8c7355]/40 flex items-center justify-between text-[11px] text-zinc-400 font-courier">
          <span>CIVIL SERVICE CLUB @ CHANGI • TEAM BONDING 2026</span>
          <span className="text-amber-400">DISPATCH REF: WM-PRE-0917</span>
        </div>
      </div>
    </div>
  );
};
