import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournoi } from '../models/tournoi.models';

@Injectable({
  providedIn: 'root'
})
export class ClassementService {
 private protocole = "http";
  private serveur = "localhost:5000";
  private api: string = "/api"


  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les tournois fermés
  getTournoisFermes(): Observable<Tournoi[]> {
    return this.http.get<Tournoi[]>(`${this.protocole}://${this.serveur}${this.api}/tournois/false`);
  }

  // Ajoutez d'autres méthodes selon les besoins
}
