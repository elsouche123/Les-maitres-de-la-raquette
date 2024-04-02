import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Inscription } from '../models/inscription.models';
import { InscriptionService } from '../services/inscription.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  messageSucces: string = '';
  messageErreur: string = '';
  estDejaInscrit: boolean = false;
  inscriptionModel: Inscription = {
    resultat: '',
    genre: '',
    nom: '',
    prenom: '',
    dateNaissance: null,
    age: null, // Age sera calculé, donc initialisé à null
    adresse: '',
    codePostale: null,
    ville: '',
    pays: '',
    licence: '',
    classement: null,
    confirmation: false
  };

  constructor(private inscriptionService: InscriptionService) { }

  onSubmit(inscriptionForm: NgForm) {
    if (inscriptionForm.valid) {
      if (this.inscriptionModel.dateNaissance) {
        this.inscriptionModel.age = this.calculerAge(new Date(this.inscriptionModel.dateNaissance));
      }
      this.inscriptionService.soumettreInscription(this.inscriptionModel).subscribe(
        response => {
          console.log('Inscription réussie', response);
          // Vous pouvez adapter la logique ici en fonction de la réponse de votre API
          if (response.resultat === 'Joueur ajouté avec succès') {
            this.messageSucces = `Bravo ${this.inscriptionModel.prenom}, tu es inscrit!`;
            this.messageErreur = '';
            this.estDejaInscrit = false;
          } else if (response.resultat === 'Joueur déjà inscrit') {
            this.messageErreur = `Tu es déjà inscrit dans la liste des joueurs, ${this.inscriptionModel.prenom}. Tu peux aller voir la liste des matchs!`;
            this.messageSucces = '';
            this.estDejaInscrit = true;
          }
          // Vous pouvez ici réinitialiser le formulaire ou rediriger l'utilisateur
          inscriptionForm.reset();
        },
        error => {
          console.error('Erreur lors de l\'inscription', error);
        }
      );
    }
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
