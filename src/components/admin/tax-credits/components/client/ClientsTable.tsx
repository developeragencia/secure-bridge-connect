
import React from 'react';
import { Client } from '@/types/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, EyeIcon, MoreHorizontal, Trash } from 'lucide-react';
import ClientActiveToggle from '../../client/ClientActiveToggle';
import ButtonEffect from '../../common/ButtonEffect';

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
  onSetActiveClient,
}) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Status</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Segmento</TableHead>
            <TableHead className="w-[160px] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <Badge 
                    variant={client.status === 'ACTIVE' ? 'default' : 'secondary'}
                    className={client.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-500'}
                  >
                    {client.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.cnpj}</TableCell>
                <TableCell>{client.type === 'private' ? 'Privado' : 'Público'}</TableCell>
                <TableCell>{client.segment}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <ClientActiveToggle client={client} />
                    
                    <ButtonEffect
                      onClick={() => onViewClient(client)}
                      size="sm"
                      variant="outline"
                      icon={<EyeIcon className="h-3.5 w-3.5" />}
                      label="Ver"
                      tooltip="Ver detalhes do cliente"
                    />
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onEditClient(client)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onDeleteClient(client)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                Nenhum cliente encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientsTable;
