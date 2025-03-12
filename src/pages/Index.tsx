
import React from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <div className="py-4 text-center text-sm text-muted-foreground">
        Desenvolvido por <a href="https://alexdesenvolvedor.com.br" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-colors">Alex Developer</a>
      </div>
    </div>
  );
};

export default Index;
