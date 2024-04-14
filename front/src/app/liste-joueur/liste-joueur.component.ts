import { Component, OnInit } from '@angular/core';
import { Joueur } from '../models/joueur.models';
import { JoueurService } from '../services/joueur.service';
import * as i18nIsoCountries from 'i18n-iso-countries'; // Import de la bibliothèque pour la gestion des pays
import localeFr from 'i18n-iso-countries/langs/fr.json'; // Import des noms de pays en français

@Component({
  selector: 'app-liste-joueur',
  templateUrl: './liste-joueur.component.html',
  styleUrls: ['./liste-joueur.component.css']
})
export class ListeJoueurComponent implements OnInit {
  searchTerm: string = ''; // Terme de recherche pour filtrer les joueurs par nom
  selectedPays: string = ''; // Pays sélectionné pour filtrer les joueurs
  selectedGenre: 'homme' | 'femme' = 'homme'; // Genre sélectionné pour filtrer les joueurs
  selectedLicence: 'amateur' | 'pro' = 'amateur'; // Type de licence sélectionné pour filtrer les joueurs
  switchStateGenre: boolean = true; // État du switch pour le genre
  switchStateLicence: boolean = false; // État du switch pour la licence
  currentPage: number = 1; // Numéro de la page actuelle
  itemsPerPage: number = 4; // Nombre d'éléments affichés par page
  totalItems: number = 0; // Nombre total d'éléments après filtrage
  totalPages: number = 0; // Nombre total de pages
  startItemIndex: number = 1; // Index du premier élément affiché sur la page actuelle
  endItemIndex: number = this.itemsPerPage; // Index du dernier élément affiché sur la page actuelle
  filteredJoueurs: Joueur[] = []; // Liste des joueurs filtrés à afficher
  joueurs: Joueur[] = []; // Liste complète des joueurs récupérée depuis le service
  countries: any[] = []; // Liste des pays utilisée pour la sélection

  constructor(private joueurService: JoueurService) {}

  ngOnInit(): void {
    i18nIsoCountries.registerLocale(localeFr); // Enregistrement du langage français pour les noms de pays
    this.countries = Object.entries(i18nIsoCountries.getNames("fr")).map(([code, name]) => ({ code, name })); // Création de la liste des pays avec leurs codes et noms en français

    this.joueurService.getJoueurs().subscribe((data: Joueur[]) => {
      // Récupération des joueurs depuis le service
      this.joueurs = data.map(joueur => ({
        ...joueur,
        countryCode: i18nIsoCountries.getAlpha2Code(joueur.pays, "fr") // Conversion du nom du pays en code ISO 3166-1 alpha-2
      }));
      this.filterJoueurs(); // Filtrage initial des joueurs
    });
  }

  filterJoueurs() {
    // Filtrage des joueurs en fonction des critères sélectionnés
    this.filteredJoueurs = this.joueurs.filter(joueur =>
      joueur.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedPays ? joueur.pays.toLowerCase() === this.selectedPays.toLowerCase() : true) &&
      joueur.genre.toLowerCase() === this.selectedGenre &&
      joueur.licence.toLowerCase() === this.selectedLicence
    );
    this.totalItems = this.filteredJoueurs.length; // Mise à jour du nombre total d'éléments après filtrage
    this.calculatePagination(); // Calcul de la pagination
  }

  calculatePagination() {
    // Calcul du nombre total de pages
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.updatePageItems(); // Mise à jour des éléments à afficher sur la page
  }

  updatePageItems() {
    // Mise à jour de l'index du premier et du dernier élément affiché sur la page
    this.startItemIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItemIndex = Math.min(this.startItemIndex + this.itemsPerPage - 1, this.totalItems);
  }

  onPageChange(pageNumber: number) {
    // Gestion du changement de page
    this.currentPage = pageNumber;
    this.updatePageItems(); // Mise à jour des éléments à afficher sur la nouvelle page
  }

  onItemsPerPageChange(newItemsPerPage: number) {
    // Gestion du changement du nombre d'éléments par page
    this.itemsPerPage = newItemsPerPage;
    this.calculatePagination(); // Recalcul de la pagination avec le nouveau nombre d'éléments par page
    this.currentPage = 1; // Retour à la première page
    this.updatePageItems(); // Mise à jour des éléments à afficher sur la première page
  }

  onPrevPage() {
    // Gestion du bouton "Précédent"
    if (this.currentPage > 1) {
      this.currentPage--; // Décrémentation du numéro de page
      this.updatePageItems(); // Mise à jour des éléments à afficher sur la nouvelle page
    }
  }

  onNextPage() {
    // Gestion du bouton "Suivant"
    if (this.currentPage < this.totalPages) {
      this.currentPage++; // Incrémentation du numéro de page
      this.updatePageItems(); // Mise à jour des éléments à afficher sur la nouvelle page
    }
  }

  updateLicence(isPro: boolean) {
    // Mise à jour du type de licence sélectionné
    this.switchStateLicence = isPro;
    this.selectedLicence = isPro ? 'pro' : 'amateur';
    this.filterJoueurs(); // Filtrage des joueurs avec le nouveau type de licence
  }

  toggleGenre() {
    // Changement de genre (homme/femme)
    this.selectedGenre = this.switchStateGenre ? 'homme' : 'femme';
    this.filterJoueurs(); // Filtrage des joueurs avec le nouveau genre sélectionné
  }
}
