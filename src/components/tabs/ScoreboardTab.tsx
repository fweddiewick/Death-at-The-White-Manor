import React, { useState } from 'react';
import {
  Trophy,
  Crown,
  Medal,
  Award,
  Check,
  FileDown,
  Sparkles,
  Shirt,
  Eye,
  ChevronDown,
  ChevronUp,
  Table,
  BarChart3
} from 'lucide-react';
import {
  SYNDICATES,
  BEST_DRESSED_DETECTIVES,
  BEST_DRESSED_PHOTOS
} from '../../data/manorData';

interface ScoreboardTabProps {
  onInspectImage?: (url: string, title: string, caption: string) => void;
}

export const ScoreboardTab: React.FC<ScoreboardTabProps> = ({ onInspectImage }) => {
  const [activeView, setActiveView] = useState<'all' | 'scoreboard' | 'best-dressed'>('all');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  // Teams sorted by rank (1st to 6th)
  const sortedTeams = [...SYNDICATES].sort((a, b) => a.rank - b.rank);
  const winnerTeam = sortedTeams[0]; // Team Purple (172 pts)

  // Download official case scoreboard dossier
  const handleDownloadReport = () => {
    const content = `=====================================================
OFFICIAL DETECTIVE SCOREBOARD // DECLASSIFIED REPORT
DEATH AT THE WHITE MANOR - TEAM BONDING 2026
Venue: Civil Service Club @ Changi (Fairy Point 3)
Date: 17 September 2026
=====================================================

1. FINAL DETECTIVE SYNDICATE STANDINGS:
- 1ST PLACE (GRAND CHAMPION): TEAM PURPLE (172 PTS)
  Operatives: Christine Aw, Irene Liao, Lenis Lim, Lionel Ho, Peh Shi Ning, Yee Ling Hui
  Round Scores: Operation 1: 51 | Operation 2: 33 | Final Deduction: 88 | Total: 172
- 2ND PLACE (SILVER): TEAM YELLOW (170 PTS)
  Operatives: Alexis Oo, Clinton Chew, Eddie Neo, Eugenia Tan, Yun Tan, Zoe Chong
  Round Scores: Operation 1: 45 | Operation 2: 35 | Final Deduction: 90 | Total: 170
- 3RD PLACE (BRONZE): TEAM BLUE (167 PTS)
  Operatives: Chan Lai Mun, Desmond Ang, Michelle Tan, Stephen Tan, Tan Chia Yee, Tang En Lin
  Round Scores: Operation 1: 60 | Operation 2: 32 | Final Deduction: 75 | Total: 167
- 4TH PLACE: TEAM GREEN (136 PTS)
  Operatives: Desmond Lee, Lee Li Wei, Mun Ming Chuen, Norine Lin, Nur Hazirah, Rebecca Wee
  Round Scores: Operation 1: 58 | Operation 2: 35 | Final Deduction: 43 | Total: 136
- 5TH PLACE: TEAM ORANGE (130 PTS)
  Operatives: Aiden Koh, Emily Lim, Heather Ang, Mack Tang, Pamela Wong, Wyn Chan
  Round Scores: Operation 1: 52 | Operation 2: 29 | Final Deduction: 49 | Total: 130
- 6TH PLACE: TEAM RED (117 PTS)
  Operatives: Adeline Poh, Alice Kok, James Chong, Josephine Lee, Nur Qurratu Ain, Shawn Teo
  Round Scores: Operation 1: 55 | Operation 2: 33 | Final Deduction: 29 | Total: 117

2. OFFICIAL ROUND MATRIX:
----------------------------------------------------------------------
Rounds           | Red | Orange | Yellow | Green | Blue | Purple
----------------------------------------------------------------------
Operation 1      | 55  | 52     | 45     | 58    | 60   | 51
Operation 2      | 33  | 29     | 35     | 35    | 32   | 33
Final Deduction  | 29  | 49     | 90     | 43    | 75   | 88
----------------------------------------------------------------------
Final Tally      | 117 | 130    | 170    | 136   | 167  | 172
----------------------------------------------------------------------

3. BEST DRESSED DETECTIVE WINNERS (IN NO PARTICULAR ORDER):
- Alice Kok (Team Red) - Authentic 1920s tweed houndstooth newsboy cap & plaid jacket
- Clinton Chew (Team Yellow) - Sherlock Holmes tweed Inverness cape coat & deerstalker cap
- Tang En Lin (Team Blue) - Classic double-breasted 1920s khaki trench coat & magnifying glass
- All Members of Team Purple - Unified navy blue track jackets & 'SUSPECT EVERYONE' graphic tees
  (Christine Aw, Irene Liao, Lenis Lim, Lionel Ho, Peh Shi Ning, Yee Ling Hui)

4. ORGANIZING COMMITTEE:
Evelyn, Marcus, Priya, Derrick, Sarah
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'White_Manor_Official_Scoreboard_17092026.txt';
    link.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <span className="flex items-center gap-1 bg-[#831843] text-purple-100 font-bold text-[10px] px-2 py-0.5 rounded shadow border border-purple-400">
            <Crown className="w-3 h-3 text-amber-300" />
            1ST PLACE CHAMPION
          </span>
        );
      case 2:
        return (
          <span className="flex items-center gap-1 bg-amber-200 text-amber-950 font-bold text-[10px] px-2 py-0.5 rounded shadow border border-amber-400">
            <Medal className="w-3 h-3 text-amber-600" />
            2ND PLACE (SILVER)
          </span>
        );
      case 3:
        return (
          <span className="flex items-center gap-1 bg-blue-200 text-blue-950 font-bold text-[10px] px-2 py-0.5 rounded shadow border border-blue-400">
            <Medal className="w-3 h-3 text-blue-700" />
            3RD PLACE (BRONZE)
          </span>
        );
      default:
        return (
          <span className="bg-black/10 text-zinc-700 font-bold text-[10px] px-2 py-0.5 rounded">
            RANK #{rank}
          </span>
        );
    }
  };

  return (
    <section className="flex flex-col gap-2.5 h-full font-typewriter">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#cfc09f] pb-1 text-xs flex-shrink-0 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-stamp-red font-bold tracking-widest uppercase text-[11px]">
            [OFFICIAL SCOREBOARD // FINAL STANDINGS]
          </span>
          <h3 className="font-serif-display text-base font-bold text-[#2b1b11] hidden sm:inline ml-2">
            Verified Investigation Tally &amp; Best Dressed Awards
          </h3>
        </div>

        {/* View Filter Buttons & Export */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="inline-flex rounded-md shadow-sm p-0.5 bg-[#e7ddc4] border border-[#cfc09f] text-[10px]">
            <button
              onClick={() => setActiveView('all')}
              className={`px-2 py-0.5 rounded font-bold transition-colors ${
                activeView === 'all'
                  ? 'bg-[#87110c] text-white shadow'
                  : 'text-[#422e1b] hover:bg-[#d8cbb0]'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setActiveView('scoreboard')}
              className={`px-2 py-0.5 rounded font-bold transition-colors ${
                activeView === 'scoreboard'
                  ? 'bg-[#87110c] text-white shadow'
                  : 'text-[#422e1b] hover:bg-[#d8cbb0]'
              }`}
            >
              SCOREBOARD
            </button>
            <button
              onClick={() => setActiveView('best-dressed')}
              className={`px-2 py-0.5 rounded font-bold transition-colors ${
                activeView === 'best-dressed'
                  ? 'bg-[#87110c] text-white shadow'
                  : 'text-[#422e1b] hover:bg-[#d8cbb0]'
              }`}
            >
              BEST DRESSED
            </button>
          </div>

          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-1 px-2.5 py-1 bg-[#1f150d] hover:bg-[#382619] text-amber-100 rounded text-[10px] font-bold transition-colors"
            title="Download verified dossier scoreboard as text"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3 h-3 text-green-400" />
                <span className="hidden sm:inline">EXPORTED!</span>
              </>
            ) : (
              <>
                <FileDown className="w-3 h-3 text-amber-300" />
                <span className="hidden sm:inline">EXPORT DOSSIER</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scroll space-y-3 pr-1">
        {/* SECTION 1: TOP HIGHLIGHT ROW (GRAND CHAMPION & PODIUM) */}
        {(activeView === 'all' || activeView === 'scoreboard') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Grand Champion Card (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#faf4ff] via-[#f3e8ff] to-[#eed9fe] p-3.5 rounded-lg border-2 border-purple-500 shadow-polaroid relative">
              <div className="absolute -top-3 right-4 bg-purple-900 text-amber-200 border border-purple-400 px-3 py-0.5 rounded-full text-[9.5px] font-bold tracking-widest shadow uppercase flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-400" />
                GRAND CHAMPION
              </div>

              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 rounded-full bg-purple-700 text-amber-300 flex items-center justify-center shadow-md border-2 border-purple-300">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-purple-900 tracking-widest block uppercase">
                    WINNER • 1ST PLACE
                  </span>
                  <h4 className="font-serif-display text-xl font-bold text-purple-950 leading-tight">
                    {winnerTeam.name.toUpperCase()}
                  </h4>
                </div>
              </div>

              <div className="bg-white/90 p-2.5 rounded border border-purple-200 space-y-1 mb-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-purple-950">FINAL TALLY</span>
                  <span className="text-xl font-bold text-purple-900 font-courier">
                    {winnerTeam.score} POINTS
                  </span>
                </div>
                <div className="text-[10px] text-zinc-600 font-garamond italic border-t border-purple-100 pt-1">
                  Operation 1: <strong>51</strong> • Operation 2: <strong>33</strong> • Final Deduction: <strong className="text-purple-900">88</strong>
                </div>
              </div>

              <div>
                <span className="text-[9.5px] font-bold text-purple-900 uppercase tracking-wider block mb-1">
                  Champion Detectives:
                </span>
                <div className="grid grid-cols-2 gap-1 text-[10px] text-purple-950 font-typewriter">
                  {winnerTeam.members.map((member) => (
                    <div key={member} className="flex items-center gap-1 bg-white/70 px-1.5 py-0.5 rounded border border-purple-200 truncate">
                      <span className="text-purple-700 font-bold">★</span>
                      <span className="truncate">{member}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Official Rounds Matrix Table (7 cols) - Faithful to image.png */}
            <div className="lg:col-span-7 yellow-legal p-3 rounded-lg border border-[#dfd4a2] shadow-paper-sheet flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#cebf85] pb-1.5 mb-2">
                  <div className="flex items-center gap-1.5">
                    <Table className="w-3.5 h-3.5 text-[#87110c]" />
                    <span className="font-bold text-stamp-red tracking-wider text-xs">
                      OFFICIAL ROUNDS SCORE MATRIX
                    </span>
                  </div>
                  <span className="text-[9px] bg-[#d9ca8e] text-[#2b1f13] px-2 py-0.5 rounded font-bold">
                    VERIFIED TALLY
                  </span>
                </div>

                {/* The Exact Spreadsheet Table from image.png */}
                <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse text-[10.5px] font-typewriter">
                    <thead>
                      <tr>
                        <th
                          rowSpan={2}
                          className="p-1.5 border border-black/30 bg-[#ebdcb3] text-[#2c1d11] font-bold text-xs"
                        >
                          Rounds
                        </th>
                        <th
                          colSpan={6}
                          className="p-1 border border-black/30 bg-[#ebdcb3] text-[#2c1d11] font-bold text-xs"
                        >
                          Group
                        </th>
                      </tr>
                      <tr>
                        <th className="p-1 border border-black/30 bg-red-600 text-white font-bold">Red</th>
                        <th className="p-1 border border-black/30 bg-amber-500 text-black font-bold">Orange</th>
                        <th className="p-1 border border-black/30 bg-yellow-400 text-black font-bold">Yellow</th>
                        <th className="p-1 border border-black/30 bg-lime-400 text-black font-bold">Green</th>
                        <th className="p-1 border border-black/30 bg-sky-400 text-black font-bold">Blue</th>
                        <th className="p-1 border border-black/30 bg-purple-400 text-black font-bold">Purple</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white/80 hover:bg-white transition-colors">
                        <td className="p-1.5 border border-black/20 font-bold text-left pl-2">Operation 1</td>
                        <td className="p-1 border border-black/20">55</td>
                        <td className="p-1 border border-black/20">52</td>
                        <td className="p-1 border border-black/20">45</td>
                        <td className="p-1 border border-black/20">58</td>
                        <td className="p-1 border border-black/20 font-bold text-blue-700">60</td>
                        <td className="p-1 border border-black/20">51</td>
                      </tr>
                      <tr className="bg-[#fcf7e9] hover:bg-white transition-colors">
                        <td className="p-1.5 border border-black/20 font-bold text-left pl-2">Operation 2</td>
                        <td className="p-1 border border-black/20">33</td>
                        <td className="p-1 border border-black/20">29</td>
                        <td className="p-1 border border-black/20 font-bold">35</td>
                        <td className="p-1 border border-black/20 font-bold">35</td>
                        <td className="p-1 border border-black/20">32</td>
                        <td className="p-1 border border-black/20">33</td>
                      </tr>
                      <tr className="bg-white/80 hover:bg-white transition-colors">
                        <td className="p-1.5 border border-black/20 font-bold text-left pl-2">Final Deduction</td>
                        <td className="p-1 border border-black/20">29</td>
                        <td className="p-1 border border-black/20">49</td>
                        <td className="p-1 border border-black/20 font-bold text-amber-700">90</td>
                        <td className="p-1 border border-black/20">43</td>
                        <td className="p-1 border border-black/20">75</td>
                        <td className="p-1 border border-black/20 font-bold text-purple-800">88</td>
                      </tr>
                      {/* Final Tally Row - Yellow highlight for top 3 as in original image! */}
                      <tr className="border-t-2 border-black/50 font-bold text-xs">
                        <td className="p-1.5 border border-black/30 bg-[#ebdcb3] text-left pl-2">Final Tally</td>
                        <td className="p-1.5 border border-black/30 bg-white">117</td>
                        <td className="p-1.5 border border-black/30 bg-white">130</td>
                        <td className="p-1.5 border border-black/30 bg-yellow-300 text-black font-extrabold shadow-inner" title="2nd Place">
                          170
                        </td>
                        <td className="p-1.5 border border-black/30 bg-white">136</td>
                        <td className="p-1.5 border border-black/30 bg-yellow-300 text-black font-extrabold shadow-inner" title="3rd Place">
                          167
                        </td>
                        <td className="p-1.5 border border-black/30 bg-yellow-300 text-purple-950 font-extrabold shadow-inner" title="1st Place Champion!">
                          172 🏆
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-[#cebf85] flex items-center justify-between text-[9.5px] text-zinc-600 font-garamond italic">
                <span>* Yellow highlighted cells denote the top-scoring podium placements (1st, 2nd, 3rd)</span>
                <span className="text-[#87110c] font-bold not-italic font-typewriter">CSC @ CHANGI</span>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: RANKED SQUAD LEADERBOARD CARDS */}
        {(activeView === 'all' || activeView === 'scoreboard') && (
          <div className="paper-texture p-3 sm:p-3.5 rounded-lg border border-[#cfc09f] shadow-paper-sheet">
            <div className="flex items-center justify-between border-b border-[#cfc09f] pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-[#87110c]" />
                <span className="font-bold text-stamp-red tracking-wider text-xs sm:text-sm">
                  RANKED SQUAD LEADERBOARD
                </span>
              </div>
              <span className="text-[10px] text-zinc-600 font-typewriter">
                MAX 200 PTS SCALE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {sortedTeams.map((team) => {
                const maxScale = 200;
                const percentage = Math.round((team.score / maxScale) * 100);
                const isExpanded = expandedTeam === team.name;

                return (
                  <div
                    key={team.name}
                    className={`p-2.5 rounded border transition-all ${
                      team.rank === 1
                        ? 'bg-purple-50/90 border-purple-300 shadow-sm'
                        : team.rank === 2
                        ? 'bg-yellow-50/90 border-yellow-300 shadow-sm'
                        : team.rank === 3
                        ? 'bg-blue-50/90 border-blue-300 shadow-sm'
                        : 'bg-white/70 border-[#cfc09f]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        {getRankBadge(team.rank)}
                        <span className={`font-bold text-xs tracking-wide ${team.badgeText}`}>
                          {team.name.toUpperCase()}
                        </span>
                      </div>
                      <span className="font-courier font-bold text-sm text-[#87110c]">
                        {team.score} PTS
                      </span>
                    </div>

                    {/* Progress Bar of Points */}
                    <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden my-1">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          team.rank === 1
                            ? 'bg-purple-600'
                            : team.rank === 2
                            ? 'bg-amber-500'
                            : team.rank === 3
                            ? 'bg-blue-600'
                            : 'bg-zinc-600'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>

                    {/* Round breakdown chips */}
                    {team.rounds && (
                      <div className="flex items-center justify-between text-[9px] font-courier text-zinc-600 py-0.5 border-b border-black/5">
                        <span>Op1: {team.rounds.operation1}</span>
                        <span>Op2: {team.rounds.operation2}</span>
                        <span className="font-bold text-[#87110c]">Final: {team.rounds.finalDeduction}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[9.5px] mt-1 pt-0.5">
                      <span className="font-garamond italic text-zinc-600 truncate max-w-[160px]">
                        {team.members.length} Operatives
                      </span>
                      <button
                        onClick={() => setExpandedTeam(isExpanded ? null : team.name)}
                        className="text-[9px] text-[#87110c] hover:underline flex items-center gap-0.5 font-bold"
                      >
                        <span>{isExpanded ? 'Hide' : 'Roster'}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>

                    {/* Operatives List when expanded */}
                    {isExpanded && (
                      <div className="mt-1.5 pt-1.5 border-t border-black/10 text-[9px] text-[#2c1d11] font-typewriter">
                        <div className="grid grid-cols-2 gap-0.5">
                          {team.members.map((m) => (
                            <div key={m} className="truncate">
                              • {m}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 3: BEST DRESSED DETECTIVE WINNERS SECTION */}
        {(activeView === 'all' || activeView === 'best-dressed') && (
          <div className="bg-[#fbf7ee] p-3.5 sm:p-4 rounded-lg border-2 border-amber-900/40 shadow-paper-sheet space-y-3">
            {/* Best Dressed Header */}
            <div className="flex flex-wrap items-center justify-between border-b border-[#cebf85] pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-700 text-amber-100 flex items-center justify-center shadow">
                  <Shirt className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-display text-base sm:text-lg font-bold text-[#27160a] leading-tight flex items-center gap-1.5">
                    <span>BEST DRESSED DETECTIVE WINNERS</span>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </h3>
                  <span className="text-[10px] text-zinc-600 font-garamond italic">
                    (In no particular order) — Honoring exceptional sartorial commitment to 1920s noir detective style
                  </span>
                </div>
              </div>

              <span className="rubber-stamp text-[#87110c] border-[#87110c] text-[9.5px]">
                OFFICIAL CITATIONS
              </span>
            </div>

            {/* Visual Photo Cards (Incorporating the user's uploaded photos) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Photo 1: Team Purple Squad Photo */}
              <div className="bg-black/90 p-2 rounded-lg border border-zinc-700 shadow-polaroid flex flex-col justify-between">
                <div
                  className="relative rounded overflow-hidden bg-black flex items-center justify-center cursor-pointer group"
                  onClick={() =>
                    onInspectImage &&
                    onInspectImage(
                      BEST_DRESSED_PHOTOS[0].url,
                      BEST_DRESSED_PHOTOS[0].title,
                      BEST_DRESSED_PHOTOS[0].caption
                    )
                  }
                >
                  <img
                    src={BEST_DRESSED_PHOTOS[0].url}
                    alt={BEST_DRESSED_PHOTOS[0].title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src =
                        BEST_DRESSED_PHOTOS[0].fallbackUrl || '/purple_best_dressed.jpg';
                    }}
                    className="w-full h-48 sm:h-52 object-contain bg-zinc-950 group-hover:scale-102 transition-transform duration-200"
                  />
                  {onInspectImage && (
                    <button
                      type="button"
                      className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-black/70 hover:bg-black text-amber-200 rounded text-[9.5px] border border-amber-900/60 backdrop-blur-sm transition-colors cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>ENLARGE</span>
                    </button>
                  )}
                  <span className="absolute bottom-2 left-2 bg-purple-950/90 text-purple-200 border border-purple-500/60 px-2 py-0.5 rounded text-[9px] font-bold">
                    TEAM PURPLE SQUAD
                  </span>
                </div>

                <div className="pt-2 text-zinc-300">
                  <h5 className="font-bold text-xs text-amber-200">
                    {BEST_DRESSED_PHOTOS[0].title}
                  </h5>
                  <p className="text-[10px] text-zinc-300 font-garamond mt-0.5 line-clamp-2">
                    {BEST_DRESSED_PHOTOS[0].caption}
                  </p>
                </div>
              </div>

              {/* Photo 2: Alice, Clinton & En Lin Photo */}
              <div className="bg-black/90 p-2 rounded-lg border border-zinc-700 shadow-polaroid flex flex-col justify-between">
                <div
                  className="relative rounded overflow-hidden bg-black flex items-center justify-center cursor-pointer group"
                  onClick={() =>
                    onInspectImage &&
                    onInspectImage(
                      BEST_DRESSED_PHOTOS[1].url,
                      BEST_DRESSED_PHOTOS[1].title,
                      BEST_DRESSED_PHOTOS[1].caption
                    )
                  }
                >
                  <img
                    src={BEST_DRESSED_PHOTOS[1].url}
                    alt={BEST_DRESSED_PHOTOS[1].title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src =
                        BEST_DRESSED_PHOTOS[1].fallbackUrl || '/detectives_best_dressed.jpg';
                    }}
                    className="w-full h-48 sm:h-52 object-contain bg-zinc-950 group-hover:scale-102 transition-transform duration-200"
                  />
                  {onInspectImage && (
                    <button
                      type="button"
                      className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-black/70 hover:bg-black text-amber-200 rounded text-[9.5px] border border-amber-900/60 backdrop-blur-sm transition-colors cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>ENLARGE</span>
                    </button>
                  )}
                  <span className="absolute bottom-2 left-2 bg-amber-950/90 text-amber-200 border border-amber-500/60 px-2 py-0.5 rounded text-[9px] font-bold">
                    INDIVIDUAL LAUREATES
                  </span>
                </div>

                <div className="pt-2 text-zinc-300">
                  <h5 className="font-bold text-xs text-amber-200">
                    {BEST_DRESSED_PHOTOS[1].title}
                  </h5>
                  <p className="text-[10px] text-zinc-300 font-garamond mt-0.5 line-clamp-2">
                    {BEST_DRESSED_PHOTOS[1].caption}
                  </p>
                </div>
              </div>
            </div>

            {/* Individual Winner Profile Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
              {BEST_DRESSED_DETECTIVES.map((winner, idx) => (
                <div
                  key={winner.name}
                  className="p-3 bg-white rounded border border-[#d6c7a1] shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-black/10 pb-1 mb-1.5">
                      <span className="font-bold text-xs text-[#2c1d11]">
                        {winner.name}
                      </span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${winner.badgeBg} ${winner.badgeText}`}>
                        {winner.squad}
                      </span>
                    </div>
                    <p className="font-garamond text-[10.5px] text-[#4a3523] leading-relaxed">
                      {winner.description}
                    </p>
                  </div>

                  <div className="mt-2 pt-1 border-t border-black/5 flex items-center gap-1 text-[9px] text-amber-800 font-bold">
                    <Award className="w-3 h-3" />
                    <span>Best Dressed Citation</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
