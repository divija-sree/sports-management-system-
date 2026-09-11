import React from 'react';

interface SwitchLeagueModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLeague: string;
  onSelectLeague: (leagueName: string, tier: string) => void;
}

export const SwitchLeagueModal: React.FC<SwitchLeagueModalProps> = ({
  isOpen,
  onClose,
  currentLeague,
  onSelectLeague,
}) => {
  if (!isOpen) return null;

  const leagues = [
    {
      name: 'Varsity Basketball Cup',
      tier: 'Tier 1 • Division A',
      sport: 'Basketball',
      icon: 'sports_basketball',
      teams: 8,
      status: 'Playoff Picture Active',
    },
    {
      name: '5v5 Soccer Division B',
      tier: 'Tier 2 • Group Stage',
      sport: 'Soccer',
      icon: 'sports_soccer',
      teams: 12,
      status: 'Week 4 / 8',
    },
    {
      name: 'Co-ed Volleyball Circuit',
      tier: 'Open Tier • Round Robin',
      sport: 'Volleyball',
      icon: 'sports_volleyball',
      teams: 10,
      status: 'Week 5 / 8',
    },
    {
      name: 'Flag Football Invitational',
      tier: 'Tier 1 • Turf Championship',
      sport: 'Football',
      icon: 'sports_football',
      teams: 6,
      status: 'Starting Nov 18',
    },
    {
      name: 'Intramural Badminton Open',
      tier: 'Singles & Doubles Circuit',
      sport: 'Badminton',
      icon: 'sports_tennis',
      teams: 16,
      status: 'Sign-Ups Open',
    },
  ];

  return (
    <div
      id="switch-league-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-surface-container border border-outline-variant/40 rounded-3xl p-5 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">unfold_more</span>
            <h3 className="font-headline-sm text-base text-on-surface font-bold">Select Active League</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto no-scrollbar">
          {leagues.map((lg) => {
            const isSelected = lg.name === currentLeague;
            return (
              <button
                key={lg.name}
                onClick={() => {
                  onSelectLeague(lg.name, lg.tier);
                  onClose();
                }}
                className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-primary-container/15 border-primary text-on-surface shadow-md'
                    : 'bg-surface-container-low border-outline-variant/20 hover:border-outline-variant/40 text-on-surface-variant'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected
                        ? 'bg-primary-container text-on-primary-container font-bold'
                        : 'bg-surface-container-high text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">{lg.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-xs font-bold text-on-surface">{lg.name}</h4>
                    <p className="font-body-sm text-[11px] text-on-surface-variant">{lg.tier}</p>
                    <span className="text-[10px] text-primary font-mono">{lg.status}</span>
                  </div>
                </div>

                {isSelected && (
                  <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
