import React, { useEffect, useState } from 'react';
import { FIXTURES_DATA, STANDINGS_DATA } from '../../data/mockData';
import { Fixture, StandingTeam } from '../../types';
import { BoxScoreModal } from '../modals/BoxScoreModal';
import { RosterModal } from '../modals/RosterModal';
import { ScoresheetModal } from '../modals/ScoresheetModal';
import { SwitchLeagueModal } from '../modals/SwitchLeagueModal';

export const LeaguesScreen: React.FC = () => {
  const [activeFixtureTab, setActiveFixtureTab] = useState<'upcoming' | 'results' | 'playoffs'>('upcoming');
  const [activeLeagueQuickTab, setActiveLeagueQuickTab] = useState<'mens1' | 'soccer' | 'volleyball'>('mens1');
  const [currentLeagueName, setCurrentLeagueName] = useState('Varsity Basketball Cup');
  const [currentLeagueTier, setCurrentLeagueTier] = useState('Tier 1 • Division A');

  // Modals state
  const [isSwitchLeagueOpen, setIsSwitchLeagueOpen] = useState(false);
  const [isRosterOpen, setIsRosterOpen] = useState(false);
  const [rosterInitialTab, setRosterInitialTab] = useState<'roster' | 'lineup' | 'tactics'>('roster');
  const [isScoresheetOpen, setIsScoresheetOpen] = useState(false);
  const [isBoxScoreOpen, setIsBoxScoreOpen] = useState(false);
  const [scoresheetSigned, setScoresheetSigned] = useState(false);
  const [checkedInTipOff, setCheckedInTipOff] = useState(false);
  const [showFullStandings, setShowFullStandings] = useState(false);

  // Live countdown timer state (hours:mins:secs)
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 44, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTwoDigits = (num: number) => num.toString().padStart(2, '0');

  const openRosterWithTab = (tab: 'roster' | 'lineup' | 'tactics') => {
    setRosterInitialTab(tab);
    setIsRosterOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Varsity Basketball Match Tonight',
        text: 'Apex Raptors vs Engineering Titans tonight at 7:30 PM on Court 2!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Match telemetry link copied to clipboard!');
    }
  };

  return (
    <main className="w-full max-w-lg mx-auto px-4 space-y-4 pt-3 pb-28">
      {/* 1. LEAGUE & DIVISION SWITCHER */}
      <section id="league-switcher-section" className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-label-md text-primary tracking-wider uppercase font-bold">
            Official Circuit
          </span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high border border-outline-variant/30">
            <span className="relative flex h-2 w-2">
              <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container"></span>
            </span>
            <span className="text-[11px] font-label-md text-on-surface font-semibold">WEEK 6 / 8</span>
          </div>
        </div>

        {/* League Title Selector Pill Card */}
        <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/20 shadow-lg relative overflow-hidden">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base" data-icon="sports_basketball">
                  sports_basketball
                </span>
                <h1 className="font-headline-sm text-lg text-on-surface leading-tight font-bold">
                  {currentLeagueName}
                </h1>
              </div>
              <p className="font-label-md text-[11px] text-on-surface-variant flex items-center gap-1">
                <span>{currentLeagueTier}</span>
                <span className="inline-block text-outline-variant">•</span>
                <span className="text-primary-fixed-dim font-bold">Playoff Picture Active</span>
              </p>
            </div>

            <button
              id="switch-league-btn"
              onClick={() => setIsSwitchLeagueOpen(true)}
              className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-xs flex items-center gap-1 active:scale-95 border border-outline-variant/30 hover:border-primary transition-colors shrink-0"
            >
              <span>Switch</span>
              <span className="material-symbols-outlined text-sm" data-icon="unfold_more">
                unfold_more
              </span>
            </button>
          </div>

          {/* Quick League Switcher Pills */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar text-xs font-label-md">
            <button
              id="quick-league-tab-mens1"
              onClick={() => {
                setActiveLeagueQuickTab('mens1');
                setCurrentLeagueName('Varsity Basketball Cup');
                setCurrentLeagueTier('Tier 1 • Division A');
              }}
              className={`px-3 py-1 rounded-full font-bold whitespace-nowrap active:scale-95 transition-transform flex items-center gap-1 ${
                activeLeagueQuickTab === 'mens1'
                  ? 'bg-primary-container text-on-primary-container shadow'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-outline-variant/20'
              }`}
            >
              <span className="material-symbols-outlined text-sm" data-icon="sports_basketball">
                sports_basketball
              </span>
              <span>Men's Tier 1</span>
            </button>

            <button
              id="quick-league-tab-soccer"
              onClick={() => {
                setActiveLeagueQuickTab('soccer');
                setCurrentLeagueName('5v5 Soccer Division B');
                setCurrentLeagueTier('Tier 2 • Group Stage');
              }}
              className={`px-3 py-1 rounded-full whitespace-nowrap active:scale-95 border border-outline-variant/20 transition-colors flex items-center gap-1 ${
                activeLeagueQuickTab === 'soccer'
                  ? 'bg-primary-container text-on-primary-container font-bold shadow'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-sm" data-icon="sports_soccer">
                sports_soccer
              </span>
              <span>5v5 Soccer Div B</span>
            </button>

            <button
              id="quick-league-tab-volleyball"
              onClick={() => {
                setActiveLeagueQuickTab('volleyball');
                setCurrentLeagueName('Co-ed Volleyball Circuit');
                setCurrentLeagueTier('Open Tier • Round Robin');
              }}
              className={`px-3 py-1 rounded-full whitespace-nowrap active:scale-95 border border-outline-variant/20 transition-colors flex items-center gap-1 ${
                activeLeagueQuickTab === 'volleyball'
                  ? 'bg-primary-container text-on-primary-container font-bold shadow'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-sm" data-icon="sports_volleyball">
                sports_volleyball
              </span>
              <span>Co-ed Volleyball</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. MY TEAM SPOTLIGHT CARD (Apex Raptors #24) */}
      <section
        id="team-spotlight-card"
        className="bg-surface-container-low rounded-2xl border border-outline-variant/20 overflow-hidden shadow-lg telemetry-grid-bg relative"
      >
        {/* Glow ambient header */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-primary-container/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="p-4 space-y-3">
          {/* Team Identity Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center font-headline-md text-xl text-surface-container-lowest font-black shadow-md border border-primary/40">
                #24
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-headline-md text-lg text-on-surface font-bold">Apex Raptors</h2>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-highest font-label-md text-[10px] text-primary font-bold">
                    1st DIV A
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-xs text-primary" data-icon="badge">
                    badge
                  </span>
                  <span>Alex Rivera • Team Captain</span>
                </p>
              </div>
            </div>

            {/* Streak Badge */}
            <div className="text-right">
              <div className="px-2 py-1 rounded-lg bg-surface-container-highest border border-primary/30 flex items-center gap-1">
                <span className="font-stat-counter text-base text-primary font-black">W4</span>
                <span className="text-sm">🔥</span>
              </div>
              <span className="font-label-md text-[10px] text-on-surface-variant block mt-0.5">
                Record: 6-1
              </span>
            </div>
          </div>

          {/* Next Match Countdown Banner */}
          <div className="rounded-xl bg-surface-container p-3 border-l-4 border-primary-container flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-primary-container">
                <span className="material-symbols-outlined text-sm" data-icon="timer">
                  timer
                </span>
                <span className="font-label-md text-[10px] uppercase tracking-wider font-bold">
                  NEXT MATCH TONIGHT • 7:30 PM
                </span>
              </div>
              <p className="font-body-md text-sm text-on-surface font-bold">vs. Engineering Titans</p>
              <p className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-xs" data-icon="location_on">
                  location_on
                </span>
                Main Fieldhouse • Court 2
              </p>
            </div>

            <div className="text-center bg-surface-dim/80 px-3 py-1.5 rounded-xl border border-outline-variant/20 shadow-inner">
              <span className="block font-headline-sm text-base text-primary font-bold font-mono">
                {formatTwoDigits(countdown.hours)}:{formatTwoDigits(countdown.minutes)}
              </span>
              <span className="block font-label-md text-[9px] text-on-surface-variant tracking-wider uppercase">
                HRS LEFT
              </span>
            </div>
          </div>

          {/* Quick Team Actions */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              id="team-action-roster"
              onClick={() => openRosterWithTab('roster')}
              className="bg-surface-container hover:bg-surface-container-high py-2 px-1 rounded-xl text-center border border-outline-variant/20 active:scale-95 transition-all group"
            >
              <span className="block font-headline-sm text-base text-on-surface font-bold group-hover:text-primary">
                8
              </span>
              <span className="block font-label-md text-[10px] text-on-surface-variant">Roster (Active)</span>
            </button>

            <button
              id="team-action-confirmed"
              onClick={() => openRosterWithTab('lineup')}
              className="bg-surface-container hover:bg-surface-container-high py-2 px-1 rounded-xl text-center border border-outline-variant/20 active:scale-95 transition-all group"
            >
              <span className="block font-headline-sm text-base text-primary font-bold">5/5</span>
              <span className="block font-label-md text-[10px] text-on-surface-variant">Confirmed</span>
            </button>

            <button
              id="team-action-tactics"
              onClick={() => openRosterWithTab('tactics')}
              className="bg-surface-container hover:bg-surface-container-high py-2 px-1 rounded-xl text-center border border-outline-variant/20 active:scale-95 transition-all flex flex-col items-center justify-center group"
            >
              <span className="material-symbols-outlined text-primary text-base group-hover:scale-110 transition-transform">
                strategy
              </span>
              <span className="block font-label-md text-[10px] text-on-surface-variant">Tactics/Notes</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. VERIFICATION & SCORE SUBMISSION BANNER (Required Captain Action) */}
      <section
        id="action-required-banner"
        onClick={() => setIsScoresheetOpen(true)}
        className="bg-surface-container-low rounded-2xl border border-primary/30 p-3 relative overflow-hidden shadow-md cursor-pointer hover:border-primary transition-all active:scale-[0.99]"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0 border border-primary/30">
            <span className="material-symbols-outlined text-xl" data-icon="fact_check">
              fact_check
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-[11px] text-primary tracking-wider uppercase font-bold">
                Action Required
              </span>
              <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-on-surface-variant text-[9px] font-mono">
                CODE: 4902
              </span>
              {scoresheetSigned && (
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                  SIGNED
                </span>
              )}
            </div>
            <p className="font-body-sm text-xs text-on-surface mt-0.5 leading-snug">
              Confirm digital scoresheet vs. Titans immediately following final horn with Head Referee.
            </p>
          </div>
        </div>
      </section>

      {/* 4. DIVISION STANDINGS STRIP / SNAPSHOT */}
      <section id="standings-section" className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base" data-icon="leaderboard">
              leaderboard
            </span>
            <h2 className="font-headline-sm text-base text-on-surface font-bold">
              Div A Standings Snapshot
            </h2>
          </div>
          <button
            id="toggle-standings-btn"
            onClick={() => setShowFullStandings(!showFullStandings)}
            className="font-label-md text-xs text-primary hover:underline flex items-center gap-0.5"
          >
            <span>{showFullStandings ? 'Collapse' : 'Full Table'}</span>
            <span className="material-symbols-outlined text-xs" data-icon="chevron_right">
              chevron_right
            </span>
          </button>
        </div>

        <div className="bg-surface-container-low rounded-2xl border border-outline-variant/20 overflow-hidden shadow-lg divide-y divide-outline-variant/10">
          {/* Table Header */}
          <div className="grid grid-cols-12 px-4 py-2 bg-surface-container text-xs font-label-md text-on-surface-variant uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-6">Team</div>
            <div className="col-span-2 text-center">W-L</div>
            <div className="col-span-1 text-center">+/-</div>
            <div className="col-span-2 text-right">Form</div>
          </div>

          {/* Standings Rows */}
          {(showFullStandings ? STANDINGS_DATA : STANDINGS_DATA.slice(0, 4)).map((team) => {
            const isMyTeam = team.isMyTeam;
            return (
              <div
                key={team.rank}
                className={`grid grid-cols-12 px-4 py-2.5 items-center font-body-md text-xs transition-colors ${
                  isMyTeam
                    ? 'bg-surface-container-high/60 border-l-4 border-primary font-bold'
                    : 'hover:bg-surface-container-high/30'
                }`}
              >
                <div className={`col-span-1 font-bold ${isMyTeam ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {team.rank}
                </div>
                <div className="col-span-6 flex items-center gap-2 truncate">
                  {isMyTeam && <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>}
                  <span className={`truncate ${isMyTeam ? 'font-bold text-on-surface' : 'text-on-surface'}`}>
                    {team.name}
                  </span>
                </div>
                <div className={`col-span-2 text-center ${isMyTeam ? 'font-bold text-on-surface' : 'text-on-surface-variant'}`}>
                  {team.wins}-{team.losses}
                </div>
                <div
                  className={`col-span-1 text-center text-xs font-mono font-bold ${
                    team.diff > 0 ? 'text-primary' : 'text-error'
                  }`}
                >
                  {team.diff > 0 ? `+${team.diff}` : team.diff}
                </div>
                <div className="col-span-2 flex justify-end gap-1">
                  {team.form.map((res, i) => (
                    <span
                      key={i}
                      className={`w-3.5 h-3.5 rounded-xs text-[9px] font-bold flex items-center justify-center ${
                        res === 'W'
                          ? 'bg-primary-container text-on-primary-container'
                          : 'bg-surface-container-highest text-on-surface-variant'
                      }`}
                    >
                      {res}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FIXTURES & MATCHDAY SCHEDULE */}
      <section id="fixtures-section" className="space-y-3">
        {/* Section Header & Filter Tabs */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base" data-icon="calendar_month">
                calendar_month
              </span>
              <h2 className="font-headline-sm text-base text-on-surface font-bold">League Fixtures</h2>
            </div>
            <span className="font-label-md text-xs text-on-surface-variant">SEASON 2024-25</span>
          </div>

          {/* Fixture Tabs */}
          <div className="flex p-1 bg-surface-container rounded-full border border-outline-variant/20">
            <button
              id="fixture-tab-upcoming"
              onClick={() => setActiveFixtureTab('upcoming')}
              className={`flex-1 py-1.5 text-center rounded-full font-label-md text-xs transition-all ${
                activeFixtureTab === 'upcoming'
                  ? 'bg-primary-container text-on-primary-container font-bold shadow'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Upcoming (4)
            </button>
            <button
              id="fixture-tab-results"
              onClick={() => setActiveFixtureTab('results')}
              className={`flex-1 py-1.5 text-center rounded-full font-label-md text-xs transition-colors ${
                activeFixtureTab === 'results'
                  ? 'bg-primary-container text-on-primary-container font-bold shadow'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Results (12)
            </button>
            <button
              id="fixture-tab-playoffs"
              onClick={() => setActiveFixtureTab('playoffs')}
              className={`flex-1 py-1.5 text-center rounded-full font-label-md text-xs transition-colors ${
                activeFixtureTab === 'playoffs'
                  ? 'bg-primary-container text-on-primary-container font-bold shadow'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Playoffs
            </button>
          </div>
        </div>

        {/* Match Fixture Cards Container */}
        <div className="space-y-3">
          {activeFixtureTab === 'upcoming' && (
            <>
              {/* CARD 1: TONIGHT'S FEATURE MATCH (Upcoming) */}
              <div
                id="fixture-card-tonight"
                className="bg-surface-container-low rounded-2xl border-2 border-primary/40 p-4 space-y-2.5 shadow-xl relative"
              >
                {/* Live Telemetry Pill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary border border-primary/30 font-label-md text-[11px] flex items-center gap-1 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                      TONIGHT • 19:30
                    </span>
                    <span className="font-label-md text-xs text-on-surface-variant">MATCH OF THE WEEK</span>
                  </div>
                  <span className="material-symbols-outlined text-primary text-xl" data-icon="sensors">
                    sensors
                  </span>
                </div>

                {/* Teams Matchup Display */}
                <div className="py-2 flex items-center justify-between">
                  <div className="w-5/12 text-left">
                    <span className="block font-headline-sm text-base text-primary font-black">
                      Apex Raptors
                    </span>
                    <span className="font-label-md text-xs text-on-surface-variant">Home • 1st Seed</span>
                  </div>
                  <div className="w-2/12 text-center flex flex-col items-center">
                    <span className="px-2 py-1 rounded bg-surface-container-highest text-on-surface font-headline-sm text-sm font-extrabold tracking-tighter">
                      VS
                    </span>
                    <span className="text-[10px] text-on-surface-variant uppercase mt-1 font-mono font-bold">
                      CR-2
                    </span>
                  </div>
                  <div className="w-5/12 text-right">
                    <span className="block font-headline-sm text-base text-on-surface font-bold">
                      Titans
                    </span>
                    <span className="font-label-md text-xs text-on-surface-variant">Away • 2nd Seed</span>
                  </div>
                </div>

                {/* Venue & Officials Telemetry Strip */}
                <div className="pt-2 border-t border-outline-variant/15 flex flex-wrap items-center justify-between gap-2 text-xs font-label-md text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-primary" data-icon="stadium">
                      stadium
                    </span>
                    <span>Court 2 • Fox40 Assigned</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-primary" data-icon="radar">
                      radar
                    </span>
                    <span>Telemetry: 120 FPS Active</span>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    id="check-in-tipoff-btn"
                    onClick={() => setCheckedInTipOff(!checkedInTipOff)}
                    className={`flex-1 py-2.5 px-4 rounded-full font-label-lg text-xs font-bold flex items-center justify-center gap-2 active:scale-95 shadow transition-all ${
                      checkedInTipOff
                        ? 'bg-emerald-500 text-black shadow-emerald-500/20'
                        : 'bg-primary-container text-on-primary-container hover:shadow-primary-container/20'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base" data-icon="how_to_reg">
                      {checkedInTipOff ? 'check_circle' : 'how_to_reg'}
                    </span>
                    <span>{checkedInTipOff ? 'Checked In for Tip-Off ✓' : 'Check In For Tip-Off'}</span>
                  </button>

                  <button
                    id="share-fixture-btn"
                    onClick={handleShare}
                    aria-label="Share match"
                    className="p-2.5 rounded-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface active:scale-95 transition-all flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-base" data-icon="share">
                      share
                    </span>
                  </button>
                </div>
              </div>

              {/* CARD 2: UPCOMING FRIDAY MATCH */}
              <div
                id="fixture-card-friday"
                className="bg-surface-container-low rounded-2xl border border-outline-variant/20 p-4 space-y-2 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-md text-xs text-on-surface-variant border border-outline-variant/20 font-bold">
                    FRI NOV 15 • 18:00
                  </span>
                  <span className="font-label-md text-xs text-on-surface-variant">East Fieldhouse Court 1</span>
                </div>

                <div className="py-1 flex items-center justify-between">
                  <div className="w-5/12 text-left">
                    <span className="font-headline-sm text-sm text-on-surface font-semibold block truncate">
                      Med School Dribblers
                    </span>
                    <span className="font-label-md text-xs text-on-surface-variant">3rd Seed</span>
                  </div>
                  <div className="w-2/12 text-center">
                    <span className="font-label-md text-xs text-on-surface-variant font-bold">VS</span>
                  </div>
                  <div className="w-5/12 text-right">
                    <span className="font-headline-sm text-sm text-on-surface font-semibold block truncate">
                      Business Bulls
                    </span>
                    <span className="font-label-md text-xs text-on-surface-variant">4th Seed</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-outline-variant/10 flex items-center justify-between">
                  <span className="font-body-sm text-xs text-on-surface-variant">Referees: Crew C</span>
                  <button
                    onClick={() => openRosterWithTab('roster')}
                    className="font-label-md text-xs text-primary hover:underline flex items-center gap-1 active:scale-95"
                  >
                    <span>Roster Matchup</span>
                    <span className="material-symbols-outlined text-xs" data-icon="arrow_forward">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* CARD 3: RECENT RESULT (Completed Game - shown in all or results tab) */}
          {(activeFixtureTab === 'upcoming' || activeFixtureTab === 'results') && (
            <div
              id="fixture-card-final"
              className="bg-surface-container-low rounded-2xl border border-outline-variant/20 p-4 space-y-2 opacity-95 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-[11px] text-on-surface-variant font-bold">
                    FINAL • MON NOV 11
                  </span>
                  <span className="text-xs font-label-md text-primary font-bold">VICTORY</span>
                </div>
                <span className="text-xs font-label-md text-on-surface-variant">Week 5</span>
              </div>

              {/* Scoreboard Result */}
              <div className="py-1 flex items-center justify-between">
                <div className="flex-1 flex items-center justify-between pr-4 border-r border-outline-variant/20">
                  <div>
                    <span className="font-headline-sm text-sm text-primary font-bold block">
                      Apex Raptors
                    </span>
                    <span className="font-label-md text-[11px] text-on-surface-variant">
                      MVP: Rivera (26 PTS)
                    </span>
                  </div>
                  <span className="font-stat-counter text-2xl text-primary font-black">78</span>
                </div>

                <div className="flex-1 flex items-center justify-between pl-4">
                  <span className="font-stat-counter text-2xl text-on-surface-variant font-black">64</span>
                  <div className="text-right">
                    <span className="font-headline-sm text-sm text-on-surface font-normal block">
                      Architecture
                    </span>
                    <span className="font-label-md text-[11px] text-on-surface-variant">Div A Rival</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-outline-variant/10 flex items-center justify-between">
                <span className="font-body-sm text-xs text-on-surface-variant">Official verified by Fox40</span>
                <button
                  id="view-box-score-btn"
                  onClick={() => setIsBoxScoreOpen(true)}
                  className="px-3 py-1 rounded-full bg-surface-container text-primary font-label-md text-xs border border-outline-variant/30 hover:border-primary active:scale-95 transition-all"
                >
                  View Box Score & Stats
                </button>
              </div>
            </div>
          )}

          {activeFixtureTab === 'playoffs' && (
            <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/20 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary-container/20 text-primary flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-2xl">emoji_events</span>
              </div>
              <h3 className="font-headline-sm text-base text-on-surface font-bold">
                Varsity Championship Bracket
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant max-w-xs mx-auto">
                Apex Raptors (#1 Seed) has clinced First-Round Bye. Semi-Finals commence Dec 2 at Main Fieldhouse Arena.
              </p>
              <div className="p-3 bg-surface-container-high rounded-xl border border-primary/30 inline-block font-mono text-xs text-primary font-bold">
                MAGIC NUMBER FOR #1 OVERALL: 1 WIN
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      <SwitchLeagueModal
        isOpen={isSwitchLeagueOpen}
        onClose={() => setIsSwitchLeagueOpen(false)}
        currentLeague={currentLeagueName}
        onSelectLeague={(name, tier) => {
          setCurrentLeagueName(name);
          setCurrentLeagueTier(tier);
        }}
      />

      <RosterModal
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        initialTab={rosterInitialTab}
      />

      <ScoresheetModal
        isOpen={isScoresheetOpen}
        onClose={() => setIsScoresheetOpen(false)}
        onConfirmSuccess={() => setScoresheetSigned(true)}
      />

      <BoxScoreModal isOpen={isBoxScoreOpen} onClose={() => setIsBoxScoreOpen(false)} />
    </main>
  );
};
