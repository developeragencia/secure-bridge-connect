
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';

export const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'EM_ANDAMENTO': return 'Em Andamento';
    case 'PENDENTE': return 'Pendente';
    case 'CONCLUIDA': return 'Concluída';
    case 'CANCELADA': return 'Cancelada';
    default: return status;
  }
};

interface AuditFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: string | undefined;
  setFilterStatus: (status: string | undefined) => void;
}

const AuditFilters: React.FC<AuditFiltersProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  filterStatus, 
  setFilterStatus 
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Buscar por cliente, tipo de auditoria..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        <Select value={filterStatus || "all"} onValueChange={value => setFilterStatus(value === "all" ? undefined : value)}>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>{filterStatus ? getStatusLabel(filterStatus) : "Todos os status"}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
            <SelectItem value="PENDENTE">Pendente</SelectItem>
            <SelectItem value="CONCLUIDA">Concluída</SelectItem>
            <SelectItem value="CANCELADA">Cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AuditFilters;
