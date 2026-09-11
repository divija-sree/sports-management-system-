import React, { useState } from 'react';
import { ROSTER_MEMBERS } from '../../data/mockData';
import { TeamMember } from '../../types';

interface RosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'roster' | 'lineup' | 'tactics';
}

export const RosterModal: React.FC<RosterModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'roster',
}) => {
  const [activeTab, setActiveTab] = useState<'roster' | 'lineup' | 'tactics'>(initialTab);
  const [roster, setRoster] = useState<TeamMember[]>(ROSTER_MEMBERS);

  if (!isOpen) return null;

  const toggleStatus = (number: number) => {
    setRoster((prev) =>
      prev.map((m) => {
        if (m.number === number) {
          const nextStatus =
            m.status === 'Confirmed' ? 'Pending' : m.status === 'Pending' ? 'Confirmed' : 'Confirmed';
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );
  };

  const confirmedCount = roster.filter((m) => m.status === 'Confirmed').length;

  return (
    <div
      id="roster-tactics-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface-container border border-outline-variant/40 rounded-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center font-black text-black text-sm">
              #24
            </div>
            <div>
              <h3 className="font-headline-sm text-base text-on-surface font-bold">Apex Raptors Squad Hub</h3>
              <p className="font-label-md text-[10px] text-primary tracking-wider uppercase">
                {confirmedCount} of 8 Confirmed for Match vs Titans
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Tab pills */}
        <div className="flex p-1 bg-surface-container-low rounded-full border border-outline-variant/20 shrink-0">
          <button
            onClick={() => setActiveTab('roster')}
            className={`flex-1 py-1.5 text-center rounded-full font-label-md text-xs font-bold transition-all ${
              activeTab === 'roster'
                ? 'bg-primary-container text-on-primary-container shadow'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Roster (8)
          </button>
          <button
            onClick={() => setActiveTab('lineup')}
            className={`flex-1 py-1.5 text-center rounded-full font-label-md text-xs font-bold transition-all ${
              activeTab === 'lineup'
                ? 'bg-primary-container text-on-primary-container shadow'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Starting 5 ({confirmedCount}/5)
          </button>
          <button
            onClick={() => setActiveTab('tactics')}
            className={`flex-1 py-1.5 text-center rounded-full font-label-md text-xs font-bold transition-all ${
              activeTab === 'tactics'
                ? 'bg-primary-container text-on-primary-container shadow'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Tactics & Notes
          </button>
        </div>

        {/* Body content */}
        <div className="overflow-y-auto no-scrollbar flex-1 space-y-2.5 pr-1">
          {activeTab === 'roster' && (
            <div className="space-y-2">
              {roster.map((player) => (
                <div
                  key={player.number}
                  className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-surface-container-highest text-primary font-headline-md font-bold text-xs flex items-center justify-center">
                      #{player.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-headline-sm text-sm text-on-surface font-semibold">
                          {player.name}
                        </span>
                        <span className="text-[10px] text-outline">({player.position})</span>
                      </div>
                      <span className="text-[11px] text-on-surface-variant">
                        {player.year} • {player.ppg} PPG • {player.rpg} RPG
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleStatus(player.number)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-label-md font-bold border transition-all ${
                      player.status === 'Confirmed'
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                        : player.status === 'Pending'
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                        : 'bg-red-500/15 border-red-500/40 text-red-400'
                    }`}
                  >
                    {player.status}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'lineup' && (
            <div className="space-y-3">
              <div className="p-3 bg-surface-container-low rounded-xl border border-primary/30 text-center space-y-2">
                <span className="font-label-md text-xs text-primary uppercase tracking-wider font-bold">
                  Court 2 Starting Rotation (Fox40 Verified)
                </span>
                <div className="grid grid-cols-5 gap-1 pt-1">
                  {roster.slice(0, 5).map((p) => (
                    <div
                      key={p.number}
                      className="p-1.5 rounded-lg bg-surface-container-high border border-outline-variant/30 text-center"
                    >
                      <span className="block font-bold text-primary text-xs">#{p.number}</span>
                      <span className="block text-[9px] text-on-surface font-medium truncate">
                        {p.name.split(' ')[1] || p.name}
                      </span>
                      <span className="block text-[8px] text-outline uppercase">{p.position.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 space-y-1.5">
                <span className="font-label-md text-xs text-on-surface font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-primary">swap_horiz</span>
                  Substitution Rotation
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Santos (#3) enters at 6:00 mark for Chen. Miller (#15) rotates for Okafor in foul trouble.
                  Strict 20-minute cap on returning players.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'tactics' && (
            <div className="space-y-3">
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 space-y-2">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-sm">psychology</span>
                  <span className="font-label-md text-xs uppercase tracking-wider font-bold">
                    Scouting Report: Engineering Titans
                  </span>
                </div>
                <ul className="text-xs text-on-surface-variant space-y-1.5 list-disc pl-4">
                  <li>Heavy perimeter 3-point reliance (42% of attempts from deep).</li>
                  <li>Vulnerable to high pick-and-roll with Rivera (#24) and Okafor (#55).</li>
                  <li>Fast-break transition defense drops off in Q3 & Q4.</li>
                </ul>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 space-y-1">
                <span className="font-label-md text-xs text-secondary uppercase font-bold tracking-wider">
                  Tactical Focus Tonight
                </span>
                <p className="text-xs text-on-surface leading-relaxed">
                  Pressure ball handlers full-court until mid-court. Deny baseline drives and force contested mid-range floaters. Fox40 whistles are strict on hand-checking.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-xs font-bold active:scale-95 transition-all shadow"
        >
          Save & Return to Circuit
        </button>
      </div>
    </div>
  );
};
