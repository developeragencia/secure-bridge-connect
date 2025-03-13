
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Printer } from 'lucide-react';

const ReportsHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">Relatórios Detalhados</h2>
        <p className="text-muted-foreground">Gere relatórios personalizados para tributação e auditoria fiscal</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filtros Avançados
        </Button>
        <Button variant="outline" size="sm">
          <Printer className="mr-2 h-4 w-4" />
          Imprimir
        </Button>
      </div>
    </div>
  );
};

export default ReportsHeader;
