import React, { useState } from 'react';
import { TabType } from '../types';

interface TopAppBarProps {
  currentTab: TabType;
  onSearchClick?: () => void;
  unreadCount?: number;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentTab,
  onSearchClick,
  unreadCount = 3,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Digital Scoresheet Ready',
      desc: 'Action code 4902 active for tonight’s matchup vs Titans.',
      time: '12m ago',
      unread: true,
      tag: 'LEAGUE',
    },
    {
      id: 2,
      title: 'Court 1 Reservation Cleared',
      desc: 'Apex Arena Court 1 confirmed for 4:00 PM today.',
      time: '1h ago',
      unread: true,
      tag: 'BOOKING',
    },
    {
      id: 3,
      title: 'Telemetry Calibration 120 FPS',
      desc: 'Court 2 Fox40 camera array calibrated for tip-off.',
      time: '3h ago',
      unread: false,
      tag: 'SYSTEM',
    },
  ]);

  const unreadTotal = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <>
      <header
        id="top-app-bar"
        className="sticky top-0 z-40 bg-surface-dim/95 backdrop-blur-md border-b border-outline-variant/20 shadow-md w-full"
      >
        <div className="flex justify-between items-center w-full max-w-lg mx-auto px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center p-1 rounded-full bg-surface-container text-primary">
              <span className="material-symbols-outlined text-2xl" data-icon="sports_score">
                sports_score
              </span>
            </div>
            <div>
              <span className="text-lg font-headline-sm text-primary tracking-wider uppercase font-bold">
                Campus Athletics
              </span>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                <span className="text-[11px] font-label-md text-on-surface-variant uppercase tracking-wider">
                  {currentTab === 'leagues'
                    ? 'INTRAMURAL TELEMETRY'
                    : currentTab === 'facilities'
                    ? 'FIELDHOUSE & ARENAS'
                    : currentTab === 'bookings'
                    ? 'VERIFIED RESERVATIONS'
                    : 'ATHLETE PASSPORT'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {onSearchClick && (
              <button
                id="header-search-btn"
                onClick={onSearchClick}
                aria-label="Search Leagues"
                className="p-2 text-on-surface-variant hover:text-primary transition-colors duration-150 active:scale-95 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-2xl" data-icon="search">
                  search
                </span>
              </button>
            )}

            <button
              id="header-notifications-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              className="relative p-2 text-on-surface-variant hover:text-primary transition-colors duration-150 active:scale-95 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-2xl" data-icon="notifications">
                notifications
              </span>
              {unreadTotal > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_#f59e0b]"></span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Notifications Drawer / Flyout */}
      {showNotifications && (
        <div
          id="notifications-overlay"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-start pt-14 px-4"
          onClick={() => setShowNotifications(false)}
        >
          <div
            id="notifications-panel"
            className="w-full max-w-md bg-surface-container rounded-2xl border border-outline-variant/40 shadow-2xl p-4 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">notifications_active</span>
                <h3 className="font-headline-sm text-sm text-on-surface font-bold">Telemetry Alerts</h3>
                {unreadTotal > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold">
                    {unreadTotal} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadTotal > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] font-label-md text-primary hover:underline"
                  >
                    Mark read
                  </button>
                )}
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-on-surface-variant hover:text-on-surface p-1 rounded-full"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto no-scrollbar">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-2.5 rounded-xl border transition-all ${
                    n.unread
                      ? 'bg-surface-container-high border-primary/30'
                      : 'bg-surface-container-low border-outline-variant/15 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-primary font-mono text-[9px] font-bold">
                      {n.tag}
                    </span>
                    <span className="text-[10px] font-label-md text-on-surface-variant">{n.time}</span>
                  </div>
                  <h4 className="font-headline-sm text-xs text-on-surface font-bold mt-1">{n.title}</h4>
                  <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">{n.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
