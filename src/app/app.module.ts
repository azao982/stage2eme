import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Others/navbar/navbar.component';
import { AproposComponent } from './Others/apropos/apropos.component';
import { FooterComponent } from './Others/footer/footer.component';
import { AccueilComponent } from './Others/accueil/accueil.component';
import { ErreurComponent } from './Others/erreur/erreur.component';
import { ModifierUserComponent } from './CRUD_User/modifier-user/modifier-user.component';
import { ListUserComponent } from './CRUD_User/list-user/list-user.component';
import { DetailUserComponent } from './CRUD_User/detail-user/detail-user.component';
import { DashboardAdminComponent } from './Dashboard_Users/dashboard-admin/dashboard-admin.component';
import { MailingUserComponent } from './CRUD_User/mailing-user/mailing-user.component';
import { ModifierProfilComponent } from './CRUD_User/modifier-profil/modifier-profil.component';
import { CommonModule } from '@angular/common';
import { DemandeRefuseeComponent } from './DemandesConsummer/demande-refusee/demande-refusee.component';
import { DemandeTermineeComponent } from './DemandesConsummer/demande-terminee/demande-terminee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EnvoyerMailComponent } from './Mailing/envoyer-mail/envoyer-mail.component';
import { ListMailComponent } from './Mailing/list-mail/list-mail.component';
import { ModifierPasswordComponent } from './Dashboard_Users/modifier-password/modifier-password.component';
import { HowitworkComponent } from './Others/howitwork/howitwork.component';
import { HomeserviceComponent } from './Others/homeservice/homeservice.component';
import { HeaderComponent } from './Others/header/header.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { StatCompoComponent } from './stat-compo/stat-compo.component';
import { ListDemaRefuseConsComponent } from './DemandeParConsom/list-dema-refuse-cons/list-dema-refuse-cons.component';
import { ListDemaTermineeConsComponent } from './DemandeParConsom/list-dema-terminee-cons/list-dema-terminee-cons.component';
import { ListDemaEnCoursConsComponent } from './DemandeParConsom/list-dema-en-cours-cons/list-dema-en-cours-cons.component';
import { AjouterStageComponent } from './Stage/ajouterstage/ajouterstage.component';
import { ConsulterlistestageComponent } from './Stage/consulterlistestage/consulterlistestage.component';
import { ModifierstageComponent } from './Stage/modifierstage/modifierstage.component';
import { DetailsstageComponent } from './Stage/detailsstage/detailsstage.component';
import { DetailsDemandeComponent } from './DemandeStage/details-demande/details-demande.component';
import { ListDemandesComponent } from './DemandeStage/list-demandes/list-demandes.component';
import { ValiderDem2Component } from './DemandeStage/valider-dem2/valider-dem2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AjouterDemandeStageComponent } from './DemandeStage/ajouter-demande-stage/ajouter-demande-stage.component';
import { RouterModule } from '@angular/router';
import { DemandeEnCoursComponent } from './DemandesConsummer/demande-en-cours/demande-en-cours.component';
import { DashboardEncadrantComponent } from './dashboard-encadrant/dashboard-encadrant.component';
import { ListStageConComponent } from './list-stage-con/list-stage-con.component';
import { DashboardStagiaireComponent } from './dashboard-stagiaire/dashboard-stagiaire.component';
import { ListStageEncComponent } from './list-stage-enc/list-stage-enc.component';
import { AjouterUserComponent } from './ajouter-user/ajouter-user.component';
import { EnvoyerMailUserComponent } from './envoyer-mail-user/envoyer-mail-user.component';
import { EnvoyerMailStgComponent } from './envoyer-mail-stg/envoyer-mail-stg.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConnexionComponent,
    StatCompoComponent,
    AproposComponent,
    FooterComponent,
    AccueilComponent,
    ErreurComponent,
    AjouterStageComponent,
    ConsulterlistestageComponent,
    DetailsstageComponent,
    ModifierstageComponent,
    DetailsDemandeComponent,
    ListDemandesComponent,
    ModifierUserComponent,
    ListUserComponent,
    DetailUserComponent,
    DashboardAdminComponent,
    MailingUserComponent,
    ModifierProfilComponent,
    DemandeEnCoursComponent,
    DemandeRefuseeComponent,
    DemandeTermineeComponent,
    AjouterDemandeStageComponent,
    ListMailComponent,
    ValiderDem2Component,
    EnvoyerMailComponent,
    ModifierPasswordComponent,
    HowitworkComponent,
    HomeserviceComponent,
    HeaderComponent,
    ListDemaRefuseConsComponent,
    ListDemaTermineeConsComponent,
    ListDemaEnCoursConsComponent,
    DashboardEncadrantComponent,
    ListStageConComponent,
    DashboardStagiaireComponent,
    ListStageEncComponent,
    AjouterUserComponent,
    EnvoyerMailUserComponent,
    EnvoyerMailStgComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
