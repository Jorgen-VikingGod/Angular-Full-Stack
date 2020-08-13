export interface EventRRule {
  freq: string;
  interval: number;
  byweekday: string[];
  dtstart: string;
}

export interface Event {
  // tslint:disable-next-line: variable-name
  id: string;
  title: string;
  allDay: boolean;
  backgroundColor?: string;
  overlap: boolean;
  display?: string;
  rrule?: EventRRule;
  duration?: string;
}
