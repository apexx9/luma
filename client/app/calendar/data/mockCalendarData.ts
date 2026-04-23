export interface CalendarEvent {
  day: string;
  month: string;
  type: string;
  time: string;
  title: string;
  person: string;
}

export interface CalendarDay {
  day: number;
  current: boolean;
  event?: string;
  events?: string[];
  active?: boolean;
  dark?: boolean;
  blue?: boolean;
}

export const upcomingEvents: CalendarEvent[] = [
  { day: "12", month: "Oct", type: "Viewing", time: "10:00 AM", title: "Unit 4B Viewing", person: "Sarah Jenkins" },
  { day: "14", month: "Oct", type: "Open House", time: "02:00 PM", title: "The Lofts Open House", person: "General Public" },
  { day: "15", month: "Oct", type: "Meeting", time: "09:30 AM", title: "Lease Signing", person: "Michael Ross" },
];

export const calendarDays: CalendarDay[] = [
  { day: 29, current: false }, { day: 30, current: false },
  { day: 1, current: true }, { day: 2, current: true, event: "Viewing: Unit 8" },
  { day: 3, current: true }, { day: 4, current: true, event: "Open House: 2pm", dark: true },
  { day: 5, current: true }, { day: 6, current: true }, { day: 7, current: true },
  { day: 8, current: true, events: ["Viewing: Unit 12", "Check-out"] },
  { day: 9, current: true, active: true, event: "Viewing: Unit 4B" },
  { day: 10, current: true }, { day: 11, current: true },
  { day: 12, current: true, event: "Inspection", blue: true },
  { day: 13, current: true },
  { day: 14, current: true, event: "Open House", dark: true },
  { day: 15, current: true }, { day: 16, current: true }, { day: 17, current: true }, { day: 18, current: true }, { day: 19, current: true }, { day: 20, current: true }, { day: 21, current: true }
];
