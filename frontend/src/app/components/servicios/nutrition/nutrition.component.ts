import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NutricionService } from '../../../services/nutricion.service';

interface RegistroNutricion {
  id?: number;
  fecha: string;
  calorias_ingeridas: number;
  calorias_gastadas: number;
  km_caminados: number;
  cardioDesc?: string;
  tiempoCardio?: number;
  distanciaCardio?: number;
  carbohidratos?: number;
  proteinas?: number;
  grasas?: number;
}

@Component({
  selector: 'app-nutrition',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})
export class NutritionComponent implements OnInit {
  registros: RegistroNutricion[] = [];
  nuevoRegistro: RegistroNutricion = this.crearRegistroVacio();
  editando = false;
  registroEditId?: number;

  constructor(private nutricionService: NutricionService) {}

  ngOnInit(): void {
    this.cargarRegistros();
  }

  cargarRegistros(): void {
    this.nutricionService.getAll().subscribe({
      next: (data) => this.registros = data,
      error: (err) => this.mostrarError(err)
    });
  }

  agregarRegistro(): void {
    if (this.editando && this.registroEditId) {
      this.nutricionService.update(this.registroEditId, this.nuevoRegistro)
        .subscribe({
          next: () => this.resetFormulario(),
          error: (err) => this.mostrarError(err)
        });
    } else {
      this.nutricionService.create(this.nuevoRegistro)
        .subscribe({
          next: () => this.resetFormulario(),
          error: (err) => this.mostrarError(err)
        });
    }
  }

  editarRegistro(registro: RegistroNutricion): void {
    this.editando = true;
    this.registroEditId = registro.id;
    this.nuevoRegistro = { ...registro };
  }

  eliminarRegistro(id: number): void {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
      this.nutricionService.delete(id).subscribe({
        next: () => this.cargarRegistros(),
        error: (err) => this.mostrarError(err)
      });
    }
  }

  esFormularioValido(): boolean {
    return this.nuevoRegistro.fecha !== '' && 
           this.nuevoRegistro.calorias_ingeridas >= 0 &&
           this.nuevoRegistro.calorias_gastadas >= 0;
  }

  private crearRegistroVacio(): RegistroNutricion {
    return {
      fecha: new Date().toISOString().split('T')[0],
      calorias_ingeridas: 0,
      calorias_gastadas: 0,
      km_caminados: 0,
      cardioDesc: '',
      tiempoCardio: 0,
      distanciaCardio: 0,
      carbohidratos: 0,
      proteinas: 0,
      grasas: 0
    };
  }

  private resetFormulario(): void {
    this.nuevoRegistro = this.crearRegistroVacio();
    this.editando = false;
    this.registroEditId = undefined;
    this.cargarRegistros();
  }

  private mostrarError(err: any): void {
    console.error(err);
    alert(err.error?.message || 'Error en la operación');
  }
}
