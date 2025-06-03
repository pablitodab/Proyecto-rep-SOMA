import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  { 
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  // Rutas de servicios como rutas independientes
  { 
    path: 'calendar',
    loadComponent: () => import('./components/servicios/calendar/calendar.component').then(m => m.CalendarComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'diario',
    loadComponent: () => import('./components/servicios/diario/diario.component').then(m => m.DiarioComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'nutricion',
    loadComponent: () => import('./components/servicios/nutrition/nutrition.component').then(m => m.NutritionComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'objetivos',
    loadComponent: () => import('./components/servicios/objetivos/objetivos.component').then(m => m.ObjetivosComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'routine',
    loadComponent: () => import('./components/servicios/routine/routine.component').then(m => m.RoutineComponent),
    canActivate: [authGuard]
  },
  { 
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
