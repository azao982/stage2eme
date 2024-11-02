import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../Classes/user';
import { Profils } from '../Classes/profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:9091/users';

  constructor(private http: HttpClient) { }
  //  add new USER
addUser(user : User): Observable<any> {
  return this.http.post<any>(`${this.userUrl}/ajouterUser`, user)
    .pipe(
      catchError(this.handleError)
    );
}
private handleError(error: HttpErrorResponse): Observable<never> {
  console.error('Une erreur s\'est produite:', error);
  return throwError('Une erreur s\'est produite. Veuillez réessayer.');
}

//afficher liste des Users
  getListeUsers():Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/consulterUsers`);
  }
  // rechercher User
   searchUser(keyword: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/rechercherUser?keyword=${keyword}`);
  }
// delete User
  supprimerUser(idUser: number): Observable<void> {
    return this.http.delete<void>(`${this.userUrl}/supprimerUser/${idUser}`);
  }

// get User by id
  getById(idUser: number): Observable<User> {
    const url = `${this.userUrl}/${idUser}`;
    return this.http.get<User>(url);
  }

// get User by cin
getByCin(cin : string): Observable<User> {
  const url = `${this.userUrl}/user/${cin}`;
  return this.http.get<User>(url);
}
// get User by email
getByEmail(email : string): Observable<User> {
  const url = `${this.userUrl}/users/${email}`;
  return this.http.get<User>(url);
}
  // modifier User
  modifierUser(user: User, idUser: number): Observable<void> {
    const url = `${this.userUrl}/modifierUser/${idUser}`;
    return this.http.put<void>(url, user).pipe(
      catchError((error :  any)=> {
        console.log(error);
    throw error;
   })
    );
  }

// filtrer user
    filtrerUser(profile: Profils): Observable<User[]> {
      const url = `${this.userUrl}/filtrerUser?profile=${profile}`;
      return this.http.get<User[]>(url);
    }


}
