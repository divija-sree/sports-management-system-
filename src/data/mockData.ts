import { Court, EquipmentAddon, Fixture, StandingTeam, TeamMember, TimeSlot } from '../types';

export const HOTLINK_COURT_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBR-LX_BsP89RzZ3aPI2OnaVTrYAjgM0Wi5A8-lSRq8kIyQ_gSrq7qpebikKqsHX1uyMeg8lq1TL43Tjq1sfYW5qrHqjlG-f_xVPU-fUtTGvmgMNNPL116jj5O2HSgegSqrq1B9Y7Aww_MlHFm25JRmgKb6F5XcdLIBNbqgRY0G21s5evauGvk1gYYmDMek5hnrdZ8qkYRMQJB5jEH_ZdLXfPHQl_fODl9ZSZqWFpGExcjxFhzr8b73kg';

export const COURTS_DATA: Court[] = [
  {
    id: 'apex-arena-court-1',
    name: 'Apex Arena — Court 1',
    facility: 'Main Fieldhouse',
    wing: 'North Wing',
    surface: 'Pro-Grade Maple Hardwood',
    imageUrl: HOTLINK_COURT_IMAGE,
    rating: 4.9,
    reviewsCount: 128,
    maxCapacity: 10,
    luxRating: '1500 Lux LED',
    rimType: 'FIBA Rims',
    amenities: ['Indoor AC', 'Free Locker', 'Fox40 Scoring Box', '120 FPS Telemetry'],
    sport: 'basketball',
  },
  {
    id: 'apex-arena-court-2',
    name: 'Apex Arena — Court 2',
    facility: 'Main Fieldhouse',
    wing: 'East Wing',
    surface: 'High-Impact Synthetic Hardwood',
    imageUrl: HOTLINK_COURT_IMAGE,
    rating: 4.8,
    reviewsCount: 94,
    maxCapacity: 10,
    luxRating: '1200 Lux LED',
    rimType: 'FIBA Breakaway',
    amenities: ['Indoor AC', 'Shot Clock', 'Fox40 Scoring Box'],
    sport: 'basketball',
  },
  {
    id: 'badminton-hall-1',
    name: 'Badminton Hall — Court B',
    facility: 'Recreation Complex',
    wing: 'South Pavilion',
    surface: 'BWF Certified Taraflex Mat',
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    reviewsCount: 62,
    maxCapacity: 4,
    luxRating: '1000 Lux Diffused',
    rimType: 'Yonex Pro Posts',
    amenities: ['Indoor AC', 'Anti-Glare Shading'],
    sport: 'badminton',
  },
  {
    id: 'tennis-center-1',
    name: 'Varsity Tennis Center — Court 3',
    facility: 'Outdoor Athletic Quad',
    wing: 'West Terrace',
    surface: 'US Open Decoturf Cushion',
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 110,
    maxCapacity: 4,
    luxRating: '2000 Lux Stadium',
    rimType: 'Tournament Net',
    amenities: ['Ball Machine', 'Hydro Station'],
    sport: 'tennis',
  },
];

export const INITIAL_TIME_SLOTS: TimeSlot[] = [
  // Morning
  { id: 'm1', time: '07:00 AM', period: 'morning', status: 'booked', label: 'Reserved' },
  { id: 'm2', time: '08:30 AM', period: 'morning', status: 'available', label: 'Available' },
  { id: 'm3', time: '10:00 AM', period: 'morning', status: 'practice', label: 'Varsity Practice' },
  // Afternoon Peak
  { id: 'a1', time: '01:00 PM', period: 'afternoon', status: 'available', label: 'Available' },
  { id: 'a2', time: '02:30 PM', period: 'afternoon', status: 'available', label: 'Available' },
  { id: 'a3', time: '04:00 PM', period: 'afternoon', status: 'active', label: 'Active' },
  // Evening Sessions
  { id: 'e1', time: '05:30 PM', period: 'evening', status: 'available', label: 'Available' },
  { id: 'e2', time: '07:00 PM', period: 'evening', status: 'booked', label: 'Intramural Match' },
  { id: 'e3', time: '08:30 PM', period: 'evening', status: 'available', label: 'Available' },
];

export const INITIAL_EQUIPMENT: EquipmentAddon[] = [
  {
    id: 'ball',
    name: 'Spalding TF-1000 Game Ball',
    note: 'Free with verified Student ID',
    tag: 'QTY 1',
    selected: true,
  },
  {
    id: 'remote',
    name: 'Scoreboard Wireless Remote',
    note: '+1 Intramural Credit / Match',
    tag: 'OPTIONAL',
    selected: false,
  },
  {
    id: 'whistle',
    name: 'Fox 40 Referee Whistle & Lanyard',
    note: 'Sanitized & sealed set',
    tag: 'OPTIONAL',
    selected: false,
  },
];

