
import React, { useState } from 'react';
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
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Eye, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type ComparisonItem = {
  id: string;
  invoiceNumber: string;
  supplierName: string;
  date: string;
  value: number;
  retainedValue: number;
  correctValue: number;
  difference: number;
  status: 'recuperável' | 'correto' | 'divergente';
};

const mockData: ComparisonItem[] = [
  {
    id: '1',
    invoiceNumber: 'NF-001234',
    supplierName: 'Consultoria ABC',
    date: '12/05/2023',
    value: 10000.00,
    retainedValue: 1500.00,
    correctValue: 1000.00,
    difference: 500.00,
    status: 'recuperável',
  },
  {
    id: '2',
    invoiceNumber: 'NF-005678',
    supplierName: 'Serviços TI XYZ',
    date: '23/06/2023',
    value: 8500.00,
    retainedValue: 382.50,
    correctValue: 382.50,
    difference: 0.00,
    status: 'correto',
  },
  {
    id: '3',
    invoiceNumber: 'NF-009012',
    supplierName: 'Construtora Edifica',
    date: '08/07/2023',
    value: 25000.00,
    retainedValue: 0.00,
    correctValue: 625.00,
    difference: -625.00,
    status: 'divergente',
  },
  {
    id: '4',
    invoiceNumber: 'NF-003456',
    supplierName: 'Transportadora Rápida',
    date: '14/08/2023',
    value: 5800.00,
    retainedValue: 290.00,
    correctValue: 0.00,
    difference: 290.00,
    status: 'recuperável',
  },
  {
    id: '5',
    invoiceNumber: 'NF-007890',
    supplierName: 'Serviços Gerais Multiuso',
    date: '02/09/2023',
    value: 3200.00,
    retainedValue: 80.00,
    correctValue: 32.00,
    difference: 48.00,
    status: 'recuperável',
  },
];

const ComparisonAnalysis: React.FC = () => {
  const [data, setData] = useState(mockData);
  const [filter, setFilter] = useState<string | null>(null);

  const filteredData = filter ? data.filter(item => item.status === filter) : data;

  const totalRecoverable = data
    .filter(item => item.status === 'recuperável')
    .reduce((acc, item) => acc + item.difference, 0);

  const totalDivergent = data
    .filter(item => item.status === 'divergente')
    .reduce((acc, item) => acc + Math.abs(item.difference), 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'recuperável':
        return <Badge className="bg-green-500">Recuperável</Badge>;
      case 'correto':
        return <Badge className="bg-blue-500">Correto</Badge>;
      case 'divergente':
        return <Badge className="bg-amber-500">Divergente</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
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
              <h3 className="text-2xl font-bold mt-2">{data.length}</h3>
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
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-lg font-medium">Comparação de Valores Retidos vs. Devidos</h3>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filter === null ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter(null)}
          >
            Todos
          </Button>
          <Button 
            variant={filter === 'recuperável' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('recuperável')}
          >
            Recuperáveis
          </Button>
          <Button 
            variant={filter === 'divergente' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('divergente')}
          >
            Divergentes
          </Button>
          <Button 
            variant={filter === 'correto' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('correto')}
          >
            Corretos
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Exportar
          </Button>
        </div>
      </div>
      
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
            {filteredData.map((item) => (
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
                <TableCell>{getStatusBadge(item.status)}</TableCell>
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
    </div>
  );
};

export default ComparisonAnalysis;
