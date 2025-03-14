
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, CheckCircle, FileText } from 'lucide-react';
import { RecoveryProcess } from '@/types/recovery';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  const actionButtons = [
    {
      icon: <FileText className="h-4 w-4" />,
      tooltip: "Ver detalhes",
      action: () => onViewDetails(process.id),
      ariaLabel: "Ver detalhes"
    },
    {
      icon: <Edit className="h-4 w-4" />,
      tooltip: "Editar processo",
      action: () => onEdit(process.id),
      ariaLabel: "Editar"
    },
    {
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      tooltip: "Aprovar processo",
      action: () => onApprove(process.id),
      ariaLabel: "Aprovar"
    },
    {
      icon: <Trash2 className="h-4 w-4 text-red-500" />,
      tooltip: "Excluir processo",
      action: () => onDelete(process.id),
      ariaLabel: "Excluir"
    }
  ];

  return (
    <div className="flex space-x-2">
      <TooltipProvider>
        {actionButtons.map((button, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-primary/10 transition-colors duration-300"
                  onClick={button.action}
                >
                  {button.icon}
                  <span className="sr-only">{button.ariaLabel}</span>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{button.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default RecoveryActionButtons;
