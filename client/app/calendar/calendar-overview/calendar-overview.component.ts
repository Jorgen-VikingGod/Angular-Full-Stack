import { Component, OnInit, ViewChild } from '@angular/core';

import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
  FullCalendarComponent,
  EventInput,
} from '@fullcalendar/angular';
import { CalendarService } from '../calendar.service';
import { CalendarEvent } from 'server/models/event';

@Component({
  selector: 'app-about-home',
  templateUrl: './calendar-overview.component.html',
  styleUrls: ['./calendar-overview.component.scss'],
})
export class CalendarOverviewComponent implements OnInit {
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;

  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
  selected = ['Option 2', 'Option 3'];

  calendarVisible = true;
  /*
  calendarEvents: EventInput[] = [
    {
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
      allDay: false,
      title: 'Test',
      backgroundColor: 'blue',
      overlap: true,
      //display: "background",
      rrule: {
        dtstart: '2020-07-07T06:30:00',
        byweekday: ['mo', 'tu'],
        freq: 'weekly',
        interval: 2,
      },
      duration: '00:60',
    },
  ];
  */

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    footerToolbar: {
      left: 'prev,next today',
      center: '',
      right: '',
    },
    initialView: 'timeGridWeek',
    height: 'calc(100vh - 320px)',
    stickyHeaderDates: true,
    firstDay: 1,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: false,
    nowIndicator: true,
    allDaySlot: false,
    slotLabelFormat: ['HH:00'],
    eventTimeFormat: 'HH:mm',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };
  currentEvents: EventApi[] = [];
  isLoading = true;

  constructor(private calendarService: CalendarService) {}

  handleDateClick(arg): void {
    alert('date click! ' + arg.dateStr);
  }

  handleCalendarToggle(): void {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle(): void {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg): void {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: Math.random().toString(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg): void {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]): void {
    this.currentEvents = events;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.calendarService.getEvents().subscribe(
        (events: CalendarEvent[]) => {
          this.calendarOptions.events = events;
          console.log(events);
        },
        (error) => console.log(error),
        () => (this.isLoading = false)
      );
    });
  }
}
