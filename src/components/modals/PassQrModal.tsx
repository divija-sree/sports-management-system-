import React, { useState } from 'react';

interface PassQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PassQrModal: React.FC<PassQrModalProps> = ({ isOpen, onClose }) => {
  const [nfcBeaming, setNfcBeaming] = useState(false);
  const [nfcSuccess, setNfcSuccess] = useState(false);

  if (!isOpen) return null;

  const triggerNfcSimulation = () => {
    setNfcBeaming(true);
    setNfcSuccess(false);
    setTimeout(() => {
      setNfcBeaming(false);
      setNfcSuccess(true);
      setTimeout(() => setNfcSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div
      id="pass-qr-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-surface-container border border-primary/40 rounded-3xl p-6 shadow-2xl space-y-4 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">qr_code_scanner</span>
            <div>
              <h3 className="font-headline-sm text-base text-on-surface font-bold">NCAA Varsity Pass</h3>
              <p className="font-label-md text-[10px] text-primary tracking-wider uppercase">Active Telemetry Auth</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Athlete ID Badge */}
        <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/30 text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
            <span className="font-label-md text-xs text-primary font-bold uppercase tracking-wider">
              Student-Athlete Clearance
            </span>
          </div>

          <div>
            <h4 className="font-headline-lg-mobile text-2xl text-on-surface font-black">Alex Rivera</h4>
            <p className="font-body-sm text-xs text-on-surface-variant">Men’s Varsity Basketball • Apex Raptors #24</p>
            <p className="font-mono text-[11px] text-secondary font-bold mt-0.5">STUDENT ID: #24-BB-9941</p>
          </div>

          {/* QR Code graphic container */}
          <div className="p-4 bg-white rounded-2xl inline-block shadow-lg mx-auto relative group">
            {/* SVG stylized QR code */}
            <svg
              className="w-44 h-44"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Corner position locators */}
              <rect x="5" y="5" width="26" height="26" rx="4" fill="#051424" />
              <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
              <rect x="13" y="13" width="10" height="10" rx="1" fill="#f59e0b" />

              <rect x="69" y="5" width="26" height="26" rx="4" fill="#051424" />
              <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
              <rect x="77" y="13" width="10" height="10" rx="1" fill="#f59e0b" />

              <rect x="5" y="69" width="26" height="26" rx="4" fill="#051424" />
              <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
              <rect x="13" y="77" width="10" height="10" rx="1" fill="#f59e0b" />

              {/* Data pattern squares */}
              <rect x="36" y="8" width="6" height="6" fill="#051424" />
              <rect x="46" y="8" width="6" height="6" fill="#051424" />
              <rect x="56" y="8" width="6" height="6" fill="#051424" />
              <rect x="36" y="18" width="6" height="6" fill="#051424" />
              <rect x="46" y="18" width="6" height="6" fill="#f59e0b" />
              <rect x="56" y="18" width="6" height="6" fill="#051424" />
              <rect x="8" y="36" width="6" height="6" fill="#051424" />
              <rect x="18" y="36" width="6" height="6" fill="#051424" />
              <rect x="28" y="36" width="6" height="6" fill="#051424" />
              <rect x="38" y="36" width="6" height="6" fill="#051424" />
              <rect x="48" y="36" width="6" height="6" fill="#051424" />
              <rect x="58" y="36" width="6" height="6" fill="#f59e0b" />
              <rect x="68" y="36" width="6" height="6" fill="#051424" />
              <rect x="78" y="36" width="6" height="6" fill="#051424" />
              <rect x="88" y="36" width="6" height="6" fill="#051424" />

              <rect x="8" y="46" width="6" height="6" fill="#051424" />
              <rect x="28" y="46" width="6" height="6" fill="#f59e0b" />
              <rect x="38" y="46" width="6" height="6" fill="#051424" />
              <rect x="48" y="46" width="6" height="6" fill="#051424" />
              <rect x="68" y="46" width="6" height="6" fill="#051424" />
              <rect x="88" y="46" width="6" height="6" fill="#051424" />

              <rect x="8" y="56" width="6" height="6" fill="#051424" />
              <rect x="18" y="56" width="6" height="6" fill="#051424" />
              <rect x="38" y="56" width="6" height="6" fill="#051424" />
              <rect x="48" y="56" width="6" height="6" fill="#f59e0b" />
              <rect x="78" y="56" width="6" height="6" fill="#051424" />

              <rect x="36" y="68" width="6" height="6" fill="#051424" />
              <rect x="46" y="68" width="6" height="6" fill="#051424" />
              <rect x="56" y="68" width="6" height="6" fill="#051424" />
              <rect x="66" y="68" width="6" height="6" fill="#051424" />
              <rect x="76" y="68" width="6" height="6" fill="#051424" />
              <rect x="86" y="68" width="6" height="6" fill="#051424" />

              <rect x="36" y="78" width="6" height="6" fill="#f59e0b" />
              <rect x="46" y="78" width="6" height="6" fill="#051424" />
              <rect x="56" y="78" width="6" height="6" fill="#051424" />
              <rect x="66" y="78" width="6" height="6" fill="#051424" />
              <rect x="86" y="78" width="6" height="6" fill="#051424" />

              <rect x="36" y="88" width="6" height="6" fill="#051424" />
              <rect x="56" y="88" width="6" height="6" fill="#051424" />
              <rect x="66" y="88" width="6" height="6" fill="#051424" />
              <rect x="76" y="88" width="6" height="6" fill="#f59e0b" />
            </svg>

            {/* Scan animation line */}
            <div className="absolute inset-x-4 top-4 h-0.5 bg-primary-container shadow-[0_0_8px_#f59e0b] animate-bounce pointer-events-none opacity-80"></div>
          </div>

          {/* Barcode representation */}
          <div className="space-y-1">
            <div className="flex justify-center items-center gap-0.5 h-7 px-4">
              {[2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 2, 3, 1, 4, 1, 2, 1, 3].map((w, i) => (
                <div
                  key={i}
                  style={{ width: `${w * 1.5}px` }}
                  className="h-full bg-on-surface-variant/80 rounded-xs"
                ></div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-on-surface-variant tracking-widest">
              CA-ATH-9941-8842-OCT24
            </p>
          </div>
        </div>

        {/* Status Pills */}
        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-surface-container-high border border-outline-variant/20">
            <span className="block text-[10px] text-on-surface-variant uppercase">Medical Clearance</span>
            <span className="font-bold text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Verified
            </span>
          </div>
          <div className="p-2 rounded-xl bg-surface-container-high border border-outline-variant/20">
            <span className="block text-[10px] text-on-surface-variant uppercase">NCAA Eligibility</span>
            <span className="font-bold text-primary flex items-center justify-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Div A Cleared
            </span>
          </div>
        </div>

        {/* NFC Tap Button */}
        <button
          onClick={triggerNfcSimulation}
          disabled={nfcBeaming}
          className={`w-full py-3 px-4 rounded-full font-label-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-all ${
            nfcSuccess
              ? 'bg-emerald-500 text-black'
              : 'bg-primary-container text-on-primary-container shadow-md hud-glow-amber'
          }`}
        >
          <span className="material-symbols-outlined text-lg">
            {nfcSuccess ? 'check_circle' : nfcBeaming ? 'sensors' : 'contactless'}
          </span>
          <span>
            {nfcSuccess
              ? 'Turnstile Gate Cleared!'
              : nfcBeaming
              ? 'Beaming NFC Waveform...'
              : 'Hold Near Turnstile / NFC Reader'}
          </span>
        </button>
      </div>
    </div>
  );
};
