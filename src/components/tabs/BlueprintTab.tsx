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

// Map asset URLs for Full Estate and dedicated First & Second Floor architectural layouts
const ESTATE_MAP_URLS = {
  all: MANOR_LOGOS.blueprint || '/images/manor_map_fairy_point.jpeg',
  firstFloor: '/images/manor_map_first_floor.jpg',
  secondFloor: '/images/manor_map_second_floor.jpg'
};

// Precise room coordinate anchors derived from the 1856x4716 combined layout
const ALL_MAP_TARGETS: Record<string, RoomTarget> = {
  full: { x: 50, y: 50, scale: 1, label: 'Full Estate Map (Both Floors)' },
  study: { x: 23, y: 74, scale: 2.7, label: "Sir White's Study Room" },
  dining: { x: 48, y: 61, scale: 2.6, label: 'Dining Hall' },
  amber: { x: 22, y: 14, scale: 2.8, label: "Mrs Amber's Bedroom" },
  cerulean: { x: 77, y: 13.5, scale: 2.8, label: "Master Cerulean's Bedroom" },
  violet: { x: 22, y: 26.5, scale: 2.8, label: "Lady Violet's Bedroom" },
  scarlet: { x: 77, y: 27, scale: 2.8, label: "Miss Scarlet's Bedroom" },
  lab: { x: 50, y: 83, scale: 2.7, label: 'Forensic Laboratory' }
};

// First Floor layout targets (1856 x 2200, matching attached reference layout with zero cutoff)
const FIRST_FLOOR_TARGETS: Record<string, RoomTarget> = {
  full: { x: 50, y: 50, scale: 1, label: 'First Floor Full Layout' },
  firstFloor: { x: 50, y: 50, scale: 1, label: 'First Floor Full Layout' },
  dining: { x: 48, y: 21.6, scale: 2.3, label: 'Dining Hall' },
  study: { x: 23, y: 49.5, scale: 2.4, label: "Sir White's Study Room" },
  lab: { x: 50, y: 68.8, scale: 2.4, label: 'Forensic Laboratory' }
};

// Second Floor layout targets (1856 x 2200, matching attached reference layout with zero cutoff)
const SECOND_FLOOR_TARGETS: Record<string, RoomTarget> = {
  full: { x: 50, y: 50, scale: 1, label: 'Second Floor Full Layout' },
  secondFloor: { x: 50, y: 50, scale: 1, label: 'Second Floor Full Layout' },
  amber: { x: 22, y: 22.7, scale: 2.4, label: "Mrs Amber's Bedroom" },
  cerulean: { x: 77, y: 21.6, scale: 2.4, label: "Master Cerulean's Bedroom" },
  violet: { x: 22, y: 49.5, scale: 2.4, label: "Lady Violet's Bedroom" },
  scarlet: { x: 77, y: 50.5, scale: 2.4, label: "Miss Scarlet's Bedroom" }
};

