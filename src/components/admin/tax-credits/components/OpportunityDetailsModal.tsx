
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, CheckCircle, Clock, DollarSign, FileText, Info, UserCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface OpportunityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity?: {
    id: string;
    title: string;
    client: string;
    value: string;
    confidence: number;
    date: string;
    status: string;
  };
}

const OpportunityDetailsModal: React.FC<OpportunityDetailsModalProps> = ({
  isOpen,
  onClose,
  opportunity
}) => {
  if (!opportunity) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'disponível':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'em análise':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'aprovado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleInitiateRecovery = () => {
    onClose();
    // Here would go the logic to initiate the credit recovery process
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>{opportunity.title}</DialogTitle>
            <Badge variant="outline" className={getStatusColor(opportunity.status)}>
              {opportunity.status}
            </Badge>
          </div>
          <DialogDescription>
            Detalhes completos da oportunidade de crédito
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Cliente</p>
                <p className="text-sm">{opportunity.client}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Valor</p>
                <p className="text-sm font-bold">{opportunity.value}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Identificado em</p>
                <p className="text-sm">{opportunity.date}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Confiança</p>
                <p className="text-sm">{opportunity.confidence}%</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Descrição</p>
            </div>
            <p className="text-sm">
              Esta oportunidade de crédito foi identificada com base na análise de documentos fiscais da empresa.
              Recomendamos avançar com o processo de recuperação para garantir o ressarcimento deste valor.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Próximos passos</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm">1. Análise detalhada dos documentos</p>
              <p className="text-sm">2. Preparação do dossiê fiscal</p>
              <p className="text-sm">3. Submissão do pedido de ressarcimento</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Documentos relacionados</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm">• Declarações fiscais (3)</p>
              <p className="text-sm">• Notas fiscais (12)</p>
              <p className="text-sm">• Comprovantes de recolhimento (5)</p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Fechar
          </Button>
          <Button type="button" onClick={handleInitiateRecovery} className="flex-1">
            Iniciar Recuperação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OpportunityDetailsModal;
