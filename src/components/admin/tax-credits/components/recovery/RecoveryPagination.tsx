
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RecoveryPaginationProps {
  currentPage: number; // Added currentPage
  totalPages: number; // Added totalPages
  onPageChange: (page: number) => void; // Added onPageChange
}

const RecoveryPagination: React.FC<RecoveryPaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Página {currentPage} de {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Anterior
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage >= totalPages}
        >
          Próximo
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default RecoveryPagination;
