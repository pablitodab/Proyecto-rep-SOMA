import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarComponent } from './components/servicios/calendar/calendar.component';
import { DiarioComponent } from './components/servicios/diario/diario.component';
import { NutritionComponent } from './components/servicios/nutrition/nutrition.component';
import { ObjetivosComponent } from './components/servicios/objetivos/objetivos.component';
import { RoutineComponent } from './components/servicios/routine/routine.component';
import { authGuard } from './guards/auth.guard'; // ✅ minúsculas
import { NotFoundComponent } from './components/not-found/not-found.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'calendar', component: CalendarComponent },
      { path: 'routine', component: RoutineComponent },
      { path: '**', redirectTo: 'calendar' }
    ]
  },
  { path: '**', component: NotFoundComponent }
];
