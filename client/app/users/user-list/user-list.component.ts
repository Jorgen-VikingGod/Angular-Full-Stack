import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { NotificationService } from '../../core/services/notification.service';
import { User } from '../../shared/models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  columns = ['username', 'role', 'remove'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private authService: AuthService,
    private logger: NGXLogger,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('angular-material-template - Users');
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.logger.log('Users loaded');
      },
      (error) => console.log(error),
      () => (this.isLoading = false)
    );
  }

  roleChanged(user: User): void {
    this.userService.editUser(user).subscribe(
      (data) => {
        this.authService.setCurrentUser(data);
      },
      (error) => console.log(error),
      () => (this.isLoading = false)
    );
  }

  deleteUser(user: User, index: number): void {
    if (window.confirm('Are you sure you want to delete ' + user.username + '?')) {
      this.userService.deleteUser(user).subscribe(
        (data) => {
          const userList: User[] = this.dataSource.data;
          userList.splice(this.paginator.pageIndex * this.paginator.pageSize + index, 1);
          this.dataSource.data = userList;
          this.notificationService.openSnackBar('user deleted successfully.');
        },
        (error) => console.log(error),
        () => this.getUsers()
      );
    }
  }

  sortData(sort: Sort): number {
    if (sort.active && sort.direction !== '') {
      this.dataSource.data = this.dataSource.data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'username':
            return this.compare(a.username, b.username, isAsc);
          case 'role':
            return this.compare(a.role, b.role, isAsc);
          default:
            return 0;
        }
      });
    }
    return 0;
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
