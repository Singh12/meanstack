import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  isLoading = false;
  error = false;
  constructor(private authService: AuthService) {}

  onLogin(form: NgForm) {
    this.isLoading = true;
    if (!form.valid) {
      this.isLoading = false;
      return;
    }
    this.authService.userLogin(form.value.email, form.value.password);
    this.authService.errorCheck.subscribe(
      error => {
        this.isLoading = false;
        this.error = error;
      }
    );
  }
}

