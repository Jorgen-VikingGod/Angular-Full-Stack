import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser();

    if (user && this.authService.isAdmin) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
