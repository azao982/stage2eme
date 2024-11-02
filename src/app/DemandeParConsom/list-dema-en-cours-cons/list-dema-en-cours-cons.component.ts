import { StorageService } from 'src/app/Service/storage.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeService } from 'src/app/Service/demande.service';
import Swal from 'sweetalert2';
import { DemandeStage } from 'src/app/Classes/demandeStage';
import { Status } from 'src/app/Classes/status';

@Component({
  selector: 'app-list-dema-en-cours-cons',
  templateUrl: './list-dema-en-cours-cons.component.html',
  styleUrls: ['./list-dema-en-cours-cons.component.css']
})
export class ListDemaEnCoursConsComponent {


  lightGreenColors = [
    '#e0f7e9', // Very light green
    '#c8efd4', // Lighter green
    '#a0e5bb', // Light green
    '#78dba3', // Soft green
    '#50d18a', // Bright green
    '#28c871', // Vivid green
    '#00be59'  // Strong green
  ];
avatars: string[] = [

  'https://bootdey.com/img/Content/avatar/avatar4.png',
  'https://bootdey.com/img/Content/avatar/avatar8.png',
  'https://bootdey.com/img/Content/avatar/avatar5.png',
  'https://bootdey.com/img/Content/avatar/avatar6.png',
  'https://bootdey.com/img/Content/avatar/avatar7.png',
  'https://bootdey.com/img/Content/avatar/avatar1.png',
  'https://bootdey.com/img/Content/avatar/avatar2.png',
  'https://bootdey.com/img/Content/avatar/avatar3.png',
  // Ajoutez autant d'URLs d'avatar que nécessaire
];
  demandes: DemandeStage[] = [];
  searchKeyword: string = '';
  searchResults: DemandeStage[] = [];
  Demande:DemandeStage;
  selectedDemande:  DemandeStage | undefined;
  demandeForm : FormGroup;
  formulaire : boolean=false;
  idUser : number;
  formData: DemandeStage = {
    idDemande: 0,
    reference: '',
    statut: Status.en_cours,
    typeStage: '',
    niveauEtude: '',
    etablissement: '',
    dateDebut: undefined,
    dateFin: undefined
  };

  constructor(private demandesService: DemandeService,private storageService: StorageService, private fb : FormBuilder,private router: Router
    , private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.idUser= this.storageService.getUser().idUser;
    this.demandeForm = this.fb.group({
      reference: [''],
      etablissement: [''],
      niveauEtude: [''],
      typeStage: [''],
      dateDebut: [''],
      dateFin: [''],
      statut:['en_cours']
    });
    this.getDemandes();
  }
// get liste des demandes
private getDemandes(): void {
  this.demandesService. getListeDemandesEncoursCons().subscribe(
    data => {
      // Filtrer les demandes pour n'inclure que celles avec le statut 'à_rectifier'
      this.demandes = data.filter(demande => demande.statut == 'en_cours');
      console.log("demandes en cours consommateur", this.demandes);
    },
    error => {
      console.error("Erreur lors de la récupération des demandes", error);
    }
  );
}


//lette de couleurs
getColor(index: number): string {
  return this.lightGreenColors[index % this.lightGreenColors.length];
}

//consulter detail demande
  DetailDemande(idDemande: number): void {
    this.router.navigate(['/detailDemande' ,idDemande]);
  }

}
