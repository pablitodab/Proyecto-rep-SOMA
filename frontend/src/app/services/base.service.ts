import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export abstract class BaseService<T> {
  constructor(protected http: HttpClient, private endpoint: string) {}

  protected getHeaders() {
    return { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
  }

  getAll() {
    return this.http.get<T[]>(`${this.endpoint}`, this.getHeaders());
  }
}
