
import React from 'react';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AuditAction } from '../types';

interface AuditFiltersProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  actionFilter: string | null;
  onActionFilterChange: (value: string) => void;
  userFilter: string | null;
  onUserFilterChange: (value: string) => void;
  uniqueUsers: { id: string; name: string }[];
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
  // Action types for filter
  const actionTypes: { label: string; value: AuditAction | "all" }[] = [
    { label: "Todas Ações", value: "all" },
    { label: "Criação", value: "create" },
    { label: "Atualização", value: "update" },
    { label: "Exclusão", value: "delete" },
    { label: "Mudança de Status", value: "status_change" },
    { label: "Cálculo", value: "calculation" },
    { label: "Exportação", value: "export" },
    { label: "Importação", value: "import" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4">
      <div className="flex-1">
        <Input
          placeholder="Buscar nos logs de auditoria..."
          value={searchQuery}
          onChange={onSearchChange}
          className="w-full"
        />
      </div>
      
      <div className="flex-1 sm:max-w-[200px]">
        <Select
          value={actionFilter || "all"}
          onValueChange={onActionFilterChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tipo de Ação" />
          </SelectTrigger>
          <SelectContent>
            {actionTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 sm:max-w-[200px]">
        <Select
          value={userFilter || "all"}
          onValueChange={onUserFilterChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Usuário" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos Usuários</SelectItem>
            {uniqueUsers.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AuditFilters;
