import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  isLoading = true;
  constructor(private authService: AuthService) {}

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.authService.userLogin(form.value.email, form.value.password);
  }
}

