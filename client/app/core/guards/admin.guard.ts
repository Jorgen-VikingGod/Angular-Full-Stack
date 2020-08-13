import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService, AuthInfo } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> | boolean {
    // get the most recent value BehaviorSubject holds
    if (
      this.authService.authInfo$.getValue().isLoggedIn() &&
      this.authService.authInfo$.getValue().isAdmin()
    ) {
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
        if (authInfo.isAdmin()) {
          return true;
        }
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
