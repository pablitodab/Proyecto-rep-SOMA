import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DiarioService } from '../../../services/diario.service';
import { AuthService } from '../../../services/auth.service';
import { EntradaDiario } from '../../../models/diario.model';

@Component({
  selector: 'app-diario',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
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

  private cargarEntradas() {
    this.diarioService.getAll().subscribe({
      next: (data) => this.entradas = data,
      error: (err) => console.error('Error cargando entradas:', err)
    });
  }

  onSubmit() {
    if (this.entradaEditando) {
      this.actualizarEntrada();
    } else {
      this.crearEntrada();
    }
  }

  private crearEntrada() {
    this.diarioService.create(this.nuevaEntrada).subscribe({
      next: () => {
        this.resetFormulario();
        this.cargarEntradas();
      },
      error: (err) => console.error('Error creando entrada:', err)
    });
  }

  private actualizarEntrada() {
    if (!this.entradaEditando?.id) return;
    
    this.diarioService.update(this.entradaEditando.id, this.nuevaEntrada).subscribe({
      next: () => {
        this.resetFormulario();
        this.cargarEntradas();
      },
      error: (err) => console.error('Error actualizando entrada:', err)
    });
  }

  editarEntrada(entrada: EntradaDiario) {
    this.entradaEditando = entrada;
    this.nuevaEntrada = { 
      titulo: entrada.titulo,
      fecha: entrada.fecha,
      texto: entrada.texto
    };
  }

  eliminarEntrada(id: number) {
    if (confirm('¿Eliminar esta entrada?')) {
      this.diarioService.delete(id).subscribe({
        next: () => this.cargarEntradas(),
        error: (err) => console.error('Error eliminando entrada:', err)
      });
    }
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
