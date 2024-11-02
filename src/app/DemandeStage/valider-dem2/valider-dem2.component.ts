import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DemandeService } from '../../Service/demande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from 'src/app/Classes/status';
import { Email } from 'src/app/Classes/email';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { MailService } from 'src/app/Service/mail.service';

@Component({
  selector: 'app-valider-dem2',
  templateUrl: './valider-dem2.component.html',
  styleUrls: ['./valider-dem2.component.css']
})
export class ValiderDem2Component implements OnInit {
  mails: Email[] = [];
  mail: Email;
  selectedEmail: Email | undefined;
  searchKeyword: string = '';
  searchResults: Email[] = [];
  mailForm: FormGroup;
  formulaire: boolean = false;
  formData: any = {
    id: 0,
    toEmail: '',
    subject: '',
    body: '',
  };

  constructor(
    private demandeService: DemandeService,
    private emailService: MailService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  statusOptions: string[] = [];

  ngOnInit(): void {
    this.mailForm = this.fb.group({
      toEmail: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
    this.getMail();
  }

  // Couleurs pour les icônes et les conteneurs
  userColors: string[] = ['#FADBD8', '#D6EAF8', '#D5DBDB', '#FCF3CF', '#D1F2EB', '#FDEDEC'];
  userIconColors: string[] = ['#9b59b6', '#3498db', '#34495e', '#2ecc71', '#e67e22', '#f1c40f'];
  userContainerColors: string[] = ['#F5B7B1', '#AED6F1', '#ABB2B9', '#F9E79F', '#A9DFBF', '#FAD7A0'];

  private getMail(): void {
    this.emailService.getListemails().subscribe(data => {
      this.mails = data;
    });

    const idDemande: any = this.activatedRoute.snapshot.paramMap.get('idDemande');
    this.demandeService.getById(idDemande).subscribe(demande => {
      this.statusOptions = Object.values(Status).filter(status =>
        status === Status.acceptée || status === Status.refusée || status === Status.en_cours
      );

      this.demande = demande;
      this.demande.dateDebut = new Date(demande.dateDebut).toISOString().split('T')[0];
      this.demande.dateFin = new Date(demande.dateFin).toISOString().split('T')[0];
    });
  }

  demande: any = {
    idDemande: 0,
    typeStage: "",
    reference: "",
    niveauEtude: "",
    etablissement: 0,
    dateDebut: "",
    dateFin: "",
    statut: Status.en_cours,
  };
  accepterDemande() {
    Swal.fire({
      icon: 'question',
      title: 'Voulez-vous vraiment accepter cette demande?',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandeService.updateDemande(this.demande, this.demande.idDemande).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Demande acceptée!',
            text: 'La demande a été acceptée avec succès!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            showCancelButton: true,
            cancelButtonText: 'Envoyer Mail',
            cancelButtonColor: '#007bff'
          }).then((result) => {
            if (result.isDismissed) {
              const modalElement = document.getElementById('user-form-modal');
              const modal = new bootstrap.Modal(modalElement);
              modal.show();
            } else {
              this.router.navigate(['/DashboardAdmine']);
            }
          });
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Une erreur s\'est produite lors de l\'acceptation de la demande.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
        });
      }
    });
  }

  onEnvoyerMail() {
    this.mailForm.patchValue({
      subject: this.mailForm.get('subject').value + '\n\n Statut demande ',
      body: `<div style="font-family: Arial, sans-serif;">
          <h2 style="color: #2c3e50;">Statut actuelle de la demande</h2>
          <p>Référence de la demande: <strong>${this.demande.reference}</strong></p>
          <p>Statut: <span style="color: ${this.demande.statut === 'terminée' ? 'green' : 'red'};">
            <i class="fa ${this.demande.statut === 'acceptée' ? 'fa-check-circle' : 'fa-times-circle'}"></i>
            ${this.demande.statut}</span></p></div>`
    });

    if (this.mailForm.valid) {
      this.formData = this.mailForm.value;
      this.emailService.addMail(this.formData).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: 'Succès !',
            color: 'green',
            text: data,  // Utilisez la réponse texte ici
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/listmail']);
            }
          });
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            color: 'red',
            text: 'Une erreur s\'est produite lors de l\'ajout de l\'email. Veuillez réessayer.',
            confirmButtonText: 'OK',
          });
        }
      );
    }
  }

  refuserDemande() {
    Swal.fire({
      icon: 'question',
      title: 'Voulez-vous vraiment refuser cette demande?',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandeService.updateDemande(this.demande, this.demande.idDemande).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Demande refusée!',
            text: 'La demande a été refusée avec succès!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            showCancelButton: true,
            cancelButtonText: 'Envoyer Mail',
            cancelButtonColor: '#007bff'
          }).then((result) => {
            if (result.isDismissed) {
              const modalElement = document.getElementById('user-form-modal');
              const modal = new bootstrap.Modal(modalElement);
              modal.show();
            } else {
              this.router.navigate(['/DashboardAdmine']);
            }
          });
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Une erreur s\'est produite lors du refus de la demande.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
        });
      }
    });
  }
}
