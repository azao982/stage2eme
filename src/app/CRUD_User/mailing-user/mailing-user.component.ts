import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Classes/user';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-mailing-user',
  templateUrl: './mailing-user.component.html',
  styleUrls: ['./mailing-user.component.css']
})
export class MailingUserComponent implements OnInit {
  currentDateTime: string;
  currentDateTimeAdd: string;
  users : User []= [];
  searchResults: User[] = [];


  constructor(private UserService : UserService,private ActivatedRoute: ActivatedRoute, private Router:Router) {}
    ngOnInit() : void{
      const idUser:any=this.ActivatedRoute.snapshot.paramMap.get('idUser');
      this.getUser(idUser);
      this.updateDateTime();
      this.updateDateTimeAdd();
      this.getUsers();

    }

    user:any={
      email:'',
      nom:'',
      prenom:'',
      cin:'',
      mobile:"",
      grade:'',
      fonction:"",
      cnrps:'',
      password:'',
      profile : '',
    }
    // get liste des users
private getUsers():void{
  this.UserService.getListeUsers().subscribe(data => {
    this.users=data;
  })
}
private getUser(idUser : number) : void{
      this.UserService.getById(idUser).subscribe(
        user => {
          this.user=user;
      })
    }
// la fonction qui me donne l heure systeme
updateDateTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  this.currentDateTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  setTimeout(() => {
    this.updateDateTime();
  }, 60000);
}
  // FCT qui me donne l heure avec 4 hers de plus
  updateDateTimeAdd() {
    const now = new Date();
    let  hours = now.getHours() + 4;

    if(hours >= 24) {
      hours -= 24;
      now.setDate(now.getDate() + 1);
    }

    const minutes = now.getMinutes();

    this.currentDateTimeAdd = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  setTimeout(() => {
    this.updateDateTimeAdd();
  }, 60000);}

  // la fonction qui me donne la date systeme
  getDateSysteme(): string {
    const dateSysteme = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return dateSysteme.toLocaleDateString('fr-FR', options); // Changer 'fr-FR' selon votre localisation
  }


  }
