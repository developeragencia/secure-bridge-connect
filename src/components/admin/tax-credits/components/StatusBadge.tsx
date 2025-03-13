
import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'approved' | 'pending' | 'rejected';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusConfig = {
    approved: {
      label: 'Aprovado',
      classes: 'bg-green-100 text-green-800',
    },
    pending: {
      label: 'Pendente',
      classes: 'bg-yellow-100 text-yellow-800',
    },
    rejected: {
      label: 'Rejeitado',
      classes: 'bg-red-100 text-red-800',
    },
  };

  const { label, classes } = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        classes,
        className
      )}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
