import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UiService } from './ui.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private authTokenDataCheck = false;
  private clearTimer: any;
  private userId: string;
  private authTokenCheck = new Subject<boolean>();
  errorCheck = new Subject<boolean>();
  constructor(private httpClient: HttpClient, private router: Router, private uiService: UiService) { }

  getToken() {
    return this.token;
  }

  getauthTokenData() {
    return this.authTokenDataCheck;
  }

  getUserId() {
    return this.userId;
  }

  getAuthToken() {
    return this.authTokenCheck.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.httpClient.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(
        data => {
          console.log(data);
        }
      );
  }

  userLogin(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.httpClient.post<{
      message: string,
      token: string,
      expiresIn: number,
      userId: string
    }>('http://localhost:3000/api/user/login', authData)
      .subscribe(
        data => {
          const token = data.token;
          this.token = token;
          this.userId = data.userId;
          this.setAuthTimer(data.expiresIn);
          this.authTokenCheck.next(true);
          this.authTokenDataCheck = true;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + data.expiresIn * 1000);
          this.saveAuthData(token, expirationDate, data.userId);
          this.router.navigate(['/']);
        },
        error => {
          this.uiService.showSnackBar(error.error.error, null, 3000);
          this.errorCheck.next(true);
        });
  }

  logout() {
    this.token = null;
    this.userId = null;
    clearTimeout(this.clearTimer);
    this.authTokenCheck.next(false);
    this.authTokenDataCheck = false;
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  setAuthTimer(duration: number) {
    this.clearTimer = setInterval(() => this.logout(), duration * 1000);
  }

  autoAuthUser() {
    const autoInformation = this.getAuthData();
    const now = new Date();
    if (!autoInformation) {
      return;
    }
    const expiresIn = autoInformation.expiration.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = autoInformation.token;
      this.userId = autoInformation.userId;
      this.authTokenCheck.next(true);
      this.setAuthTimer(expiresIn / 1000);
      this.authTokenDataCheck = true;
    }
  }

  private saveAuthData(token: string, expirationTime: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expiration', expirationTime.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expiration) {
      return;
    }

    return {
      token: token,
      userId: userId,
      expiration: new Date(expiration)
    };
  }
}
