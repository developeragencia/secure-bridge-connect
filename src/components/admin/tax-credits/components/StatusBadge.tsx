
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TaxCredit } from '@/types/tax-credits';

interface StatusBadgeProps {
  status: TaxCredit['status'];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    PENDING: { label: 'Pendente', variant: 'secondary' as const },
    ANALYZING: { label: 'Em Análise', variant: 'default' as const },
    APPROVED: { label: 'Aprovado', variant: 'default' as const },
    REJECTED: { label: 'Rejeitado', variant: 'destructive' as const },
    RECOVERED: { label: 'Recuperado', variant: 'default' as const },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={
      status === 'PENDING' ? 'bg-amber-500/20 text-amber-700 hover:bg-amber-500/30' :
      status === 'ANALYZING' ? 'bg-blue-500/20 text-blue-700 hover:bg-blue-500/30' :
      status === 'APPROVED' ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30' :
      status === 'REJECTED' ? 'bg-red-500/20 text-red-700 hover:bg-red-500/30' :
      'bg-purple-500/20 text-purple-700 hover:bg-purple-500/30'
    }>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
