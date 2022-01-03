import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  doLogin() {
    this.authService
      .validate(this.username, this.password)
      .subscribe((response: any) => {
        this.authService.setUserInfo({ user: response['user'] });
        this.router.navigate(['home']);
      });
  }
}
