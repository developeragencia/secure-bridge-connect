
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Edit, Trash2 } from 'lucide-react';
import { Client } from '@/types/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ClientsTableProps {
  clients: Client[];
  isLoading: boolean;
  onViewDetails: (clientId: string) => void;
}

const ClientsTable: React.FC<ClientsTableProps> = ({ 
  clients, 
  isLoading, 
  onViewDetails 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left font-medium">Nome</th>
            <th className="py-3 px-4 text-left font-medium">CNPJ</th>
            <th className="py-3 px-4 text-left font-medium">Email</th>
            <th className="py-3 px-4 text-left font-medium">Telefone</th>
            <th className="py-3 px-4 text-left font-medium">Status</th>
            <th className="py-3 px-4 text-left font-medium">Criado em</th>
            <th className="py-3 px-4 text-left font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <tr key={`skeleton-${index}`} className="border-b">
                <td colSpan={7} className="py-4 px-4">
                  <div className="h-6 bg-secondary/50 rounded animate-pulse"></div>
                </td>
              </tr>
            ))
          ) : clients.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-4 px-4 text-center text-muted-foreground">
                Nenhum cliente encontrado.
              </td>
            </tr>
          ) : (
            clients.map((client) => (
              <tr key={client.id} className="border-b hover:bg-muted/50">
                <td className="py-3 px-4">{client.name}</td>
                <td className="py-3 px-4">{client.documentNumber}</td>
                <td className="py-3 px-4">{client.email}</td>
                <td className="py-3 px-4">{client.phone}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={client.status} />
                </td>
                <td className="py-3 px-4">
                  {format(new Date(client.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onViewDetails(client.id)}
                      title="Ver detalhes"
                    >
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Ver detalhes</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      title="Editar cliente"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      title="Excluir cliente"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// Status Badge component
const StatusBadge: React.FC<{ status: Client['status'] }> = ({ status }) => {
  const statusConfig = {
    ACTIVE: { label: 'Ativo', className: 'bg-green-500/20 text-green-700 hover:bg-green-500/30' },
    INACTIVE: { label: 'Inativo', className: 'bg-slate-500/20 text-slate-700 hover:bg-slate-500/30' }
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

export default ClientsTable;
