
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import IconRotator from './IconRotator';

interface LogoContainerProps {
  icons: React.ReactNode[];
  size: 'sm' | 'md' | 'lg';
  animationDisabled?: boolean;
  hovering?: boolean;
  loading?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const LogoContainer: React.FC<LogoContainerProps> = ({
  icons,
  size,
  animationDisabled = false,
  hovering = false,
  loading = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [animationState, setAnimationState] = useState('normal');
  const previousHovering = useRef(hovering);

  // Handle hovering state changes with proper comparison
  useEffect(() => {
    // Only run effect if hovering state actually changed
    if (hovering !== previousHovering.current) {
      previousHovering.current = hovering;
      
      if (hovering) {
        setAnimationState('fly');
        const timeout = window.setTimeout(() => {
          setAnimationState('return');
          window.setTimeout(() => {
            setAnimationState('normal');
          }, 1000);
        }, 2000);
        return () => window.clearTimeout(timeout);
      }
    }
  }, [hovering]);

  // Memoized handler functions to prevent recreation on each render
  const handleMouseEnter = useCallback(() => {
    if (!hovering && !loading) {
      setAnimationState('float');
    }
  }, [hovering, loading]);

  const handleMouseLeave = useCallback(() => {
    if (!hovering && !loading) {
      setAnimationState('normal');
    }
  }, [hovering, loading]);

  const getAnimationClass = () => {
    if (loading) return 'animate-pulse';
    
    switch (animationState) {
      case 'fly':
        return 'animate-fly-to-dashboard';
      case 'return':
        return 'animate-return-from-dashboard';
      case 'float':
        return 'logo-float';
      default:
        return '';
    }
  };

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full p-2 shadow-lg border border-primary/20",
        getAnimationClass(),
        "opacity-100 transition-opacity duration-500"
      )}
      onMouseEnter={onMouseEnter || handleMouseEnter}
      onMouseLeave={onMouseLeave || handleMouseLeave}
    >
      <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></div>
      <IconRotator 
        icons={icons} 
        size={size} 
        animationDisabled={animationDisabled} 
        loading={loading}
      />
    </div>
  );
};

export default React.memo(LogoContainer);
