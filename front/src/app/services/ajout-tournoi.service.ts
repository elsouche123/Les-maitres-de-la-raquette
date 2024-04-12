import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tournoi } from '../models/tournoi.models';
import {Calcule} from "../models/calcule.models";

@Injectable({
  providedIn: 'root'
})
export class AjoutTournoiService {
  private protocole = "http";
  private serveur = "localhost:5000";
  private api: string = "/api"

  constructor(private http: HttpClient) {}

  // Poste les données du formulaire d'ajout d'un tournoi
  soumettreTournois(tournoiData: Tournoi) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.protocole}://${this.serveur}${this.api}/tournois/`;
    return this.http.post<Tournoi>(url, tournoiData,{ headers: headers });
  }

  getDureeTournois(maxParticipants: number, nbTable: number){
    const url = `${this.protocole}://${this.serveur}${this.api}/calcule/mele_general/max_temps/${maxParticipants}/${nbTable}`;
    return this.http.get<Calcule>(url);
  }

}
