import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeStage } from 'src/app/Classes/demandeStage';
import { DemandeService } from 'src/app/Service/demande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-refusee',
  templateUrl: './demande-refusee.component.html',
  styleUrls: ['./demande-refusee.component.css']
})
export class DemandeRefuseeComponent implements OnInit {
  demandes: DemandeStage[] = [];
  searchKeyword: string = '';
  searchResults: DemandeStage[] = [];
  selectedDemande: DemandeStage | undefined;
  demandeForm: FormGroup;
  formData: any = {
    idDemande: 0,
    reference: '',
    etablissement: '',
    typeStage: '',
    dateDebut: new Date(),
    dateFin: new Date(),
    niveauEtude: '',
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
      reference: [''],
      etablissement: [''],
      dateDebut: [''],
      dateFin: [''],
      typeStage: [''],
      niveauEtude: [''],
      statut: ['']
    });
    this.getDemandes();
    this.colors = this.generateRedGradientColors('#FFE6E6', '#FF3333', 14); // Generating a palette of 14 red gradient colors
  }

  // Function to generate a gradient of red colors
  generateRedGradientColors(startColor: string, endColor: string, steps: number): string[] {
    const start = parseInt(startColor.slice(1), 16);
    const end = parseInt(endColor.slice(1), 16);

    const startR = (start >> 16) & 0xff;
    const startG = (start >> 8) & 0xff;
    const startB = start & 0xff;

    const endR = (end >> 16) & 0xff;
    const endG = (end >> 8) & 0xff;
    const endB = end & 0xff;

    const colors = [];
    for (let i = 0; i < steps; i++) {
      const r = Math.round(startR + ((endR - startR) * i) / (steps - 1));
      const g = Math.round(startG + ((endG - startG) * i) / (steps - 1));
      const b = Math.round(startB + ((endB - startB) * i) / (steps - 1));

      colors.push(`#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`);
    }

    return colors;
  }

  // Palette of colors
  colors: string[];

avatars: string[] = [



  'https://bootdey.com/img/Content/avatar/avatar6.png',





  'https://bootdey.com/img/Content/avatar/avatar4.png',
  'https://bootdey.com/img/Content/avatar/avatar5.png',
  'https://bootdey.com/img/Content/avatar/avatar3.png',
  'https://bootdey.com/img/Content/avatar/avatar2.png',

  'https://bootdey.com/img/Content/avatar/avatar8.png',
  'https://bootdey.com/img/Content/avatar/avatar1.png',
  'https://bootdey.com/img/Content/avatar/avatar7.png',



  // Ajoutez autant d'URLs d'avatar que nécessaire
];
  // Get list of demandes
  private getDemandes(): void {
    this.demandesService.getListeDemandesRef().subscribe(data => {
      this.demandes = data;
    });
  }

  // Delete demande
  supprimerDemande(idDemande: number): void {
    if (idDemande === undefined || idDemande === null) {
      console.error('ID Demande non défini');
      return;
    }

    const swalCustomClass = {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
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
    }).then(result => {
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

  // Add demande
 

  // Get color for the card based on the index
  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }

  // Navigate to modify page
  validerDemande(idDemande: number) {
    this.router.navigate(['/validerDemande', idDemande]);
  }

  // Search demande
  searchDemande(): void {
    if (!this.searchKeyword) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        color : 'red',
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
            color : 'blue' ,
            text: 'Aucune demande trouvée.',
          });
        }
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          color:'pink',
          text: 'Une erreur produite lors de la recherche de demande',
        });
      }
    );
  }




//consulter detail demande
  DetailDemande(idDemande: number): void {
    this.router.navigate(['/detailDemande' ,idDemande]);
  }
}
