
import React, { useEffect, useRef } from 'react';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';

const Hero: React.FC = () => {
  const { ref: titleRef, classes: titleClasses } = useAnimationOnScroll<HTMLHeadingElement>({
    transitionType: 'fade-in',
    threshold: 0.1,
  });
  
  const { ref: subtitleRef, classes: subtitleClasses } = useAnimationOnScroll<HTMLParagraphElement>({
    transitionType: 'fade-in',
    delay: 1,
    threshold: 0.1,
  });
  
  const { ref: ctaRef, classes: ctaClasses } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    delay: 2,
    threshold: 0.1,
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-10 py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-background -z-10"></div>
      
      {/* Abstract shapes */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl -z-10 animate-float"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-blue-200/10 blur-3xl -z-10 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-5xl mx-auto text-center">
        <div className="space-y-6">
          <div className="inline-block">
            <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              FastAPI + SQLModel + React
            </span>
          </div>
          
          <h1 
            ref={titleRef}
            className={cn(
              titleClasses,
              "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance"
            )}
          >
            Modern Backend Architecture <br className="hidden md:block" />
            <span className="text-primary">For Enterprise Solutions</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className={cn(
              subtitleClasses,
              "max-w-2xl mx-auto text-lg text-foreground/70 text-balance"
            )}
          >
            A premium tech stack combining FastAPI, SQLModel, PostgreSQL, React, and Chakra UI
            for secure, scalable, and high-performance applications.
          </p>
          
          <div 
            ref={ctaRef}
            className={cn(
              ctaClasses,
              "flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            )}
          >
            <a 
              href="#features" 
              className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:shadow-primary/20 text-sm font-medium"
            >
              Explore Features
            </a>
            <a 
              href="#methodology" 
              className="px-8 py-3 bg-white border border-border rounded-full hover:bg-secondary/50 transition-all text-sm font-medium"
            >
              View Methodology
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
