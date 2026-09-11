import React, { useState } from 'react';
import { Booking } from '../../types';
import { PassQrModal } from '../modals/PassQrModal';

interface BookingsScreenProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onNavigateToFacilities: () => void;
}

export const BookingsScreen: React.FC<BookingsScreenProps> = ({
  bookings,
  onCancelBooking,
  onNavigateToFacilities,
}) => {
  const [selectedPass, setSelectedPass] = useState<Booking | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'active') return b.status === 'confirmed' || b.status === 'active';
    if (filter === 'completed') return b.status === 'completed';
    return true;
  });

  return (
    <main className="w-full max-w-md mx-auto px-4 space-y-4 pt-3 pb-28">
      {/* Header telemetry */}
      <section className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/30 flex items-center justify-between hud-glow-blue">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary border border-primary/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">event_available</span>
          </div>
          <div>
            <h2 className="font-headline-sm text-base text-on-surface font-bold">My Verified Bookings</h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              {bookings.filter((b) => b.status === 'confirmed').length} Active Court Slots
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateToFacilities}
          className="px-3 py-1.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-xs font-bold active:scale-95 transition-all shadow"
        >
          + Book Court
        </button>
      </section>

      {/* Filter Tabs */}
      <div className="flex p-1 bg-surface-container rounded-full border border-outline-variant/20">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 text-center rounded-full font-label-md text-xs font-bold transition-all ${
            filter === 'all'
              ? 'bg-primary-container text-on-primary-container shadow'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          All ({bookings.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`flex-1 py-1.5 text-center rounded-full font-label-md text-xs font-bold transition-all ${
            filter === 'active'
              ? 'bg-primary-container text-on-primary-container shadow'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`flex-1 py-1.5 text-center rounded-full font-label-md text-xs font-bold transition-all ${
            filter === 'completed'
              ? 'bg-primary-container text-on-primary-container shadow'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Past
        </button>
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {filteredBookings.length === 0 ? (
          <div className="p-8 text-center bg-surface-container-low rounded-2xl border border-outline-variant/20 space-y-3">
            <span className="material-symbols-outlined text-4xl text-outline">event_busy</span>
            <p className="text-sm text-on-surface-variant">No reservations found in this category.</p>
            <button
              onClick={onNavigateToFacilities}
              className="px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-label-md text-xs font-bold"
            >
              Browse Available Courts
            </button>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-3 shadow-md relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-label-md text-primary uppercase tracking-wider font-bold">
                    {b.facility}
                  </span>
                  <h3 className="font-headline-sm text-base text-on-surface font-bold mt-0.5">
                    {b.courtName}
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                    <span className="material-symbols-outlined text-xs text-primary">schedule</span>
                    <span>
                      {b.date} • {b.timeSlot}
                    </span>
                  </p>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-label-md font-bold uppercase border ${
                    b.status === 'confirmed'
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                      : 'bg-surface-container-high border-outline-variant/30 text-outline'
                  }`}
                >
                  {b.status}
                </span>
              </div>

              {/* Locker & Access code bar */}
              <div className="p-2.5 rounded-xl bg-surface-container border border-outline-variant/20 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-outline block">DIGITAL LOCKER</span>
                  <span className="font-mono text-xs font-bold text-secondary">{b.lockerCode || 'LOCKER #104'}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-outline block">PASS REF</span>
                  <span className="font-mono text-xs font-bold text-primary">{b.passCode}</span>
                </div>
              </div>

              {/* Equipment list */}
              {b.equipment && b.equipment.length > 0 && (
                <div className="text-xs">
                  <span className="text-[10px] text-outline uppercase block">Equipment Add-ons:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {b.equipment.map((eq, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-surface-container-high text-[10px] text-on-surface font-medium"
                      >
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 border-t border-outline-variant/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setSelectedPass(b);
                    setIsQrModalOpen(true);
                  }}
                  className="flex-1 py-2 px-3 rounded-full bg-surface-container-high hover:bg-surface-container border border-outline-variant/30 text-primary font-label-md text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">qr_code</span>
                  <span>View Pass QR</span>
                </button>

                {b.status === 'confirmed' && (
                  <button
                    onClick={() => onCancelBooking(b.id)}
                    className="py-2 px-3 rounded-full bg-surface-container hover:bg-red-500/15 text-outline hover:text-red-400 border border-outline-variant/20 font-label-md text-xs active:scale-95 transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <PassQrModal isOpen={isQrModalOpen} onClose={() => setIsQrModalOpen(false)} />
    </main>
  );
};
