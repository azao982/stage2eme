import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from 'src/app/Classes/email';
import { MailService } from 'src/app/Service/mail.service';
import { UserService } from 'src/app/Service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  mails: Email[] = [];
  mail: Email;
  mailForm: FormGroup;
  user: any = {
    email: '',
    nom: '',
    prenom: '',
    cin: '',
    mobile: "",
    password: '',
    profile: '',
  };

  constructor(
    private UserService: UserService,
    private fb: FormBuilder,
    private ActivatedRoute: ActivatedRoute,
    private emailService: MailService,
    private Router: Router
  ) {}

  ngOnInit(): void {
    const idUser: any = this.ActivatedRoute.snapshot.paramMap.get('idUser');
    this.getUser(idUser);
    this.mailForm = this.fb.group({
      toEmail: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });
    this.getMail();
  }

  private getMail(): void {
    this.emailService.getListemails().subscribe(data => {
      this.mails = data;
    });
  }

  private getUser(idUser: number): void {
    this.UserService.getById(idUser).subscribe(user => {
      this.user = user;
    });
  }

  supprimerUser(idUser: number): void {
    if (idUser === undefined || idUser === null) {
      alert("ID utilisateur indéfini");
      return;
    }

    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas récupérer cet utilisateur!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.UserService.supprimerUser(idUser).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Succès!',
              text: 'L\'utilisateur a été supprimé avec succès.',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            }).then(() => {
              this.Router.navigate(['/listUser']);
            });
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur!',
              text: 'Échec de la suppression de l\'utilisateur. Veuillez réessayer.',
              confirmButtonColor: '#d33',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }
 onEnvoyerMail(): void {
  this.Router.navigate(['/envoyerMail'], { queryParams: { email: this.user.email } });

    this.mailForm.patchValue({
      toEmail: this.user.email,
      subject: 'Votre compte a été créé',
      body: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color: #2c3e50;">Bienvenue chez nous !</h2>
          <p>Votre compte a été créé avec succès.</p>
          <p>L'adresse email: <strong>${this.user.email}</strong></p>
          <p>Mot de passe: <strong>${this.user.password}</strong></p>
        </div>`
    });
  }
  modifierUser(idUser: number): void {
    this.Router.navigate(['/modifierUser', idUser]);
  }
  

  onRetour(): void {
    this.Router.navigate(['/listUser']);
  }
}
