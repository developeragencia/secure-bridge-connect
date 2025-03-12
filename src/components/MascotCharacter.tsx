
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
        {/* Human cartoon character */}
        <div className="relative">
          {/* Head */}
          <div className="w-12 h-14 bg-orange-200 rounded-full relative z-10 flex items-center justify-center overflow-hidden">
            {/* Hair */}
            <div className="absolute top-0 left-0 right-0 h-5 bg-amber-700 rounded-t-full"></div>
            
            {/* Face */}
            <div className="flex flex-col items-center mt-4">
              {/* Eyes */}
              <div className="flex gap-3 mb-1">
                <div className="w-2 h-2.5 bg-slate-800 rounded-full">
                  <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-[0.35rem] left-[0.35rem]"></div>
                </div>
                <div className="w-2 h-2.5 bg-slate-800 rounded-full">
                  <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-[0.35rem] right-[0.35rem]"></div>
                </div>
              </div>
              
              {/* Eyebrows that move with animation */}
              <div className={cn(
                "flex gap-3 mb-1 absolute top-6",
                animation === 'point' ? "transform -translate-y-0.5" : ""
              )}>
                <div className="w-2 h-0.5 bg-amber-700 rounded-full transform -rotate-12"></div>
                <div className="w-2 h-0.5 bg-amber-700 rounded-full transform rotate-12"></div>
              </div>
              
              {/* Nose */}
              <div className="w-1.5 h-2 bg-orange-300 rounded-full"></div>
              
              {/* Mouth - changes with animation */}
              <div className={cn(
                "bg-rose-500 rounded-full mt-1",
                animation === 'dance' ? "w-6 h-1.5 rounded-t-full" : 
                animation === 'wave' ? "w-4 h-2 rounded-t-full" : 
                "w-3 h-1 rounded-full"
              )}></div>
            </div>
          </div>
          
          {/* Neck */}
          <div className="w-3 h-2 bg-orange-200 absolute top-14 left-4.5 z-0"></div>
          
          {/* Body with shirt */}
          <div className="w-14 h-10 bg-blue-500 rounded-t-lg absolute top-16 left-[-1px] z-0">
            {/* Shirt details */}
            <div className="absolute top-0 left-6 w-1 h-4 bg-blue-400"></div>
            <div className="absolute top-0 right-5 w-1 h-3 bg-blue-400"></div>
            
            {/* Tie or collar */}
            <div className="w-4 h-2 bg-red-500 absolute top-0 left-5 transform rotate-45 rounded-tr-md"></div>
          </div>
          
          {/* Arms - animated based on state */}
          <div className={cn(
            "w-2.5 h-8 bg-blue-500 rounded-full absolute top-16 left-[-2px]",
            animation === 'dance' ? "animate-[wave_1s_ease-in-out_infinite]" : 
            animation === 'point' ? "transform rotate-45 origin-top" : 
            "transform -rotate-12 origin-top"
          )}>
            {/* Hand */}
            <div className="w-3 h-3 bg-orange-200 rounded-full absolute bottom-[-2px] left-[-0.5px]"></div>
          </div>
          
          <div className={cn(
            "w-2.5 h-8 bg-blue-500 rounded-full absolute top-16 right-[-2px]",
            animation === 'dance' ? "animate-[wave_1s_ease-in-out_infinite_reverse]" : 
            animation === 'point' ? "transform -rotate-45 origin-top" : 
            "transform rotate-12 origin-top"
          )}>
            {/* Hand */}
            <div className="w-3 h-3 bg-orange-200 rounded-full absolute bottom-[-2px] right-[-0.5px]"></div>
          </div>
          
          {/* Legs - only visible when not sitting on menu */}
          {currentPosition !== 'menu' && (
            <>
              <div className="w-3 h-6 bg-gray-700 rounded-full absolute top-26 left-3">
                {/* Shoe */}
                <div className="w-4 h-2 bg-black rounded-full absolute bottom-[-1px] left-[-0.5px]"></div>
              </div>
              <div className="w-3 h-6 bg-gray-700 rounded-full absolute top-26 right-3">
                {/* Shoe */}
                <div className="w-4 h-2 bg-black rounded-full absolute bottom-[-1px] right-[-0.5px]"></div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Speech bubble that appears occasionally */}
      {(animation === 'point' || animation === 'wave') && (
        <div className="absolute -top-12 left-16 bg-white px-3 py-1.5 rounded-lg text-xs font-medium text-primary shadow-md animate-fade-in">
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
