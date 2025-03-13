
import { format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { SelicRate } from './types';

// Function to format currency values
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// Function to format percentage values
export const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`;
};

// Generate mock Selic rates (this would be replaced by an API call in production)
export const generateMockSelicRates = (): SelicRate[] => {
  // Create mock selic rates
  const mockRates = Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(new Date(), i);
    return {
      month: format(date, 'MMMM', { locale: ptBR }),
      year: date.getFullYear(),
      rate: 0.75 + (Math.random() * 0.5),
      accumulated: 0, // Will be calculated
    };
  }).reverse();

  // Calculate accumulated rates
  mockRates.forEach((rate, index) => {
    if (index === 0) {
      rate.accumulated = rate.rate;
    } else {
      rate.accumulated = mockRates[index - 1].accumulated + rate.rate;
    }
  });

  return mockRates;
};
