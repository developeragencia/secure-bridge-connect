
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileSearch } from 'lucide-react';
import { TaxCredit } from '@/types/tax-credits';
import StatusBadge from './StatusBadge';

interface CreditTableProps {
  credits: TaxCredit[];
  isLoading: boolean;
  onViewDetails: (creditId: string) => void;
}

const CreditTable: React.FC<CreditTableProps> = ({ credits, isLoading, onViewDetails }) => {
  // Function to format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left font-medium">Cliente</th>
            <th className="py-3 px-4 text-left font-medium">Documento</th>
            <th className="py-3 px-4 text-left font-medium">Tipo</th>
            <th className="py-3 px-4 text-left font-medium">Valor</th>
            <th className="py-3 px-4 text-left font-medium">Período</th>
            <th className="py-3 px-4 text-left font-medium">Status</th>
            <th className="py-3 px-4 text-left font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={`skeleton-${index}`} className="border-b">
                <td colSpan={7} className="py-4 px-4">
                  <div className="h-6 bg-secondary/50 rounded animate-pulse"></div>
                </td>
              </tr>
            ))
          ) : credits.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-4 px-4 text-center text-muted-foreground">
                Nenhum crédito tributário encontrado.
              </td>
            </tr>
          ) : (
            credits.map((credit) => (
              <tr key={credit.id} className="border-b hover:bg-muted/50">
                <td className="py-3 px-4">{credit.clientName}</td>
                <td className="py-3 px-4">{credit.documentNumber}</td>
                <td className="py-3 px-4">{credit.creditType}</td>
                <td className="py-3 px-4">{formatCurrency(credit.creditAmount)}</td>
                <td className="py-3 px-4">
                  {new Date(credit.periodStart).toLocaleDateString('pt-BR')} a {new Date(credit.periodEnd).toLocaleDateString('pt-BR')}
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={credit.status} />
                </td>
                <td className="py-3 px-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onViewDetails(credit.id)}
                  >
                    <FileSearch className="h-4 w-4" />
                    <span className="sr-only">Ver detalhes</span>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CreditTable;
