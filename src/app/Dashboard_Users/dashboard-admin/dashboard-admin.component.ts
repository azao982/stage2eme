import { AuthService } from 'src/app/Service/auth.service';
import { StorageService } from './../../Service/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Classes/user';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  user: User | null = null;  // Remarque ici pour le type User ou null
  selectedUser : User | undefined ;
  searchKeyword: string='';
  searchResults: User[] = [];
  userForm : FormGroup;
  formulaire : boolean=false;

constructor(private userService : UserService, private AuthService : AuthService, private storageService : StorageService  ,private fb: FormBuilder, private router : Router ,private route : ActivatedRoute){}

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

    modifierUser(idUser : number) : void {
      this.router.navigate(['/modifierUser' ,idUser]);
    }
    detailUser(idUser : number) : void{
      this.router.navigate(['/detailUser', idUser]);
    }
    logout() {
      this.storageService.clean();
      window.location.reload(); // Recharger la page après la déconnexion
    }
    

}
