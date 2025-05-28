import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  private apiUrl = 'http://localhost:3001/api/routines';

  constructor(private http: HttpClient) {}

  getRoutines(userId: number) {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  saveRoutine(routineData: any) {
    return this.http.post(this.apiUrl, routineData);
  }
}
