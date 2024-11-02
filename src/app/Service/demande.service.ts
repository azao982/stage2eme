import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DemandeStage } from '../Classes/demandeStage';
@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private demandeUrl = 'http://localhost:9091/demande';
  constructor(private http: HttpClient) { }

  //  add new Demande
addDemande( idUser : number,demande : DemandeStage): Observable<any> {
  return this.http.post<any>(`${this.demandeUrl}/ajouterDemStage?idUser=` +idUser, demande)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
  console.error('Une erreur s\'est produite:', error);
  return throwError('Une erreur s\'est produite. Veuillez réessayer.');
  }

//afficher liste des Demandes par user
getListeDemandesByUser(idUser : number):Observable<DemandeStage[]> {
  return this.http.get<DemandeStage[]>(`${this.demandeUrl}/consulterDemandeParUser?idUser=`+ idUser);
}c

//afficher liste des Demandes
  getListeDemandes():Observable<DemandeStage[]> {
    return this.http.get<DemandeStage[]>(`${this.demandeUrl}/consulterDemandesStages`);
  }
  getListeDemandesTermin():Observable<DemandeStage[]> {
    return this.http.get<DemandeStage[]>(`${this.demandeUrl}/consulterlistAccept`);
  }
  getListeDemandesEncoursCons():Observable<DemandeStage[]> {
    return this.http.get<DemandeStage[]>(`${this.demandeUrl}/consulterlistEncours`);
    }
    getListeDemandesRef():Observable<DemandeStage[]> {
      return this.http.get<DemandeStage[]>(`${this.demandeUrl}/consulterlistRefusées`);
      }
      

  // rechercher Demande
  searchDemande(keyword: string): Observable<DemandeStage[]> {
    return this.http.get<DemandeStage[]>(`${this.demandeUrl}/rechercherDemande?keyword=${keyword}`);
  }



// delete Demande
  supprimerDemande(idDemande: number): Observable<void> {
    return this.http.delete<void>(`${this.demandeUrl}/supprimerDemStage/${idDemande}`);
  }

// get Demande by id
  getById(idDemande: number): Observable<DemandeStage> {
    const url = `${this.demandeUrl}/${idDemande}`;
    return this.http.get<DemandeStage>(url);
  }


  // modifier Demande
  updateDemande(demande: DemandeStage, idDemande: number): Observable<void> {
    const url = `${this.demandeUrl}/modifierDemStage/${idDemande}`;
    return this.http.put<void>(url, demande);
  }

  // filtrer demande
  filtrerDemande(etablissement: string): Observable<DemandeStage[]> {
    const params = new HttpParams().set('etablissement', etablissement);
    return this.http.get<DemandeStage[]>(`${this.demandeUrl}/filtrerDemande`, { params });
  }


}
