
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';

interface RecoveryFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: string | undefined;
  setFilterStatus: (status: string | undefined) => void;
  statusLabels: Record<string, string>;
}

const RecoveryFilters: React.FC<RecoveryFiltersProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  filterStatus, 
  setFilterStatus,
  statusLabels
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Buscar por cliente, processo, tipo..."
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
              <span>{filterStatus ? statusLabels[filterStatus] : "Todos os status"}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="INICIAL">Inicial</SelectItem>
            <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
            <SelectItem value="PARCIAL">Recuperação Parcial</SelectItem>
            <SelectItem value="CONCLUIDO">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default RecoveryFilters;
