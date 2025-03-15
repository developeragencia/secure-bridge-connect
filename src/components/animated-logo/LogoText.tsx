
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoTextProps {
  size: 'sm' | 'md' | 'lg';
}

const LogoText: React.FC<LogoTextProps> = ({ size }) => {
  return (
    <div className="flex flex-col">
      <span className={cn(
        "font-bold text-foreground transition-all duration-300",
        size === 'sm' ? 'text-sm' : size === 'md' ? 'text-lg' : 'text-xl'
      )}>
        Sistemas
      </span>
      <span className={cn(
        "font-medium text-primary/90 transition-all duration-300",
        size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
      )}>
        Claudio Figueiredo
      </span>
    </div>
  );
};

export default React.memo(LogoText);
