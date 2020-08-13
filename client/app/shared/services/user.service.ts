import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/v1/register', user);
  }

  login(credentials): Observable<User> {
    return this.http.post<User>('/api/v1/login', credentials);
  }

  refresh(user): Observable<User> {
    return this.http.post<User>('/api/v1/refresh', user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/v1/users');
  }

  countUsers(): Observable<number> {
    return this.http.get<number>('/api/v1/users/count');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('/api/v1/user', user);
  }

  getUser(user: User): Observable<User> {
    return this.http.get<User>(`/api/v1/user/${user.id}`);
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`/api/v1/user/${user.id}`, user);
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete(`/api/v1/user/${user.id}`, { responseType: 'text' });
  }
}
