
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
import { Client } from '@/types/tax-credits';
import { 
  Building, Users, PlusCircle, Search, FileDown, FileUp, 
  Settings, Eye, Edit, Trash2 
} from 'lucide-react';

const ClientManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for clients
  const clients: Client[] = [
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
      status: "ACTIVE"
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
      updatedAt: "2023-02-10T09:15:00Z",
      status: "ACTIVE"
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
      status: "INACTIVE"
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
      status: "ACTIVE"
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
      status: "ACTIVE"
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
  
  const handleViewClient = (clientId: string) => {
    toast({
      title: "Visualizar cliente",
      description: `Visualizando detalhes do cliente ID: ${clientId}`,
    });
  };
  
  const handleEditClient = (clientId: string) => {
    toast({
      title: "Editar cliente",
      description: `Editando cliente ID: ${clientId}`,
    });
  };
  
  const handleDeleteClient = (clientId: string) => {
    toast({
      title: "Excluir cliente",
      description: `Cliente ID: ${clientId} excluído com sucesso`,
      variant: "destructive",
    });
  };
  
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
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.documentNumber}</TableCell>
                  <TableCell>{client.contactPerson}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
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
                        onClick={() => handleViewClient(client.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditClient(client.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteClient(client.id)}
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
            Mostrando {clients.length} de {clients.length} clientes
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
