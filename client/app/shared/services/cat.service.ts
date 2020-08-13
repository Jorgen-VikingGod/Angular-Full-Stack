import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cat } from '../shared/models/cat.model';

@Injectable()
export class CatService {
  constructor(private http: HttpClient) {}

  getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>('/api/v1/cats');
  }

  countCats(): Observable<number> {
    return this.http.get<number>('/api/v1/cats/count');
  }

  addCat(cat: Cat): Observable<Cat> {
    return this.http.post<Cat>('/api/v1/cat', cat);
  }

  getCat(cat: Cat): Observable<Cat> {
    return this.http.get<Cat>(`/api/v1/cat/${cat.id}`);
  }

  editCat(cat: Cat): Observable<any> {
    return this.http.put(`/api/v1/cat/${cat.id}`, cat, { responseType: 'text' });
  }

  deleteCat(cat: Cat): Observable<any> {
    return this.http.delete(`/api/v1/cat/${cat.id}`, { responseType: 'text' });
  }
}
