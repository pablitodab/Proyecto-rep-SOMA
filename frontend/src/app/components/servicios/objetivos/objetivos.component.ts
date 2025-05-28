import { Component, OnInit } from '@angular/core';
import { ObjetivoService } from '../../../services/objetivo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-objetivos',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.css']
})
export class ObjetivosComponent implements OnInit {
  objetivos: any[] = [];
  nuevoObjetivo: any = {};

  constructor(private objetivoService: ObjetivoService) {}

  ngOnInit() {
    this.cargarObjetivos();
  }

  cargarObjetivos() {
    this.objetivoService.getAll().subscribe({
      next: (data) => this.objetivos = data,
      error: (err) => console.error('Error:', err)
    });
  }

  agregarObjetivo() {
    this.objetivoService.create(this.nuevoObjetivo).subscribe({
      next: () => {
        this.nuevoObjetivo = {};
        this.cargarObjetivos();
      },
      error: (err) => console.error('Error:', err)
    });
  }

  marcarCumplido(id: number) {
    this.objetivoService.toggleCumplido(id).subscribe({
      next: () => {
        // Actualizar localmente sin recargar
        this.objetivos = this.objetivos.map(obj => 
          obj.id === id ? {...obj, cumplido: !obj.cumplido} : obj
        );
      },
      error: (err) => console.error('Error:', err)
    });
  }

  eliminarObjetivo(id: number) {
    if(confirm('¿Estás seguro de eliminar este objetivo?')) {
      this.objetivoService.delete(id).subscribe({
        next: () => {
          this.objetivos = this.objetivos.filter(obj => obj.id !== id);
        },
        error: (err) => console.error('Error:', err)
      });
    }
  }

  // Corregido el nombre del método
  onSubmit() {
    this.agregarObjetivo();
  }
}
