import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';

import { AuthService } from './../../core/services/auth.service';
import { NotificationService } from './../../core/services/notification.service';
import { SpinnerService } from './../../core/services/spinner.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  hideCurrentPassword: boolean;
  hideNewPassword: boolean;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
  disableSubmit: boolean;

  constructor(
    private authService: AuthService,
    private logger: NGXLogger,
    private spinnerService: SpinnerService,
    private notificationService: NotificationService
  ) {
    this.hideCurrentPassword = true;
    this.hideNewPassword = true;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      newPasswordConfirm: new FormControl('', Validators.required),
    });

    this.form.get('currentPassword').valueChanges.subscribe((val) => {
      this.currentPassword = val;
    });

    this.form.get('newPassword').valueChanges.subscribe((val) => {
      this.newPassword = val;
    });

    this.form.get('newPasswordConfirm').valueChanges.subscribe((val) => {
      this.newPasswordConfirm = val;
    });

    this.spinnerService.visibility.subscribe((value) => {
      this.disableSubmit = value;
    });
  }

  changePassword(): void {
    if (this.newPassword !== this.newPasswordConfirm) {
      this.notificationService.openSnackBar('New passwords do not match.');
      return;
    }

    const user = this.authService.getCurrentUser();

    this.authService.changePassword(this.currentPassword, this.newPassword).subscribe(
      (data) => {
        this.logger.info(`User ${user.username} changed password.`);
        this.form.reset();
        this.notificationService.openSnackBar('Your password has been changed.');
      },
      (error) => {
        this.notificationService.openSnackBar(error.error);
      }
    );
  }
}
