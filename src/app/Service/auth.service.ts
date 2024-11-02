import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../Classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userUrl = 'http://localhost:9091/api/v1/auth';

  constructor(private http: HttpClient) { }
  Register(user: User): Observable<any> {
    return this.http.post<any>(`${this.userUrl}/register`, user)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Une erreur s\'est produite:', error);
    return throwError('Une erreur s\'est produite. Veuillez réessayer.');
  }

  Authenticate(user: { email: string; password: string; }): Observable<User> {
    return this.http.post<User>(`${this.userUrl}/authenticate`, user);
  }


  logout(): Observable<any> {
    return this.http.post(`${this.userUrl}/logout`,{});
  }

}

