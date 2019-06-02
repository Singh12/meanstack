import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignUpComponent {
  isLoading = false;
  constructor(private authService: AuthService) {
  }
  onSignup(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      return;
    }
    // const userData = { email: form.value.email, password: form.value.password };
    this.authService.createUser(form.value.email, form.value.password);
  }
}
