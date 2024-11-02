import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MailService } from '../../Service/mail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from '../../Classes/email';

@Component({
  selector: 'app-envoyer-mail',
  templateUrl: './envoyer-mail.component.html',
  styleUrls: ['./envoyer-mail.component.css']
})
export class EnvoyerMailComponent implements OnInit {
  emailDestinataire: string = ''; // Variable pour l'adresse e-mail du destinataire
  mailForm: FormGroup;
  formData: any = {
    id: 0,
    toEmail: '',
    subject: '',
    body: '',
  };

  constructor(
    private emailService: MailService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire
    this.mailForm = this.fb.group({
      toEmail: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  
    // Récupérer l'email depuis les queryParams
    this.activatedRoute.queryParams.subscribe(params => {
      this.emailDestinataire = params['email'] || ''; // Récupérer l'e-mail du queryParam
  
      // Vérifier si un email a été trouvé et appliquer la valeur au champ 'toEmail'
      if (this.emailDestinataire) {
        this.mailForm.patchValue({
          toEmail: this.emailDestinataire // Prépoulver le champ 'toEmail'
        });
      }
    });
  
    this.getmail();
  }
  

  private getmail(): void {
    this.emailService.getListemails().subscribe(data => {
      // Logique pour gérer les mails
    });
  }

  onAjouter() {
    if (this.mailForm.valid) {
      this.formData = this.mailForm.value;
      this.emailService.addMail(this.formData).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: 'Succès !',
            text: 'Email ajouté avec succès',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/listmaile']);
            }
          });
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de l\'ajout de l\'email. Veuillez réessayer.',
            confirmButtonText: 'OK',
          });
        }
      );
    }
  }
}
