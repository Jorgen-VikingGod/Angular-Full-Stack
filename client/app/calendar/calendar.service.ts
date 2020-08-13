import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarEvent } from '../../../server/models/event';

@Injectable()
export class CalendarService {
  constructor(private http: HttpClient) {}

  getEvents(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>('/api/v1/events');
  }

  countEvents(): Observable<number> {
    return this.http.get<number>('/api/v1/events/count');
  }

  addEvent(event: CalendarEvent): Observable<CalendarEvent> {
    return this.http.post<CalendarEvent>('/api/v1/event', event);
  }

  getEvent(event: CalendarEvent): Observable<CalendarEvent> {
    return this.http.get<CalendarEvent>(`/api/v1/event/${event.id}`);
  }

  editEvent(event: CalendarEvent): Observable<any> {
    return this.http.put(`/api/v1/event/${event.id}`, event, { responseType: 'text' });
  }

  deleteEvent(event: CalendarEvent): Observable<any> {
    return this.http.delete(`/api/v1/event/${event.id}`, { responseType: 'text' });
  }
}
