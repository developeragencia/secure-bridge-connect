
import React from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CardContent, CardFooter } from '@/components/ui/card';
import { 
  CheckCircle, Eye, Edit, Trash2
} from 'lucide-react';
import { Client } from '@/types/client';

interface ClientsTableProps {
  filteredClients: Client[];
  clients: Client[];
  activeClient: Client | null;
  onViewClient: (client: Client) => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (client: Client) => void;
  onSetActiveClient: (client: Client) => void;
}

const ClientsTable: React.FC<ClientsTableProps> = ({
  filteredClients,
  clients,
  activeClient,
  onViewClient,
  onEditClient,
  onDeleteClient,
  onSetActiveClient
}) => {
  return (
    <>
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
              <TableRow key={client.id} className="cursor-pointer" onClick={() => onViewClient(client)}>
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
                  <ClientActions 
                    client={client}
                    activeClientId={activeClient?.id}
                    onViewClient={onViewClient}
                    onEditClient={onEditClient}
                    onDeleteClient={onDeleteClient}
                    onSetActiveClient={onSetActiveClient}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <TableFooter 
        filteredClientsCount={filteredClients.length} 
        totalClientsCount={clients.length} 
      />
    </>
  );
};

interface ClientActionsProps {
  client: Client;
  activeClientId?: string;
  onViewClient: (client: Client) => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (client: Client) => void;
  onSetActiveClient: (client: Client) => void;
}

const ClientActions: React.FC<ClientActionsProps> = ({
  client,
  activeClientId,
  onViewClient,
  onEditClient,
  onDeleteClient,
  onSetActiveClient
}) => {
  return (
    <div className="flex justify-end gap-2">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onSetActiveClient(client);
        }}
        title="Definir como cliente ativo"
      >
        <CheckCircle className={`h-4 w-4 ${activeClientId === client.id ? 'text-primary' : ''}`} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onViewClient(client);
        }}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onEditClient(client);
        }}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClient(client);
        }}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
};

interface TableFooterProps {
  filteredClientsCount: number;
  totalClientsCount: number;
}

const TableFooter: React.FC<TableFooterProps> = ({
  filteredClientsCount,
  totalClientsCount
}) => {
  return (
    <CardFooter className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Mostrando {filteredClientsCount} de {totalClientsCount} clientes
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
  );
};

export default ClientsTable;
