
import { useState, useEffect, useMemo } from 'react';
import { TaxCredit, TaxCreditSummary } from '@/types/tax-credits';
import { toast } from 'sonner';

const mockCredits: TaxCredit[] = [
  {
    id: '1',
    clientName: 'Empresa ABC Ltda',
    clientId: 'client-1',
    documentNumber: '12.345.678/0001-99',
    creditType: 'PIS/COFINS',
    creditAmount: 25000,
    periodStart: '2023-01-01',
    periodEnd: '2023-03-31',
    status: 'APPROVED',
    createdAt: '2023-04-10',
    approvedAt: '2023-05-15',
    submittedAt: '2023-04-15',
    attachmentsCount: 8
  },
  {
    id: '2',
    clientName: 'Indústrias XYZ S/A',
    clientId: 'client-2',
    documentNumber: '98.765.432/0001-10',
    creditType: 'IPI',
    creditAmount: 18500,
    periodStart: '2023-01-01',
    periodEnd: '2023-03-31',
    status: 'PENDING',
    createdAt: '2023-04-05',
    submittedAt: '2023-04-08',
    attachmentsCount: 5
  },
  {
    id: '3',
    clientName: 'Comércio FastShop Ltda',
    clientId: 'client-3',
    documentNumber: '45.678.901/0001-23',
    creditType: 'ICMS',
    creditAmount: 32000,
    periodStart: '2023-01-01',
    periodEnd: '2023-03-31',
    status: 'REJECTED',
    createdAt: '2023-04-12',
    submittedAt: '2023-04-15',
    updatedAt: '2023-04-30',
    notes: 'Documentação insuficiente para comprovar o crédito',
    attachmentsCount: 3
  },
  {
    id: '4',
    clientName: 'Tech Solutions Ltda',
    clientId: 'client-4',
    documentNumber: '12.345.678/0002-80',
    creditType: 'PIS/COFINS',
    creditAmount: 15000,
    periodStart: '2023-01-01',
    periodEnd: '2023-03-31',
    status: 'APPROVED',
    createdAt: '2023-03-20',
    approvedAt: '2023-04-25',
    submittedAt: '2023-03-25',
    attachmentsCount: 10
  },
  {
    id: '5',
    clientName: 'Empresa ABC Ltda',
    clientId: 'client-1',
    documentNumber: '12.345.678/0001-99',
    creditType: 'IRRF',
    creditAmount: 8500,
    periodStart: '2023-01-01',
    periodEnd: '2023-03-31',
    status: 'PENDING',
    createdAt: '2023-04-18',
    submittedAt: '2023-04-20',
    attachmentsCount: 4
  }
];

export const useTaxCreditManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState('');
  const [credits, setCredits] = useState<TaxCredit[]>(mockCredits);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Filter credits based on search query and filters
  const filteredCredits = useMemo(() => {
    return credits.filter(credit => {
      const matchesSearch = 
        credit.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        credit.documentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        credit.creditType.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter ? credit.status === statusFilter : true;
      const matchesType = typeFilter ? credit.creditType === typeFilter : true;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [credits, searchQuery, statusFilter, typeFilter]);

  // Calculate summary statistics
  const summary: TaxCreditSummary = useMemo(() => {
    const totalValue = credits.reduce((sum, credit) => sum + credit.creditAmount, 0);
    const pendingValue = credits
      .filter(c => c.status === 'PENDING')
      .reduce((sum, credit) => sum + credit.creditAmount, 0);
    const approvedValue = credits
      .filter(c => c.status === 'APPROVED')
      .reduce((sum, credit) => sum + credit.creditAmount, 0);

    return {
      total: credits.length,
      pendingCount: credits.filter(c => c.status === 'PENDING').length,
      approvedCount: credits.filter(c => c.status === 'APPROVED').length,
      rejectedCount: credits.filter(c => c.status === 'REJECTED').length,
      totalValue,
      pendingValue,
      approvedValue
    };
  }, [credits]);

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

  // Handle creating a new credit
  const handleCreateCredit = () => {
    // This would open a form to create a new credit
    toast.info('Criando novo crédito tributário');
  };

  // Handle viewing credit details
  const handleViewDetails = (creditId: string) => {
    toast.info('Visualizando detalhes do crédito', {
      description: `ID: ${creditId}`
    });
  };

  // Handle exporting data
  const handleExportData = () => {
    toast.info('Exportando dados', {
      description: 'Os dados serão exportados em formato Excel'
    });
  };

  // Initialize data
  useEffect(() => {
    // In a real app, we would fetch data from an API here
    setIsLoading(true);
    
    setTimeout(() => {
      setCredits(mockCredits);
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
    filteredCredits,
    summary,
    isLoading,
    isListening,
    handleRefresh,
    handleCreateCredit,
    handleViewDetails,
    handleExportData
  };
};
