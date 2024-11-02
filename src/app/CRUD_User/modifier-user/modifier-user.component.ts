import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Profils } from 'src/app/Classes/profile';

@Component({
  selector: 'app-modifier-user',
  templateUrl: './modifier-user.component.html',
  styleUrls: ['./modifier-user.component.css']
})
export class ModifierUserComponent {
  constructor(
    private UserService: UserService, 
    private location: Location, 
    private ActivatedRoute: ActivatedRoute, 
    private Router: Router
  ) {}

  profileOptions: string[] = [];
  auth: boolean = false;
  data: any;
  idUser: number;

  mailingUser(idUser: number) {
    this.Router.navigate(['/mailingUser', idUser]);
  }

  ngOnInit(): void {
    const idUser: any = this.ActivatedRoute.snapshot.paramMap.get('idUser');
    this.loadUser(idUser); // Charger l'utilisateur
  }

  user: any = {
    idUser: '',
    email: '',
    nom: '',
    prenom: '',
    cin: '',
    mobile: '',
    password: '',
    profile: ''
  };

  // Charger l'utilisateur
  loadUser(idUser: any): void {
    this.UserService.getById(idUser).subscribe(user => {
      this.user = user;
      this.profileOptions = Object.values(Profils);
    });
  }

  // Modifier user
  modifierUser(): void {
    const idUser: any = this.ActivatedRoute.snapshot.paramMap.get('idUser');
    this.UserService.modifierUser(this.user, idUser).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Succès !',
          color: 'Green',
          text: 'L\'utilisateur a été modifié avec succès !',
          confirmButtonText: 'OK',
        }).then(() => {
          // Recharger les données de l'utilisateur après modification
          this.loadUser(idUser);
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops !',
          color: 'red',
          text: 'Une erreur lors de la modification de l\'utilisateur. Merci de réessayer plus tard.',
          confirmButtonText: 'OK',
        });
        console.error('Erreur lors de la modification de l\'utilisateur : ', error);
      }
    );
  }

  retour() {
    // Rediriger vers la page d'accueil
    this.Router.navigate(['/accueil']);
  }
}
