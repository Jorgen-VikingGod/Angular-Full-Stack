import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    console.log(token, request);
    if (token) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(cloned);
    } else {
      return next.handle(request);
    } /*

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return next.handle(request);*/
  }
}
