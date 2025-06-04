import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiarioService } from '../../../services/diario.service';
import { AuthService } from '../../../services/auth.service';
import { EntradaDiario } from '../../../models/diario.model';

@Component({
  selector: 'app-diario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css']
})
export class DiarioComponent implements OnInit {
  entradas: EntradaDiario[] = [];
  nuevaEntrada: Omit<EntradaDiario, 'userId'> = {
    titulo: '',
    fecha: new Date().toISOString().split('T')[0],
    texto: ''
  };
  entradaEditando: EntradaDiario | null = null;

  constructor(
    private diarioService: DiarioService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.cargarEntradas();
  }

  trackByFn(index: number, item: EntradaDiario): number {
    return item.id || index;
  }

  private cargarEntradas() {
    this.diarioService.getAll().subscribe({
      next: (res) => this.entradas = res,
      error: (err) => console.error('Error cargando entradas:', err)
    });
  }

  onSubmit() {
    if (!this.nuevaEntrada.titulo.trim() || !this.nuevaEntrada.texto.trim()) {
      alert('Título y contenido son obligatorios');
      return;
    }
    if (this.entradaEditando) {
      this.actualizarEntrada();
    } else {
      this.crearEntrada();
    }
  }

  crearEntrada() {
    this.diarioService.create(this.nuevaEntrada).subscribe({
      next: () => {
        this.resetFormulario();
        this.cargarEntradas();
      },
      error: (err) => console.error('Error creando entrada:', err)
    });
  }

  actualizarEntrada() {
    if (!this.entradaEditando?.id) return;
    this.diarioService.update(this.entradaEditando.id, this.nuevaEntrada).subscribe({
      next: () => {
        this.resetFormulario();
        this.cargarEntradas();
      },
      error: (err) => console.error('Error actualizando entrada:', err)
    });
  }

eliminarEntrada(id: number) {
  console.log('=== DEBUG ELIMINAR ===');
  console.log('ID recibido:', id);
  console.log('Tipo de ID:', typeof id);
  console.log('ID válido:', !!id);
  
  if (!id) {
    console.error('ID no válido');
    return;
  }
  
  if (confirm('¿Eliminar esta entrada?')) {
    console.log('Usuario confirmó eliminación');
    this.diarioService.delete(id).subscribe({
      next: (res) => {
        console.log('Respuesta del servidor:', res);
        this.cargarEntradas();
      },
      error: (err) => {
        console.error('Error completo:', err);
        console.error('Status:', err.status);
        console.error('Mensaje:', err.message);
      }
    });
  }
}


  editarEntrada(entrada: EntradaDiario) {
    this.entradaEditando = entrada;
    this.nuevaEntrada = { 
      titulo: entrada.titulo,
      fecha: entrada.fecha,
      texto: entrada.texto
    };
  }

  public resetFormulario() {
    this.nuevaEntrada = {
      titulo: '',
      fecha: new Date().toISOString().split('T')[0],
      texto: ''
    };
    this.entradaEditando = null;
  }
}
