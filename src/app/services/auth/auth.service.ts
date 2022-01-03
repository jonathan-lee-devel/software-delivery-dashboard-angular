import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginDto } from '../../dtos/LoginDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly USER_DATA_KEY: string = 'userInfo';

  constructor(private httpClient: HttpClient) {}

  public isAuthenticated(): boolean {
    const userData = localStorage.getItem(AuthService.USER_DATA_KEY);
    return !!(userData && JSON.parse(userData));
  }

  public setUserInfo(user: any) {
    localStorage.setItem(AuthService.USER_DATA_KEY, JSON.stringify(user));
  }

  public validate(username: string, password: string) {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.httpClient.post<LoginDto>(
      `http://localhost:4200/api/users/login`,
      body
    );
  }
}
