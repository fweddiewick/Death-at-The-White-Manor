import React, { useState } from 'react';
import { Volume2, VolumeX, CloudDownload, Clock } from 'lucide-react';
import { noirAudio } from '../utils/audioPlayer';
import { MANOR_LOGOS } from '../data/manorData';

interface HeaderProps {
  onOpenPosters: () => void;
  onOpenVault: () => void;
  onLogoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPosters,
  onOpenVault,
  onLogoClick,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    const active = noirAudio.toggle();
    setIsPlaying(active);
  };

  return (
    <header className="w-full max-w-7xl flex items-center justify-between px-3 py-1 sm:py-1.5 text-[#e5d4bc] z-30 font-courier text-xs flex-shrink-0 select-none relative">
      {/* Left Case Identification */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c69214] animate-pulse shadow-[0_0_8px_#c69214]"></span>
          <span className="tracking-widest font-bold text-[#e9c349] uppercase text-[11px] sm:text-xs">
            CASE #17092026
          </span>
        </div>
        <span className="hidden lg:inline text-zinc-600">|</span>
        <span className="hidden lg:inline text-zinc-400 text-[10.5px] truncate">
          CSC @ CHANGI (FAIRY POINT 3)
        </span>
      </div>

      {/* Center Title Header Logo - Enlarged & Centered */}
      <div
        onClick={onLogoClick}
        className="flex flex-col items-center justify-center px-2 flex-shrink-0 cursor-pointer group"
        title="Death at The White Manor"
      >
        <img
          src={MANOR_LOGOS.main}
          alt="Death at the White Manor"
          className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center justify-end gap-2 sm:gap-2.5 flex-1 min-w-0">
        {/* Pre-Event Reminders Button */}
        <button
          onClick={onOpenPosters}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-[#231b17] hover:bg-[#342822] rounded border border-amber-900/60 text-amber-200/90 text-[11px] tracking-wider uppercase transition-colors cursor-pointer"
          title="Inspect Pre-Event Teasers & Reminders"
        >
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">PRE-EVENT TEASERS</span>
        </button>

        {/* 1920s Vinyl Ambience Toggle */}
        <button
          onClick={toggleSound}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors text-[11px] tracking-wider uppercase cursor-pointer ${
            isPlaying
              ? 'bg-[#423204] border-[#c69214] text-[#ffe088]'
              : 'bg-black/50 border-zinc-700 text-zinc-300 hover:bg-black/70'
          }`}
          title="Toggle 1920s Gramophone Vinyl Atmosphere"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#e9c349]" />
              <span className="hidden md:inline">VINYL: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden md:inline">VINYL: OFF</span>
            </>
          )}
        </button>

        {/* SharePoint Vault */}
        <button
          onClick={onOpenVault}
          className="flex items-center gap-1 px-2.5 py-1 bg-[#87110c] hover:bg-[#a61711] text-amber-100 rounded text-[11px] tracking-wider uppercase font-bold transition-colors shadow shadow-red-950/50 cursor-pointer"
        >
          <CloudDownload className="w-3.5 h-3.5" />
          <span>VAULT</span>
        </button>
      </div>
    </header>
  );
};
