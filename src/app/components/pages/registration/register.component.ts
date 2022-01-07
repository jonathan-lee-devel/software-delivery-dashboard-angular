import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../../services/auth/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  doRegister() {
    this.registrationService
      .register(this.email, this.password, this.confirmPassword)
      .subscribe((response) => {
        if (response.registration_status === 'AWAITING_EMAIL_VERIFICATION') {
          this.router.navigate(['/login']);
        } else {
          window.alert(response.registration_status);
        }
      });
  }
}
