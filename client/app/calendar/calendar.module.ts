import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { CalendarOverviewComponent } from './calendar-overview/calendar-overview.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import momentPlugin from '@fullcalendar/moment';
import rrulePlugin from '@fullcalendar/rrule';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
  rrulePlugin,
  momentPlugin,
  momentTimezonePlugin,
]);

@NgModule({
  declarations: [CalendarOverviewComponent],
  imports: [CommonModule, SharedModule, CalendarRoutingModule, FullCalendarModule],
})
export class CalendarModule {}
