import React from 'react';
import { TabType } from '../types';

interface BottomNavBarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  bookingsBadgeCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
  bookingsBadgeCount = 1,
}) => {
  return (
    <nav
      id="bottom-navigation-bar"
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface-container-low shadow-lg border-t border-outline-variant/20 backdrop-blur-lg"
    >
      {/* Tab 1: Facilities */}
      <button
        id="nav-tab-facilities"
        onClick={() => onSelectTab('facilities')}
        className={`flex flex-col items-center justify-center gap-1 transition-all duration-150 active:scale-95 ${
          currentTab === 'facilities'
            ? 'text-primary-container font-bold'
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <span
            className="material-symbols-outlined text-2xl"
            data-icon="stadium"
            style={{ fontVariationSettings: currentTab === 'facilities' ? "'FILL' 1" : "'FILL' 0" }}
          >
            stadium
          </span>
          {currentTab === 'facilities' && (
            <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_#f59e0b]"></span>
          )}
        </div>
        <span className="font-label-md text-[11px] tracking-wider uppercase">Facilities</span>
      </button>

      {/* Tab 2: Bookings */}
      <button
        id="nav-tab-bookings"
        onClick={() => onSelectTab('bookings')}
        className={`flex flex-col items-center justify-center gap-1 transition-all duration-150 active:scale-95 ${
          currentTab === 'bookings'
            ? 'text-primary-container font-bold'
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <span
            className="material-symbols-outlined text-2xl"
            data-icon="event_available"
            style={{ fontVariationSettings: currentTab === 'bookings' ? "'FILL' 1" : "'FILL' 0" }}
          >
            event_available
          </span>
          {bookingsBadgeCount > 0 && currentTab !== 'bookings' && (
            <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-primary-container"></span>
          )}
          {currentTab === 'bookings' && (
            <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_#f59e0b]"></span>
          )}
        </div>
        <span className="font-label-md text-[11px] tracking-wider uppercase">Bookings</span>
      </button>

      {/* Tab 3: Leagues */}
      <button
        id="nav-tab-leagues"
        onClick={() => onSelectTab('leagues')}
        className={`flex flex-col items-center justify-center gap-1 transition-all duration-150 active:scale-95 ${
          currentTab === 'leagues'
            ? 'text-primary-container font-bold'
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <span
            className="material-symbols-outlined text-2xl"
            data-icon="military_tech"
            style={{ fontVariationSettings: currentTab === 'leagues' ? "'FILL' 1" : "'FILL' 0" }}
          >
            military_tech
          </span>
          {currentTab === 'leagues' && (
            <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_#f59e0b]"></span>
          )}
        </div>
        <span className="font-label-md text-[11px] tracking-wider uppercase">Leagues</span>
      </button>

      {/* Tab 4: Profile */}
      <button
        id="nav-tab-profile"
        onClick={() => onSelectTab('profile')}
        className={`flex flex-col items-center justify-center gap-1 transition-all duration-150 active:scale-95 ${
          currentTab === 'profile'
            ? 'text-primary-container font-bold'
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <span
            className="material-symbols-outlined text-2xl"
            data-icon="person"
            style={{ fontVariationSettings: currentTab === 'profile' ? "'FILL' 1" : "'FILL' 0" }}
          >
            person
          </span>
          {currentTab === 'profile' && (
            <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_#f59e0b]"></span>
          )}
        </div>
        <span className="font-label-md text-[11px] tracking-wider uppercase">Profile</span>
      </button>
    </nav>
  );
};
