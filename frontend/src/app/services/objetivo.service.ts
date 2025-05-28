import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ObjetivoService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http, 'objetivos');
  }

  toggleCumplido(id: number) {
    return this.http.patch(
      `${this.apiUrl}/${id}/toggle`,
      {},
      this.getHeaders()
    );
  }
}
