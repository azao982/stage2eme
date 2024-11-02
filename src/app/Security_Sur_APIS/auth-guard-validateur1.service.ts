import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardValidateur1Service {
  constructor(private router: Router) { }
  canActivate(): boolean {
    const userProfil = localStorage.getItem('profile');
    if (userProfil && userProfil === 'validateur_1er_niveau') {
      return true;
    } else {
      this.router.navigate(['/connexion']);
      return false;
    }
  }
}
