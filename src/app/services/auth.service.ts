import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private users: any[] = [];
  private currentUserKey = 'currentUser';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.users = JSON.parse(localStorage.getItem('users') || '[]');
    }
  }

  login(email: string, password: string): Observable<any[]> {
    const found = this.users.filter(
      u => u.email === email && u.password === password
    );
    if (found.length) this.setUser(found[0]);
    return of(found);
  }

  signup(user: any): Observable<any> {
    user.id = Date.now();
    this.users.push(user);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
    return of(user);
  }

  setUser(user: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    }
  }

  getUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(this.currentUserKey) || 'null');
    }
    return null;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.currentUserKey);
    }
  }

  getUserByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }

  updatePassword(id: number, newPassword: string) {
    const user = this.users.find(u => u.id === id);
    if (user) user.password = newPassword;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }
}
