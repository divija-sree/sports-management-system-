import React from 'react';
import { Booking } from '../../types';

interface BookingSuccessModalProps {
  isOpen: boolean;
  booking: Booking | null;
  onClose: () => void;
  onViewBookings: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  isOpen,
  booking,
  onClose,
  onViewBookings,
}) => {
  if (!isOpen || !booking) return null;

  return (
    <div
      id="booking-confirmed-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-surface-container border border-primary/40 rounded-3xl p-6 shadow-2xl space-y-4 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Checkmark icon */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-primary-container/20 border-2 border-primary flex items-center justify-center text-primary mx-auto shadow-lg hud-glow-amber">
            <span className="material-symbols-outlined text-3xl font-bold">check_circle</span>
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-primary font-bold uppercase">
              RESERVATION TICKET CONFIRMED
            </span>
            <h3 className="font-headline-lg-mobile text-xl text-on-surface font-black mt-0.5">
              Court Cleared & Reserved!
            </h3>
          </div>
        </div>

        {/* Ticket Box */}
        <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/30 space-y-2.5 relative">
          <div className="flex justify-between items-start border-b border-outline-variant/20 pb-2">
            <div>
              <span className="text-[10px] text-primary uppercase font-bold tracking-wider block">
                {booking.facility}
              </span>
              <span className="font-headline-sm text-sm text-on-surface font-bold block">
                {booking.courtName}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
              FREE PASS ($0)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-outline block">DATE & TIME</span>
              <span className="font-bold text-on-surface">{booking.date}</span>
              <span className="text-[11px] text-primary block">{booking.timeSlot}</span>
            </div>
            <div>
              <span className="text-[10px] text-outline block">DIGITAL LOCKER</span>
              <span className="font-mono text-xs font-bold text-secondary">
                {booking.lockerCode || 'LOCKER #104'}
              </span>
              <span className="text-[10px] text-on-surface-variant block">Pin: 8824</span>
            </div>
          </div>

          {booking.equipment.length > 0 && (
            <div className="pt-2 border-t border-outline-variant/15">
              <span className="text-[10px] text-outline uppercase block">Equipment Desk Dispatch:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {booking.equipment.map((eq, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-surface-container-high text-[10px] text-primary font-medium"
                  >
                    ✓ {eq}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Barcode code */}
          <div className="pt-2 text-center border-t border-outline-variant/15">
            <span className="font-mono text-[10px] text-on-surface-variant tracking-wider">
              PASS REF: {booking.passCode}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={onViewBookings}
            className="w-full py-3 rounded-full bg-primary-container text-on-primary-container font-label-lg text-sm font-bold active:scale-95 transition-all shadow-md hud-glow-amber flex items-center justify-center gap-1.5"
          >
            <span>View in My Bookings</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-surface-container-high text-on-surface border border-outline-variant/30 font-label-md text-xs font-bold active:scale-95 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
