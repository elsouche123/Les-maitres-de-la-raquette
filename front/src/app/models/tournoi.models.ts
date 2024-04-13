// Modele pour la table Tournoi

export interface Joueur {
  numeroInscription: string;
  nom: string;
  prenom: string;
}

export interface Match {
  adversaire1: Joueur;
  adversaire2: Joueur;
  nom: string;        // Nom du match, si applicable
  vainqueur: string;  // Nom du vainqueur du match
  score: string;      // Le score du match
}

export interface Tournoi {
  _id: string;
  nomTournoi: string;
  type: string;
  nature: string;
  placeDisponible: number;
  statut: boolean;
  dateOuverture: Date | null;
  dateFermeture: Date | null;
  nbTableau: number;
  joueurs: Joueur[];
  matchs: Match[];
}

