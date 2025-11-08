
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

export interface Medicament {
  nom: string;
  posologie: string;
  duree: string;
}

export interface Ordonnance {
  id: string;
  patientId: string;
  dateOrdonnance: Date;
  medicaments: Medicament[];
  notes?: string;
}
