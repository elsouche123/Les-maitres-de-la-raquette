import { Component, OnInit } from '@angular/core';

// Modèle Player
interface Player {
  id: number;
  name: string;
  age: number;
  level: string;
}

@Component({
  selector: 'app-liste-joueur',
  templateUrl: './liste-joueur.component.html',
  styleUrls: ['./liste-joueur.component.css']
})
export class ListeJoueurComponent implements OnInit {
  // Propriétés de pagination et de filtre
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalItems: number = 0;
  filteredPlayers: Player[] = [];
  players: Player[] = [
    { id: 1, name: 'Joueur 1', age: 25, level: 'Débutant' },
    { id: 2, name: 'Joueur 2', age: 30, level: 'Intermédiaire' },
    { id: 3, name: 'Joueur 3', age: 28, level: 'Avancé' },
    { id: 4, name: 'Joueur 4', age: 22, level: 'Débutant' },
    { id: 5, name: 'Joueur 5', age: 32, level: 'Avancé' },
    { id: 6, name: 'Joueur 6', age: 27, level: 'Intermédiaire' },
    { id: 7, name: 'Joueur 7', age: 29, level: 'Avancé' },
    { id: 8, name: 'Joueur 8', age: 26, level: 'Intermédiaire' },
    { id: 9, name: 'Joueur 9', age: 31, level: 'Avancé' },
    { id: 10, name: 'Joueur 10', age: 24, level: 'Débutant' },
  ];
pages: any;
totalPages: any;

  constructor() { }

  ngOnInit(): void {
    this.totalItems = this.players.length;
    this.filterPlayers();
  }

  // Filtrer les joueurs en fonction du terme de recherche
  filterPlayers() {
    this.filteredPlayers = this.players.filter(player =>
      player.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Gérer le changement de page
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
