import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AjoutTournoiService } from '../services/ajout-tournoi.service';
import { HttpClient } from '@angular/common/http';
import { Tournoi } from '../models/tournoi.models';
import {Calcule} from "../models/calcule.models";
import {Joueur} from "../models/joueur.models";
import * as i18nIsoCountries from "i18n-iso-countries";


@Component({
 selector: 'app-ajout-tournoi',
 templateUrl: './ajout-tournoi.component.html',
 styleUrls: ['./ajout-tournoi.component.css']
})
export class AjoutTournoiComponent {
 calculeModel: Calcule= {
     dureeEstime: 0,
     maxParticipants: 0
 };
 tournoiModel : Tournoi= {
   _id: '',
   nomTournoi: '',
   type: '',
   nature: '',
   placeDisponible: 1,
   statut: true,
   dateOuverture: null,
   dateFermeture: null,
   nbTableau: 1,
   joueur: [],
   match: []
 };
 dureeConvertie: string = '0 heures 0 minutes';
 messageSuccess: string = '';
 messageError: string = '';


 constructor(private ajoutTournoiService:  AjoutTournoiService, private http: HttpClient) {
 }


 onSubmit(tournoiForm: NgForm) {
   if (tournoiForm.valid) {
     this.ajoutTournoiService.soumettreTournois(this.tournoiModel).subscribe(
       response => {
         if (!response) {
           tournoiForm.reset();
           this.messageSuccess = 'Tournoi ajouté avec succès !';
            alert(JSON.stringify(response));
           this.messageError = '';
         }
       },
     );
   } else {
     console.log('Formulaire invalide, soumission annulée.');
     this.messageError = 'Le formulaire est invalide. Veuillez vérifier vos données.';
     this.messageSuccess = '';
   }
 }
onChangePlace(placeDispo: number) {
     if(placeDispo != null) {
         this.ajoutTournoiService.getDureeTournois(placeDispo, this.tournoiModel.nbTableau)
             .subscribe((data: Calcule) => {
                 this.calculeModel = data;
                 this.convertirTemps();// Assign the returned data to calculeModel
             });
     }
 }
 onChangeTable(table: number) {
     if(table != null) {
         this.ajoutTournoiService.getDureeTournois(this.tournoiModel.placeDisponible, table)
             .subscribe((data: Calcule) => {
                 this.calculeModel = data;
                 this.convertirTemps();// Assign the returned data to calculeModel
             });

     }
 }

 convertirTemps(){
     // Suppose que la réponse de votre API est un objet avec un champ "dureeEstime" en minutes
    const dureeEnMinutes = this.calculeModel.dureeEstime;
    const heures = Math.floor(dureeEnMinutes / 60);
    const minutes = dureeEnMinutes % 60;

    // Vous pouvez également calculer les secondes si nécessaire
    const secondes = Math.floor((dureeEnMinutes % 1) * 60);

    // Maintenant, vous pouvez stocker la durée convertie dans un format plus lisible
    this.dureeConvertie = `${heures} heures ${minutes} minutes`;
    console.log(this.dureeConvertie)
 }
}
