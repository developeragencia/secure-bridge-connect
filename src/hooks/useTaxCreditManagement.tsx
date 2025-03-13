
import { useState, useEffect, useCallback } from 'react';
import { TaxCredit, CreditSummary } from '@/types/tax-credits';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useRealtimeUpdates } from './useRealtimeUpdates';

export const useTaxCreditManagement = () => {
  // Estado para os filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Estado para os dados
  const [credits, setCredits] = useState<TaxCredit[]>([]);
  const [summary, setSummary] = useState<CreditSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isListening, startListening, stopListening } = useRealtimeUpdates();

  // Carregar dados iniciais
  useEffect(() => {
    fetchCredits();
    return () => {
      stopListening('tax_credits');
    };
  }, []);

  // Função para buscar créditos
  const fetchCredits = async () => {
    try {
      setIsLoading(true);
      
      // Simulação de requisição à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados mock
      const mockCredits: TaxCredit[] = [
        {
          id: '1',
          clientName: 'Empresa ABC Ltda',
          documentNumber: '12.345.678/0001-99',
          creditType: 'PIS/COFINS',
          creditAmount: 145678.90,
          periodStart: '2023-01-01',
          periodEnd: '2023-03-31',
          status: 'approved',
          createdAt: '2023-04-15',
          updatedAt: '2023-04-20',
        },
        {
          id: '2',
          clientName: 'Indústria XYZ S.A.',
          documentNumber: '98.765.432/0001-10',
          creditType: 'ICMS',
          creditAmount: 89540.75,
          periodStart: '2023-01-01',
          periodEnd: '2023-03-31',
          status: 'pending',
          createdAt: '2023-04-10',
          updatedAt: '2023-04-10',
        },
        {
          id: '3',
          clientName: 'Comércio & Serviços Ltda',
          documentNumber: '11.222.333/0001-44',
          creditType: 'IPI',
          creditAmount: 32150.20,
          periodStart: '2023-02-01',
          periodEnd: '2023-02-28',
          status: 'rejected',
          createdAt: '2023-03-15',
          updatedAt: '2023-03-25',
        },
        {
          id: '4',
          clientName: 'Tech Solutions Brasil',
          documentNumber: '44.555.666/0001-77',
          creditType: 'IRRF',
          creditAmount: 12890.55,
          periodStart: '2023-01-01',
          periodEnd: '2023-01-31',
          status: 'approved',
          createdAt: '2023-02-10',
          updatedAt: '2023-02-15',
        },
        {
          id: '5',
          clientName: 'Empresa ABC Ltda',
          documentNumber: '12.345.678/0001-99',
          creditType: 'PIS/COFINS',
          creditAmount: 76500.30,
          periodStart: '2022-10-01',
          periodEnd: '2022-12-31',
          status: 'approved',
          createdAt: '2023-01-20',
          updatedAt: '2023-01-25',
        }
      ];
      
      setCredits(mockCredits);
      
      // Calcular resumo
      const totalAmount = mockCredits.reduce((acc, credit) => acc + credit.creditAmount, 0);
      const approvedAmount = mockCredits
        .filter(credit => credit.status === 'approved')
        .reduce((acc, credit) => acc + credit.creditAmount, 0);
      
      setSummary({
        totalCredits: mockCredits.length,
        pendingCredits: mockCredits.filter(credit => credit.status === 'pending').length,
        approvedCredits: mockCredits.filter(credit => credit.status === 'approved').length,
        rejectedCredits: mockCredits.filter(credit => credit.status === 'rejected').length,
        totalAmount,
        approvedAmount,
        pendingAmount: totalAmount - approvedAmount,
        averageAmount: totalAmount / mockCredits.length,
      });
      
      // Iniciar escuta em tempo real
      startListening('tax_credits');
    } catch (error) {
      console.error('Erro ao buscar créditos:', error);
      toast({
        title: 'Erro ao carregar dados',
        description: 'Não foi possível carregar os créditos. Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar créditos com base nos filtros aplicados
  const filteredCredits = credits.filter(credit => {
    // Filtro de busca
    const searchTerms = searchQuery.toLowerCase();
    const matchesSearch = 
      credit.clientName.toLowerCase().includes(searchTerms) ||
      credit.documentNumber.toLowerCase().includes(searchTerms) ||
      credit.creditType.toLowerCase().includes(searchTerms);
    
    // Filtro de status
    const matchesStatus = statusFilter === 'all' || credit.status === statusFilter;
    
    // Filtro de tipo
    const matchesType = typeFilter === 'all' || credit.creditType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Funções de ação
  const handleRefresh = useCallback(() => {
    fetchCredits();
    toast({
      title: 'Dados atualizados',
      description: 'Lista de créditos atualizada com sucesso',
    });
  }, [toast]);

  const handleCreateCredit = useCallback(() => {
    toast({
      title: 'Criar crédito',
      description: 'Funcionalidade em desenvolvimento',
    });
  }, [toast]);

  const handleViewDetails = useCallback((creditId: string) => {
    navigate(`/credits/details/${creditId}`);
  }, [navigate]);

  const handleExportData = useCallback(() => {
    toast({
      title: 'Exportação iniciada',
      description: 'Os dados estão sendo exportados. Você receberá uma notificação quando estiver pronto.',
    });
  }, [toast]);

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
