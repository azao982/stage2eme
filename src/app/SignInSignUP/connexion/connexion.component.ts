import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
//   loginForm: FormGroup;
//   errorMessage: string = '';

//   constructor(private fb: FormBuilder,private adminService:AdminService, private router: Router) {}

//   ngOnInit(): void {
//     this.initLoginForm();
//   }
//   initLoginForm(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required]],
//       password: ['', Validators.required],
//     });
//   }
//   loginAdmin() {
//     this.adminService.loginAdmin(this.loginForm.value).subscribe(
//       (data) => {
//         // Gestionnaire de réussite
//         console.log('Login réussi', data);
//         this.router.navigate(['/List'])

//         // Ajoutez ici le code que vous souhaitez exécuter en cas de succès du login
//         // Par exemple, rediriger vers une autre page, stocker des informations dans le stockage local, etc.
//       },
//       (error) => {
//         // Gestionnaire d'erreur
//        alert('Verifier vos coordonnées !!!');

//         // Ajoutez ici le code pour gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur
//       },
//       () => {
//         // Gestionnaire de complétion
//         console.log('Login complété');

//         // Ajoutez ici le code qui doit être exécuté une fois que la requête est terminée, qu'elle soit réussie ou non
//       }
//     );
//   }

//
}
