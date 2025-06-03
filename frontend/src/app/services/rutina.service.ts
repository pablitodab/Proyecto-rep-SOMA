// src/app/services/rutina.service.ts
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AuthService } from './auth.service';

interface RutinaDia {
  id?: number;
  dia: 'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes' | 'sábado' | 'domingo';
  descripcion: string;
  enfoque: string;
  cardio: boolean;
}

@Injectable({ providedIn: 'root' })
export class RutinaService extends BaseService<RutinaDia> {
  constructor() {
    super('rutina');
  }

  // Obtener rutinas del usuario logueado
  getRutinasUsuario() {
    const userId = this.auth.getUserId();
    if (!userId) throw new Error('Usuario no autenticado');
    // Añadir timestamp para evitar caché
    const timestamp = new Date().getTime();
    return this.http.get<RutinaDia[]>(`${this.apiUrl}/user/${userId}?t=${timestamp}`, {
      headers: this.headers
    });
  }
}
