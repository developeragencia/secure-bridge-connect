
import { useState, useEffect } from 'react';
import { TaxCredit, TaxCreditSummary } from '@/types/tax-credits';
import { toast } from 'sonner';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';

// Mock data generator function
const generateMockTaxCredits = (): TaxCredit[] => {
  return Array.from({ length: 8 }, (_, i) => ({
    id: `credit-${i + 1}`,
    clientId: `client-${Math.floor(Math.random() * 5) + 1}`,
    clientName: `Client ${Math.floor(Math.random() * 5) + 1}`,
    documentNumber: `${Math.floor(Math.random() * 90000000) + 10000000}/${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 90) + 10}`,
    creditType: ['IRRF', 'PIS', 'COFINS', 'CSLL', 'OTHER'][Math.floor(Math.random() * 5)] as any,
    creditAmount: Math.floor(Math.random() * 1000000) + 10000,
    originalAmount: Math.floor(Math.random() * 1500000) + 50000,
    periodStart: new Date(2020, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    periodEnd: new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    status: ['PENDING', 'ANALYZING', 'APPROVED', 'REJECTED', 'RECOVERED'][Math.floor(Math.random() * 5)] as any,
    createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    updatedAt: new Date().toISOString(),
    assignedTo: Math.random() > 0.5 ? `Usuario ${Math.floor(Math.random() * 5) + 1}` : undefined,
  }));
};

// Mock summary generator
const generateMockSummary = (): TaxCreditSummary => {
  return {
    totalCredits: Math.floor(Math.random() * 5000000) + 1000000,
    pendingCredits: Math.floor(Math.random() * 1000000) + 100000,
    approvedCredits: Math.floor(Math.random() * 3000000) + 500000,
    recoveredCredits: Math.floor(Math.random() * 1000000) + 100000,
    rejectedCredits: Math.floor(Math.random() * 500000) + 50000,
  };
};

export const useTaxCreditManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [taxCredits, setTaxCredits] = useState<TaxCredit[]>([]);
  const [summary, setSummary] = useState<TaxCreditSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Use real-time updates
  const { isListening } = useRealtimeUpdates({
    tableName: 'tax_credits',
    onInsert: (newCredit) => {
      setTaxCredits(prev => [newCredit, ...prev]);
      fetchSummaryData(); // Update summary when new data is added
    },
    onUpdate: (updatedCredit) => {
      setTaxCredits(prev => 
        prev.map(credit => credit.id === updatedCredit.id ? updatedCredit : credit)
      );
      fetchSummaryData(); // Update summary when data is changed
    },
    onDelete: (deletedCredit) => {
      setTaxCredits(prev => prev.filter(credit => credit.id !== deletedCredit.id));
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
        const mockData = generateMockTaxCredits();
        setTaxCredits(mockData);
        fetchSummaryData();
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching tax credits:', error);
      toast.error('Erro ao carregar créditos tributários');
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

  const handleCreateCredit = () => {
    toast.success('Novo crédito tributário', {
      description: 'Formulário de criação aberto',
    });
    // This would open a form in a real app
  };

  const handleViewDetails = (creditId: string) => {
    toast.info('Visualizando detalhes', {
      description: `Detalhes do crédito #${creditId}`,
    });
    // This would navigate to a details page in a real app
  };

  const handleExportData = () => {
    toast.success('Exportando dados', {
      description: 'O download começará em breve',
    });
    // This would generate a download in a real app
  };

  // Filter tax credits
  const filteredCredits = taxCredits.filter(credit => {
    const matchesSearch = credit.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      credit.documentNumber.includes(searchQuery);
    const matchesStatus = statusFilter ? credit.status === statusFilter : true;
    const matchesType = typeFilter ? credit.creditType === typeFilter : true;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredCredits,
    summary,
    isLoading,
    isListening,
    handleRefresh,
    handleCreateCredit,
    handleViewDetails,
    handleExportData,
  };
};
