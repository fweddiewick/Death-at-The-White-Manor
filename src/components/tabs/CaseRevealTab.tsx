import React, { useState } from 'react';
import { Youtube, ExternalLink, Link2, Check, Sparkles, Film, Play } from 'lucide-react';

interface CaseRevealTabProps {
  onInspectImage?: (url: string, title: string, caption?: string) => void;
}

export const CaseRevealTab: React.FC<CaseRevealTabProps> = () => {
  // Default YouTube Video ID / URL (can be customized or pasted by user)
  const DEFAULT_VIDEO_URL = 'https://www.youtube.com/watch?v=2Ln_LmsWySI';
  const [videoInput, setVideoInput] = useState<string>(DEFAULT_VIDEO_URL);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string>(DEFAULT_VIDEO_URL);
  const [showUrlEditor, setShowUrlEditor] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Helper to extract YouTube embed URL from various formats
  const getEmbedUrl = (url: string): string => {
    if (!url) return '';
    try {
      // Direct embed URL
      if (url.includes('youtube.com/embed/')) {
        return url;
      }
      // youtu.be/<id>
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split(/[?#]/)[0];
        return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0&modestbranding=1`;
      }
      // youtube.com/watch?v=<id>
      if (url.includes('v=')) {
        const id = url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0&modestbranding=1`;
      }
      // Pure video ID
      if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
        return `https://www.youtube.com/embed/${url.trim()}?autoplay=0&rel=0&modestbranding=1`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (videoInput.trim()) {
      setActiveVideoUrl(videoInput.trim());
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        setShowUrlEditor(false);
      }, 1500);
    }
  };

  const embedUrl = getEmbedUrl(activeVideoUrl);

  return (
    <section className="flex flex-col gap-2 h-full font-typewriter select-none">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#cfc09f] pb-1 text-xs flex-shrink-0 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-stamp-red font-bold tracking-widest uppercase text-[11px] flex items-center gap-1">
            <Film className="w-3.5 h-3.5" />
            [THE FINAL CONFESSION // MASTER CASE REVEAL]
          </span>
          <h3 className="font-serif-display text-base font-bold text-[#2b1b11] hidden sm:inline ml-2">
            Declassified Investigation Resolution &amp; Confession Reel
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUrlEditor(!showUrlEditor)}
            className="flex items-center gap-1 px-2.5 py-0.5 bg-[#2a1e17] hover:bg-[#3d2b20] text-amber-200 rounded border border-amber-900/60 text-[10px] transition-colors cursor-pointer"
            title="Update YouTube Video URL"
          >
            <Link2 className="w-3 h-3 text-amber-400" />
            <span>{showUrlEditor ? 'HIDE LINK SETTINGS' : 'EDIT VIDEO URL'}</span>
          </button>

          <span className="rubber-stamp text-stamp-red border-stamp-red text-[9px]">
            CASE SOLVED
          </span>
        </div>
      </div>

      {/* Optional URL Editor Bar (Appears when toggled) */}
      {showUrlEditor && (
        <form
          onSubmit={handleSaveUrl}
          className="flex flex-wrap items-center gap-2 p-2 bg-[#eae2cb] rounded border border-[#cfc09f] text-xs flex-shrink-0 animate-fadeIn"
        >
          <Youtube className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span className="font-bold text-[10.5px] text-[#2c1d11]">YOUTUBE URL / ID:</span>
          <input
            type="text"
            value={videoInput}
            onChange={(e) => setVideoInput(e.target.value)}
            placeholder="Paste YouTube link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)"
            className="flex-1 min-w-[200px] px-2 py-1 bg-white border border-[#cfc09f] rounded text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#87110c]"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-[#87110c] hover:bg-[#9e1610] text-white rounded text-[10.5px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-300" />
                <span>SAVED!</span>
              </>
            ) : (
              <span>UPDATE VIDEO</span>
            )}
          </button>
        </form>
      )}

      {/* Main Full-Page Centered Video Container */}
      <div className="flex-1 w-full min-h-0 flex items-center justify-center p-0.5 sm:p-1 overflow-hidden">
        <div className="w-full h-full bg-[#120f0d] rounded-lg border-2 border-[#4a3826] shadow-polaroid p-1.5 sm:p-2.5 flex flex-col items-center justify-center relative overflow-hidden group">
          {/* Subtle Vintage Projector Light Glow & Film Strip Accent */}
          <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[70%] h-36 bg-amber-500/10 blur-[80px] rounded-full"></div>

          {/* Embedded YouTube Video Player (Takes Up Whole Container Centered) */}
          <div className="w-full h-full rounded overflow-hidden relative shadow-2xl bg-black border border-zinc-800 flex items-center justify-center">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title="White Manor Master Case Reveal Video"
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 text-zinc-400 font-typewriter">
                <Youtube className="w-12 h-12 text-red-500 mb-2" />
                <p className="text-sm font-bold text-zinc-200">No YouTube URL provided</p>
                <p className="text-xs text-zinc-500 mt-1">Click &ldquo;EDIT VIDEO URL&rdquo; above to paste your YouTube link</p>
              </div>
            )}
          </div>

          {/* Bottom Film Strip Details */}
          <div className="w-full flex items-center justify-between pt-1.5 px-1 text-[9.5px] text-amber-200/70 font-courier flex-shrink-0">
            <span className="flex items-center gap-1 text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              ARCHIVAL TRANSMISSION // WHITE MANOR REVEAL
            </span>
            <span className="text-zinc-500 hidden sm:inline">
              VENUE: FAIRY POINT 3 • 17 SEPTEMBER 2026
            </span>
            <a
              href={activeVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 flex items-center gap-1 transition-colors text-amber-400"
            >
              <span>WATCH ON YOUTUBE</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
