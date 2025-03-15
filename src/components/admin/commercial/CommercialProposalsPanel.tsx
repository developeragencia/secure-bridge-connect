
import React, { useState } from 'react';
import { useActiveClient } from '@/hooks/useActiveClient';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Filter, FileText, MoreVertical, Clock, Activity, CheckCircle, XCircle, FileCheck } from 'lucide-react';
import ProposalStatus from './ProposalStatus';
import ProposalForm from './ProposalForm';
import ProposalTimeline from './ProposalTimeline';

// Mock data for proposals
const mockProposals = [
  {
    id: 'prop-1',
    clientId: 'client-1',
    clientName: 'Prefeitura Municipal de São Paulo',
    cnpj: '12.345.678/0001-01',
    title: 'Recuperação de Créditos IRRF',
    description: 'Serviço de recuperação de créditos de IRRF de fornecedores de serviços.',
    service: 'recovery_irrf',
    value: 75000,
    status: 'REQUEST',
    createdBy: 'user-1',
    createdByName: 'João Silva',
    representativeId: 'rep-1',
    representativeName: 'Carlos Representante',
    createdAt: '2023-06-15T10:30:00',
    updatedAt: '2023-06-15T10:30:00',
    timeline: [
      {
        id: 'timeline-1',
        proposalId: 'prop-1',
        type: 'CREATED',
        description: 'Proposta criada pelo representante',
        userId: 'rep-1',
        userName: 'Carlos Representante',
        createdAt: '2023-06-15T10:30:00'
      }
    ]
  },
  {
    id: 'prop-2',
    clientId: 'client-2',
    clientName: 'Secretaria de Educação do Estado',
    cnpj: '23.456.789/0001-02',
    title: 'Auditoria Fiscal Completa',
    description: 'Auditoria fiscal completa com foco em otimização tributária.',
    service: 'tax_audit',
    value: 45000,
    status: 'ANALYSIS',
    createdBy: 'user-2',
    createdByName: 'Maria Oliveira',
    representativeId: 'rep-2',
    representativeName: 'Fernanda Representante',
    createdAt: '2023-06-10T14:20:00',
    updatedAt: '2023-06-11T09:15:00',
    timeline: [
      {
        id: 'timeline-2-1',
        proposalId: 'prop-2',
        type: 'CREATED',
        description: 'Proposta criada pelo representante',
        userId: 'rep-2',
        userName: 'Fernanda Representante',
        createdAt: '2023-06-10T14:20:00'
      },
      {
        id: 'timeline-2-2',
        proposalId: 'prop-2',
        type: 'ANALYZED',
        description: 'Proposta em análise pela equipe técnica',
        userId: 'user-3',
        userName: 'Pedro Analista',
        createdAt: '2023-06-11T09:15:00'
      }
    ]
  },
  {
    id: 'prop-3',
    clientId: 'client-3',
    clientName: 'Departamento de Obras Públicas',
    cnpj: '34.567.890/0001-03',
    title: 'Planejamento Tributário Anual',
    description: 'Elaboração de planejamento tributário estratégico para o exercício fiscal.',
    service: 'tax_planning',
    value: 62000,
    status: 'APPROVED',
    createdBy: 'user-2',
    createdByName: 'Maria Oliveira',
    approvedBy: 'user-4',
    approvedByName: 'Roberto Gerente',
    representativeId: 'rep-1',
    representativeName: 'Carlos Representante',
    createdAt: '2023-05-20T16:45:00',
    updatedAt: '2023-05-25T11:30:00',
    approvedAt: '2023-05-25T11:30:00',
    timeline: [
      {
        id: 'timeline-3-1',
        proposalId: 'prop-3',
        type: 'CREATED',
        description: 'Proposta criada pelo representante',
        userId: 'rep-1',
        userName: 'Carlos Representante',
        createdAt: '2023-05-20T16:45:00'
      },
      {
        id: 'timeline-3-2',
        proposalId: 'prop-3',
        type: 'ANALYZED',
        description: 'Proposta em análise pela equipe técnica',
        userId: 'user-3',
        userName: 'Pedro Analista',
        createdAt: '2023-05-22T10:15:00'
      },
      {
        id: 'timeline-3-3',
        proposalId: 'prop-3',
        type: 'APPROVED',
        description: 'Proposta aprovada pela gerência',
        userId: 'user-4',
        userName: 'Roberto Gerente',
        createdAt: '2023-05-25T11:30:00'
      }
    ]
  },
  {
    id: 'prop-4',
    clientId: 'client-4',
    clientName: 'Autarquia de Transportes',
    cnpj: '45.678.901/0001-04',
    title: 'Compliance Fiscal',
    description: 'Implementação de processos de compliance fiscal e tributário.',
    service: 'tax_compliance',
    value: 38000,
    status: 'REJECTED',
    createdBy: 'user-1',
    createdByName: 'João Silva',
    rejectedBy: 'user-4',
    rejectedByName: 'Roberto Gerente',
    rejectionReason: 'Fora do escopo atual de serviços para este cliente',
    representativeId: 'rep-2',
    representativeName: 'Fernanda Representante',
    createdAt: '2023-05-05T09:10:00',
    updatedAt: '2023-05-08T14:45:00',
    rejectedAt: '2023-05-08T14:45:00',
    timeline: [
      {
        id: 'timeline-4-1',
        proposalId: 'prop-4',
        type: 'CREATED',
        description: 'Proposta criada pelo representante',
        userId: 'rep-2',
        userName: 'Fernanda Representante',
        createdAt: '2023-05-05T09:10:00'
      },
      {
        id: 'timeline-4-2',
        proposalId: 'prop-4',
        type: 'ANALYZED',
        description: 'Proposta em análise pela equipe técnica',
        userId: 'user-3',
        userName: 'Pedro Analista',
        createdAt: '2023-05-06T16:20:00'
      },
      {
        id: 'timeline-4-3',
        proposalId: 'prop-4',
        type: 'REJECTED',
        description: 'Proposta rejeitada: Fora do escopo atual de serviços para este cliente',
        userId: 'user-4',
        userName: 'Roberto Gerente',
        createdAt: '2023-05-08T14:45:00'
      }
    ]
  },
  {
    id: 'prop-5',
    clientId: 'client-5',
    clientName: 'Câmara Municipal de São Bernardo',
    cnpj: '56.789.012/0001-05',
    title: 'Consultoria Empresarial',
    description: 'Consultoria tributária especializada para otimização fiscal.',
    service: 'consultancy',
    value: 50000,
    status: 'CONVERTED',
    createdBy: 'user-2',
    createdByName: 'Maria Oliveira',
    approvedBy: 'user-4',
    approvedByName: 'Roberto Gerente',
    representativeId: 'rep-1',
    representativeName: 'Carlos Representante',
    contractId: 'contract-1',
    createdAt: '2023-04-15T11:25:00',
    updatedAt: '2023-04-30T15:40:00',
    approvedAt: '2023-04-20T13:15:00',
    convertedAt: '2023-04-30T15:40:00',
    timeline: [
      {
        id: 'timeline-5-1',
        proposalId: 'prop-5',
        type: 'CREATED',
        description: 'Proposta criada pelo representante',
        userId: 'rep-1',
        userName: 'Carlos Representante',
        createdAt: '2023-04-15T11:25:00'
      },
      {
        id: 'timeline-5-2',
        proposalId: 'prop-5',
        type: 'ANALYZED',
        description: 'Proposta em análise pela equipe técnica',
        userId: 'user-3',
        userName: 'Pedro Analista',
        createdAt: '2023-04-17T14:30:00'
      },
      {
        id: 'timeline-5-3',
        proposalId: 'prop-5',
        type: 'APPROVED',
        description: 'Proposta aprovada pela gerência',
        userId: 'user-4',
        userName: 'Roberto Gerente',
        createdAt: '2023-04-20T13:15:00'
      },
      {
        id: 'timeline-5-4',
        proposalId: 'prop-5',
        type: 'CONVERTED',
        description: 'Proposta convertida em contrato',
        userId: 'user-5',
        userName: 'Ana Comercial',
        createdAt: '2023-04-30T15:40:00',
        metadata: {
          contractId: 'contract-1'
        }
      }
    ]
  }
];

