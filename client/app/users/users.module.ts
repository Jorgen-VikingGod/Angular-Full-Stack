import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { UserListComponent } from './user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, UsersRoutingModule],
  declarations: [UserListComponent],
})
export class UsersModule {}
