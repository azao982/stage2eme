import { Injectable } from '@angular/core';
import { Profils } from '../Classes/profile';
import { User } from '../Classes/user'; // Importer le type User

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveUser(user: User): void {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    const user = window.localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  clean(): void {
    window.localStorage.removeItem(USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  isAdminLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.profile === Profils.admin;
  }

  isEncadrantLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.profile === Profils.encadrant;
  }

  isStagiaireLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.profile === Profils.stagiaire;
  }
}
