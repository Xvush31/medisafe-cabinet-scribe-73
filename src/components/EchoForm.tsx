import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Patient, CompteRenduEcho } from '@/types/medical';
import { FileText, ArrowLeft, User, Calendar } from 'lucide-react';

interface EchoFormProps {
  patient: Patient;
  onCreateEcho: (echo: Omit<CompteRenduEcho, 'id' | 'dateExamen'>) => void;
  onBack: () => void;
}

const EchoForm: React.FC<EchoFormProps> = ({ patient, onCreateEcho, onBack }) => {
  // Rein Droit
  const [reinDroitEchostructure, setReinDroitEchostructure] = useState('');
  const [reinDroitSituation, setReinDroitSituation] = useState('');
  const [reinDroitTaille, setReinDroitTaille] = useState('');
  const [reinDroitICP, setReinDroitICP] = useState('');
  const [reinDroitVoiesExcretrices, setReinDroitVoiesExcretrices] = useState('');
  
  // Rein Gauche
  const [reinGaucheEchostructure, setReinGaucheEchostructure] = useState('');
  const [reinGaucheSituation, setReinGaucheSituation] = useState('');
  const [reinGaucheTaille, setReinGaucheTaille] = useState('');
  const [reinGaucheICP, setReinGaucheICP] = useState('');
  const [reinGaucheVoiesExcretrices, setReinGaucheVoiesExcretrices] = useState('');
  
  // Vessie
  const [vessie, setVessie] = useState('');
  
  // Prostate
  const [prostateEchostructure, setProstateEchostructure] = useState('');
  const [prostateDimension, setProstateDimension] = useState('');
  const [prostatePoids, setProstatePoids] = useState('');
  const [prostateResidu, setProstateResidu] = useState('');
  const [prostateVesicules, setProstateVesicules] = useState('');
  
  // Testicules
  const [testiculesGauche, setTesticulesGauche] = useState('');
  const [testiculesDroite, setTesticulesDroite] = useState('');
  const [testiculesConclusion, setTesticulesConclusion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onCreateEcho({
      patientId: patient.id,
      reinDroitEchostructure: reinDroitEchostructure.trim() || undefined,
      reinDroitSituation: reinDroitSituation.trim() || undefined,
      reinDroitTaille: reinDroitTaille.trim() || undefined,
      reinDroitICP: reinDroitICP.trim() || undefined,
      reinDroitVoiesExcretrices: reinDroitVoiesExcretrices.trim() || undefined,
      reinGaucheEchostructure: reinGaucheEchostructure.trim() || undefined,
      reinGaucheSituation: reinGaucheSituation.trim() || undefined,
      reinGaucheTaille: reinGaucheTaille.trim() || undefined,
      reinGaucheICP: reinGaucheICP.trim() || undefined,
      reinGaucheVoiesExcretrices: reinGaucheVoiesExcretrices.trim() || undefined,
      vessie: vessie.trim() || undefined,
      prostateEchostructure: prostateEchostructure.trim() || undefined,
      prostateDimension: prostateDimension.trim() || undefined,
      prostatePoids: prostatePoids.trim() || undefined,
      prostateResidu: prostateResidu.trim() || undefined,
      prostateVesicules: prostateVesicules.trim() || undefined,
      testiculesGauche: testiculesGauche.trim() || undefined,
      testiculesDroite: testiculesDroite.trim() || undefined,
      testiculesConclusion: testiculesConclusion.trim() || undefined,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Button 
        onClick={onBack}
        variant="outline"
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à la liste
      </Button>

      {/* Patient Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <User className="h-5 w-5" />
            Informations du Patient
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>Nom:</strong> {patient.prenom} {patient.nom}</div>
            <div><strong>Âge:</strong> {patient.age} ans ({patient.sexe})</div>
          </div>
        </CardContent>
      </Card>

      {/* Echo Form */}
      <Card>
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <FileText className="h-5 w-5" />
            Nouveau Compte Rendu d'Échographie
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <Calendar className="h-4 w-4" />
            <span>Date: {new Date().toLocaleDateString('fr-FR')}</span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* REIN DROIT */}
            <div className="border-2 border-primary rounded-lg p-4">
              <h3 className="text-lg font-bold text-primary mb-4">* REIN DROIT :</h3>
              <div className="space-y-3">
                <div>
                  <Label>- Echostructure :</Label>
                  <Input value={reinDroitEchostructure} onChange={(e) => setReinDroitEchostructure(e.target.value)} />
                </div>
                <div>
                  <Label>- Situation :</Label>
                  <Input value={reinDroitSituation} onChange={(e) => setReinDroitSituation(e.target.value)} />
                </div>
                <div>
                  <Label>- Taille :</Label>
                  <Input value={reinDroitTaille} onChange={(e) => setReinDroitTaille(e.target.value)} />
                </div>
                <div>
                  <Label>- I.C.P. :</Label>
                  <Input value={reinDroitICP} onChange={(e) => setReinDroitICP(e.target.value)} />
                </div>
                <div>
                  <Label>- Voies Excrétrices :</Label>
                  <Input value={reinDroitVoiesExcretrices} onChange={(e) => setReinDroitVoiesExcretrices(e.target.value)} />
                </div>
              </div>
            </div>

            {/* REIN GAUCHE */}
            <div className="border-2 border-primary rounded-lg p-4">
              <h3 className="text-lg font-bold text-primary mb-4">* REIN GAUCHE :</h3>
              <div className="space-y-3">
                <div>
                  <Label>- Echostructure :</Label>
                  <Input value={reinGaucheEchostructure} onChange={(e) => setReinGaucheEchostructure(e.target.value)} />
                </div>
                <div>
                  <Label>- Situation :</Label>
                  <Input value={reinGaucheSituation} onChange={(e) => setReinGaucheSituation(e.target.value)} />
                </div>
                <div>
                  <Label>- Taille :</Label>
                  <Input value={reinGaucheTaille} onChange={(e) => setReinGaucheTaille(e.target.value)} />
                </div>
                <div>
                  <Label>- I.C.P. :</Label>
                  <Input value={reinGaucheICP} onChange={(e) => setReinGaucheICP(e.target.value)} />
                </div>
                <div>
                  <Label>- Voies Excrétrices :</Label>
                  <Input value={reinGaucheVoiesExcretrices} onChange={(e) => setReinGaucheVoiesExcretrices(e.target.value)} />
                </div>
              </div>
            </div>

            {/* VESSIE */}
            <div className="border-2 border-primary rounded-lg p-4">
              <h3 className="text-lg font-bold text-primary mb-4">* VESSIE :</h3>
              <Textarea 
                value={vessie} 
                onChange={(e) => setVessie(e.target.value)}
                rows={3}
              />
            </div>

            {/* PROSTATE */}
            <div className="border-2 border-primary rounded-lg p-4">
              <h3 className="text-lg font-bold text-primary mb-4">* PROSTATE :</h3>
              <div className="space-y-3">
                <div>
                  <Label>- Echostructure :</Label>
                  <Input value={prostateEchostructure} onChange={(e) => setProstateEchostructure(e.target.value)} />
                </div>
                <div>
                  <Label>- Dimension :</Label>
                  <Input value={prostateDimension} onChange={(e) => setProstateDimension(e.target.value)} />
                </div>
                <div>
                  <Label>- Poids :</Label>
                  <Input value={prostatePoids} onChange={(e) => setProstatePoids(e.target.value)} />
                </div>
                <div>
                  <Label>- Résidu Post - Mictionnel :</Label>
                  <Input value={prostateResidu} onChange={(e) => setProstateResidu(e.target.value)} />
                </div>
                <div>
                  <Label>- Vésicules Séminales :</Label>
                  <Input value={prostateVesicules} onChange={(e) => setProstateVesicules(e.target.value)} />
                </div>
              </div>
            </div>

            {/* TESTICULES */}
            <div className="border-2 border-primary rounded-lg p-4">
              <h3 className="text-lg font-bold text-primary mb-4">* TESTICULES :</h3>
              <div className="space-y-3">
                <div>
                  <Label>- Gauche :</Label>
                  <Input value={testiculesGauche} onChange={(e) => setTesticulesGauche(e.target.value)} />
                </div>
                <div>
                  <Label>- Droite :</Label>
                  <Input value={testiculesDroite} onChange={(e) => setTesticulesDroite(e.target.value)} />
                </div>
                <div>
                  <Label>- Conclusion :</Label>
                  <Textarea 
                    value={testiculesConclusion} 
                    onChange={(e) => setTesticulesConclusion(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">
              Créer le Compte Rendu
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EchoForm;
