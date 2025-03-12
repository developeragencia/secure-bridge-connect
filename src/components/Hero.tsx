
import React from 'react';
import { Button } from "@/components/ui/button";
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const { ref: heroTitleRef, classes: heroTitleClasses } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    threshold: 0.1,
  });

  const { ref: heroSubtitleRef, classes: heroSubtitleClasses } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    threshold: 0.1,
    delay: 1,
  });

  const { ref: heroButtonsRef, classes: heroButtonsClasses } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    threshold: 0.1,
    delay: 2,
  });

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 px-6 md:px-10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 pointer-events-none"></div>
      
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-dots-pattern"></div>
      </div>
      
      <div className="max-w-7xl w-full mx-auto text-center z-10">
        <div 
          ref={heroTitleRef}
          className={cn(
            heroTitleClasses,
            "mb-6"
          )}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Sistema de Recuperação de Créditos IRRF/PJ
          </h1>
        </div>
        
        <div 
          ref={heroSubtitleRef}
          className={cn(
            heroSubtitleClasses,
            "mb-8"
          )}
        >
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
            Automatize a apuração e recuperação de créditos tributários com nosso sistema completo, garantindo conformidade com a legislação vigente e otimizando o processo de auditoria fiscal.
          </p>
        </div>
        
        <div 
          ref={heroButtonsRef}
          className={cn(
            heroButtonsClasses,
            "flex flex-col sm:flex-row gap-4 justify-center"
          )}
        >
          <Button size="lg" className="shadow-lg hover:shadow-xl hover:shadow-primary/20">
            Iniciar Demonstração
          </Button>
          <Button variant="outline" size="lg">
            Conheça Nossos Planos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
