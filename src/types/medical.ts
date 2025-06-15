
export interface Patient {
  id: string;
  nom: string;
  prenom: string;
  age: number;
  sexe: 'Homme' | 'Femme';
  poids: number;
  adresse: string;
  pathologie: string;
  traitementActuel: string;
  dateInscription: Date;
}

export interface Ordonnance {
  id: string;
  patientId: string;
  dateOrdonnance: Date;
  nouveauTraitement: string;
  posologie: string;
  duree: string;
  notes?: string;
}
