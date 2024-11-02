import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:9092';

  constructor(private http:HttpClient) { }

  loginAdmin(user: any): Observable<any> {
    const url = `${this.apiUrl}/users/signin`;
    return this.http.post(url, user);
  }
}