export const BlueprintTab: React.FC<BlueprintTabProps> = ({
  onInspectImage,
  onNavigateSuspect
}) => {
  // 'full' represents the zoomed-out fit view of the currently active floor or estate
  const [selectedRoomId, setSelectedRoomId] = useState<string>('full');
  const [floorFilter, setFloorFilter] = useState<'ALL' | 'First Floor' | 'Second Floor'>('ALL');

  const currentRoom = selectedRoomId !== 'full' && selectedRoomId !== 'firstFloor' && selectedRoomId !== 'secondFloor'
    ? ROOMS[selectedRoomId]
    : null;

  // Select target system and image based on active floor mode
  const activeImageUrl =
    floorFilter === 'First Floor'
      ? ESTATE_MAP_URLS.firstFloor
      : floorFilter === 'Second Floor'
      ? ESTATE_MAP_URLS.secondFloor
      : ESTATE_MAP_URLS.all;

  // Aspect ratio is 1856/2200 for single floor plans, 1856/4716 for combined map
  const activeAspectRatio =
    floorFilter === 'ALL' ? '1856 / 4716' : '1856 / 2200';

  const targetMap =
    floorFilter === 'First Floor'
      ? FIRST_FLOOR_TARGETS
      : floorFilter === 'Second Floor'
      ? SECOND_FLOOR_TARGETS
      : ALL_MAP_TARGETS;

  const currentTarget = targetMap[selectedRoomId] || targetMap.full;

  const filteredRooms = Object.values(ROOMS).filter(
    (r) => floorFilter === 'ALL' || r.floor === floorFilter
  );

  const handleEnlarge = () => {
    const title =
      floorFilter === 'First Floor'
        ? 'White Manor First Floor Architectural Plan'
        : floorFilter === 'Second Floor'
        ? 'White Manor Second Floor Architectural Plan'
        : 'White Manor Estate Map & Architectural Blueprint';
    const caption =
      floorFilter === 'First Floor'
        ? 'First Floor full structural blueprint (Kitchen, Dining Hall, Study Room, Living Hall, Forensic Lab)'
        : floorFilter === 'Second Floor'
        ? 'Second Floor full structural blueprint (Amber, Cerulean, Violet, Scarlet chambers & Balcony)'
        : 'The White Manor (Fairy Point 3) full uncropped structural blueprint with all wings and passageways';

    onInspectImage(activeImageUrl, title, caption);
  };

  const handleFloorSelect = (floor: 'ALL' | 'First Floor' | 'Second Floor') => {
    setFloorFilter(floor);
    if (floor === 'First Floor') {
      setSelectedRoomId('firstFloor');
    } else if (floor === 'Second Floor') {
      setSelectedRoomId('secondFloor');
    } else {
      setSelectedRoomId('full');
    }
  };

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoomId(roomId);
    if (ROOMS[roomId]) {
      setFloorFilter(ROOMS[roomId].floor);
    }
  };

  const handleResetFullMap = () => {
    setSelectedRoomId('full');
    setFloorFilter('ALL');
  };

  const isChamberTarget =
    selectedRoomId !== 'full' &&
    selectedRoomId !== 'firstFloor' &&
    selectedRoomId !== 'secondFloor';

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
          {/* Floor Filter Buttons with Smooth Zoom Integration */}
          <div className="flex items-center gap-1 text-[10px]">
            {(['ALL', 'First Floor', 'Second Floor'] as const).map((floor) => (
              <button
                key={floor}
                onClick={() => handleFloorSelect(floor)}
                className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  floorFilter === floor
                    ? 'bg-[#87110c] text-white border-red-900 font-bold shadow-sm'
                    : 'bg-[#d5c39f] hover:bg-[#c4b08a] text-[#332214] border-[#b8a47e]'
                }`}
                title={
                  floor === 'ALL'
                    ? 'View both floors (Complete Estate)'
                    : `View only the entire ${floor} layout`
                }
              >
                {floor === 'ALL' ? 'ALL FLOORS' : floor}
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
            {/* Aspect-Ratio Matched Viewport: exactly matches active floor layout (1856x2200 or 1856x4716) */}
            <div
              className="relative max-h-full max-w-full flex items-center justify-center transition-transform duration-700 ease-out"
              style={{
                aspectRatio: activeAspectRatio,
                height: '100%',
                transform: `scale(${currentTarget.scale})`,
                transformOrigin: `${currentTarget.x}% ${currentTarget.y}%`
              }}
            >
              <img
                src={activeImageUrl}
                alt={currentTarget.label}
                onError={(e) => {
                  e.currentTarget.src = '/images/manor_map_fairy_point.jpeg';
                }}
                className="w-full h-full object-contain pointer-events-auto select-none"
              />

              {/* Pulsing Red Indicator on Targeted Room (Unobstructed, shown only when an individual chamber is inspected) */}
              {isChamberTarget && (
                <div
                  className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center animate-fadeIn"
                  style={{
                    left: `${currentTarget.x}%`,
                    top: `${currentTarget.y}%`
                  }}
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 border border-white shadow-lg"></span>
                  </span>
                </div>
              )}
            </div>

            {/* Top Left Floating Quick Reset / Zoom Out Button */}
            {isChamberTarget ? (
              <button
                onClick={() =>
                  setSelectedRoomId(
                    floorFilter === 'First Floor'
                      ? 'firstFloor'
                      : floorFilter === 'Second Floor'
                      ? 'secondFloor'
                      : 'full'
                  )
                }
                className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-black/85 hover:bg-black text-amber-200 rounded text-[10px] border border-amber-800/70 backdrop-blur-sm transition-all cursor-pointer shadow-lg animate-fadeIn"
                title={`Zoom out to ${floorFilter === 'ALL' ? 'Full Map' : floorFilter}`}
              >
                <ZoomOut className="w-3.5 h-3.5 text-amber-400" />
                <span>ZOOM OUT ({floorFilter === 'ALL' ? 'FULL MAP' : 'FLOOR VIEW'})</span>
              </button>
            ) : selectedRoomId !== 'full' || floorFilter !== 'ALL' ? (
              <button
                onClick={handleResetFullMap}
                className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-black/85 hover:bg-black text-amber-200 rounded text-[10px] border border-amber-800/70 backdrop-blur-sm transition-all cursor-pointer shadow-lg animate-fadeIn"
                title="View complete 2-story estate map"
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>VIEW BOTH FLOORS</span>
              </button>
            ) : (
              <div className="absolute top-2 left-2 pointer-events-none bg-black/75 px-2 py-0.5 rounded text-[9px] font-mono text-zinc-300 border border-zinc-700/80 backdrop-blur-sm">
                FIT VIEW • COMPLETE ESTATE
              </div>
            )}

            {/* Bottom Center Floating Label: In scale with page typography, unobstructing the blueprint */}
            {selectedRoomId !== 'full' && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-1.5 px-2.5 py-0.5 bg-black/85 text-amber-200 border border-amber-900/60 rounded backdrop-blur-sm shadow-md animate-fadeIn max-w-[65%] truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0"></span>
                <span className="text-[8.5px] font-courier uppercase tracking-wider font-bold truncate">
                  {currentTarget.label}
                </span>
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

          {/* Room Selector Strip with "Full Map", Floor Overview, and Chamber Zoom Buttons */}
          <div className="pt-2 flex-shrink-0">
            <div className="text-[9px] text-zinc-400 uppercase font-bold mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-500" />
                <span>SELECT CHAMBER OR SECTOR TO ZOOM IN:</span>
              </span>
              <span className="text-amber-400 font-courier text-[8.5px]">
                {selectedRoomId === 'full'
                  ? 'FULL ESTATE'
                  : currentTarget.label.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 text-[9px] text-center">
              {/* Full Map (Default Zoom-out Option) */}
              <button
                onClick={handleResetFullMap}
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

              {/* Dedicated Floor Sector Button when filtered */}
              {floorFilter !== 'ALL' && (
                <button
                  onClick={() =>
                    setSelectedRoomId(
                      floorFilter === 'First Floor' ? 'firstFloor' : 'secondFloor'
                    )
                  }
                  className={`p-1 sm:p-1.5 rounded border transition-all truncate cursor-pointer font-bold ${
                    selectedRoomId === 'firstFloor' || selectedRoomId === 'secondFloor'
                      ? 'bg-[#87110c] text-white border-red-800 shadow-md ring-1 ring-red-400'
                      : 'bg-[#2a221d] hover:bg-[#3d3128] text-amber-100/90 border-zinc-700'
                  }`}
                  title={`Zoom to entire ${floorFilter}`}
                >
                  {floorFilter === 'First Floor' ? '1ST FLR (ALL)' : '2ND FLR (ALL)'}
                </button>
              )}

              {/* Individual Rooms that trigger interactive zoom-in */}
              {filteredRooms.map((room) => {
                const isSelected = selectedRoomId === room.id;
                return (
                  <button
                    key={room.id}
                    onClick={() => handleRoomSelect(room.id)}
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
          ) : selectedRoomId === 'firstFloor' ? (
            /* First Floor Sector Overview */
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#cfc09f] pb-1">
                <span className="text-stamp-red font-bold text-[11px] tracking-wider">
                  SECTOR DOSSIER: FIRST FLOOR (GROUND LEVEL)
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-[#87110c] text-white">
                  3 ACTIVE SITES
                </span>
              </div>

              <div>
                <h4 className="font-serif-display text-base font-bold text-[#24130a] leading-tight">
                  First Floor Architectural Sector &amp; Crime Scene
                </h4>
                <p className="font-garamond text-xs text-[#382618] mt-1 leading-relaxed">
                  The ground level houses the primary crime scene (Sir White’s private Study Room), the Grand Dining Hall where the convocation dinner took place, and the emergency Forensic Examination Laboratory. Verandas encircle the perimeter with direct access to the garden and dock path.
                </p>
              </div>

              <div className="p-2.5 bg-[#eae1c9] rounded text-[10px] space-y-2 text-[#3d2c1c] border border-[#d2c4a2]">
                <div>
                  <strong className="text-[#87110c]">FIRST FLOOR CHAMBERS (CLICK TO INSPECT):</strong>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 mt-1.5">
                    {Object.values(ROOMS)
                      .filter((r) => r.floor === 'First Floor')
                      .map((r) => (
                        <button
                          key={r.id}
                          onClick={() => handleRoomSelect(r.id)}
                          className="p-1.5 bg-[#f5ebd6] hover:bg-[#ebdcc0] border border-[#ded1b6] rounded text-left transition-colors cursor-pointer group"
                        >
                          <span className="font-bold text-[#87110c] block group-hover:text-red-800 text-[10px]">
                            {r.shortName || r.name}
                          </span>
                          <span className="text-[9px] text-[#55412e] line-clamp-1">{r.suspectsLinked}</span>
                        </button>
                      ))}
                  </div>
                </div>
                <div className="border-t border-[#d8cbb0] pt-1.5 text-[9.5px] text-[#4a3928]">
                  <strong>SECTOR PROTOCOL:</strong> All outer veranda doors sealed. Forensic personnel station located in the south wing laboratory.
                </div>
              </div>
            </div>
          ) : selectedRoomId === 'secondFloor' ? (
            /* Second Floor Sector Overview */
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#cfc09f] pb-1">
                <span className="text-stamp-red font-bold text-[11px] tracking-wider">
                  SECTOR DOSSIER: SECOND FLOOR (RESIDENTIAL)
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-[#87110c] text-white">
                  4 GUEST CHAMBERS
                </span>
              </div>

              <div>
                <h4 className="font-serif-display text-base font-bold text-[#24130a] leading-tight">
                  Second Floor Private Quarters &amp; Balconies
                </h4>
                <p className="font-garamond text-xs text-[#382618] mt-1 leading-relaxed">
                  The upper level contains the private bedrooms of the household and convocation guests: Mrs Amber, Master Cerulean, Lady Violet, and Miss Scarlet. Corridors connect each room to the central staircase and exterior balustrades overlooking the manor grounds.
                </p>
              </div>

              <div className="p-2.5 bg-[#eae1c9] rounded text-[10px] space-y-2 text-[#3d2c1c] border border-[#d2c4a2]">
                <div>
                  <strong className="text-[#87110c]">SECOND FLOOR CHAMBERS (CLICK TO INSPECT):</strong>
                  <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                    {Object.values(ROOMS)
                      .filter((r) => r.floor === 'Second Floor')
                      .map((r) => (
                        <button
                          key={r.id}
                          onClick={() => handleRoomSelect(r.id)}
                          className="p-1.5 bg-[#f5ebd6] hover:bg-[#ebdcc0] border border-[#ded1b6] rounded text-left transition-colors cursor-pointer group"
                        >
                          <span className="font-bold text-[#87110c] block group-hover:text-red-800 text-[10px]">
                            {r.shortName || r.name}
                          </span>
                          <span className="text-[9px] text-[#55412e] line-clamp-1">{r.suspectsLinked}</span>
                        </button>
                      ))}
                  </div>
                </div>
                <div className="border-t border-[#d8cbb0] pt-1.5 text-[9.5px] text-[#4a3928]">
                  <strong>SECTOR PROTOCOL:</strong> Inter-chamber passage logs secured. All suspect personal effects retained in situ for detective review.
                </div>
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
                    Choose First Floor or Second Floor at the top to zoom directly to that floor plan, or select any specific chamber below to examine individual crime scene evidence.
                  </p>
                </div>
                <div className="border-t border-[#d8cbb0] pt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[9.5px]">
                  <button
                    onClick={() => handleFloorSelect('First Floor')}
                    className="bg-[#f5ebd6] hover:bg-[#ebdcc0] p-1.5 rounded border border-[#ded1b6] text-left transition-colors cursor-pointer group"
                  >
                    <span className="font-bold text-[#87110c] block group-hover:text-red-800">
                      🔍 FIRST FLOOR (ZOOM):
                    </span>
                    <span className="text-[#3b2b1d]">Study Room, Dining Hall, Forensic Lab</span>
                  </button>
                  <button
                    onClick={() => handleFloorSelect('Second Floor')}
                    className="bg-[#f5ebd6] hover:bg-[#ebdcc0] p-1.5 rounded border border-[#ded1b6] text-left transition-colors cursor-pointer group"
                  >
                    <span className="font-bold text-[#87110c] block group-hover:text-red-800">
                      🔍 SECOND FLOOR (ZOOM):
                    </span>
                    <span className="text-[#3b2b1d]">M. Cerulean, Lady Violet, Mrs Amber, Miss Scarlet</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="mt-2 pt-2 border-t border-[#cfc09f] flex items-center justify-between text-[10px]">
            <span className="font-bold text-[#87110c]">
              {currentRoom
                ? `WING: ${currentRoom.floor.toUpperCase()}`
                : selectedRoomId === 'firstFloor'
                ? 'SECTOR: FIRST FLOOR PLAN'
                : selectedRoomId === 'secondFloor'
                ? 'SECTOR: SECOND FLOOR PLAN'
                : 'OVERVIEW: COMPLETE ESTATE'}
            </span>
            <span className="text-[9.5px] text-[#63503a] font-courier">
              {currentRoom
                ? `ARCHIVE REF: RM-${currentRoom.id.toUpperCase()}`
                : selectedRoomId !== 'full'
                ? 'STATUS: SECTOR ZOOM ACTIVE'
                : 'STATUS: FIT VIEW ACTIVE'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
