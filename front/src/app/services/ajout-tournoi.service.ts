import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tournoi } from '../models/tournoi.models';
import { Calcule } from "../models/calcule.models";

@Injectable({
  providedIn: 'root'
})
export class AjoutTournoiService {
  private protocole = "http";
  private serveur = "localhost:5000";
  private api: string = "/api"

  constructor(private http: HttpClient) {}

  // Envoie les données du formulaire d'ajout d'un tournoi au serveur
  soumettreTournois(tournoiData: Tournoi) {
    // Définition des en-têtes pour la requête HTTP
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // Construction de l'URL d'API pour l'ajout d'un tournoi
    const url = `${this.protocole}://${this.serveur}${this.api}/tournois/`;
    // Envoi de la requête HTTP POST avec les données du tournoi
    return this.http.post<Tournoi>(url, tournoiData, { headers: headers });
  }

  // Récupère la durée estimée du tournoi en fonction du nombre maximal de participants et du nombre de tables
  getDureeTournois(maxParticipants: number, nbTable: number) {
    // Construction de l'URL d'API pour le calcul de la durée du tournoi
    const url = `${this.protocole}://${this.serveur}${this.api}/calcule/mele_general/max_temps/${maxParticipants}/${nbTable}`;
    // Envoi de la requête HTTP GET pour obtenir la durée estimée du tournoi
    return this.http.get<Calcule>(url);
  }
}
