
import React, { Suspense, lazy } from 'react';
import IndexLoading from '@/components/IndexLoading';

// Lazy loaded components
const NavBar = lazy(() => import('@/components/NavBar'));
const Hero = lazy(() => import('@/components/Hero'));

const Index: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Suspense fallback={<IndexLoading />}>
        <NavBar />
        <Hero />
        <div className="py-3 sm:py-4 text-center text-xs sm:text-sm text-muted-foreground">
          Desenvolvido por <a href="https://alexdesenvolvedor.com.br" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-colors">Alex Developer</a>
        </div>
        <div className="pb-3 sm:pb-4 text-center text-[10px] sm:text-xs text-muted-foreground">
          © 2025 Sistemas Claudio Figueiredo. Todos os direitos reservados.
        </div>
      </Suspense>
    </div>
  );
};

export default Index;
