
import React from 'react';
import { cn } from '@/lib/utils';

// Update to handle both lowercase and uppercase status values
type StatusType = 'approved' | 'pending' | 'rejected' | 'APPROVED' | 'PENDING' | 'REJECTED' | 'ANALYZING' | 'RECOVERED';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  // Normalize status to lowercase for internal processing
  const normalizedStatus = status.toLowerCase() as 'approved' | 'pending' | 'rejected' | 'analyzing' | 'recovered';
  
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
    analyzing: {
      label: 'Em Análise',
      classes: 'bg-blue-100 text-blue-800',
    },
    recovered: {
      label: 'Recuperado',
      classes: 'bg-purple-100 text-purple-800',
    },
  };

  // Default to pending if status is not recognized
  const { label, classes } = statusConfig[normalizedStatus] || statusConfig.pending;

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
