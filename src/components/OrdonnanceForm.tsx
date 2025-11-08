
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Patient, Ordonnance, Medicament } from '@/types/medical';
import { FileText, ArrowLeft, User, Calendar, Plus, X } from 'lucide-react';

interface OrdonnanceFormProps {
  patient: Patient;
  onCreateOrdonnance: (ordonnance: Omit<Ordonnance, 'id' | 'dateOrdonnance'>) => void;
  onBack: () => void;
}

const OrdonnanceForm: React.FC<OrdonnanceFormProps> = ({ patient, onCreateOrdonnance, onBack }) => {
  const [medicaments, setMedicaments] = useState<Medicament[]>([
    { nom: '', posologie: '', duree: '' }
  ]);
  const [notes, setNotes] = useState('');
  const lastInputRef = useRef<HTMLInputElement>(null);

  const addNewMedicamentRow = () => {
    setMedicaments([...medicaments, { nom: '', posologie: '', duree: '' }]);
  };

  const removeMedicamentRow = (index: number) => {
    if (medicaments.length > 1) {
      setMedicaments(medicaments.filter((_, i) => i !== index));
    }
  };

  const updateMedicament = (index: number, field: keyof Medicament, value: string) => {
    const newMedicaments = [...medicaments];
    newMedicaments[index][field] = value;
    setMedicaments(newMedicaments);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentMed = medicaments[index];
      // Ajouter une nouvelle ligne si tous les champs de la ligne actuelle sont remplis
      if (currentMed.nom && currentMed.posologie && currentMed.duree) {
        addNewMedicamentRow();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtrer les médicaments vides
    const validMedicaments = medicaments.filter(
      med => med.nom.trim() && med.posologie.trim() && med.duree.trim()
    );
    
    if (validMedicaments.length > 0) {
      onCreateOrdonnance({
        patientId: patient.id,
        medicaments: validMedicaments,
        notes
      });
      setMedicaments([{ nom: '', posologie: '', duree: '' }]);
      setNotes('');
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
              <div className="flex items-center justify-between mb-3">
                <Label>Médicaments *</Label>
                <span className="text-sm text-muted-foreground">
                  Appuyez sur Entrée pour ajouter un nouveau médicament
                </span>
              </div>
              
              <div className="space-y-3">
                {medicaments.map((medicament, index) => (
                  <div key={index} className="grid grid-cols-12 gap-3 items-start p-3 rounded-lg border bg-muted/20">
                    <div className="col-span-12 md:col-span-4">
                      <Input
                        value={medicament.nom}
                        onChange={(e) => updateMedicament(index, 'nom', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        placeholder="Nom du médicament"
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <Input
                        value={medicament.posologie}
                        onChange={(e) => updateMedicament(index, 'posologie', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        placeholder="Posologie (ex: 1cp x3/j)"
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-11 md:col-span-3">
                      <Input
                        value={medicament.duree}
                        onChange={(e) => updateMedicament(index, 'duree', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        placeholder="Durée (ex: 7j)"
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      {medicaments.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMedicamentRow(index)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={addNewMedicamentRow}
                className="mt-3 w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un médicament
              </Button>
            </div>

            <div>
              <Label htmlFor="notes">Notes supplémentaires</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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
