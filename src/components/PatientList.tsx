
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Patient } from '@/types/medical';
import { User, Calendar, Weight, MapPin, FileText } from 'lucide-react';

interface PatientListProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onSelectPatient }) => {
  if (patients.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Aucun patient enregistré</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Liste des Patients ({patients.length})</h2>
      {patients.map((patient) => (
        <Card key={patient.id} className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {patient.prenom} {patient.nom}
                    </h3>
                  </div>
                  <Badge variant={patient.sexe === 'Homme' ? 'default' : 'secondary'}>
                    {patient.sexe}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{patient.age} ans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Weight className="h-4 w-4" />
                    <span>{patient.poids} kg</span>
                  </div>
                  {patient.adresse && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{patient.adresse}</span>
                    </div>
                  )}
                </div>
                
                {patient.pathologie && (
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-4 w-4 text-red-600" />
                      <span className="font-medium text-red-800">Pathologie:</span>
                    </div>
                    <p className="text-red-700 text-sm">{patient.pathologie}</p>
                  </div>
                )}
                
                {patient.traitementActuel && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">Traitement actuel:</span>
                    </div>
                    <p className="text-green-700 text-sm">{patient.traitementActuel}</p>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={() => onSelectPatient(patient)}
                className="ml-4 bg-green-600 hover:bg-green-700"
              >
                Créer Ordonnance
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PatientList;
