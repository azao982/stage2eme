import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeService } from 'src/app/Service/demande.service';
import { StageService } from 'src/app/Service/stage.service';
import { StorageService } from 'src/app/Service/storage.service';

@Component({
  selector: 'app-ajouter-demande-stage',
  templateUrl: './ajouter-demande-stage.component.html',
  styleUrls: ['./ajouter-demande-stage.component.css']
})
export class AjouterDemandeStageComponent implements OnInit {
  @Input() selectedStage: any;
  idUser: number;
  demandeForm: FormGroup;

  constructor(
    private demandeService: DemandeService,
    private fb: FormBuilder,
    private router: Router,
    private stageService: StageService,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.idUser = this.storageService.getUser()?.idUser; // Assurez-vous que getUser() retourne un objet avec une propriété idUser
    this.demandeForm = this.fb.group({
      reference: ['', Validators.required],
      typeStage: ['', Validators.required],
      niveauEtude: ['', Validators.required],
      etablissement: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      statut: ['en_cours', Validators.required]
    });
  }

  onAjouter(): void {
    if (this.demandeForm.valid) {
      this.demandeService.addDemande(this.idUser, this.demandeForm.value).subscribe(
        data => {
          console.log(data);
          Swal.fire({
            iconHtml: '<i class="fas fa-check-circle"></i>',
            title: 'Succès',
            text: 'La demande a été ajoutée avec succès',
            confirmButtonText: 'OK'
          });
          // Réinitialiser le formulaire après l'ajout réussi
          this.demandeForm.reset();
        },
        error => {
          console.error('Erreur lors de l\'ajout de la demande:', error);
          // Afficher une notification d'erreur
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout de la demande. Veuillez réessayer.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs de validation
      this.demandeForm.markAllAsTouched();
      // Afficher une notification d'erreur si le formulaire est invalide
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Le formulaire n\'est pas valide',
        confirmButtonText: 'OK'
      });
    }
  }

  retourPagePrecedente(): void {
    this.router.navigate(['/listconsummer']);
  }
}
