import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournoi } from '../models/tournoi.models';

@Injectable({
  providedIn: 'root'
})
export class TournoiService {
  private protocole = "http";
  private serveur = "localhost:5000";

  constructor(private http: HttpClient) {} // Injection du HttpClient pour les requêtes HTTP
  // Récupère la liste des tournois depuis le backend
  getTournois(): Observable<Tournoi[]> {
    const url = `${this.protocole}://${this.serveur}/api/tournoi`;
    return this.http.get<Tournoi[]>(url);
  }
}
