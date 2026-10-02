import React, { useState } from 'react';
import { ROOMS, RoomInfo, MANOR_LOGOS } from '../../data/manorData';
import {
  Eye,
  Compass,
  MapPin,
  ZoomOut,
  Layers,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface BlueprintTabProps {
  onInspectImage: (url: string, title: string, caption: string) => void;
  onNavigateSuspect?: (suspectId: string) => void;
}

interface RoomTarget {
  x: number; // percentage 0-100 across width
  y: number; // percentage 0-100 across height
  scale: number; // zoom factor
  label: string;
}

// Precise room coordinate anchors derived from the 1856x4716 architectural layout
const ROOM_TARGETS: Record<string, RoomTarget> = {
  full: { x: 50, y: 50, scale: 1, label: 'Full Estate Map' },
  study: { x: 77, y: 61, scale: 2.7, label: "Sir White's Study Room" },
  dining: { x: 48, y: 61, scale: 2.6, label: 'Dining Hall' },
  amber: { x: 22, y: 14, scale: 2.8, label: "Mrs Amber's Bedroom" },
  cerulean: { x: 77, y: 13.5, scale: 2.8, label: "Master Cerulean's Bedroom" },
  violet: { x: 22, y: 26.5, scale: 2.8, label: "Lady Violet's Bedroom" },
  scarlet: { x: 77, y: 27, scale: 2.8, label: "Miss Scarlet's Bedroom" },
  lab: { x: 50, y: 83, scale: 2.7, label: 'Forensic Laboratory' }
};

export const BlueprintTab: React.FC<BlueprintTabProps> = ({
  onInspectImage,
  onNavigateSuspect
}) => {
  // 'full' represents the zoomed-out fit view of the entire estate map
  const [selectedRoomId, setSelectedRoomId] = useState<string>('full');
  const [floorFilter, setFloorFilter] = useState<'ALL' | 'First Floor' | 'Second Floor'>('ALL');

  const currentRoom = selectedRoomId !== 'full' ? ROOMS[selectedRoomId] : null;
  const currentTarget = ROOM_TARGETS[selectedRoomId] || ROOM_TARGETS.full;

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
      {/* Header Bar */}
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

        <div className="flex items-center gap-2">
          {/* Floor Filter Buttons */}
          <div className="flex items-center gap-1 text-[10px]">
            {(['ALL', 'First Floor', 'Second Floor'] as const).map((floor) => (
              <button
                key={floor}
                onClick={() => setFloorFilter(floor)}
                className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  floorFilter === floor
                    ? 'bg-[#87110c] text-white border-red-900 font-bold'
                    : 'bg-[#d5c39f] hover:bg-[#c4b08a] text-[#332214] border-[#b8a47e]'
                }`}
              >
                {floor}
              </button>
            ))}
          </div>

          {/* Enlarge Button */}
          <button
            onClick={handleEnlarge}
            className="flex items-center gap-1 px-2.5 py-0.5 bg-[#2b1d14] hover:bg-[#402a1d] text-amber-200 rounded border border-amber-900/60 text-[10px] transition-colors cursor-pointer"
            title="Inspect full uncropped blueprint in High-Resolution Lightbox"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>ENLARGE</span>
          </button>

          <span className="rubber-stamp text-stamp-red border-stamp-red text-[9px] hidden lg:inline">
            INQUEST DOSSIER
          </span>
        </div>
      </div>

      {/* Main Split Layout: 7 Cols Interactive Map + 5 Cols Room Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 flex-1 min-h-0">
        {/* Left Column: Interactive Map Frame with Smooth Zoom-in */}
        <div className="lg:col-span-7 bg-[#110d0d] p-2 sm:p-2.5 rounded border-2 border-zinc-700 shadow-polaroid flex flex-col justify-between min-h-0 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-2/3 h-24 bg-amber-500/10 blur-[50px] rounded-full"></div>

          {/* Interactive Zoom Canvas Container (Guaranteed Uncropped, Fit View by default) */}
          <div className="relative w-full flex-1 rounded border border-zinc-700 bg-[#0a0706] flex items-center justify-center min-h-0 overflow-hidden p-1.5">
            {/* Aspect-Ratio Matched Viewport: exactly matches 1856 x 4716 map dimensions */}
            <div
              className="relative max-h-full max-w-full flex items-center justify-center transition-transform duration-700 ease-out"
              style={{
                aspectRatio: '1856 / 4716',
                height: '100%',
                transform: `scale(${currentTarget.scale})`,
                transformOrigin: `${currentTarget.x}% ${currentTarget.y}%`
              }}
            >
              <img
                src={blueprintUrl}
                alt="White Manor Map Blueprint"
                onError={(e) => {
                  e.currentTarget.src = '/images/manor_map_fairy_point.jpeg';
                }}
                className="w-full h-full object-contain pointer-events-auto select-none"
              />

              {/* Pulsing Pin Marker on Targeted Room when zoomed in */}
              {selectedRoomId !== 'full' && (
                <div
                  className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center animate-fadeIn"
                  style={{
                    left: `${currentTarget.x}%`,
                    top: `${currentTarget.y}%`
                  }}
                >
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600 border-2 border-white shadow-lg"></span>
                  </span>
                  <span className="mt-1 px-1.5 py-0.5 bg-black/90 text-amber-200 border border-amber-500/80 rounded text-[9px] font-courier whitespace-nowrap shadow-md tracking-wider">
                    {currentTarget.label}
                  </span>
                </div>
              )}
            </div>

            {/* Top Left Floating Quick Reset / Zoom Out Button */}
            {selectedRoomId !== 'full' ? (
              <button
                onClick={() => setSelectedRoomId('full')}
                className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-black/85 hover:bg-black text-amber-200 rounded text-[10px] border border-amber-800/70 backdrop-blur-sm transition-all cursor-pointer shadow-lg animate-fadeIn"
                title="Zoom out to Full Map overview"
              >
                <ZoomOut className="w-3.5 h-3.5 text-amber-400" />
                <span>ZOOM OUT (FULL MAP)</span>
              </button>
            ) : (
              <div className="absolute top-2 left-2 pointer-events-none bg-black/75 px-2 py-0.5 rounded text-[9px] font-mono text-zinc-300 border border-zinc-700/80 backdrop-blur-sm">
                FIT VIEW • COMPLETE ESTATE
              </div>
            )}

            {/* Bottom Right Enlarge Indicator */}
            <button
              onClick={handleEnlarge}
              className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-black/80 hover:bg-black text-zinc-300 hover:text-amber-200 rounded text-[9px] font-mono border border-zinc-700/80 backdrop-blur-sm transition-colors cursor-pointer"
              title="Click to view full uncropped resolution in lightbox"
            >
              <Eye className="w-3 h-3 text-amber-400" />
              <span>CLICK TO EXPAND</span>
            </button>
          </div>

          {/* Room Selector Strip with "Full Map" and Chamber Zoom Buttons */}
          <div className="pt-2 flex-shrink-0">
            <div className="text-[9px] text-zinc-400 uppercase font-bold mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-500" />
                <span>SELECT CHAMBER TO ZOOM IN:</span>
              </span>
              <span className="text-amber-400 font-courier text-[8.5px]">
                {selectedRoomId === 'full' ? 'FULL ESTATE' : currentTarget.label.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 text-[9px] text-center">
              {/* Full Map (Default Zoom-out Option) */}
              <button
                onClick={() => setSelectedRoomId('full')}
                className={`p-1 sm:p-1.5 rounded border transition-all cursor-pointer font-bold flex items-center justify-center gap-1 ${
                  selectedRoomId === 'full'
                    ? 'bg-[#87110c] text-white border-red-800 shadow-md ring-1 ring-red-400'
                    : 'bg-[#2a221d] hover:bg-[#3d3128] text-amber-100/90 border-zinc-700'
                }`}
                title="Zoom out to show the fit view of the entire map"
              >
                <Compass className="w-3 h-3 text-amber-400" />
                <span className="truncate">FULL MAP</span>
              </button>

              {/* Individual Rooms that trigger interactive zoom-in */}
              {filteredRooms.map((room) => {
                const isSelected = selectedRoomId === room.id;
                return (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`p-1 sm:p-1.5 rounded border transition-all truncate cursor-pointer ${
                      isSelected
                        ? 'bg-[#87110c] text-white border-red-800 font-bold shadow-md ring-1 ring-red-400'
                        : 'bg-[#2a221d] hover:bg-[#3d3128] text-amber-100/90 border-zinc-700'
                    }`}
                    title={`Zoom in to ${room.name} (${room.floor})`}
                  >
                    {room.shortName || room.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Room Inspection Dossier (Split Dossier Layout) */}
        <div className="lg:col-span-5 grid-paper p-3 rounded border border-[#cfc09f] shadow-paper-sheet flex flex-col justify-between min-h-0 overflow-y-auto custom-scroll">
          {currentRoom ? (
            <div className="space-y-2.5">
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
              <div className="p-2.5 bg-[#eae1c9] rounded text-[10px] space-y-1.5 text-[#3d2c1c] border border-[#d2c4a2]">
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
                {currentRoom.evidenceFound && (
                  <div className="border-t border-[#d8cbb0] pt-1">
                    <strong>FORENSIC EVIDENCE RECOVERED:</strong>
                    <div className="font-garamond text-xs mt-0.5 text-[#87110c] font-bold">
                      {currentRoom.evidenceFound}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Estate Overview when "Full Map" is selected */
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#cfc09f] pb-1">
                <span className="text-stamp-red font-bold text-[11px] tracking-wider">
                  ESTATE OVERVIEW &amp; DIRECTORY
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-[#87110c] text-white">
                  FAIRY POINT 3 • 2 FLOORS
                </span>
              </div>

              <div>
                <h4 className="font-serif-display text-base font-bold text-[#24130a] leading-tight">
                  The White Manor (Fairy Point 3) Estate
                </h4>
                <p className="font-garamond text-xs text-[#382618] mt-1 leading-relaxed">
                  The historic White Manor is a two-story colonial estate featuring classical British timber architecture, wrap-around verandas, and dual staircase passages. On the evening of Sir White’s demise, all access doors and wing boundaries were sealed by constabulary order.
                </p>
              </div>

              <div className="p-2.5 bg-[#eae1c9] rounded text-[10px] space-y-2 text-[#3d2c1c] border border-[#d2c4a2]">
                <div>
                  <strong className="text-[#87110c]">INTERACTIVE SECTOR ZOOM:</strong>
                  <p className="font-garamond text-xs mt-0.5 text-[#24170d]">
                    Select any chamber in the section below the map to zoom in directly to that room on the architectural blueprint and inspect its evidence docket.
                  </p>
                </div>
                <div className="border-t border-[#d8cbb0] pt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[9.5px]">
                  <div className="bg-[#f5ebd6] p-1.5 rounded border border-[#ded1b6]">
                    <span className="font-bold text-[#87110c] block">FIRST FLOOR:</span>
                    <span className="text-[#3b2b1d]">Study Room, Dining Hall, Forensic Lab</span>
                  </div>
                  <div className="bg-[#f5ebd6] p-1.5 rounded border border-[#ded1b6]">
                    <span className="font-bold text-[#87110c] block">SECOND FLOOR:</span>
                    <span className="text-[#3b2b1d]">M. Cerulean, Lady Violet, Mrs Amber, Miss Scarlet</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="mt-2 pt-2 border-t border-[#cfc09f] flex items-center justify-between text-[10px]">
            <span className="font-bold text-[#87110c]">
              {currentRoom ? `WING: ${currentRoom.floor.toUpperCase()}` : 'OVERVIEW: COMPLETE ESTATE'}
            </span>
            <span className="text-[9.5px] text-[#63503a] font-courier">
              {currentRoom
                ? `ARCHIVE REF: RM-${currentRoom.id.toUpperCase()}`
                : 'STATUS: FIT VIEW ACTIVE'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
