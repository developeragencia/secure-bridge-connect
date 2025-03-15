
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, RefreshCw, Settings, FileDown, FileUp } from 'lucide-react';
import { toast } from 'sonner';
import ClientsTable from './components/ClientsTable';
import ClientsFilters from './components/ClientsFilters';
import ClientForm from './components/ClientForm';
import { useClientStore } from '@/hooks/useClientStore';
import { Client } from '@/types/client';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import ClientConfigDialog from './components/ClientConfigDialog';
import ExportOptionsMenu from '@/components/admin/tax-reports/components/ExportOptionsMenu';

const ClientsManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const { allClients, addClient, updateClient, removeClient, setActiveClient } = useClientStore();
  
  const filteredClients = allClients.filter(client => {
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
    setSelectedClient(null);
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  const handleViewClientDetails = (clientId: string) => {
    const client = allClients.find(c => c.id === clientId);
    if (client) {
      setSelectedClient(client);
      toast.info('Visualizando detalhes', {
        description: `Detalhes do cliente ${client.name}`,
      });
    }
  };
  
  const handleEditClient = (clientId: string) => {
    const client = allClients.find(c => c.id === clientId);
    if (client) {
      setSelectedClient(client);
      setIsEditMode(true);
      setIsFormOpen(true);
    }
  };
  
  const handleDeleteClient = (clientId: string) => {
    const client = allClients.find(c => c.id === clientId);
    if (client) {
      removeClient(client.id);
      toast.success('Cliente removido com sucesso', {
        description: `O cliente ${client.name} foi excluído.`
      });
    }
  };
  
  const handleSetActiveClient = (clientId: string) => {
    const client = allClients.find(c => c.id === clientId);
    if (client) {
      setActiveClient(client);
    }
  };

  const handleSaveClient = (clientData: Partial<Client>) => {
    if (isEditMode && selectedClient) {
      updateClient(selectedClient.id, clientData);
      toast.success('Cliente atualizado com sucesso');
    } else {
      const newClient: Client = {
        id: Date.now().toString(),
        name: clientData.name || '',
        documentNumber: clientData.documentNumber || '',
        cnpj: clientData.documentNumber || '',
        email: clientData.email || '',
        phone: clientData.phone || '',
        address: clientData.address || '',
        city: clientData.city || '',
        state: clientData.state || '',
        contactName: clientData.contactName || '',
        contactEmail: clientData.contactEmail || '',
        contactPhone: clientData.contactPhone || '',
        segment: clientData.segment || '',
        type: clientData.type || 'private',
        status: clientData.status || 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      addClient(newClient);
      toast.success('Cliente adicionado com sucesso');
    }
    
    setIsFormOpen(false);
  };
  
  const handleOpenConfig = () => {
    setIsConfigOpen(true);
  };
  
  const handleExportData = (format: string) => {
    toast.success('Exportando dados', {
      description: `Os dados estão sendo exportados no formato ${format.toUpperCase()}`
    });
  };
  
  const handleImportData = () => {
    toast.info('Importar dados', {
      description: 'Selecione um arquivo para importar clientes'
    });
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
          <ExportOptionsMenu onExport={handleExportData} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Opções</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleImportData}>
                <FileUp className="mr-2 h-4 w-4" />
                Importar Clientes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleOpenConfig}>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
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
          onEditClient={handleEditClient}
          onDeleteClient={handleDeleteClient}
          onSetActiveClient={handleSetActiveClient}
        />
      </Card>

      <ClientForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveClient}
        initialData={selectedClient}
        isEdit={isEditMode}
      />
      
      <ClientConfigDialog
        open={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
      />
    </div>
  );
};

export default ClientsManagement;
