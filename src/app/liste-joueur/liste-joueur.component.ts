import { Component, OnInit } from '@angular/core';
import { Joueur } from '../models/joueur.models';
import { JoueurService } from '../services/joueur.service';
import * as i18nIsoCountries from 'i18n-iso-countries';
import localeFr from "i18n-iso-countries/langs/fr.json";

@Component({
  selector: 'app-liste-joueur',
  templateUrl: './liste-joueur.component.html',
  styleUrls: ['./liste-joueur.component.css']
})
export class ListeJoueurComponent implements OnInit {
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalItems: number = 0;
  totalPages: number = 0;
  startItemIndex: number = 1;
  endItemIndex: number = this.itemsPerPage;
  filteredJoueurs: Joueur[] = [];
  joueurs: Joueur[] = [];

  constructor(private joueurService: JoueurService) {}

  ngOnInit(): void {
    i18nIsoCountries.registerLocale(localeFr);

    this.joueurService.getJoueurs().subscribe((data: Joueur[]) => {
      this.joueurs = data.map(joueur => ({
        ...joueur,
        countryCode: i18nIsoCountries.getAlpha2Code(joueur.pays, "fr")
      }));
      console.log(this.joueurs );
      this.filterJoueurs();
    });
  }

  filterJoueurs() {
    this.filteredJoueurs = this.joueurs.filter(joueur =>
      joueur.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
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
    this.itemsPerPage = newItemsPerPage; // Mettre à jour manuellement itemsPerPage si nécessaire
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


}
