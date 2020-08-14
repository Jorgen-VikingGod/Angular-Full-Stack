import BaseCtrl from './base';
import { CalendarEvent, SchedulerDeviceType, SchedulerDevice } from './../models/event';

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
      duration: '01:00',
    },
    {
      id: '3',
      allDay: false,
      title: 'smoke PC0815 with MEAS01 and GEN-TYPE-01',
      backgroundColor: 'green',
      textColor: 'yellow',
      overlap: true,
      rrule: {
        dtstart: '2020-07-08T07:30:00',
        byweekday: ['we'],
        freq: 'weekly',
        interval: 1,
      },
      duration: '01:30',
      scheduler: {
        usePC: true,
        pc: new SchedulerDevice('PC0815', '1'),
        device: new SchedulerDevice('MEAS01', '2'),
        generator: new SchedulerDeviceType('GEN-TYPE-01', '3'),
        testlist: 'smoke',
      },
    },
    {
      id: '4',
      allDay: false,
      title: 'base DEV-TYPE-01 and GEN-TYPE-02',
      backgroundColor: 'darkCyan',
      overlap: true,
      rrule: {
        dtstart: '2020-07-07T07:00:00',
        byweekday: ['tu'],
        freq: 'weekly',
        interval: 1,
      },
      duration: '06:30',
      scheduler: {
        device: new SchedulerDeviceType('DEV-TYPE-01', '4'),
        generator: new SchedulerDeviceType('GEN-TYPE-02', '5'),
        testlist: 'base',
      },
    },
  ] as CalendarEvent[];
}

export default EventCtrl;
