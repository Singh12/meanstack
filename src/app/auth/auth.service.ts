import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private httpClient: HttpClient) {}
    signUp(userData: AuthData) {
      console.log(userData);
      this.httpClient.post('http://localhost:3000/api/user/signup', userData)
      .subscribe(
        data => {
          console.log(data);
        }
      );
    }
}
