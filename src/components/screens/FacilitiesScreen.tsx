import React, { useState } from 'react';
import { COURTS_DATA, INITIAL_EQUIPMENT, INITIAL_TIME_SLOTS, SCHEDULE_DAYS, SPORTS_LIST } from '../../data/mockData';
import { Booking, Court, EquipmentAddon, TimeSlot } from '../../types';
import { BookingSuccessModal } from '../modals/BookingSuccessModal';
import { PassQrModal } from '../modals/PassQrModal';

interface FacilitiesScreenProps {
  onNavigateToBookings: () => void;
  onAddBooking: (booking: Booking) => void;
}

export const FacilitiesScreen: React.FC<FacilitiesScreenProps> = ({
  onNavigateToBookings,
  onAddBooking,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('basketball');
  const [selectedDay, setSelectedDay] = useState(23);
  const [selectedDayName, setSelectedDayName] = useState('Today');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('04:00 PM');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(INITIAL_TIME_SLOTS);
  const [equipmentList, setEquipmentList] = useState<EquipmentAddon[]>(INITIAL_EQUIPMENT);
  const [selectedCourt, setSelectedCourt] = useState<Court>(COURTS_DATA[0]);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [recentBooking, setRecentBooking] = useState<Booking | null>(null);

  // Filter courts based on sport and search query
  const filteredCourts = COURTS_DATA.filter((c) => {
    const matchSport = selectedSport ? c.sport === selectedSport : true;
    const matchSearch =
      searchQuery.trim() === '' ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.facility.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSport && matchSearch;
  });

  const activeCourt = filteredCourts.length > 0 ? filteredCourts[0] : selectedCourt;

  const handleSelectSlot = (slot: TimeSlot) => {
    if (slot.status === 'booked' || slot.status === 'practice') return;
    setSelectedTimeSlot(slot.time);
    setTimeSlots((prev) =>
      prev.map((s) => ({
        ...s,
        status: s.time === slot.time ? 'active' : s.status === 'active' ? 'available' : s.status,
      }))
    );
  };

  const handleToggleEquipment = (id: string) => {
    setEquipmentList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleConfirmReservation = () => {
    const selectedEquipNames = equipmentList.filter((e) => e.selected).map((e) => e.name);
    const dateFormatted = `${selectedDayName}, Oct ${selectedDay}`;
    const timeFormatted = `${selectedTimeSlot} - ${calculateEndTime(selectedTimeSlot)}`;

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      courtId: activeCourt.id,
      courtName: activeCourt.name,
      facility: activeCourt.facility,
      date: dateFormatted,
      dayNumber: selectedDay,
      timeSlot: timeFormatted,
      equipment: selectedEquipNames,
      status: 'confirmed',
      lockerCode: 'LOCKER #104',
      passCode: `CA-${Math.floor(1000 + Math.random() * 9000)}-OCT24`,
    };

    onAddBooking(newBooking);
    setRecentBooking(newBooking);
    setIsSuccessModalOpen(true);
  };

  function calculateEndTime(timeStr: string): string {
    const [time, period] = timeStr.split(' ');
    const [hourStr, minuteStr] = time.split(':');
    let hour = parseInt(hourStr, 10);
    hour = hour === 12 ? 1 : hour + 1;
    return `${hour.toString().padStart(2, '0')}:${minuteStr} ${period}`;
  }

  return (
    <main className="w-full max-w-md mx-auto px-4 space-y-4 pt-3 pb-32">
      {/* STUDENT ATHLETE PASS TELEMETRY STRIP */}
      <section
        id="varsity-pass-strip"
        className="bg-surface-container-low rounded-xl p-2 border border-outline-variant/30 flex items-center justify-between hud-glow-blue"
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-secondary-container/40 border border-secondary/30 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-xl" data-icon="badge">
              badge
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
              <span className="font-label-md text-[11px] text-primary tracking-wider uppercase font-bold">
                Varsity Pass Active
              </span>
            </div>
            <p className="font-headline-sm text-sm text-on-surface font-semibold">
              Alex Rivera <span className="font-body-sm text-xs text-outline">#24-BB</span>
            </p>
          </div>
        </div>

        <button
          id="pass-qr-btn"
          onClick={() => setIsPassModalOpen(true)}
          className="bg-surface-container-high border border-outline-variant/40 hover:border-primary px-3 py-1.5 rounded-full flex items-center gap-1 active:scale-95 transition-all text-on-surface"
        >
          <span className="material-symbols-outlined text-base text-primary-container" data-icon="qr_code_scanner">
            qr_code_scanner
          </span>
          <span className="font-label-md text-[11px] text-primary font-bold">PASS QR</span>
        </button>
      </section>

      {/* VENUE SEARCH INPUT */}
      <section id="venue-search-section" className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
          <span className="material-symbols-outlined text-lg" data-icon="search">
            search
          </span>
        </div>
        <input
          id="venue-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search field, arena, or court..."
          className="w-full pl-10 pr-10 py-2.5 rounded-full bg-surface-container-lowest border border-surface-variant text-on-surface placeholder:text-outline/70 font-body-md text-sm focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all shadow-inner"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            id="venue-filter-btn"
            aria-label="Filters"
            onClick={() => setSearchQuery('')}
            className="text-outline hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-lg" data-icon="tune">
              tune
            </span>
          </button>
        </div>
      </section>

      {/* HORIZONTAL SPORT SELECTOR BAR */}
      <section id="sport-selector-section">
        <div className="flex items-center justify-between mb-1">
          <span className="font-label-md text-[11px] text-outline uppercase tracking-wider">
            Select Sport Discipline
          </span>
          <span className="font-label-md text-[11px] text-primary">
            {filteredCourts.length} Venues Open
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
          {SPORTS_LIST.map((sport) => {
            const isActive = selectedSport === sport.id;
            return (
              <button
                key={sport.id}
                id={`sport-tab-${sport.id}`}
                onClick={() => setSelectedSport(sport.id)}
                className={`shrink-0 px-4 py-2 rounded-full font-label-lg text-xs flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container shadow-md hud-glow-amber font-bold'
                    : 'bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-base" data-icon={sport.icon}>
                  {sport.icon}
                </span>
                <span>{sport.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* QUICK DATE SELECTOR HORIZONTAL STRIP */}
      <section
        id="schedule-days-section"
        className="bg-surface-container-low rounded-xl p-2 border border-outline-variant/20"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-label-md text-[11px] text-outline uppercase tracking-wider">
            Booking Schedule — October
          </span>
          <span className="font-label-md text-[11px] text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-xs" data-icon="calendar_month">
              calendar_month
            </span>{' '}
            Term Week 8
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center">
          {SCHEDULE_DAYS.map((d) => {
            const isSelected = selectedDay === d.date;
            return (
              <button
                key={d.date}
                id={`date-btn-${d.date}`}
                onClick={() => {
                  setSelectedDay(d.date);
                  setSelectedDayName(d.day);
                }}
                className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-primary-container text-on-primary-container shadow-md hud-glow-amber border border-primary font-bold'
                    : 'bg-surface-container-high border border-outline-variant/20 text-on-surface hover:border-primary-container/50'
                }`}
              >
                <span className="font-label-md text-[11px] uppercase opacity-80">{d.day}</span>
                <span className="font-headline-md text-lg font-bold mt-0.5">{d.date}</span>
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-1 ${
                    isSelected
                      ? 'bg-on-primary-container'
                      : d.dotColor
                      ? d.dotColor
                      : 'bg-primary-container/40'
                  }`}
                ></span>
              </button>
            );
          })}
        </div>
      </section>

      {/* FEATURED COURT CARD */}
      <section
        id="featured-court-card"
        className="rounded-xl overflow-hidden bg-surface-container border border-outline-variant/30 shadow-lg relative group"
      >
        {/* Media Area */}
        <div className="relative h-44 w-full overflow-hidden bg-surface-dim">
          <img
            src={activeCourt.imageUrl}
            alt={activeCourt.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/40 to-transparent"></div>

          {/* Live Status Pill Overlays */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-surface-dim/90 border border-primary/40 font-label-md text-[10px] text-primary flex items-center gap-1 backdrop-blur-sm font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
              VARSITY STANDARD
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-dim/90 border border-outline-variant/30 font-label-md text-[10px] text-on-surface-variant flex items-center gap-1 backdrop-blur-sm">
              <span className="material-symbols-outlined text-xs" data-icon="ac_unit">
                ac_unit
              </span>
              INDOOR AC
            </span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-surface-dim/90 border border-primary-container/50 px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
            <span
              className="material-symbols-outlined text-xs text-primary-container"
              data-icon="star"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-label-md text-xs text-primary font-bold">{activeCourt.rating}</span>
            <span className="font-body-sm text-[10px] text-outline">({activeCourt.reviewsCount})</span>
          </div>

          {/* Court Title Strip docked at bottom of photo */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
            <div>
              <span className="font-label-md text-[11px] text-primary uppercase tracking-wider block">
                {activeCourt.facility}
              </span>
              <h2 className="font-headline-lg-mobile text-xl text-on-surface font-bold leading-tight">
                {activeCourt.name}
              </h2>
              <p className="font-body-sm text-xs text-on-surface-variant">
                {activeCourt.wing} • {activeCourt.surface}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="font-label-md text-[10px] text-outline uppercase block">Max Cap</span>
              <span className="font-label-lg text-xs text-secondary flex items-center justify-end gap-1 font-bold">
                <span className="material-symbols-outlined text-sm" data-icon="groups">
                  groups
                </span>{' '}
                {activeCourt.maxCapacity} Players
              </span>
            </div>
          </div>
        </div>

        {/* Quick Court Telemetry Micro-Pills */}
        <div className="p-2 border-t border-outline-variant/20 grid grid-cols-3 gap-2 bg-surface-container-low text-center">
          <div className="flex items-center justify-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-sm text-primary" data-icon="wb_incandescent">
              wb_incandescent
            </span>
            <span className="font-label-md text-[11px]">{activeCourt.luxRating}</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-on-surface-variant border-x border-outline-variant/20">
            <span className="material-symbols-outlined text-sm text-secondary" data-icon="sports_basketball">
              sports_basketball
            </span>
            <span className="font-label-md text-[11px]">{activeCourt.rimType}</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-sm text-primary-container" data-icon="verified">
              verified
            </span>
            <span className="font-label-md text-[11px]">Free Locker</span>
          </div>
        </div>
      </section>

      {/* TIME SLOT GRID SELECTOR */}
      <section id="time-slots-section" className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-sm text-sm text-on-surface font-bold">Available Time Slots</h3>
            <p className="font-body-sm text-[11px] text-outline">Select 60 min block for standard reservation</p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-xs bg-primary-container"></span>
              <span className="font-label-md text-[10px] text-outline">Selected</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-xs bg-surface-container-highest opacity-40"></span>
              <span className="font-label-md text-[10px] text-outline">Booked</span>
            </div>
          </div>
        </div>

        {/* Morning Slots */}
        <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/20 space-y-1.5">
          <div className="flex items-center gap-1 text-outline">
            <span className="material-symbols-outlined text-xs text-primary" data-icon="light_mode">
              light_mode
            </span>
            <span className="font-label-md text-[10px] uppercase tracking-wider">
              Morning Telemetry (07:00 - 12:00)
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots
              .filter((s) => s.period === 'morning')
              .map((slot) => {
                const isSelected = selectedTimeSlot === slot.time;
                const isBooked = slot.status === 'booked' || slot.status === 'practice';
                return (
                  <button
                    key={slot.id}
                    id={`slot-${slot.id}`}
                    disabled={isBooked}
                    onClick={() => handleSelectSlot(slot)}
                    className={`py-2 px-1.5 rounded-lg font-label-lg text-xs flex flex-col items-center transition-all ${
                      isSelected
                        ? 'bg-primary-container text-on-primary-container border-2 border-primary hud-glow-amber font-bold shadow-md'
                        : isBooked
                        ? 'bg-surface-container-lowest/60 border border-outline-variant/10 text-outline/40 cursor-not-allowed'
                        : 'bg-surface-container-high border border-outline-variant/30 hover:border-primary-container text-on-surface'
                    }`}
                  >
                    <span>{slot.time}</span>
                    <span
                      className={`text-[9px] uppercase font-normal tracking-wide ${
                        isSelected
                          ? 'text-on-primary-container font-bold'
                          : isBooked
                          ? 'text-outline/40'
                          : 'text-primary'
                      }`}
                    >
                      {slot.label || slot.status}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Afternoon Slots */}
        <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/20 space-y-1.5">
          <div className="flex items-center gap-1 text-outline">
            <span className="material-symbols-outlined text-xs text-primary" data-icon="wb_sunny">
              wb_sunny
            </span>
            <span className="font-label-md text-[10px] uppercase tracking-wider">
              Afternoon Peak (12:00 - 17:00)
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots
              .filter((s) => s.period === 'afternoon')
              .map((slot) => {
                const isSelected = selectedTimeSlot === slot.time;
                const isBooked = slot.status === 'booked' || slot.status === 'practice';
                return (
                  <button
                    key={slot.id}
                    id={`slot-${slot.id}`}
                    disabled={isBooked}
                    onClick={() => handleSelectSlot(slot)}
                    className={`py-2 px-1.5 rounded-lg font-label-lg text-xs flex flex-col items-center transition-all ${
                      isSelected
                        ? 'bg-primary-container text-on-primary-container border-2 border-primary hud-glow-amber font-bold shadow-md'
                        : isBooked
                        ? 'bg-surface-container-lowest/60 border border-outline-variant/10 text-outline/40 cursor-not-allowed'
                        : 'bg-surface-container-high border border-outline-variant/30 hover:border-primary-container text-on-surface'
                    }`}
                  >
                    <span>{slot.time}</span>
                    <span
                      className={`text-[9px] uppercase tracking-wide flex items-center gap-0.5 ${
                        isSelected
                          ? 'text-on-primary-container font-bold'
                          : isBooked
                          ? 'text-outline/40'
                          : 'text-primary font-normal'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <span className="material-symbols-outlined text-[10px]">check_circle</span> Active
                        </>
                      ) : (
                        slot.label || slot.status
                      )}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Evening Slots */}
        <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/20 space-y-1.5">
          <div className="flex items-center gap-1 text-outline">
            <span className="material-symbols-outlined text-xs text-secondary" data-icon="dark_mode">
              dark_mode
            </span>
            <span className="font-label-md text-[10px] uppercase tracking-wider">
              Evening Sessions (17:00 - 22:00)
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots
              .filter((s) => s.period === 'evening')
              .map((slot) => {
                const isSelected = selectedTimeSlot === slot.time;
                const isBooked = slot.status === 'booked' || slot.status === 'practice';
                return (
                  <button
                    key={slot.id}
                    id={`slot-${slot.id}`}
                    disabled={isBooked}
                    onClick={() => handleSelectSlot(slot)}
                    className={`py-2 px-1.5 rounded-lg font-label-lg text-xs flex flex-col items-center transition-all ${
                      isSelected
                        ? 'bg-primary-container text-on-primary-container border-2 border-primary hud-glow-amber font-bold shadow-md'
                        : isBooked
                        ? 'bg-surface-container-lowest/60 border border-outline-variant/10 text-outline/40 cursor-not-allowed'
                        : 'bg-surface-container-high border border-outline-variant/30 hover:border-primary-container text-on-surface'
                    }`}
                  >
                    <span>{slot.time}</span>
                    <span
                      className={`text-[9px] uppercase font-normal tracking-wide ${
                        isSelected
                          ? 'text-on-primary-container font-bold'
                          : isBooked
                          ? 'text-outline/40'
                          : 'text-primary'
                      }`}
                    >
                      {slot.label || slot.status}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>
      </section>

      {/* EQUIPMENT ADD-ONS CHECKLIST */}
      <section id="equipment-addons-section" className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-sm text-on-surface font-bold">Equipment Add-Ons</h3>
          <span className="font-label-md text-[10px] text-primary">Issued at Equipment Desk</span>
        </div>

        <div className="space-y-2">
          {equipmentList.map((item) => (
            <label
              key={item.id}
              id={`equipment-label-${item.id}`}
              onClick={() => handleToggleEquipment(item.id)}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                item.selected
                  ? 'bg-surface-container-low border-primary-container/60 shadow-sm'
                  : 'bg-surface-container-low border-outline-variant/20 hover:border-outline-variant/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                    item.selected
                      ? 'bg-primary-container text-on-primary-container'
                      : 'bg-surface-container-high border border-outline'
                  }`}
                >
                  {item.selected && (
                    <span className="material-symbols-outlined text-sm font-bold" data-icon="check">
                      check
                    </span>
                  )}
                </div>
                <div>
                  <span className="font-label-lg text-xs text-on-surface block font-medium">
                    {item.name}
                  </span>
                  <span
                    className={`font-body-sm text-[11px] ${
                      item.selected ? 'text-primary' : 'text-outline'
                    }`}
                  >
                    {item.note}
                  </span>
                </div>
              </div>

              <span
                className={`font-label-md text-[10px] px-2 py-0.5 rounded border ${
                  item.selected
                    ? 'bg-surface-container-high text-primary border-outline-variant/20 font-bold'
                    : 'bg-surface-container-high text-on-surface-variant border-outline-variant/20'
                }`}
              >
                {item.tag}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* RULES & POLICY ACCORDION / SUMMARY CHIP */}
      <section
        id="facility-regulations-chip"
        className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20 flex items-start gap-2"
      >
        <span className="material-symbols-outlined text-secondary text-lg mt-0.5 shrink-0" data-icon="policy">
          policy
        </span>
        <div className="space-y-0.5">
          <span className="font-label-md text-[11px] text-secondary uppercase tracking-wider font-bold">
            Facility Guidelines & Regulations
          </span>
          <p className="font-body-sm text-[11px] text-on-surface-variant leading-relaxed">
            Free for verified students & intramural squads. Maximum 2h per session. Non-marking basketball
            footwear strictly enforced on hardwood surfaces. Cancellations require 30 min advance notice.
          </p>
        </div>
      </section>

      {/* STICKY RESERVATION CONFIRMATION CTA BAR */}
      <div
        id="sticky-confirm-bar"
        className="fixed bottom-[56px] left-0 right-0 z-40 bg-surface-dim/95 backdrop-blur-md border-t border-outline-variant/20 shadow-2xl px-4 py-2.5"
      >
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-primary-container"></span>
              <span className="font-label-md text-[11px] text-primary truncate uppercase font-bold">
                {activeCourt.name}
              </span>
            </div>
            <p className="font-headline-sm text-sm text-on-surface font-semibold truncate">
              {selectedDayName} • {selectedTimeSlot} - {calculateEndTime(selectedTimeSlot)}
            </p>
            <span className="font-body-sm text-[10px] text-outline flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-secondary" data-icon="check_circle">
                check_circle
              </span>{' '}
              Student ID: Verified ($0 Fee)
            </span>
          </div>

          <button
            id="confirm-reservation-btn"
            onClick={handleConfirmReservation}
            className="shrink-0 px-5 py-2.5 rounded-full bg-primary-container text-on-primary-container font-headline-sm text-xs font-bold shadow-lg hover:scale-102 active:scale-95 transition-all hud-glow-amber flex items-center gap-1.5"
          >
            <span>Confirm</span>
            <span className="material-symbols-outlined text-sm font-bold" data-icon="arrow_forward">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <PassQrModal isOpen={isPassModalOpen} onClose={() => setIsPassModalOpen(false)} />
      <BookingSuccessModal
        isOpen={isSuccessModalOpen}
        booking={recentBooking}
        onClose={() => setIsSuccessModalOpen(false)}
        onViewBookings={() => {
          setIsSuccessModalOpen(false);
          onNavigateToBookings();
        }}
      />
    </main>
  );
};
