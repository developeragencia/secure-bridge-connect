
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, RefreshCw } from 'lucide-react';

interface CreditHeaderProps {
  onRefresh: () => void;
  onCreateCredit: () => void;
  isListening?: boolean;
}

const CreditHeader: React.FC<CreditHeaderProps> = ({ 
  onRefresh, 
  onCreateCredit,
  isListening = false
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">Gestão de Créditos Tributários</h1>
        <p className="text-muted-foreground">
          Gerencie os créditos tributários dos seus clientes
          {isListening && <span className="ml-2 text-xs text-green-500">• Atualizações em tempo real ativas</span>}
        </p>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button 
          variant="default" 
          className="w-full sm:w-auto"
          onClick={onCreateCredit}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Crédito
        </Button>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto"
          onClick={onRefresh}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Atualizar
        </Button>
      </div>
    </div>
  );
};

export default CreditHeader;
