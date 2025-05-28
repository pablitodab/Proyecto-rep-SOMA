import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class NutricionService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http, 'nutricion');
  }
}
