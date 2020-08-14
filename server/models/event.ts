export class CalendarEventRRule {
  freq: string;
  interval: number;
  byweekday: string[];
  dtstart: string;
}

export class SchedulerDevice {
  constructor(public name: string, public id: string) {}
  public type = 'device';
}

export class SchedulerDeviceType {
  constructor(public name: string, public id: string) {}
  public type = 'deviceType';
}

export class CalendarEventScheduler {
  usePC: boolean = false;
  pc?: SchedulerDevice;
  device: SchedulerDevice | SchedulerDeviceType;
  generator: SchedulerDevice | SchedulerDeviceType;
  testlist: string;
}

export class CalendarEvent {
  // tslint:disable-next-line: variable-name
  id: string;
  title: string;
  allDay: boolean;
  backgroundColor?: string;
  textColor?: string;
  color?: string;
  overlap: boolean;
  display?: string;
  rrule?: CalendarEventRRule;
  duration?: string;
  scheduler?: CalendarEventScheduler;
}
