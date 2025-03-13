
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';

const RecoveryHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <CardTitle>Processos de Recuperação</CardTitle>
        <CardDescription>
          Acompanhamento de processos de recuperação de créditos tributários
        </CardDescription>
      </div>
    </div>
  );
};

export default RecoveryHeader;
