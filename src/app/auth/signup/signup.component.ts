import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignUpComponent {
  isLoading = true;
  constructor(private authService: AuthService) {
  }
  onSignup(form: NgForm) {
    const userData = { email: form.value.email, password: form.value.password };
    this.authService.signUp(userData);
  }
}

