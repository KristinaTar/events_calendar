/// <reference types="react-scripts" />
type CalendarEvent = {
  title: string;
  description: string;
  date: string;
  time: string;
  created: number;
  updated?: number;
};

type CalendarEvents = {
  [key: string]: CalendarEvent[] | undefined;
};

type EventData = {
  title: string;
  description: string;
  date: string;
  time: string;
};
