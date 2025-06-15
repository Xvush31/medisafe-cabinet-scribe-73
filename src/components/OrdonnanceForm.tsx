
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Patient, Ordonnance } from '@/types/medical';
import { FileText, ArrowLeft, User, Calendar } from 'lucide-react';

interface OrdonnanceFormProps {
  patient: Patient;
  onCreateOrdonnance: (ordonnance: Omit<Ordonnance, 'id' | 'dateOrdonnance'>) => void;
  onBack: () => void;
}

const OrdonnanceForm: React.FC<OrdonnanceFormProps> = ({ patient, onCreateOrdonnance, onBack }) => {
  const [formData, setFormData] = useState({
    nouveauTraitement: '',
    posologie: '',
    duree: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nouveauTraitement && formData.posologie && formData.duree) {
      onCreateOrdonnance({
        patientId: patient.id,
        ...formData
      });
      setFormData({
        nouveauTraitement: '',
        posologie: '',
        duree: '',
        notes: ''
      });
    }
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

      {/* Informations du patient */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <User className="h-5 w-5" />
            Informations du Patient
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Nom:</strong> {patient.prenom} {patient.nom}
            </div>
            <div>
              <strong>Âge:</strong> {patient.age} ans ({patient.sexe})
            </div>
            <div>
              <strong>Poids:</strong> {patient.poids} kg
            </div>
            {patient.adresse && (
              <div>
                <strong>Adresse:</strong> {patient.adresse}
              </div>
            )}
            {patient.pathologie && (
              <div className="md:col-span-2">
                <strong>Pathologie:</strong> {patient.pathologie}
              </div>
            )}
            {patient.traitementActuel && (
              <div className="md:col-span-2">
                <strong>Traitement actuel:</strong> {patient.traitementActuel}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Formulaire d'ordonnance */}
      <Card>
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <FileText className="h-5 w-5" />
            Nouvelle Ordonnance
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <Calendar className="h-4 w-4" />
            <span>Date: {new Date().toLocaleDateString('fr-FR')}</span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="nouveauTraitement">Nouveau Traitement *</Label>
              <Textarea
                id="nouveauTraitement"
                value={formData.nouveauTraitement}
                onChange={(e) => setFormData({ ...formData, nouveauTraitement: e.target.value })}
                required
                className="mt-1"
                rows={4}
                placeholder="Exemple: Paracétamol 1000mg..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="posologie">Posologie *</Label>
                <Input
                  id="posologie"
                  value={formData.posologie}
                  onChange={(e) => setFormData({ ...formData, posologie: e.target.value })}
                  required
                  className="mt-1"
                  placeholder="Exemple: 1 comprimé 3 fois par jour"
                />
              </div>
              <div>
                <Label htmlFor="duree">Durée du traitement *</Label>
                <Input
                  id="duree"
                  value={formData.duree}
                  onChange={(e) => setFormData({ ...formData, duree: e.target.value })}
                  required
                  className="mt-1"
                  placeholder="Exemple: 7 jours"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes supplémentaires</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1"
                rows={3}
                placeholder="Instructions particulières, contre-indications..."
              />
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
              Créer l'Ordonnance
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdonnanceForm;
