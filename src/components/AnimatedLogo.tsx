
import React, { useEffect, useState, useRef } from 'react';
import { DollarSign, TrendingUp, BarChart4, Wallet, BadgePercent } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';

interface AnimatedLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animationDisabled?: boolean;
  hovering?: boolean;
  loading?: boolean;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  className,
  showText = true,
  size = 'md',
  animationDisabled = false,
  hovering = false,
  loading = false,
}) => {
  const [activeIcon, setActiveIcon] = useState(0);
  const [animationState, setAnimationState] = useState('normal');
  const [visible, setVisible] = useState(true);
  
  // Use a ref for stable reference across renders
  const previousHovering = useRef(hovering);
  
  // Use a stable reference for the scroll animation
  const { ref, classes } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    threshold: 0.1,
  });

  const icons = [
    <DollarSign key={0} className="text-primary" />,
    <TrendingUp key={1} className="text-primary" />,
    <BarChart4 key={2} className="text-primary" />,
    <Wallet key={3} className="text-primary" />,
    <BadgePercent key={4} className="text-primary" />,
  ];

  // Icon rotation effect with proper dependency array
  useEffect(() => {
    if (animationDisabled) return;
    
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % icons.length);
    }, loading ? 1000 : 2000); // Faster rotation when loading
    
    return () => clearInterval(interval);
  }, [animationDisabled, icons.length, loading]);

  // Handle hovering state changes with proper comparison to prevent infinite loops
  useEffect(() => {
    // Only run effect if hovering state actually changed
    if (hovering !== previousHovering.current) {
      previousHovering.current = hovering;
      
      if (hovering) {
        setAnimationState('fly');
        const timeout = setTimeout(() => {
          setAnimationState('return');
          setTimeout(() => {
            setAnimationState('normal');
          }, 1000);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }
  }, [hovering]);

  // Visibility animation with reduced frequency to improve performance
  useEffect(() => {
    // Don't do visibility animation when loading
    if (loading) return;
    
    // Use an immediate ref to avoid stale closures
    const visibleRef = useRef(visible);
    visibleRef.current = visible;
    
    const animate = () => {
      setVisible(false);
      setTimeout(() => setVisible(true), 500);
    };
    
    // Increase interval time to reduce CPU usage
    const intervalId = setInterval(animate, 60000); // Changed from 30s to 60s
    
    return () => clearInterval(intervalId);
  }, [loading]);

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
  };

  const iconSize = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

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
      ref={ref}
      className={cn(
        classes,
        "flex items-center gap-3",
        sizeClasses[size],
        className
      )}
    >
      <div 
        className={cn(
          "relative flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full p-2 shadow-lg border border-primary/20",
          getAnimationClass(),
          visible || loading ? "opacity-100 transition-opacity duration-500" : "opacity-0 transition-opacity duration-500"
        )}
        onMouseEnter={() => !hovering && !loading && setAnimationState('float')}
        onMouseLeave={() => !hovering && !loading && setAnimationState('normal')}
      >
        <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></div>
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
      </div>
      
      {showText && (
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
      )}
    </div>
  );
};

export default React.memo(AnimatedLogo);
