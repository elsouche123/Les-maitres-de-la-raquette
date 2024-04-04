import { Component, OnInit } from '@angular/core';
import { Tournoi } from '../models/tournoi.models';
import { TournoiService } from '../services/tournoi.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tournoi',
  templateUrl: './tournoi.component.html',
  styleUrls: ['./tournoi.component.css'],
  providers: [DatePipe]
})
export class TournoiComponent implements OnInit {
  numeroInscription: string = '';
  inscriptionValide: boolean | null = null;
  messageValidation: string = '';
  fieldsetOpen: boolean = true;
  tournois: Tournoi[] = [];

  constructor(private tournoiService: TournoiService, private datePipe: DatePipe) {}
  validerNumeroInscription() {
    // Simulation : Supposons que tous les numéros d'inscription valides commencent par "INS"
    if (this.numeroInscription.startsWith('INS')) {
      this.inscriptionValide = true;
      this.messageValidation = 'Numéro d’inscription valide.';
      this.fieldsetOpen = false; // Fermer le fieldset lorsque le numéro d'inscription est validé
      // Appeler la méthode pour récupérer les détails de l'utilisateur
    } else {
      this.inscriptionValide = false;
      this.messageValidation = 'Numéro d’inscription non valide. Veuillez réessayer.';
    }
  }

  ngOnInit(): void {
    this.getTournois();
  }

  // Dans la méthode getTournois()
getTournois(): void {
  this.tournoiService.getTournois().subscribe((tournois: Tournoi[]) => {
    this.tournois = tournois.map(tournoi => ({
      ...tournoi,
      dateOuverture: this.datePipe.transform(tournoi.dateOuverture, 'dd/MM/yyyy'),
      dateFermeture: this.datePipe.transform(tournoi.dateFermeture, 'dd/MM/yyyy')
    }));
  });
}

inscrireAuTournoi(tournoi: Tournoi, type: string): void {
  // Implémentez ici la logique pour inscrire l'utilisateur à un tournoi
  // Utilisez l'argument 'type' pour déterminer si l'inscription est en simple ou en double
}


  voirNouveauxTournois(): void {
    // Implémentez ici la logique pour afficher les nouveaux tournois
  }

  voirTournoisInscrits(): void {
    // Implémentez ici la logique pour afficher les tournois inscrits
  }


  chargerTournois() {
    // Utilisez votre service pour charger les tournois depuis la base de données
    this.tournoiService.getTournois().subscribe((data: Tournoi[]) => {
      this.tournois = data; // Mettez à jour la liste des tournois avec les données récupérées
    });
  }
}
