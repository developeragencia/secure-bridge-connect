
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  Filter, 
  BarChart,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

interface ReportsHeaderProps {
  onExport?: (format: string) => void;
  onFilter?: () => void;
  onGenerateReport?: () => void;
  onRefresh?: () => void;
}

const ReportsHeader: React.FC<ReportsHeaderProps> = ({
  onExport = () => {},
  onFilter = () => {},
  onGenerateReport,
  onRefresh = () => {}
}) => {
  const handleRefresh = () => {
    toast("Atualizando dados", {
      description: "Os dados estão sendo atualizados"
    });
    onRefresh();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Relatórios e Dossiês Tributários</h2>
        <p className="text-muted-foreground">
          Gerencie relatórios, análises e comprovantes de retenção fiscal
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {onGenerateReport && (
          <Button onClick={onGenerateReport}>
            <FileText className="mr-2 h-4 w-4" />
            Gerar Relatório
          </Button>
        )}
        
        <Button variant="outline" onClick={() => onExport('pdf')}>
          <Download className="mr-2 h-4 w-4" />
          Exportar PDF
        </Button>
        
        <Button variant="outline" onClick={onFilter}>
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
        
        <Button variant="outline" size="icon" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ReportsHeader;
