import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService {
  constructor(private router: Router) { }
  canActivate(): boolean {
    const userProfil = localStorage.getItem('profile');
    if (userProfil && userProfil === 'admin') {
      return true;
    } else {
      this.router.navigate(['/connexion']);
      return false;
    }
  }
}
