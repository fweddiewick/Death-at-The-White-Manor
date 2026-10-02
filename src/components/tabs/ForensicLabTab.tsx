import React, { useState } from 'react';
import { DR_ESTHER, FORENSIC_RESULTS, ForensicResult } from '../../data/manorData';
import {
  Eye,
  Search,
  Sparkles,
  FolderOpen,
  Wine,
  FileText,
  Coffee,
  Flower2,
  Scissors,
  Droplets,
  HeartPulse,
  Sword,
  Pill,
  FlaskConical,
  ShieldCheck
} from 'lucide-react';

interface ForensicLabTabProps {
  onInspectImage: (url: string, title: string, caption: string) => void;
}

export const ForensicLabTab: React.FC<ForensicLabTabProps> = ({
  onInspectImage,
}) => {
  const drEsther = DR_ESTHER; // Dr. Esther's record
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoomFilter, setSelectedRoomFilter] = useState<string>('ALL');

  // Load custom uploaded images from localStorage (persisted from user setup)
  const [customImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('manor_forensic_images');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const normalizeImgurUrl = (url?: string) => {
    if (!url) return '';
    const match = url.match(/^https?:\/\/imgur\.com\/([a-zA-Z0-9]+)$/);
    if (match) return `https://i.imgur.com/${match[1]}.png`;
    return url;
  };

  // Appropriate Logo image/icon renderer for each of the 13 tiles
  const renderTileLogo = (logoType: ForensicResult['logoType']) => {
    switch (logoType) {
      case 'shears':
        return (
          <div className="w-8 h-8 rounded-full bg-stone-900/20 border border-stone-700 flex items-center justify-center text-stone-800 shadow-sm flex-shrink-0" title="Botanical Shears">
            <Scissors className="w-4 h-4" />
          </div>
        );
      case 'teabag':
        return (
          <div className="w-8 h-8 rounded-full bg-amber-900/20 border border-amber-700 flex items-center justify-center text-amber-800 shadow-sm flex-shrink-0" title="Tea Bag Specimen">
            <Coffee className="w-4 h-4" />
          </div>
        );
      case 'autopsy':
        return (
          <div className="w-8 h-8 rounded-full bg-red-950/25 border border-red-800 flex items-center justify-center text-red-900 shadow-sm flex-shrink-0" title="Official Autopsy Protocol">
            <HeartPulse className="w-4 h-4 text-red-800" />
          </div>
        );
      case 'powder':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-950/20 border border-blue-700 flex items-center justify-center text-blue-900 shadow-sm flex-shrink-0" title="Chemical Powder Specimen">
            <Sparkles className="w-4 h-4 text-blue-800" />
          </div>
        );
      case 'wine':
        return (
          <div className="w-8 h-8 rounded-full bg-red-950/20 border border-red-800 flex items-center justify-center text-red-800 shadow-sm flex-shrink-0" title="Sealed Wine Bottle">
            <Wine className="w-4 h-4" />
          </div>
        );
      case 'spilled_wine':
        return (
          <div className="w-8 h-8 rounded-full bg-purple-950/20 border border-purple-800 flex items-center justify-center text-purple-900 shadow-sm flex-shrink-0" title="Spilled Wine Stain">
            <Droplets className="w-4 h-4 text-purple-800" />
          </div>
        );
      case 'vase':
        return (
          <div className="w-8 h-8 rounded-full bg-emerald-950/20 border border-emerald-800 flex items-center justify-center text-emerald-900 shadow-sm flex-shrink-0" title="Dining Room Vase">
            <Flower2 className="w-4 h-4 text-emerald-800" />
          </div>
        );
      case 'health_report':
        return (
          <div className="w-8 h-8 rounded-full bg-rose-950/20 border border-rose-800 flex items-center justify-center text-rose-900 shadow-sm flex-shrink-0" title="Confidential Health Report">
            <FileText className="w-4 h-4 text-rose-800" />
          </div>
        );
      case 'knife':
        return (
          <div className="w-8 h-8 rounded-full bg-zinc-950/25 border border-zinc-700 flex items-center justify-center text-zinc-900 shadow-sm flex-shrink-0" title="Concealed Knife">
            <Sword className="w-4 h-4 text-zinc-800" />
          </div>
        );
      case 'pills':
        return (
          <div className="w-8 h-8 rounded-full bg-amber-950/20 border border-amber-800 flex items-center justify-center text-amber-900 shadow-sm flex-shrink-0" title="Medicinal Pills">
            <Pill className="w-4 h-4 text-amber-800" />
          </div>
        );
      case 'teacup':
        return (
          <div className="w-8 h-8 rounded-full bg-red-900/20 border border-red-700 flex items-center justify-center text-red-900 shadow-sm flex-shrink-0" title="Laced Porcelain Teacup">
            <Coffee className="w-4 h-4" />
          </div>
        );
      case 'vial':
        return (
          <div className="w-8 h-8 rounded-full bg-indigo-950/20 border border-indigo-800 flex items-center justify-center text-indigo-900 shadow-sm flex-shrink-0" title="Chemical Vial">
            <FlaskConical className="w-4 h-4 text-indigo-800" />
          </div>
        );
      case 'water':
        return (
          <div className="w-8 h-8 rounded-full bg-cyan-950/20 border border-cyan-800 flex items-center justify-center text-cyan-900 shadow-sm flex-shrink-0" title="Carafe Water Sample">
            <Droplets className="w-4 h-4 text-cyan-800" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-zinc-900/20 border border-zinc-700 flex items-center justify-center text-zinc-800 shadow-sm flex-shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
        );
    }
  };

  const filteredResults = FORENSIC_RESULTS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.roomName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRoom =
      selectedRoomFilter === 'ALL' || item.roomName === selectedRoomFilter;

    return matchesSearch && matchesRoom;
  });

  const roomOptions = [
    'ALL',
    "Mrs Amber's Bedroom",
    "Master Cerulean's Bedroom",
    "Miss Scarlet's Bedroom",
    "Lady Violet's Bedroom",
    "White Manor Dining Hall",
    "Sir White's Study Room",
    "Forensic Laboratory"
  ];

  return (
    <section className="flex flex-col gap-2 h-full font-typewriter">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#cfc09f] pb-1 text-xs flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-stamp-red font-bold tracking-widest uppercase text-[11px]">
            [OP 3: TOXICOLOGY &amp; CHEMICAL BALLISTICS]
          </span>
          <h3 className="font-serif-display text-base font-bold text-[#2b1b11] hidden sm:inline ml-2">
            Forensic Examination Docket: Dr. Esther
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-600 font-courier">
            13 EXHIBITS DECLASSIFIED
          </span>
          <span className="rubber-stamp text-[#1e4822] border-[#1e4822] text-[9px]">
            VERIFIED EVIDENCE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-1 min-h-0">
        {/* Left: Lead Examiner Dr. Esther Feature (3.5 cols) */}
        <div className="md:col-span-4 lg:col-span-3 paper-texture p-2.5 sm:p-3 rounded border border-[#cfc09f] shadow-paper-sheet flex flex-col items-center text-center justify-between min-h-0 overflow-y-auto custom-scroll">
          <div className="paperclip -top-3 left-6"></div>
          <div className="w-full flex justify-between items-center border-b border-[#cfc09f] pb-1 mb-1.5 flex-shrink-0">
            <span className="text-stamp-red font-bold text-[10px]">DR. ESTHER</span>
            <span className="text-[9px] bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded font-bold">
              LAB LEAD
            </span>
          </div>

          {/* Dr. Esther Portrait Frame: dynamically fills & fits the section at all zoom levels */}
          <div
            onClick={() =>
              onInspectImage(
                drEsther.fullImg,
                "Dr. Esther",
                "Lead Pathologist & Chemical Analyst demonstrating the rapid colorimetric reagent reaction."
              )
            }
            className="w-full max-w-[280px] max-h-[380px] aspect-[341/512] rounded overflow-hidden border-2 border-[#2b1b11] bg-white my-1.5 shadow-md cursor-pointer group relative flex-shrink-0 flex items-center justify-center p-1"
            title="Click to enlarge Dr. Esther portrait in Picture Browser"
          >
            <img
              src={drEsther.fullImg}
              alt="Dr. Esther"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-[10px] font-typewriter">
              <Eye className="w-4 h-4 mb-0.5 text-amber-200" />
              <span className="tracking-wider">ENLARGE DOSSIER</span>
            </div>
          </div>

          <div className="space-y-0.5">
            <h4 className="font-serif-display text-base font-bold text-[#29160a] leading-tight">
              Dr. Esther
            </h4>
            <p className="font-courier text-[10px] text-zinc-700">
              Lead Pathologist &amp; Chemical Analyst
            </p>
            <p className="font-garamond text-xs text-[#3b2b1e] mt-1 italic leading-relaxed">
              "Every photograph, fingerprint, document and physical trace holds a piece of the truth. Only rigorous chemical and microscopic analysis separates fact from deception."
            </p>
          </div>

          {/* Department Lab Inquest Box */}
          <div className="w-full mt-2 pt-2 border-t border-[#cfc09f] space-y-1.5 text-left">
            <div className="flex items-center justify-between text-[9px] font-bold text-[#5e4933]">
              <span>EXHIBIT EVIDENCE LEDGER</span>
              <span className="text-[#87110c] font-courier">CHAIN SECURED</span>
            </div>
            <div className="p-2 rounded bg-[#f4ecd7] border border-[#d8cca7] text-[9.5px] font-courier text-[#3b2b1d] space-y-1">
              <div className="flex items-center justify-between">
                <span>• Registered Items:</span>
                <span className="font-bold text-[#87110c]">13 Exhibits</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• Custody Seal:</span>
                <span className="font-bold text-[#1e4822]">Verified Intact</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• Lead Inquest:</span>
                <span className="font-bold">Dr. Esther</span>
              </div>
            </div>
            <p className="text-[8.5px] text-[#786146] font-courier leading-tight">
              All 13 forensic samples photographed, catalogued, and declassified for syndicate inspection.
            </p>
          </div>

          <div className="w-full pt-1.5 border-t border-[#cfc09f] mt-1 flex items-center justify-between text-[9px]">
            <span className="rubber-stamp text-[#204925] border-[#204925] text-[8px]">
              AUTOPSY SIGNED 17.09
            </span>
            <span className="text-[8.5px] text-zinc-600 font-courier font-bold">
              LAB REF: 0917-CSI
            </span>
          </div>
        </div>

        {/* Right: Interactive Forensic Result Board (8.5 cols) */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-2 min-h-0 overflow-hidden">
          {/* Main Board Container */}
          <div className="yellow-legal p-2.5 sm:p-3 rounded border border-[#dfd4a2] shadow-paper-sheet flex flex-col h-full min-h-0">
            {/* Board Title Header */}
            <div className="flex flex-wrap items-center justify-between border-b border-[#cfc09f] pb-2 mb-2 gap-2 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[#87110c] font-bold text-xs sm:text-sm flex items-center gap-1.5 uppercase font-serif-display">
                  <FolderOpen className="w-4 h-4 text-[#87110c]" />
                  Interactive Forensic Result Board
                </span>
                <span className="text-[9.5px] bg-[#d9ca8e] text-[#2f2012] px-1.5 py-0.5 rounded font-bold font-courier">
                  13 SAMPLES LOGGED
                </span>
              </div>

              {/* Search & Filter */}
              <div className="flex items-center gap-1.5 text-[10px]">
                <div className="relative">
                  <Search className="w-3 h-3 absolute left-1.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 13 samples..."
                    className="pl-5 pr-2 py-0.5 rounded border border-[#cfc09f] bg-white/80 text-[10px] text-[#2c1d11] placeholder:text-zinc-500 focus:outline-none focus:border-[#87110c]"
                  />
                </div>
                <select
                  value={selectedRoomFilter}
                  onChange={(e) => setSelectedRoomFilter(e.target.value)}
                  className="py-0.5 px-1.5 rounded border border-[#cfc09f] bg-white/80 text-[10px] text-[#2c1d11] focus:outline-none"
                >
                  {roomOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt === 'ALL' ? 'All Locations' : opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Instruction strip */}
            <div className="text-[10px] text-[#5c4731] font-garamond italic flex items-center justify-between pb-1 flex-shrink-0">
              <span>
                Click any exhibit tile to open the Picture Browser to view and enlarge in high resolution.
              </span>
              <span className="text-[9px] font-courier text-[#87110c] not-italic font-bold">
                SHOWING {filteredResults.length} OF 13 EXHIBITS
              </span>
            </div>

            {/* 13 Forensic Result Tiles Grid */}
            <div className="flex-1 overflow-y-auto custom-scroll pr-1 min-h-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {filteredResults.map((item) => {
                  const displayImage = normalizeImgurUrl(item.initialImageUrl || customImages[item.id] || '');

                  return (
                    <div
                      key={item.id}
                      onClick={() =>
                        onInspectImage(
                          displayImage,
                          item.title,
                          `Filename: ${item.filename} • ${item.roomName} • ${item.description}`
                        )
                      }
                      className="group bg-[#fcf8ec] hover:bg-[#fffdf7] border border-[#cfc09f] hover:border-[#87110c] p-2 rounded shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
                      title="Click to enlarge in Picture Browser"
                    >
                      {/* Top Bar with Logo & Category */}
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5 min-w-0">
                          {renderTileLogo(item.logoType)}
                          <div className="min-w-0">
                            <span className="text-[8.5px] uppercase font-bold text-[#87110c] truncate block">
                              {item.category}
                            </span>
                            <span className="text-[8px] text-[#69553f] font-courier truncate block">
                              {item.roomName}
                            </span>
                          </div>
                        </div>

                        {/* Sample Title (e.g. Sealed Wine (found in Cerulean's Bedroom)) */}
                        <h5 className="font-serif-display text-xs font-bold text-[#231409] leading-snug group-hover:text-[#87110c] transition-colors">
                          {item.title}
                        </h5>

                        {/* Filename Tag */}
                        <div className="mt-0.5 text-[8.5px] font-courier text-[#6b5843] bg-[#f0e8d3] px-1 py-0.5 rounded border border-[#dfd5be] truncate">
                          <span className="text-[#87110c] font-bold">Filename: </span>
                          <span>{item.filename}</span>
                        </div>
                      </div>

                      {/* Image Preview & Hover Enlarge Prompt */}
                      <div className="mt-2">
                        <div className="relative w-full h-28 sm:h-32 rounded overflow-hidden border border-[#c9bca0] bg-[#1a1410] shadow-inner group/img">
                          {displayImage ? (
                            <img
                              src={displayImage}
                              alt={item.title}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 text-[9px] p-2 text-center bg-[#211a14]">
                              <Eye className="w-5 h-5 mb-1 opacity-50" />
                              <span>Click to inspect</span>
                            </div>
                          )}

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 transition-opacity text-white text-[9.5px] font-typewriter">
                            <Eye className="w-3.5 h-3.5" />
                            <span>CLICK TO ENLARGE</span>
                          </div>
                        </div>

                        {/* Summary caption */}
                        <p className="font-garamond text-[10.5px] text-[#423120] mt-1.5 leading-tight line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Bottom Footer Info */}
                      <div className="mt-2 pt-1 border-t border-[#dfd4be] flex items-center justify-between text-[8px] font-courier text-[#715c44]">
                        <span>REF: {item.id.toUpperCase()}</span>
                        <span className="text-[#87110c] group-hover:underline flex items-center gap-0.5 font-bold">
                          <span>INSPECT</span>
                          <Eye className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
