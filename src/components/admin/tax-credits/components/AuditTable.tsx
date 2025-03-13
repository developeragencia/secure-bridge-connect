
import React from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { Audit } from '@/types/audit';
import { getStatusLabel } from './AuditFilters';

interface AuditTableProps {
  audits: Audit[];
  onDownloadDocuments: (auditId: string) => void;
  onViewDetails: (auditId: string) => void;
  statusColors: Record<string, string>;
}

const AuditTable: React.FC<AuditTableProps> = ({ 
  audits, 
  onDownloadDocuments,
  onViewDetails,
  statusColors 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>CNPJ</TableHead>
          <TableHead>Tipo de Auditoria</TableHead>
          <TableHead>Início</TableHead>
          <TableHead>Prazo</TableHead>
          <TableHead>Responsável</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {audits.map((audit) => (
          <TableRow key={audit.id}>
            <TableCell className="font-medium">{audit.clientName}</TableCell>
            <TableCell>{audit.documentNumber}</TableCell>
            <TableCell>{audit.auditType}</TableCell>
            <TableCell>{formatDate(audit.startDate)}</TableCell>
            <TableCell>{formatDate(audit.deadline)}</TableCell>
            <TableCell>{audit.assignedTo}</TableCell>
            <TableCell>
              <Badge className={statusColors[audit.status]}>
                {getStatusLabel(audit.status)}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onDownloadDocuments(audit.id)}
                >
                  <Download className="mr-2 h-3 w-3" />
                  {audit.documentsCount} docs
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewDetails(audit.id)}
                >
                  <Eye className="mr-2 h-3 w-3" />
                  Detalhes
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AuditTable;
