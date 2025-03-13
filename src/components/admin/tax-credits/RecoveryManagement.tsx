
import React, { useState } from 'react';
import { 
  Card, CardContent, CardFooter, CardHeader
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { RecoveryProcess } from '@/types/recovery';

// Import new components
import RecoverySummaryCards from './components/recovery/RecoverySummaryCards';
import RecoveryHeader from './components/recovery/RecoveryHeader';
import RecoveryFilters from './components/recovery/RecoveryFilters';
import RecoveryTable from './components/recovery/RecoveryTable';
import RecoveryPagination from './components/recovery/RecoveryPagination';

const RecoveryManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>();
  
  const recoveryProcesses: RecoveryProcess[] = [
    {
      id: "1",
      clientId: "client-001",
      clientName: "Empresa ABC Ltda",
      documentNumber: "12.345.678/0001-90",
      creditType: "IRRF",
      originalAmount: 78000.00,
      recoveredAmount: 62400.00,
      recoveryPercent: 80,
      startDate: "2023-04-15T10:30:00Z",
      status: "EM_ANDAMENTO",
      processNumber: "10520.123456/2023-12"
    },
    {
      id: "2",
      clientId: "client-002",
      clientName: "Indústria XYZ S.A.",
      documentNumber: "23.456.789/0001-10",
      creditType: "PIS/COFINS",
      originalAmount: 125000.00,
      recoveredAmount: 125000.00,
      recoveryPercent: 100,
      startDate: "2023-02-20T09:15:00Z",
      status: "CONCLUIDO",
      processNumber: "10520.234567/2023-34"
    },
    {
      id: "3",
      clientId: "client-003",
      clientName: "Comércio DEF Eireli",
      documentNumber: "34.567.890/0001-21",
      creditType: "IRRF",
      originalAmount: 45000.00,
      recoveredAmount: 0.00,
      recoveryPercent: 0,
      startDate: "2023-06-10T11:45:00Z",
      status: "INICIAL",
      processNumber: "10520.345678/2023-56"
    },
    {
      id: "4",
      clientId: "client-004",
      clientName: "Serviços GHI S.A.",
      documentNumber: "45.678.901/0001-32",
      creditType: "CSLL",
      originalAmount: 35000.00,
      recoveredAmount: 28000.00,
      recoveryPercent: 80,
      startDate: "2023-03-05T08:00:00Z",
      status: "PARCIAL",
      processNumber: "10520.456789/2023-78"
    }
  ];
  
  const statusColors: Record<string, string> = {
    INICIAL: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    EM_ANDAMENTO: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    PARCIAL: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    CONCLUIDO: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  };
  
  const statusLabels: Record<string, string> = {
    INICIAL: "Inicial",
    EM_ANDAMENTO: "Em Andamento",
    PARCIAL: "Recuperação Parcial",
    CONCLUIDO: "Concluído"
  };
  
  const summaryData = {
    totalCredits: recoveryProcesses.reduce((sum, p) => sum + p.originalAmount, 0),
    recoveredAmount: recoveryProcesses.reduce((sum, p) => sum + p.recoveredAmount, 0),
    avgRecoveryRate: Math.round(
      recoveryProcesses.reduce((sum, p) => sum + p.recoveryPercent, 0) / recoveryProcesses.length
    ),
    completedProcesses: recoveryProcesses.filter(p => p.status === "CONCLUIDO").length
  };
  
  const handleViewProcessDetails = (processId: string) => {
    toast({
      title: "Detalhes do processo",
      description: `Visualizando detalhes do processo ID: ${processId}`,
    });
  };
  
  const handleGenerateReport = (processId: string) => {
    toast({
      title: "Relatório gerado",
      description: `Relatório do processo ID: ${processId} gerado com sucesso`,
    });
  };
  
  console.log("Rendering RecoveryManagement component");
  
  return (
    <div className="space-y-6">
      <RecoverySummaryCards summary={summaryData} />
      
      <Card>
        <CardHeader>
          <RecoveryHeader />
          <RecoveryFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            statusLabels={statusLabels}
          />
        </CardHeader>
        <CardContent>
          <RecoveryTable 
            recoveryProcesses={recoveryProcesses}
            statusColors={statusColors}
            statusLabels={statusLabels}
            onViewDetails={handleViewProcessDetails}
            onGenerateReport={handleGenerateReport}
          />
        </CardContent>
        <CardFooter>
          <RecoveryPagination 
            totalItems={recoveryProcesses.length}
            itemsShown={recoveryProcesses.length}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecoveryManagement;
