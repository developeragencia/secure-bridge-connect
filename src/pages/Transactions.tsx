
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Download, Filter, Search, 
  CreditCard, FileText, CheckCircle, AlertTriangle,
  ChevronDown, MoreHorizontal, FileCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useClientStore } from '@/hooks/useClientStore';
import ActiveClientHeader from '@/components/ActiveClientHeader';

// Sample transaction data
const transactions = [
  {
    id: '1',
    description: 'Recuperação de crédito IRRF',
    type: 'IRRF',
    value: 5432.10,
    date: '2023-10-15',
    dueDate: '2023-11-15',
    status: 'completed',
    documentNumber: 'DCOMP-123456',
    clientId: '1',
    clientName: 'Empresa ACME Ltda',
    processingDate: '2023-10-18',
    notes: 'Crédito verificado e homologado pela Receita Federal'
  },
  {
    id: '2',
    description: 'Recuperação de crédito PIS',
    type: 'PIS',
    value: 2145.85,
    date: '2023-10-10',
    dueDate: '2023-11-10',
    status: 'processing',
    documentNumber: 'DCOMP-123457',
    clientId: '2',
    clientName: 'Indústrias XYZ S/A',
    processingDate: null,
    notes: 'Aguardando homologação da Receita Federal'
  },
  {
    id: '3',
    description: 'Recuperação de crédito COFINS',
    type: 'COFINS',
    value: 8752.35,
    date: '2023-10-05',
    dueDate: '2023-11-05',
    status: 'completed',
    documentNumber: 'DCOMP-123458',
    clientId: '3',
    clientName: 'Tech Solutions Brasil',
    processingDate: '2023-10-12',
    notes: 'Crédito verificado e homologado pela Receita Federal'
  },
  {
    id: '4',
    description: 'Recuperação de crédito CSLL',
    type: 'CSLL',
    value: 1523.45,
    date: '2023-09-25',
    dueDate: '2023-10-25',
    status: 'pending',
    documentNumber: 'DCOMP-123459',
    clientId: '1',
    clientName: 'Empresa ACME Ltda',
    processingDate: null,
    notes: 'Documentação em análise'
  },
  {
    id: '5',
    description: 'Recuperação de crédito IRRF',
    type: 'IRRF',
    value: 3256.78,
    date: '2023-09-20',
    dueDate: '2023-10-20',
    status: 'rejected',
    documentNumber: 'DCOMP-123460',
    clientId: '2',
    clientName: 'Indústrias XYZ S/A',
    processingDate: '2023-09-30',
    notes: 'Documentação incompleta. É necessário reenviar com as correções solicitadas.'
  },
  {
    id: '6',
    description: 'Recuperação de crédito PIS',
    type: 'PIS',
    value: 987.65,
    date: '2023-09-15',
    dueDate: '2023-10-15',
    status: 'completed',
    documentNumber: 'DCOMP-123461',
    clientId: '3',
    clientName: 'Tech Solutions Brasil',
    processingDate: '2023-09-25',
    notes: 'Crédito verificado e homologado pela Receita Federal'
  },
  {
    id: '7',
    description: 'Recuperação de crédito COFINS',
    type: 'COFINS',
    value: 4567.89,
    date: '2023-09-10',
    dueDate: '2023-10-10',
    status: 'processing',
    documentNumber: 'DCOMP-123462',
    clientId: '1',
    clientName: 'Empresa ACME Ltda',
    processingDate: null,
    notes: 'Aguardando homologação da Receita Federal'
  },
];

const Transactions = () => {
  const { activeClient } = useClientStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Format currency in BRL
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  // Filter transactions based on search term, status, type, and active client
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesClient = !activeClient || transaction.clientId === activeClient.id;
    
    return matchesSearch && matchesStatus && matchesType && matchesClient;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Concluído
          </Badge>
        );
      case 'processing':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <CreditCard className="mr-1 h-3 w-3" />
            Em processamento
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <FileCheck className="mr-1 h-3 w-3" />
            Pendente
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Rejeitado
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsDetailsOpen(true);
  };

  const handleDownloadReport = (id: string) => {
    toast({
      title: "Relatório gerado",
      description: `O relatório para a transação ${id} foi gerado com sucesso.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <ActiveClientHeader />
      <div className="container mx-auto p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Transações</h1>
            <p className="text-muted-foreground mt-1">
              Visualize e gerencie todas as transações de créditos tributários
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64 md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar transações..."
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="processing">Em processamento</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="rejected">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={typeFilter}
              onValueChange={setTypeFilter}
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="IRRF">IRRF</SelectItem>
                <SelectItem value="PIS">PIS</SelectItem>
                <SelectItem value="COFINS">COFINS</SelectItem>
                <SelectItem value="CSLL">CSLL</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Mais filtros
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Transações</CardTitle>
              <div className="text-sm text-muted-foreground">
                {filteredTransactions.length} transações encontradas
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Descrição</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <TableRow 
                        key={transaction.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleTransactionClick(transaction)}
                      >
                        <TableCell className="font-medium">{transaction.description}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>{formatCurrency(transaction.value)}</TableCell>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell>{formatDate(transaction.dueDate)}</TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon">
                                <span className="sr-only">Abrir menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleTransactionClick(transaction);
                              }}>
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Ver detalhes</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleDownloadReport(transaction.id);
                              }}>
                                <Download className="mr-2 h-4 w-4" />
                                <span>Baixar relatório</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        Nenhuma transação encontrada.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Transação</DialogTitle>
            <DialogDescription>
              Informações detalhadas sobre a transação de crédito tributário
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <Tabs defaultValue="details" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Detalhes</TabsTrigger>
                <TabsTrigger value="history">Histórico</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{selectedTransaction.description}</h3>
                    {getStatusBadge(selectedTransaction.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Valor</p>
                      <p className="text-lg font-semibold">{formatCurrency(selectedTransaction.value)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <p className="font-medium">{selectedTransaction.type}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Cliente</p>
                      <p className="font-medium">{selectedTransaction.clientName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Documento</p>
                      <p className="font-medium">{selectedTransaction.documentNumber}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Data</p>
                      <p className="font-medium">{formatDate(selectedTransaction.date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Vencimento</p>
                      <p className="font-medium">{formatDate(selectedTransaction.dueDate)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Processamento</p>
                    <p className="font-medium">
                      {selectedTransaction.processingDate 
                        ? formatDate(selectedTransaction.processingDate)
                        : 'Não processado'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Observações</p>
                    <p className="text-sm">{selectedTransaction.notes}</p>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => handleDownloadReport(selectedTransaction.id)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Baixar relatório
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="history" className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Transação criada</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(selectedTransaction.date)} • Sistema
                      </p>
                    </div>
                  </div>
                  
                  {selectedTransaction.processingDate && (
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Processamento iniciado</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(selectedTransaction.processingDate)} • Sistema
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {selectedTransaction.status === 'completed' && (
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Crédito homologado</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(selectedTransaction.processingDate)} • Sistema
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {selectedTransaction.status === 'rejected' && (
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Crédito rejeitado</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(selectedTransaction.processingDate)} • Sistema
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transactions;
