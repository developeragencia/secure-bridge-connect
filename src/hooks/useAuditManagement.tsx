
import { useState, useEffect } from 'react';
import { Audit, AuditSummary } from '@/types/audit';
import { toast } from 'sonner';

// Mock data
const mockAudits: Audit[] = [
  {
    id: 'audit-1',
    clientName: 'Empresa ABC Ltda',
    documentNumber: '12.345.678/0001-99',
    auditType: 'Fiscal',
    startDate: '2023-03-15',
    deadline: '2023-04-15',
    status: 'EM_ANDAMENTO',
    assignedTo: 'João Silva',
    documentsCount: 24,
    date: '2023-03-10',
    priority: 'Alta',
  },
  {
    id: 'audit-2',
    clientName: 'Indústrias XYZ S/A',
    documentNumber: '98.765.432/0001-10',
    auditType: 'Contábil',
    startDate: '2023-04-01',
    deadline: '2023-05-01',
    status: 'PENDENTE',
    assignedTo: 'Maria Oliveira',
    documentsCount: 18,
    date: '2023-03-25',
    priority: 'Média',
  },
  {
    id: 'audit-3',
    clientName: 'Comércio FastShop Ltda',
    documentNumber: '45.678.901/0001-23',
    auditType: 'Financeira',
    startDate: '2023-04-15',
    deadline: '2023-05-15',
    status: 'CONCLUIDA',
    assignedTo: 'Carlos Pereira',
    documentsCount: 30,
    date: '2023-04-10',
    priority: 'Baixa',
  },
  {
    id: 'audit-4',
    clientName: 'Serviços GHI S/A',
    documentNumber: '56.789.012/0001-34',
    auditType: 'Trabalhista',
    startDate: '2023-05-01',
    deadline: '2023-06-01',
    status: 'CANCELADA',
    assignedTo: 'Ana Souza',
    documentsCount: 12,
    date: '2023-04-28',
    priority: 'Alta',
  }
];

const mockSummary: AuditSummary = {
  totalAudits: 35,
  pendingAudits: 12,
  inProgressAudits: 8,
  completedAudits: 10,
  // Add properties used in components
  total: 35,
  emAndamento: 8,
  pendentes: 12,
  concluidas: 10
};

export const useAuditManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [audits, setAudits] = useState<Audit[]>(mockAudits);
  const [summary, setSummary] = useState<AuditSummary>(mockSummary);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentAudit, setCurrentAudit] = useState<Audit | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleRefresh = () => {
    toast.info('Atualizando dados...');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Dados atualizados');
    }, 500);
  };

  const handleCreateAudit = () => {
    setCurrentAudit(null);
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  const handleSaveAudit = (auditData: Audit) => {
    if (isEditMode && currentAudit) {
      // Update existing audit
      setAudits(audits.map(audit => audit.id === currentAudit.id ? auditData : audit));
      toast.success(`Auditoria "${auditData.clientName}" atualizada com sucesso.`);
    } else {
      // Create new audit
      setAudits([...audits, auditData]);
      toast.success(`Auditoria "${auditData.clientName}" criada com sucesso.`);
    }
    setIsFormOpen(false);
  };

  const handleViewDetails = (audit: Audit) => {
    toast.info('Visualizando detalhes', {
      description: `Detalhes da auditoria #${audit.id}`,
    });
  };

  const handleDownloadDocuments = (audit: Audit) => {
    toast.success('Download dos documentos', {
      description: `Download dos documentos da auditoria #${audit.id} iniciado`,
    });
  };

  const handleEditAudit = (audit: Audit) => {
    setCurrentAudit(audit);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  const handleDeleteAudit = (audit: Audit) => {
    toast.warning('Auditoria excluída', {
      description: `Auditoria #${audit.id} excluída com sucesso`,
    });
  };

  const handleApproveAudit = (audit: Audit) => {
    toast.success('Auditoria aprovada', {
      description: `Auditoria #${audit.id} aprovada com sucesso`,
    });
  };

  const filteredAudits = audits.filter(audit => {
    const matchesSearch =
      audit.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.documentNumber.includes(searchQuery);
    const matchesStatus = statusFilter ? audit.status === statusFilter : true;
    const matchesType = typeFilter ? audit.auditType === typeFilter : true;

    return matchesSearch && matchesStatus && matchesType;
  });

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredAudits,
    summary,
    isLoading,
    isListening,
    isFormOpen,
    setIsFormOpen,
    currentAudit,
    isEditMode,
    handleRefresh,
    handleCreateAudit,
    handleSaveAudit,
    handleViewDetails,
    handleDownloadDocuments,
    handleEditAudit,
    handleDeleteAudit,
    handleApproveAudit,
    // Add these properties to make it compatible with the old hook
    audits,
    auditSummary: summary,
    viewDetails: handleViewDetails,
    downloadDocuments: handleDownloadDocuments,
    editAudit: handleEditAudit,
    deleteAudit: handleDeleteAudit,
    approveAudit: handleApproveAudit,
    addNewAudit: handleSaveAudit,
    filterAudits: (query: string) => {
      setSearchQuery(query);
      return filteredAudits;
    }
  };
};
