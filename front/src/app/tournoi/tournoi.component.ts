import { Component, OnInit } from '@angular/core';
import { TournoiService } from '../services/tournoi.service';
import { Tournoi } from '../models/tournoi.models';

@Component({
  selector: 'app-tournoi',
  templateUrl: './tournoi.component.html',
  styleUrls: ['./tournoi.component.css']
})
export class TournoiComponent implements OnInit {
  numeroInscription: string = ''; // Initialiser les valeurs
  messageValidation: string = '';
  inscriptionValide: boolean = false;
  tournois: Tournoi[] = [];

  constructor(private tournoiService: TournoiService) {}

  ngOnInit(): void {
    // Pas besoin d'appeler les méthodes ici, elles seront déclenchées par les actions de l'utilisateur
  }

  chargerTournoisDisponibles() {
    this.tournoiService.getTournoisDisponibles().subscribe(
      tournois => {
        this.tournois = tournois;
      },
      error => {
        console.error('Erreur lors du chargement des tournois disponibles :', error);
        // Gérer les erreurs de chargement des tournois disponibles
      }
    );
  }

  chargerTournoisInscrits() {
    this.tournoiService.getTournoisInscrits().subscribe(
      tournois => {
        this.tournois = tournois;
      },
      error => {
        console.error('Erreur lors du chargement des tournois inscrits :', error);
        // Gérer les erreurs de chargement des tournois inscrits
      }
    );
  }

  validerNumeroInscription() {
    // Simulation : Supposons que tous les numéros d'inscription valides commencent par "INS"
    if (this.numeroInscription && this.numeroInscription.startsWith('INS')) {
      this.inscriptionValide = true;
      this.messageValidation = 'Numéro d’inscription valide.';
      // Appeler la méthode pour récupérer les détails de l'utilisateur
      this.chargerTournoisDisponibles();
    } else {
      this.inscriptionValide = false;
      this.messageValidation = 'Numéro d’inscription non valide. Veuillez réessayer.';
    }
  }

  inscrireAuTournoi(tournoi: Tournoi, type: string) {
    // Implémentez la logique pour inscrire l'utilisateur au tournoi sélectionné
  }
}
