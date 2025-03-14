
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, FileText, Building, Phone, Mail, Calendar, MapPin, User, Briefcase, FileCheck, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useClientStore } from '@/hooks/useClientStore';
import { Client } from '@/types/client';
import ClientActiveToggle from '../../client/ClientActiveToggle';
import ClientOperationsAccess from '../../client/ClientOperationsAccess';
import ButtonEffect from '../../common/ButtonEffect';

const ClientDetailView = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { clients } = useClientStore();
  const [activeTab, setActiveTab] = React.useState('overview');

  const client = clients.find((c) => c.id === clientId);

  if (!client) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cliente não encontrado</CardTitle>
          <CardDescription>O cliente especificado não foi encontrado.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <p>Não foi possível encontrar o cliente com o ID {clientId}.</p>
            <ButtonEffect
              onClick={() => navigate('/admin/clients')}
              icon={<ArrowLeft className="h-4 w-4" />}
              label="Voltar para lista de clientes"
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleEditClient = () => {
    toast({
      title: 'Editar cliente',
      description: `Editando informações de ${client.name}`,
    });
  };

  const handleBackToList = () => {
    navigate('/admin/clients');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ButtonEffect
            onClick={handleBackToList}
            icon={<ArrowLeft className="h-4 w-4" />}
            label="Voltar"
            variant="outline"
          />
          <h1 className="text-2xl font-bold">Detalhes do Cliente</h1>
        </div>
        <div className="flex items-center gap-2">
          <ClientActiveToggle client={client} showDetails={true} />
          <ButtonEffect
            onClick={handleEditClient}
            icon={<Edit className="h-4 w-4" />}
            label="Editar"
            variant="outline"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold">{client.name}</CardTitle>
              <CardDescription>
                <span className="flex items-center gap-1 mt-1">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  {client.cnpj}
                </span>
              </CardDescription>
            </div>
            <Badge 
              className={
                client.status === 'ACTIVE'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              }
            >
              {client.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">
                <FileText className="h-4 w-4 mr-2" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="tax-credits">
                <FileCheck className="h-4 w-4 mr-2" />
                Créditos Tributários
              </TabsTrigger>
              <TabsTrigger value="users">
                <User className="h-4 w-4 mr-2" />
                Usuários
              </TabsTrigger>
              <TabsTrigger value="audits">
                <Shield className="h-4 w-4 mr-2" />
                Auditorias
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações Gerais</h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Segmento:</span> {client.segment}
                    </p>
                    <p className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Tipo:</span> {client.type === 'private' ? 'Privado' : 'Público'}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Data de cadastro:</span> {new Date(client.createdAt).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Última atualização:</span> {new Date(client.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações de Contato</h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Contato:</span> {client.contactName}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Email:</span> {client.contactEmail}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Telefone:</span> {client.contactPhone}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Endereço:</span> {client.address}, {client.city}/{client.state}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />
              
              <ClientOperationsAccess client={client} />
            </TabsContent>
            
            <TabsContent value="tax-credits">
              <div className="p-6 text-center border border-dashed rounded-md">
                <h3 className="text-lg font-medium mb-2">Créditos Tributários</h3>
                <p className="text-muted-foreground">
                  Visualize os créditos tributários deste cliente.
                  Esta função será implementada em breve.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="users">
              <div className="p-6 text-center border border-dashed rounded-md">
                <h3 className="text-lg font-medium mb-2">Usuários do Cliente</h3>
                <p className="text-muted-foreground">
                  Gerencie os usuários vinculados a este cliente.
                  Esta função será implementada em breve.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="audits">
              <div className="p-6 text-center border border-dashed rounded-md">
                <h3 className="text-lg font-medium mb-2">Auditorias</h3>
                <p className="text-muted-foreground">
                  Visualize o histórico de auditorias deste cliente.
                  Esta função será implementada em breve.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetailView;
