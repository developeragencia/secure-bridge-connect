import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Client } from '@/types/client';
import { useActiveClient } from '@/hooks/useActiveClient';
import { 
  ArrowLeft, Building, MapPin, Phone, Mail, User, 
  Calendar, Edit, Trash2, CheckCircle, AlertCircle,
  Receipt, FileText, Landmark, FileSpreadsheet, Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { TaxCredit } from '@/types/tax-credits';
import { useToast } from '@/components/ui/use-toast';

interface ClientDetailProps {
  clientId: string;
}

const ClientDetail = ({ clientId }: ClientDetailProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const { activeClient, setActiveClient } = useActiveClient();
  const [client, setClient] = useState<Client | null>(null);
  
  // Mock credit data for this client
  const [credits, setCredits] = useState<TaxCredit[]>([
    {
      id: "1",
      clientId: clientId,
      clientName: "",
      documentNumber: "",
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
      clientId: clientId,
      clientName: "",
      documentNumber: "",
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
      clientId: clientId,
      clientName: "",
      documentNumber: "",
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
  ]);

  // Mock data for clients - simulating a database fetch
  const clients: Client[] = [
    {
      id: "1",
      name: "Empresa ABC Ltda",
      cnpj: "12.345.678/0001-90",
      status: 'ACTIVE',
      type: 'private',
      segment: "Tecnologia",
      address: "Av. Paulista, 1000, São Paulo - SP",
      city: "São Paulo",
      state: "SP",
      contactName: "João Silva",
      contactEmail: "contato@empresaabc.com.br",
      contactPhone: "(11) 3456-7890",
      createdAt: "2023-01-15T10:30:00Z",
      updatedAt: "2023-05-20T14:45:00Z",
      email: "",
      phone: "(11) 3456-7890",
    },
    {
      id: "2",
      name: "Indústria XYZ S.A.",
      cnpj: "23.456.789/0001-10",
      status: 'ACTIVE',
      type: 'public',
      segment: "Manufatura",
      address: "Rua Industrial, 500, Guarulhos - SP",
      city: "Guarulhos",
      state: "SP",
      contactName: "Maria Oliveira",
      contactEmail: "financeiro@industriaxyz.com.br",
      contactPhone: "(11) 2345-6789",
      createdAt: "2023-02-10T09:15:00Z",
      updatedAt: "2023-02-10T09:15:00Z",
      email: "",
      phone: "(11) 2345-6789",
    },
    {
      id: "3",
      name: "Comércio DEF Eireli",
      cnpj: "34.567.890/0001-21",
      status: 'INACTIVE',
      type: 'private',
      segment: "Varejo",
      address: "Rua Comercial, 200, Campinas - SP",
      city: "Campinas",
      state: "SP",
      contactName: "Carlos Santos",
      contactEmail: "contato@comerciodef.com.br",
      contactPhone: "(11) 4567-8901",
      createdAt: "2023-03-05T11:45:00Z",
      updatedAt: "2023-06-18T16:30:00Z",
      email: "",
      phone: "(11) 4567-8901",
    },
    {
      id: "4",
      name: "Serviços GHI S.A.",
      cnpj: "45.678.901/0001-32",
      status: 'ACTIVE',
      type: 'public',
      segment: "Consultoria",
      address: "Av. Brasil, 1500, Rio de Janeiro - RJ",
      city: "Rio de Janeiro",
      state: "RJ",
      contactName: "Ana Souza",
      contactEmail: "atendimento@servicosghi.com.br",
      contactPhone: "(11) 5678-9012",
      createdAt: "2023-04-20T08:00:00Z",
      updatedAt: "2023-04-20T08:00:00Z",
      email: "",
      phone: "(11) 5678-9012",
    },
    {
      id: "5",
      name: "Transportes JKL Ltda",
      cnpj: "56.789.012/0001-43",
      status: 'ACTIVE',
      type: 'private',
      segment: "Logística",
      address: "Rodovia BR 101, Km 200, Florianópolis - SC",
      city: "Florianópolis",
      state: "SC",
      contactName: "Roberto Lima",
      contactEmail: "operacoes@transportesjkl.com.br",
      contactPhone: "(11) 6789-0123",
      createdAt: "2023-05-15T14:30:00Z",
      updatedAt: "2023-05-15T14:30:00Z",
      email: "",
      phone: "(11) 6789-0123",
    }
  ];
  
  useEffect(() => {
    // Simulated fetch of client data
    const foundClient = clients.find(c => c.id === clientId);
    
    if (foundClient) {
      setClient(foundClient);
      
      // Update the client name and document number in the credits
      setCredits(prevCredits => 
        prevCredits.map(credit => ({
          ...credit,
          clientName: foundClient.name,
          documentNumber: foundClient.cnpj
        }))
      );
    }
  }, [clientId]);
  
  const handleBack = () => {
    navigate('/admin?tab=clients');
  };
  
  const handleSetActive = () => {
    if (client) {
      setActiveClient(client);
      toast({
        title: "Cliente ativo definido",
        description: `${client.name} definido como cliente ativo`,
      });
    }
  };
  
  const handleEdit = () => {
    toast({
      title: "Editar cliente",
      description: `Editando cliente: ${client?.name}`,
    });
  };
  
  const handleDelete = () => {
    toast({
      variant: "destructive",
      title: "Excluir cliente",
      description: `Cliente ${client?.name} excluído com sucesso`,
    });
    navigate('/admin?tab=clients');
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    ANALYZING: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    APPROVED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    REJECTED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    RECOVERED: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
  };
  
  const statusLabels: Record<string, string> = {
    PENDING: "Pendente",
    ANALYZING: "Em Análise",
    APPROVED: "Aprovado",
    REJECTED: "Rejeitado",
    RECOVERED: "Recuperado"
  };
  
  // Calculate summary data
  const totalCredits = credits.reduce((sum, credit) => sum + credit.originalAmount, 0);
  const recoveredAmount = credits.reduce((sum, credit) => sum + credit.creditAmount, 0);
  const recoveryRate = totalCredits ? Math.round((recoveredAmount / totalCredits) * 100) : 0;

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Cliente não encontrado</h2>
        <p className="text-muted-foreground mb-6">O cliente solicitado não existe ou foi removido.</p>
        <Button onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a lista
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Detalhes do Cliente</h1>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleSetActive}
            disabled={activeClient?.id === client.id}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            {activeClient?.id === client.id ? 'Cliente Ativo' : 'Definir como Ativo'}
          </Button>
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-2xl">{client.name}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                CNPJ: {client.cnpj}
                <Badge 
                  className={`ml-4 ${client.status === 'ACTIVE' 
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`
                  }
                >
                  {client.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                </Badge>
                <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {client.type === 'public' ? 'Público' : 'Privado'}
                </Badge>
              </CardDescription>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-muted-foreground">
                Cliente desde: {formatDate(client.createdAt)}
              </p>
              <p className="text-sm text-muted-foreground">
                Última atualização: {formatDate(client.updatedAt)}
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="credits">Créditos</TabsTrigger>
              <TabsTrigger value="audits">Auditorias</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Client Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total de Créditos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{formatCurrency(totalCredits)}</div>
                      <Receipt className="h-5 w-5 text-muted-foreground" />
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
                      <div className="text-2xl font-bold">{formatCurrency(recoveredAmount)}</div>
                      <Landmark className="h-5 w-5 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Taxa de Recuperação
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{recoveryRate}%</div>
                      <Progress value={recoveryRate} className="w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Client Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Informações Comerciais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Segmento</p>
                          <p className="text-muted-foreground">{client.segment || 'Não informado'}</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Endereço</p>
                          <p className="text-muted-foreground">{client.address || 'Não informado'}</p>
                          <p className="text-muted-foreground">
                            {client.city && client.state ? `${client.city}, ${client.state}` : ''}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Contato</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Pessoa de Contato</p>
                          <p className="text-muted-foreground">{client.contactName || 'Não informado'}</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-muted-foreground">{client.contactEmail || 'Não informado'}</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Telefone</p>
                          <p className="text-muted-foreground">{client.contactPhone || 'Não informado'}</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="credits" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle>Créditos Tributários</CardTitle>
                      <CardDescription>
                        Créditos tributários associados a {client.name}
                      </CardDescription>
                    </div>
                    <div>
                      <Button>
                        <FileText className="mr-2 h-4 w-4" />
                        Novo Crédito
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Período</TableHead>
                        <TableHead>Valor Original</TableHead>
                        <TableHead>Valor Atual</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Atualização</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {credits.map((credit) => (
                        <TableRow key={credit.id}>
                          <TableCell className="font-medium">{credit.creditType}</TableCell>
                          <TableCell>
                            {formatDate(credit.periodStart)} - {formatDate(credit.periodEnd)}
                          </TableCell>
                          <TableCell>{formatCurrency(credit.originalAmount)}</TableCell>
                          <TableCell>{formatCurrency(credit.creditAmount)}</TableCell>
                          <TableCell>
                            <Badge className={statusColors[credit.status]}>
                              {statusLabels[credit.status]}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(credit.updatedAt)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <FileSpreadsheet className="mr-2 h-3 w-3" />
                              Detalhes
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {credits.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            <div className="flex flex-col items-center">
                              <AlertCircle className="h-8 w-8 text-muted-foreground mb-3" />
                              <p className="text-muted-foreground">Nenhum crédito encontrado para este cliente.</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="audits" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle>Auditorias</CardTitle>
                      <CardDescription>
                        Processos de auditoria fiscal para {client.name}
                      </CardDescription>
                    </div>
                    <div>
                      <Button>
                        <Clock className="mr-2 h-4 w-4" />
                        Nova Auditoria
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12">
                    <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-1">Nenhuma auditoria em andamento</p>
                    <p className="text-muted-foreground mb-6">Não existem processos de auditoria para este cliente.</p>
                    <Button>
                      <Clock className="mr-2 h-4 w-4" />
                      Iniciar Auditoria
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle>Documentos</CardTitle>
                      <CardDescription>
                        Documentos e arquivos relacionados a {client.name}
                      </CardDescription>
                    </div>
                    <div>
                      <Button>
                        <FileText className="mr-2 h-4 w-4" />
                        Novo Documento
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-1">Sem documentos</p>
                    <p className="text-muted-foreground mb-6">Não há documentos cadastrados para este cliente.</p>
                    <Button>
                      <FileText className="mr-2 h-4 w-4" />
                      Fazer Upload
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetail;
