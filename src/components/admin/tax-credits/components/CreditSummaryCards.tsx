
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaxCreditSummary } from '@/types/tax-credits';

interface CreditSummaryCardsProps {
  summary: TaxCreditSummary;
  className?: string;
}

const CreditSummaryCards: React.FC<CreditSummaryCardsProps> = ({ summary, className }) => {
  // Function to format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Créditos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(summary.totalCredits)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Todos os créditos identificados
          </p>
        </CardContent>
      </Card>
      
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Créditos Aprovados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(summary.approvedCredits)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {((summary.approvedCredits / summary.totalCredits) * 100).toFixed(1)}% do total
          </p>
        </CardContent>
      </Card>
      
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Créditos Recuperados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(summary.recoveredCredits)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {((summary.recoveredCredits / summary.totalCredits) * 100).toFixed(1)}% do total
          </p>
        </CardContent>
      </Card>
      
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Créditos Pendentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{formatCurrency(summary.pendingCredits)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {((summary.pendingCredits / summary.totalCredits) * 100).toFixed(1)}% do total
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditSummaryCards;
