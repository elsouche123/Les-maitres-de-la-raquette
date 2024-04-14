import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Inscription } from '../models/inscription.models';
import { InscriptionService } from '../services/inscription.service';
import { HttpClient } from '@angular/common/http';
import { Pays } from '../models/pays.models';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  // Déclaration des variables
  numInscriptionGenererErreur: boolean = false;
  paysListe: Pays[] = [];
  numInscriptionGenerer: string = '';
  filtrePays = new Subject<string>();
  inscriptionModel: Inscription = {
    resultat: '',
    genre: '',
    nom: '',
    prenom: '',
    dateNaissance: null,
    age: null,
    courriel: '',
    telephone: '',
    adresse: '',
    codePostale: null,
    ville: '',
    pays: '',
    numeroInscription: '',
    licence: '',
    classement: null,
    confirmation: false
  };

  constructor(private inscriptionService: InscriptionService, private http: HttpClient) {
    // Initialisation des données
    this.chargerPays();
    this.initialiserFiltrePays();
  }

  // Soumission du formulaire
  onSubmit(inscriptionForm: NgForm) {
    if (inscriptionForm.valid) {
      // Calcul de l'âge si la date de naissance est renseignée
      if (this.inscriptionModel.dateNaissance) {
        this.inscriptionModel.age = this.calculerAge(new Date(this.inscriptionModel.dateNaissance));
      }
      // Appel du service d'inscription
      this.inscriptionService.soumettreInscription(this.inscriptionModel).subscribe(
        response => {
          // Gestion de la réponse du service
          if (response.numeroInscription) {
            this.numInscriptionGenererErreur = false;
            inscriptionForm.reset();
            this.numInscriptionGenerer = response.numeroInscription;
          } else {
            this.numInscriptionGenererErreur = true;
          }
        },
        error => {
          console.error('Erreur lors de l\'inscription', error);
        }
      );
    } else {
      console.log('Formulaire invalide, soumission annulée.');
    }
  }

  // Initialisation du filtre pour la recherche des pays
  initialiserFiltrePays() {
    this.filtrePays.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(terme => terme ? this.recherchePays(terme) : this.paysListe.slice())
    ).subscribe(paysFiltres => {
      this.paysListe = paysFiltres;
    });
  }

  // Fonction de recherche des pays
  recherchePays(terme: string): Pays[] {
    return this.paysListe.filter(pays => pays.nom.toLowerCase().indexOf(terme.toLowerCase()) > -1);
  }

  // Chargement de la liste des pays depuis un fichier JSON
  chargerPays() {
    this.http.get<{ countries: { [key: string]: string } }>('assets/data/pays.json').subscribe(data => {
      this.paysListe = Object.entries(data.countries).map(([code, nom]) => ({ code, nom }));
    });
  }

  // Calcul de l'âge à partir de la date de naissance
  private calculerAge(dateNaissance: Date): number {
    const aujourdHui = new Date();
    const anneeActuelle = aujourdHui.getFullYear();
    const moisActuel = aujourdHui.getMonth();
    const jourActuel = aujourdHui.getDate();

    const anneeNaissance = dateNaissance.getFullYear();
    const moisNaissance = dateNaissance.getMonth();
    const jourNaissance = dateNaissance.getDate();

    let age = anneeActuelle - anneeNaissance;

    if (moisActuel < moisNaissance || (moisActuel === moisNaissance && jourActuel < jourNaissance)) {
      age--;
    }

    return age;
  }
}
