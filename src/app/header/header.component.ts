import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
userIsAunthinticated = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userIsAunthinticated = this.authService.getauthTokenData();
    this.authService.getAuthToken().subscribe(
      authValue => {
          this.userIsAunthinticated = authValue;
      });
  }
  logout() {
    this.authService.logout();
  }
}
