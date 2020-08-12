import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { AccountRoutingModule } from './account-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [CommonModule, SharedModule, AccountRoutingModule],
  declarations: [ProfileComponent, ChangePasswordComponent, ProfileDetailsComponent],
  exports: [ProfileComponent],
})
export class AccountModule {}
