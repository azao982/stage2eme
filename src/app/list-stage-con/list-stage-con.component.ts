import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Stage } from '../Classes/stage';
import { StageService } from '../Service/stage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-stage-con',
  templateUrl: './list-stage-con.component.html',
  styleUrls: ['./list-stage-con.component.css']
})
export class ListStageConComponent {
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 100;
  pages: number[] = [];
  colors: string[] = [
    '#0dcaf0', '#fd3550', '#ffc107', '#F5B7B1',
    '#D5F5E3', '#F5A9BC', '#EEE0B1', '#AED6F1', '#F5B041',
    '#DFF0D8', '#F5B7B1', '#D6EAF8', '#F6DDCC', '#ABEBC6',
    '#C8E6C9', '#AED6F1', '#FAD7A0', '#D7BDE2', '#A2D9CE'
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
  stages: Stage[] = [];
  searchKeyword: string = '';
  searchResults: Stage[] = []; // Initialisation avec un tableau vide
  selectedStage: Stage | undefined;

  constructor(private stageService: StageService, private router: Router) {}

  ngOnInit(): void {
    this.getStages();
  }

  private getStages(): void {
    this.stageService.getListeStages().subscribe(
      data => {
        console.log('Stages reçus :', data);
        this.stages = data;
      },
      error => {
        console.error("Erreur lors de la récupération des stages :", error);
        this.showErrorMessage("Erreur lors de la récupération des stages");
      }
    );
  }

  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }
  searchStage(): void {
    if (!this.searchKeyword) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Veuillez entrer une Stage à rechercher !',
      });
      return;
    }

    this.stageService.searchStage(this.searchKeyword).subscribe(
      (result: Stage[]) => {
        if (result.length !== 0) {
          this.searchResults = result;
          console.log('Résultats de la recherche :', this.searchResults);
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: 'Aucune Stage trouvée.',
          });
          this.searchResults = []; // Réinitialisation des résultats de recherche en cas de résultat vide
        }
      },
      (error) => {
        console.error('Erreur lors de la recherche d\'Stage :', error);
        this.showErrorMessage("Erreur lors de la recherche d'Stage");
      }
    );
  }

  showDetails(stage: Stage): void {
    this.selectedStage = stage;
    console.log("Détails du stage :", this.selectedStage);
  }

  ajouterDemandeStage(stage: Stage): void {
    this.selectedStage = stage;
    console.log("Ajouter demande de stage :", this.selectedStage);
    // Implémentez la logique d'ajout de demande de stage ici
  }

  filtrerStage(sujet: string): void {
    this.stageService.filtrerStage(sujet).subscribe(
      (result: Stage[]) => {
        console.log('Résultats filtrés :', result);
        this.stages = result;
      },
      error => {
        console.error('Erreur lors du filtrage des stages :', error);
        this.showErrorMessage("Erreur lors du filtrage des stages");
      }
    );
  }

  onStageSelected(stage: any) {
    this.selectedStage = stage;
    console.log("Stage sélectionnée :", this.selectedStage);
  }
  supprimerStage(idStage: number): void {
    if (!idStage) {
      console.error("L'ID du stage est indéfini.");
      return;
    }
  
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment supprimer cet stage ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('ID de l\'Stage à supprimer :', idStage);
  
        this.stageService.supprimerStage(idStage).subscribe(
          () => {
  
            this.getStages();
            this.showSuccessMessage('L\'Stage a été supprimée.');
          },
          error => {
            console.error('Échec de la suppression du stage:', error);
            this.showErrorMessage('Une erreur s\'est produite lors de la suppression du stage.');
          }
        );
      }
    });
  }
  
  private showSuccessMessage(message: string): void {
    Swal.fire('Supprimé!', message, 'success');
  }
  
  private showErrorMessage(message: string): void {
    Swal.fire('Erreur', message, 'error');
  }
  
    redirigerVersPagemodifier(idStage:number){
    this.router.navigate(['/modifierStage',idStage]);
    }
    redirigerVersPageajoute(){
      this.router.navigate(['/Stage'])
    }
    ajouterNouvelStage(){
      this.router.navigate(["/Stage"]);
    }
}