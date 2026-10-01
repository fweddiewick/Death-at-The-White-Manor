import React, { useState } from 'react';
import { SYNDICATES } from '../../data/manorData';
import { Search } from 'lucide-react';

interface TeamRosterTabProps {
  onInspectImage?: (url: string, title: string, caption: string) => void;
}

const getTeamCardClasses = (name: string) => {
  switch (name) {
    case 'Team Red':
      return { card: 'bg-red-50/90 border-red-300', dot: 'bg-red-600', text: 'text-red-700' };
    case 'Team Blue':
      return { card: 'bg-blue-50/90 border-blue-300', dot: 'bg-blue-600', text: 'text-blue-700' };
    case 'Team Green':
      return { card: 'bg-green-50/90 border-green-300', dot: 'bg-green-600', text: 'text-green-700' };
    case 'Team Orange':
      return { card: 'bg-orange-50/90 border-orange-300', dot: 'bg-orange-500', text: 'text-orange-700' };
    case 'Team Yellow':
      return { card: 'bg-yellow-50/90 border-yellow-300', dot: 'bg-amber-500', text: 'text-yellow-700' };
    case 'Team Purple':
    default:
      return { card: 'bg-purple-50/90 border-purple-300', dot: 'bg-purple-600', text: 'text-purple-700' };
  }
};

export const TeamRosterTab: React.FC<TeamRosterTabProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeams = SYNDICATES.filter((team) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const teamMatches = team.name.toLowerCase().includes(q);
    const memberMatches = team.members.some((m) => m.toLowerCase().includes(q));
    return teamMatches || memberMatches;
  });

  return (
    <section className="flex flex-col gap-2.5 h-full font-typewriter">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#cfc09f] pb-1 text-xs flex-shrink-0 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-stamp-red font-bold tracking-widest uppercase text-[11px]">
            [TEAM ASSIGNMENT]
          </span>
          <h3 className="font-serif-display text-base font-bold text-[#2b1b11] hidden sm:inline ml-2">
            Official Squad Operative Breakdown
          </h3>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2 top-2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search detectives..."
              className="pl-7 pr-2 py-0.5 rounded bg-[#f4ecd7] border border-[#cfc09f] text-[11px] text-[#29180d] focus:outline-none focus:ring-1 focus:ring-amber-900 w-36 sm:w-48"
            />
          </div>
          <span className="rubber-stamp text-[#c69214] border-[#c69214] text-[9px] hidden sm:inline">
            6 FIELD SQUADS
          </span>
        </div>
      </div>

      {/* Main Container: Team Assignment Squad Breakdown */}
      <div className="yellow-legal p-3 sm:p-4 rounded border border-[#dfd4a2] shadow-paper-sheet flex flex-col flex-1 min-h-0 overflow-y-auto custom-scroll">
        <div className="flex items-center justify-between border-b border-[#cebf85] pb-1.5 mb-3 flex-shrink-0">
          <span className="font-bold text-stamp-red tracking-wider text-xs sm:text-sm">
            TEAM ASSIGNMENT
          </span>
          <span className="text-[10px] bg-[#d9ca8e] text-[#2b1f13] px-2 py-0.5 rounded font-bold">
            36 INVESTIGATORS • 6 FIELD SQUADS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
          {filteredTeams.map((team) => {
            const colors = getTeamCardClasses(team.name);
            return (
              <div
                key={team.name}
                className={`p-3 rounded border shadow-sm transition-all flex flex-col justify-between ${colors.card}`}
              >
                {/* Team Header: Only Team Name, no additional name, no ranking, no scoreboard */}
                <div className="flex items-center justify-between border-b border-black/10 pb-1.5 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                    <span className={`font-bold text-xs sm:text-[13px] tracking-wide ${team.badgeText || colors.text}`}>
                      {team.name.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[10px] bg-black/5 text-[#4a3625] px-2 py-0.5 rounded font-typewriter">
                    {team.members.length} Operatives
                  </span>
                </div>

                {/* Operatives List */}
                <div className="grid grid-cols-2 gap-x-2.5 gap-y-1.5 text-[11px] text-[#2f2014] font-typewriter py-1">
                  {team.members.map((member) => (
                    <div key={member} className="flex items-center gap-1.5 truncate">
                      <span className="text-zinc-400 font-bold">•</span>
                      <span
                        className={
                          searchQuery && member.toLowerCase().includes(searchQuery.toLowerCase())
                            ? 'bg-yellow-200 font-bold px-0.5 rounded'
                            : ''
                        }
                      >
                        {member}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredTeams.length === 0 && (
            <div className="col-span-full text-center p-6 text-xs text-zinc-500 italic font-garamond">
              No detective found matching "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
