import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterDto } from '../../dtos/ auth/RegisterDto';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}

  public register(
    name: string,
    username: string,
    password: string,
    confirmPassword: string
  ) {
    const body = {
      name,
      email: username,
      password,
      confirm_password: confirmPassword,
    };

    return this.httpClient.post<RegisterDto>(
      'http://localhost:4200/api/users/register',
      body
    );
  }
}
