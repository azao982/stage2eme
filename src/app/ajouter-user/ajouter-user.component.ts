import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Profils } from '../Classes/profile';
import { AuthService } from '../Service/auth.service';
import { UserService } from '../Service/user.service';
import { MailService } from '../Service/mail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Classes/user';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-ajouter-user',
  templateUrl: './ajouter-user.component.html',
  styleUrls: ['./ajouter-user.component.css']
})
export class AjouterUserComponent {

  profiles: Profils;
  avatars: string[] = [
    'https://bootdey.com/img/Content/avatar/avatar3.png',
    'https://bootdey.com/img/Content/avatar/avatar4.png',
    'https://bootdey.com/img/Content/avatar/avatar8.png',
    'https://bootdey.com/img/Content/avatar/avatar1.png',
    'https://bootdey.com/img/Content/avatar/avatar5.png',
    'https://bootdey.com/img/Content/avatar/avatar6.png',
    
    'https://bootdey.com/img/Content/avatar/avatar7.png',
    'https://bootdey.com/img/Content/avatar/avatar2.png',
    
  ];
  users: User[] = [];
  selectedProfile: Profils | undefined;
  searchKeyword: string = '';
  searchResults: User[] = [];
  userForm: FormGroup;
  mailForm: FormGroup;
  profileOptions: string[] = Object.values(Profils);
  userColors: string[] = ['#FADBD8', '#D6EAF8', '#D5DBDB', '#FCF3CF', '#D1F2EB', '#FDEDEC'];
  userIconColors: string[] = ['#9b59b6', '#3498db', '#34495e', '#2ecc71', '#e67e22', '#f1c40f'];
  userContainerColors: string[] = ['#F5B7B1', '#AED6F1', '#ABB2B9', '#F9E79F', '#A9DFBF', '#FAD7A0'];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private emailService: MailService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mailForm = this.fb.group({
      toEmail: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      profile: ['', Validators.required],
    });
    this.getUser();
  }

  private getUser(): void {
    this.userService.getListeUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de la récupération des utilisateurs.',
        });
      }
    );
  }

  modifierUser(idUser: number): void {
    this.router.navigate(['/modifierUser', idUser]);
  }

  detailUser(idUser: number): void {
    this.router.navigate(['/detailUser', idUser]);
  }

  supprimerUser(idUser: number): void {
    if (!idUser) {
      console.error('ID utilisateur non défini');
      return;
    }

    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas récupérer cet utilisateur!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.supprimerUser(idUser).subscribe(
          () => {
            Swal.fire('Succès', 'Utilisateur supprimé avec succès', 'success');
            this.getUser(); // Recharge la liste des utilisateurs après la suppression
          },
          (error) => {
            console.error('Échec suppression utilisateur', error);
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression de l\'utilisateur', 'error');
          }
        );
      }
    });
  }
  onAjouter(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.authService.Register(formData).subscribe(
        (data) => {
          // Appeler la fonction pour envoyer l'email directement après l'ajout de l'utilisateur
          this.onEnvoyerMail(() => {
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'Utilisateur ajouté et email envoyé avec succès.',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['/listmaile']); // Redirection après l'ajout et l'envoi de l'email
            });
          });
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de User', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de l\'ajout de l\'utilisateur. Veuillez réessayer.',
            confirmButtonText: 'OK',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulaire invalide',
        text: 'Veuillez remplir tous les champs requis.',
        confirmButtonText: 'OK',
      });
    }
  }
  
  onEnvoyerMail(callback: () => void): void {
    this.mailForm.patchValue({
      toEmail: `${this.userForm.get('email').value}`,
      subject: 'Votre compte a été créé',
      body: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color: #2c3e50;">Bienvenue chez nous !</h2>
          <p>Votre compte a été créé avec succès.</p>
          <p>L'adresse email: <strong>${this.userForm.get('email').value}</strong></p>
          <p>Mot de passe: <strong>${this.userForm.get('password').value}</strong></p>
        </div>`
    });
  
    if (this.mailForm.valid) {
      const mailData = this.mailForm.value;
      this.emailService.addMail(mailData).subscribe(
        (data) => {
          callback(); // Appeler le callback après l'envoi de l'email avec succès
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de l\'email', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de l\'envoi de l\'email. Veuillez réessayer.',
            confirmButtonText: 'OK',
          });
        }
      );
    }
  }
  

  RechercherUser(): void {
    if (!this.searchKeyword) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Veuillez entrer un utilisateur à rechercher !',
      });
      return;
    }

    this.userService.searchUser(this.searchKeyword).subscribe(
      (result: User[]) => {
        this.searchResults = result;
        if (result.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: 'Aucun utilisateur trouvé.',
          });
        }
      },
      (error) => {
        console.error('Erreur lors de la recherche de l\'utilisateur', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de la recherche de l\'utilisateur.',
        });
      }
    );
  }
filtrerUser(): void {
  if (this.selectedProfile) {
    this.userService.filtrerUser(this.selectedProfile).subscribe(
      (result: User[]) => {
        this.users = result;
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors du filtrage.',
        });
      }
    );
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Profil non défini',
      text: 'Veuillez sélectionner un profil pour filtrer.',
    });
  }
}}