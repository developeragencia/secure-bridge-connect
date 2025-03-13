
import React, { useState, useEffect } from 'react';
import { Building, X, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useActiveClient } from '@/hooks/useActiveClient';
import { Client } from '@/types/client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// Mock clients data - replace with API call in production
const mockClients: Client[] = [
  {
    id: '1',
    name: 'Prefeitura Municipal de São Paulo',
    cnpj: '12.345.678/0001-01',
    status: 'active',
    type: 'public',
    segment: 'Municipal',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
  },
  {
    id: '2',
    name: 'Secretaria Estadual de Educação',
    cnpj: '23.456.789/0001-02',
    status: 'active',
    type: 'public',
    segment: 'Estadual',
    createdAt: '2023-02-15',
    updatedAt: '2023-02-15',
  },
  {
    id: '3',
    name: 'Hospital Municipal Dr. João Silva',
    cnpj: '34.567.890/0001-03',
    status: 'inactive',
    type: 'public',
    segment: 'Saúde',
    createdAt: '2023-03-20',
    updatedAt: '2023-03-20',
  },
  {
    id: '4',
    name: 'Departamento de Infraestrutura',
    cnpj: '45.678.901/0001-04',
    status: 'pending',
    type: 'public',
    segment: 'Federal',
    createdAt: '2023-04-10',
    updatedAt: '2023-04-10',
  },
  {
    id: '5',
    name: 'Universidade Estadual',
    cnpj: '56.789.012/0001-05',
    status: 'active',
    type: 'public',
    segment: 'Educação',
    createdAt: '2023-05-05',
    updatedAt: '2023-05-05',
  },
];

const ActiveClientSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { activeClient, setActiveClient, clearActiveClient } = useActiveClient();
  const { toast } = useToast();

  const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cnpj.includes(searchTerm)
  );

  const handleSelectClient = (client: Client) => {
    setActiveClient(client);
    setIsOpen(false);
    toast({
      title: 'Cliente ativado',
      description: `${client.name} foi selecionado como cliente ativo.`,
    });
  };

  const handleClearClient = () => {
    clearActiveClient();
    toast({
      title: 'Cliente desativado',
      description: 'Nenhum cliente está ativo no momento.',
    });
  };

  return (
    <div className="flex items-center">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-8 gap-1 border-dashed",
              !activeClient && "text-muted-foreground"
            )}
          >
            <Building className="h-3.5 w-3.5" />
            {activeClient ? (
              <span className="max-w-[150px] truncate font-medium">
                {activeClient.name}
              </span>
            ) : (
              <span>Selecionar Cliente</span>
            )}
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <div className="p-3 border-b">
            <h4 className="font-medium text-sm mb-1.5">Selecionar Cliente Ativo</h4>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou CNPJ..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <div
                  key={client.id}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 hover:bg-accent cursor-pointer",
                    activeClient?.id === client.id && "bg-accent"
                  )}
                  onClick={() => handleSelectClient(client)}
                >
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{client.name}</p>
                    <p className="text-xs text-muted-foreground">{client.cnpj}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs",
                      client.status === 'active' && "bg-green-500/20 text-green-700 dark:text-green-300",
                      client.status === 'inactive' && "bg-amber-500/20 text-amber-700 dark:text-amber-300",
                      client.status === 'pending' && "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                    )}
                  >
                    {client.status === 'active' && 'Ativo'}
                    {client.status === 'inactive' && 'Inativo'}
                    {client.status === 'pending' && 'Pendente'}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="py-3 px-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Nenhum cliente encontrado
                </p>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {activeClient && (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 ml-1 text-muted-foreground"
          onClick={handleClearClient}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
};

export default ActiveClientSelector;
