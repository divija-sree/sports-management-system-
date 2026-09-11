import React, { useState } from 'react';
import { PassQrModal } from '../modals/PassQrModal';

export const ProfileScreen: React.FC = () => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  return (
    <main className="w-full max-w-md mx-auto px-4 space-y-4 pt-3 pb-28">
      {/* Athlete Passport Card */}
      <section className="bg-surface-container-low rounded-3xl p-5 border border-primary/40 shadow-xl relative overflow-hidden telemetry-grid-bg">
        <div className="absolute top-0 right-0 w-36 h-36 bg-primary-container/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-container via-secondary-container to-surface-container-high p-0.5 shadow-lg border border-primary/40">
              <div className="w-full h-full rounded-2xl bg-surface-container-lowest flex items-center justify-center font-black text-2xl text-primary font-headline-md">
                #24
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
                <span className="font-label-md text-[10px] text-primary uppercase font-bold tracking-wider">
                  NCAA Tier 1 Verified
                </span>
              </div>
              <h2 className="font-headline-md text-xl text-on-surface font-bold">Alex Rivera</h2>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Senior • Mechanical Engineering
              </p>
              <p className="font-mono text-[10px] text-secondary font-bold mt-0.5">
                ATHLETE ID: #24-BB-9941
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsQrModalOpen(true)}
            className="p-2.5 rounded-2xl bg-surface-container-high border border-outline-variant/30 text-primary hover:border-primary active:scale-95 transition-all shadow"
          >
            <span className="material-symbols-outlined text-2xl">qr_code_scanner</span>
          </button>
        </div>

        {/* Varsity Clearance Badges */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-outline-variant/20 text-center">
          <div className="p-2 rounded-xl bg-surface-container border border-outline-variant/15">
            <span className="block text-[9px] text-outline uppercase font-bold">Medical Clearance</span>
            <span className="font-bold text-xs text-emerald-400 mt-0.5 block">Pass Oct '24</span>
          </div>
          <div className="p-2 rounded-xl bg-surface-container border border-outline-variant/15">
            <span className="block text-[9px] text-outline uppercase font-bold">Intramural Credits</span>
            <span className="font-mono font-bold text-xs text-primary mt-0.5 block">14 Credits</span>
          </div>
          <div className="p-2 rounded-xl bg-surface-container border border-outline-variant/15">
            <span className="block text-[9px] text-outline uppercase font-bold">Locker Lock</span>
            <span className="font-mono font-bold text-xs text-secondary mt-0.5 block">#104 Pin 8824</span>
          </div>
        </div>
      </section>

      {/* Season Telemetry & Performance */}
      <section className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-base">insights</span>
            <h3 className="font-headline-sm text-sm text-on-surface font-bold">
              Season 2024-25 Telemetry
            </h3>
          </div>
          <span className="font-label-md text-[10px] text-on-surface-variant font-mono">
            FOX40 120 FPS CALIBRATED
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-surface-container border border-outline-variant/15">
            <span className="font-stat-counter text-xl text-primary font-black block">24.4</span>
            <span className="text-[10px] font-label-md text-on-surface-variant uppercase">PPG</span>
          </div>
          <div className="p-2.5 rounded-xl bg-surface-container border border-outline-variant/15">
            <span className="font-stat-counter text-xl text-on-surface font-black block">6.2</span>
            <span className="text-[10px] font-label-md text-on-surface-variant uppercase">APG</span>
          </div>
          <div className="p-2.5 rounded-xl bg-surface-container border border-outline-variant/15">
            <span className="font-stat-counter text-xl text-on-surface font-black block">5.8</span>
            <span className="text-[10px] font-label-md text-on-surface-variant uppercase">RPG</span>
          </div>
          <div className="p-2.5 rounded-xl bg-surface-container border border-outline-variant/15">
            <span className="font-stat-counter text-xl text-secondary font-black block">58%</span>
            <span className="text-[10px] font-label-md text-on-surface-variant uppercase">FG%</span>
          </div>
        </div>
      </section>

      {/* Teams & Roles */}
      <section className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/20 space-y-3">
        <h3 className="font-headline-sm text-sm text-on-surface font-bold">Enrolled Squads & Rosters</h3>

        <div className="p-3 rounded-xl bg-surface-container border border-primary/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-container text-black font-headline-md font-bold text-xs flex items-center justify-center">
              #24
            </div>
            <div>
              <span className="font-headline-sm text-xs text-on-surface font-bold block">
                Apex Raptors (Men's Tier 1)
              </span>
              <span className="text-[10px] text-on-surface-variant">Team Captain • Point Guard</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold">
            1st Seed (6-1)
          </span>
        </div>

        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-surface-container-high text-secondary font-headline-md font-bold text-xs flex items-center justify-center">
              #11
            </div>
            <div>
              <span className="font-headline-sm text-xs text-on-surface font-bold block">
                Engineering United (5v5 Soccer)
              </span>
              <span className="text-[10px] text-on-surface-variant">Midfielder • Div B</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-bold">
            3rd Seed (4-2)
          </span>
        </div>
      </section>

      <PassQrModal isOpen={isQrModalOpen} onClose={() => setIsQrModalOpen(false)} />
    </main>
  );
};
