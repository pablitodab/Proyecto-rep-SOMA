import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RutinaService } from '../../../services/rutina.service';

interface RutinaDia {
  id?: number;
  dia: 'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes' | 'sábado' | 'domingo';
  descripcion: string;
  enfoque: string;
  cardio: boolean;
}

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent implements OnInit {
  diasSemana: RutinaDia[] = [];
  rutinaEditable: RutinaDia | null = null;
  mostrarFormulario = false;

  constructor(private rutinaService: RutinaService) {}

  ngOnInit(): void {
    this.inicializarDias();
    this.cargarRutinas();
  }

  private inicializarDias(): void {
    this.diasSemana = [
      { dia: 'lunes', descripcion: '', enfoque: '', cardio: false },
      { dia: 'martes', descripcion: '', enfoque: '', cardio: false },
      { dia: 'miércoles', descripcion: '', enfoque: '', cardio: false },
      { dia: 'jueves', descripcion: '', enfoque: '', cardio: false },
      { dia: 'viernes', descripcion: '', enfoque: '', cardio: false },
      { dia: 'sábado', descripcion: '', enfoque: '', cardio: false },
      { dia: 'domingo', descripcion: '', enfoque: '', cardio: false }
    ];
  }

cargarRutinas(): void {
  this.rutinaService.getRutinasUsuario().subscribe({
    next: (rutinas) => {
      // Actualizar la lista de días con los datos del usuario
      this.diasSemana = this.diasSemana.map(dia => {
        const guardada = rutinas.find(r => r.dia === dia.dia);
        return guardada ? { ...guardada } : dia;
      });
    },
    error: (err) => console.error(err)
  });
}

  editarDia(dia: RutinaDia): void {
    this.rutinaEditable = { ...dia };
    this.mostrarFormulario = true;
  }

  guardarRutina(): void {
    if (!this.rutinaEditable) return;

    if (this.rutinaEditable.id) {
      this.rutinaService.update(this.rutinaEditable.id, this.rutinaEditable).subscribe({
        next: (actualizado) => {
          this.actualizarDia(actualizado);
          this.cancelarEdicion();
        },
        error: (err) => this.mostrarError(err)
      });
    } else {
      this.rutinaService.create(this.rutinaEditable).subscribe({
        next: (nuevo) => {
          this.agregarDia(nuevo);
          this.cancelarEdicion();
        },
        error: (err) => this.mostrarError(err)
      });
    }
  }

  private actualizarDia(dia: RutinaDia): void {
    const index = this.diasSemana.findIndex(d => d.dia === dia.dia);
    if (index !== -1) {
      this.diasSemana[index] = { ...dia };
    }
  }

  private agregarDia(dia: RutinaDia): void {
    const index = this.diasSemana.findIndex(d => d.dia === dia.dia);
    if (index !== -1) {
      this.diasSemana[index] = { ...dia };
    }
  }

  eliminarDia(dia: RutinaDia): void {
    if (dia.id && confirm('¿Eliminar rutina del día ' + dia.dia + '?')) {
      this.rutinaService.delete(dia.id).subscribe({
        next: () => {
          const index = this.diasSemana.findIndex(d => d.dia === dia.dia);
          if (index !== -1) {
            this.diasSemana[index] = { ...this.diasSemana[index], id: undefined, descripcion: '', enfoque: '', cardio: false };
          }
        },
        error: (err) => this.mostrarError(err)
      });
    }
  }

  cancelarEdicion(): void {
    this.rutinaEditable = null;
    this.mostrarFormulario = false;
  }

  private mostrarError(err: any): void {
    console.error(err);
    alert(err.error?.message || 'Error en la operación');
  }
}
