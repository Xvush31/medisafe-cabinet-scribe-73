
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Patient } from '@/types/medical';
import { UserPlus } from 'lucide-react';

interface PatientFormProps {
  onAddPatient: (patient: Omit<Patient, 'id' | 'dateInscription'>) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onAddPatient }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    age: '',
    sexe: '',
    poids: '',
    adresse: '',
    pathologie: '',
    traitementActuel: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nom && formData.prenom && formData.age && formData.sexe && formData.poids) {
      onAddPatient({
        ...formData,
        age: parseInt(formData.age),
        poids: parseFloat(formData.poids),
        sexe: formData.sexe as 'Homme' | 'Femme'
      });
      setFormData({
        nom: '',
        prenom: '',
        age: '',
        sexe: '',
        poids: '',
        adresse: '',
        pathologie: '',
        traitementActuel: ''
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="bg-blue-50">
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <UserPlus className="h-5 w-5" />
          Nouveau Patient
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nom">Nom *</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="prenom">Prénom *</Label>
              <Input
                id="prenom"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="age">Âge *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
                min="1"
                max="120"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="sexe">Sexe *</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, sexe: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionnez le sexe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Homme">Homme</SelectItem>
                  <SelectItem value="Femme">Femme</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="poids">Poids (kg) *</Label>
              <Input
                id="poids"
                type="number"
                step="0.1"
                value={formData.poids}
                onChange={(e) => setFormData({ ...formData, poids: e.target.value })}
                required
                min="1"
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="adresse">Adresse</Label>
            <Textarea
              id="adresse"
              value={formData.adresse}
              onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
              className="mt-1"
              rows={2}
            />
          </div>
          
          <div>
            <Label htmlFor="pathologie">Pathologie</Label>
            <Textarea
              id="pathologie"
              value={formData.pathologie}
              onChange={(e) => setFormData({ ...formData, pathologie: e.target.value })}
              className="mt-1"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="traitementActuel">Traitement Actuel</Label>
            <Textarea
              id="traitementActuel"
              value={formData.traitementActuel}
              onChange={(e) => setFormData({ ...formData, traitementActuel: e.target.value })}
              className="mt-1"
              rows={3}
            />
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Enregistrer le Patient
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PatientForm;
