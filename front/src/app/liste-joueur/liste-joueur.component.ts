import { Component, OnInit } from '@angular/core';
import { Joueur } from '../models/joueur.models';
import { JoueurService } from '../services/joueur.service';
import * as i18nIsoCountries from 'i18n-iso-countries';
import localeFr from 'i18n-iso-countries/langs/fr.json';

@Component({
  selector: 'app-liste-joueur',
  templateUrl: './liste-joueur.component.html',
  styleUrls: ['./liste-joueur.component.css']
})
export class ListeJoueurComponent implements OnInit {
  searchTerm: string = '';
  selectedPays: string = '';
  selectedGenre: 'homme' | 'femme' = 'homme';
  selectedLicence: 'amateur' | 'pro' = 'amateur';
  switchStateGenre: boolean = true;
  switchStateLicence: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalItems: number = 0;
  totalPages: number = 0;
  startItemIndex: number = 1;
  endItemIndex: number = this.itemsPerPage;
  filteredJoueurs: Joueur[] = [];
  joueurs: Joueur[] = [];
  countries: any[] = [];

  constructor(private joueurService: JoueurService) {}

  ngOnInit(): void {
    i18nIsoCountries.registerLocale(localeFr);
    this.countries = Object.entries(i18nIsoCountries.getNames("fr")).map(([code, name]) => ({ code, name }));

    this.joueurService.getJoueurs().subscribe((data: Joueur[]) => {
      this.joueurs = data.map(joueur => ({
        ...joueur,
        countryCode: i18nIsoCountries.getAlpha2Code(joueur.pays, "fr")
      }));
      this.filterJoueurs(); // Initial filtering
    });
  }

  filterJoueurs() {
    this.filteredJoueurs = this.joueurs.filter(joueur =>
      joueur.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedPays ? joueur.pays.toLowerCase() === this.selectedPays.toLowerCase() : true) &&
      joueur.genre.toLowerCase() === this.selectedGenre &&
      joueur.licence.toLowerCase() === this.selectedLicence
    );
    this.totalItems = this.filteredJoueurs.length;
    this.calculatePagination();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.updatePageItems();
  }

  updatePageItems() {
    this.startItemIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItemIndex = Math.min(this.startItemIndex + this.itemsPerPage - 1, this.totalItems);
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updatePageItems();
  }

  onItemsPerPageChange(newItemsPerPage: number) {
    this.itemsPerPage = newItemsPerPage;
    this.calculatePagination();
    this.currentPage = 1;
    this.updatePageItems();
  }

  onPrevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePageItems();
    }
  }

  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePageItems();
    }
  }

  updateLicence(isPro: boolean) {
    this.switchStateLicence = isPro;
    this.selectedLicence = isPro ? 'pro' : 'amateur';
    this.filterJoueurs();
  }

  toggleGenre() {
    this.selectedGenre = this.switchStateGenre ? 'homme' : 'femme';
    this.filterJoueurs();
  }
}
