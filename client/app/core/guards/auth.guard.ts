import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService, AuthInfo } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> | boolean {
    // get the most recent value BehaviorSubject holds
    if (this.authService.authInfo$.getValue().isLoggedIn()) {
      return true;
    }
    /*
    User is not logged in as stored authInfo indicates, 
    but in case the page has been reloaded, the stored value is lost, 
    and in order to get real auth status we will perform the server call,
    (authService.getAuthInfo method will automatically update the BehaviorSubject value, 
    and next time the protected route is accessed, no additional call will be made - until 
    the next reloading).
    */
    return this.authService.getAuthInfo().pipe(
      map((authInfo: AuthInfo) => {
        if (authInfo.isLoggedIn()) {
          return true;
        }
        this.router.navigate(['auth/login']);
        return false;
      })
    );
  }
}
