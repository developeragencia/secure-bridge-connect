
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { DollarSign, TrendingUp, BarChart4, Wallet, BadgePercent } from 'lucide-react';

interface IconRotatorProps {
  className?: string;
  color?: string;
}

const IconRotator: React.FC<IconRotatorProps> = ({
  className,
  color,
}) => {
  const [activeIcon, setActiveIcon] = useState(0);
  const iconIntervalRef = useRef<number | null>(null);
  
  // Default icons with color prop applied
  const icons = [
    <DollarSign key={0} className={color || "text-primary"} />,
    <TrendingUp key={1} className={color || "text-primary"} />,
    <BarChart4 key={2} className={color || "text-primary"} />,
    <Wallet key={3} className={color || "text-primary"} />,
    <BadgePercent key={4} className={color || "text-primary"} />,
  ];

  // Icon rotation effect with proper cleanup
  useEffect(() => {
    // Use window.setTimeout instead of setTimeout to properly type the return value
    const interval = window.setTimeout(() => {
      setActiveIcon(prev => (prev + 1) % icons.length);
    }, 2000);
    
    // Store the interval ID in a ref
    iconIntervalRef.current = interval;
    
    return () => {
      if (iconIntervalRef.current !== null) {
        window.clearTimeout(iconIntervalRef.current);
      }
    };
  }, [activeIcon]); // Include activeIcon in deps

  return (
    <div className={cn("relative z-10", className)}>
      {icons.map((icon, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all duration-500 ease-in-out",
            activeIcon === index
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-75 rotate-12"
          )}
        >
          {icon}
        </div>
      ))}
    </div>
  );
};

export default React.memo(IconRotator);
