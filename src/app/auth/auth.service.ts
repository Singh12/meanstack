import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
    constructor(private httpClient: HttpClient) {}

    getToken() {
      if (!this.token) {
        return;
      }
        return this.token;
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
          console.log(data.token );
          const token = data.token;
          this.token = token;
        });
    }
}
