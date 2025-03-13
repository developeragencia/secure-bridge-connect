
import React from 'react';
import { FileSearch, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RecoveryProcess } from '@/types/recovery';

interface RecoveryTableProps {
  processes: RecoveryProcess[];
  isLoading: boolean;
  onViewDetails: (processId: string) => void;
  onGenerateReport: (processId: string) => void;
}

const RecoveryTable: React.FC<RecoveryTableProps> = ({ 
  processes, 
  isLoading,
  onViewDetails,
  onGenerateReport
}) => {
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
            <th className="py-3 px-4 text-left font-medium">Nº Processo</th>
            <th className="py-3 px-4 text-left font-medium">Tipo</th>
            <th className="py-3 px-4 text-left font-medium">Valor Original</th>
            <th className="py-3 px-4 text-left font-medium">Recuperado</th>
            <th className="py-3 px-4 text-left font-medium">% Recuperação</th>
            <th className="py-3 px-4 text-left font-medium">Status</th>
            <th className="py-3 px-4 text-left font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={`skeleton-${index}`} className="border-b">
                <td colSpan={8} className="py-4 px-4">
                  <div className="h-6 bg-secondary/50 rounded animate-pulse"></div>
                </td>
              </tr>
            ))
          ) : processes.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-4 px-4 text-center text-muted-foreground">
                Nenhum processo de recuperação encontrado.
              </td>
            </tr>
          ) : (
            processes.map((process) => (
              <tr key={process.id} className="border-b hover:bg-muted/50">
                <td className="py-3 px-4">{process.clientName}</td>
                <td className="py-3 px-4">{process.processNumber}</td>
                <td className="py-3 px-4">{process.creditType}</td>
                <td className="py-3 px-4">{formatCurrency(process.originalAmount)}</td>
                <td className="py-3 px-4">{formatCurrency(process.recoveredAmount)}</td>
                <td className="py-3 px-4">{process.recoveryPercent.toFixed(1)}%</td>
                <td className="py-3 px-4">
                  <StatusBadge status={process.status} />
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onViewDetails(process.id)}
                    >
                      <FileSearch className="h-4 w-4" />
                      <span className="sr-only">Ver detalhes</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onGenerateReport(process.id)}
                    >
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Gerar relatório</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// Status Badge component
const StatusBadge: React.FC<{ status: RecoveryProcess['status'] }> = ({ status }) => {
  const statusConfig = {
    INICIAL: { label: 'Inicial', variant: 'secondary' as const },
    EM_ANDAMENTO: { label: 'Em Andamento', variant: 'default' as const },
    PARCIAL: { label: 'Parcial', variant: 'default' as const },
    CONCLUIDO: { label: 'Concluído', variant: 'default' as const },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={
      status === 'INICIAL' ? 'bg-slate-500/20 text-slate-700 hover:bg-slate-500/30' :
      status === 'EM_ANDAMENTO' ? 'bg-blue-500/20 text-blue-700 hover:bg-blue-500/30' :
      status === 'PARCIAL' ? 'bg-amber-500/20 text-amber-700 hover:bg-amber-500/30' :
      'bg-green-500/20 text-green-700 hover:bg-green-500/30'
    }>
      {config.label}
    </Badge>
  );
};

export default RecoveryTable;
