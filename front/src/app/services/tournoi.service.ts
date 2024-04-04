import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournoi } from '../models/tournoi.models';

@Injectable({
  providedIn: 'root'
})
export class TournoiService {
  private apiUrl = 'http://localhost:5000/api/tournois';

  constructor(private http: HttpClient) {}

  getTournoisDisponibles(): Observable<Tournoi[]> {
    return this.http.get<Tournoi[]>(`${this.apiUrl}`);
  }

  getTournoisInscrits(): Observable<Tournoi[]> {
    return this.http.get<Tournoi[]>(`${this.apiUrl}`);
  }
}
