
import React from 'react';
import { Input } from '@/components/ui/input';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface AuditFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: string | undefined;
  setFilterStatus: (status: string) => void;
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
          placeholder="Buscar por cliente, tipo, responsável..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>{filterStatus ? getStatusLabel(filterStatus) : "Filtrar status"}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
            <SelectItem value="PENDENTE">Pendentes</SelectItem>
            <SelectItem value="CONCLUIDA">Concluídas</SelectItem>
            <SelectItem value="CANCELADA">Canceladas</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export function getStatusLabel(status: string): string {
  const statusLabels: Record<string, string> = {
    EM_ANDAMENTO: "Em Andamento",
    PENDENTE: "Pendente",
    CONCLUIDA: "Concluída",
    CANCELADA: "Cancelada"
  };
  return statusLabels[status] || status;
}

export default AuditFilters;
