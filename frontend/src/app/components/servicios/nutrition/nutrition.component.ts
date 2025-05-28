import { Component, OnInit } from '@angular/core';
import { NutricionService } from '../../../services/nutricion.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-nutrition',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})
export class NutritionComponent implements OnInit {
  registros: any[] = [];
  nuevoRegistro: any = {};

  constructor(private nutricionService: NutricionService) {}

  ngOnInit() {
    this.cargarRegistros();
  }

  cargarRegistros() {
    this.nutricionService.getAll().subscribe({
      next: (data) => this.registros = data,
      error: (err) => console.error('Error:', err)
    });
  }

  agregarRegistro() {
    this.nutricionService.create(this.nuevoRegistro).subscribe({
      next: () => {
        this.nuevoRegistro = {};
        this.cargarRegistros();
      },
      error: (err) => console.error('Error:', err)
    });
  }

  onSubmit() {
    this.agregarRegistro();
  }
}
