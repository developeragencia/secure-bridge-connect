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
import { useToast } from '@/components/ui/use-toast';
import { 
  FileSearch, Filter, PlusCircle, Search, 
  CheckCircle, XCircle, Clock, Calendar, Download 
} from 'lucide-react';
import { Audit } from '@/types/audit';

interface AuditProcess {
  id: string;
  clientName: string;
  documentNumber: string;
  auditType: string;
  startDate: string;
  deadline: string;
  status: string;
  assignedTo: string;
  documentsCount: number;
}

const AuditManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>();
  
  const auditProcesses: AuditProcess[] = [
    {
      id: "1",
      clientName: "Empresa ABC Ltda",
      documentNumber: "12.345.678/0001-90",
      auditType: "IRRF Completa",
      startDate: "2023-05-15T10:30:00Z",
      deadline: "2023-06-15T10:30:00Z",
      status: "EM_ANDAMENTO",
      assignedTo: "Maria Auditora",
      documentsCount: 15
    },
    {
      id: "2",
      clientName: "Indústria XYZ S.A.",
      documentNumber: "23.456.789/0001-10",
      auditType: "PIS/COFINS",
      startDate: "2023-06-10T09:15:00Z",
      deadline: "2023-07-10T09:15:00Z",
      status: "PENDENTE",
      assignedTo: "João Fiscal",
      documentsCount: 8
    },
    {
      id: "3",
      clientName: "Comércio DEF Eireli",
      documentNumber: "34.567.890/0001-21",
      auditType: "IRRF Simplificada",
      startDate: "2023-04-20T11:45:00Z",
      deadline: "2023-05-20T11:45:00Z",
      status: "CONCLUIDA",
      assignedTo: "Carlos Auditor",
      documentsCount: 12
    },
    {
      id: "4",
      clientName: "Serviços GHI S.A.",
      documentNumber: "45.678.901/0001-32",
      auditType: "CSLL",
      startDate: "2023-06-05T08:00:00Z",
      deadline: "2023-07-05T08:00:00Z",
      status: "CANCELADA",
      assignedTo: "Ana Fiscal",
      documentsCount: 5
    }
  ];
  
  const statusColors: Record<string, string> = {
    EM_ANDAMENTO: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    PENDENTE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    CONCLUIDA: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    CANCELADA: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  };
  
  const statusLabels: Record<string, string> = {
    EM_ANDAMENTO: "Em Andamento",
    PENDENTE: "Pendente",
    CONCLUIDA: "Concluída",
    CANCELADA: "Cancelada"
  };
  
  const statusCounts = {
    total: auditProcesses.length,
    emAndamento: auditProcesses.filter(a => a.status === "EM_ANDAMENTO").length,
    pendente: auditProcesses.filter(a => a.status === "PENDENTE").length,
    concluida: auditProcesses.filter(a => a.status === "CONCLUIDA").length,
  };
  
  const handleCreateAudit = () => {
    toast({
      title: "Nova auditoria",
      description: "Formulário de cadastro de auditoria aberto",
    });
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  
  const handleDownloadDocuments = (auditId: string) => {
    toast({
      title: "Download de documentos",
      description: `Baixando documentos da auditoria ID: ${auditId}`,
    });
  };
  
  console.log("Rendering AuditManagement component");
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Auditorias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{statusCounts.total}</div>
              <FileSearch className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Em Andamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{statusCounts.emAndamento}</div>
              <Clock className="h-5 w-5 text-blue-500" />
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
              <div className="text-2xl font-bold">{statusCounts.pendente}</div>
              <Calendar className="h-5 w-5 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Concluídas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{statusCounts.concluida}</div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Auditorias Fiscais</CardTitle>
              <CardDescription>
                Gestão de processos de auditoria para recuperação de créditos
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleCreateAudit}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nova Auditoria
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Buscar por cliente, tipo, responsável..."
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
                  <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
                  <SelectItem value="PENDENTE">Pendentes</SelectItem>
                  <SelectItem value="CONCLUIDA">Concluídas</SelectItem>
                  <SelectItem value="CANCELADA">Canceladas</SelectItem>
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
                <TableHead>Tipo de Auditoria</TableHead>
                <TableHead>Início</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditProcesses.map((audit) => (
                <TableRow key={audit.id}>
                  <TableCell className="font-medium">{audit.clientName}</TableCell>
                  <TableCell>{audit.documentNumber}</TableCell>
                  <TableCell>{audit.auditType}</TableCell>
                  <TableCell>{formatDate(audit.startDate)}</TableCell>
                  <TableCell>{formatDate(audit.deadline)}</TableCell>
                  <TableCell>{audit.assignedTo}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[audit.status]}>
                      {statusLabels[audit.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadDocuments(audit.id)}
                      >
                        <Download className="mr-2 h-3 w-3" />
                        {audit.documentsCount} docs
                      </Button>
                      <Button variant="outline" size="sm">
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
            Mostrando {auditProcesses.length} de {auditProcesses.length} auditorias
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

export default AuditManagement;
