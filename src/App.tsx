import React, { useState } from 'react';
import { BottomNavBar } from './components/BottomNavBar';
import { BookingsScreen } from './components/screens/BookingsScreen';
import { FacilitiesScreen } from './components/screens/FacilitiesScreen';
import { LeaguesScreen } from './components/screens/LeaguesScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { TopAppBar } from './components/TopAppBar';
import { Booking, TabType } from './types';

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-default-1',
    courtId: 'apex-arena-court-1',
    courtName: 'Apex Arena — Court 1',
    facility: 'Main Fieldhouse',
    date: 'Today, Oct 23',
    dayNumber: 23,
    timeSlot: '04:00 PM - 05:00 PM',
    equipment: ['Spalding TF-1000 Game Ball'],
    status: 'confirmed',
    lockerCode: 'LOCKER #104',
    passCode: 'CA-8842-OCT24',
  },
  {
    id: 'bk-default-2',
    courtId: 'badminton-hall-1',
    courtName: 'Badminton Hall — Court B',
    facility: 'Recreation Complex',
    date: 'Wed, Oct 24',
    dayNumber: 24,
    timeSlot: '08:30 AM - 09:30 AM',
    equipment: ['Yonex Aerosensa 30 Shuttles'],
    status: 'confirmed',
    lockerCode: 'LOCKER #082',
    passCode: 'CA-3319-OCT24',
  },
];

export default function App() {
  // Can start on 'leagues' (Image 1) or 'facilities' (Image 3)
  const [currentTab, setCurrentTab] = useState<TabType>('leagues');
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  const handleAddBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Docked Top App Bar */}
      <TopAppBar
        currentTab={currentTab}
        onSearchClick={() => {
          if (currentTab !== 'facilities') {
            setCurrentTab('facilities');
          }
        }}
      />

      {/* Screen View */}
      <div className="flex-1 w-full">
        {currentTab === 'facilities' && (
          <FacilitiesScreen
            onNavigateToBookings={() => setCurrentTab('bookings')}
            onAddBooking={handleAddBooking}
          />
        )}

        {currentTab === 'leagues' && <LeaguesScreen />}

        {currentTab === 'bookings' && (
          <BookingsScreen
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            onNavigateToFacilities={() => setCurrentTab('facilities')}
          />
        )}

        {currentTab === 'profile' && <ProfileScreen />}
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        bookingsBadgeCount={bookings.filter((b) => b.status === 'confirmed').length}
      />
    </div>
  );
}
