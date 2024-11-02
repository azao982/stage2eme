import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import Swal from 'sweetalert2';
import { StorageService } from '../Service/storage.service';
import { User } from 'src/app/Classes/user';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    localStorage.clear();
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onlog(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      // Appel à la méthode Authenticate de AuthService
      this.authService.Authenticate(formData).subscribe(
        (data: User) => {
          console.log(data);
          // Sauvegarde des données de l'utilisateur authentifié
          this.storageService.saveUser(data);

          Swal.fire({
            icon: 'success',
            title: 'Succès !',
            text: 'Utilisateur authentifié avec succès',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.handleRoleNavigation(data.profile);
            }
          });
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Échec de l\'authentification. Veuillez vérifier vos informations.',
            confirmButtonText: 'OK'
          });
        }
      );

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulaire Invalide',
        text: 'Veuillez remplir tous les champs obligatoires correctement.',
        confirmButtonText: 'OK'
      });
    }
  }
  private handleRoleNavigation(profile: string): void {
    switch (profile) {
      case 'admin':
        this.router.navigate(['/DashboardAdmine']);
        break;
      case 'encadrant':
        this.router.navigate(['/DashboardEncadrant']);
        break;
      case 'stagiaire':
        this.router.navigate(['/DashboardStagiaire']);
        break;
      default:
        break;
    }
  }
}
