import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DemandeService } from 'src/app/Service/demande.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeStage } from 'src/app/Classes/demandeStage';
import { Status } from 'src/app/Classes/status';

@Component({
  selector: 'app-list-demandes',
  templateUrl: './list-demandes.component.html',
  styleUrls: ['./list-demandes.component.css']
})
export class ListDemandesComponent implements OnInit {
  pastelColors: string[] = [
    '#B3E5FC', // Bleu clair pastel
    '#F8BBD0', // Rose pastel
    '#FFE0B2', // Orange clair pastel
    '#FFCCBC', // Orange clair pastel
    '#C5CAE9', // Indigo clair pastel
    '#DCEDC8', // Vert clair pastel
    '#C5CAE9', // Indigo clair pastel
    '#B3E5FC', // Bleu clair pastel
    '#F0F4C3', // Jaune pastel
  ];
  avatars: string[] = [
    'https://bootdey.com/img/Content/avatar/avatar1.png',
    'https://bootdey.com/img/Content/avatar/avatar7.png',
    'https://bootdey.com/img/Content/avatar/avatar8.png',
    'https://bootdey.com/img/Content/avatar/avatar3.png',
    'https://bootdey.com/img/Content/avatar/avatar4.png',
    'https://bootdey.com/img/Content/avatar/avatar5.png',
    'https://bootdey.com/img/Content/avatar/avatar6.png',
    'https://bootdey.com/img/Content/avatar/avatar7.png',
    // Ajoutez autant d'URLs d'avatar que nécessaire
  ];

  demandes: DemandeStage[] = [];
  searchKeyword: string = '';
  searchResults: DemandeStage[] = [];
  demande: DemandeStage;
  selectedDemande: DemandeStage | undefined;
  demandeForm: FormGroup;
  formulaire: boolean = false;
  selectedStatut: Status | undefined;

  formData: any = {
    idDemande: 0,
    typeStage: '',
    reference: '',
    niveauEtude: '',
    etablissement: 0,
    dateDebut: new Date(),
    dateFin: new Date(),
    statut: ''
  };

  constructor(
    private demandesService: DemandeService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.demandeForm = this.fb.group({
      idDemande: [''],
      typeStage: [''],
      reference: [''],
      niveauEtude: [''],
      etablissement: [''],
      dateDebut: [''],
      dateFin: [''],
      statut: ['']
    });
    this.getDemandes();
  }

  getColor(index: number): string {
    return this.pastelColors[index % this.pastelColors.length];
  }

  private getDemandes(): void {
    this.demandesService.getListeDemandes().subscribe(data => {
      this.demandes = data;
    });
  }

  supprimerDemande(idDemande: number): void {
    if (idDemande === undefined || idDemande === null) {
      console.error('ID Demande non défini');
      return;
    }

    const swalCustomClass = {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-success',
      popup: 'swal2-popup-custom',
      title: 'swal2-title-custom',
      htmlContainer: 'swal2-html-container-custom'
    };

    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas récupérer cette demande !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
      customClass: swalCustomClass
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandesService.supprimerDemande(idDemande).subscribe(
          () => {
            Swal.fire('Succès', 'demande supprimée avec succès', 'success');
            this.getDemandes();
          },
          error => {
            console.error('Échec suppression demande');
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression de la demande', 'error');
          }
        );
      }
    });
  }

  modifierDemande(idDemande: number): void {
    this.router.navigate(['/modifierDemande', idDemande]);
  }

  searchDemande(): void {
    if (!this.searchKeyword) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        color: 'red',
        text: 'Veuillez entrer une demande à rechercher !',
      });
      return;
    }

    this.demandesService.searchDemande(this.searchKeyword).subscribe(
      (result: DemandeStage[]) => {
        console.log(result);
        this.searchResults = result;
        if (result.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'Information',
            color: 'blue',
            text: 'Aucune demande trouvée.',
          });
        }
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          color: 'pink',
          text: 'Une erreur s\'est produite lors de la recherche de demande',
        });
      }
    );
  }

  DetailDemande(idDemande: number): void {
    this.router.navigate(['/detailDemande', idDemande]);
  }

  private showErrorMessage(message: string): void {
    Swal.fire('Erreur', message, 'error');
  }

  filtrerDemande(nomapp: string): void {
    this.demandesService.filtrerDemande(nomapp).subscribe(
      (result: DemandeStage[]) => {
        console.log('Résultats filtrés :', result);
        this.demandes = result;
        console.log(result);
      },
      error => {
        console.error('Erreur lors du filtrage :', error);
        this.showErrorMessage("erreur lors du filtrage");
      }
    );
  }
}
