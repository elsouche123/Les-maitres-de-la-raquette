import { Component, OnInit } from '@angular/core';
import { ClassementService } from '../services/classement.service';
import { Tournoi, Match } from '../models/tournoi.models';

interface EnrichedMatch extends Match {
  description?: string;  // Description du match pour faciliter l'affichage
}

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css']
})
export class ClassementComponent implements OnInit {
  tournoisFermes: Tournoi[] = [];
  selectedTournoi: Tournoi | null = null;
  selectedMatches: EnrichedMatch[] = []; // Utilisation du type EnrichedMatch
  showModal = false;

  constructor(private classementService: ClassementService) {}

  ngOnInit() {
    this.getTournoisFermesFromDB();
  }

  // Récupérer les tournois fermés depuis la base de données
  getTournoisFermesFromDB(): void {
    this.classementService.getTournoisFermes().subscribe({
      next: (tournois: Tournoi[]) => {
        this.tournoisFermes = tournois;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des tournois fermés depuis la base de données:', error);
      }
    });
  }

  // Afficher les matchs d'un tournoi sélectionné
  afficherMatchsTournoi(tournoi: Tournoi): void {
    if (!tournoi.matchs || tournoi.matchs.length === 0) {
      // Aucun match trouvé pour ce tournoi.
      return;
    }

    // Copier les matchs du tournoi pour l'affichage
    this.selectedMatches = tournoi.matchs.map(match => ({ ...match }));

    // Activer l'affichage de la modal
    this.showModal = true;
  }

  // Ouvrir la modal avec les détails d'un tournoi
  openModal(tournoi: Tournoi) {
    this.selectedTournoi = tournoi;
    this.selectedMatches = tournoi.matchs;
    this.showModal = true;
  }

  // Fermer la modal
  closeModal() {
    this.showModal = false;
  }
}
