import React, { useState } from 'react';
import { ROOMS, RoomInfo, MANOR_LOGOS } from '../../data/manorData';
import {
  Eye,
  Maximize2,
  Minimize2,
  Columns,
  Square,
  ScrollText,
  MapPin,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface BlueprintTabProps {
  onInspectImage: (url: string, title: string, caption: string) => void;
  onNavigateSuspect?: (suspectId: string) => void;
}

export const BlueprintTab: React.FC<BlueprintTabProps> = ({
  onInspectImage,
  onNavigateSuspect
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>('study');
  const [floorFilter, setFloorFilter] = useState<'ALL' | 'First Floor' | 'Second Floor'>('ALL');
  // 'full' ensures the map fits the entire section as requested, with 'split' allowing room-dossier cross reference
  const [viewMode, setViewMode] = useState<'full' | 'split'>('full');
  // 'fit' displays the entire image uncropped within the section; 'scroll' allows full-width vertical scrolling
  const [fitMode, setFitMode] = useState<'fit' | 'scroll'>('fit');

  const currentRoom = ROOMS[selectedRoomId] || ROOMS['study'];

  const filteredRooms = Object.values(ROOMS).filter(
    (r) => floorFilter === 'ALL' || r.floor === floorFilter
  );

  const blueprintUrl = MANOR_LOGOS.blueprint || 'https://i.imgur.com/gAsGad2.jpeg';

  const handleEnlarge = () => {
    onInspectImage(
      blueprintUrl,
      'White Manor Estate Map & Architectural Blueprint',
      'The White Manor (Fairy Point 3) full uncropped structural blueprint with all wings and passageways'
    );
  };

  return (
    <section className="flex flex-col gap-2 h-full font-typewriter select-none">
      {/* Top Header bar with view controls */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#cfc09f] pb-1 text-xs flex-shrink-0 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-stamp-red font-bold tracking-widest uppercase text-[11px]">
            [ARCHITECTURAL BLUEPRINT // TOPOGRAPHY]
          </span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <h3 className="font-serif-display text-base font-bold text-[#2b1b11] hidden md:inline">
            The White Manor Estate Layout (Fairy Point 3)
          </h3>
        </div>

        {/* View Mode & Fit Toggles */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Section View Toggle: Full Map vs Split Dossier */}
          <div className="flex items-center bg-[#eae0cb] p-0.5 rounded border border-[#cfc09f] text-[10px]">
            <button
              onClick={() => setViewMode('full')}
              className={`px-2 py-0.5 rounded flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'full'
                  ? 'bg-[#87110c] text-white font-bold shadow-sm'
                  : 'text-[#382618] hover:bg-[#ded1b6]'
              }`}
              title="Fit map to entire section"
            >
              <Square className="w-3 h-3" />
              <span>FULL MAP</span>
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-2 py-0.5 rounded flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-[#87110c] text-white font-bold shadow-sm'
                  : 'text-[#382618] hover:bg-[#ded1b6]'
              }`}
              title="Show Map and Room Dossiers side-by-side"
            >
              <Columns className="w-3 h-3" />
              <span>SPLIT DOSSIER</span>
            </button>
          </div>

          {/* Sizing Toggle: Fit Entire Section vs Scroll Detail */}
          <div className="flex items-center bg-[#eae0cb] p-0.5 rounded border border-[#cfc09f] text-[10px]">
            <button
              onClick={() => setFitMode('fit')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                fitMode === 'fit'
                  ? 'bg-[#2b1d14] text-amber-200 font-bold shadow-sm'
                  : 'text-[#382618] hover:bg-[#ded1b6]'
              }`}
              title="Fit uncropped within section container"
            >
              FIT VIEW
            </button>
            <button
              onClick={() => setFitMode('scroll')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                fitMode === 'scroll'
                  ? 'bg-[#2b1d14] text-amber-200 font-bold shadow-sm'
                  : 'text-[#382618] hover:bg-[#ded1b6]'
              }`}
              title="Scroll full-width architectural layout"
            >
              SCROLL DETAIL
            </button>
          </div>

          {/* Enlarge Button */}
          <button
            onClick={handleEnlarge}
            className="flex items-center gap-1 px-2 py-1 bg-[#2b1d14] hover:bg-[#402a1d] text-amber-200 rounded border border-amber-900/60 text-[10px] transition-colors cursor-pointer"
            title="Inspect in Fullscreen High-Resolution Lightbox"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ENLARGE</span>
          </button>

          <span className="rubber-stamp text-stamp-red border-stamp-red text-[9px] hidden lg:inline">
            UNCROPPED RECORD
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 flex-1 min-h-0">
        {/* Manor Map Blueprint Card: 12 cols in Full Map mode, 7 cols in Split mode */}
        <div
          className={`${
            viewMode === 'full' ? 'lg:col-span-12' : 'lg:col-span-7'
          } bg-[#110d0d] p-2 sm:p-2.5 rounded border-2 border-zinc-700 shadow-polaroid flex flex-col justify-between min-h-0 relative overflow-hidden`}
        >
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-2/3 h-24 bg-amber-500/10 blur-[50px] rounded-full"></div>

          {/* Blueprint Canvas Frame - Guaranteed Uncropped */}
          <div
            className={`relative w-full flex-1 rounded border border-zinc-700 bg-[#0a0706] flex items-center justify-center min-h-0 ${
              fitMode === 'scroll' ? 'overflow-y-auto custom-scroll p-1' : 'overflow-hidden p-1.5'
            }`}
          >
            <img
              src={blueprintUrl}
              alt="The White Manor Estate Map"
              onError={(e) => {
                // Fallback to local high-res asset if external image is unavailable
                e.currentTarget.src = '/images/manor_map_fairy_point.jpeg';
              }}
              onClick={handleEnlarge}
              title="Click to open full-resolution high quality inspection"
              className={`${
                fitMode === 'fit'
                  ? 'w-full h-full object-contain'
                  : 'w-full max-w-3xl h-auto object-contain mx-auto'
              } transition-transform duration-200 cursor-zoom-in`}
            />

            {/* Quick Floating Hint Overlay */}
            <div className="absolute bottom-2 right-2 pointer-events-none bg-black/75 px-2 py-0.5 rounded text-[9px] font-mono text-zinc-300 border border-zinc-700/80 backdrop-blur-sm">
              CLICK MAP TO ENLARGE (UNCROPPED)
            </div>
          </div>

          {/* Bottom Bar: Chamber Quick Selector & Floor Indicator */}
          <div className="pt-2 flex-shrink-0">
            <div className="text-[9px] text-zinc-400 uppercase font-bold mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-500" />
                <span>CHAMBERS // ESTATE SECTORS:</span>
              </span>
              <span className="text-amber-400 font-courier text-[8.5px]">
                ESTATE SCALE: 1:150 ARCHITECTURAL
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1 text-[9px] text-center">
              {filteredRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => {
                    setSelectedRoomId(room.id);
                    if (viewMode === 'full') {
                      // Switch to split view so user immediately inspects that chamber's evidence
                      setViewMode('split');
                    }
                  }}
                  className={`p-1 rounded border transition-colors truncate cursor-pointer ${
                    selectedRoomId === room.id
                      ? 'bg-[#87110c] text-white border-red-800 font-bold shadow'
                      : 'bg-[#2a221d] hover:bg-[#3d3128] text-amber-100/90 border-zinc-700'
                  }`}
                  title={`${room.name} (${room.floor}) - Click to inspect`}
                >
                  {room.shortName || room.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Room Inspection Dossier (Shown in Split Mode) */}
        {viewMode === 'split' && (
          <div className="lg:col-span-5 grid-paper p-3 rounded border border-[#cfc09f] shadow-paper-sheet flex flex-col justify-between min-h-0 overflow-y-auto custom-scroll animate-fadeIn">
            <div className="space-y-2">
              {/* Room Tag Bar */}
              <div className="flex items-center justify-between border-b border-[#cfc09f] pb-1">
                <span className="text-stamp-red font-bold text-[11px] tracking-wider">
                  ROOM DOSSIER: {currentRoom.name.toUpperCase()}
                </span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                    currentRoom.clueRating === 'CRITICAL'
                      ? 'bg-red-200 text-red-900 border border-red-400'
                      : currentRoom.clueRating === 'EVIDENCE'
                      ? 'bg-amber-200 text-amber-900 border border-amber-400'
                      : 'bg-zinc-200 text-zinc-800'
                  }`}
                >
                  {currentRoom.clueRating} // {currentRoom.floor.toUpperCase()}
                </span>
              </div>

              {/* Room Title & Narrative */}
              <div>
                <h4 className="font-serif-display text-base font-bold text-[#24130a] leading-tight">
                  {currentRoom.name}
                </h4>
                <p className="font-garamond text-xs text-[#382618] mt-1 leading-relaxed">
                  {currentRoom.description}
                </p>
              </div>

              {/* Structured Evidence Box */}
              <div className="p-2 bg-[#eae1c9] rounded text-[10px] space-y-1.5 text-[#3d2c1c] border border-[#d2c4a2]">
                <div>
                  <strong className="text-[#87110c]">KEY SUSPECT OBSERVED:</strong>
                  <div className="font-garamond text-xs mt-0.5 text-[#24170d] font-bold">
                    {currentRoom.suspectsLinked}
                  </div>
                </div>
                <div className="border-t border-[#d8cbb0] pt-1">
                  <strong>ACCESS PASSAGEWAYS:</strong>
                  <div className="font-garamond text-xs mt-0.5 text-[#4a3a2a]">
                    {currentRoom.accessPassage}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-2 pt-2 border-t border-[#cfc09f] flex items-center justify-between text-[10px]">
              <span className="font-bold text-[#87110c]">
                WING: {currentRoom.floor.toUpperCase()}
              </span>
              <span className="text-[9px] text-[#63503a] font-courier">
                ARCHIVE REF: RM-{currentRoom.id.toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
