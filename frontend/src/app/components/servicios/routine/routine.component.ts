import { Component, OnInit } from '@angular/core';
import { RutinaService } from '../../../services/rutina.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent implements OnInit {
  rutinas: any[] = [];
  nuevaRutina: any = {};

  constructor(private rutinaService: RutinaService) {}

  ngOnInit() {
    this.cargarRutinas();
  }

  cargarRutinas() {
    this.rutinaService.getAll().subscribe({
      next: (data) => this.rutinas = data,
      error: (err) => console.error('Error:', err)
    });
  }

  agregarRutina() {
    this.rutinaService.create(this.nuevaRutina).subscribe({
      next: () => {
        this.nuevaRutina = {};
        this.cargarRutinas();
      },
      error: (err) => console.error('Error:', err)
    });
  }

  onSubmit() {
    this.agregarRutina();
  }
}
