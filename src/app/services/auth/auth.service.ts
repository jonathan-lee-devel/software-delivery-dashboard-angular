import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.httpClient.post('/api/users/login', { username, password });
  }
}
