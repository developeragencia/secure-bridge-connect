
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, CheckCircle, FileSearch, Download } from 'lucide-react';
import { Audit } from '@/types/audit';

interface AuditActionButtonsProps {
  audit: Audit;
  onViewDetails: (auditId: string) => void;
  onDownloadDocuments: (auditId: string) => void;
  onEdit: (auditId: string) => void;
  onDelete: (auditId: string) => void;
  onApprove: (auditId: string) => void;
}

const AuditActionButtons: React.FC<AuditActionButtonsProps> = ({ 
  audit, 
  onViewDetails,
  onDownloadDocuments,
  onEdit, 
  onDelete, 
  onApprove
}) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => onViewDetails(audit.id)}
        title="Ver detalhes"
      >
        <FileSearch className="h-4 w-4" />
        <span className="sr-only">Ver detalhes</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => onDownloadDocuments(audit.id)}
        title="Baixar documentos"
      >
        <Download className="h-4 w-4" />
        <span className="sr-only">Baixar documentos</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => onEdit(audit.id)}
        title="Editar auditoria"
      >
        <Edit className="h-4 w-4" />
        <span className="sr-only">Editar</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => onApprove(audit.id)}
        title="Aprovar auditoria"
      >
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span className="sr-only">Aprovar</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => onDelete(audit.id)}
        title="Excluir auditoria"
      >
        <Trash2 className="h-4 w-4 text-red-500" />
        <span className="sr-only">Excluir</span>
      </Button>
    </div>
  );
};

export default AuditActionButtons;
