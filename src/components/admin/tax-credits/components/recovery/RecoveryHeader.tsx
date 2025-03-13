
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface RecoveryHeaderProps {
  onNewProcess?: () => void;
}

const RecoveryHeader: React.FC<RecoveryHeaderProps> = ({ onNewProcess }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <CardTitle>Processos de Recuperação</CardTitle>
        <CardDescription>
          Acompanhamento de processos de recuperação de créditos tributários
        </CardDescription>
      </div>
      {onNewProcess && (
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={onNewProcess}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Processo
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecoveryHeader;
