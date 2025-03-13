
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, Search, Filter, ArrowRight, CheckCircle, XCircle, 
  Clock, Building, Calendar, DollarSign, UserCircle, AlertCircle, 
  FileBarChart, Plus, User, Briefcase 
} from "lucide-react";
import { useClientStore } from '@/hooks/useClientStore';
import { useToast } from '@/components/ui/use-toast';

// Mock proposal statuses
const PROPOSAL_STATUS = {
  REQUESTED: 'requested',
  ANALYZING: 'analyzing',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CONVERTED: 'converted'
};

// Mock proposals data
const MOCK_PROPOSALS = [
  {
    id: 'PROP-1001',
    clientName: 'Prefeitura Municipal de São Paulo',
    clientId: '1',
    cnpj: '12.345.678/0001-90',
    status: PROPOSAL_STATUS.APPROVED,
    createdAt: '2023-10-15',
    value: 125000.00,
    requestedBy: 'Carlos Representante',
    description: 'Análise de recuperação de créditos IRRF/PJ para os últimos 36 meses',
    segment: 'Municipal',
    timeline: [
      { date: '2023-10-15', status: 'Solicitação enviada', user: 'Carlos Representante' },
      { date: '2023-10-17', status: 'Em análise', user: 'Equipe Interna' },
      { date: '2023-10-20', status: 'Aprovada', user: 'Claudio Figueiredo' }
    ]
  },
  {
    id: 'PROP-1002',
    clientName: 'Secretaria Estadual de Saúde',
    clientId: '2',
    cnpj: '98.765.432/0001-10',
    status: PROPOSAL_STATUS.ANALYZING,
    createdAt: '2023-10-18',
    value: 87500.00,
    requestedBy: 'Maria Representante',
    description: 'Recuperação de créditos tributários com avaliação completa',
    segment: 'Estadual',
    timeline: [
      { date: '2023-10-18', status: 'Solicitação enviada', user: 'Maria Representante' },
      { date: '2023-10-19', status: 'Em análise', user: 'Equipe Interna' }
    ]
  },
  {
    id: 'PROP-1003',
    clientName: 'Universidade Federal',
    clientId: '3',
    cnpj: '56.789.123/0001-45',
    status: PROPOSAL_STATUS.CONVERTED,
    createdAt: '2023-09-05',
    value: 150000.00,
    requestedBy: 'João Representante',
    description: 'Análise completa de retenções para os últimos 60 meses',
    segment: 'Federal',
    timeline: [
      { date: '2023-09-05', status: 'Solicitação enviada', user: 'João Representante' },
      { date: '2023-09-07', status: 'Em análise', user: 'Equipe Interna' },
      { date: '2023-09-10', status: 'Aprovada', user: 'Claudio Figueiredo' },
      { date: '2023-09-15', status: 'Convertida em contrato', user: 'Claudio Figueiredo' }
    ]
  },
  {
    id: 'PROP-1004',
    clientName: 'Tribunal Regional do Trabalho',
    clientId: '4',
    cnpj: '45.678.123/0001-67',
    status: PROPOSAL_STATUS.REJECTED,
    createdAt: '2023-10-01',
    value: 95000.00,
    requestedBy: 'Ana Representante',
    description: 'Análise e recuperação de créditos IRRF',
    segment: 'Federal',
    timeline: [
      { date: '2023-10-01', status: 'Solicitação enviada', user: 'Ana Representante' },
      { date: '2023-10-03', status: 'Em análise', user: 'Equipe Interna' },
      { date: '2023-10-07', status: 'Rejeitada', user: 'Claudio Figueiredo', 
        note: 'Cliente com processos pendentes que precisam ser resolvidos primeiro' }
    ]
  },
  {
    id: 'PROP-1005',
    clientName: 'Ministério Público Estadual',
    clientId: '5',
    cnpj: '34.567.890/0001-23',
    status: PROPOSAL_STATUS.REQUESTED,
    createdAt: '2023-10-20',
    value: 110000.00,
    requestedBy: 'Roberto Representante',
    description: 'Análise de retenções e recuperação de créditos',
    segment: 'Estadual',
    timeline: [
      { date: '2023-10-20', status: 'Solicitação enviada', user: 'Roberto Representante' }
    ]
  }
];

