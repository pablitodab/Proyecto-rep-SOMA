import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class NutricionService extends BaseService<any> {
  constructor() {
    super('nutricion');
  }

  getResumenSemanal(userId: number) {
    return this.http.get(`${this.apiUrl}/resumen`, {
      params: { userId: userId.toString() },
      headers: this.headers
    });
  }
}
