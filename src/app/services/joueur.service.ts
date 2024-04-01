import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Joueur } from '../models/joueur.models';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {
  private protocole = "http";
  private serveur = "localhost:5000"
  constructor(private http:HttpClient) {}

  getJoueurs() {
    const url = `${this.protocole}://${this.serveur}/api/joueur`;
    return this.http.get<Joueur[]>(url);
  }
  
}
