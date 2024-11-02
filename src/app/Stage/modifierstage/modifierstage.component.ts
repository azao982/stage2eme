import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StageService } from 'src/app/Service/stage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifierstage',
  templateUrl: './modifierstage.component.html',
  styleUrls: ['./modifierstage.component.css']
})
export class ModifierstageComponent implements OnInit {
 constructor(private stageService: StageService, private activatedRoute: ActivatedRoute,private router:Router) {}
  ngOnInit(): void {
    const idStage : any = this.activatedRoute.snapshot.paramMap.get('idStage');
    this.stageService.getById(idStage).subscribe(stage => {
      this.stage = stage;
    });
  }

 //appel de la classe api
 stage: any = {
    idStage : 0,
    sujet :'',
    dateDebut : '',
    dateFin : '',
    description : '',
    montant : '',
    departement : '',
   
 };

 modifierStage() {
  console.log('Form Data:', this.stage);
  this.stageService.updateStage(this.stage, this.stage.idStage).subscribe(() => {
    Swal.fire({
      icon: 'success',
      title: 'stage modifiée avec succès!',
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      this.router.navigate(['/listStageCon']);
    });
  }, error => {
    console.error('Erreur lors de la modification du stage :', error);
    Swal.fire({
      icon: 'error',
      color:'red',
      title: 'Erreur lors de la modification du stage',
      text: 'Une erreur est survenue. Veuillez réessayer.'
    });
  });
}

 formData(arg0: string, formData: any) {
   throw new Error('Method not implemented.');
 }
}
