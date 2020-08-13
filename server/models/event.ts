export class CalendarEventRRule {
  freq: string;
  interval: number;
  byweekday: string[];
  dtstart: string;
}

export class CalendarEvent {
  // tslint:disable-next-line: variable-name
  id: string;
  title: string;
  allDay: boolean;
  backgroundColor?: string;
  overlap: boolean;
  display?: string;
  rrule?: CalendarEventRRule;
  duration?: string;
}
