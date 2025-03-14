
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, FileDown, Printer, Share2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ReportActionButtonsProps {
  reportId: string;
  onViewReport: (reportId: string) => void;
  onDownloadReport: (reportId: string) => void;
  onPrintReport: (reportId: string) => void;
  onShareReport: (reportId: string) => void;
  onDeleteReport: (reportId: string) => void;
}

const ReportActionButtons: React.FC<ReportActionButtonsProps> = ({
  reportId,
  onViewReport,
  onDownloadReport,
  onPrintReport,
  onShareReport,
  onDeleteReport
}) => {
  return (
    <div className="flex space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onViewReport(reportId)}
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">Visualizar</span>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Visualizar relatório</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onDownloadReport(reportId)}
              >
                <FileDown className="h-4 w-4" />
                <span className="sr-only">Baixar</span>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Baixar relatório</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onPrintReport(reportId)}
              >
                <Printer className="h-4 w-4" />
                <span className="sr-only">Imprimir</span>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Imprimir relatório</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onShareReport(reportId)}
              >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Compartilhar</span>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Compartilhar relatório</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onDeleteReport(reportId)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
                <span className="sr-only">Excluir</span>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Excluir relatório</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ReportActionButtons;
