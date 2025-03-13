
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import StatusBadge from './StatusBadge';
import { TaxCredit } from '@/types/tax-credits';

interface StatusChangeDialogProps {
  open: boolean;
  onClose: () => void;
  credit: TaxCredit | null;
  onStatusChange: (creditId: string, newStatus: string, notes: string) => void;
}

const StatusChangeDialog: React.FC<StatusChangeDialogProps> = ({
  open,
  onClose,
  credit,
  onStatusChange,
}) => {
  const [newStatus, setNewStatus] = React.useState<string>('');
  const [notes, setNotes] = React.useState('');

  React.useEffect(() => {
    if (credit) {
      setNewStatus(credit.status);
    }
  }, [credit]);

  const handleSubmit = () => {
    if (credit && newStatus) {
      onStatusChange(credit.id, newStatus, notes);
      onClose();
    }
  };

  if (!credit) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Alterar Status do Crédito</DialogTitle>
          <DialogDescription>
            Atualize o status do crédito tributário e adicione uma observação.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Cliente</p>
            <p>{credit.clientName}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Crédito</p>
            <p>{credit.creditType} - R$ {new Intl.NumberFormat('pt-BR').format(credit.creditAmount)}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Status atual</p>
            <StatusBadge status={credit.status} />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Novo status</p>
            <Select
              value={newStatus}
              onValueChange={setNewStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o novo status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="ANALYZING">Em análise</SelectItem>
                <SelectItem value="APPROVED">Aprovado</SelectItem>
                <SelectItem value="REJECTED">Rejeitado</SelectItem>
                <SelectItem value="RECOVERED">Recuperado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Observações</p>
            <Textarea
              placeholder="Adicione uma observação sobre esta alteração de status..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Atualizar status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatusChangeDialog;
