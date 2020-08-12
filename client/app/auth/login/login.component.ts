import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;

  constructor(
    private authService: AuthService,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('angular-material-template - Login');
    this.authService.logout();
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  login(): void {
    const username: string = this.loginForm.get('username').value;
    const password: string = this.loginForm.get('password').value;
    this.loading = true;
    if (!this.authService.login({ username, password })) {
      this.loading = false;
    }
  }
}
