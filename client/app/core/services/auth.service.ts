import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../../shared/models/user.model';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';
import { UserService } from './../../shared/services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  private currentUser: User = new User();

  constructor(
    private userService: UserService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private notificationService: NotificationService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  login(credentials): boolean {
    this.userService.login(credentials).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        this.loggedIn = true;
        this.router.navigate(['/']);
        return true;
      },
      (error) => {
        this.notificationService.openSnackBar('invalid username or password!');
        return false;
      }
    );
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = new User();
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token): object {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser): void {
    this.loggedIn = true;
    this.currentUser.id = decodedUser.id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    this.isAdmin = decodedUser.role === 'admin';
    delete decodedUser.role;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  changePassword(user: User, newPwd: string): Observable<any> {
    return this.userService.editUser({ password: newPwd, ...user });
  }
}
