
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';

const Hero: React.FC = () => {
  const { ref: titleRef, classes: titleClasses } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    threshold: 0.1,
  });

  const { ref: descRef, classes: descClasses } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    delay: 1,
    threshold: 0.1,
  });

  const { ref: ctaRef, classes: ctaClasses } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    delay: 2,
    threshold: 0.1,
  });

  const { ref: imageRef, classes: imageClasses } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in-right',
    delay: 3,
    threshold: 0.1,
  });

  return (
    <section className="pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-20 px-6 md:px-10 bg-gradient-to-b from-primary/5 to-background min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div ref={titleRef} className={titleClasses}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Recuperação de Créditos <span className="text-primary">IRRF/PJ</span> de Forma Inteligente
            </h1>
          </div>
          
          <div 
            ref={descRef}
            className={cn(
              descClasses,
              "text-lg md:text-xl text-foreground/70"
            )}
          >
            <p>
              Sistema automatizado para apuração e recuperação de créditos tributários, garantindo conformidade e otimizando sua gestão fiscal.
            </p>
          </div>
          
          <div 
            ref={ctaRef}
            className={cn(
              ctaClasses,
              "flex flex-col sm:flex-row gap-4 pt-4"
            )}
          >
            <Button size="lg" asChild>
              <Link to="/sistemas">
                Acessar Sistemas
              </Link>
            </Button>
          </div>
        </div>
        
        <div 
          ref={imageRef}
          className={cn(
            imageClasses,
            "relative"
          )}
        >
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/30 to-primary/10 blur-xl opacity-70 animate-subtle-pulse"></div>
            <div className="relative glass-card rounded-3xl p-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/40 via-primary to-primary/40"></div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full p-2 shadow-lg border border-primary/20 h-8">
                    <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></div>
                    <DollarSign className="text-primary h-6 w-6 relative z-10" />
                  </div>
                  <span className="font-semibold">Dashboard Fiscal</span>
                </div>
                <div className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
                  Atualizado
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="h-2.5 bg-primary/10 rounded-full w-full animate-pulse"></div>
                <div className="flex gap-2">
                  <div className="h-10 bg-primary/5 rounded-md w-1/3 animate-pulse delay-100"></div>
                  <div className="h-10 bg-primary/5 rounded-md w-1/3 animate-pulse delay-200"></div>
                  <div className="h-10 bg-primary/5 rounded-md w-1/3 animate-pulse delay-300"></div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="h-28 bg-primary/5 rounded-lg animate-float"></div>
                  <div className="h-28 bg-primary/5 rounded-lg animate-float delay-200"></div>
                </div>
                <div className="h-2.5 bg-primary/10 rounded-full w-2/3 animate-pulse delay-300"></div>
                <div className="h-2.5 bg-primary/10 rounded-full w-3/4 animate-pulse delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