const CommercialProposalsPanel = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [proposalDetailOpen, setProposalDetailOpen] = useState(false);
  const { activeClient, isRepresentative } = useActiveClient();

  const handleCreateProposal = (data) => {
    // In a real application, this would send the data to your backend
    toast.success('Proposta criada com sucesso!', {
      description: `Proposta "${data.title}" foi criada e está aguardando análise.`,
    });
    setIsFormDialogOpen(false);
  };

  const handleViewDetails = (proposal) => {
    setSelectedProposal(proposal);
    setProposalDetailOpen(true);
  };

  const handleChangeStatus = (proposalId, newStatus) => {
    // In a real application, this would update the status in your backend
    toast.success(`Status da proposta atualizado para ${newStatus}`, {
      description: 'A proposta foi atualizada com sucesso.',
    });
  };

  // Filter proposals based on active tab
  const filteredProposals = mockProposals.filter(proposal => {
    if (activeTab === 'all') return true;
    return proposal.status === activeTab;
  });

  const getProposalCountByStatus = (status) => {
    return mockProposals.filter(p => p.status === status).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Propostas Comerciais</h2>
          <p className="text-muted-foreground">
            Gerencie propostas comerciais, desde a solicitação até a conversão em contrato.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isRepresentative && (
            <Button onClick={() => setIsFormDialogOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Proposta
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveTab('all')}>
                Todas as Propostas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('REQUEST')}>
                Solicitações
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('ANALYSIS')}>
                Em Análise
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('APPROVED')}>
                Aprovadas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('REJECTED')}>
                Rejeitadas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('CONVERTED')}>
                Convertidas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Solicitações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getProposalCountByStatus('REQUEST')}</div>
            <p className="text-xs text-muted-foreground mt-1">Propostas aguardando análise</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Em Análise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getProposalCountByStatus('ANALYSIS')}</div>
            <p className="text-xs text-muted-foreground mt-1">Propostas em análise técnica</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Aprovadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getProposalCountByStatus('APPROVED')}</div>
            <p className="text-xs text-muted-foreground mt-1">Propostas aprovadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Rejeitadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getProposalCountByStatus('REJECTED')}</div>
            <p className="text-xs text-muted-foreground mt-1">Propostas rejeitadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Convertidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getProposalCountByStatus('CONVERTED')}</div>
            <p className="text-xs text-muted-foreground mt-1">Propostas convertidas em contratos</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">
            Todas
          </TabsTrigger>
          <TabsTrigger value="REQUEST" className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            Solicitações
          </TabsTrigger>
          <TabsTrigger value="ANALYSIS" className="flex items-center">
            <Activity className="h-3.5 w-3.5 mr-1.5" />
            Em Análise
          </TabsTrigger>
          <TabsTrigger value="APPROVED" className="flex items-center">
            <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
            Aprovadas
          </TabsTrigger>
          <TabsTrigger value="REJECTED" className="flex items-center">
            <XCircle className="h-3.5 w-3.5 mr-1.5" />
            Rejeitadas
          </TabsTrigger>
          <TabsTrigger value="CONVERTED" className="flex items-center">
            <FileCheck className="h-3.5 w-3.5 mr-1.5" />
            Convertidas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4 pt-4">
          {filteredProposals.length > 0 ? (
            <div className="rounded-md border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-3 text-left font-medium text-sm">Título</th>
                    <th className="p-3 text-left font-medium text-sm">Cliente</th>
                    <th className="p-3 text-left font-medium text-sm">Valor</th>
                    <th className="p-3 text-left font-medium text-sm">Status</th>
                    <th className="p-3 text-left font-medium text-sm">Data</th>
                    <th className="p-3 text-left font-medium text-sm">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredProposals.map((proposal) => (
                    <tr key={proposal.id} className="hover:bg-muted/50">
                      <td className="p-3 text-sm">{proposal.title}</td>
                      <td className="p-3 text-sm">{proposal.clientName}</td>
                      <td className="p-3 text-sm">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(proposal.value)}
                      </td>
                      <td className="p-3 text-sm">
                        <ProposalStatus status={proposal.status} />
                      </td>
                      <td className="p-3 text-sm">
                        {new Date(proposal.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="p-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleViewDetails(proposal)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleViewDetails(proposal)}>
                                Ver Detalhes
                              </DropdownMenuItem>
                              {proposal.status === 'REQUEST' && (
                                <DropdownMenuItem onClick={() => handleChangeStatus(proposal.id, 'ANALYSIS')}>
                                  Iniciar Análise
                                </DropdownMenuItem>
                              )}
                              {proposal.status === 'ANALYSIS' && (
                                <>
                                  <DropdownMenuItem onClick={() => handleChangeStatus(proposal.id, 'APPROVED')}>
                                    Aprovar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleChangeStatus(proposal.id, 'REJECTED')}>
                                    Rejeitar
                                  </DropdownMenuItem>
                                </>
                              )}
                              {proposal.status === 'APPROVED' && (
                                <DropdownMenuItem onClick={() => handleChangeStatus(proposal.id, 'CONVERTED')}>
                                  Converter em Contrato
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full p-3 bg-muted mb-4">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Nenhuma proposta encontrada</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md mt-1">
                  Não existem propostas na categoria selecionada. Clique no botão "Nova Proposta" para criar uma.
                </p>
                {isRepresentative && (
                  <Button 
                    onClick={() => setIsFormDialogOpen(true)} 
                    variant="outline" 
                    className="mt-4"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Proposta
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Form Dialog for New Proposal */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Nova Proposta Comercial</DialogTitle>
            <DialogDescription>
              Preencha os detalhes da proposta comercial. Após submetida, ela será analisada pela nossa equipe.
            </DialogDescription>
          </DialogHeader>
          <ProposalForm 
            onSubmit={handleCreateProposal} 
            onCancel={() => setIsFormDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Proposal Detail Dialog */}
      {selectedProposal && (
        <Dialog open={proposalDetailOpen} onOpenChange={setProposalDetailOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedProposal.title}</DialogTitle>
              <DialogDescription>
                Detalhes da proposta comercial e linha do tempo de eventos.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-1">Cliente</h3>
                  <p className="text-sm">{selectedProposal.clientName}</p>
                  <p className="text-xs text-muted-foreground">CNPJ: {selectedProposal.cnpj}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Serviço</h3>
                  <p className="text-sm">{selectedProposal.service}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Valor</h3>
                  <p className="text-sm font-medium">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedProposal.value)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Status</h3>
                  <ProposalStatus status={selectedProposal.status} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Descrição</h3>
                  <p className="text-sm">{selectedProposal.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Representante</h3>
                  <p className="text-sm">{selectedProposal.representativeName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Data de Criação</h3>
                  <p className="text-sm">
                    {new Date(selectedProposal.createdAt).toLocaleString('pt-BR')}
                  </p>
                </div>
                {selectedProposal.status === 'REJECTED' && (
                  <div>
                    <h3 className="text-sm font-semibold mb-1 text-red-600">Motivo da Rejeição</h3>
                    <p className="text-sm">{selectedProposal.rejectionReason}</p>
                  </div>
                )}
                {selectedProposal.status === 'CONVERTED' && (
                  <div>
                    <h3 className="text-sm font-semibold mb-1 text-purple-600">Informações do Contrato</h3>
                    <p className="text-sm">Contrato #{selectedProposal.contractId}</p>
                    <p className="text-xs text-muted-foreground">
                      Convertido em: {new Date(selectedProposal.convertedAt).toLocaleString('pt-BR')}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-3">Linha do Tempo</h3>
                <ProposalTimeline events={selectedProposal.timeline} />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={() => setProposalDetailOpen(false)}>
                Fechar
              </Button>
              {selectedProposal.status === 'REQUEST' && (
                <Button onClick={() => handleChangeStatus(selectedProposal.id, 'ANALYSIS')}>
                  Iniciar Análise
                </Button>
              )}
              {selectedProposal.status === 'ANALYSIS' && (
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    className="border-red-200 text-red-700 hover:bg-red-50"
                    onClick={() => handleChangeStatus(selectedProposal.id, 'REJECTED')}
                  >
                    Rejeitar
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-green-200 text-green-700 hover:bg-green-50"
                    onClick={() => handleChangeStatus(selectedProposal.id, 'APPROVED')}
                  >
                    Aprovar
                  </Button>
                </div>
              )}
              {selectedProposal.status === 'APPROVED' && (
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => handleChangeStatus(selectedProposal.id, 'CONVERTED')}
                >
                  Converter em Contrato
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CommercialProposalsPanel;
