
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { SelicRate, MonetaryCorrection, SelicAPIResponse } from './types';
import { generateMockSelicRates } from './utils';

// Mock corrections data
const mockCorrections: MonetaryCorrection[] = [
  {
    id: '1',
    creditId: 'CR-001',
    originalValue: 15000.00,
    correctedValue: 16125.00,
    difference: 1125.00,
    correctionDate: format(new Date(), 'dd/MM/yyyy'),
    months: 6,
    accumulatedRate: 7.5,
  },
  {
    id: '2',
    creditId: 'CR-002',
    originalValue: 8750.00,
    correctedValue: 9187.50,
    difference: 437.50,
    correctionDate: format(new Date(), 'dd/MM/yyyy'),
    months: 4,
    accumulatedRate: 5.0,
  },
  {
    id: '3',
    creditId: 'CR-003',
    originalValue: 23400.00,
    correctedValue: 25272.00,
    difference: 1872.00,
    correctionDate: format(new Date(), 'dd/MM/yyyy'),
    months: 8,
    accumulatedRate: 8.0,
  },
];

export const useSelicCorrection = () => {
  const { toast } = useToast();
  const [selicRates, setSelicRates] = useState<SelicRate[]>(generateMockSelicRates());
  const [corrections, setCorrections] = useState<MonetaryCorrection[]>(mockCorrections);
  const [loadingRates, setLoadingRates] = useState(false);
  const [creditValue, setCreditValue] = useState('');
  const [creditDate, setCreditDate] = useState('');
  const [currentSelicRate, setCurrentSelicRate] = useState(
    selicRates[selicRates.length - 1]?.rate || 0
  );

  const refreshSelicRates = () => {
    setLoadingRates(true);
    
    // Simulate API call to get Selic rates
    setTimeout(() => {
      // Update with slight variations to simulate real data change
      const updatedRates = selicRates.map(rate => ({
        ...rate,
        rate: rate.rate + (Math.random() * 0.1 - 0.05)
      }));
      
      // Recalculate accumulated rates
      updatedRates.forEach((rate, index) => {
        if (index === 0) {
          rate.accumulated = rate.rate;
        } else {
          rate.accumulated = updatedRates[index - 1].accumulated + rate.rate;
        }
      });
      
      setSelicRates(updatedRates);
      setCurrentSelicRate(updatedRates[updatedRates.length - 1].rate);
      setLoadingRates(false);
      
      toast({
        title: "Taxas Selic atualizadas",
        description: "As taxas Selic foram atualizadas com sucesso.",
      });
    }, 1500);
  };
  
  const calculateCorrection = () => {
    if (!creditValue || !creditDate) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os campos para calcular a correção.",
        variant: "destructive",
      });
      return;
    }
    
    const value = parseFloat(creditValue);
    const dateParts = creditDate.split('/');
    
    if (dateParts.length !== 3) {
      toast({
        title: "Data inválida",
        description: "A data deve estar no formato DD/MM/AAAA.",
        variant: "destructive",
      });
      return;
    }
    
    const date = new Date(
      parseInt(dateParts[2]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[0])
    );
    
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    
    // Find the accumulated rate for the period
    const accumulatedRate = diffMonths <= selicRates.length
      ? selicRates[diffMonths - 1]?.accumulated || 0
      : selicRates[selicRates.length - 1].accumulated;
    
    const correctedValue = value * (1 + (accumulatedRate / 100));
    const difference = correctedValue - value;
    
    const newCorrection: MonetaryCorrection = {
      id: `CR-${Math.floor(Math.random() * 1000)}`,
      creditId: `CR-${Math.floor(Math.random() * 1000)}`,
      originalValue: value,
      correctedValue: correctedValue,
      difference: difference,
      correctionDate: format(new Date(), 'dd/MM/yyyy'),
      months: diffMonths,
      accumulatedRate: accumulatedRate,
    };
    
    setCorrections([newCorrection, ...corrections]);
    
    toast({
      title: "Correção calculada",
      description: `Valor corrigido: ${new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(correctedValue)}`,
    });
  };

  const handleExportHistory = () => {
    toast({
      title: "Exportação iniciada",
      description: "O histórico está sendo exportado e ficará disponível em breve.",
    });
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
    refreshSelicRates,
    calculateCorrection,
    handleExportHistory,
  };
};
