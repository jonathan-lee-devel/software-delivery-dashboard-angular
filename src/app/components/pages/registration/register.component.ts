import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../../services/auth/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  doRegister() {
    this.registrationService
      .register(this.name, this.username, this.password, this.confirmPassword)
      .subscribe((response) => {
        if (response.registration_status === 'AWAITING_EMAIL_VERIFICATION') {
          window.alert('Awaiting E-mail Verification');
          this.router.navigate(['/login']);
        } else {
          window.alert(response.registration_status);
        }
      });
  }
}
