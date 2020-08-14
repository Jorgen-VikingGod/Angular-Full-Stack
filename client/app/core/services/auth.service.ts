import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../shared/models/user.model';
import { NotificationService } from './notification.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from './../../shared/services/user.service';

export class AuthInfo {
  constructor(public token: string, public role: string) {}
  isLoggedIn(): boolean {
    return !!this.token;
  }
  isAdmin(): boolean {
    return this.role === 'admin';
  }
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  static UNKNOWN_USER = new AuthInfo(null, '');
  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);
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

  register(user: User): boolean {
    this.userService.register(user).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
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

  login(credentials): boolean {
    this.userService.login(credentials).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
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

  logout(navigate: boolean = true): void {
    localStorage.removeItem('token');
    this.currentUser = new User();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
    if (navigate) {
      this.router.navigate(['/']);
    }
  }

  decodeUserFromToken(token): object {
    return this.jwtHelper.decodeToken(token).user;
  }

  changeCurrentUser(user: User): void {
    console.log(user);
    this.userService.refresh(user).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        //this.router.navigate(['/']);
        return true;
      },
      (error) => {
        this.notificationService.openSnackBar('Token refresh failed!');
        return false;
      }
    );
  }

  setCurrentUser(decodedUser): void {
    this.currentUser.id = decodedUser.id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    const authInfo = new AuthInfo(this.currentUser.id, this.currentUser.role);
    this.authInfo$.next(authInfo);
    delete decodedUser.role;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  changePassword(user: User, newPwd: string): Observable<User> {
    return this.userService.editUser({ ...user, password: newPwd });
  }

  getAuthInfo(): Observable<AuthInfo> {
    return this.authInfo$.asObservable();
  }

  isLoggedIn(): boolean {
    return this.authInfo$.getValue().isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authInfo$.getValue().isAdmin();
  }
}
