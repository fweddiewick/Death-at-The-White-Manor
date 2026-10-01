import React, { useState } from 'react';
import { ROOMS, RoomInfo, MANOR_LOGOS } from '../../data/manorData';
import { Eye, Pin, Check, MapPin, Layers, AlertTriangle, Compass } from 'lucide-react';

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

  const currentRoom = ROOMS[selectedRoomId] || ROOMS['study'];

  const filteredRooms = Object.values(ROOMS).filter(
    (r) => floorFilter === 'ALL' || r.floor === floorFilter
  );

  return (
    <section className="flex flex-col gap-2.5 h-full font-typewriter">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#cfc09f] pb-1 text-xs flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-stamp-red font-bold tracking-widest uppercase text-[11px]">
            [ARCHITECTURAL BLUEPRINT // TOPOGRAPHY]
          </span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <h3 className="font-serif-display text-base font-bold text-[#2b1b11] hidden sm:inline">
            The White Manor Estate Layout (First &amp; Second Floor Wings)
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {/* Floor Filter Buttons */}
          <div className="flex items-center gap-1 text-[10px]">
            {(['ALL', 'First Floor', 'Second Floor'] as const).map((floor) => (
              <button
                key={floor}
                onClick={() => setFloorFilter(floor)}
                className={`px-2 py-0.5 rounded border transition-colors ${
                  floorFilter === floor
                    ? 'bg-[#87110c] text-white border-red-900 font-bold'
                    : 'bg-[#d5c39f] hover:bg-[#c4b08a] text-[#332214] border-[#b8a47e]'
                }`}
              >
                {floor}
              </button>
            ))}
          </div>
          <span className="rubber-stamp text-stamp-red border-stamp-red text-[9px] hidden md:inline">
            SCENE ARCHIVE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
        {/* Left: Graphic Blueprint Frame (7 cols) */}
        <div className="lg:col-span-7 bg-[#110d0d] p-2.5 rounded border-2 border-zinc-700 shadow-polaroid flex flex-col justify-between min-h-0">
          <div className="relative w-full flex-1 rounded overflow-hidden border border-zinc-600 bg-black flex items-center justify-center min-h-[220px]">
            <img
              src={MANOR_LOGOS.blueprint}
              alt="White Manor Map Blueprint"
              className="w-full h-full max-h-[300px] object-contain"
            />
            {/* Click to inspect overlay */}
            <button
              onClick={() => onInspectImage(MANOR_LOGOS.blueprint, "White Manor Estate Blueprint", "First and Second Floor layouts with passage indicators")}
              className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/70 hover:bg-black text-amber-200 rounded text-[10px] border border-amber-900/50 backdrop-blur-sm transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>ENLARGE</span>
            </button>
          </div>

          {/* Quick Room Indicator Buttons under the map */}
          <div className="pt-2">
            <div className="text-[9px] text-zinc-400 uppercase font-bold mb-1 flex items-center justify-between">
              <span>SELECT CHAMBER TO INSPECT:</span>
              <span className="text-amber-400">FAIRY POINT 3 LAYOUT</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1 text-[9px] text-center">
              {filteredRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoomId(room.id)}
                  className={`p-1 rounded border transition-colors truncate ${
                    selectedRoomId === room.id
                      ? 'bg-[#87110c] text-white border-red-800 font-bold shadow'
                      : 'bg-[#2a221d] hover:bg-[#3d3128] text-amber-100/90 border-zinc-700'
                  }`}
                  title={room.name}
                >
                  {room.shortName || room.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Room Inspection Dossier (5 cols) */}
        <div className="lg:col-span-5 grid-paper p-3 rounded border border-[#cfc09f] shadow-paper-sheet flex flex-col justify-between min-h-0 overflow-y-auto custom-scroll">
          <div className="space-y-2">
            {/* Room Tag Bar */}
            <div className="flex items-center justify-between border-b border-[#cfc09f] pb-1">
              <span className="text-stamp-red font-bold text-[11px] tracking-wider">
                ROOM DOSSIER: {currentRoom.name.toUpperCase()}
              </span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                currentRoom.clueRating === 'CRITICAL'
                  ? 'bg-red-200 text-red-900 border border-red-400'
                  : currentRoom.clueRating === 'EVIDENCE'
                  ? 'bg-amber-200 text-amber-900 border border-amber-400'
                  : 'bg-zinc-200 text-zinc-800'
              }`}>
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
      </div>
    </section>
  );
};
