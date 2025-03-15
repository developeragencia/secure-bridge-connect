
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Download, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface CreditActionButtonsProps {
  creditId: string;
  onViewDetails: (id: string) => void;
  onDownload?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  showApproveReject?: boolean;
}

const CreditActionButtons: React.FC<CreditActionButtonsProps> = ({
  creditId,
  onViewDetails,
  onDownload,
  onApprove,
  onReject,
  showApproveReject = false
}) => {
  const { toast } = useToast();
  
  const handleApprove = () => {
    if (onApprove) {
      onApprove(creditId);
    } else {
      toast({
        title: "Crédito aprovado",
        description: `O crédito ${creditId} foi aprovado com sucesso.`,
      });
    }
  };
  
  const handleReject = () => {
    if (onReject) {
      onReject(creditId);
    } else {
      toast({
        title: "Crédito rejeitado",
        description: `O crédito ${creditId} foi rejeitado.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-1">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8"
        onClick={() => onViewDetails(creditId)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      
      {onDownload && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => onDownload(creditId)}
        >
          <Download className="h-4 w-4" />
        </Button>
      )}
      
      {showApproveReject && (
        <>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
            onClick={handleApprove}
          >
            <CheckCircle className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleReject}
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};

export default CreditActionButtons;
