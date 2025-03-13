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
import { useToast } from '@/components/ui/use-toast';
import { Client } from '@/types/client';
import { useActiveClient } from '@/hooks/useActiveClient';
import { useNavigate } from 'react-router-dom';
import { 
  Building, Users, PlusCircle, Search, FileDown, FileUp, 
  Settings, Eye, Edit, Trash2, CheckCircle 
} from 'lucide-react';

const ClientManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { activeClient, setActiveClient } = useActiveClient();
  
  // Mock data for clients
  const clients: Client[] = [
    {
      id: "1",
      name: "Empresa ABC Ltda",
      cnpj: "12.345.678/0001-90",
      documentNumber: "12.345.678/0001-90",
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
      email: "contato@empresaabc.com.br",
      phone: "(11) 3456-7890",
    },
    {
      id: "2",
      name: "Indústria XYZ S.A.",
      cnpj: "23.456.789/0001-10",
      documentNumber: "23.456.789/0001-10",
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
      email: "financeiro@industriaxyz.com.br",
      phone: "(11) 2345-6789",
    },
    {
      id: "3",
      name: "Comércio DEF Eireli",
      cnpj: "34.567.890/0001-21",
      documentNumber: "34.567.890/0001-21",
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
      email: "contato@comerciodef.com.br",
      phone: "(11) 4567-8901",
    },
    {
      id: "4",
      name: "Serviços GHI S.A.",
      cnpj: "45.678.901/0001-32",
      documentNumber: "45.678.901/0001-32",
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
      email: "atendimento@servicosghi.com.br",
      phone: "(11) 5678-9012",
    },
    {
      id: "5",
      name: "Transportes JKL Ltda",
      cnpj: "56.789.012/0001-43",
      documentNumber: "56.789.012/0001-43",
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
      email: "operacoes@transportesjkl.com.br",
      phone: "(11) 6789-0123",
    }
  ];
  
  const handleCreateClient = () => {
    toast({
      title: "Novo cliente",
      description: "Formulário de cadastro de cliente aberto",
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
  
  const handleViewClient = (client: Client) => {
    navigate(`/admin/client-${client.id}`);
  };
  
  const handleEditClient = (client: Client) => {
    toast({
      title: "Editar cliente",
      description: `Editando cliente: ${client.name}`,
    });
  };
  
  const handleDeleteClient = (client: Client) => {
    toast({
      variant: "destructive",
      title: "Excluir cliente",
      description: `Cliente ${client.name} excluído com sucesso`,
    });
  };
  
  const handleSetActiveClient = (client: Client) => {
    setActiveClient(client);
    toast({
      title: "Cliente ativo definido",
      description: `${client.name} definido como cliente ativo`,
    });
  };
  
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.cnpj.includes(searchQuery) ||
    (client.contactName && client.contactName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (client.contactEmail && client.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{clients.length}</div>
              <Building className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Clientes Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {clients.filter(c => c.status === "ACTIVE").length}
              </div>
              <Users className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Clientes Inativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {clients.filter(c => c.status === "INACTIVE").length}
              </div>
              <Users className="h-5 w-5 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Clients Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Gestão de Clientes</CardTitle>
              <CardDescription>
                Cadastro e gerenciamento de clientes para recuperação de créditos
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleCreateClient}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Cliente
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
                placeholder="Buscar por nome, CNPJ, contato..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id} className="cursor-pointer" onClick={() => handleViewClient(client)}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.cnpj}</TableCell>
                  <TableCell>{client.contactName}</TableCell>
                  <TableCell>{client.contactEmail}</TableCell>
                  <TableCell>{client.contactPhone}</TableCell>
                  <TableCell>
                    <Badge className={client.status === "ACTIVE" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }>
                      {client.status === "ACTIVE" ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetActiveClient(client);
                        }}
                        title="Definir como cliente ativo"
                      >
                        <CheckCircle className={`h-4 w-4 ${activeClient?.id === client.id ? 'text-primary' : ''}`} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewClient(client);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClient(client);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClient(client);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
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
            Mostrando {filteredClients.length} de {clients.length} clientes
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

export default ClientManagement;
