
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Printer, Download } from 'lucide-react';

interface ReportsHeaderProps {
  onExport?: () => void;
  onFilter?: () => void;
}

const ReportsHeader: React.FC<ReportsHeaderProps> = ({ 
  onExport, 
  onFilter 
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">Relatórios Detalhados</h2>
        <p className="text-muted-foreground">Gere relatórios personalizados para tributação e auditoria fiscal</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onFilter}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filtros Avançados
        </Button>
        <Button 
          variant="outline" 
          size="sm"
        >
          <Printer className="mr-2 h-4 w-4" />
          Imprimir
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onExport}
        >
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default ReportsHeader;
