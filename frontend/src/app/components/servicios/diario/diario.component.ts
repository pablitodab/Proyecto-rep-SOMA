import { Component, OnInit } from '@angular/core';
import { DiarioService } from '../../../services/diario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-diario',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css']
})
export class DiarioComponent implements OnInit {
  entradas: any[] = [];
  nuevaEntrada: any = {};

  constructor(private diarioService: DiarioService) {}

  ngOnInit() {
    this.cargarEntradas();
  }

  cargarEntradas() {
    this.diarioService.getAll().subscribe({
      next: (data) => this.entradas = data,
      error: (err) => console.error('Error:', err)
    });
  }

  agregarEntrada() {
    this.diarioService.create(this.nuevaEntrada).subscribe({
      next: () => {
        this.nuevaEntrada = {};
        this.cargarEntradas();
      },
      error: (err) => console.error('Error:', err)
    });
  }

  onSubmit() {
    this.agregarEntrada();
  }
}
