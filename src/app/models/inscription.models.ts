export interface Inscription {
  resultat: string;
  // identité du joueur
  genre: string;
  nom: string;
  prenom: string;
  dateNaissance : Date | null;
  age : number | null; //calculer l'age
  adresse : string;
  codePostale : number | null;
  ville: string;
  pays: string;
  //Questions
  licence: string; //amateur ou pro
  classement : number | null;
 confirmation: boolean;
}
