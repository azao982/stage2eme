import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StageService } from 'src/app/Service/stage.service';
import { StorageService } from 'src/app/Service/storage.service';

@Component({
  selector: 'app-ajouterstage',
  templateUrl: './ajouterstage.component.html',
  styleUrls: ['./ajouterstage.component.css']
})
export class AjouterStageComponent implements OnInit {
  stageForm: FormGroup;
  formulaire: boolean = false;
  id: any;

  constructor(
    private stageService: StageService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.stageForm = this.fb.group({
      sujet: ['', [Validators.required, Validators.minLength(3)]],
      dateDebut: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      dateFin: ['', [Validators.required]],
      departement: ['', [Validators.required]],
      montant: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  onAjouter(): void {
    if (this.stageForm.valid) {
      const stageData = this.stageForm.value;
      console.log("Stage data", stageData);  // Vérifiez les données ici
  
      this.stageService.addStage(stageData).subscribe(
        response => {
          console.log('Stage ajouté avec succès:', response);
          Swal.fire({
            icon: 'success',
            title: 'Succès !',
            text: 'Stage ajouté avec succès',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/listStages']);
            }
          });
        },
        error => {
          console.error('Erreur lors de l\'ajout du stage', error);
          let errorMessage = 'Une erreur s\'est produite lors de l\'ajout du stage. Veuillez réessayer.';
          if (error.status === 400) {
            errorMessage = 'Requête incorrecte. Veuillez vérifier les données saisies.';
          }
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: errorMessage,
            confirmButtonText: 'OK',
          });
        }
      );
    } else {
      console.error('Formulaire invalide ou incomplet');
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs requis.',
        confirmButtonText: 'OK',
      });
    }
  }
}  