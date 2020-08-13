import BaseCtrl from './base';
import { CalendarEvent } from 'models/event';

class EventCtrl extends BaseCtrl {
  model = [
    {
      id: '1',
      allDay: false,
      backgroundColor: 'lightGray',
      overlap: true,
      display: 'inverse-background',
      rrule: {
        freq: 'weekly',
        interval: 1,
        byweekday: ['mo', 'tu', 'we', 'th', 'fr'],
        dtstart: '2010-01-01T05:00:00Z',
      },
      duration: '12:00',
    },
    {
      id: '2',
      allDay: false,
      title: 'Test',
      backgroundColor: 'blue',
      overlap: true,
      rrule: {
        dtstart: '2020-07-07T06:30:00',
        byweekday: ['mo', 'tu'],
        freq: 'weekly',
        interval: 2,
      },
      duration: '00:60',
    },
  ] as CalendarEvent[];
}

export default EventCtrl;
