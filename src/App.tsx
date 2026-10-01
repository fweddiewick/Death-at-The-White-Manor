/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FileText,
  Map,
  Users,
  FlaskConical,
  Users2,
  Sparkles,
  Film,
  Trophy
} from 'lucide-react';
import { Header } from './components/Header';
import { LightboxModal } from './components/LightboxModal';
import { PreEventPostersModal } from './components/PreEventPostersModal';

import { ForewordTab } from './components/tabs/ForewordTab';
import { BlueprintTab } from './components/tabs/BlueprintTab';
import { SuspectsTab } from './components/tabs/SuspectsTab';
import { ForensicLabTab } from './components/tabs/ForensicLabTab';
import { TeamRosterTab } from './components/tabs/TeamRosterTab';
import { CaseRevealTab } from './components/tabs/CaseRevealTab';
import { ScoreboardTab } from './components/tabs/ScoreboardTab';
import { VideoVaultTab } from './components/tabs/VideoVaultTab';

export type TabKey =
  | 'foreword'
  | 'map'
  | 'suspects'
  | 'lab'
  | 'roster'
  | 'reveal'
  | 'scoreboard'
  | 'vault';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('foreword');

  // Modals state
  const [isPostersOpen, setIsPostersOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
    caption?: string;
  }>({
    isOpen: false,
    url: '',
    title: '',
    caption: ''
  });

  const openLightbox = (url: string, title: string, caption?: string) => {
    setLightboxData({
      isOpen: true,
      url,
      title,
      caption
    });
  };

  const closeLightbox = () => {
    setLightboxData((prev) => ({ ...prev, isOpen: false }));
  };

  const tabsConfig = [
    { key: 'foreword' as TabKey, label: '1. FOREWORD', icon: FileText },
    { key: 'map' as TabKey, label: '2. MANOR MAP', icon: Map },
    { key: 'suspects' as TabKey, label: '3. SUSPECTS', icon: Users },
    { key: 'lab' as TabKey, label: '4. FORENSIC LAB', icon: FlaskConical },
    { key: 'roster' as TabKey, label: '5. TEAM ASSIGNMENT', icon: Users2 },
    { key: 'reveal' as TabKey, label: '6. CASE REVEAL', icon: Sparkles },
    { key: 'scoreboard' as TabKey, label: '7. SCOREBOARD', icon: Trophy },
    { key: 'vault' as TabKey, label: '8. VIDEO & VAULT', icon: Film }
  ];

  return (
    <div className="desk-wood w-screen h-screen flex flex-col items-center justify-between p-1.5 sm:p-2.5 text-[#2a221b] antialiased relative overflow-hidden select-none">
      {/* Top Ambient Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[850px] h-[260px] bg-amber-600/10 blur-[130px] rounded-full"></div>

      {/* Global Header Bar */}
      <Header
        onOpenPosters={() => setIsPostersOpen(true)}
        onOpenVault={() => setActiveTab('vault')}
        onLogoClick={() => setActiveTab('foreword')}
      />

      {/* MAIN MANILA CASE FOLDER CONTAINER (Strictly contained within viewport) */}
      <div className="w-full max-w-7xl flex-1 flex flex-col min-h-0 z-20 my-0.5">
        {/* FOLDER TABS BAR */}
        <nav
          className="w-full flex items-end overflow-x-auto pl-2 pr-2 gap-1 flex-shrink-0 select-none -mb-[2px] z-20 text-[11px] font-typewriter tracking-wide custom-scroll"
          id="folder-tab-bar"
        >
          {tabsConfig.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`folder-tab px-2.5 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1.5 shadow transition-all flex-shrink-0 cursor-pointer ${
                  isActive
                    ? 'active-tab bg-[#cbb48d] text-[#24170d] font-bold z-25'
                    : 'bg-[#a89069] hover:bg-[#bfa77e] text-[#36271a]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="truncate">{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* MAIN MANILA CASING */}
        <main className="manila-cardboard w-full flex-1 rounded-t-sm rounded-b-lg shadow-desk-drop p-2 sm:p-2.5 border-2 border-[#b59f77] flex flex-col overflow-hidden relative min-h-0">
          {/* Top Identification Strip */}
          <div className="w-full flex flex-wrap items-center justify-between pb-1.5 mb-1.5 border-b border-[#a68d62]/60 text-[#3f3123] font-typewriter text-xs flex-shrink-0 gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-[#1f150d] text-[#f7eed9] px-2 py-0.5 font-bold tracking-widest text-[9.5px] rounded-sm">
                CASE FILE NO. #17092026
              </div>
              <span className="hidden md:inline font-bold tracking-wider text-stamp-red text-[11px]">
                // DEPT. OF CRIMINAL INVESTIGATION
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="rubber-stamp text-stamp-red border-stamp-red text-[9.5px] py-0 px-1 font-bold">
                CASE SOLVED
              </span>
              <span className="rubber-stamp text-[#1e4822] border-[#1e4822] text-[9.5px] py-0 px-1 font-bold hidden sm:inline">
                DECLASSIFIED
              </span>
              <span className="text-[10px] text-[#5c4933] font-courier">
                DATE: 17.09.2026
              </span>
            </div>
          </div>

          {/* INNER PARCHMENT DOCKET VIEWPORT (No whole-page scroll, smooth nested scroll inside when needed) */}
          <div
            className="flex-1 w-full bg-[#fbf7ee] rounded-sm shadow-inner p-2.5 sm:p-3 overflow-hidden relative border border-[#dfd2b5] flex flex-col min-h-0"
            id="docket-viewport"
          >
            {activeTab === 'foreword' && (
              <ForewordTab
                onInspectImage={openLightbox}
                onOpenPosters={() => setIsPostersOpen(true)}
                onNavigateTab={(tabKey) => setActiveTab(tabKey as TabKey)}
              />
            )}
            {activeTab === 'map' && (
              <BlueprintTab
                onInspectImage={openLightbox}
              />
            )}
            {activeTab === 'suspects' && (
              <SuspectsTab
                onInspectImage={openLightbox}
              />
            )}
            {activeTab === 'lab' && (
              <ForensicLabTab
                onInspectImage={openLightbox}
              />
            )}
            {activeTab === 'roster' && (
              <TeamRosterTab onInspectImage={openLightbox} />
            )}
            {activeTab === 'reveal' && (
              <CaseRevealTab
                onInspectImage={openLightbox}
              />
            )}
            {activeTab === 'scoreboard' && (
              <ScoreboardTab onInspectImage={openLightbox} />
            )}
            {activeTab === 'vault' && <VideoVaultTab />}
          </div>
        </main>
      </div>

      {/* BOTTOM STATUS FOOTER */}
      <footer className="w-full max-w-7xl flex items-center justify-between px-3 py-0.5 font-courier text-[10px] text-zinc-400 z-30 select-none flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-stamp-red font-bold">CASE NO: #17092026</span>
          <span>•</span>
          <span>CIVIL SERVICE CLUB @ CHANGI (FAIRY POINT 3)</span>
        </div>
        <div className="hidden sm:inline">
          © 1926–2026 Team Bonding Committee • ALL RIGHTS RESERVED
        </div>
      </footer>

      {/* Interactive Modals */}
      <LightboxModal
        isOpen={lightboxData.isOpen}
        onClose={closeLightbox}
        imageUrl={lightboxData.url}
        title={lightboxData.title}
        caption={lightboxData.caption}
      />

      <PreEventPostersModal
        isOpen={isPostersOpen}
        onClose={() => setIsPostersOpen(false)}
        onInspectImage={openLightbox}
      />
    </div>
  );
}
