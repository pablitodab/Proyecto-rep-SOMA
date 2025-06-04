import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { EntradaDiario } from '../models/diario.model';

@Injectable({ providedIn: 'root' })
export class DiarioService extends BaseService<EntradaDiario> {
  constructor() {
    super('diario');
  }

override getAll() {
    return super.getAll();
  }
}
