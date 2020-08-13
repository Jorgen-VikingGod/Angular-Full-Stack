import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/models/user.model';
import { NotificationService } from '../../core/services/notification.service';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
  user: User;
  isLoading = true;
  username = new FormControl('', Validators.required);

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getErrorMessage(): string {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
  }

  getUser(): void {
    this.isLoading = true;
    this.user = this.authService.getCurrentUser();
    this.username.setValue(this.user.username);
    this.isLoading = false;
  }

  save(user: User): void {
    this.isLoading = true;
    const username: string = this.username.value;
    this.userService.editUser({ ...user, username }).subscribe(
      (res: User) => {
        this.user = res;
        this.notificationService.openSnackBar('account settings saved!');
        this.authService.changeCurrentUser(res);
      },
      (error) => console.log(error),
      () => (this.isLoading = false)
    );
  }
}
