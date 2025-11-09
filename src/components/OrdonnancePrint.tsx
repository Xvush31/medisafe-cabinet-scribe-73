import React from 'react';
import { Patient, Ordonnance } from '@/types/medical';
import { Button } from '@/components/ui/button';
import { Printer, X } from 'lucide-react';

interface OrdonnancePrintProps {
  patient: Patient;
  ordonnance: Ordonnance;
  onClose: () => void;
}

const OrdonnancePrint: React.FC<OrdonnancePrintProps> = ({ patient, ordonnance, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Buttons - Hidden during print */}
      <div className="no-print sticky top-0 z-10 bg-background border-b border-border p-4 flex gap-4 justify-center">
        <Button onClick={handlePrint} size="lg" className="gap-2">
          <Printer className="h-5 w-5" />
          Imprimer l'Ordonnance
        </Button>
        <Button onClick={onClose} variant="outline" size="lg" className="gap-2">
          <X className="h-5 w-5" />
          Fermer
        </Button>
      </div>

      {/* Prescription Content */}
      <div className="max-w-4xl mx-auto p-8 print:p-0">
        <div className="bg-white print:shadow-none shadow-lg rounded-lg p-8 print:p-8">
          {/* Header with Doctor Information */}
          <div className="border-b-2 border-primary pb-6 mb-6 flex justify-between items-start">
            <div className="text-left">
              <h1 className="text-xl font-bold text-primary mb-1">
                Dr.BOUDGHÈNE STAMBOULI Med. Fewzi
              </h1>
              <div className="text-sm text-muted-foreground space-y-0.5 mb-2">
                <p className="font-semibold">الحكيم بودغن استمبولي محمد فوزي</p>
                <p>اختصاصي في جراحة أمراض الجهاز البولي</p>
              </div>
              <p className="text-sm font-semibold text-foreground">Urologue - Andrologue</p>
              <p className="text-xs text-muted-foreground mt-1">Ancien Maître Assistant des Hopitaux</p>
              <p className="text-xs text-muted-foreground">Maladie et chirurgie des reins Prostate et Vessie</p>
              <p className="text-xs text-muted-foreground">Stérilité-Impuissance</p>
              <div className="text-xs text-muted-foreground mt-2">
                <p>57, Rue Larbi Ben M'hidi (Ex Rue d'Arzew) Oran</p>
                <p>Tél/Fax : 041 33 23 39 - Mobile : 0552 18 5165</p>
              </div>
            </div>

            {/* Patient Info - Right Side */}
            <div className="text-right text-sm">
              <p className="mb-1">
                <span className="font-semibold">Fait Le </span>
                {ordonnance.dateOrdonnance.toLocaleDateString('fr-FR')}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Nom: </span>
                {patient.nom}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Prénom: </span>
                {patient.prenom}
              </p>
              <p>
                <span className="font-semibold">Age: </span>
                {patient.age} ans
              </p>
            </div>
          </div>

          {/* Ordonnance Title */}
          <h2 className="text-3xl font-bold text-center text-primary mb-8 underline">
            Ordonnance
          </h2>

          {/* Medications List */}
          <div className="space-y-6 mb-8 min-h-[400px]">
            {ordonnance.medicaments.map((med, index) => (
              <div key={index} className="pl-4">
                <p className="text-lg font-semibold mb-1">{index + 1}/ {med.nom}</p>
                <p className="text-sm text-muted-foreground ml-4">
                  <span className="font-medium">Posologie:</span> {med.posologie}
                </p>
                <p className="text-sm text-muted-foreground ml-4">
                  <span className="font-medium">Durée:</span> {med.duree}
                </p>
              </div>
            ))}
          </div>

          {/* Notes */}
          {ordonnance.notes && (
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm">
                <span className="font-semibold">Notes:</span> {ordonnance.notes}
              </p>
            </div>
          )}

          {/* Signature Area */}
          <div className="mt-12 text-right">
            <p className="font-semibold mb-16">Signature et Cachet du Médecin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdonnancePrint;
