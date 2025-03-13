
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import ClientsTable from './components/ClientsTable';
import ClientsFilters from './components/ClientsFilters';
import ClientForm from './components/ClientForm';

const ClientsManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data for clients
  const mockClients = [
    {
      id: 'client-1',
      name: 'Empresa ABC Ltda',
      documentNumber: '12.345.678/0001-99',
      email: 'contato@empresaabc.com.br',
      phone: '(11) 3456-7890',
      address: 'Av. Paulista, 1000',
      contactPerson: 'João Silva',
      industry: 'Tecnologia',
      createdAt: '2023-01-15T10:00:00Z',
      updatedAt: '2023-06-20T14:30:00Z',
      status: 'ACTIVE' as const
    },
    {
      id: 'client-2',
      name: 'Indústrias XYZ S/A',
      documentNumber: '98.765.432/0001-10',
      email: 'contato@industriasxyz.com.br',
      phone: '(11) 2345-6789',
      address: 'Rua Augusta, 500',
      contactPerson: 'Maria Oliveira',
      industry: 'Manufatura',
      createdAt: '2022-09-10T09:00:00Z',
      updatedAt: '2023-05-12T11:20:00Z',
      status: 'ACTIVE' as const
    },
    {
      id: 'client-3',
      name: 'Comércio FastShop Ltda',
      documentNumber: '45.678.901/0001-23',
      email: 'contato@fastshop.com.br',
      phone: '(11) 4567-8901',
      address: 'Alameda Santos, 200',
      contactPerson: 'Carlos Pereira',
      industry: 'Varejo',
      createdAt: '2022-11-05T14:00:00Z',
      updatedAt: '2023-04-18T16:40:00Z',
      status: 'INACTIVE' as const
    }
  ];

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.documentNumber.includes(searchQuery);
    
    const matchesStatus = statusFilter ? client.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Dados atualizados com sucesso');
    }, 1000);
  };

  const handleCreateClient = () => {
    setIsFormOpen(true);
  };

  const handleViewClientDetails = (clientId: string) => {
    toast.info('Visualizando detalhes', {
      description: `Detalhes do cliente #${clientId}`,
    });
  };

  const handleSaveClient = (clientData: any) => {
    toast.success('Cliente salvo com sucesso');
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestão de Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie os clientes da sua empresa
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button 
            variant="default" 
            className="w-full sm:w-auto"
            onClick={handleCreateClient}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={handleRefresh}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </div>

      <ClientsFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <Card>
        <ClientsTable 
          clients={filteredClients} 
          isLoading={isLoading} 
          onViewDetails={handleViewClientDetails} 
        />
      </Card>

      <ClientForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveClient}
      />
    </div>
  );
};

export default ClientsManagement;
