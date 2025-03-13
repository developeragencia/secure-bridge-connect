
import React from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileSpreadsheet } from 'lucide-react';
import { RecoveryProcess } from '@/types/recovery';

interface RecoveryTableProps {
  recoveryProcesses: RecoveryProcess[];
  statusColors: Record<string, string>;
  statusLabels: Record<string, string>;
  onViewDetails: (processId: string) => void;
  onGenerateReport: (processId: string) => void;
}

const RecoveryTable: React.FC<RecoveryTableProps> = ({ 
  recoveryProcesses, 
  statusColors, 
  statusLabels,
  onViewDetails,
  onGenerateReport
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>CNPJ</TableHead>
          <TableHead>Processo</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Início</TableHead>
          <TableHead className="w-[140px]">Progresso</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recoveryProcesses.map((process) => (
          <TableRow key={process.id}>
            <TableCell className="font-medium">{process.clientName}</TableCell>
            <TableCell>{process.documentNumber}</TableCell>
            <TableCell>{process.processNumber}</TableCell>
            <TableCell>{process.creditType}</TableCell>
            <TableCell>{formatDate(process.startDate)}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <Progress value={process.recoveryPercent} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{process.recoveryPercent}%</span>
                  <span>
                    {formatCurrency(process.recoveredAmount)} / {formatCurrency(process.originalAmount)}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge className={statusColors[process.status]}>
                {statusLabels[process.status]}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onGenerateReport(process.id)}
                >
                  <FileSpreadsheet className="mr-2 h-3 w-3" />
                  Relatório
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewDetails(process.id)}
                >
                  Detalhes
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecoveryTable;
