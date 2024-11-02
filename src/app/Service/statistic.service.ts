import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

export interface APICount {
  structureName: string;
  apiCount: number;
}

@Injectable({
  providedIn: 'root'
})

export class StatisticService {
  private statisticApiStructureUrl = 'http://localhost:9092/api/countApiByStructure';
  private statisticUserStructureUrl = 'http://localhost:9092/users/countUserByStructure';
  private statisticDemandeUserUrl = 'http://localhost:9092/demande/countDemandeByUser';



  constructor(private http: HttpClient) { }

  getApiStatistics(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(this.statisticApiStructureUrl);
  }
  getUserStatistics(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(this.statisticUserStructureUrl);
  }
  getDemandeStatistics(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(this.statisticDemandeUserUrl);
  }

}
