
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Building, Calendar, MapPin, Phone, Mail, User, FileText,
  Check, Clock, FileClock, Receipt, ChevronLeft, Share2, Edit
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Client } from '@/types/client';
import { TaxCredit } from '@/types/tax-credits';
import { toast } from '@/components/ui/use-toast';
import { useActiveClient } from '@/hooks/useActiveClient';

// Mock data function for tax credits
const getMockTaxCredits = (clientId: string): TaxCredit[] => {
  return Array.from({ length: 5 }, (_, i) => ({
    id: `credit-${i+1}`,
    clientId,
    clientName: `Client ${clientId}`,
    documentNumber: `${Math.floor(Math.random() * 90000000) + 10000000}/${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 90) + 10}`,
    creditType: ['IRPJ', 'CSLL', 'PIS/COFINS', 'INSS', 'IRRF'][Math.floor(Math.random() * 5)],
    creditAmount: Math.floor(Math.random() * 500000) + 10000,
    originalAmount: Math.floor(Math.random() * 1000000) + 50000,
    periodStart: new Date(2022, Math.floor(Math.random() * 12), 1).toISOString(),
    periodEnd: new Date(2022, Math.floor(Math.random() * 12), 28).toISOString(),
    status: ['PENDING', 'ANALYZING', 'APPROVED', 'REJECTED', 'RECOVERED'][Math.floor(Math.random() * 5)] as TaxCredit['status'],
    createdAt: new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    updatedAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    assignedTo: Math.random() > 0.5 ? `User ${Math.floor(Math.random() * 5) + 1}` : undefined,
    notes: Math.random() > 0.5 ? `Note for client ${clientId}` : undefined,
  }));
};

// Mock data for client
const getMockClient = (clientId: string): Client => {
  const mockClients: Client[] = [
    {
      id: "1",
      name: "Empresa ABC Ltda",
      documentNumber: "12.345.678/0001-90",
      email: "contato@empresaabc.com.br",
      phone: "(11) 3456-7890",
      address: "Av. Paulista, 1000, São Paulo - SP",
      contactPerson: "João Silva",
      industry: "Tecnologia",
      createdAt: "2023-01-15T10:30:00Z",
      updatedAt: "2023-05-20T14:45:00Z",
      status: "ACTIVE",
      cnpj: "12.345.678/0001-90",
      segment: "Tecnologia",
      city: "São Paulo",
      state: "SP",
      contactName: "João Silva",
      contactEmail: "joao.silva@empresaabc.com.br",
      contactPhone: "(11) 98765-4321",
      type: "private"
    },
    {
      id: "2",
      name: "Indústria XYZ S.A.",
      documentNumber: "23.456.789/0001-10",
      email: "financeiro@industriaxyz.com.br",
      phone: "(11) 2345-6789",
      address: "Rua Industrial, 500, Guarulhos - SP",
      contactPerson: "Maria Oliveira",
      industry: "Manufatura",
      createdAt: "2023-02-10T09:15:00Z",
      updatedAt: "2023-04-20T08:00:00Z",
      status: "ACTIVE",
      cnpj: "23.456.789/0001-10",
      segment: "Manufatura",
      city: "Guarulhos",
      state: "SP",
      contactName: "Maria Oliveira",
      contactEmail: "maria.oliveira@industriaxyz.com.br",
      contactPhone: "(11) 98765-1234",
      type: "public"
    },
    {
      id: "3",
      name: "Comércio DEF Eireli",
      documentNumber: "34.567.890/0001-21",
      email: "contato@comerciodef.com.br",
      phone: "(11) 4567-8901",
      address: "Rua Comercial, 200, Campinas - SP",
      contactPerson: "Carlos Santos",
      industry: "Varejo",
      createdAt: "2023-03-05T11:45:00Z",
      updatedAt: "2023-06-18T16:30:00Z",
      status: "INACTIVE",
      cnpj: "34.567.890/0001-21",
      segment: "Varejo",
      city: "Campinas",
      state: "SP",
      contactName: "Carlos Santos",
      contactEmail: "carlos.santos@comerciodef.com.br",
      contactPhone: "(11) 91234-5678",
      type: "private"
    },
    {
      id: "4",
      name: "Serviços GHI S.A.",
      documentNumber: "45.678.901/0001-32",
      email: "atendimento@servicosghi.com.br",
      phone: "(11) 5678-9012",
      address: "Av. Brasil, 1500, Rio de Janeiro - RJ",
      contactPerson: "Ana Souza",
      industry: "Consultoria",
      createdAt: "2023-04-20T08:00:00Z",
      updatedAt: "2023-04-20T08:00:00Z",
      status: "ACTIVE",
      cnpj: "45.678.901/0001-32",
      segment: "Consultoria",
      city: "Rio de Janeiro",
      state: "RJ",
      contactName: "Ana Souza",
      contactEmail: "ana.souza@servicosghi.com.br",
      contactPhone: "(21) 98765-9012",
      type: "public"
    },
    {
      id: "5",
      name: "Transportes JKL Ltda",
      documentNumber: "56.789.012/0001-43",
      email: "operacoes@transportesjkl.com.br",
      phone: "(11) 6789-0123",
      address: "Rodovia BR 101, Km 200, Florianópolis - SC",
      contactPerson: "Roberto Lima",
      industry: "Logística",
      createdAt: "2023-05-15T14:30:00Z",
      updatedAt: "2023-05-15T14:30:00Z",
      status: "ACTIVE",
      cnpj: "56.789.012/0001-43",
      segment: "Logística",
      city: "Florianópolis",
      state: "SC",
      contactName: "Roberto Lima",
      contactEmail: "roberto.lima@transportesjkl.com.br",
      contactPhone: "(48) 98765-0123",
      type: "private"
    }
  ];

  const client = mockClients.find(c => c.id === clientId);
  return client || mockClients[0];
};

