import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { TaxCredit, TaxCreditSummary } from '@/types/tax-credits';
import { 
  CircleDollarSign, Filter, PlusCircle, Search, ArrowUpDown, 
  FileDown, FileUp, CheckCircle, XCircle, Clock, Settings 
} from 'lucide-react';

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  ANALYZING: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  APPROVED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  REJECTED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  RECOVERED: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
};

const TaxCreditManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<string | undefined>();
  
  const summary: TaxCreditSummary = {
    totalCredits: 1250000.00,
    pendingCredits: 450000.00,
    approvedCredits: 350000.00,
    recoveredCredits: 250000.00,
    rejectedCredits: 200000.00
  };
  
  const taxCredits: TaxCredit[] = [
    {
      id: "1",
      clientId: "client1",
      clientName: "Empresa ABC Ltda",
      documentNumber: "12.345.678/0001-90",
      creditType: "IRRF",
      creditAmount: 45000.00,
      originalAmount: 50000.00,
      periodStart: "2023-01-01",
      periodEnd: "2023-03-31",
      status: "APPROVED",
      createdAt: "2023-04-15T10:30:00Z",
      updatedAt: "2023-05-10T14:20:00Z",
      notes: "Aprovado após análise fiscal"
    },
    {
      id: "2",
      clientId: "client2",
      clientName: "Indústria XYZ S.A.",
      documentNumber: "23.456.789/0001-10",
      creditType: "PIS",
      creditAmount: 32000.00,
      originalAmount: 32000.00,
      periodStart: "2023-01-01",
      periodEnd: "2023-06-30",
      status: "PENDING",
      createdAt: "2023-07-05T09:15:00Z",
      updatedAt: "2023-07-05T09:15:00Z"
    },
    {
      id: "3",
      clientId: "client3",
      clientName: "Comércio DEF Eireli",
      documentNumber: "34.567.890/0001-21",
      creditType: "COFINS",
      creditAmount: 78000.00,
      originalAmount: 85000.00,
      periodStart: "2022-07-01",
      periodEnd: "2022-12-31",
      status: "ANALYZING",
      createdAt: "2023-02-20T11:45:00Z",
      updatedAt: "2023-03-15T16:30:00Z",
      notes: "Em análise pelo setor fiscal"
    },
    {
      id: "4",
      clientId: "client4",
      clientName: "Serviços GHI S.A.",
      documentNumber: "45.678.901/0001-32",
      creditType: "CSLL",
      creditAmount: 0.00,
      originalAmount: 28000.00,
      periodStart: "2023-01-01",
      periodEnd: "2023-03-31",
      status: "REJECTED",
      createdAt: "2023-04-10T08:00:00Z",
      updatedAt: "2023-05-20T10:45:00Z",
      notes: "Crédito rejeitado por falta de documentação"
    },
    {
      id: "5",
      clientId: "client1",
      clientName: "Empresa ABC Ltda",
      documentNumber: "12.345.678/0001-90",
      creditType: "IRRF",
      creditAmount: 63000.00,
      originalAmount: 63000.00,
      periodStart: "2022-01-01",
      periodEnd: "2022-12-31",
      status: "RECOVERED",
      createdAt: "2023-01-15T14:30:00Z",
      updatedAt: "2023-06-25T09:10:00Z",
      notes: "Crédito recuperado integralmente"
    }
  ];
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const handleCreateTaxCredit = () => {
    toast({
      title: "Novo crédito tributário",
      description: "Formulário de cadastro de crédito aberto",
    });
  };
  
  const handleExportData = () => {
    toast({
      title: "Exportando dados",
      description: "Os dados foram exportados com sucesso",
    });
  };
  
  const handleImportData = () => {
    toast({
      title: "Importando dados",
      description: "Selecione um arquivo para importar",
    });
  };
  
  console.log("Rendering TaxCreditManagement component");
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Créditos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(summary.totalCredits)}</div>
              <CircleDollarSign className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(summary.pendingCredits)}</div>
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Aprovados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(summary.approvedCredits)}</div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Recuperados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(summary.recoveredCredits)}</div>
              <CircleDollarSign className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rejeitados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(summary.rejectedCredits)}</div>
              <XCircle className="h-5 w-5 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Créditos Tributários</CardTitle>
              <CardDescription>
                Gerenciamento de créditos tributários de IRRF/PJ e outros
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleCreateTaxCredit}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Crédito
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={handleExportData}>
                  <FileDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleImportData}>
                  <FileUp className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Buscar por cliente, CNPJ, tipo..."
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
                    <span>{filterStatus || "Filtrar status"}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="PENDING">Pendentes</SelectItem>
                  <SelectItem value="ANALYZING">Em Análise</SelectItem>
                  <SelectItem value="APPROVED">Aprovados</SelectItem>
                  <SelectItem value="REJECTED">Rejeitados</SelectItem>
                  <SelectItem value="RECOVERED">Recuperados</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    <span>{sortBy || "Ordenar por"}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Padrão</SelectItem>
                  <SelectItem value="date_desc">Data (mais recente)</SelectItem>
                  <SelectItem value="date_asc">Data (mais antiga)</SelectItem>
                  <SelectItem value="amount_desc">Valor (maior)</SelectItem>
                  <SelectItem value="amount_asc">Valor (menor)</SelectItem>
                  <SelectItem value="client">Cliente</SelectItem>
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
                <TableHead>Tipo</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxCredits.map((credit) => (
                <TableRow key={credit.id}>
                  <TableCell className="font-medium">{credit.clientName}</TableCell>
                  <TableCell>{credit.documentNumber}</TableCell>
                  <TableCell>{credit.creditType}</TableCell>
                  <TableCell>
                    {new Date(credit.periodStart).toLocaleDateString('pt-BR')} - 
                    {new Date(credit.periodEnd).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>{formatCurrency(credit.creditAmount)}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[credit.status]}>
                      {credit.status === 'PENDING' && "Pendente"}
                      {credit.status === 'ANALYZING' && "Em Análise"}
                      {credit.status === 'APPROVED' && "Aprovado"}
                      {credit.status === 'REJECTED' && "Rejeitado"}
                      {credit.status === 'RECOVERED' && "Recuperado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
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
            Mostrando {taxCredits.length} de {taxCredits.length} créditos
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

export default TaxCreditManagement;
