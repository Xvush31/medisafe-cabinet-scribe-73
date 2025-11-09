import React from 'react';
import { Patient } from '@/types/medical';
import { Button } from '@/components/ui/button';
import { Printer, X, FileText } from 'lucide-react';

interface PatientFicheProps {
  patient: Patient;
  onClose: () => void;
  onCreateOrdonnance: () => void;
}

const PatientFiche: React.FC<PatientFicheProps> = ({ patient, onClose, onCreateOrdonnance }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Buttons - Hidden during print */}
      <div className="no-print sticky top-0 z-10 bg-background border-b border-border p-4 flex gap-4 justify-center flex-wrap">
        <Button onClick={handlePrint} size="lg" className="gap-2">
          <Printer className="h-5 w-5" />
          Imprimer la Fiche
        </Button>
        <Button onClick={onCreateOrdonnance} size="lg" className="gap-2 bg-green-600 hover:bg-green-700">
          <FileText className="h-5 w-5" />
          Créer Ordonnance
        </Button>
        <Button onClick={onClose} variant="outline" size="lg" className="gap-2">
          <X className="h-5 w-5" />
          Fermer
        </Button>
      </div>

      {/* Patient Card Content */}
      <div className="max-w-2xl mx-auto p-8 print:p-0">
        <div className="bg-white print:shadow-none shadow-lg rounded-lg p-8 print:p-8 border-4 border-primary">
          {/* Header with Doctor Information */}
          <div className="text-center border-b-4 border-primary pb-6 mb-8">
            <h1 className="text-2xl font-bold text-primary mb-2">
              Dr. BOUDGHÈNE STAMBOULI
            </h1>
            <h2 className="text-3xl font-bold text-primary mb-3">
              Med. Fewzi
            </h2>
            <div className="flex items-center justify-center mb-3">
              <div className="h-1 w-12 bg-primary rounded"></div>
              <div className="h-2 w-2 bg-primary rounded-full mx-2"></div>
              <div className="h-2 w-2 bg-primary rounded-full mx-2"></div>
              <div className="h-2 w-2 bg-primary rounded-full mx-2"></div>
              <div className="h-1 w-12 bg-primary rounded"></div>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">
              Chirurgien Urologue
            </h3>
            <div className="flex items-center justify-center mb-4">
              <div className="h-1 w-12 bg-primary rounded"></div>
              <div className="h-2 w-2 bg-primary rounded-full mx-2"></div>
              <div className="h-2 w-2 bg-primary rounded-full mx-2"></div>
              <div className="h-2 w-2 bg-primary rounded-full mx-2"></div>
              <div className="h-1 w-12 bg-primary rounded"></div>
            </div>
            <div className="text-sm text-primary space-y-1">
              <p>57, Rue Larbi Ben M'hidi (Ex. Rue d'Arzew)</p>
              <p className="font-semibold">ORAN Tél. : 041.33.23.39 mob : 0552.18.51.65</p>
            </div>
          </div>

          {/* FICHE PATIENT Title */}
          <h2 className="text-4xl font-bold text-center text-primary mb-8">
            FICHE PATIENT
          </h2>
          <div className="flex items-center justify-center mb-8">
            <div className="h-1 w-16 bg-primary rounded"></div>
            <div className="h-2 w-2 bg-primary rounded-full mx-2"></div>
            <div className="h-2 w-2 bg-primary rounded-full mx-2"></div>
            <div className="h-2 w-2 bg-primary rounded-full mx-2"></div>
            <div className="h-1 w-16 bg-primary rounded"></div>
          </div>

          {/* Patient Information Fields */}
          <div className="space-y-6">
            <div className="border-b-2 border-primary pb-2">
              <label className="text-primary font-semibold text-lg">Nom :</label>
              <span className="ml-4 text-lg">{patient.nom}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border-b-2 border-primary pb-2">
                <label className="text-primary font-semibold text-lg">Prénom :</label>
                <span className="ml-4 text-lg">{patient.prenom}</span>
              </div>
              <div className="border-b-2 border-primary pb-2">
                <label className="text-primary font-semibold text-lg">Age :</label>
                <span className="ml-4 text-lg">{patient.age} ans</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border-b-2 border-primary pb-2">
                <label className="text-primary font-semibold text-lg">Sexe :</label>
                <span className="ml-4 text-lg">{patient.sexe}</span>
              </div>
              <div className="border-b-2 border-primary pb-2">
                <label className="text-primary font-semibold text-lg">Fonction :</label>
                <span className="ml-4 text-lg">{patient.poids} kg</span>
              </div>
            </div>

            <div className="border-b-2 border-primary pb-2">
              <label className="text-primary font-semibold text-lg">Adresse :</label>
              <span className="ml-4 text-lg">{patient.adresse || 'Non renseignée'}</span>
            </div>

            {patient.pathologie && (
              <div className="border-b-2 border-primary pb-2">
                <label className="text-primary font-semibold text-lg">Pathologie :</label>
                <span className="ml-4 text-lg">{patient.pathologie}</span>
              </div>
            )}

            {patient.traitementActuel && (
              <div className="border-b-2 border-primary pb-2">
                <label className="text-primary font-semibold text-lg">Traitement actuel :</label>
                <span className="ml-4 text-lg">{patient.traitementActuel}</span>
              </div>
            )}
          </div>

          {/* Footer Note */}
          <div className="mt-12 pt-6 border-t-2 border-primary text-center text-primary">
            <p className="text-sm font-semibold">
              A la prochaine consultation prière de ramener tous vos documents
            </p>
            <p className="text-sm font-semibold">
              (Echographie - Radiologie etc )
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientFiche;
