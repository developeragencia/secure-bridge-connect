
import React from 'react';
import { Download, FileText, Table, FileSpreadsheet } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface ExportOptionsMenuProps {
  onExport: (format: string) => void;
}

const ExportOptionsMenu: React.FC<ExportOptionsMenuProps> = ({ onExport }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Formato de Exportação</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onExport('pdf')}>
          <FileText className="mr-2 h-4 w-4" />
          <span>PDF</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onExport('excel')}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          <span>Excel</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onExport('csv')}>
          <Table className="mr-2 h-4 w-4" />
          <span>CSV</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportOptionsMenu;
