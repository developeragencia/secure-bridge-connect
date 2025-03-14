
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Client } from '@/types/client';
import { useActiveClient } from '@/hooks/useActiveClient';
import { useNavigate } from 'react-router-dom';
import ClientSummaryCards from './components/client/ClientSummaryCards';
import ClientsTable from './components/client/ClientsTable';
import ClientHeader from './components/client/ClientHeader';
import { useClientData } from './hooks/useClientData';

const ClientManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { activeClient, setActiveClient } = useActiveClient();
  const { clients, filteredClients } = useClientData(searchQuery);
  
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
    // Navigate to the client detail page with the client ID
    navigate(`/admin/client/${client.id}`);
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
  
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <ClientSummaryCards clients={clients} />
      
      {/* Clients Table */}
      <Card>
        <ClientHeader 
          onCreateClient={handleCreateClient}
          onExportData={handleExportData}
          onImportData={handleImportData}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <ClientsTable 
          filteredClients={filteredClients}
          clients={clients}
          activeClient={activeClient}
          onViewClient={handleViewClient}
          onEditClient={handleEditClient}
          onDeleteClient={handleDeleteClient}
          onSetActiveClient={handleSetActiveClient}
        />
      </Card>
    </div>
  );
};

export default ClientManagement;
