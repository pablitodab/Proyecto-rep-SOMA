import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post<any>('/api/user/login', this.loginData)
      .subscribe({
        next: (response) => {
          // Guardar el token en localStorage
          localStorage.setItem('token', response.token);
          // Redireccionar al dashboard
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = error.error.msg || 'Error al iniciar sesión';
        }
      });
  }
}

