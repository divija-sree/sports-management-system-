import React from 'react';

interface BoxScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BoxScoreModal: React.FC<BoxScoreModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="box-score-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface-container border border-outline-variant/40 rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-label-md text-[10px] font-bold">
                FINAL • VERIFIED FOX40
              </span>
              <span className="text-[10px] text-on-surface-variant font-label-md">WEEK 5 FIXTURE</span>
            </div>
            <h3 className="font-headline-sm text-base text-on-surface font-bold mt-1">Official Box Score & Stats</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Big Score Header */}
        <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 flex items-center justify-between">
          <div className="text-left space-y-1">
            <span className="font-headline-sm text-sm text-primary font-bold block">Apex Raptors</span>
            <span className="text-[11px] text-on-surface-variant block">1st Seed (Div A)</span>
            <span className="font-stat-counter text-3xl text-primary font-black block">78</span>
          </div>
          <div className="text-center px-2">
            <span className="text-xs font-mono font-bold text-outline">FINAL</span>
            <span className="block text-[10px] text-emerald-400 font-bold uppercase mt-1">VICTORY +14</span>
          </div>
          <div className="text-right space-y-1">
            <span className="font-headline-sm text-sm text-on-surface font-normal block">Architecture</span>
            <span className="text-[11px] text-on-surface-variant block">Div A Rival</span>
            <span className="font-stat-counter text-3xl text-on-surface-variant font-black block">64</span>
          </div>
        </div>

        {/* Quarter Breakdown */}
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs font-mono">
            <thead>
              <tr className="text-outline border-b border-outline-variant/20">
                <th className="py-1 text-left font-normal">TEAM</th>
                <th className="py-1 font-normal">Q1</th>
                <th className="py-1 font-normal">Q2</th>
                <th className="py-1 font-normal">Q3</th>
                <th className="py-1 font-normal">Q4</th>
                <th className="py-1 font-bold text-on-surface">TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr className="text-primary font-bold">
                <td className="py-1.5 text-left font-sans">Apex Raptors</td>
                <td>18</td>
                <td>22</td>
                <td>19</td>
                <td>19</td>
                <td className="text-primary text-sm font-black">78</td>
              </tr>
              <tr className="text-on-surface-variant">
                <td className="py-1.5 text-left font-sans text-on-surface">Architecture</td>
                <td>14</td>
                <td>16</td>
                <td>18</td>
                <td>16</td>
                <td className="text-on-surface text-sm font-bold">64</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Top Performers */}
        <div className="space-y-2">
          <span className="font-label-md text-xs text-primary uppercase tracking-wider font-bold">
            Match MVP & Key Performers
          </span>

          <div className="p-3 bg-surface-container-low rounded-xl border border-primary/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-container text-black font-headline-md font-bold text-xs flex items-center justify-center">
                #24
              </div>
              <div>
                <span className="font-headline-sm text-xs text-on-surface font-bold block">
                  Alex Rivera <span className="text-[10px] text-primary font-mono">(MVP)</span>
                </span>
                <span className="text-[10px] text-on-surface-variant">Apex Raptors • Point Guard</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs font-bold text-primary block">26 PTS • 8 AST • 5 REB</span>
              <span className="text-[9px] text-outline">9-14 FG (64.2%)</span>
            </div>
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface font-headline-md font-bold text-xs flex items-center justify-center">
                #55
              </div>
              <div>
                <span className="font-headline-sm text-xs text-on-surface font-bold block">David Okafor</span>
                <span className="text-[10px] text-on-surface-variant">Apex Raptors • Center</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs font-bold text-on-surface block">14 PTS • 12 REB • 3 BLK</span>
              <span className="text-[9px] text-outline">Double-Double</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-surface-container-high text-on-surface border border-outline-variant/40 font-label-md text-xs font-bold active:scale-95 transition-all"
        >
          Close Box Score
        </button>
      </div>
    </div>
  );
};
