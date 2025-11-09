import React from 'react';
import { Patient, CompteRenduEcho } from '@/types/medical';
import { Button } from '@/components/ui/button';
import { Printer, X } from 'lucide-react';

interface EchoPrintProps {
  patient: Patient;
  echo: CompteRenduEcho;
  onClose: () => void;
}

const EchoPrint: React.FC<EchoPrintProps> = ({ patient, echo, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Buttons - Hidden during print */}
      <div className="no-print sticky top-0 z-10 bg-background border-b border-border p-4 flex gap-4 justify-center">
        <Button onClick={handlePrint} size="lg" className="gap-2">
          <Printer className="h-5 w-5" />
          Imprimer le Compte Rendu
        </Button>
        <Button onClick={onClose} variant="outline" size="lg" className="gap-2">
          <X className="h-5 w-5" />
          Fermer
        </Button>
      </div>

      {/* Echo Content */}
      <div className="max-w-4xl mx-auto p-8 print:p-0">
        <div className="bg-white print:shadow-none shadow-lg rounded-lg p-8 print:p-8">
          {/* Header */}
          <div className="text-center border-b-2 border-primary pb-4 mb-6">
            <h1 className="text-xl font-bold text-primary mb-1">
              Dr. BOUDGHÈNE STAMBOULI Med. Fewzi
            </h1>
            <p className="text-sm text-primary mb-1">Spécialiste en Chirurgie Urologique</p>
            <h2 className="text-lg font-bold text-primary mb-2">COMPTE RENDU D'ECHOGRAPHIE</h2>
            <div className="flex items-center justify-center mb-2">
              <div className="h-0.5 w-12 bg-primary rounded"></div>
              <div className="h-1.5 w-1.5 bg-primary rounded-full mx-1"></div>
              <div className="h-1.5 w-1.5 bg-primary rounded-full mx-1"></div>
              <div className="h-1.5 w-1.5 bg-primary rounded-full mx-1"></div>
              <div className="h-0.5 w-12 bg-primary rounded"></div>
            </div>
          </div>

          {/* Patient Info Line */}
          <div className="mb-6 text-sm flex justify-between items-center">
            <div>
              <span className="font-semibold">Patient: </span>
              {patient.prenom} {patient.nom} - {patient.age} ans
            </div>
            <div>
              <span className="font-semibold">Date: </span>
              {echo.dateExamen.toLocaleDateString('fr-FR')}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 text-sm">
            {/* REIN DROIT */}
            {(echo.reinDroitEchostructure || echo.reinDroitSituation || echo.reinDroitTaille || 
              echo.reinDroitICP || echo.reinDroitVoiesExcretrices) && (
              <div>
                <h3 className="font-bold text-primary mb-2">* REIN DROIT :</h3>
                {echo.reinDroitEchostructure && (
                  <p className="ml-4">- Echostructure : {echo.reinDroitEchostructure}</p>
                )}
                {echo.reinDroitSituation && (
                  <p className="ml-4">- Situation : {echo.reinDroitSituation}</p>
                )}
                {echo.reinDroitTaille && (
                  <p className="ml-4">- Taille : {echo.reinDroitTaille}</p>
                )}
                {echo.reinDroitICP && (
                  <p className="ml-4">- I.C.P. : {echo.reinDroitICP}</p>
                )}
                {echo.reinDroitVoiesExcretrices && (
                  <p className="ml-4">- Voies Excrétrices : {echo.reinDroitVoiesExcretrices}</p>
                )}
              </div>
            )}

            {/* REIN GAUCHE */}
            {(echo.reinGaucheEchostructure || echo.reinGaucheSituation || echo.reinGaucheTaille || 
              echo.reinGaucheICP || echo.reinGaucheVoiesExcretrices) && (
              <div>
                <h3 className="font-bold text-primary mb-2">* REIN GAUCHE :</h3>
                {echo.reinGaucheEchostructure && (
                  <p className="ml-4">- Echostructure : {echo.reinGaucheEchostructure}</p>
                )}
                {echo.reinGaucheSituation && (
                  <p className="ml-4">- Situation : {echo.reinGaucheSituation}</p>
                )}
                {echo.reinGaucheTaille && (
                  <p className="ml-4">- Taille : {echo.reinGaucheTaille}</p>
                )}
                {echo.reinGaucheICP && (
                  <p className="ml-4">- I.C.P. : {echo.reinGaucheICP}</p>
                )}
                {echo.reinGaucheVoiesExcretrices && (
                  <p className="ml-4">- Voies Excrétrices : {echo.reinGaucheVoiesExcretrices}</p>
                )}
              </div>
            )}

            {/* VESSIE */}
            {echo.vessie && (
              <div>
                <h3 className="font-bold text-primary mb-2">* VESSIE :</h3>
                <p className="ml-4 whitespace-pre-wrap">{echo.vessie}</p>
              </div>
            )}

            {/* PROSTATE */}
            {(echo.prostateEchostructure || echo.prostateDimension || echo.prostatePoids || 
              echo.prostateResidu || echo.prostateVesicules) && (
              <div>
                <h3 className="font-bold text-primary mb-2">* PROSTATE :</h3>
                {echo.prostateEchostructure && (
                  <p className="ml-4">- Echostructure : {echo.prostateEchostructure}</p>
                )}
                {echo.prostateDimension && (
                  <p className="ml-4">- Dimension : {echo.prostateDimension}</p>
                )}
                {echo.prostatePoids && (
                  <p className="ml-4">- Poids : {echo.prostatePoids}</p>
                )}
                {echo.prostateResidu && (
                  <p className="ml-4">- Résidu Post - Mictionnel : {echo.prostateResidu}</p>
                )}
                {echo.prostateVesicules && (
                  <p className="ml-4">- Vésicules Séminales : {echo.prostateVesicules}</p>
                )}
              </div>
            )}

            {/* TESTICULES */}
            {(echo.testiculesGauche || echo.testiculesDroite || echo.testiculesConclusion) && (
              <div>
                <h3 className="font-bold text-primary mb-2">* TESTICULES :</h3>
                {echo.testiculesGauche && (
                  <p className="ml-4">- Gauche : {echo.testiculesGauche}</p>
                )}
                {echo.testiculesDroite && (
                  <p className="ml-4">- Droite : {echo.testiculesDroite}</p>
                )}
                {echo.testiculesConclusion && (
                  <p className="ml-4">- Conclusion : {echo.testiculesConclusion}</p>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t-2 border-primary text-center text-xs text-primary">
            <p>57, Rue Larbi Ben M'hidi (Ex. Rue d'Arzew) - ORAN</p>
            <p>Tél. : 041.33.23.39 - mob : 0552.18.51.65</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EchoPrint;
