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
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'dashboard/calendar', 
    component: CalendarComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'dashboard/diario', 
    component: DiarioComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'dashboard/nutrition', 
    component: NutritionComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'dashboard/objetivos', 
    component: ObjetivosComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'dashboard/routine', 
    component: RoutineComponent, 
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: 'home' }

];
