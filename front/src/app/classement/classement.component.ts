import { Component, OnInit } from '@angular/core';
import { ClassementService } from '../services/classement.service';
import { Tournoi, Match } from '../models/tournoi.models';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css']
})
export class ClassementComponent implements OnInit {
  tournoisFermes: Tournoi[] = [];
  selectedTournoi: Tournoi | null = null;  // Ajoutez cette ligne pour gérer le tournoi sélectionné
  showModal: boolean = false;
  selectedMatches: Match[] = []; // Stocke les matchs du tournoi sélectionné

  constructor(private classementService: ClassementService) {}

  ngOnInit() {
    this.getTournoisFermes();
  }

  afficherMatchsTournoi(tournoi: Tournoi) {
  if (!tournoi.matchs || tournoi.matchs.length === 0) {
    alert("Aucun match trouvé pour ce tournoi.");
    return;
  }

  let message = "Voici les matchs du tournoi :\n";
  for (let match of tournoi.matchs) {
    if (!match.adversaire1 || !match.adversaire2) {
      console.error('Un des joueurs est undefined', match);
      continue;  // Passe au prochain match si un des joueurs est undefined
    }

    let joueur1 = `${match.adversaire1?.nom} ${match.adversaire1?.prenom}`;
    let joueur2 = `${match.adversaire2?.nom} ${match.adversaire2?.prenom}`;
    message += `Match : ${joueur1} contre ${joueur2}\n`;
  }

  alert(message);
}

  getTournoisFermes() {
    this.classementService.getTournoisFermes().subscribe(
      (tournois: Tournoi[]) => {
        this.tournoisFermes = tournois;
      },
      (error) => {
        console.error('Erreur lors de la récupération des tournois fermés:', error);
      }
    );
  }

  getVainqueur(tournoi: Tournoi): string {
  if (tournoi && tournoi.matchs && tournoi.matchs.length > 0) {
    const dernierMatch = tournoi.matchs[tournoi.matchs.length - 1];
    if (dernierMatch.vainqueur) {
      return dernierMatch.vainqueur;
    } else {
      return 'Match non joué';
    }
  } else {
    return 'Aucun match trouvé';
  }
}

  openModal(tournoi: Tournoi) {
  this.selectedTournoi = tournoi; // Assurez-vous que selectedTournoi est utilisé pour stocker les matchs
  this.showModal = true; // Variable pour contrôler l'affichage de la modal
}

closeModal() {
  this.showModal = false;
}
}
