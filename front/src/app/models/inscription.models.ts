export interface Inscription {
  resultat: string,
  genre: string;
  nom: string;
  prenom: string;
  dateNaissance : Date | null;
  courriel: string,
  telephone: string,
  age : number | null;
  adresse : string;
  codePostale : number | null;
  ville: string;
  pays: string;
  numeroInscription: string,
  licence: string;
  classement : number | null;
  confirmation: boolean;
}
