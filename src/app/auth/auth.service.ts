import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private authTokenDataCheck = false;
  private authTokenCheck = new Subject<boolean>();
    constructor(private httpClient: HttpClient) {}

    getToken() {
        return this.token;
    }

    getauthTokenData() {
      return this.authTokenDataCheck;
    }

    getAuthToken() {
      return this.authTokenCheck.asObservable();
    }

    createUser(email: string, password: string) {
      const authData: AuthData = {email: email, password: password};
      this.httpClient.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(
        data => {
          console.log(data);
        }
      );
    }

    userLogin(email: string, password: string) {
      const authData: AuthData = {email: email, password: password};
      this.httpClient.post<{message: string, token: string}>('http://localhost:3000/api/user/login', authData)
      .subscribe(
        data => {
          const token = data.token;
          this.token = token;
          this.authTokenCheck.next(true);
          this.authTokenDataCheck = true;
        });
    }
}
