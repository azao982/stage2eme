
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Email } from '../Classes/email';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MailService } from '../Service/mail.service';

@Component({
  selector: 'app-list-mail',
  templateUrl: './list-mail.component.html',
  styleUrls: ['./list-mail.component.css']
})
export class ListMailComponent {
  colors: string[] = [
    '#FF5733', // Orange
    '#FFC300', // Yellow
    '#36A2EB', // Blue
    '#4CAF50', // Green
    '#FF5733'  // Orange (repeated)
  ];

  avatars: string[] = [
    'https://bootdey.com/img/Content/avatar/avatar1.png',
    'https://bootdey.com/img/Content/avatar/avatar2.png',
    'https://bootdey.com/img/Content/avatar/avatar3.png',
    'https://bootdey.com/img/Content/avatar/avatar4.png',
    'https://bootdey.com/img/Content/avatar/avatar5.png',
    'https://bootdey.com/img/Content/avatar/avatar6.png',
    'https://bootdey.com/img/Content/avatar/avatar7.png',
    'https://bootdey.com/img/Content/avatar/avatar8.png',
    // Ajoutez autant d'URLs d'avatar que nécessaire
  ];
  mails : Email[]=[];
  mail : Email;
  selectedEmail : Email | undefined ;
  searchKeyword: string='';
  searchResults: Email[] = [];
  mailForm : FormGroup;
  formulaire : boolean=false;
formData: any = {
    id:0,
    toEmail: '',
    subject: '',
    body: '',
  };
constructor(private emailService : MailService, private fb: FormBuilder, private router : Router ,private route : ActivatedRoute){}
ngOnInit(): void {
      this.mailForm = this.fb.group({
      toEmail: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
    this.getmail();
}
userColors: string[] = ['#FADBD8', '#D6EAF8', '#D5DBDB', '#FCF3CF', '#D1F2EB', '#FDEDEC'];
userIconColors: string[] = ['#9b59b6', '#3498db', '#34495e', '#2ecc71', '#e67e22', '#f1c40f'];
userContainerColors: string[] = ['#F5B7B1', '#AED6F1', '#ABB2B9', '#F9E79F', '#A9DFBF', '#FAD7A0'];
private getmail():void{
  this.emailService.getListemails().subscribe(data => {
    this.mails=data;
  })
}


onAjouter() {
  console.log(this.mailForm.value);
  if (this.mailForm.valid) {
    this.formData = this.mailForm.value; // Obtenir les valeurs du formulaire
    this.emailService.addMail(this.formData).subscribe(
      data => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Succès !',
          color : "green",
          text: 'Email ajouté avec succès',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/listmail']);
          }
        });
      },
      error => {
        console.error('Erreur lors de l ajout d"un mail',  error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          color : "red",
          text: 'Une erreur s\'est produite lors de l\'ajout de l\"email. Veuillez réessayer.',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}

// supprimer email
supprimerEmail(id: number): void {
  if (id === undefined || id === null) {
    console.error('id email non défini');
    return;
  }
Swal.fire({
title: 'Êtes-vous sûr?',
text: 'Vous ne pourrez pas récuperer cet email !',
icon: 'warning',
showCancelButton: true,
confirmButtonText: 'Oui, supprimer!',
cancelButtonText: 'Annuler'
}).then((result) => {
if (result.isConfirmed) {
  this.emailService.supprimerMail(id).subscribe(
    () => {
      Swal.fire("Succès", "L'email supprimé avec succès", 'success');
      this.getmail();
    },
    error => {
      console.error('Échec suppression email');
      Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression de mail', 'error');
    }
  );
}
});
}



}

