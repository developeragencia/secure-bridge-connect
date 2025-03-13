
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from './utils';

interface SummaryCardsProps {
  totalRecoverable: number;
  totalDivergent: number;
  totalItems: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalRecoverable,
  totalDivergent,
  totalItems,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">Total Recuperável</p>
            <h3 className="text-2xl font-bold text-green-600 mt-2">{formatCurrency(totalRecoverable)}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">Quantidade de Notas</p>
            <h3 className="text-2xl font-bold mt-2">{totalItems}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">Total Divergente</p>
            <h3 className="text-2xl font-bold text-amber-600 mt-2">{formatCurrency(totalDivergent)}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
