import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    credential: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.http.post(`${environment.apiUrl}/users/register`, this.registerForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/login'], {
            state: { registrationSuccess: true }
          });
        },
        error: (err) => {
          this.registerForm.setErrors({
            serverError: err.error?.message || 'Error al registrar usuario'
          });
        }
      });
  }
}
