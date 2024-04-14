import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AjoutTournoiService } from '../services/ajout-tournoi.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Tournoi } from '../models/tournoi.models';
import { Calcule } from "../models/calcule.models";
import { Joueur } from "../models/joueur.models";
import * as i18nIsoCountries from "i18n-iso-countries";

/**
 * Component pour l'ajout de nouveaux tournois. Gère l'interaction avec l'utilisateur
 * pour la saisie des informations et la soumission des données via un service dédié.
 */
@Component({
  selector: 'app-ajout-tournoi',
  templateUrl: './ajout-tournoi.component.html',
  styleUrls: ['./ajout-tournoi.component.css']
})
export class AjoutTournoiComponent {
  calculeModel: Calcule = {
    dureeEstime: 0,
    maxParticipants: 0
  };
  tournoiModel: Tournoi = {
    _id: '',
    nomTournoi: '',
    type: '',
    nature: '',
    placeDisponible: 1,
    statut: true,
    dateOuverture: null,
    dateFermeture: null,
    nbTableau: 1,
    joueurs: [],
    matchs: []
  };
  dureeConvertie: string = '0 heures 0 minutes';
  messageSuccess: string = '';
  messageError: string = '';

  constructor(private ajoutTournoiService: AjoutTournoiService, private http: HttpClient) {}

  /**
   * Réagit aux changements du nombre de places disponibles et ajuste la durée estimée du tournoi.
   */
  onChangePlace(placeDispo: number) {
    if (placeDispo != null) {
      this.ajoutTournoiService.getDureeTournois(placeDispo, this.tournoiModel.nbTableau)
        .subscribe((data: Calcule) => {
          this.calculeModel = data;
          this.convertirTemps();
        });
    }
  }

  /**
   * Réagit aux changements du nombre de tables et ajuste la durée estimée du tournoi.
   */
  onChangeTable(table: number) {
    if (table != null) {
      this.ajoutTournoiService.getDureeTournois(this.tournoiModel.placeDisponible, table)
        .subscribe((data: Calcule) => {
          this.calculeModel = data;
          this.convertirTemps();
        });
    }
  }

  /**
   * Convertit la durée estimée du tournoi en un format plus lisible.
   */
  convertirTemps() {
    const dureeEnMinutes = this.calculeModel.dureeEstime;
    const heures = Math.floor(dureeEnMinutes / 60);
    const minutes = dureeEnMinutes % 60;
    this.dureeConvertie = `${heures} heures ${minutes} minutes`;
  }



  onSubmit(tournoiForm: NgForm) {
    if (tournoiForm.valid) {
      // Appel du service pour ajouter le tournoi
      this.ajoutTournoiService.soumettreTournois(this.tournoiModel).subscribe(
        (response: any) => {
          if (!response) {
            // Si succès, afficher un message de succès
            tournoiForm.reset();
            this.messageSuccess = 'Bravo ! Un nouveau tournoi a été ajouté.';
            this.messageError = '';
          }
        },
        (error: HttpErrorResponse) => {
          // En cas d'erreur HTTP, afficher le message d'erreur sur la page
          this.messageError = 'Une erreur s\'est produite lors de l\'ajout du tournoi : ' + error.message;
          console.error('Erreur lors de l\'ajout du tournoi', error);
        }
      );
    } else {
      console.log('Formulaire invalide, soumission annulée.');
      this.messageError = 'Le formulaire est invalide. Veuillez vérifier vos données.';
      this.messageSuccess = '';
    }
  }

}
