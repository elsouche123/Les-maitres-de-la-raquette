// Modele pour la table Tournoi

export interface Joueur {
  numeroInscription: string;
  nom: string;
  prenom: string;
}

export interface Match {
  match: {
    adversaire1: { nom: string; prenom: string };
    adversaire2: { nom: string; prenom: string };
    score: { adversaire1: number; adversaire2: number };
  };
  vainqueur: string;
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
