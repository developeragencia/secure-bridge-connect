
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Eye, FileText } from 'lucide-react';
import { ComparisonItem } from './types';
import StatusBadge from './StatusBadge';
import { formatCurrency } from './utils';

interface ComparisonTableProps {
  data: ComparisonItem[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ data }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nota Fiscal</TableHead>
            <TableHead>Fornecedor</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Valor (R$)</TableHead>
            <TableHead className="text-right">Retido (R$)</TableHead>
            <TableHead className="text-right">Devido (R$)</TableHead>
            <TableHead className="text-right">Diferença (R$)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.invoiceNumber}</TableCell>
              <TableCell>{item.supplierName}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell className="text-right">{formatCurrency(item.value)}</TableCell>
              <TableCell className="text-right">{formatCurrency(item.retainedValue)}</TableCell>
              <TableCell className="text-right">{formatCurrency(item.correctValue)}</TableCell>
              <TableCell 
                className={`text-right font-medium ${
                  item.difference > 0 
                    ? 'text-green-600' 
                    : item.difference < 0 
                      ? 'text-amber-600' 
                      : ''
                }`}
              >
                {formatCurrency(item.difference)}
              </TableCell>
              <TableCell><StatusBadge status={item.status} /></TableCell>
              <TableCell className="text-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visualizar detalhes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Gerar relatório</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ComparisonTable;
