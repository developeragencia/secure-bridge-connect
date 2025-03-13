
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface AuditHeaderProps {
  onCreateAudit: () => void;
}

const AuditHeader: React.FC<AuditHeaderProps> = ({ onCreateAudit }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <CardTitle>Auditorias Fiscais</CardTitle>
        <CardDescription>
          Gestão de processos de auditoria para recuperação de créditos
        </CardDescription>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={onCreateAudit}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Auditoria
        </Button>
      </div>
    </div>
  );
};

export default AuditHeader;
