import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ObjetivoService extends BaseService<any> {
    constructor() {
        super('objetivos');
    }

    toggleCumplido(id: number) {
        return this.http.patch(`${this.apiUrl}/${id}/toggle`, {}, {
            headers: this.headers
        });
    }
}
