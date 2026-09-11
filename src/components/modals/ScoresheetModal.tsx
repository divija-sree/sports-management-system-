import React, { useState } from 'react';

interface ScoresheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSuccess?: () => void;
}

export const ScoresheetModal: React.FC<ScoresheetModalProps> = ({
  isOpen,
  onClose,
  onConfirmSuccess,
}) => {
  const [refereeCode, setRefereeCode] = useState('4902');
  const [signed, setSigned] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onConfirmSuccess?.();
      onClose();
    }, 1200);
  };

  return (
    <div
      id="scoresheet-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-surface-container border border-primary/40 rounded-3xl p-5 shadow-2xl space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">fact_check</span>
            <div>
              <h3 className="font-headline-sm text-base text-on-surface font-bold">Digital Scoresheet Verification</h3>
              <p className="font-mono text-[10px] text-primary">MATCH CODE: #{refereeCode}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Info notice */}
        <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface">Apex Raptors vs. Engineering Titans</span>
            <span className="text-[10px] text-primary font-mono font-bold">COURT 2</span>
          </div>
          <p className="text-[11px] text-on-surface-variant leading-relaxed">
            Head Referee Vance (Fox40 Crew A) has requested digital handshake and captain signature for official league standings recording.
          </p>
        </div>

        {/* Input verification code */}
        <div className="space-y-1">
          <label className="text-xs font-label-md text-outline uppercase tracking-wider block">
            Referee Handshake Code
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={refereeCode}
              onChange={(e) => setRefereeCode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 font-mono text-center text-lg tracking-widest text-primary font-bold focus:outline-none focus:border-primary"
              maxLength={6}
            />
            <span className="px-2.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
              VALID
            </span>
          </div>
        </div>

        {/* Signature Box */}
        <div className="space-y-1">
          <label className="text-xs font-label-md text-outline uppercase tracking-wider block">
            Team Captain Electronic Sign-Off
          </label>
          <button
            onClick={() => setSigned(!signed)}
            className={`w-full h-16 rounded-xl border-2 border-dashed flex items-center justify-center transition-all ${
              signed
                ? 'border-primary bg-primary-container/10 text-primary'
                : 'border-outline-variant/40 hover:border-outline text-on-surface-variant'
            }`}
          >
            {signed ? (
              <span className="font-serif italic text-lg tracking-wide text-primary">
                ✍️ Alex Rivera (Captain #24)
              </span>
            ) : (
              <span className="text-xs flex items-center gap-1 font-label-md">
                <span className="material-symbols-outlined text-sm">draw</span>
                Tap to Sign Digital Scoresheet
              </span>
            )}
          </button>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSubmit}
          disabled={!signed || submitted}
          className={`w-full py-3 rounded-full font-label-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-all ${
            submitted
              ? 'bg-emerald-500 text-black'
              : signed
              ? 'bg-primary-container text-on-primary-container hud-glow-amber shadow-lg'
              : 'bg-surface-container-high text-outline cursor-not-allowed'
          }`}
        >
          <span className="material-symbols-outlined text-base">
            {submitted ? 'check_circle' : 'verified'}
          </span>
          <span>{submitted ? 'Scoresheet Confirmed & Synced!' : 'Submit Verified Scoresheet'}</span>
        </button>
      </div>
    </div>
  );
};
