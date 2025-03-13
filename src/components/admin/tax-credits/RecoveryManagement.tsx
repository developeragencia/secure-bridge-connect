import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { 
  Filter, Search, Landmark, ArrowDownUp, ArrowUpRight,
  FileSpreadsheet, CircleDollarSign, Clock, CheckCircle 
} from 'lucide-react';
import { RecoveryProcess } from '@/types/recovery';

const RecoveryManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>();
  
  const recoveryProcesses: RecoveryProcess[] = [
    {
      id: "1",
      clientName: "Empresa ABC Ltda",
      documentNumber: "12.345.678/0001-90",
      creditType: "IRRF",
      originalAmount: 78000.00,
      recoveredAmount: 62400.00,
      recoveryPercent: 80,
      startDate: "2023-04-15T10:30:00Z",
      status: "EM_ANDAMENTO",
      processNumber: "10520.123456/2023-12"
    },
    {
      id: "2",
      clientName: "Indústria XYZ S.A.",
      documentNumber: "23.456.789/0001-10",
      creditType: "PIS/COFINS",
      originalAmount: 125000.00,
      recoveredAmount: 125000.00,
      recoveryPercent: 100,
      startDate: "2023-02-20T09:15:00Z",
      status: "CONCLUIDO",
      processNumber: "10520.234567/2023-34"
    },
    {
      id: "3",
      clientName: "Comércio DEF Eireli",
      documentNumber: "34.567.890/0001-21",
      creditType: "IRRF",
      originalAmount: 45000.00,
      recoveredAmount: 0.00,
      recoveryPercent: 0,
      startDate: "2023-06-10T11:45:00Z",
      status: "INICIAL",
      processNumber: "10520.345678/2023-56"
    },
    {
      id: "4",
      clientName: "Serviços GHI S.A.",
      documentNumber: "45.678.901/0001-32",
      creditType: "CSLL",
      originalAmount: 35000.00,
      recoveredAmount: 28000.00,
      recoveryPercent: 80,
      startDate: "2023-03-05T08:00:00Z",
      status: "PARCIAL",
      processNumber: "10520.456789/2023-78"
    }
  ];
  
  const statusColors: Record<string, string> = {
    INICIAL: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    EM_ANDAMENTO: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    PARCIAL: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    CONCLUIDO: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  };
  
  const statusLabels: Record<string, string> = {
    INICIAL: "Inicial",
    EM_ANDAMENTO: "Em Andamento",
    PARCIAL: "Recuperação Parcial",
    CONCLUIDO: "Concluído"
  };
  
  const summaryData = {
    totalCredits: recoveryProcesses.reduce((sum, p) => sum + p.originalAmount, 0),
    recoveredAmount: recoveryProcesses.reduce((sum, p) => sum + p.recoveredAmount, 0),
    avgRecoveryRate: Math.round(
      recoveryProcesses.reduce((sum, p) => sum + p.recoveryPercent, 0) / recoveryProcesses.length
    ),
    completedProcesses: recoveryProcesses.filter(p => p.status === "CONCLUIDO").length
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  
  const handleViewProcessDetails = (processId: string) => {
    toast({
      title: "Detalhes do processo",
      description: `Visualizando detalhes do processo ID: ${processId}`,
    });
  };
  
  const handleGenerateReport = (processId: string) => {
    toast({
      title: "Relatório gerado",
      description: `Relatório do processo ID: ${processId} gerado com sucesso`,
    });
  };
  
  console.log("Rendering RecoveryManagement component");
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Créditos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(summaryData.totalCredits)}</div>
              <Landmark className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valor Recuperado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(summaryData.recoveredAmount)}</div>
              <CircleDollarSign className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa Média de Recuperação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{summaryData.avgRecoveryRate}%</div>
              <ArrowUpRight className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Processos Concluídos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{summaryData.completedProcesses}</div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Processos de Recuperação</CardTitle>
              <CardDescription>
                Acompanhamento de processos de recuperação de créditos tributários
              </CardDescription>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Buscar por cliente, processo, tipo..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>{filterStatus ? statusLabels[filterStatus] : "Filtrar status"}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="INICIAL">Inicial</SelectItem>
                  <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
                  <SelectItem value="PARCIAL">Recuperação Parcial</SelectItem>
                  <SelectItem value="CONCLUIDO">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
                        onClick={() => handleGenerateReport(process.id)}
                      >
                        <FileSpreadsheet className="mr-2 h-3 w-3" />
                        Relatório
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewProcessDetails(process.id)}
                      >
                        Detalhes
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {recoveryProcesses.length} de {recoveryProcesses.length} processos
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" disabled>
              Próximo
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecoveryManagement;
