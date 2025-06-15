
import React, { useState } from 'react';
import { Patient, Ordonnance } from '@/types/medical';
import PatientForm from '@/components/PatientForm';
import PatientList from '@/components/PatientList';
import OrdonnanceForm from '@/components/OrdonnanceForm';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, FileText, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [ordonnances, setOrdonnances] = useState<Ordonnance[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [currentView, setCurrentView] = useState<'patients' | 'ordonnance'>('patients');
  const { toast } = useToast();

  const addPatient = (patientData: Omit<Patient, 'id' | 'dateInscription'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString(),
      dateInscription: new Date()
    };
    setPatients([...patients, newPatient]);
    toast({
      title: "Patient enregistré",
      description: `${patientData.prenom} ${patientData.nom} a été ajouté avec succès.`,
    });
  };

  const createOrdonnance = (ordonnanceData: Omit<Ordonnance, 'id' | 'dateOrdonnance'>) => {
    const newOrdonnance: Ordonnance = {
      ...ordonnanceData,
      id: Date.now().toString(),
      dateOrdonnance: new Date()
    };
    setOrdonnances([...ordonnances, newOrdonnance]);
    toast({
      title: "Ordonnance créée",
      description: "L'ordonnance a été créée avec succès.",
    });
    setCurrentView('patients');
    setSelectedPatient(null);
  };

  const selectPatientForOrdonnance = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentView('ordonnance');
  };

  const backToPatients = () => {
    setCurrentView('patients');
    setSelectedPatient(null);
  };

  if (currentView === 'ordonnance' && selectedPatient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className="container mx-auto py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">Cabinet Médical</h1>
            </div>
            <p className="text-gray-600">Mode Ordonnance</p>
          </div>
          
          <OrdonnanceForm
            patient={selectedPatient}
            onCreateOrdonnance={createOrdonnance}
            onBack={backToPatients}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Gestionnaire de Cabinet Médical</h1>
          </div>
          <p className="text-gray-600">Gestion des patients et création d'ordonnances</p>
        </div>

        <Tabs defaultValue="nouveau" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="nouveau" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Nouveau Patient
            </TabsTrigger>
            <TabsTrigger value="liste" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Liste Patients
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nouveau" className="space-y-6">
            <PatientForm onAddPatient={addPatient} />
          </TabsContent>

          <TabsContent value="liste" className="space-y-6">
            <PatientList 
              patients={patients} 
              onSelectPatient={selectPatientForOrdonnance}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
