import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RoutineService } from './services/routine.service';

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [FormsModule, HeaderComponent, FooterComponent, DatePipe, CommonModule],
   providers: [RoutineService],
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})

export class RoutineComponent {
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  rutina: { [key: string]: string } = {};
  rutinaGuardada = false;
  mostrarFormularioEjercicio = false;
  ejerciciosHoy: any[] = [];
  nuevoEjercicio = { nombre: '', sets: [{ peso: 0, reps: 0 }] };

  // Día actual (ajustado para que Lunes sea 0)
  diaActual = this.diasSemana[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  fechaActual = new Date();

  // Ejemplo de estadísticas semanales (puedes adaptar a tu lógica real)
  estadisticas = [
    { ejercicio: 'Peso muerto', maxPeso: 100, maxReps: 10 },
    { ejercicio: 'Press banca', maxPeso: 80, maxReps: 8 },
    { ejercicio: 'Sentadilla', maxPeso: 90, maxReps: 12 }
  ];

  constructor(
    private routineService: RoutineService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Aquí puedes cargar la rutina del usuario desde el backend si lo deseas
    // this.routineService.getRoutines(userId).subscribe(data => { ... });
  }

  guardarRutina() {
    // Aquí deberías guardar la rutina en el backend
    // this.routineService.saveRoutine({ user_id: ..., routines: this.rutina }).subscribe(...)
    this.rutinaGuardada = true;
  }

  editarRutina() {
    this.rutinaGuardada = false;
  }

  agregarSet() {
    this.nuevoEjercicio.sets.push({ peso: 0, reps: 0 });
  }

  eliminarSet(index: number) {
    this.nuevoEjercicio.sets.splice(index, 1);
  }

  agregarEjercicio() {
    // Aquí deberías guardar el ejercicio en el backend
    // this.routineService.saveExercise({ ... }).subscribe(...)
    this.ejerciciosHoy.push({ ...this.nuevoEjercicio });
    this.nuevoEjercicio = { nombre: '', sets: [{ peso: 0, reps: 0 }] };
    this.mostrarFormularioEjercicio = false;
  }
}
