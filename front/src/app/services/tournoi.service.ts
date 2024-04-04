import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Tournoi} from "../models/tournoi.models";
import {Joueur} from "../models/joueur.models";

@Injectable({
  providedIn: 'root'
})
export class TournoiService {
  private protocole = "http";
  private serveur = "localhost:5000";
  private api: string = "/api"

  constructor(private http: HttpClient) {} // Injection du HttpClient pour les requêtes HTTP

  // Récupère la liste des tournois depuis le backend
  getTournois(): Observable<Tournoi[]> {
    const url = `${this.protocole}://${this.serveur}${this.api}/tournois`;
    return this.http.get<Tournoi[]>(url);
  }

  // Méthode pour récupérer les détails du joueur par numéro de joueur
  getJoueurByNumero(numero: string): Observable<Joueur[]> {
    const url = `${this.protocole}://${this.serveur}${this.api}/joueur/INS/${numero}`;
    return this.http.get<Joueur[]>(url);
  }

  // Méthode pour récupérer les tournois ouverts
  getTournoisOuverts(): Observable<Tournoi[]> {
    const url = `${this.protocole}://${this.serveur}${this.api}/tournois?statut=true`;
    return this.http.get<Tournoi[]>(url);
  }
}
