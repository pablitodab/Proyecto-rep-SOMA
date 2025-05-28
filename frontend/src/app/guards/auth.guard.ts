import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  return localStorage.getItem('token') 
    ? true 
    : router.createUrlTree(['/login']);
};
