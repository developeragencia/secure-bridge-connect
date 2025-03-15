
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface IconRotatorProps {
  icons: React.ReactNode[];
  animationDisabled?: boolean;
  loading?: boolean;
  size: 'sm' | 'md' | 'lg';
}

const IconRotator: React.FC<IconRotatorProps> = ({
  icons,
  animationDisabled = false,
  loading = false,
  size,
}) => {
  const [activeIcon, setActiveIcon] = useState(0);
  const iconIntervalRef = useRef<number | null>(null);
  
  const iconSize = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  // Icon rotation effect with proper cleanup
  useEffect(() => {
    if (animationDisabled) return;
    
    // Use window.setTimeout instead of setTimeout to properly type the return value
    const interval = window.setTimeout(() => {
      setActiveIcon(prev => (prev + 1) % icons.length);
    }, loading ? 1000 : 2000); // Faster rotation when loading
    
    // Store the interval ID in a ref
    iconIntervalRef.current = interval;
    
    return () => {
      if (iconIntervalRef.current !== null) {
        window.clearTimeout(iconIntervalRef.current);
      }
    };
  }, [animationDisabled, icons.length, loading, activeIcon]); // Include activeIcon in deps

  return (
    <div className={cn("relative z-10", iconSize[size])}>
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
