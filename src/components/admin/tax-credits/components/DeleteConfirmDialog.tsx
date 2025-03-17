
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { TaxCredit } from '@/types/tax-credits';
import { useToast } from '@/components/ui/use-toast';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  credit: TaxCredit | null;
  onConfirm: (creditId: string) => void;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  onClose,
  credit,
  onConfirm,
}) => {
  const { toast } = useToast();
  
  const handleConfirm = () => {
    if (credit) {
      // Call the parent's delete handler with the credit ID
      onConfirm(credit.id);
      
      // Show confirmation toast
      toast({
        title: "Crédito excluído",
        description: `O crédito de ${credit.clientName} foi excluído com sucesso.`,
        variant: "destructive",
      });
      
      // Close the dialog
      onClose();
    }
  };

  if (!credit) return null;

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir crédito tributário</AlertDialogTitle>
          <AlertDialogDescription>
            Você está prestes a excluir o crédito tributário de <strong>{credit.clientName}</strong> no 
            valor de <strong>R$ {new Intl.NumberFormat('pt-BR').format(credit.creditAmount)}</strong>.
            <br /><br />
            Esta ação não pode ser desfeita. Deseja continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm} 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Sim, excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmDialog;
