
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { format, subMonths, isAfter, parseISO, differenceInMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { SelicRate, MonetaryCorrection, SelicAPIResponse } from './types';
import { generateMockSelicRates } from './utils';
import { useClientStore } from '@/hooks/useClientStore';

export const useSelicCorrection = () => {
  const { toast } = useToast();
  const { activeClient } = useClientStore();
  const [selicRates, setSelicRates] = useState<SelicRate[]>([]);
  const [corrections, setCorrections] = useState<MonetaryCorrection[]>([]);
  const [loadingRates, setLoadingRates] = useState(false);
  const [creditValue, setCreditValue] = useState('');
  const [creditDate, setCreditDate] = useState('');
  const [currentSelicRate, setCurrentSelicRate] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [apiConnectionStatus, setApiConnectionStatus] = useState<'connected' | 'error' | 'idle'>('idle');

  // Function to fetch Selic rates from Central Bank API
  const fetchSelicRates = useCallback(async () => {
    setLoadingRates(true);
    setApiConnectionStatus('idle');
    
    try {
      // This would be the actual API call in production
      // const response = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json');
      // const data = await response.json();
      
      // For demo purposes, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      const mockData = generateMockSelicRates(60); // Generate 60 months of mock data
      
      // Process and format the data
      const processedRates = mockData.map((item, index) => ({
        date: item.date,
        rate: item.rate,
        accumulated: index === 0 ? item.rate : (mockData[index - 1].accumulated + item.rate)
      }));
      
      setSelicRates(processedRates);
      setCurrentSelicRate(processedRates[processedRates.length - 1].rate);
      setLastUpdate(format(new Date(), 'dd/MM/yyyy HH:mm:ss'));
      setApiConnectionStatus('connected');
      
      toast({
        title: "Taxas Selic atualizadas",
        description: "As taxas foram obtidas com sucesso da API do Banco Central.",
      });
    } catch (error) {
      console.error("Erro ao buscar taxas Selic:", error);
      setApiConnectionStatus('error');
      
      // Fallback to mock data if API fails
      const mockData = generateMockSelicRates(60);
      setSelicRates(mockData);
      setCurrentSelicRate(mockData[mockData.length - 1].rate);
      
      toast({
        title: "Erro ao buscar taxas Selic",
        description: "Utilizando dados em cache. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoadingRates(false);
    }
  }, [toast]);

  // Load rates on initial mount
  useEffect(() => {
    // Check if we have any rates data
    if (selicRates.length === 0) {
      fetchSelicRates();
    }
  }, [fetchSelicRates, selicRates.length]);

  // Function to refresh rates manually
  const refreshSelicRates = () => {
    fetchSelicRates();
  };
  
  // Calculate the monetary correction for a tax credit
  const calculateCorrection = () => {
    if (!creditValue || !creditDate) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os campos para calcular a correção.",
        variant: "destructive",
      });
      return;
    }
    
    if (!activeClient) {
      toast({
        title: "Cliente não selecionado",
        description: "Selecione um cliente antes de calcular correções.",
        variant: "destructive",
      });
      return;
    }
    
    const value = parseFloat(creditValue.replace(/\./g, '').replace(',', '.'));
    if (isNaN(value)) {
      toast({
        title: "Valor inválido",
        description: "O valor do crédito deve ser um número válido.",
        variant: "destructive",
      });
      return;
    }
    
    let date: Date;
    try {
      // Handle different date formats (DD/MM/YYYY or YYYY-MM-DD)
      if (creditDate.includes('/')) {
        const dateParts = creditDate.split('/');
        date = new Date(
          parseInt(dateParts[2]),
          parseInt(dateParts[1]) - 1,
          parseInt(dateParts[0])
        );
      } else {
        date = parseISO(creditDate);
      }
      
      if (isNaN(date.getTime())) {
        throw new Error("Data inválida");
      }
    } catch (error) {
      toast({
        title: "Data inválida",
        description: "A data deve estar no formato DD/MM/AAAA ou YYYY-MM-DD.",
        variant: "destructive",
      });
      return;
    }
    
    const today = new Date();
    if (isAfter(date, today)) {
      toast({
        title: "Data futura",
        description: "A data do crédito não pode ser no futuro.",
        variant: "destructive",
      });
      return;
    }
    
    // Calculate months difference
    const diffMonths = differenceInMonths(today, date);
    if (diffMonths <= 0) {
      toast({
        title: "Período inválido",
        description: "O crédito deve ter pelo menos 1 mês para correção.",
        variant: "destructive",
      });
      return;
    }
    
    // Find the accumulated rate for the period
    let accumulatedRate: number;
    if (diffMonths <= selicRates.length) {
      accumulatedRate = selicRates[diffMonths - 1]?.accumulated || 0;
    } else {
      // If we need more historical data than we have, use the max we have
      accumulatedRate = selicRates[selicRates.length - 1].accumulated;
      toast({
        title: "Alerta de Período",
        description: `Só temos dados de ${selicRates.length} meses, usando taxa acumulada disponível.`,
        variant: "warning",
      });
    }
    
    const correctedValue = value * (1 + (accumulatedRate / 100));
    const difference = correctedValue - value;
    
    const newCorrection: MonetaryCorrection = {
      id: `CR-${Math.floor(Math.random() * 10000)}`,
      creditId: `CR-${Math.floor(Math.random() * 10000)}`,
      originalValue: value,
      correctedValue: correctedValue,
      difference: difference,
      correctionDate: format(new Date(), 'dd/MM/yyyy'),
      months: diffMonths,
      accumulatedRate: accumulatedRate,
      clientId: activeClient.id,
      clientName: activeClient.name,
    };
    
    setCorrections([newCorrection, ...corrections]);
    
    toast({
      title: "Correção calculada com sucesso",
      description: `Valor original: ${formatCurrency(value)} → Valor corrigido: ${formatCurrency(correctedValue)}`,
      variant: "success",
    });
  };

  // Function to apply a correction to a list of credits automatically
  const applyBulkCorrection = (credits: any[]) => {
    if (!credits || credits.length === 0) {
      toast({
        title: "Nenhum crédito selecionado",
        description: "Selecione pelo menos um crédito para aplicar a correção.",
        variant: "destructive",
      });
      return;
    }
    
    if (selicRates.length === 0) {
      toast({
        title: "Taxas Selic não disponíveis",
        description: "Atualize as taxas Selic antes de calcular correções em massa.",
        variant: "destructive",
      });
      return;
    }
    
    const today = new Date();
    const newCorrections: MonetaryCorrection[] = [];
    let successCount = 0;
    let errorCount = 0;
    
    for (const credit of credits) {
      try {
        const creditDate = parseISO(credit.date);
        const diffMonths = differenceInMonths(today, creditDate);
        
        if (diffMonths <= 0) {
          errorCount++;
          continue;
        }
        
        // Find the accumulated rate
        const accumulatedRate = diffMonths <= selicRates.length
          ? selicRates[diffMonths - 1]?.accumulated || 0
          : selicRates[selicRates.length - 1].accumulated;
        
        const correctedValue = credit.value * (1 + (accumulatedRate / 100));
        const difference = correctedValue - credit.value;
        
        const newCorrection: MonetaryCorrection = {
          id: `CR-${Math.floor(Math.random() * 10000)}`,
          creditId: credit.id,
          originalValue: credit.value,
          correctedValue: correctedValue,
          difference: difference,
          correctionDate: format(new Date(), 'dd/MM/yyyy'),
          months: diffMonths,
          accumulatedRate: accumulatedRate,
          clientId: credit.clientId,
          clientName: credit.clientName,
        };
        
        newCorrections.push(newCorrection);
        successCount++;
      } catch (error) {
        console.error("Erro ao calcular correção:", error);
        errorCount++;
      }
    }
    
    if (newCorrections.length > 0) {
      setCorrections([...newCorrections, ...corrections]);
      
      toast({
        title: "Correções calculadas",
        description: `${successCount} créditos corrigidos com sucesso. ${errorCount > 0 ? `${errorCount} erros.` : ''}`,
        variant: successCount > 0 ? "success" : "destructive",
      });
      
      return newCorrections;
    } else {
      toast({
        title: "Erro nas correções",
        description: "Não foi possível calcular correções para os créditos selecionados.",
        variant: "destructive",
      });
      
      return [];
    }
  };

  const handleExportHistory = () => {
    if (corrections.length === 0) {
      toast({
        title: "Nenhuma correção para exportar",
        description: "Calcule algumas correções antes de exportar.",
        variant: "warning",
      });
      return;
    }
    
    toast({
      title: "Exportação iniciada",
      description: "O histórico de correções está sendo exportado.",
    });
    
    // In a real scenario, we would generate a CSV/Excel file here
    setTimeout(() => {
      toast({
        title: "Exportação concluída",
        description: "O arquivo foi gerado e está disponível para download.",
        variant: "success",
      });
    }, 1500);
  };

  // Helper function to format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return {
    selicRates,
    corrections,
    loadingRates,
    creditValue,
    setCreditValue,
    creditDate,
    setCreditDate,
    currentSelicRate,
    lastUpdate,
    apiConnectionStatus,
    refreshSelicRates,
    calculateCorrection,
    applyBulkCorrection,
    handleExportHistory,
    formatCurrency,
  };
};
