export type TabType = 'facilities' | 'bookings' | 'leagues' | 'profile';

export interface Sport {
  id: string;
  name: string;
  icon: string;
  venuesCount: number;
}

export interface Court {
  id: string;
  name: string;
  facility: string;
  wing: string;
  surface: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  maxCapacity: number;
  luxRating: string;
  rimType: string;
  amenities: string[];
  sport: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  period: 'morning' | 'afternoon' | 'evening';
  status: 'available' | 'booked' | 'active' | 'practice';
  label?: string;
}

export interface EquipmentAddon {
  id: string;
  name: string;
  note: string;
  tag: string;
  selected: boolean;
  required?: boolean;
}

export interface Booking {
  id: string;
  courtId: string;
  courtName: string;
  facility: string;
  date: string;
  dayNumber: number;
  timeSlot: string;
  equipment: string[];
  status: 'confirmed' | 'active' | 'completed' | 'cancelled';
  lockerCode?: string;
  passCode: string;
}

export interface StandingTeam {
  rank: number;
  name: string;
  wins: number;
  losses: number;
  diff: number;
  form: ('W' | 'L')[];
  isMyTeam?: boolean;
}

export interface Fixture {
  id: string;
  status: 'tonight' | 'upcoming' | 'final';
  time: string;
  dateLabel: string;
  titleBadge?: string;
  homeTeam: {
    name: string;
    seed: string;
    score?: number;
    mvp?: string;
  };
  awayTeam: {
    name: string;
    seed: string;
    score?: number;
    note?: string;
  };
  court: string;
  officials: string;
  telemetryStatus?: string;
  isCheckedIn?: boolean;
}

export interface TeamMember {
  number: number;
  name: string;
  position: string;
  year: string;
  status: 'Confirmed' | 'Pending' | 'Sidelined';
  ppg: number;
  rpg: number;
}
