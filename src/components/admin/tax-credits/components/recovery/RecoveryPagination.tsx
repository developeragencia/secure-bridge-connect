
import React from 'react';
import { Button } from '@/components/ui/button';

interface RecoveryPaginationProps {
  totalItems: number;
  itemsShown: number;
}

const RecoveryPagination: React.FC<RecoveryPaginationProps> = ({ totalItems, itemsShown }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Mostrando {itemsShown} de {totalItems} processos
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled>
          Anterior
        </Button>
        <Button variant="outline" size="sm" disabled>
          Próximo
        </Button>
      </div>
    </div>
  );
};

export default RecoveryPagination;
