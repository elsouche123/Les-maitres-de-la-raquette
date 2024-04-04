import { Component, OnInit } from '@angular/core';
import { Tournoi } from '../models/tournoi.models';
import { TournoiService } from '../services/tournoi.service';

@Component({
  selector: 'app-tournoi',
  templateUrl: './tournoi.component.html',
  styleUrls: ['./tournoi.component.css']
})
export class TournoiComponent implements OnInit {
  numeroInscription: string = '';
  inscriptionValide: boolean | null = null;
  messageValidation: string = '';
  fieldsetOpen: boolean = true;
  tournois: Tournoi[] = [];

  constructor(private tournoiService: TournoiService) {
  }

  ngOnInit(): void {
    // Vous pouvez également charger les tournois ici s'ils doivent être affichés par défaut
  }

  voirNouveauxTournois(): void {
    // Implémentez ici la logique pour afficher les nouveaux tournois
  }

  voirTournoisInscrits(): void {
    // Implémentez ici la logique pour afficher les tournois inscrits
  }

  validerNumeroInscription(): void {
    this.tournoiService.getJoueurByNumero(this.numeroInscription).subscribe(
        (data: any[]) => {
          console.log(data);
          if (data.length !== 0) {
            this.inscriptionValide = true;
            this.messageValidation = 'Bonjour ' + data[0].prenom + ' ' + data[0].nom + '.';
          } else {
            this.inscriptionValide = false;
            this.messageValidation = 'Numéro d’inscription non valide. Veuillez réessayer.';
          }
        },
        (error: any) => {
          console.error('Erreur lors de la validation du numéro d\'inscription', error);
          // Gérer l'erreur ici, par exemple afficher un message d'erreur à l'utilisateur
        }
    );
  }
}
