import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData = {
    name: '',
    lastname: '',
    email: '',
    credential: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log('Enviando datos:', this.userData);
    this.http.post<any>('/api/user/register', this.userData)
      .subscribe({
        next: (response) => {
          alert('Usuario registrado correctamente');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error completo:', error);
          this.errorMessage = error.error?.msg || 'Error al registrar usuario';
        }
      });
  }
}
