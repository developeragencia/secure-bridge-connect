
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from "lucide-react";

interface FilterSidebarProps {
  isVisible: boolean;
  onClose: () => void;
  onClearFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  isVisible, 
  onClose,
  onClearFilters 
}) => {
  return (
    <div className={`fixed right-0 top-0 z-50 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Filtros Avançados</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
          </div>
        </div>
        
        <div className="p-4 overflow-y-auto flex-grow">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="filter-client">Cliente</Label>
              <Select>
                <SelectTrigger id="filter-client">
                  <SelectValue placeholder="Todos os clientes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os clientes</SelectItem>
                  <SelectItem value="client-1">Empresa A</SelectItem>
                  <SelectItem value="client-2">Empresa B</SelectItem>
                  <SelectItem value="client-3">Empresa C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="filter-tax-type">Tipo de Tributo</Label>
              <Select>
                <SelectTrigger id="filter-tax-type">
                  <SelectValue placeholder="Todos os tributos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tributos</SelectItem>
                  <SelectItem value="icms">ICMS</SelectItem>
                  <SelectItem value="ipi">IPI</SelectItem>
                  <SelectItem value="pis">PIS</SelectItem>
                  <SelectItem value="cofins">COFINS</SelectItem>
                  <SelectItem value="irrf">IRRF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="filter-date-start">Data Inicial</Label>
              <div className="relative">
                <Input 
                  id="filter-date-start" 
                  type="date" 
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="filter-date-end">Data Final</Label>
              <div className="relative">
                <Input 
                  id="filter-date-end" 
                  type="date"
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="filter-status">Status</Label>
              <Select>
                <SelectTrigger id="filter-status">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="processing">Em Processamento</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="error">Erro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="filter-format">Formato do Relatório</Label>
              <Select>
                <SelectTrigger id="filter-format">
                  <SelectValue placeholder="Todos os formatos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os formatos</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t mt-auto">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onClearFilters}
            >
              Limpar Filtros
            </Button>
            <Button className="flex-1">Aplicar Filtros</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
