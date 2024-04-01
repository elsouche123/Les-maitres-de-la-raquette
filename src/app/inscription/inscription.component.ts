// src/app/inscription/inscription.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Joueur } from '../models/joueur.models';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  joueurs: Joueur[] = [];

  onSubmit(form: NgForm) {
    const newJoueur: Joueur = form.value;
    this.joueurs.push(newJoueur);
    console.log(this.joueurs); // Pour vérification
    form.reset(); // Réinitialiser le formulaire après l'inscription
  }
}
