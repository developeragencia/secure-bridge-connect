
import React, { useState } from 'react';
import AuditManagementContent from './components/AuditManagementContent';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Download, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import AuditActionButtons from "./components/AuditActionButtons";
import { Audit } from "@/types/audit";

// Sample audit data
const sampleAudits: Audit[] = [
  {
    id: "audit-001",
    clientName: "Empresa ABC Ltda",
    auditType: "Fiscal",
    date: "12/06/2023",
    status: "Em Andamento",
    priority: "Alta",
    assignedTo: "Carlos Silva",
    documentNumber: "12.345.678/0001-90",
    startDate: "2023-06-01",
    deadline: "2023-07-01",
    documentsCount: 5,
    createdAt: "2023-06-01T10:00:00Z",
    updatedAt: "2023-06-05T14:30:00Z",
    title: "Auditoria Fiscal 2023",
    client: "empresa-abc",
    type: "fiscal"
  },
  {
    id: "audit-002",
    clientName: "XYZ Comércio S.A.",
    auditType: "Tributária",
    date: "15/06/2023",
    status: "Concluída",
    priority: "Média",
    assignedTo: "Ana Oliveira",
    documentNumber: "23.456.789/0001-12",
    startDate: "2023-05-15",
    deadline: "2023-06-15",
    documentsCount: 8,
    createdAt: "2023-05-15T10:00:00Z",
    updatedAt: "2023-06-15T14:30:00Z",
    title: "Auditoria Tributária XYZ",
    client: "xyz-comercio",
    type: "tributaria"
  },
  {
    id: "audit-003",
    clientName: "Tech Solutions Inc.",
    auditType: "Contábil",
    date: "10/06/2023",
    status: "Pendente",
    priority: "Baixa",
    assignedTo: "João Santos",
    documentNumber: "34.567.890/0001-23",
    startDate: "2023-06-05",
    deadline: "2023-07-05",
    documentsCount: 3,
    createdAt: "2023-06-05T10:00:00Z",
    updatedAt: "2023-06-05T14:30:00Z",
    title: "Auditoria Contábil Tech",
    client: "tech-solutions",
    type: "contabil"
  },
  {
    id: "audit-004",
    clientName: "Indústria Nacional Ltda",
    auditType: "Fiscal",
    date: "05/06/2023",
    status: "Em Andamento",
    priority: "Alta",
    assignedTo: "Mariana Costa",
    documentNumber: "45.678.901/0001-34",
    startDate: "2023-05-20",
    deadline: "2023-06-20",
    documentsCount: 10,
    createdAt: "2023-05-20T10:00:00Z",
    updatedAt: "2023-06-01T14:30:00Z",
    title: "Auditoria Fiscal Indústria",
    client: "industria-nacional",
    type: "fiscal"
  }
];

const AuditManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [audits, setAudits] = useState<Audit[]>(sampleAudits);

  // Handler functions for action buttons
  const handleViewDetails = (auditId: string) => {
    toast({
      title: "Visualizando detalhes",
      description: `Visualizando auditoria ${auditId}`,
    });
  };

  const handleDownloadDocuments = (auditId: string) => {
    toast({
      title: "Download iniciado",
      description: `Baixando documentos da auditoria ${auditId}`,
    });
  };

  const handleEdit = (auditId: string) => {
    toast({
      title: "Editar auditoria",
      description: `Editando auditoria ${auditId}`,
    });
  };

  const handleDelete = (auditId: string) => {
    toast({
      title: "Excluir auditoria",
      description: `Excluindo auditoria ${auditId}`,
      variant: "destructive",
    });
  };

  const handleApprove = (auditId: string) => {
    toast({
      title: "Aprovar auditoria",
      description: `Auditoria ${auditId} aprovada com sucesso`,
      variant: "success",
    });
  };

  const handleNewAudit = () => {
    toast({
      title: "Nova auditoria",
      description: "Criando nova auditoria",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Em Andamento":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Em Andamento</Badge>;
      case "Concluída":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Concluída</Badge>;
      case "Pendente":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Pendente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Alta":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Alta</Badge>;
      case "Média":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Média</Badge>;
      case "Baixa":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Baixa</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestão de Auditorias</h2>
          <p className="text-muted-foreground">
            Gerencie auditorias, acompanhe status e delegue tarefas para sua equipe.
          </p>
        </div>
        <Button onClick={() => toast({
          title: "Nova auditoria",
          description: "Criando nova auditoria",
        })}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Auditoria
        </Button>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Auditorias</CardTitle>
            <div className="rounded-full bg-primary/10 p-1">
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{audits.length}</div>
            <p className="text-xs text-muted-foreground">+2 no último mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <div className="rounded-full bg-blue-500/10 p-1">
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {audits.filter(audit => audit.status === "Em Andamento").length}
            </div>
            <p className="text-xs text-muted-foreground">8 processos ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <div className="rounded-full bg-green-500/10 p-1">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {audits.filter(audit => audit.status === "Concluída").length}
            </div>
            <p className="text-xs text-muted-foreground">+3 este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <div className="rounded-full bg-amber-500/10 p-1">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {audits.filter(audit => audit.status === "Pendente").length}
            </div>
            <p className="text-xs text-muted-foreground">Requer atenção</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and table */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="completed">Concluídas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Auditorias Recentes</CardTitle>
              <CardDescription>
                Visualize e gerencie todas as auditorias em andamento, pendentes e concluídas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {audits.map((audit) => (
                    <TableRow key={audit.id}>
                      <TableCell className="font-medium">{audit.id}</TableCell>
                      <TableCell>{audit.clientName}</TableCell>
                      <TableCell>{audit.auditType}</TableCell>
                      <TableCell>{audit.date}</TableCell>
                      <TableCell>{getStatusBadge(audit.status)}</TableCell>
                      <TableCell>{getPriorityBadge(audit.priority || '')}</TableCell>
                      <TableCell>{audit.assignedTo}</TableCell>
                      <TableCell>
                        <AuditActionButtons 
                          audit={audit}
                          onViewDetails={handleViewDetails}
                          onDownloadDocuments={handleDownloadDocuments}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          onApprove={handleApprove}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Auditorias Pendentes</CardTitle>
              <CardDescription>
                Gerencie todas as auditorias que estão pendentes de ação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {audits
                    .filter(audit => audit.status === "Pendente")
                    .map((audit) => (
                      <TableRow key={audit.id}>
                        <TableCell className="font-medium">{audit.id}</TableCell>
                        <TableCell>{audit.clientName}</TableCell>
                        <TableCell>{audit.auditType}</TableCell>
                        <TableCell>{audit.date}</TableCell>
                        <TableCell>{getPriorityBadge(audit.priority || '')}</TableCell>
                        <TableCell>{audit.assignedTo}</TableCell>
                        <TableCell>
                          <AuditActionButtons 
                            audit={audit}
                            onViewDetails={handleViewDetails}
                            onDownloadDocuments={handleDownloadDocuments}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onApprove={handleApprove}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Auditorias Concluídas</CardTitle>
              <CardDescription>
                Visualize todas as auditorias que foram concluídas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {audits
                    .filter(audit => audit.status === "Concluída")
                    .map((audit) => (
                      <TableRow key={audit.id}>
                        <TableCell className="font-medium">{audit.id}</TableCell>
                        <TableCell>{audit.clientName}</TableCell>
                        <TableCell>{audit.auditType}</TableCell>
                        <TableCell>{audit.date}</TableCell>
                        <TableCell>{audit.assignedTo}</TableCell>
                        <TableCell>
                          <AuditActionButtons 
                            audit={audit}
                            onViewDetails={handleViewDetails}
                            onDownloadDocuments={handleDownloadDocuments}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onApprove={handleApprove}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuditManagement;
