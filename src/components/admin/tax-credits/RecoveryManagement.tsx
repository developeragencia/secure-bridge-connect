import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { RecoveryProcess, RecoverySummary } from '@/types/recovery';
import { toast } from 'sonner';
import RecoverySummaryCards from './components/recovery/RecoverySummaryCards';
import RecoveryHeader from './components/recovery/RecoveryHeader';
import RecoveryFilters from './components/recovery/RecoveryFilters';
import RecoveryTable from './components/recovery/RecoveryTable';
import RecoveryPagination from './components/recovery/RecoveryPagination';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';

// Mock data generators
const generateMockRecoveryProcesses = (): RecoveryProcess[] => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: `process-${i + 1}`,
    clientId: `client-${Math.floor(Math.random() * 5) + 1}`,
    clientName: `Cliente ${Math.floor(Math.random() * 5) + 1}`,
    documentNumber: `${Math.floor(Math.random() * 90000000) + 10000000}/${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 90) + 10}`,
    creditType: ['IRPJ', 'CSLL', 'PIS/COFINS', 'INSS', 'IRRF', 'OUTROS'][Math.floor(Math.random() * 6)],
    processType: ['Restituição', 'Compensação', 'Regularização'][Math.floor(Math.random() * 3)],
    originalAmount: Math.floor(Math.random() * 1000000) + 50000,
    recoveredAmount: Math.floor(Math.random() * 500000) + 10000,
    recoveryPercent: Math.random() * 100,
    startDate: new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    currentStatus: ['Em análise', 'Em processamento', 'Concluído', 'Cancelado'][Math.floor(Math.random() * 4)],
    status: ['INICIAL', 'EM_ANDAMENTO', 'PARCIAL', 'CONCLUIDO'][Math.floor(Math.random() * 4)],
    responsiblePerson: `Responsável ${Math.floor(Math.random() * 5) + 1}`,
    processNumber: `${Math.floor(Math.random() * 9000) + 1000}.${Math.floor(Math.random() * 9000) + 1000}/${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 90) + 10}`,
    completionDate: Math.random() > 0.5 ? new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString() : undefined
  }));
};

const generateMockSummary = (): RecoverySummary => {
  return {
    totalProcesses: Math.floor(Math.random() * 100) + 20,
    completedProcesses: Math.floor(Math.random() * 50) + 10,
    inProgressProcesses: Math.floor(Math.random() * 30) + 5,
    successRate: Math.random() * 100,
    totalCredits: Math.floor(Math.random() * 10000000) + 1000000,
    recoveredAmount: Math.floor(Math.random() * 5000000) + 500000,
    avgRecoveryRate: Math.random() * 100
  };
};

const RecoveryManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [processes, setProcesses] = useState<RecoveryProcess[]>([]);
  const [summary, setSummary] = useState<RecoverySummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const itemsPerPage = 6;

  // Use real-time updates
  const { isListening } = useRealtimeUpdates({
    tableName: 'recovery_processes',
    onInsert: (newProcess) => {
      setProcesses(prev => [newProcess, ...prev]);
      fetchSummaryData(); // Update summary when new data is added
    },
    onUpdate: (updatedProcess) => {
      setProcesses(prev => 
        prev.map(process => process.id === updatedProcess.id ? updatedProcess : process)
      );
      fetchSummaryData(); // Update summary when data is changed
    },
    onDelete: (deletedProcess) => {
      setProcesses(prev => prev.filter(process => process.id !== deletedProcess.id));
      fetchSummaryData(); // Update summary when data is removed
    }
  });

  // Fetch data
  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be a database call
      // For now, we'll use mock data
      setTimeout(() => {
        const mockData = generateMockRecoveryProcesses();
        setProcesses(mockData);
        fetchSummaryData();
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching recovery processes:', error);
      toast.error('Erro ao carregar processos de recuperação');
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

  const handleNewProcess = () => {
    toast.success('Novo processo', {
      description: 'Formulário de criação aberto',
    });
    // This would open a form in a real app
  };

  const handleViewProcessDetails = (processId: string) => {
    toast.info('Visualizando detalhes', {
      description: `Detalhes do processo #${processId}`,
    });
    // This would navigate to a details page in a real app
  };

  const handleGenerateReport = (processId: string) => {
    toast.success('Gerando relatório', {
      description: `Relatório do processo #${processId} será baixado em breve`,
    });
    // This would generate a report in a real app
  };

  const handleEditProcess = (processId: string) => {
    toast.info('Editando processo', {
      description: `Formulário de edição para o processo #${processId}`,
    });
    // This would open an edit form in a real app
  };

  const handleDeleteProcess = (processId: string) => {
    toast.success('Processo excluído', {
      description: `O processo #${processId} foi excluído com sucesso`,
    });
    // In a real app, this would call an API to delete the process
    setProcesses(prev => prev.filter(process => process.id !== processId));
    fetchSummaryData();
  };

  const handleApproveProcess = (processId: string) => {
    toast.success('Processo aprovado', {
      description: `O processo #${processId} foi aprovado com sucesso`,
    });
    // In a real app, this would call an API to update the process status
    setProcesses(prev => 
      prev.map(process => 
        process.id === processId 
          ? { ...process, status: 'CONCLUIDO' } 
          : process
      )
    );
    fetchSummaryData();
  };

  // Filter and paginate processes
  const filteredProcesses = processes.filter(process => {
    const matchesSearch = process.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      process.documentNumber.includes(searchQuery) ||
      process.processNumber.includes(searchQuery);
    const matchesStatus = statusFilter ? process.status === statusFilter : true;
    const matchesType = typeFilter ? process.creditType === typeFilter : true;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const paginatedProcesses = filteredProcesses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProcesses.length / itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <RecoveryHeader 
        onRefresh={handleRefresh} 
        onNewProcess={handleNewProcess}
        isListening={isListening}
      />

      {/* Summary Cards */}
      {summary && (
        <RecoverySummaryCards summary={summary} />
      )}

      {/* Filters */}
      <RecoveryFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      {/* Processes Table */}
      <Card>
        <RecoveryTable 
          processes={paginatedProcesses} 
          isLoading={isLoading} 
          onViewDetails={handleViewProcessDetails}
          onGenerateReport={handleGenerateReport}
          onEdit={handleEditProcess}
          onDelete={handleDeleteProcess}
          onApprove={handleApproveProcess}
        />
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <RecoveryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default RecoveryManagement;