export const STANDINGS_DATA: StandingTeam[] = [
  {
    rank: 1,
    name: 'Apex Raptors',
    wins: 6,
    losses: 1,
    diff: 48,
    form: ['W', 'W', 'W'],
    isMyTeam: true,
  },
  {
    rank: 2,
    name: 'Engineering Titans',
    wins: 5,
    losses: 2,
    diff: 31,
    form: ['W', 'L', 'W'],
  },
  {
    rank: 3,
    name: 'Med School Dribblers',
    wins: 4,
    losses: 3,
    diff: 12,
    form: ['L', 'W', 'W'],
  },
  {
    rank: 4,
    name: 'Business Bulls',
    wins: 3,
    losses: 4,
    diff: -8,
    form: ['L', 'L', 'W'],
  },
  {
    rank: 5,
    name: 'Law Faculty Lions',
    wins: 2,
    losses: 5,
    diff: -24,
    form: ['L', 'W', 'L'],
  },
  {
    rank: 6,
    name: 'Architecture Gunners',
    wins: 1,
    losses: 6,
    diff: -59,
    form: ['L', 'L', 'L'],
  },
];

export const FIXTURES_DATA: Fixture[] = [
  {
    id: 'fix-1',
    status: 'tonight',
    time: '19:30',
    dateLabel: 'TONIGHT • 19:30',
    titleBadge: 'MATCH OF THE WEEK',
    homeTeam: {
      name: 'Apex Raptors',
      seed: 'Home • 1st Seed',
    },
    awayTeam: {
      name: 'Titans',
      seed: 'Away • 2nd Seed',
    },
    court: 'Court 2 • Fox40 Assigned',
    officials: 'Crew A (Referee Myers & Vance)',
    telemetryStatus: 'Telemetry: 120 FPS Active',
    isCheckedIn: false,
  },
  {
    id: 'fix-2',
    status: 'upcoming',
    time: '18:00',
    dateLabel: 'FRI NOV 15 • 18:00',
    titleBadge: 'East Fieldhouse Court 1',
    homeTeam: {
      name: 'Med School Dribblers',
      seed: '3rd Seed',
    },
    awayTeam: {
      name: 'Business Bulls',
      seed: '4th Seed',
    },
    court: 'East Fieldhouse Court 1',
    officials: 'Referees: Crew C',
  },
  {
    id: 'fix-3',
    status: 'final',
    time: '20:00',
    dateLabel: 'FINAL • MON NOV 11',
    titleBadge: 'Week 5',
    homeTeam: {
      name: 'Apex Raptors',
      seed: '1st Seed',
      score: 78,
      mvp: 'MVP: Rivera (26 PTS)',
    },
    awayTeam: {
      name: 'Architecture',
      seed: 'Div A Rival',
      score: 64,
      note: 'Div A Rival',
    },
    court: 'Main Fieldhouse • Court 1',
    officials: 'Official verified by Fox40',
  },
];

export const ROSTER_MEMBERS: TeamMember[] = [
  { number: 24, name: 'Alex Rivera', position: 'Point Guard (C)', year: 'Senior', status: 'Confirmed', ppg: 24.4, rpg: 5.8 },
  { number: 7, name: 'Marcus Chen', position: 'Shooting Guard', year: 'Junior', status: 'Confirmed', ppg: 18.2, rpg: 3.4 },
  { number: 13, name: 'Tariq Johnson', position: 'Small Forward', year: 'Senior', status: 'Confirmed', ppg: 14.1, rpg: 8.9 },
  { number: 32, name: 'Liam O’Connor', position: 'Power Forward', year: 'Sophomore', status: 'Confirmed', ppg: 11.5, rpg: 10.2 },
  { number: 55, name: 'David Okafor', position: 'Center', year: 'Senior', status: 'Confirmed', ppg: 9.8, rpg: 11.4 },
  { number: 3, name: 'Julian Santos', position: 'Guard', year: 'Freshman', status: 'Pending', ppg: 6.2, rpg: 2.1 },
  { number: 15, name: 'Noah Miller', position: 'Forward', year: 'Junior', status: 'Pending', ppg: 5.4, rpg: 4.0 },
  { number: 21, name: 'Sammy Taylor', position: 'Guard', year: 'Sophomore', status: 'Sidelined', ppg: 4.8, rpg: 1.9 },
];

export const SPORTS_LIST = [
  { id: 'basketball', name: 'Basketball', icon: 'sports_basketball', venuesCount: 6 },
  { id: 'badminton', name: 'Badminton', icon: 'sports_tennis', venuesCount: 4 },
  { id: 'tennis', name: 'Tennis', icon: 'sports_baseball', venuesCount: 5 },
  { id: 'turf', name: 'Turf Field', icon: 'grass', venuesCount: 2 },
  { id: 'squash', name: 'Squash', icon: 'sports_handball', venuesCount: 3 },
  { id: 'pool', name: 'Olympic Pool', icon: 'pool', venuesCount: 1 },
];

export const SCHEDULE_DAYS = [
  { day: 'Today', date: 23, isToday: true },
  { day: 'Wed', date: 24 },
  { day: 'Thu', date: 25 },
  { day: 'Fri', date: 26, dotColor: 'bg-error/40' },
  { day: 'Sat', date: 27 },
];
