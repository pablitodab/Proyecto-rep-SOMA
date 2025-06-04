import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

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

  getAll() {
    const userId = this.auth.getUserId();
    const timestamp = new Date().getTime();
    return this.http.get<{ data: T[] }>(
      `${this.apiUrl}/user/${userId}?t=${timestamp}`,
      { headers: this.headers }
    ).pipe(
      map(res => res.data)
    );
  }

  create(data: Omit<T, 'userId'>) {
    return this.http.post<T>(this.apiUrl, data, { 
      headers: this.headers 
    });
  }

  // ✅ CORREGIR UPDATE
  update(id: number, data: Partial<T>) {
    return this.http.patch<T>(`${this.apiUrl}/${id}`, data, { 
      headers: this.headers 
    });
  }

  // ✅ CORREGIR DELETE
 delete(id: number) {
  if (!id) {
    throw new Error('ID es requerido para eliminar');
  }
  
  return this.http.delete(`${this.apiUrl}/${id}`, { 
    headers: this.headers 
  });
}
}
