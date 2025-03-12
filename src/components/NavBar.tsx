
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedLogo from './AnimatedLogo';

const NavBar: React.FC = () => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen, isMobile]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <AnimatedLogo 
              size={scrolled ? "sm" : "md"} 
              animationDisabled={menuOpen}
              className="transition-all duration-300"
            />
          </Link>

          {isMobile ? (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="relative z-50"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          ) : (
            <div className="flex items-center space-x-1 md:space-x-2">
              <Button variant="ghost" asChild>
                <Link to="#features">Recursos</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="#methodology">Metodologia</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="#technology">Tecnologia</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="#contact">Contato</Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="#contact">Iniciar Agora</Link>
              </Button>
            </div>
          )}

          {isMobile && (
            <div className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-300 transform ${
              menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
              <Link to="#features" className="text-lg font-medium" onClick={closeMenu}>
                Recursos
              </Link>
              <Link to="#methodology" className="text-lg font-medium" onClick={closeMenu}>
                Metodologia
              </Link>
              <Link to="#technology" className="text-lg font-medium" onClick={closeMenu}>
                Tecnologia
              </Link>
              <Link to="#contact" className="text-lg font-medium" onClick={closeMenu}>
                Contato
              </Link>
              <Button size="lg" asChild>
                <Link to="#contact" onClick={closeMenu}>
                  Iniciar Agora
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
