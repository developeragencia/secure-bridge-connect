
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  DollarSign, 
  PieChart, 
  BarChart, 
  LineChart, 
  TrendingUp, 
  FileText, 
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const dashboardSlides = [
    <div key="financial" className="space-y-4 h-full">
      <div className="flex justify-between items-center mb-6">
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
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 bg-primary/5 rounded-md flex flex-col items-center animate-float">
            <TrendingUp className="text-primary mb-2" />
            <div className="text-xs font-medium">Economia</div>
            <div className="text-lg font-bold">32%</div>
          </div>
          <div className="p-3 bg-primary/5 rounded-md flex flex-col items-center animate-float delay-200">
            <FileText className="text-primary mb-2" />
            <div className="text-xs font-medium">Processos</div>
            <div className="text-lg font-bold">145</div>
          </div>
          <div className="p-3 bg-primary/5 rounded-md flex flex-col items-center animate-float delay-300">
            <CheckCircle className="text-primary mb-2" />
            <div className="text-xs font-medium">Sucesso</div>
            <div className="text-lg font-bold">98%</div>
          </div>
        </div>
        <div className="h-28 bg-primary/5 rounded-lg p-3 animate-float">
          <div className="text-sm font-medium mb-2">Evolução de Recuperação</div>
          <div className="flex items-end justify-between h-16 px-2">
            {[35, 48, 40, 65, 70, 85, 90].map((height, i) => (
              <div key={i} className="w-1/8 bg-primary/40 rounded-t-sm" style={{height: `${height}%`}}></div>
            ))}
          </div>
        </div>
      </div>
    </div>,

    <div key="analytics" className="space-y-4 h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full p-2 shadow-lg border border-primary/20 h-8">
            <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></div>
            <PieChart className="text-primary h-6 w-6 relative z-10" />
          </div>
          <span className="font-semibold">Análise Tributária</span>
        </div>
        <div className="px-2 py-1 bg-green-500/20 rounded-full text-xs font-medium text-green-500">
          Otimizado
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="h-40 bg-primary/5 rounded-lg p-3 animate-float">
          <div className="text-sm font-medium mb-2">Distribuição de Créditos</div>
          <div className="flex items-center justify-center h-28">
            <div className="relative w-28 h-28">
              <div className="absolute inset-0 rounded-full border-8 border-primary/20"></div>
              <div className="absolute inset-0 rounded-full border-8 border-primary animate-[spin_10s_linear_infinite]" style={{clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 70%)'}}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold">72%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-40 bg-primary/5 rounded-lg p-3 animate-float delay-200">
          <div className="text-sm font-medium mb-2">Eficiência Processual</div>
          <div className="flex flex-col justify-center h-28 space-y-2">
            {[85, 65, 92].map((value, i) => (
              <div key={i} className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-primary h-2.5 rounded-full animate-pulse" style={{width: `${value}%`}}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-2.5 bg-primary/10 rounded-full w-3/4 animate-pulse"></div>
    </div>,

    <div key="timeline" className="space-y-4 h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full p-2 shadow-lg border border-primary/20 h-8">
            <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></div>
            <BarChart className="text-primary h-6 w-6 relative z-10" />
          </div>
          <span className="font-semibold">Timeline de Atividades</span>
        </div>
        <div className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
          Em Tempo Real
        </div>
      </div>
      
      <div className="space-y-3">
        {[
          { time: "Hoje", activity: "Análise preliminar concluída", status: "Concluído" },
          { time: "Ontem", activity: "Levantamento de documentos", status: "Concluído" },
          { time: "07/09", activity: "Cálculo de projeção de créditos", status: "Em andamento" }
        ].map((item, i) => (
          <div key={i} className="flex items-center p-2 bg-primary/5 rounded-lg animate-float" style={{animationDelay: `${i * 0.2}s`}}>
            <div className="w-16 text-xs text-primary/70">{item.time}</div>
            <div className="flex-1 text-sm font-medium">{item.activity}</div>
            <div className={`text-xs px-2 py-1 rounded-full ${
              item.status === "Concluído" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
            }`}>
              {item.status}
            </div>
          </div>
        ))}
      </div>
      
      <div className="h-2.5 bg-primary/10 rounded-full w-2/3 animate-pulse delay-300"></div>
      <div className="h-2.5 bg-primary/10 rounded-full w-3/4 animate-pulse delay-500"></div>
    </div>
  ];

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
              "flex flex-col sm:flex-row gap-4 pt-4 items-center"
            )}
          >
            <Button size="lg" asChild className="relative overflow-hidden group">
              <Link to="/sistemas">
                Acessar Sistemas
                <span className="absolute right-4 group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={18} />
                </span>
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
              
              <div className="relative min-h-[300px]">
                <div className="absolute -top-4 left-0 right-0 flex justify-center gap-2 z-10">
                  {Array.from({length: totalSlides}).map((_, i) => (
                    <button 
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === currentSlide ? 'bg-primary w-6' : 'bg-primary/30'
                      }`}
                      onClick={() => setCurrentSlide(i)}
                    />
                  ))}
                </div>
                
                <div className="relative overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out" 
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {dashboardSlides.map((slide, i) => (
                      <div key={i} className="w-full flex-shrink-0">
                        {slide}
                      </div>
                    ))}
                  </div>
                </div>
                
                <button 
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-white/30 transition-colors"
                  onClick={prevSlide}
                >
                  <ArrowLeft size={18} />
                </button>
                <button 
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-white/30 transition-colors"
                  onClick={nextSlide}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
