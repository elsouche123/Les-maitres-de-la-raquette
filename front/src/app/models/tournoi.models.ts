export interface Tournoi {
  numeroInscription: number;
  nom: string;
  prenom: string;
  nomTournoi: string; // Par exemple "T1", "T2", etc.
  type: 'simple' | 'double'; // Restreint les valeurs à 'simple' ou 'double'
  nature: 'mixte' | 'femme' | 'homme'; // Restreint les valeurs à 'mixte', 'femme' ou 'homme'
  placeDisponibleSimple: number; // Initialisez à 5 pour un nouveau tournoi
  placeDisponibleDouble: number; // Initialisez à 5 pour un nouveau tournoi
  statut: boolean; // true pour ouvert, false pour fermé
  dateOuverture: string | null; // La date d'ouverture du tournoi
  dateFermeture: string | null; // La date de fermeture du tournoi, qui est dateOuverture + 2 jours
}