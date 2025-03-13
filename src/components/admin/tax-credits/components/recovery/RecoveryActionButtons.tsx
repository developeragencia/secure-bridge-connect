
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, CheckCircle, FileText } from 'lucide-react';
import { RecoveryProcess } from '@/types/recovery';

interface RecoveryActionButtonsProps {
  process: RecoveryProcess;
  onEdit: (processId: string) => void;
  onDelete: (processId: string) => void;
  onApprove: (processId: string) => void;
  onViewDetails: (processId: string) => void;
}

const RecoveryActionButtons: React.FC<RecoveryActionButtonsProps> = ({ 
  process, 
  onEdit, 
  onDelete, 
  onApprove,
  onViewDetails
}) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => onViewDetails(process.id)}
        title="Ver detalhes"
      >
        <FileText className="h-4 w-4" />
        <span className="sr-only">Ver detalhes</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => onEdit(process.id)}
        title="Editar processo"
      >
        <Edit className="h-4 w-4" />
        <span className="sr-only">Editar</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => onApprove(process.id)}
        title="Aprovar processo"
      >
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span className="sr-only">Aprovar</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => onDelete(process.id)}
        title="Excluir processo"
      >
        <Trash2 className="h-4 w-4 text-red-500" />
        <span className="sr-only">Excluir</span>
      </Button>
    </div>
  );
};

export default RecoveryActionButtons;
