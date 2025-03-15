
import React, { useRef } from 'react';
import { DollarSign, TrendingUp, BarChart4, Wallet, BadgePercent } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';
import LogoContainer from './LogoContainer';
import LogoText from './LogoText';

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
  // Static icons array - defined once for all instances
  const icons = [
    <DollarSign key={0} className="text-primary" />,
    <TrendingUp key={1} className="text-primary" />,
    <BarChart4 key={2} className="text-primary" />,
    <Wallet key={3} className="text-primary" />,
    <BadgePercent key={4} className="text-primary" />,
  ];

  // Use a stable reference for the scroll animation
  const { ref, classes } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    threshold: 0.1,
  });

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
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
      <LogoContainer 
        icons={icons}
        size={size}
        animationDisabled={animationDisabled}
        hovering={hovering}
        loading={loading}
      />
      
      {showText && <LogoText size={size} />}
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(AnimatedLogo);
