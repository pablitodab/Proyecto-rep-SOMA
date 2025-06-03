import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly router = inject(Router);

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token && this.isTokenValid(token) ? token : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private isTokenValid(token: string): boolean {
    const payload = this.decodeTokenPayload(token);
    return payload?.exp ? payload.exp * 1000 > Date.now() : false;
  }

  clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login'], { 
      queryParams: { sessionEnded: true },
      onSameUrlNavigation: 'reload'
    });
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login'], { 
      replaceUrl: true,
      queryParams: { sessionEnded: true }
      });
  }


  getUsername(): string {
    const payload = this.getTokenPayload();
    return payload?.name || payload?.username || '';
  }

  getUserEmail(): string {
    return this.getTokenPayload()?.email || '';
  }

  getUserId(): number {
    return this.getTokenPayload()?.userId || 0;
  }

  private getTokenPayload(): any {
    const token = this.getToken();
    return token ? this.decodeTokenPayload(token) : null;
  }

  private decodeTokenPayload(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error decodificando token:', e);
      return null;
    }
  }
}
