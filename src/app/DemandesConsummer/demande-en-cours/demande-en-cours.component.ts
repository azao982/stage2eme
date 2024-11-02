import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeStage } from 'src/app/Classes/demandeStage';
import { Status } from 'src/app/Classes/status';
import { DemandeService } from 'src/app/Service/demande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-en-cours',
  templateUrl: './demande-en-cours.component.html',
  styleUrls: ['./demande-en-cours.component.css']
})
export class DemandeEnCoursComponent{

   lightYellowColors = [
    '#FFFFF0', // Ivory

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
  demandes: DemandeStage[] = [];
  searchKeyword: string = '';
  searchResults: DemandeStage[] = [];
  Demande:DemandeStage;
  selectedDemande:  DemandeStage | undefined;
  demandeForm : FormGroup;
  formulaire : boolean=false;
  formData: DemandeStage = {
    idDemande: 0,
    reference: '',
    dateDebut: new Date(),
    dateFin: new Date(),
    typeStage: '',
    statut: Status.en_cours,
    niveauEtude: '',
    etablissement: ''
  };

  constructor(private demandesService: DemandeService, private fb : FormBuilder,private router: Router, private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.demandeForm = this.fb.group({
      reference: [''],
      etablissement: [''],
      typeStage: [''],
      dateDebut: [''],
      dateFin: [''],
      niveauEtude: [''],
      statut:['en_cours']
    });
    this.getDemandes();
  }


// get liste des demandes
  private getDemandes(): void{
    this.demandesService.getListeDemandesEncoursCons().subscribe(data => {
        this.demandes=data;
    });
  }
//lette de couleurs
getColor(index: number): string {
  return this.lightYellowColors[index % this.lightYellowColors.length];
}
// diriger vers page modifier
validerDemande(idDemande:number){
  this.router.navigate(['/validerDemande2',idDemande]);
  }
  // rechercher demande
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
