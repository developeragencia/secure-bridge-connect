
import React from 'react';
import { AuditAction } from '../types';
import { getActionBadge } from '../utils';

interface AuditActionBadgeProps {
  action: AuditAction;
}

const AuditActionBadge: React.FC<AuditActionBadgeProps> = ({ action }) => {
  const { label, className } = getActionBadge(action);
  
  return (
    <span className={className}>
      {label}
    </span>
  );
};

export default AuditActionBadge;
