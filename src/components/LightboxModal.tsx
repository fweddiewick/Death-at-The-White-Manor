import React from 'react';
import { X, ZoomIn, ZoomOut, Download, ExternalLink } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  caption?: string;
  tag?: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  caption,
  tag
}) => {
  const [scale, setScale] = React.useState<number>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative max-w-5xl w-full max-h-[95vh] flex flex-col bg-[#1c1512] border-2 border-[#b59f77] rounded shadow-2xl overflow-hidden font-courier text-zinc-200">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#2a1e17] border-b border-[#8c7355]/40 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            <span className="font-bold text-amber-200 uppercase tracking-widest">{title}</span>
            {tag && (
              <span className="px-1.5 py-0.5 bg-[#87110c] text-white text-[9px] font-bold rounded">
                {tag}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScale((s) => Math.max(0.6, s - 0.2))}
              className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[10px] text-zinc-400">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale((s) => Math.min(2.5, s + 0.2))}
              className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <a
              href={imageUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white ml-2"
              title="Open full resolution in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={imageUrl}
              download={`${title.replace(/[^a-zA-Z0-9_-]/g, '_')}.svg`}
              className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white"
              title="Download Certificate / Exhibit"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1 hover:bg-red-900 rounded text-zinc-300 hover:text-white ml-2"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Canvas */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-black/60 min-h-[300px]">
          <div
            className="transition-transform duration-150 ease-out flex items-center justify-center"
            style={{ transform: `scale(${scale})` }}
          >
            <img
              src={imageUrl}
              alt={title}
              className="max-h-[75vh] w-auto object-contain rounded border border-zinc-700 shadow-2xl"
            />
          </div>
        </div>

        {/* Bottom Caption */}
        {caption && (
          <div className="p-3 bg-[#241a15] border-t border-[#8c7355]/40 text-xs text-[#cfbda8] font-garamond italic text-center">
            "{caption}"
          </div>
        )}
      </div>
    </div>
  );
};
