
import React from 'react';
import { Input } from '@/components/ui/input';
import { Filter, Search, User } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface User {
  id: string;
  name: string;
}

interface AuditFiltersProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  actionFilter: string | null;
  onActionFilterChange: (value: string) => void;
  userFilter: string | null;
  onUserFilterChange: (value: string) => void;
  uniqueUsers: User[];
}

const AuditFilters: React.FC<AuditFiltersProps> = ({
  searchQuery,
  onSearchChange,
  actionFilter,
  onActionFilterChange,
  userFilter,
  onUserFilterChange,
  uniqueUsers,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por usuário, recurso ou detalhes..."
          className="pl-8"
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
      
      <Select
        value={actionFilter || ''}
        onValueChange={onActionFilterChange}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Filtrar por ação" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todas as ações</SelectItem>
          <SelectItem value="create">Criação</SelectItem>
          <SelectItem value="update">Atualização</SelectItem>
          <SelectItem value="delete">Exclusão</SelectItem>
          <SelectItem value="status_change">Mudança de Status</SelectItem>
          <SelectItem value="calculation">Cálculo</SelectItem>
          <SelectItem value="export">Exportação</SelectItem>
          <SelectItem value="import">Importação</SelectItem>
        </SelectContent>
      </Select>
      
      <Select
        value={userFilter || ''}
        onValueChange={onUserFilterChange}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <User className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Filtrar por usuário" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todos os usuários</SelectItem>
          {uniqueUsers.map(user => (
            <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AuditFilters;
