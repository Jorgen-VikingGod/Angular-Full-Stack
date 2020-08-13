import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarEvent } from '../../../server/models/event';

@Injectable()
export class CalendarService {
  constructor(private http: HttpClient) {}

  getEvents(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>('/api/events');
  }

  countEvents(): Observable<number> {
    return this.http.get<number>('/api/events/count');
  }

  addEvent(event: CalendarEvent): Observable<CalendarEvent> {
    return this.http.post<CalendarEvent>('/api/event', event);
  }

  getEvent(event: CalendarEvent): Observable<CalendarEvent> {
    return this.http.get<CalendarEvent>(`/api/event/${event.id}`);
  }

  editEvent(event: CalendarEvent): Observable<any> {
    return this.http.put(`/api/event/${event.id}`, event, { responseType: 'text' });
  }

  deleteEvent(event: CalendarEvent): Observable<any> {
    return this.http.delete(`/api/event/${event.id}`, { responseType: 'text' });
  }
}
