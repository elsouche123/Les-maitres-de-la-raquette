import { Component, OnInit } from '@angular/core';
import { Tournoi } from '../models/tournoi.models';
import { TournoiService } from '../services/tournoi.service';
import { Router } from '@angular/router';

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

  constructor(private tournoiService: TournoiService, private router: Router) {
  }

  ngOnInit(): void {
  }

 /* onChange(event: Event): void {
    if (event.target !== null && 'checked' in event.target) {
      const isChecked: boolean = (event.target as HTMLInputElement).checked;
      this.tournoiService.ajouterJoueurTournoi(idTournoi, { idJoueur, nom, prenom, ... })
        .subscribe({
          next: (response) => {
            console.log('Joueur ajouté avec succès', response);
            // Traiter la réponse ou effectuer d'autres actions ici
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout du joueur', error);
          }
        });
    } else {
      this.tournoiService.supprimerJoueurTournoi(idTournoi, idJoueur)
        .subscribe({
          next: (response) => {
            console.log('Joueur supprimé avec succès', response);
            // Traiter la réponse ou effectuer d'autres actions ici
          },
          error: (error) => {
            console.error('Erreur lors de la suppression du joueur', error);
          }
        });
    }
  }
*/
  voirNouveauxTournois(): void {
    this.getTournoisOuverts();
  }

  voirTournoisInscrits(): void {
    // Implémentez ici la logique pour afficher les tournois inscrits
  }

  validerNumeroInscription(): void {
    this.tournoiService.getJoueurByNumero(this.numeroInscription).subscribe(
        (data: any[]) => {
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
        }
    );
  }

  getTournoisOuverts(): void {
    this.tournoiService.getTournoisOuverts().subscribe((tournois: Tournoi[]) => {
      this.tournois = tournois;
    });
  }

  ouvrirPageAjoutTournois() {
    this.router.navigate(['/ajout-tournoi']);
  }
}
