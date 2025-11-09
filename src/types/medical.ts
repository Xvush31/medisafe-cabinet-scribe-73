
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

export interface CompteRenduEcho {
  id: string;
  patientId: string;
  dateExamen: Date;
  // Rein Droit
  reinDroitEchostructure?: string;
  reinDroitSituation?: string;
  reinDroitTaille?: string;
  reinDroitICP?: string;
  reinDroitVoiesExcretrices?: string;
  // Rein Gauche
  reinGaucheEchostructure?: string;
  reinGaucheSituation?: string;
  reinGaucheTaille?: string;
  reinGaucheICP?: string;
  reinGaucheVoiesExcretrices?: string;
  // Vessie
  vessie?: string;
  // Prostate
  prostateEchostructure?: string;
  prostateDimension?: string;
  prostatePoids?: string;
  prostateResidu?: string;
  prostateVesicules?: string;
  // Testicules
  testiculesGauche?: string;
  testiculesDroite?: string;
  testiculesConclusion?: string;
}
