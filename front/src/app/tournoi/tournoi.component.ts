import { Component, OnInit } from '@angular/core';
import { Match, Tournoi } from '../models/tournoi.models';
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
  nomJoueur: string = '';
  prenomJoueur: string = '';
  idTournoi: string = '';
  dejaInscrit: boolean = false;

  constructor(private tournoiService: TournoiService, private router: Router) {}

  ngOnInit(): void {
    this.getTournoisOuverts();
  }

  // Récupère les tournois ouverts depuis le service TournoiService
  getTournoisOuverts(): void {
    this.tournoiService.getTournoisOuverts().subscribe((tournois: Tournoi[]) => {
      this.tournois = tournois.map(tournoi => ({ ...tournoi, dejaInscrit: false }));
    });
  }

  // Gère le changement d'état de l'inscription à un tournoi
  onChange(event: Event, idTournoi: string): void {
    if (event.target !== null && 'checked' in event.target) {
      const isChecked: boolean = (event.target as HTMLInputElement).checked;
      if (isChecked && this.inscriptionValide) {
        this.tournoiService.ajouterJoueurTournoi(idTournoi, {
          numeroInscription: this.numeroInscription,
          nom: this.nomJoueur,
          prenom: this.prenomJoueur
        }).subscribe({
          next: (response) => {
            alert(JSON.stringify(response));
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout du joueur', error);
          }
        });
      } else {
        this.tournoiService.supprimerJoueurTournoi(idTournoi, this.numeroInscription)
          .subscribe({
            next: (response) => {
              alert(JSON.stringify(response));
            },
            error: (error) => {
              console.error('Erreur lors de la suppression du joueur', error);
            }
          });
      }
    }
  }

  // Récupère les nouveaux tournois ouverts
  voirNouveauxTournois(): void {
    this.getTournoisOuverts();
  }

  // Valide le numéro d'inscription d'un joueur
  validerNumeroInscription(): void {
    this.tournoiService.getJoueurByNumero(this.numeroInscription).subscribe(
      (data: any[]) => {
        if (data.length !== 0) {
          this.inscriptionValide = true;
          this.messageValidation = 'Bonjour ' + data[0].prenom + ' ' + data[0].nom + '.';
          this.nomJoueur = data[0].nom;
          this.prenomJoueur = data[0].prenom;
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

  // Redirige vers la page d'ajout de tournoi
  ouvrirPageAjoutTournois() {
    this.router.navigate(['/ajout-tournoi']);
  }

  // Récupère les tournois inscrits par un joueur
  getTournoisJoueur(): void {
    this.tournoiService.getTournoisJoueur(this.numeroInscription).subscribe((tournois: Tournoi[]) => {
      this.tournois = tournois.map(tournoi => ({ ...tournoi, dejaInscrit: true })); // Toujours définir dejaInscrit sur true
    });
  }

  // Affiche les tournois inscrits par un joueur
  voirTournoisInscrits(): void {
    this.getTournoisJoueur();
  }
}
