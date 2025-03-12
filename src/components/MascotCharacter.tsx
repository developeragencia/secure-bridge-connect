
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
          "relative w-20 h-24 flex items-center justify-center", 
          {
            'animate-bounce': animation === 'dance',
            'animate-pulse': animation === 'point',
            'animate-float': animation === 'wave',
          }
        )}
      >
        {/* Completely redesigned human cartoon character */}
        <div className="relative">
          {/* Head */}
          <div className="w-12 h-12 bg-amber-200 rounded-full relative z-20">
            {/* Hair */}
            <div className="absolute -top-2 left-0 right-0 h-6 bg-amber-800 rounded-t-full"></div>
            
            {/* Eyes */}
            <div className="absolute top-4 left-2 w-2 h-3 bg-white rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
            </div>
            <div className="absolute top-4 right-2 w-2 h-3 bg-white rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
            </div>
            
            {/* Eyebrows */}
            <div className={cn(
              "absolute top-3 left-2 w-2 h-0.5 bg-amber-800 rounded-full transform -rotate-15",
              animation === 'point' ? "-translate-y-0.5" : ""
            )}></div>
            <div className={cn(
              "absolute top-3 right-2 w-2 h-0.5 bg-amber-800 rounded-full transform rotate-15",
              animation === 'point' ? "-translate-y-0.5" : ""
            )}></div>
            
            {/* Nose */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1.5 h-2 bg-amber-300 rounded-full"></div>
            
            {/* Mouth */}
            <div className={cn(
              "absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-rose-500 rounded-full",
              animation === 'dance' ? "w-6 h-1.5 rounded-t-full" : 
              animation === 'wave' ? "w-4 h-2" : 
              "w-3 h-1"
            )}></div>
          </div>
          
          {/* Neck */}
          <div className="w-4 h-2 bg-amber-200 absolute top-12 left-4 z-10"></div>
          
          {/* Body */}
          <div className="w-14 h-16 bg-blue-600 rounded-t-lg absolute top-14 left-[-1px] z-0 flex items-center justify-center">
            {/* Shirt details */}
            <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-2"></div>
            
            {/* Belt */}
            <div className="w-14 h-2 bg-slate-800 absolute bottom-0"></div>
          </div>
          
          {/* Arms */}
          <div className={cn(
            "w-3 h-10 bg-blue-600 rounded-full absolute top-15 left-[-2px] z-10",
            animation === 'dance' ? "transform -rotate-45 origin-top animate-wave" : 
            animation === 'point' ? "transform -rotate-45 origin-top" : 
            "transform -rotate-15 origin-top"
          )}>
            {/* Hand */}
            <div className="w-3.5 h-3.5 bg-amber-200 rounded-full absolute bottom-[-1px]"></div>
          </div>
          
          <div className={cn(
            "w-3 h-10 bg-blue-600 rounded-full absolute top-15 right-[-2px] z-10",
            animation === 'dance' ? "transform rotate-45 origin-top animate-wave" : 
            animation === 'point' ? "transform rotate-45 origin-top" : 
            "transform rotate-15 origin-top"
          )}>
            {/* Hand */}
            <div className="w-3.5 h-3.5 bg-amber-200 rounded-full absolute bottom-[-1px]"></div>
          </div>
          
          {/* Legs */}
          <div className="w-4 h-10 bg-slate-700 rounded-full absolute bottom-[-10px] left-3 z-0">
            {/* Shoe */}
            <div className="w-5 h-2 bg-slate-900 rounded-lg absolute bottom-[-1px] left-[-0.5px]"></div>
          </div>
          
          <div className="w-4 h-10 bg-slate-700 rounded-full absolute bottom-[-10px] right-3 z-0">
            {/* Shoe */}
            <div className="w-5 h-2 bg-slate-900 rounded-lg absolute bottom-[-1px] right-[-0.5px]"></div>
          </div>
        </div>
      </div>
      
      {/* Speech bubble */}
      {(animation === 'point' || animation === 'wave') && (
        <div className="absolute -top-12 left-16 bg-white px-3 py-1.5 rounded-lg text-xs font-medium text-primary shadow-md animate-fade-in">
          {animation === 'point' ? "Clique aqui!" : "Olá!"}
          <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 border-8 border-transparent border-r-white"></div>
        </div>
      )}
      
      {/* Name tag */}
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
