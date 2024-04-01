export interface Joueur {
  nom: string;
  prenom: string;
  age: number;
  sexe: string;
  classement: number;
  pays: string;
  countryCode?: string;
  preferenceJeu: '1v1' | '2v2';
}
