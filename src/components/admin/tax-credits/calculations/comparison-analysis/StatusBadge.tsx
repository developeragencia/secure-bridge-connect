
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ComparisonStatus } from './types';

interface StatusBadgeProps {
  status: ComparisonStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'recuperável':
      return <Badge className="bg-green-500">Recuperável</Badge>;
    case 'correto':
      return <Badge className="bg-blue-500">Correto</Badge>;
    case 'divergente':
      return <Badge className="bg-amber-500">Divergente</Badge>;
    default:
      return null;
  }
};

export default StatusBadge;
