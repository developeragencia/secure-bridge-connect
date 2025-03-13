
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AuditStatusCards from './components/AuditStatusCards';
import AuditHeader from './components/AuditHeader';
import AuditFilters from './components/AuditFilters';
import AuditTable from './components/AuditTable';
import { Audit, AuditSummary } from '@/types/audit';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';
import { toast } from 'sonner';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';

// Mock data generator for audits
const generateMockAudits = (): Audit[] => {
  return Array.from({ length: 8 }, (_, i) => ({
    id: `audit-${i + 1}`,
    clientId: `client-${Math.floor(Math.random() * 5) + 1}`,
    clientName: `Cliente ${Math.floor(Math.random() * 5) + 1}`,
    documentNumber: `${Math.floor(Math.random() * 90000000) + 10000000}/${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 90) + 10}`,
    auditType: ['Fiscal', 'Contábil', 'Trabalhista', 'Previdenciária'][Math.floor(Math.random() * 4)],
    startDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    deadline: new Date(2023, Math.floor(Math.random() * 12) + 1, Math.floor(Math.random() * 28) + 1).toISOString(),
    status: ['EM_ANDAMENTO', 'PENDENTE', 'CONCLUIDA', 'CANCELADA'][Math.floor(Math.random() * 4)] as any,
    assignedTo: `Auditor ${Math.floor(Math.random() * 5) + 1}`,
    documentsCount: Math.floor(Math.random() * 20) + 1
  }));
};

// Mock summary generator
const generateMockSummary = (): AuditSummary => {
  return {
    total: Math.floor(Math.random() * 50) + 20,
    emAndamento: Math.floor(Math.random() * 15) + 5,
    pendente: Math.floor(Math.random() * 10) + 2,
    concluida: Math.floor(Math.random() * 20) + 10,
    cancelada: Math.floor(Math.random() * 5)
  };
};

const AuditManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [audits, setAudits] = useState<Audit[]>([]);
  const [summary, setSummary] = useState<AuditSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const { classes: cardClasses } = useAnimationOnScroll<HTMLDivElement>({
    threshold: 0.1,
    transitionType: 'fade-in',
  });

  // Use real-time updates
  const { isListening } = useRealtimeUpdates({
    tableName: 'audits',
    onInsert: (newAudit) => {
      setAudits(prev => [newAudit, ...prev]);
      fetchSummaryData(); // Update summary when new data is added
    },
    onUpdate: (updatedAudit) => {
      setAudits(prev => 
        prev.map(audit => audit.id === updatedAudit.id ? updatedAudit : audit)
      );
      fetchSummaryData(); // Update summary when data is changed
    },
    onDelete: (deletedAudit) => {
      setAudits(prev => prev.filter(audit => audit.id !== deletedAudit.id));
      fetchSummaryData(); // Update summary when data is removed
    }
  });

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be a database call
      // For now, we'll use mock data
      setTimeout(() => {
        const mockData = generateMockAudits();
        setAudits(mockData);
        fetchSummaryData();
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching audits:', error);
      toast.error('Erro ao carregar auditorias');
      setIsLoading(false);
    }
  };

  const fetchSummaryData = () => {
    // In a real app, this would be a database call
    // For now, we'll use mock data
    const mockSummary = generateMockSummary();
    setSummary(mockSummary);
  };

  const handleRefresh = () => {
    toast.info('Atualizando dados...');
    setRefreshKey(prev => prev + 1);
  };

  const handleCreateAudit = () => {
    toast.success('Nova auditoria', {
      description: 'Formulário de criação aberto',
    });
    // This would open a form in a real app
  };

  const handleDownloadDocuments = (auditId: string) => {
    toast.success('Baixando documentos', {
      description: `Documentos da auditoria #${auditId}`,
    });
    // This would generate a download in a real app
  };

  const handleViewDetails = (auditId: string) => {
    toast.info('Visualizando detalhes', {
      description: `Detalhes da auditoria #${auditId}`,
    });
    // This would navigate to a details page in a real app
  };

  const handleEditAudit = (auditId: string) => {
    toast.info('Editando auditoria', {
      description: `Formulário de edição para a auditoria #${auditId}`,
    });
    // This would open an edit form in a real app
  };

  const handleDeleteAudit = (auditId: string) => {
    toast.success('Auditoria excluída', {
      description: `A auditoria #${auditId} foi excluída com sucesso`,
    });
    // In a real app, this would call an API to delete the audit
    setAudits(prev => prev.filter(audit => audit.id !== auditId));
    fetchSummaryData();
  };

  const handleApproveAudit = (auditId: string) => {
    toast.success('Auditoria aprovada', {
      description: `A auditoria #${auditId} foi aprovada com sucesso`,
    });
    // In a real app, this would call an API to update the audit status
    setAudits(prev => 
      prev.map(audit => 
        audit.id === auditId 
          ? { ...audit, status: 'CONCLUIDA' } 
          : audit
      )
    );
    fetchSummaryData();
  };

  // Filter audits
  const filteredAudits = audits.filter(audit => {
    const matchesSearch = audit.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.documentNumber.includes(searchQuery);
    const matchesStatus = statusFilter ? audit.status === statusFilter : true;
    const matchesType = typeFilter ? audit.auditType === typeFilter : true;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <AuditHeader 
        onRefresh={handleRefresh} 
        onCreateAudit={handleCreateAudit}
        isListening={isListening}
      />

      {/* Status Cards */}
      {summary && (
        <AuditStatusCards 
          summary={summary} 
          className={cardClasses}
        />
      )}

      {/* Filters */}
      <AuditFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      {/* Audits Table */}
      <Card>
        <AuditTable 
          audits={filteredAudits} 
          isLoading={isLoading} 
          onViewDetails={handleViewDetails}
          onDownloadDocuments={handleDownloadDocuments}
          onEdit={handleEditAudit}
          onDelete={handleDeleteAudit}
          onApprove={handleApproveAudit}
        />
      </Card>
    </div>
  );
};

export default AuditManagement;
