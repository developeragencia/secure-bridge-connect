
import React, { useState } from 'react';
import { 
  Card, CardContent, CardFooter, CardHeader
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Audit, AuditSummary } from '@/types/audit';

// Import components
import AuditStatusCards from './components/AuditStatusCards';
import AuditFilters from './components/AuditFilters';
import AuditTable from './components/AuditTable';
import AuditHeader from './components/AuditHeader';

const AuditManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>();
  
  const auditProcesses: Audit[] = [
    {
      id: "1",
      clientId: "client-001",
      clientName: "Empresa ABC Ltda",
      documentNumber: "12.345.678/0001-90",
      auditType: "IRRF Completa",
      startDate: "2023-05-15T10:30:00Z",
      deadline: "2023-06-15T10:30:00Z",
      status: "EM_ANDAMENTO",
      assignedTo: "Maria Auditora",
      documentsCount: 15
    },
    {
      id: "2",
      clientId: "client-002",
      clientName: "Indústria XYZ S.A.",
      documentNumber: "23.456.789/0001-10",
      auditType: "PIS/COFINS",
      startDate: "2023-06-10T09:15:00Z",
      deadline: "2023-07-10T09:15:00Z",
      status: "PENDENTE",
      assignedTo: "João Fiscal",
      documentsCount: 8
    },
    {
      id: "3",
      clientId: "client-003",
      clientName: "Comércio DEF Eireli",
      documentNumber: "34.567.890/0001-21",
      auditType: "IRRF Simplificada",
      startDate: "2023-04-20T11:45:00Z",
      deadline: "2023-05-20T11:45:00Z",
      status: "CONCLUIDA",
      assignedTo: "Carlos Auditor",
      documentsCount: 12
    },
    {
      id: "4",
      clientId: "client-004",
      clientName: "Serviços GHI S.A.",
      documentNumber: "45.678.901/0001-32",
      auditType: "CSLL",
      startDate: "2023-06-05T08:00:00Z",
      deadline: "2023-07-05T08:00:00Z",
      status: "CANCELADA",
      assignedTo: "Ana Fiscal",
      documentsCount: 5
    }
  ];
  
  const statusColors: Record<string, string> = {
    EM_ANDAMENTO: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    PENDENTE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    CONCLUIDA: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    CANCELADA: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  };
  
  const statusSummary: AuditSummary = {
    total: auditProcesses.length,
    emAndamento: auditProcesses.filter(a => a.status === "EM_ANDAMENTO").length,
    pendente: auditProcesses.filter(a => a.status === "PENDENTE").length,
    concluida: auditProcesses.filter(a => a.status === "CONCLUIDA").length,
    cancelada: auditProcesses.filter(a => a.status === "CANCELADA").length
  };
  
  // First click functionality
  const handleCreateAudit = () => {
    toast({
      title: "Nova auditoria",
      description: "Formulário de cadastro de auditoria aberto",
    });
  };
  
  // Second click functionality
  const handleDownloadDocuments = (auditId: string) => {
    toast({
      title: "Download de documentos",
      description: `Baixando documentos da auditoria ID: ${auditId}`,
    });
  };

  // Added a new functionality for viewing audit details
  const handleViewAuditDetails = (auditId: string) => {
    toast({
      title: "Detalhes da auditoria",
      description: `Visualizando detalhes da auditoria ID: ${auditId}`,
    });
  };
  
  return (
    <div className="space-y-6">
      <AuditStatusCards summary={statusSummary} />
      
      <Card>
        <CardHeader>
          <AuditHeader onCreateAudit={handleCreateAudit} />
          <AuditFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </CardHeader>
        <CardContent>
          <AuditTable 
            audits={auditProcesses}
            onDownloadDocuments={handleDownloadDocuments}
            onViewDetails={handleViewAuditDetails}
            statusColors={statusColors}
          />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {auditProcesses.length} de {auditProcesses.length} auditorias
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" disabled>
              Próximo
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuditManagement;
