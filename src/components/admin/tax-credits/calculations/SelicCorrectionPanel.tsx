
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { format, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowUpDown, DownloadCloud, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type SelicRate = {
  month: string;
  year: number;
  rate: number;
  accumulated: number;
};

type MonetaryCorrection = {
  id: string;
  creditId: string;
  originalValue: number;
  correctedValue: number;
  difference: number;
  correctionDate: string;
  months: number;
  accumulatedRate: number;
};

// Mock data for Selic rates
const mockSelicRates: SelicRate[] = Array.from({ length: 12 }, (_, i) => {
  const date = subMonths(new Date(), i);
  return {
    month: format(date, 'MMMM', { locale: ptBR }),
    year: date.getFullYear(),
    rate: 0.75 + (Math.random() * 0.5),
    accumulated: 0, // Will be calculated
  };
}).reverse();

// Calculate accumulated rates
mockSelicRates.forEach((rate, index) => {
  if (index === 0) {
    rate.accumulated = rate.rate;
  } else {
    rate.accumulated = mockSelicRates[index - 1].accumulated + rate.rate;
  }
});

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

const SelicCorrectionPanel: React.FC = () => {
  const { toast } = useToast();
  const [selicRates, setSelicRates] = useState<SelicRate[]>(mockSelicRates);
  const [corrections, setCorrections] = useState<MonetaryCorrection[]>(mockCorrections);
  const [loadingRates, setLoadingRates] = useState(false);
  const [creditValue, setCreditValue] = useState('');
  const [creditDate, setCreditDate] = useState('');
  const [currentSelicRate, setCurrentSelicRate] = useState(selicRates[selicRates.length - 1].rate);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };
  
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
      description: `Valor original: ${formatCurrency(value)}
                    Valor corrigido: ${formatCurrency(correctedValue)}
                    Diferença: ${formatCurrency(difference)}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Taxa Selic Atual</h3>
              <Button variant="outline" size="sm" onClick={refreshSelicRates} disabled={loadingRates}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loadingRates ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
            </div>
            
            <div className="grid place-items-center py-4">
              {loadingRates ? (
                <Skeleton className="h-16 w-28" />
              ) : (
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{formatPercentage(currentSelicRate)}</p>
                  <p className="text-sm text-muted-foreground">Taxa mensal</p>
                </div>
              )}
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Período</TableHead>
                    <TableHead className="text-right">Taxa (%)</TableHead>
                    <TableHead className="text-right">Acumulada (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingRates ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={`loading-${index}`}>
                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-4 w-10 ml-auto" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-4 w-10 ml-auto" /></TableCell>
                      </TableRow>
                    ))
                  ) : (
                    selicRates.map((rate, index) => (
                      <TableRow key={`${rate.month}-${rate.year}`}>
                        <TableCell>
                          {`${rate.month}/${rate.year}`}
                        </TableCell>
                        <TableCell className="text-right">{formatPercentage(rate.rate)}</TableCell>
                        <TableCell className="text-right">{formatPercentage(rate.accumulated)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-lg font-medium">Calcular Correção Monetária</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="creditValue">Valor do Crédito (R$)</Label>
                <Input
                  id="creditValue"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={creditValue}
                  onChange={(e) => setCreditValue(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="creditDate">Data do Crédito (DD/MM/AAAA)</Label>
                <Input
                  id="creditDate"
                  placeholder="01/01/2023"
                  value={creditDate}
                  onChange={(e) => setCreditDate(e.target.value)}
                />
              </div>
              
              <Button className="w-full" onClick={calculateCorrection}>
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Calcular Correção
              </Button>
            </div>
            
            <div className="pt-4">
              <h4 className="font-medium mb-2">Últimos Cálculos</h4>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead className="text-right">Original (R$)</TableHead>
                      <TableHead className="text-right">Corrigido (R$)</TableHead>
                      <TableHead className="text-right">Diferença (R$)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {corrections.map((correction) => (
                      <TableRow key={correction.id}>
                        <TableCell>{correction.creditId}</TableCell>
                        <TableCell className="text-right">{formatCurrency(correction.originalValue)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(correction.correctedValue)}</TableCell>
                        <TableCell className="text-right text-green-600 font-medium">
                          {formatCurrency(correction.difference)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">
                  <DownloadCloud className="mr-2 h-4 w-4" />
                  Exportar Histórico
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Histórico de Correções Monetárias</h3>
            <Button variant="outline">
              <DownloadCloud className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Data da Correção</TableHead>
                  <TableHead className="text-right">Valor Original (R$)</TableHead>
                  <TableHead className="text-right">Valor Corrigido (R$)</TableHead>
                  <TableHead className="text-right">Diferença (R$)</TableHead>
                  <TableHead className="text-center">Meses</TableHead>
                  <TableHead className="text-right">Taxa Acumulada (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {corrections.map((correction) => (
                  <TableRow key={correction.id}>
                    <TableCell>{correction.creditId}</TableCell>
                    <TableCell>{correction.correctionDate}</TableCell>
                    <TableCell className="text-right">{formatCurrency(correction.originalValue)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(correction.correctedValue)}</TableCell>
                    <TableCell className="text-right text-green-600 font-medium">
                      {formatCurrency(correction.difference)}
                    </TableCell>
                    <TableCell className="text-center">{correction.months}</TableCell>
                    <TableCell className="text-right">{formatPercentage(correction.accumulatedRate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelicCorrectionPanel;
