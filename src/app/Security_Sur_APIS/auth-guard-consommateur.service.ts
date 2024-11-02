import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardConsommateurService {
  constructor(private router: Router) { }
  canActivate(): boolean {
    const userProfil = localStorage.getItem('profile');
    if (userProfil && userProfil === 'consommateur') {
      return true;
    } else {
      this.router.navigate(['/connexion']);
      return false;
    }
  }
}
