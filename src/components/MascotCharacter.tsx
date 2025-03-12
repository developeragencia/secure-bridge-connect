
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type MascotPosition = 'button' | 'menu' | 'hidden';

interface MascotCharacterProps {
  className?: string;
  position?: MascotPosition;
}

const MascotCharacter: React.FC<MascotCharacterProps> = ({ 
  className,
  position = 'button'
}) => {
  const [animation, setAnimation] = useState<'idle' | 'dance' | 'point' | 'wave'>('idle');
  const [currentPosition, setCurrentPosition] = useState<MascotPosition>(position);
  const [mascotName] = useState<string>(() => {
    const possibleNames = [
      "PixelBot",
      "ByteBuddy",
      "TechHelper",
      "CreditPal",
      "TaxWiz",
      "FiscalFriend"
    ];
    return possibleNames[Math.floor(Math.random() * possibleNames.length)];
  });

  // Cycle through animations
  useEffect(() => {
    if (currentPosition === 'hidden') return;
    
    const animations = ['idle', 'dance', 'point', 'wave'];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % animations.length;
      setAnimation(animations[currentIndex] as any);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [currentPosition]);

  // Occasionally change position
  useEffect(() => {
    const positionInterval = setInterval(() => {
      // 70% chance to stay at button, 20% chance to go to menu, 10% chance to hide temporarily
      const random = Math.random();
      if (random < 0.7) {
        setCurrentPosition('button');
      } else if (random < 0.9) {
        setCurrentPosition('menu');
      } else {
        setCurrentPosition('hidden');
        // Reappear after 3 seconds
        setTimeout(() => setCurrentPosition('button'), 3000);
      }
    }, 8000);
    
    return () => clearInterval(positionInterval);
  }, []);

  if (currentPosition === 'hidden') {
    return null;
  }

  return (
    <div 
      className={cn(
        "relative transition-all duration-1000",
        currentPosition === 'menu' ? "absolute top-0 right-10 transform -translate-y-full" : "",
        className
      )}
    >
      <div 
        className={cn(
          "relative w-16 h-16 flex items-center justify-center", 
          {
            'animate-bounce': animation === 'dance',
            'animate-pulse': animation === 'point',
            'animate-float': animation === 'wave',
          }
        )}
      >
        {/* Mascot character */}
        <div className="relative">
          {/* Head */}
          <div className="w-10 h-10 bg-primary rounded-full relative z-10 flex items-center justify-center">
            {/* Face */}
            <div className="flex flex-col items-center">
              {/* Eyes */}
              <div className="flex gap-2 mb-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              {/* Mouth - changes with animation */}
              <div className={cn(
                "bg-white rounded-full",
                animation === 'dance' ? "w-4 h-1.5 rounded-t-full" : "w-3 h-1"
              )}></div>
            </div>
          </div>
          
          {/* Body */}
          <div className="w-8 h-10 bg-primary/80 rounded-t-lg absolute top-8 left-1 z-0"></div>
          
          {/* Arms - animated based on state */}
          <div className={cn(
            "w-2 h-6 bg-primary/80 rounded-full absolute top-10 left-0",
            animation === 'dance' ? "animate-[wave_1s_ease-in-out_infinite]" : 
            animation === 'point' ? "transform rotate-45 origin-top" : 
            "transform -rotate-12 origin-top"
          )}></div>
          <div className={cn(
            "w-2 h-6 bg-primary/80 rounded-full absolute top-10 right-0",
            animation === 'dance' ? "animate-[wave_1s_ease-in-out_infinite_reverse]" : 
            animation === 'point' ? "transform -rotate-45 origin-top" : 
            "transform rotate-12 origin-top"
          )}></div>
          
          {/* Legs - only visible when not sitting on menu */}
          {currentPosition !== 'menu' && (
            <>
              <div className="w-2 h-4 bg-primary/80 rounded-full absolute top-16 left-2"></div>
              <div className="w-2 h-4 bg-primary/80 rounded-full absolute top-16 right-2"></div>
            </>
          )}
        </div>
      </div>
      
      {/* Speech bubble that appears occasionally */}
      {(animation === 'point' || animation === 'wave') && (
        <div className="absolute -top-12 left-12 bg-white px-3 py-1.5 rounded-lg text-xs font-medium text-primary shadow-md animate-fade-in">
          {animation === 'point' ? "Clique aqui!" : "Olá!"}
          <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 border-8 border-transparent border-r-white"></div>
        </div>
      )}
      
      {/* Custom animations for name reveal */}
      <div className={cn(
        "absolute -bottom-6 left-0 right-0 text-center text-xs font-bold text-primary transition-all duration-500",
        animation === 'idle' ? "opacity-100" : "opacity-0"
      )}>
        {mascotName}
      </div>
    </div>
  );
};

export default MascotCharacter;
