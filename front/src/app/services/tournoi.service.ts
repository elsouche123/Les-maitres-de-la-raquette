import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { Match, Tournoi } from "../models/tournoi.models";
import { Joueur } from "../models/joueur.models";

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
  const url = `${this.protocole}://${this.serveur}${this.api}/tournois/`;
  return this.http.get<Tournoi[]>(url);
 }

 // Méthode pour récupérer les détails du joueur par numéro de joueur
 getJoueurByNumero(numero: string): Observable<Joueur[]> {
  const url = `${this.protocole}://${this.serveur}${this.api}/joueur/INS/${numero}`;
  return this.http.get<Joueur[]>(url);
 }

 // Récupère les tournois ouverts depuis le backend
 getTournoisOuverts(): Observable<Tournoi[]> {
  const url = `${this.protocole}://${this.serveur}${this.api}/tournois/true`;
  return this.http.get<Tournoi[]>(url).pipe(
    catchError((error) => {
      console.error('Erreur lors de la récupération des tournois ouverts:', error);
      return throwError(error); // Propage l'erreur
    })
  );
 }

 // Récupère les tournois fermés depuis le backend
 getTournoisFermes(): Observable<Tournoi[]> {
  const url = `${this.protocole}://${this.serveur}${this.api}/tournois/false`;
  return this.http.get<Tournoi[]>(url).pipe(
    catchError((error) => {
      console.error('Erreur lors de la récupération des tournois fermés:', error);
      return throwError(error); // Propage l'erreur
    })
  );
 }

 // Récupère les tournois d'un joueur depuis le backend
 getTournoisJoueur(numero: string): Observable<Tournoi[]> {
  const url = `${this.protocole}://${this.serveur}${this.api}/tournois/tournois_joueur/${numero}`;
  return this.http.get<Tournoi[]>(url).pipe(
    catchError((error) => {
      console.error('Erreur lors de la récupération des tournois du joueur:', error);
      return throwError(error); // Propage l'erreur
    })
  );
 }

 // Ajoute un joueur à un tournoi sur le backend
 ajouterJoueurTournoi(idTournoi: string, joueurData: { numeroInscription: string, nom: string, prenom: string }): Observable<{ messages: string[] }> {
  const url = `${this.protocole}://${this.serveur}${this.api}/tournois/ajouter/${idTournoi}`;
  return this.http.put<{ messages: string[] }>(url, joueurData);
 }

 // Supprime un joueur d'un tournoi sur le backend
 supprimerJoueurTournoi(idTournoi: string, numeroInscription: string): Observable<{ messages: string[] }> {
  const url = `${this.protocole}://${this.serveur}${this.api}/tournois/supprimer/${idTournoi}`;
  const data = { numeroInscription };
  return this.http.put<{ messages: string[] }>(url, data);
 }
}