const CommercialProposalsPanel = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [showNewProposalForm, setShowNewProposalForm] = useState(false);
  const [newProposal, setNewProposal] = useState({
    clientName: '',
    cnpj: '',
    value: '',
    description: '',
    segment: 'Municipal'
  });
  
  const { allClients } = useClientStore();
  const { toast } = useToast();

  const handleOpenDetails = (proposal: any) => {
    setSelectedProposal(proposal);
    setShowDetails(true);
  };

  const handleCreateProposal = () => {
    toast({
      title: "Proposta enviada com sucesso",
      description: "A proposta foi enviada e está aguardando análise.",
    });
    setShowNewProposalForm(false);
    setNewProposal({
      clientName: '',
      cnpj: '',
      value: '',
      description: '',
      segment: 'Municipal'
    });
  };

  const handleStatusChange = (proposal: any, newStatus: string) => {
    toast({
      title: "Status atualizado",
      description: `A proposta ${proposal.id} foi ${
        newStatus === PROPOSAL_STATUS.APPROVED ? 'aprovada' : 
        newStatus === PROPOSAL_STATUS.REJECTED ? 'rejeitada' : 
        newStatus === PROPOSAL_STATUS.ANALYZING ? 'movida para análise' : 
        newStatus === PROPOSAL_STATUS.CONVERTED ? 'convertida em contrato' : 'atualizada'
      }.`,
    });
    setShowDetails(false);
  };

  // Filter proposals based on search query and active tab
  const filteredProposals = MOCK_PROPOSALS.filter(proposal => {
    const matchesSearch = 
      proposal.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.cnpj.includes(searchQuery);
    
    if (activeTab === 'pending') {
      return matchesSearch && [PROPOSAL_STATUS.REQUESTED, PROPOSAL_STATUS.ANALYZING].includes(proposal.status);
    } else if (activeTab === 'approved') {
      return matchesSearch && [PROPOSAL_STATUS.APPROVED, PROPOSAL_STATUS.CONVERTED].includes(proposal.status);
    } else if (activeTab === 'rejected') {
      return matchesSearch && proposal.status === PROPOSAL_STATUS.REJECTED;
    }
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Propostas Comerciais</h2>
          <p className="text-muted-foreground">
            Gerencie as propostas comerciais e acompanhe o status de cada uma.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <FileBarChart className="h-4 w-4" />
            Relatórios
          </Button>
          <Button className="flex items-center gap-2" onClick={() => setShowNewProposalForm(true)}>
            <Plus className="h-4 w-4" />
            Nova Proposta
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-amber-500"></div>
              <CardTitle className="text-sm font-medium">Aguardando Análise</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {MOCK_PROPOSALS.filter(p => p.status === PROPOSAL_STATUS.REQUESTED).length}
            </div>
            <div className="text-xs text-muted-foreground">Propostas recém solicitadas</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <CardTitle className="text-sm font-medium">Em Análise</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {MOCK_PROPOSALS.filter(p => p.status === PROPOSAL_STATUS.ANALYZING).length}
            </div>
            <div className="text-xs text-muted-foreground">Propostas em processamento</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <CardTitle className="text-sm font-medium">Aprovadas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {MOCK_PROPOSALS.filter(p => p.status === PROPOSAL_STATUS.APPROVED).length}
            </div>
            <div className="text-xs text-muted-foreground">Prontas para conversão</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <CardTitle className="text-sm font-medium">Convertidas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {MOCK_PROPOSALS.filter(p => p.status === PROPOSAL_STATUS.CONVERTED).length}
            </div>
            <div className="text-xs text-muted-foreground">Em execução</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Buscar Propostas</CardTitle>
          <CardDescription>
            Pesquise propostas por cliente, número ou CNPJ.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Buscar proposta..." 
                className="pl-9" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
              <Button>Buscar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="approved">Aprovadas</TabsTrigger>
          <TabsTrigger value="rejected">Rejeitadas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Propostas Pendentes</CardTitle>
              </div>
              <CardDescription>
                Lista de propostas comerciais aguardando análise ou em processamento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProposals.length > 0 ? (
                  filteredProposals.map((proposal) => (
                    <div 
                      key={proposal.id} 
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      onClick={() => handleOpenDetails(proposal)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3 md:mb-0">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{proposal.id}</p>
                            <Badge variant={
                              proposal.status === PROPOSAL_STATUS.REQUESTED ? "warning" :
                              proposal.status === PROPOSAL_STATUS.ANALYZING ? "info" : "default"
                            }>
                              {proposal.status === PROPOSAL_STATUS.REQUESTED ? "Aguardando Análise" :
                               proposal.status === PROPOSAL_STATUS.ANALYZING ? "Em Análise" : "Pendente"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building className="h-3.5 w-3.5" />
                            <span>{proposal.clientName}</span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Solicitada: {proposal.createdAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex items-center gap-1.5">
                          <DollarSign className="h-3 w-3" />
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(proposal.value)}
                        </Badge>
                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">Nenhuma proposta encontrada</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Não há propostas pendentes que correspondam aos seus critérios de busca.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            {filteredProposals.length > 5 && (
              <CardFooter className="flex justify-center">
                <Button variant="outline">Ver Mais</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Propostas Aprovadas</CardTitle>
              <CardDescription>
                Lista de propostas comerciais aprovadas e convertidas em contratos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProposals.length > 0 ? (
                  filteredProposals.map((proposal) => (
                    <div 
                      key={proposal.id} 
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      onClick={() => handleOpenDetails(proposal)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3 md:mb-0">
                        <div className={`p-2 rounded-full ${
                          proposal.status === PROPOSAL_STATUS.APPROVED ? "bg-green-500/10" : "bg-purple-500/10"
                        }`}>
                          <FileText className={`h-5 w-5 ${
                            proposal.status === PROPOSAL_STATUS.APPROVED ? "text-green-600" : "text-purple-600"
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{proposal.id}</p>
                            <Badge variant={
                              proposal.status === PROPOSAL_STATUS.APPROVED ? "success" : "secondary"
                            }>
                              {proposal.status === PROPOSAL_STATUS.APPROVED ? "Aprovada" : "Convertida em Contrato"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building className="h-3.5 w-3.5" />
                            <span>{proposal.clientName}</span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                            <UserCircle className="h-3.5 w-3.5" />
                            <span>Solicitada por: {proposal.requestedBy}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex items-center gap-1.5">
                          <DollarSign className="h-3 w-3" />
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(proposal.value)}
                        </Badge>
                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">Nenhuma proposta encontrada</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Não há propostas aprovadas que correspondam aos seus critérios de busca.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Propostas Rejeitadas</CardTitle>
              <CardDescription>
                Lista de propostas comerciais que foram rejeitadas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProposals.length > 0 ? (
                  filteredProposals.map((proposal) => (
                    <div 
                      key={proposal.id} 
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      onClick={() => handleOpenDetails(proposal)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3 md:mb-0">
                        <div className="bg-red-500/10 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{proposal.id}</p>
                            <Badge variant="destructive">Rejeitada</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building className="h-3.5 w-3.5" />
                            <span>{proposal.clientName}</span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Rejeitada em: {
                              proposal.timeline.find((t: any) => t.status.includes('Rejeitada'))?.date || 'N/A'
                            }</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                        <Button variant="outline" size="sm">Reavaliar</Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">Nenhuma proposta encontrada</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Não há propostas rejeitadas que correspondam aos seus critérios de busca.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Proposal Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>Detalhes da Proposta {selectedProposal?.id}</span>
              <Badge variant={
                selectedProposal?.status === PROPOSAL_STATUS.REQUESTED ? "warning" :
                selectedProposal?.status === PROPOSAL_STATUS.ANALYZING ? "info" :
                selectedProposal?.status === PROPOSAL_STATUS.APPROVED ? "success" :
                selectedProposal?.status === PROPOSAL_STATUS.CONVERTED ? "secondary" :
                "destructive"
              }>
                {selectedProposal?.status === PROPOSAL_STATUS.REQUESTED ? "Aguardando Análise" :
                 selectedProposal?.status === PROPOSAL_STATUS.ANALYZING ? "Em Análise" :
                 selectedProposal?.status === PROPOSAL_STATUS.APPROVED ? "Aprovada" :
                 selectedProposal?.status === PROPOSAL_STATUS.CONVERTED ? "Convertida" :
                 "Rejeitada"}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          
          {selectedProposal && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Cliente</h3>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-primary" />
                      <span className="font-medium">{selectedProposal.clientName}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedProposal.cnpj}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Informações</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Solicitada em: {selectedProposal.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Solicitada por: {selectedProposal.requestedBy}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>Valor: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedProposal.value)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span>Segmento: {selectedProposal.segment}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Descrição</h3>
                    <p className="text-sm p-3 border rounded-md bg-muted/30">
                      {selectedProposal.description}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Timeline de Eventos</h3>
                  <div className="border rounded-md overflow-hidden">
                    <div className="p-3 bg-muted/30 border-b text-sm font-medium">
                      Histórico da Proposta
                    </div>
                    <div className="p-2 space-y-1 max-h-[300px] overflow-y-auto">
                      {selectedProposal.timeline.map((event: any, index: number) => (
                        <div key={index} className="relative pl-6 pb-3">
                          <div className="absolute left-0 top-0.5 h-full w-px bg-muted-foreground/30"></div>
                          <div className="absolute left-0 top-1 h-2 w-2 rounded-full bg-primary"></div>
                          <div className="text-sm font-medium">{event.status}</div>
                          <div className="text-xs text-muted-foreground">
                            {event.date} • {event.user}
                          </div>
                          {event.note && (
                            <div className="text-xs italic mt-1 text-muted-foreground">
                              Nota: {event.note}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <div className="flex flex-wrap gap-2 justify-end">
                  {selectedProposal.status === PROPOSAL_STATUS.REQUESTED && (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={() => handleStatusChange(selectedProposal, PROPOSAL_STATUS.ANALYZING)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Mover para Análise
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleStatusChange(selectedProposal, PROPOSAL_STATUS.REJECTED)}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Rejeitar
                      </Button>
                    </>
                  )}
                  
                  {selectedProposal.status === PROPOSAL_STATUS.ANALYZING && (
                    <>
                      <Button 
                        variant="success" 
                        onClick={() => handleStatusChange(selectedProposal, PROPOSAL_STATUS.APPROVED)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Aprovar
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleStatusChange(selectedProposal, PROPOSAL_STATUS.REJECTED)}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Rejeitar
                      </Button>
                    </>
                  )}
                  
                  {selectedProposal.status === PROPOSAL_STATUS.APPROVED && (
                    <Button 
                      variant="success" 
                      onClick={() => handleStatusChange(selectedProposal, PROPOSAL_STATUS.CONVERTED)}
                    >
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Converter em Contrato
                    </Button>
                  )}
                  
                  <Button variant="outline" onClick={() => setShowDetails(false)}>
                    Fechar
                  </Button>
                </div>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Proposal Form Dialog */}
      <Dialog open={showNewProposalForm} onOpenChange={setShowNewProposalForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Proposta Comercial</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="clientName" className="text-sm font-medium">Cliente</label>
              <Input 
                id="clientName" 
                placeholder="Nome do cliente" 
                value={newProposal.clientName}
                onChange={(e) => setNewProposal({...newProposal, clientName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="cnpj" className="text-sm font-medium">CNPJ</label>
              <Input 
                id="cnpj" 
                placeholder="00.000.000/0000-00" 
                value={newProposal.cnpj}
                onChange={(e) => setNewProposal({...newProposal, cnpj: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="value" className="text-sm font-medium">Valor Estimado (R$)</label>
              <Input 
                id="value" 
                placeholder="0,00" 
                value={newProposal.value}
                onChange={(e) => setNewProposal({...newProposal, value: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="segment" className="text-sm font-medium">Segmento</label>
              <select 
                id="segment"
                className="w-full px-3 py-2 border rounded-md"
                value={newProposal.segment}
                onChange={(e) => setNewProposal({...newProposal, segment: e.target.value})}
              >
                <option value="Municipal">Municipal</option>
                <option value="Estadual">Estadual</option>
                <option value="Federal">Federal</option>
                <option value="Privado">Privado</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Descrição</label>
              <Textarea 
                id="description" 
                placeholder="Descreva a proposta comercial" 
                rows={3}
                value={newProposal.description}
                onChange={(e) => setNewProposal({...newProposal, description: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewProposalForm(false)}>Cancelar</Button>
            <Button onClick={handleCreateProposal}>Enviar Proposta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommercialProposalsPanel;
