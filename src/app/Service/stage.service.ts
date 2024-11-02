import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Stage } from '../Classes/stage';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  private apiUrl = 'http://localhost:9091/Stage';
  constructor(private http: HttpClient) { }

  //  add new Stage
  addStage(stage : Stage): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ajouterStage`, stage)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Une erreur s\'est produite:', error);
    return throwError('Une erreur s\'est produite. Veuillez réessayer.');
  }
  
   
  // filter stages
  filtrerStage(sujet: string): Observable<Stage[]> {
    const params = new HttpParams().set('sujet', sujet);
    return this.http.get<Stage[]>(`${this.apiUrl}/filtrerStage`, { params });
  }

  // Fetch Stage statistics
  statisticStage(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/stage/statistics`);
  }

  // afficher liste des Stages
  getListeStages(): Observable<Stage[]> {
    return this.http.get<Stage[]>(`${this.apiUrl}/consulterStages`);
  }

  // rechercher Stage
  searchStage(keyword: string): Observable<Stage[]> {
    return this.http.get<Stage[]>(`${this.apiUrl}/SearchStage?keyword=${keyword}`);
  }

  // delete Stage
  supprimerStage(idStage: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimerStage/${idStage}`);
  }

  // get Stage by id
  getById(idStage: number): Observable<Stage> {
    const url = `${this.apiUrl}/${idStage}`;
    return this.http.get<Stage>(url);
  }

  // modifier Stage
  updateStage(stage: Stage, idStage: number): Observable<void> {
    const url = `${this.apiUrl}/modifierStage/${idStage}`;
    return this.http.put<void>(url, stage);
  }
}
