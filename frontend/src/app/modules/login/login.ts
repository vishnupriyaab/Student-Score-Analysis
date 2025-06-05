import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Header } from '../header/header';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Auth } from '../../core/services/authService/auth';
import { Router } from '@angular/router';
import { LoginDto } from '../../dtos/login.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Header, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.warning(
        'Please fill all required fields correctly',
        'Form Validation'
      );
      return;
    }

    const loginData: LoginDto = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log(response, 'resposnsesesees');
        if (response.success) {
          this.authService.setLoggedIn('true');
          this.toastr.success('Login successful!', 'Welcome');
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.error(response.message || 'Login failed', 'Error');
        }
      },
      error: (error) => {
        console.log(error,"errorr")
        this.toastr.error(
          error.error?.message || 'An error occurred during login',
          'Error'
        );
      },
    });
  }



}
