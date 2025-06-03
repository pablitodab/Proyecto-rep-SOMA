import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export abstract class BaseService<T> {
  protected readonly apiUrl: string;
  protected http = inject(HttpClient);
  protected auth = inject(AuthService);

  constructor(protected endpoint: string) {
    this.apiUrl = `${environment.apiUrl}/${endpoint}`;
  }

  protected get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`
    });
  }

  // Obtener todos los registros del usuario
  getAll() {
    const userId = this.auth.getUserId();
    return this.http.get<T[]>(`${this.apiUrl}/user/${userId}`, { 
      headers: this.headers 
    });
  }

  // Crear registro con userId automático
  create(data: Omit<T, 'userId'>) {
    const userId = this.auth.getUserId();
    return this.http.post<T>(this.apiUrl, { ...data, userId }, { 
      headers: this.headers 
    });
  }

  // Actualizar solo si el registro pertenece al usuario
  update(id: number, data: Partial<T>) {
    const userId = this.auth.getUserId();
    return this.http.patch<T>(`${this.apiUrl}/${id}`, { ...data, userId }, { 
      headers: this.headers 
    });
  }

  // Eliminar solo registros del usuario
  delete(id: number) {
    const userId = this.auth.getUserId();
    return this.http.delete(`${this.apiUrl}/${id}?userId=${userId}`, { 
      headers: this.headers 
    });
  }
}
