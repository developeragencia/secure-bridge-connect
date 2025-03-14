import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, Calendar, Edit, FileText, Mail, MapPin, Phone, Plus, Shield, Trash, User } from 'lucide-react';
import { useClientStore } from '@/hooks/useClientStore';
import { useActiveClient } from '@/hooks/useActiveClient';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import ClientActiveToggle from '@/components/admin/client/ClientActiveToggle';
import ClientOperationsAccess from '@/components/admin/client/ClientOperationsAccess';
import ButtonEffect from '@/components/admin/common/ButtonEffect';

const ClientDetailView = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { clients, updateClient, removeClient } = useClientStore();
  const { activeClient, setActiveClient } = useActiveClient();
  const [activeTab, setActiveTab] = useState('info');
  
  const client = clients.find(c => c.id === clientId);
  
  if (!client) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle>Cliente não encontrado</CardTitle>
              <CardDescription>O cliente especificado não foi encontrado no sistema.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p>Verifique o ID do cliente ou navegue de volta para a lista de clientes.</p>
          <Button className="mt-4" onClick={() => navigate('/admin/clients')}>
            Ver todos os clientes
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  const handleEditClient = () => {
    toast({
      title: "Editar cliente",
      description: `Editando cliente ${client.name}`,
    });
  };
  
  const handleDeleteClient = () => {
    if (confirm(`Tem certeza que deseja excluir o cliente ${client.name}?`)) {
      removeClient(client.id);
      toast({
        title: "Cliente removido",
        description: `O cliente ${client.name} foi removido com sucesso.`,
        variant: "destructive"
      });
      navigate('/admin/clients');
    }
  };
  
  const handleCreateTaxCredit = () => {
    toast({
      title: "Novo crédito tributário",
      description: `Criando novo crédito para ${client.name}`,
    });
  };
  
  const handleCreateRecoveryProcess = () => {
    toast({
      title: "Novo processo de recuperação",
      description: `Criando novo processo para ${client.name}`,
    });
  };
  
  const handleCreateAudit = () => {
    toast({
      title: "Nova auditoria",
      description: `Criando nova auditoria para ${client.name}`,
    });
  };
  
  const getStatusBadge = () => {
    switch (client.status) {
      case 'ACTIVE':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Ativo</Badge>;
      case 'INACTIVE':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Inativo</Badge>;
      case 'PROSPECT':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Prospecto</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <Button variant="outline" size="icon" onClick={() => navigate('/admin/clients')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle>{client.name}</CardTitle>
                  {getStatusBadge()}
                </div>
                <CardDescription>
                  {client.cnpj} • {client.type === 'public' ? 'Entidade Pública' : 'Entidade Privada'}
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <ClientActiveToggle client={client} showDetails={true} />
              
              <ButtonEffect
                onClick={handleEditClient}
                icon={<Edit className="h-3.5 w-3.5" />}
                label="Editar"
                variant="outline"
                size="sm"
                tooltip="Editar informações do cliente"
              />
              
              <ButtonEffect
                onClick={handleDeleteClient}
                icon={<Trash className="h-3.5 w-3.5" />}
                label="Excluir"
                variant="destructive"
                size="sm"
                tooltip="Excluir cliente"
              />
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-card border">
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="tax-credits">Créditos Tributários</TabsTrigger>
          <TabsTrigger value="recovery">Processos de Recuperação</TabsTrigger>
          <TabsTrigger value="audits">Auditorias</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detalhes do Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-md font-semibold mb-2">Informações Gerais</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>CNPJ: {client.cnpj}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Contato: {client.contactName}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>Email: {client.contactEmail}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>Telefone: {client.contactPhone}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          Criado em: {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Endereço: {client.address || 'Não informado'}, {client.city || 'N/A'}/{client.state || 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span>Segmento: {client.segment}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-md font-semibold mb-2">Status e Tipo</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span>Status: </span>
                        {getStatusBadge()}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span>Tipo: </span>
                        <Badge variant="outline" className={client.type === 'public' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}>
                          {client.type === 'public' ? 'Público' : 'Privado'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-md font-semibold mb-2">Permissões e Acesso</h3>
                    <ClientOperationsAccess client={client} />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-md font-semibold mb-2">Ações Rápidas</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <Button onClick={handleCreateTaxCredit} variant="outline" className="justify-start">
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Crédito Tributário
                      </Button>
                      
                      <Button onClick={handleCreateRecoveryProcess} variant="outline" className="justify-start">
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Processo de Recuperação
                      </Button>
                      
                      <Button onClick={handleCreateAudit} variant="outline" className="justify-start">
                        <Plus className="mr-2 h-4 w-4" />
                        Nova Auditoria
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tax-credits">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg">Créditos Tributários</CardTitle>
                <CardDescription>Gerenciamento de créditos tributários do cliente</CardDescription>
              </div>
              <Button onClick={handleCreateTaxCredit}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Crédito
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-16 w-16 text-muted-foreground/60 mb-4" />
                <h3 className="text-lg font-medium">Nenhum crédito tributário</h3>
                <p className="text-muted-foreground mt-1 mb-6">Este cliente ainda não possui créditos tributários registrados.</p>
                <Button onClick={handleCreateTaxCredit}>
                  <Plus className="mr-2 h-4 w-4" />
                  Cadastrar Novo Crédito
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recovery">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg">Processos de Recuperação</CardTitle>
                <CardDescription>Gerenciamento de processos de recuperação do cliente</CardDescription>
              </div>
              <Button onClick={handleCreateRecoveryProcess}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Processo
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-16 w-16 text-muted-foreground/60 mb-4" />
                <h3 className="text-lg font-medium">Nenhum processo de recuperação</h3>
                <p className="text-muted-foreground mt-1 mb-6">Este cliente ainda não possui processos de recuperação registrados.</p>
                <Button onClick={handleCreateRecoveryProcess}>
                  <Plus className="mr-2 h-4 w-4" />
                  Cadastrar Novo Processo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audits">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg">Auditorias</CardTitle>
                <CardDescription>Gerenciamento de auditorias do cliente</CardDescription>
              </div>
              <Button onClick={handleCreateAudit}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Auditoria
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Shield className="h-16 w-16 text-muted-foreground/60 mb-4" />
                <h3 className="text-lg font-medium">Nenhuma auditoria</h3>
                <p className="text-muted-foreground mt-1 mb-6">Este cliente ainda não possui auditorias registradas.</p>
                <Button onClick={handleCreateAudit}>
                  <Plus className="mr-2 h-4 w-4" />
                  Cadastrar Nova Auditoria
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg">Documentos</CardTitle>
                <CardDescription>Gerenciamento de documentos do cliente</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Documento
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-16 w-16 text-muted-foreground/60 mb-4" />
                <h3 className="text-lg font-medium">Nenhum documento</h3>
                <p className="text-muted-foreground mt-1 mb-6">Este cliente ainda não possui documentos registrados.</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Cadastrar Novo Documento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetailView;
