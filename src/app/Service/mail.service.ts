import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Email } from '../Classes/email';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private mailUrl = 'http://localhost:9091/mails';
  constructor(private http: HttpClient) { }

 // ajouter email
  addMail(emailData: any): Observable<any> {
    return this.http.post<any>(`${this.mailUrl}/sendEmail`, emailData).pipe(
      catchError(this.handleError)
    );
  }

  envoyerPass(mail : Email): Observable<any> {
    return this.http.post<any>(`${this.mailUrl}/sendPass`, mail)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Une erreur s\'est produite:', error);
    return throwError('Une erreur s\'est produite. Veuillez réessayer.');
  }


  // consulter liste des emails
  getListemails():Observable<Email[]> {
    return this.http.get<Email[]>(`${this.mailUrl}/consulterMails`);
  }
// supprimer email
  supprimerMail(id : number): Observable<void>{
    return this.http.delete<void>(`${this.mailUrl}/supprimerEmail/${id}`);
  }

// get Email by id
  getEmailById(id : number): Observable<Email>{
    return this.http.get<Email>(`${this.mailUrl}/${id}`)
  }
}
