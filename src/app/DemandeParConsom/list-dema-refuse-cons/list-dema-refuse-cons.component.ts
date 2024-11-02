import { StorageService } from 'src/app/Service/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeService } from 'src/app/Service/demande.service';
import { DemandeStage } from 'src/app/Classes/demandeStage';

@Component({
  selector: 'app-list-dema-refuse-cons',
  templateUrl: './list-dema-refuse-cons.component.html',
  styleUrls: ['./list-dema-refuse-cons.component.css']
})
export class ListDemaRefuseConsComponent implements OnInit {
  demandes: DemandeStage[] = [];
  searchKeyword: string = '';
  searchResults: DemandeStage[] = [];
  selectedDemande: DemandeStage | undefined;
  demandeForm: FormGroup;
  idUser : number;
  formData: any = {
    idDemande: 0,
    reference: '',
    etablissemnt: '',
    typeStage: '',
    niveauEtude: '',
    dateDebut: new Date(),
    dateFin: new Date(),
   
    statut: ''
  };

  constructor(
    private demandesService: DemandeService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.idUser= this.storageService.getUser().idUser;
    this.demandeForm = this.fb.group({
      reference: [''],
      description: [''],
      etablissement: [''],
      niveauEtude: [''],
      typeStage: [''],
      dateDebut: [''],
      dateFin: [''],
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

];
  // Get list of demandes
  private getDemandes(): void {
    this.demandesService. getListeDemandesRef().subscribe(
      data => {
        // Filtrer les demandes pour n'inclure que celles avec le statut 'à_rectifier'
        this.demandes = data.filter(demande => demande.statut === 'refusée');
        console.log("demandes à rectifier", this.demandes);
      },
      error => {
        console.error("Erreur lors de la récupération des demandes", error);
      }
    );
  }


  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }

//consulter detail demande
  DetailDemande(idDemande: number): void {
    this.router.navigate(['/detailDemande' ,idDemande]);
  }
}
