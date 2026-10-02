import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  Film,
  ExternalLink,
  QrCode,
  Copy,
  Check,
  FolderArchive,
  Youtube,
  Sparkles
} from 'lucide-react';

export const VideoVaultTab: React.FC = () => {
  const VAULT_SHAREPOINT_URL =
    'https://senokoenergy-my.sharepoint.com/:f:/p/federickwoo/IgAX50Kbbb2cRJ72UZQKqsBmARM44IJw7ccMUcKf8dCSBTU?e=BepbgQ';

  const HIGHLIGHT_VIDEO_URL = 'https://youtu.be/Yo1uxczv6fw';

  const [copiedLink, setCopiedLink] = useState(false);

  // Canvas and DataURL state for the high-contrast gradient QR Code
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [qrGenerated, setQrGenerated] = useState(false);

  useEffect(() => {
    const renderGradientQRCode = async () => {
      try {
        // Step 1: Render QR code modules onto an offscreen canvas with transparent background
        const offscreen = document.createElement('canvas');
        await QRCode.toCanvas(offscreen, VAULT_SHAREPOINT_URL, {
          width: 360,
          margin: 1.5,
          errorCorrectionLevel: 'M',
          color: {
            dark: '#000000',
            light: '#00000000', // transparent background
          },
        });

        const w = offscreen.width;
        const h = offscreen.height;

        // Step 2: Apply the red-to-dark gradient directly over the QR modules
        const offCtx = offscreen.getContext('2d');
        if (offCtx) {
          offCtx.globalCompositeOperation = 'source-in';
          const gradient = offCtx.createLinearGradient(0, 0, 0, h);
          gradient.addColorStop(0, '#e80000'); // Vibrant red at the top
          gradient.addColorStop(0.45, '#aa0000'); // Deep crimson in the middle
          gradient.addColorStop(1, '#160000'); // Blackish-burgundy at the bottom
          offCtx.fillStyle = gradient;
          offCtx.fillRect(0, 0, w, h);
        }

        // Step 3: Draw onto the visible canvas with a clean white background
        const mainCanvas = canvasRef.current;
        if (mainCanvas) {
          mainCanvas.width = w;
          mainCanvas.height = h;
          const mainCtx = mainCanvas.getContext('2d');
          if (mainCtx) {
            mainCtx.fillStyle = '#ffffff';
            mainCtx.fillRect(0, 0, w, h);
            mainCtx.drawImage(offscreen, 0, 0);
            setQrGenerated(true);
          }
        }
      } catch (err) {
        console.error('Error generating gradient QR code:', err);
      }
    };

    renderGradientQRCode();
  }, [VAULT_SHAREPOINT_URL]);

  // Helper to extract YouTube embed URL from various formats
  const getEmbedUrl = (url: string): string => {
    if (!url) return '';
    try {
      if (url.includes('youtube.com/embed/')) return url;
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split(/[?#]/)[0];
        return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0&modestbranding=1`;
      }
      if (url.includes('v=')) {
        const id = url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0&modestbranding=1`;
      }
      if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
        return `https://www.youtube.com/embed/${url.trim()}?autoplay=0&rel=0&modestbranding=1`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const copySharepointLink = () => {
    navigator.clipboard.writeText(VAULT_SHAREPOINT_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const embedUrl = getEmbedUrl(HIGHLIGHT_VIDEO_URL);

  return (
    <section className="flex flex-col gap-2 h-full font-typewriter select-none">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#cfc09f] pb-1 text-xs flex-shrink-0 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-stamp-red font-bold tracking-widest uppercase text-[11px] flex items-center gap-1">
            <Film className="w-3.5 h-3.5" />
            [EVENT HIGHLIGHT REEL // PICTURE VAULT]
          </span>
          <h3 className="font-serif-display text-base font-bold text-[#2b1b11] hidden sm:inline ml-2">
            Event Cinema Highlight Reel &amp; SharePoint Photo Repository
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="rubber-stamp text-[#87110c] border-[#87110c] text-[9px]">
            ARCHIVE READY
          </span>
        </div>
      </div>

      {/* Main Grid: YouTube Highlight Reel (Larger) & SharePoint Picture Vault (Compact) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 flex-1 min-h-0">
        {/* Left Column: Embedded YouTube Highlight Cinema (8.5 cols on LG, 9 cols on XL) */}
        <div className="lg:col-span-8 xl:col-span-9 bg-[#0e0a09] p-2 sm:p-2.5 rounded-lg border-2 border-zinc-700 shadow-2xl flex flex-col justify-between min-h-0 relative overflow-hidden">
          {/* Subtle Warm Amber Glow Behind Player */}
          <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-amber-500/10 blur-[60px] rounded-full"></div>

          {/* Embedded YouTube Player Container */}
          <div className="relative w-full flex-1 rounded overflow-hidden bg-black flex items-center justify-center border border-zinc-800 shadow-inner min-h-0">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title="Event Highlight Cinema Reel"
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 text-zinc-400 font-typewriter">
                <Youtube className="w-12 h-12 text-red-500 mb-2" />
                <p className="text-sm font-bold text-zinc-200">No YouTube Reel URL provided</p>
                <p className="text-xs text-zinc-500 mt-1">
                  Video feed is currently unavailable
                </p>
              </div>
            )}
          </div>

          {/* Film Strip Bottom Bar */}
          <div className="pt-2 px-1 text-zinc-400 font-courier text-[9.5px] flex items-center justify-between flex-shrink-0 border-t border-zinc-800/80 mt-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-amber-200 font-bold">EVENT HIGHLIGHT REEL</span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="text-zinc-500 hidden sm:inline">FULLSCREEN ENABLED</span>
            </div>

            <a
              href={HIGHLIGHT_VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <span>WATCH ON YOUTUBE</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right Column: SharePoint Picture Vault & Official QR Code (Compact 4 cols on LG, 3 cols on XL) */}
        <div className="lg:col-span-4 xl:col-span-3 bg-white p-2.5 sm:p-3 rounded-lg border-2 border-zinc-400 shadow-paper-sheet flex flex-col justify-between text-center relative min-h-0 overflow-y-auto custom-scroll">
          <div className="paperclip -top-3 right-6"></div>

          {/* Top Title & Single Description Line */}
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-full bg-[#87110c] text-white flex items-center justify-center mx-auto shadow">
              <FolderArchive className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-stamp-red tracking-widest uppercase block">
              OFFICIAL PICTURE VAULT
            </span>
            <h4 className="font-serif-display text-base font-bold text-black leading-tight">
              SharePoint Vault
            </h4>
            <p className="font-garamond text-xs text-zinc-700 leading-normal px-1">
              Access the high-resolution photo repository.
            </p>
          </div>

          {/* Official QR Code Box */}
          <div className="my-1.5 p-2 bg-[#fbf9f1] rounded-lg border-2 border-[#cfc09f] shadow-inner flex flex-col items-center justify-center">
            {/* The High-Contrast Red Gradient QR Code Canvas (rendered natively client-side) */}
            <a
              href={VAULT_SHAREPOINT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-1.5 bg-white rounded border border-zinc-300 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
              title="Click or scan to open SharePoint Picture Vault"
            >
              <canvas
                ref={canvasRef}
                className="w-32 h-32 sm:w-36 sm:h-36 max-w-[150px] max-h-[150px] object-contain group-hover:scale-[1.02] transition-transform duration-200 block mx-auto"
              />
              {!qrGenerated && (
                <img
                  src="/vault-qr-code.png"
                  alt="SharePoint Picture Vault QR Code Fallback"
                  className="w-32 h-32 sm:w-36 sm:h-36 max-w-[150px] max-h-[150px] object-contain block mx-auto"
                />
              )}
            </a>

            {/* Exact Required Wording */}
            <div className="mt-2 text-[8.5px] sm:text-[9px] font-bold text-[#87110c] font-courier uppercase tracking-tight text-center leading-tight">
              SCAN QR CODE TO OPEN PICTURE VAULT ON SHAREPOINT
            </div>
          </div>

          {/* Action Links & Buttons */}
          <div className="space-y-1.5 pt-0.5">
            <a
              href={VAULT_SHAREPOINT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-[#87110c] hover:bg-[#a61711] text-white rounded font-bold uppercase tracking-wider text-[10.5px] transition-colors flex items-center justify-center gap-1.5 shadow shadow-red-950/40 cursor-pointer"
            >
              <span>OPEN SHAREPOINT VAULT</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={copySharepointLink}
              className="w-full py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded text-[9px] font-typewriter flex items-center justify-center gap-1 transition-colors border border-zinc-300 cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3 h-3 text-green-600" />
                  <span className="text-green-700 font-bold">SHAREPOINT LINK COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-zinc-500" />
                  <span>Copy Vault Share Link</span>
                </>
              )}
            </button>

            <div className="pt-1 border-t border-zinc-200 text-[8.5px] text-zinc-500 font-courier flex justify-between px-1">
              <span>SENOKO ENERGY</span>
              <span>•</span>
              <span>HIGH-RES REPOSITORY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
