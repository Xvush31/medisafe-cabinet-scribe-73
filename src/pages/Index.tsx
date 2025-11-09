
import React, { useState, useEffect } from 'react';
import { Patient, Ordonnance, CompteRenduEcho } from '@/types/medical';
import PatientForm from '@/components/PatientForm';
import PatientList from '@/components/PatientList';
import OrdonnanceForm from '@/components/OrdonnanceForm';
import OrdonnancePrint from '@/components/OrdonnancePrint';
import PatientFiche from '@/components/PatientFiche';
import EchoForm from '@/components/EchoForm';
import EchoPrint from '@/components/EchoPrint';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, FileText, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [patients, setPatients] = useState<Patient[]>(() => {
    try {
      const savedPatients = localStorage.getItem('patients');
      if (savedPatients) {
        const parsed = JSON.parse(savedPatients) as Patient[];
        return parsed.map(p => ({ ...p, dateInscription: new Date(p.dateInscription) }));
      }
      return [];
    } catch (e) {
      console.error("Failed to load patients from local storage", e);
      return [];
    }
  });

  const [ordonnances, setOrdonnances] = useState<Ordonnance[]>(() => {
    try {
      const savedOrdonnances = localStorage.getItem('ordonnances');
      if (savedOrdonnances) {
        const parsed = JSON.parse(savedOrdonnances) as Ordonnance[];
        return parsed.map(o => ({ ...o, dateOrdonnance: new Date(o.dateOrdonnance) }));
      }
      return [];
    } catch (e) {
      console.error("Failed to load ordonnances from local storage", e);
      return [];
    }
  });

  const [echos, setEchos] = useState<CompteRenduEcho[]>(() => {
    try {
      const savedEchos = localStorage.getItem('echos');
      if (savedEchos) {
        const parsed = JSON.parse(savedEchos) as CompteRenduEcho[];
        return parsed.map(e => ({ ...e, dateExamen: new Date(e.dateExamen) }));
      }
      return [];
    } catch (e) {
      console.error("Failed to load echos from local storage", e);
      return [];
    }
  });

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [currentView, setCurrentView] = useState<'patients' | 'ordonnance' | 'print' | 'fiche' | 'echo' | 'echoPrint'>('patients');
  const [currentOrdonnance, setCurrentOrdonnance] = useState<Ordonnance | null>(null);
  const [currentEcho, setCurrentEcho] = useState<CompteRenduEcho | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('ordonnances', JSON.stringify(ordonnances));
  }, [ordonnances]);

  useEffect(() => {
    localStorage.setItem('echos', JSON.stringify(echos));
  }, [echos]);

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
    setCurrentOrdonnance(newOrdonnance);
    setCurrentView('print');
    toast({
      title: "Ordonnance créée",
      description: "L'ordonnance a été créée avec succès.",
    });
  };

  const createEcho = (echoData: Omit<CompteRenduEcho, 'id' | 'dateExamen'>) => {
    const newEcho: CompteRenduEcho = {
      ...echoData,
      id: Date.now().toString(),
      dateExamen: new Date()
    };
    setEchos([...echos, newEcho]);
    setCurrentEcho(newEcho);
    setCurrentView('echoPrint');
    toast({
      title: "Compte Rendu créé",
      description: "Le compte rendu d'échographie a été créé avec succès.",
    });
  };

  const selectPatientForOrdonnance = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentView('ordonnance');
  };

  const selectPatientForEcho = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentView('echo');
  };

  const viewPatientFiche = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentView('fiche');
  };

  const backToPatients = () => {
    setCurrentView('patients');
    setSelectedPatient(null);
    setCurrentOrdonnance(null);
    setCurrentEcho(null);
  };

  if (currentView === 'fiche' && selectedPatient) {
    return (
      <PatientFiche
        patient={selectedPatient}
        onClose={backToPatients}
        onCreateOrdonnance={() => setCurrentView('ordonnance')}
        onCreateEcho={() => setCurrentView('echo')}
      />
    );
  }

  if (currentView === 'echoPrint' && selectedPatient && currentEcho) {
    return (
      <EchoPrint
        patient={selectedPatient}
        echo={currentEcho}
        onClose={backToPatients}
      />
    );
  }

  if (currentView === 'print' && selectedPatient && currentOrdonnance) {
    return (
      <OrdonnancePrint
        patient={selectedPatient}
        ordonnance={currentOrdonnance}
        onClose={backToPatients}
      />
    );
  }

  if (currentView === 'echo' && selectedPatient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className="container mx-auto py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">Cabinet Médical</h1>
            </div>
            <p className="text-gray-600">Compte Rendu d'Échographie</p>
          </div>
          
          <EchoForm
            patient={selectedPatient}
            onCreateEcho={createEcho}
            onBack={backToPatients}
          />
        </div>
      </div>
    );
  }

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
              onSelectPatientForEcho={selectPatientForEcho}
              onViewFiche={viewPatientFiche}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