interface ClientDetailProps {
  clientId: string;
}

const ClientDetail: React.FC<ClientDetailProps> = ({ clientId }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [taxCredits, setTaxCredits] = useState<TaxCredit[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const { setActiveClient } = useActiveClient();
  
  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch (e) {
      return 'Data inválida';
    }
  };
  
  // Load client data
  useEffect(() => {
    // In a real app, this would be a database call
    const mockClient = getMockClient(clientId);
    setClient(mockClient);
    
    // Load tax credits
    const mockCredits = getMockTaxCredits(clientId);
    setTaxCredits(mockCredits);
    
  }, [clientId]);
  
  if (!client) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
      </div>
    );
  }
  
  const handleEdit = () => {
    toast({
      title: "Editar cliente",
      description: `Editando cliente: ${client.name}`,
    });
  };
  
  const handleBack = () => {
    window.history.back();
  };
  
  const handleActivateClient = () => {
    setActiveClient(client);
    toast({
      title: "Cliente ativo definido",
      description: `${client.name} definido como cliente ativo`,
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Pendente</Badge>;
      case 'ANALYZING':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Em análise</Badge>;
      case 'APPROVED':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Aprovado</Badge>;
      case 'REJECTED':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Rejeitado</Badge>;
      case 'RECOVERED':
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Recuperado</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              <span>{client.name}</span>
              <Badge className={client.status === "ACTIVE" 
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 ml-2"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 ml-2"
              }>
                {client.status === "ACTIVE" ? "Ativo" : "Inativo"}
              </Badge>
            </h2>
            <p className="text-muted-foreground">
              {client.cnpj} • {client.type === 'private' ? 'Empresa Privada' : 'Órgão Público'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleActivateClient}>
            <Share2 className="h-4 w-4 mr-2" />
            Definir como Ativo
          </Button>
          <Button onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 sm:w-[400px]">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="credits">Créditos</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Informações do Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Segmento</p>
                  <p className="text-base">{client.segment}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Endereço</p>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base">{client.address || `${client.city}, ${client.state}`}</p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Data de Cadastro</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-base">{formatDate(client.createdAt)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Última Atualização</p>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-base">{formatDate(client.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Contact Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Contato Principal</p>
                  <p className="text-base">{client.contactName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base">{client.contactEmail}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Telefone</p>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base">{client.contactPhone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileClock className="h-5 w-5 text-primary" />
                Atividade Recente
              </CardTitle>
              <CardDescription>
                Últimas atividades e processos relacionados a este cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start gap-2 pb-3 border-b border-border/50 last:border-0">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      {item === 1 ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : item === 2 ? (
                        <FileText className="h-4 w-4 text-primary" />
                      ) : (
                        <Receipt className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {item === 1 
                          ? "Crédito aprovado" 
                          : item === 2 
                            ? "Documento adicionado" 
                            : "Processo iniciado"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(new Date(2023, 6 - item, 15).toISOString())} • Usuário: Admin
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="ghost" size="sm">
                Ver todas as atividades
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Credits Tab */}
        <TabsContent value="credits" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-primary" />
                    Créditos Tributários
                  </CardTitle>
                  <CardDescription>
                    Processos de crédito tributário deste cliente
                  </CardDescription>
                </div>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Novo Crédito
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxCredits.length > 0 ? (
                  taxCredits.map((credit) => (
                    <div key={credit.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">
                            {credit.creditType} - R$ {new Intl.NumberFormat('pt-BR').format(credit.creditAmount)}
                          </h3>
                          {getStatusBadge(credit.status)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Período: {formatDate(credit.periodStart)} a {formatDate(credit.periodEnd)}
                        </p>
                        {credit.notes && (
                          <p className="text-xs text-muted-foreground">
                            {credit.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <Button variant="outline" size="sm">
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum crédito tributário encontrado para este cliente
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Total: {taxCredits.length} créditos
              </div>
              {taxCredits.length > 5 && (
                <Button variant="ghost" size="sm">
                  Ver todos
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Documentos
                  </CardTitle>
                  <CardDescription>
                    Documentos relacionados a este cliente
                  </CardDescription>
                </div>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Adicionar Documento
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>Nenhum documento encontrado para este cliente</p>
                <p className="text-sm mt-1">
                  Adicione documentos como contratos, notas fiscais ou outros arquivos relevantes
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetail;
