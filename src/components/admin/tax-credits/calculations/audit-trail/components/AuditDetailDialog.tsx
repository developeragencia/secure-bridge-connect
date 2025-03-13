
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { AuditTrail } from '../types';
import { formatDate } from '../utils';
import AuditActionBadge from './AuditActionBadge';
import StatusBadge from '@/components/admin/tax-credits/components/StatusBadge';

interface AuditDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  auditData: AuditTrail | null;
}

const AuditDetailDialog: React.FC<AuditDetailDialogProps> = ({ 
  open, 
  onOpenChange, 
  auditData 
}) => {
  if (!auditData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes da Auditoria</DialogTitle>
          <DialogDescription>
            Informações detalhadas do registro de auditoria
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-y-2">
            <div className="text-sm font-medium">Data/Hora:</div>
            <div className="text-sm">{formatDate(auditData.date)}</div>
            
            <div className="text-sm font-medium">Usuário:</div>
            <div className="text-sm">{auditData.userName}</div>
            
            <div className="text-sm font-medium">Cargo:</div>
            <div className="text-sm">{auditData.userRole}</div>
            
            <div className="text-sm font-medium">Endereço IP:</div>
            <div className="text-sm">{auditData.ipAddress}</div>
            
            <div className="text-sm font-medium">Ação:</div>
            <div className="text-sm">
              <AuditActionBadge action={auditData.action} />
            </div>
            
            <div className="text-sm font-medium">Recurso:</div>
            <div className="text-sm">{auditData.resourceName}</div>
            
            <div className="text-sm font-medium">ID do Recurso:</div>
            <div className="text-sm">{auditData.resourceId}</div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Detalhes da Ação:</div>
            <div className="text-sm p-2 bg-muted rounded-md">
              {auditData.details}
            </div>
          </div>
          
          {auditData.action === 'status_change' && auditData.previousStatus && auditData.newStatus && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-1">Status Anterior:</div>
                <StatusBadge status={auditData.previousStatus} />
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Novo Status:</div>
                <StatusBadge status={auditData.newStatus} />
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuditDetailDialog;
