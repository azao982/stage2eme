import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AproposComponent } from './Others/apropos/apropos.component';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AccueilComponent } from './Others/accueil/accueil.component';
import { ErreurComponent } from './Others/erreur/erreur.component';
import { FooterComponent } from './Others/footer/footer.component';
import { ModifierUserComponent } from './CRUD_User/modifier-user/modifier-user.component';
import { ListUserComponent } from './CRUD_User/list-user/list-user.component';
import { DetailUserComponent } from './CRUD_User/detail-user/detail-user.component';
import { MailingUserComponent } from './CRUD_User/mailing-user/mailing-user.component';
import { DashboardAdminComponent } from './Dashboard_Users/dashboard-admin/dashboard-admin.component';
import { ModifierProfilComponent } from './CRUD_User/modifier-profil/modifier-profil.component';
import { DemandeRefuseeComponent } from './DemandesConsummer/demande-refusee/demande-refusee.component';
import { DemandeTermineeComponent } from './DemandesConsummer/demande-terminee/demande-terminee.component';
import { NgFor } from '@angular/common';
import { StatCompoComponent } from './stat-compo/stat-compo.component';
import { EnvoyerMailComponent } from './Mailing/envoyer-mail/envoyer-mail.component';
import { ListMailComponent } from './Mailing/list-mail/list-mail.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ModifierPasswordComponent } from './Dashboard_Users/modifier-password/modifier-password.component';
import { AppComponent } from './app.component';
import { HowitworkComponent } from './Others/howitwork/howitwork.component';
import { AuthGuardValidateur1Service } from './Security_Sur_APIS/auth-guard-validateur1.service';
import { AuthGuardValidateur2Service } from './Security_Sur_APIS/auth-guard-validateur2.service';
import { AuthGuardConsommateurService } from './Security_Sur_APIS/auth-guard-consommateur.service';
import { AuthGuardAdminService } from './Security_Sur_APIS/auth-guard-admin.service';
import { AuthGuardAdminDelegueeService } from './Security_Sur_APIS/auth-guard-admin-deleguee.service';
import { ListDemaEnCoursConsComponent } from './DemandeParConsom/list-dema-en-cours-cons/list-dema-en-cours-cons.component';
import { ListDemaTermineeConsComponent } from './DemandeParConsom/list-dema-terminee-cons/list-dema-terminee-cons.component';
import { ListDemaRefuseConsComponent } from './DemandeParConsom/list-dema-refuse-cons/list-dema-refuse-cons.component';
import { AjouterStageComponent } from './Stage/ajouterstage/ajouterstage.component';
import { ConsulterlistestageComponent } from './Stage/consulterlistestage/consulterlistestage.component';
import { ModifierstageComponent } from './Stage/modifierstage/modifierstage.component';
import { DetailsstageComponent } from './Stage/detailsstage/detailsstage.component';
import { ListDemandesComponent } from './DemandeStage/list-demandes/list-demandes.component';
import { DetailsDemandeComponent } from './DemandeStage/details-demande/details-demande.component';
import { ValiderDem2Component } from './DemandeStage/valider-dem2/valider-dem2.component';
import { AjouterDemandeStageComponent } from './DemandeStage/ajouter-demande-stage/ajouter-demande-stage.component';
import { DemandeEnCoursComponent } from './DemandesConsummer/demande-en-cours/demande-en-cours.component';
import { DashboardEncadrantComponent } from './dashboard-encadrant/dashboard-encadrant.component';
import { ListStageConComponent } from './list-stage-con/list-stage-con.component';
import { ListStageEncComponent } from './list-stage-enc/list-stage-enc.component';
import { DashboardStagiaireComponent } from './dashboard-stagiaire/dashboard-stagiaire.component';
import { AjouterUserComponent } from './ajouter-user/ajouter-user.component';
import { EnvoyerMailUserComponent } from './envoyer-mail-user/envoyer-mail-user.component';
const routes: Routes = [

  // list demandes par consommateur
  {path:'listDemEnCoursCons', title:'listDemEnCoursCons', component:ListDemaEnCoursConsComponent},
  {path:'listDemRefuseeCons', title:'listDemARefuseeCons', component:ListDemaRefuseConsComponent},
  {path:'listDemTermineeCons', title:'listDemTermineeCons', component:ListDemaTermineeConsComponent},



  // CRUDS Users done
  {path:'modifierProfil/:idUser', title:'modifierProfil/:idUser', component:ModifierProfilComponent},
  {path:'modifierUser/:idUser', title:'modifierUser/:idUser', component:ModifierUserComponent},
//  {path:'modifierUser/:idUser', title:'modifierUser/:idUser', component:ModifierUserComponent , canActivate:[AuthGuardAdminService]},

  {path:'modifierPassword/:idUser', title:'modifierPassword/:idUser', component:ModifierPasswordComponent},

  // {path:'listUser', title:'listUser', component:ListUserComponent},
  // {path: 'detailUser/:idUser',title:"detailUser", component:DetailUserComponent },
 {path:'listUser', title:'listUser', component:ListUserComponent},
  {path: 'detailUser/:idUser',title:"detailUser", component:DetailUserComponent },

  // Mailing
  {path: 'mailingUser/:idUser',title:"mailingUser", component:MailingUserComponent},
  // {path:'listmail',title:"listmail",component:ListMailComponent },
  {path:'listmaile',title:"listmail",component:ListMailComponent},

  {path:'envoyerMail',title:"envoyerMail",component:EnvoyerMailComponent},
  {path:'envoyerMailUser',title:"envoyerMailUser",component:EnvoyerMailUserComponent},


  // Dashboard Users
  // { path: 'DashboardAdmine',title:"DashboardAdmin", component:DashboardAdminComponent},
  // { path: 'DashboardAdminDeleguee',title:"DashboardAdminDeleguee", component:DashboardAdminDelegueComponent},
  // { path: 'DashboardConsommateur', title:"DashboardConsommateur", component:DashboardConsumerComponent},
  // { path: 'DashboardValid1',title:"DashboardValid1", component:DashboardValidateur1Component},
  // { path: 'DashboardValid2',title:"DashboardValid2", component:DashboardValidateur2Component},

  { path: 'DashboardAdmine',title:"DashboardAdmin", component:DashboardAdminComponent},
  { path: 'DashboardEncadrant',title:"DashboardEncadrant", component:DashboardEncadrantComponent},
  { path: 'DashboardStagiaire',title:"DashboardStagiaire", component:DashboardStagiaireComponent},



  // CRUDS APIS
  { path:'Stage',title:"ajouterStage",component:AjouterStageComponent},
  { path:'listStage',title:"listStage",component:ConsulterlistestageComponent},
  { path:'listStageCon',title:"listStageCon",component:ListStageConComponent},
  { path:'listStageEn',title:"listStageEn",component:ListStageEncComponent},


  // { path:'listApiConsummer',title:"listApiConsummer",component:ListApiConsumerComponent },
  // { path: 'modifierApi/:idApi',title:"modifierApi/:idApi", component:ModifierapiComponent},

   { path: 'modifierStage/:idStage',title:"modifierStage/:idStage", component:ModifierstageComponent},

  { path: 'detailsApi',title:"detailsApi", component:DetailsstageComponent},

  // CRUDS Structure

  // CRUDS Demandes done
  { path:'listDemande',title:"listDemande",component:ListDemandesComponent},
  //{ path: 'rectifierDemande/:idDemande',title:"rectifierDemande", component:RectifierDemandeComponent},

  { path: 'detailDemande/:idDemande',title:"detailsDemande/:idDemande", component:DetailsDemandeComponent},

  { path: 'validerDemande2/:idDemande',title:"validerDemande2/:idDemande", component:ValiderDem2Component},
  { path:'demandeEnCours',title:"DemandeEnCours",component:DemandeEnCoursComponent},
  { path:'demandeRefusees',title:"DemandeRefusees",component:DemandeRefuseeComponent},
  { path:'demandeTerminee',title:"DemandeTerminee",component:DemandeTermineeComponent},
  { path:'ajouterDemande',title:"ajouterDemande",component:AjouterDemandeStageComponent},
  { path:'ajouterUser',title:"ajouterUser",component:AjouterUserComponent},

  // Statistics
   { path:'statistic',title:"statistic",component:StatCompoComponent},
  //  { path:'statistic',title:"statistic",component:StatCompoComponent},

  { path:'app', component:AppComponent},
  // other Paths
  { path : 'howitwork', component : HowitworkComponent},
  { path:'accueil',title:"accueil" ,component:AccueilComponent},
  { path:'connexion',title:"connexion" ,component: ConnexionComponent  },
  { path:'footer',title:"footer" ,component:FooterComponent },
  { path:'apropos',title:"apropos",component:AproposComponent},
  { path:'',title:"Vide" ,component: AccueilComponent },
  { path:'**',title:"Erreur" ,component: ErreurComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ReactiveFormsModule,
  BrowserModule,


  ],
  exports: [RouterModule],

})
export class AppRoutingModule {
 }
