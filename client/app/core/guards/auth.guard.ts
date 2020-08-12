import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser();

    if (user && this.authService.loggedIn) {
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
