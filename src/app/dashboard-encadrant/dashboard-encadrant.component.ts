import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Service/user.service';
import { User } from '../Classes/user';
import { StorageService } from '../Service/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-dashboard-encadrant',
  templateUrl: './dashboard-encadrant.component.html',
  styleUrls: ['./dashboard-encadrant.component.css']
})
export class DashboardEncadrantComponent {
  user: User | null = null;  // Remarque ici pour le type User ou null
  selectedUser : User | undefined ;
  searchKeyword: string='';
  searchResults: User[] = [];
  userForm : FormGroup;
  formulaire : boolean=false;

constructor(private userService : UserService, private authService :AuthService,private storageService : StorageService  ,private fb: FormBuilder, private router : Router ,private route : ActivatedRoute){}

// get all users
ngOnInit(): void {
      this.userForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      cnrps: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      grade: ['', [Validators.required]],
      fonction: ['', [Validators.required]],
    });
    this.getAdmin();
    this.user = this.storageService.getUser();

  }
    private getAdmin():void{
      this.user = this.storageService.getUser();
    }
    modifierProfil(idUser : number) : void {
      this.router.navigate(['/modifierProfil' ,idUser]);
    }
    detailUser(idUser : number) : void{
      this.router.navigate(['/detailUser', idUser]);
    }
    VoirList(){
      this.router.navigate(["/listStageEn"])
    }
    EnvoyerMail(){
      this.router.navigate(["/envoyerMailUser"])

    }
    logout() {
      this.storageService.clean();
      window.location.reload(); // Recharger la page après la déconnexion
    }
}
