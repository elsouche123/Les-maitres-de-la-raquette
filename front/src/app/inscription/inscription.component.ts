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
  messageSucces: string = '';
  messageErreur: string = '';
  estDejaInscrit: boolean = false;
  paysListe: Pays[] = [];
  filtrePays = new Subject<string>();
  inscriptionModel: Inscription = {
    resultat: '',
    genre: '',
    nom: '',
    prenom: '',
    dateNaissance: null,
    age: null, // L'âge sera calculé, donc initialisé à null
    courriel: '',
    telephone: '',
    adresse: '',
    codePostale: null,
    ville: '',
    pays: '',
    numeroInscription: '', // Assurez-vous que ce champ est conforme à votre logique côté serveur
    licence: '',
    classement: null,
    confirmation: false
  };

  constructor(private inscriptionService: InscriptionService, private http: HttpClient) {
    this.chargerPays();
    this.initialiserFiltrePays();
  }

  onSubmit(inscriptionForm: NgForm) {
    if (inscriptionForm.valid) {
      if (this.inscriptionModel.dateNaissance) {
        this.inscriptionModel.age = this.calculerAge(new Date(this.inscriptionModel.dateNaissance));
      }
      this.inscriptionService.soumettreInscription(this.inscriptionModel).subscribe(
        response => {
          console.log('Inscription réussie', response);
          // Adaptation de la logique en fonction de la réponse de l'API
          if (response.resultat === 'Joueur ajouté avec succès') {
            this.messageSucces = `Bravo ${this.inscriptionModel.prenom}, tu es inscrit!`;
            this.messageErreur = '';
            this.estDejaInscrit = false;
          } else if (response.resultat === 'Joueur déjà inscrit') {
            this.messageErreur = `Tu es déjà inscrit dans la liste des joueurs, ${this.inscriptionModel.prenom}. Tu peux aller voir la liste des matchs!`;
            this.messageSucces = '';
            this.estDejaInscrit = true;
          }
          // Réinitialisation du formulaire ou redirection de l'utilisateur
          inscriptionForm.reset();
        },
        error => {
          console.error('Erreur lors de l\'inscription', error);
        }
      );
    }
  }

  initialiserFiltrePays() {
    this.filtrePays.pipe(
      debounceTime(200), // Attendre pour les frappes de touche
      distinctUntilChanged(), // Ignorer si la recherche est la même que la dernière
      map(terme => terme ? this.recherchePays(terme) : this.paysListe.slice())
    ).subscribe(paysFiltres => {
      this.paysListe = paysFiltres;
    });
  }

  recherchePays(terme: string): Pays[] {
    return this.paysListe.filter(pays => pays.nom.toLowerCase().indexOf(terme.toLowerCase()) > -1);
  }

  chargerPays() {
    this.http.get<{countries: {[key: string]: string}}>('assets/data/pays.json').subscribe(data => {
      this.paysListe = Object.entries(data.countries).map(([code, nom]) => ({code, nom}));
    });
  }


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
