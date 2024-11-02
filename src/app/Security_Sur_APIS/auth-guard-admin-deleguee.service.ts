import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminDelegueeService {
  constructor(private router: Router) { }
  canActivate(): boolean {
    const userProfil = localStorage.getItem('profile');
    if (userProfil && userProfil === 'admin_delegue') {
      return true;
    } else {
      this.router.navigate(['/connexion']);
      return false;
    }
  }
}
