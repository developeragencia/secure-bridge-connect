
import { useState, useEffect, useMemo } from 'react';
import { Audit, AuditSummary } from '@/types/audit';
import { toast } from 'sonner';

const mockAudits: Audit[] = [
  {
    id: '1',
    clientName: 'Empresa ABC Ltda',
    documentNumber: 'AUD-2023-001',
    auditType: 'Fiscal',
    startDate: '2023-10-10',
    deadline: '2023-11-10',
    status: 'EM_ANDAMENTO',
    documentsCount: 12,
    assignedTo: 'Carlos Oliveira',
    notes: 'Auditoria fiscal para verificação de créditos tributários',
    createdAt: '2023-10-05'
  },
  {
    id: '2',
    clientName: 'Indústrias XYZ S/A',
    documentNumber: 'AUD-2023-002',
    auditType: 'Contábil',
    startDate: '2023-09-15',
    deadline: '2023-10-15',
    status: 'CONCLUIDA',
    documentsCount: 8,
    assignedTo: 'Ana Silva',
    notes: 'Auditoria contábil de rotina',
    createdAt: '2023-09-10',
    updatedAt: '2023-10-14'
  },
  {
    id: '3',
    clientName: 'Comércio FastShop Ltda',
    documentNumber: 'AUD-2023-003',
    auditType: 'Trabalhista',
    startDate: '2023-10-20',
    deadline: '2023-11-20',
    status: 'PENDENTE',
    documentsCount: 5,
    assignedTo: 'Roberto Santos',
    notes: 'Auditoria para verificação de conformidade trabalhista',
    createdAt: '2023-10-18'
  },
  {
    id: '4',
    clientName: 'Tech Solutions Ltda',
    documentNumber: 'AUD-2023-004',
    auditType: 'Fiscal',
    startDate: '2023-08-05',
    deadline: '2023-09-05',
    status: 'CANCELADA',
    documentsCount: 0,
    notes: 'Auditoria cancelada a pedido do cliente',
    createdAt: '2023-08-01',
    updatedAt: '2023-08-10'
  },
  {
    id: '5',
    clientName: 'Empresa ABC Ltda',
    documentNumber: 'AUD-2023-005',
    auditType: 'Previdenciária',
    startDate: '2023-10-01',
    deadline: '2023-10-30',
    status: 'EM_ANDAMENTO',
    documentsCount: 7,
    assignedTo: 'Mariana Costa',
    notes: 'Auditoria de conformidade previdenciária',
    createdAt: '2023-09-28'
  }
];

export const useAuditManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [audits, setAudits] = useState<Audit[]>(mockAudits);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentAudit, setCurrentAudit] = useState<Audit | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Filter audits based on search query and filters
  const filteredAudits = useMemo(() => {
    return audits.filter(audit => {
      const matchesSearch = 
        audit.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        audit.documentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        audit.auditType.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter ? audit.status === statusFilter : true;
      const matchesType = typeFilter ? audit.auditType === typeFilter : true;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [audits, searchQuery, statusFilter, typeFilter]);

  // Calculate summary statistics
  const summary: AuditSummary = useMemo(() => {
    return {
      total: audits.length,
      pendentes: audits.filter(a => a.status === 'PENDENTE').length,
      emAndamento: audits.filter(a => a.status === 'EM_ANDAMENTO').length,
      concluidas: audits.filter(a => a.status === 'CONCLUIDA').length,
      canceladas: audits.filter(a => a.status === 'CANCELADA').length
    };
  }, [audits]);

  // Simulate loading data
  const handleRefresh = () => {
    setIsLoading(true);
    setIsListening(true);
    
    setTimeout(() => {
      // Simulate API call completion
      setIsLoading(false);
      
      // Simulate voice recognition running for a bit longer
      setTimeout(() => {
        setIsListening(false);
        toast.success('Dados atualizados com sucesso');
      }, 1000);
    }, 1500);
  };

  // Handle creating a new audit
  const handleCreateAudit = () => {
    setCurrentAudit(null);
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  // Handle saving an audit (create or update)
  const handleSaveAudit = (auditData: Partial<Audit>) => {
    if (isEditMode && currentAudit) {
      // Update existing audit
      const updatedAudits = audits.map(audit => 
        audit.id === currentAudit.id ? { ...audit, ...auditData, updatedAt: new Date().toISOString() } : audit
      );
      setAudits(updatedAudits);
      toast.success('Auditoria atualizada com sucesso');
    } else {
      // Create new audit
      const newAudit: Audit = {
        id: `${audits.length + 1}`,
        clientName: auditData.clientName || '',
        documentNumber: auditData.documentNumber || '',
        auditType: auditData.auditType || '',
        startDate: auditData.startDate || new Date().toISOString(),
        deadline: auditData.deadline || new Date().toISOString(),
        status: auditData.status || 'PENDENTE',
        documentsCount: auditData.documentsCount || 0,
        assignedTo: auditData.assignedTo,
        notes: auditData.notes,
        createdAt: new Date().toISOString()
      };
      setAudits([...audits, newAudit]);
      toast.success('Nova auditoria criada com sucesso');
    }
    setIsFormOpen(false);
  };

  // Handle editing an audit
  const handleEditAudit = (audit: Audit) => {
    setCurrentAudit(audit);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  // Handle deleting an audit
  const handleDeleteAudit = (audit: Audit) => {
    const updatedAudits = audits.filter(a => a.id !== audit.id);
    setAudits(updatedAudits);
    toast.success('Auditoria excluída com sucesso');
  };

  // Handle approving an audit (changing status to CONCLUIDA)
  const handleApproveAudit = (audit: Audit) => {
    const updatedAudits = audits.map(a => 
      a.id === audit.id ? { ...a, status: 'CONCLUIDA', updatedAt: new Date().toISOString() } : a
    );
    setAudits(updatedAudits);
    toast.success('Auditoria aprovada com sucesso');
  };

  // Handle viewing audit details
  const handleViewDetails = (audit: Audit) => {
    toast.info('Visualizando detalhes da auditoria', {
      description: `${audit.clientName} - ${audit.documentNumber}`
    });
  };

  // Handle downloading audit documents
  const handleDownloadDocuments = (audit: Audit) => {
    toast.info('Baixando documentos da auditoria', {
      description: `${audit.documentsCount} documentos disponíveis para download`
    });
  };

  // Initialize data
  useEffect(() => {
    // In a real app, we would fetch data from an API here
    setIsLoading(true);
    
    setTimeout(() => {
      setAudits(mockAudits);
      setIsLoading(false);
    }, 1000);
  }, []);

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
    handleApproveAudit
  };
};
